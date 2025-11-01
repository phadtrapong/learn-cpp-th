"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type RunnerStatus =
  | "idle"
  | "preparing"
  | "compiling"
  | "running"
  | "completed"
  | "aborted"
  | "error";

export type RunnerResult = {
  stdout: string;
  stderr: string;
  exitCode: number | null;
  compileTimeMs: number | null;
  runTimeMs: number | null;
  cached: boolean;
};

export type RunnerState = {
  status: RunnerStatus;
  result: RunnerResult | null;
  error: string | null;
  startedAt: number | null;
  finishedAt: number | null;
};

type WorkerStatus = "preparing" | "compiling" | "running";

type WorkerResultPayload = {
  stdout: string;
  stderr: string;
  exitCode: number;
  compileTimeMs: number;
  runTimeMs: number;
  cached: boolean;
};

type WorkerIncomingMessage =
  | { type: "ready" }
  | { type: "status"; status: WorkerStatus }
  | { type: "result"; payload: WorkerResultPayload }
  | { type: "error"; message: string }
  | { type: "aborted"; reason?: string };

type WorkerOutgoingMessage =
  | { type: "init" }
  | { type: "compile-run"; source: string; taskId: string; force?: boolean }
  | { type: "abort" }
  | { type: "reset-cache"; taskId?: string };

type RunnerControls = {
  run: (source: string, options?: { force?: boolean }) => void;
  abort: () => void;
  reset: () => void;
};

export type RunnerHook = {
  ready: boolean;
  state: RunnerState;
  controls: RunnerControls;
};

const INITIAL_STATE: RunnerState = {
  status: "idle",
  result: null,
  error: null,
  startedAt: null,
  finishedAt: null,
};

type UseRunnerOptions = {
  taskId: string;
};

export function useRunner({ taskId }: UseRunnerOptions): RunnerHook {
  const [ready, setReady] = useState(false);
  const [state, setState] = useState<RunnerState>(INITIAL_STATE);
  const workerRef = useRef<Worker | null>(null);
  const startedAtRef = useRef<number | null>(null);
  const pendingMessageRef = useRef<WorkerOutgoingMessage | null>(null);

  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const workerUrl = new URL(
      "../workers/cpp-runner.worker.ts",
      import.meta.url,
    );
    const worker = new Worker(workerUrl, { type: "module" });
    workerRef.current = worker;

    const handleMessage = (event: MessageEvent<WorkerIncomingMessage>) => {
      const message = event.data;
      if (!isMounted.current) {
        return;
      }

      switch (message.type) {
        case "ready": {
          setReady(true);
          if (pendingMessageRef.current) {
            worker.postMessage(pendingMessageRef.current);
            pendingMessageRef.current = null;
          }
          break;
        }
        case "status": {
          const nextStatus: RunnerStatus = message.status;
          setState((prev) => ({
            ...prev,
            status: nextStatus,
            error: null,
          }));
          break;
        }
        case "result": {
          setState((prev) => ({
            ...prev,
            status: "completed",
            result: {
              stdout: message.payload.stdout,
              stderr: message.payload.stderr,
              exitCode: message.payload.exitCode,
              compileTimeMs: message.payload.compileTimeMs,
              runTimeMs: message.payload.runTimeMs,
              cached: message.payload.cached,
            },
            error: null,
            startedAt: prev.startedAt ?? startedAtRef.current,
            finishedAt: Date.now(),
          }));
          break;
        }
        case "error": {
          setState((prev) => ({
            ...prev,
            status: "error",
            error: message.message,
            finishedAt: Date.now(),
          }));
          break;
        }
        case "aborted": {
          setState((prev) => ({
            ...prev,
            status: "aborted",
            finishedAt: Date.now(),
          }));
          break;
        }
        default:
          break;
      }
    };

    worker.addEventListener("message", handleMessage);
    worker.postMessage({ type: "init" });

    return () => {
      worker.removeEventListener("message", handleMessage);
      worker.terminate();
      workerRef.current = null;
    };
  }, []);

  const sendMessage = useCallback((message: WorkerOutgoingMessage) => {
    const worker = workerRef.current;
    if (!worker) {
      return;
    }

    if (!ready && message.type !== "init") {
      pendingMessageRef.current = message;
      return;
    }

    worker.postMessage(message);
  }, [ready]);

  const run = useCallback(
    (source: string, options?: { force?: boolean }) => {
      const trimmed = source.trim();
      if (!trimmed) {
        setState({
          status: "error",
          error: "Source code is empty.",
          result: null,
          startedAt: Date.now(),
          finishedAt: Date.now(),
        });
        return;
      }

      const startedAt = Date.now();
      startedAtRef.current = startedAt;
      setState({
        status: "preparing",
        result: null,
        error: null,
        startedAt,
        finishedAt: null,
      });

      const message: WorkerOutgoingMessage = {
        type: "compile-run",
        source,
        taskId,
        force: options?.force ?? false,
      };

      sendMessage(message);
    },
    [sendMessage, taskId],
  );

  const abort = useCallback(() => {
    const message: WorkerOutgoingMessage = { type: "abort" };
    sendMessage(message);
  }, [sendMessage]);

  const reset = useCallback(() => {
    startedAtRef.current = null;
    setState(INITIAL_STATE);
  }, []);

  return useMemo(
    () => ({
      ready,
      state,
      controls: {
        run,
        abort,
        reset,
      },
    }),
    [abort, ready, reset, run, state],
  );
}
