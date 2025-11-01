"use client";

import { useTranslation } from "react-i18next";
import { useLanguage } from "@/providers/language-provider";

export function SiteHeader() {
  const { locale, toggleLocale } = useLanguage();
  const { t } = useTranslation();

  const nextLocale = locale === "en" ? "th" : "en";

  return (
    <header className="flex items-center justify-between gap-4 border-b border-black/5 bg-white/90 px-6 py-4 backdrop-blur-sm sm:px-12">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.35em] text-slate-500">
          GPT-5 Codex · learn-cpp-th
        </p>
        <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
          {t("common.brand")}
        </h1>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
          {t("common.languageLabel")}
        </span>
        <button
          type="button"
          onClick={toggleLocale}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:shadow"
          aria-label={
            locale === "th"
              ? t("common.languageEnglish")
              : t("common.languageThai")
          }
        >
          <span>{locale === "th" ? "TH" : "EN"}</span>
          <span aria-hidden="true" className="text-slate-400">
            /
          </span>
          <span>{nextLocale.toUpperCase()}</span>
        </button>
      </div>
    </header>
  );
}
