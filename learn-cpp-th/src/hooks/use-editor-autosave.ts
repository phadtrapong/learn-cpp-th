"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DEFAULT_SNIPPET } from "@/components/editor/cpp-editor";

export type AutosaveStatus =
  | "loading"
  | "dirty"
  | "saving"
  | "saved"
  | "error";

type UseEditorAutosaveOptions = {
  storageKey: string;
  initialValue?: string;
  debounceMs?: number;
};

type AutosaveResult = {
  code: string;
  status: AutosaveStatus;
  lastSavedAt: number | null;
  isDirty: boolean;
  setCode: (next: string) => void;
  flush: () => void;
  reset: () => void;
};

export function useEditorAutosave({
  storageKey,
  initialValue = DEFAULT_SNIPPET,
  debounceMs = 750,
}: UseEditorAutosaveOptions): AutosaveResult {
  const [code, setCodeState] = useState(initialValue);
  const [status, setStatus] = useState<AutosaveStatus>("loading");
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);
  const pendingRef = useRef<string>(initialValue);
  const timeoutRef = useRef<number | null>(null);

  const writeToStorage = useCallback(
    (value: string) => {
      if (typeof window === "undefined") {
        return;
      }
      try {
        window.localStorage.setItem(storageKey, value);
        setStatus("saved");
        setLastSavedAt(Date.now());
      } catch (error) {
        console.error("Failed to persist editor draft", error);
        setStatus("error");
      }
    },
    [storageKey],
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored !== null) {
        setCodeState(stored);
        pendingRef.current = stored;
        setStatus("saved");
        setLastSavedAt(Date.now());
      } else {
        window.localStorage.setItem(storageKey, initialValue);
        setStatus("saved");
        setLastSavedAt(Date.now());
      }
    } catch (error) {
      console.error("Failed to read editor draft", error);
      setStatus("error");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
      if (status === "dirty" || status === "saving") {
        writeToStorage(pendingRef.current);
      }
    };
  }, [status, writeToStorage]);

  const scheduleSave = useCallback(
    (value: string) => {
      setCodeState(value);
      pendingRef.current = value;
      if (typeof window === "undefined") {
        return;
      }

      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }

      setStatus("dirty");

      timeoutRef.current = window.setTimeout(() => {
        setStatus("saving");
        writeToStorage(value);
      }, debounceMs);
    },
    [debounceMs, writeToStorage],
  );

  const flush = useCallback(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    writeToStorage(pendingRef.current);
  }, [writeToStorage]);

  const reset = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }
    const fallback = initialValue ?? DEFAULT_SNIPPET;
    setCodeState(fallback);
    pendingRef.current = fallback;
    try {
      window.localStorage.setItem(storageKey, fallback);
      setStatus("saved");
      setLastSavedAt(Date.now());
    } catch (error) {
      console.error("Failed to reset editor draft", error);
      setStatus("error");
    }
  }, [initialValue, storageKey]);

  const isDirty = useMemo(
    () => status === "dirty" || status === "saving",
    [status],
  );

  return {
    code,
    status,
    lastSavedAt,
    isDirty,
    setCode: scheduleSave,
    flush,
    reset,
  };
}
