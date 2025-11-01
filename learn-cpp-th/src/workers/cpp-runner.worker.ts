/// <reference lib="webworker" />

type CompileRunMessage = {
  type: "compile-run";
  source: string;
  taskId: string;
  force?: boolean;
};

type WorkerIncoming =
  | { type: "init" }
  | CompileRunMessage
  | { type: "abort" }
  | { type: "reset-cache"; taskId?: string };

type WorkerOutgoing =
  | { type: "ready" }
  | { type: "status"; status: "preparing" | "compiling" | "running" }
  | { type: "result"; payload: WorkerResultPayload }
  | { type: "error"; message: string }
  | { type: "aborted"; reason?: string };

type WorkerResultPayload = {
  stdout: string;
  stderr: string;
  exitCode: number;
  compileTimeMs: number;
  runTimeMs: number;
  cached: boolean;
};

type StoredArtifact = {
  id: string;
  taskId: string;
  hash: string;
  stdout: string;
  stderr: string;
  exitCode: number;
  compileTimeMs: number;
  runTimeMs: number;
  createdAt: number;
};

type JobContext = {
  timers: number[];
  hash: string | null;
  cancelled: boolean;
};

const ctx: DedicatedWorkerGlobalScope = self as unknown as DedicatedWorkerGlobalScope;

const DB_NAME = "learn-cpp-th.runner";
const STORE_NAME = "artifacts";
let dbPromise: Promise<IDBDatabase | null> | null = null;
let currentJob: JobContext | null = null;

ctx.addEventListener("message", (event: MessageEvent<WorkerIncoming>) => {
  const message = event.data;
  switch (message.type) {
    case "init":
      void ensureDb()
        .catch((error) => {
          console.error("Runner cache disabled", error);
        })
        .finally(() => {
          post({ type: "ready" });
        });
      break;
    case "compile-run":
      void handleCompileRun(message);
      break;
    case "abort":
      cancelCurrentJob("Aborted by user");
      break;
    case "reset-cache":
      void resetCache(message.taskId);
      break;
    default:
      break;
  }
});

async function handleCompileRun(message: CompileRunMessage) {
  cancelCurrentJob();
  const job: JobContext = { timers: [], hash: null, cancelled: false };
  currentJob = job;

  post({ type: "status", status: "preparing" });

  const hash = await hashSource(message.source);
  job.hash = hash;

  if (!message.force) {
    const cached = await readCache(message.taskId, hash);
    if (cached) {
      post({
        type: "status",
        status: "compiling",
      });
      post({
        type: "result",
        payload: {
          ...cached,
          cached: true,
        },
      });
      currentJob = null;
      return;
    }
  }

  const compileTimeMs = 180 + Math.floor(Math.random() * 160);
  const runTimeMs = 60 + Math.floor(Math.random() * 120);

  registerTimer(job, ctx.setTimeout(() => {
    if (job.cancelled) return;
    post({ type: "status", status: "compiling" });
  }, 50));

  registerTimer(job, ctx.setTimeout(() => {
    if (job.cancelled) return;
    post({ type: "status", status: "running" });
  }, compileTimeMs));

  registerTimer(
    job,
    ctx.setTimeout(() => {
      if (job.cancelled) {
        return;
      }
      const outcome = simulateExecution(message.source);
      if (outcome.kind === "error") {
        post({ type: "error", message: outcome.message });
        currentJob = null;
        return;
      }

      const payload: WorkerResultPayload = {
        stdout: outcome.stdout,
        stderr: outcome.stderr,
        exitCode: outcome.exitCode,
        compileTimeMs,
        runTimeMs,
        cached: false,
      };

      void writeCache(message.taskId, hash, payload).catch((error) => {
        console.warn("Failed to cache runner artifact", error);
      });

      post({ type: "result", payload });
      currentJob = null;
    }, compileTimeMs + runTimeMs),
  );
}

function cancelCurrentJob(reason?: string) {
  if (!currentJob) {
    return;
  }
  currentJob.cancelled = true;
  for (const timer of currentJob.timers) {
    ctx.clearTimeout(timer);
  }
  currentJob.timers = [];
  currentJob = null;
  if (reason) {
    post({ type: "aborted", reason });
  }
}

function registerTimer(job: JobContext, timer: number) {
  job.timers.push(timer);
}

function post(message: WorkerOutgoing) {
  ctx.postMessage(message);
}

async function ensureDb(): Promise<IDBDatabase | null> {
  if (dbPromise) {
    return dbPromise;
  }

  if (typeof indexedDB === "undefined") {
    dbPromise = Promise.resolve(null);
    return dbPromise;
  }

  dbPromise = new Promise<IDBDatabase | null>((resolve) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        const store = database.createObjectStore(STORE_NAME, {
          keyPath: "id",
        });
        store.createIndex("taskId", "taskId", { unique: false });
      }
    };
    request.onsuccess = () => {
      resolve(request.result);
    };
    request.onerror = () => {
      console.error("Failed to open IndexedDB", request.error);
      resolve(null);
    };
  });

  return dbPromise;
}

async function readCache(
  taskId: string,
  hash: string,
): Promise<Omit<WorkerResultPayload, "cached"> | null> {
  const db = await ensureDb();
  if (!db) return null;

  return new Promise((resolve) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const id = `${taskId}:${hash}`;
    const request = store.get(id);
    request.onsuccess = () => {
      const record = request.result as StoredArtifact | undefined;
      if (!record) {
        resolve(null);
        return;
      }
      resolve({
        stdout: record.stdout,
        stderr: record.stderr,
        exitCode: record.exitCode,
        compileTimeMs: record.compileTimeMs,
        runTimeMs: record.runTimeMs,
      });
    };
    request.onerror = () => resolve(null);
  });
}

async function writeCache(
  taskId: string,
  hash: string,
  payload: WorkerResultPayload,
): Promise<void> {
  const db = await ensureDb();
  if (!db) return;
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const record: StoredArtifact = {
      id: `${taskId}:${hash}`,
      taskId,
      hash,
      stdout: payload.stdout,
      stderr: payload.stderr,
      exitCode: payload.exitCode,
      compileTimeMs: payload.compileTimeMs,
      runTimeMs: payload.runTimeMs,
      createdAt: Date.now(),
    };
    const request = store.put(record);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

async function resetCache(taskId?: string) {
  const db = await ensureDb();
  if (!db) return;
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    if (!taskId) {
      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
      return;
    }

    const index = store.index("taskId");
    const request = index.openKeyCursor(IDBKeyRange.only(taskId));
    request.onsuccess = () => {
      const cursor = request.result;
      if (!cursor) {
        resolve();
        return;
      }
      store.delete(cursor.primaryKey);
      cursor.continue();
    };
    request.onerror = () => reject(request.error);
  });
}

// TODO: Replace this simulation shim with the real WASM toolchain pipeline once
// the clang/lld binaries are available in the repository.
function simulateExecution(source: string):
  | { kind: "success"; stdout: string; stderr: string; exitCode: number }
  | { kind: "error"; message: string } {
  const trimmed = source.trim();
  if (!trimmed) {
    return { kind: "error", message: "Source is empty." };
  }

  if (!/int\s+main\s*\(/.test(trimmed)) {
    return {
      kind: "error",
      message: "Missing required entry point: int main().",
    };
  }

  if (/#\s*error/.test(trimmed)) {
    return {
      kind: "error",
      message: "Preprocessor #error directive triggered.",
    };
  }

  if (/static_assert\s*\(\s*false/.test(trimmed)) {
    return {
      kind: "error",
      message: "static_assert(false) prevents compilation.",
    };
  }

  const stdout = extractStream(trimmed, /std::cout/g);
  const stderr = extractStream(trimmed, /std::cerr/g);

  let exitCode = 0;
  const exitMatch = trimmed.match(/return\s+(-?\d+)\s*;/);
  if (exitMatch) {
    exitCode = Number.parseInt(exitMatch[1] ?? "0", 10) || 0;
  }

  return {
    kind: "success",
    stdout: stdout || defaultStdout(),
    stderr,
    exitCode,
  };
}

function extractStream(source: string, marker: RegExp): string {
  const outputs: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = marker.exec(source))) {
    const start = match.index + match[0].length;
    const remaining = source.slice(start);
    const endIndex = remaining.indexOf(";");
    const segment = endIndex >= 0 ? remaining.slice(0, endIndex) : remaining;

    const stringMatches = segment.match(/"(?:[^"\\]|\\.)*"/g) ?? [];
    let buffer = stringMatches
      .map((token) =>
        token
          .slice(1, -1)
          .replace(/\\n/g, "\n")
          .replace(/\\t/g, "\t"),
      )
      .join("");

    const newlineCount = (segment.match(/std::endl|endl/g) ?? []).length;
    if (newlineCount > 0) {
      buffer += "\n".repeat(newlineCount);
    }

    if (buffer) {
      outputs.push(buffer);
    }
  }

  return outputs.join("");
}

function defaultStdout(): string {
  return `Hello from the Learn C++ runner stub!\n\n` +
    `Add std::cout << "text"; statements to customise your output.\n`;
}

async function hashSource(source: string): Promise<string> {
  const encoder = new TextEncoder();
  const buffer = encoder.encode(source);
  const digest = await crypto.subtle.digest("SHA-256", buffer);
  const bytes = Array.from(new Uint8Array(digest));
  return bytes.map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export {};
