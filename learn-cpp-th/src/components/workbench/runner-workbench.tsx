"use client";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CppEditor, DEFAULT_SNIPPET } from "@/components/editor/cpp-editor";
import {
  type AutosaveStatus,
  useEditorAutosave,
} from "@/hooks/use-editor-autosave";
import { useRunner } from "@/hooks/use-runner";
import { ResultPanel } from "@/components/workbench/result-panel";

const STORAGE_NAMESPACE = "progress.v1";
const HELLO_WORLD_TASK_ID = "module0.task0.hello-world";
const STORAGE_KEY = `${STORAGE_NAMESPACE}.${HELLO_WORLD_TASK_ID}.draft`;

const STATUS_COLOR: Record<AutosaveStatus, string> = {
  loading: "text-slate-500",
  dirty: "text-amber-600",
  saving: "text-amber-600",
  saved: "text-emerald-600",
  error: "text-rose-600",
};

export function RunnerWorkbench() {
  const { t } = useTranslation();
  const { code, status, isDirty, setCode, flush } = useEditorAutosave({
    storageKey: STORAGE_KEY,
    initialValue: DEFAULT_SNIPPET,
  });
  const runner = useRunner({ taskId: HELLO_WORLD_TASK_ID });
  const { state } = runner;

  const statusLabel = useMemo(() => {
    switch (status) {
      case "loading":
        return t("common.autosave.loading");
      case "dirty":
        return t("common.autosave.unsaved");
      case "saving":
        return t("common.autosave.saving");
      case "saved":
        return isDirty
          ? t("common.autosave.saving")
          : t("common.autosave.saved");
      case "error":
      default:
        return t("common.autosave.error");
    }
  }, [isDirty, status, t]);

  const isRunnerBusy =
    state.status === "compiling" ||
    state.status === "running" ||
    state.status === "preparing";

  const handleRun = () => {
    flush();
    runner.controls.run(code);
  };

  const handleAbort = () => {
    runner.controls.abort();
  };

  const runDisabled = !runner.ready || isRunnerBusy;
  const abortDisabled = !isRunnerBusy;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium shadow-sm shadow-slate-200">
          <span
            aria-hidden="true"
            className={`inline-flex h-2.5 w-2.5 flex-shrink-0 rounded-full ${STATUS_COLOR[status]} bg-current`}
          />
          <span className={`${STATUS_COLOR[status]}`}>{statusLabel}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRun}
            disabled={runDisabled}
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
          >
            <span aria-hidden="true">▶</span>
            <span>{t("common.runner.runAction")}</span>
          </button>
          <button
            type="button"
            onClick={handleAbort}
            disabled={abortDisabled}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm shadow-slate-100 transition hover:border-slate-300 hover:text-slate-800 disabled:cursor-not-allowed disabled:border-slate-100 disabled:text-slate-400"
          >
            <span aria-hidden="true">■</span>
            <span>{t("common.runner.abortAction")}</span>
          </button>
        </div>
      </div>
      <CppEditor value={code} onChange={setCode} />
      <ResultPanel
        status={state.status}
        result={state.result}
        error={state.error}
      />
    </div>
  );
}
