"use client";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type {
  RunnerResult,
  RunnerStatus,
} from "@/hooks/use-runner";

type ResultPanelProps = {
  status: RunnerStatus;
  result: RunnerResult | null;
  error: string | null;
};

const STATUS_COLOR: Record<RunnerStatus, string> = {
  idle: "text-slate-500",
  preparing: "text-amber-600",
  compiling: "text-amber-600",
  running: "text-amber-600",
  completed: "text-emerald-600",
  aborted: "text-slate-500",
  error: "text-rose-600",
};

const STATUS_BG: Record<RunnerStatus, string> = {
  idle: "bg-white",
  preparing: "bg-amber-50",
  compiling: "bg-amber-50",
  running: "bg-amber-50",
  completed: "bg-emerald-50",
  aborted: "bg-slate-50",
  error: "bg-rose-50",
};

export function ResultPanel({ status, result, error }: ResultPanelProps) {
  const { t } = useTranslation();

  const statusLabel = useMemo(
    () => t(`common.runner.status.${status}`),
    [status, t],
  );

  const description = useMemo(() => {
    switch (status) {
      case "idle":
        return t("common.runner.description.idle");
      case "preparing":
        return t("common.runner.description.preparing");
      case "compiling":
        return t("common.runner.description.compiling");
      case "running":
        return t("common.runner.description.running");
      case "completed":
        return result?.cached
          ? t("common.runner.description.cached")
          : t("common.runner.description.completed");
      case "aborted":
        return t("common.runner.description.aborted");
      case "error":
      default:
        return error ?? t("common.runner.description.error");
    }
  }, [error, result?.cached, status, t]);

  const showOutputs =
    status === "completed" ||
    status === "error" ||
    status === "aborted" ||
    status === "running";

  return (
    <section
      className={`rounded-3xl border border-slate-200 ${STATUS_BG[status]} p-5 shadow-sm shadow-slate-200 transition`}
    >
      <header className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="inline-flex items-center gap-2">
          <span
            aria-hidden="true"
            className={`inline-flex h-2.5 w-2.5 rounded-full ${STATUS_COLOR[status]} bg-current`}
          />
          <p className={`text-sm font-semibold ${STATUS_COLOR[status]}`}>
            {statusLabel}
          </p>
        </div>
        {result?.cached ? (
          <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            {t("common.runner.hotReloadBadge")}
          </span>
        ) : null}
      </header>

      <p className="text-sm text-slate-600">{description}</p>

      {showOutputs ? (
        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-3">
            <MetricGrid result={result} />
            <OutputBlock
              title={t("common.runner.stdoutLabel")}
              content={result?.stdout ?? ""}
              emptyFallback={t("common.runner.noStdout")}
            />
          </div>
          <OutputBlock
            title={t("common.runner.stderrLabel")}
            content={result?.stderr ?? ""}
            emptyFallback={t("common.runner.noStderr")}
          />
        </div>
      ) : null}
    </section>
  );
}

function MetricGrid({ result }: { result: RunnerResult | null }) {
  const { t } = useTranslation();

  if (!result) return null;

  return (
    <dl className="grid grid-cols-2 gap-3 text-xs text-slate-600 sm:grid-cols-3">
      {result.compileTimeMs !== null ? (
        <MetricItem
          label={t("common.runner.compileTime")}
          value={`${result.compileTimeMs} ms`}
        />
      ) : null}
      {result.runTimeMs !== null ? (
        <MetricItem
          label={t("common.runner.runTime")}
          value={`${result.runTimeMs} ms`}
        />
      ) : null}
      {result.exitCode !== null ? (
        <MetricItem
          label={t("common.runner.exitCode")}
          value={result.exitCode.toString(10)}
        />
      ) : null}
    </dl>
  );
}

function MetricItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-left shadow-sm">
      <dt className="font-semibold text-slate-500">{label}</dt>
      <dd className="mt-1 text-base text-slate-900">{value}</dd>
    </div>
  );
}

function OutputBlock({
  title,
  content,
  emptyFallback,
}: {
  title: string;
  content: string;
  emptyFallback: string;
}) {
  const isEmpty = !content.trim();
  return (
    <section className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white shadow-sm">
      <header className="border-b border-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </header>
      <pre className="flex-1 overflow-auto px-4 py-3 text-sm text-slate-800">
        {isEmpty ? <span className="text-slate-400">{emptyFallback}</span> : content}
      </pre>
    </section>
  );
}
