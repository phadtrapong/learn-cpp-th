 "use client";

import { useTranslation } from "react-i18next";
import { useLanguage } from "@/providers/language-provider";
import { CppEditor } from "@/components/editor/cpp-editor";

export default function Home() {
  const { t } = useTranslation();
  const { locale } = useLanguage();
  const checklistRaw = t("common.checklistItems", {
    returnObjects: true,
  });

  const checklistItems = Array.isArray(checklistRaw)
    ? checklistRaw
    : typeof checklistRaw === "string"
      ? checklistRaw.split("\n").filter(Boolean)
      : Object.values(checklistRaw ?? {}).map((item) => String(item));

  return (
    <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
      <section className="flex flex-col gap-8 rounded-[32px] bg-white/90 p-10 shadow-xl shadow-slate-200/70">
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-500">
          {locale === "th" ? "รุ่นทดสอบ MVP" : "MVP Beta Sprint 1"}
        </p>
        <h2 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
          {t("common.heroTitle")}
        </h2>
        <p className="max-w-2xl text-lg text-slate-600 sm:text-xl">
          {t("common.heroSubtitle")}
        </p>
        <button
          type="button"
          className="inline-flex w-fit items-center justify-center rounded-full bg-slate-900 px-8 py-4 text-base font-semibold text-slate-50 shadow-lg shadow-slate-400/30 transition hover:bg-slate-800"
        >
          {t("common.heroCta")}
        </button>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">
            {t("common.editorTitle")}
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            {t("common.editorDescription")}
          </p>
        </div>
        <CppEditor />
      </section>

      <section className="col-span-full grid gap-6 rounded-[32px] border border-slate-200 bg-white/80 p-8 shadow-sm shadow-slate-200/60 md:grid-cols-2">
        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold text-slate-900">
            {t("common.checklistTitle")}
          </h3>
        </div>
        {checklistItems.map((item) => (
          <article
            key={item}
            className="flex items-start gap-4 rounded-3xl border border-slate-100 bg-white/90 p-4 text-base text-slate-700 shadow-sm"
          >
            <span className="mt-1 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-600">
              ✓
            </span>
            <span>{item}</span>
          </article>
        ))}
      </section>
    </div>
  );
}
