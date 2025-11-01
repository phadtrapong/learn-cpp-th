"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { SupportedLocale } from "@/lib/locale";
import { ensureI18n, i18next } from "@/i18n/i18n";
import { I18nextProvider } from "react-i18next";

type LanguageContextValue = {
  locale: SupportedLocale;
  setLocale: (next: SupportedLocale) => void;
  toggleLocale: () => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

const STORAGE_KEY = "learn-cpp-th.locale";

export function LanguageProvider({
  initialLocale,
  children,
}: {
  initialLocale: SupportedLocale;
  children: React.ReactNode;
}) {
  const [locale, setLocale] = useState<SupportedLocale>(initialLocale);

  ensureI18n(locale);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "th") {
      setLocale(stored);
    } else {
      window.localStorage.setItem(STORAGE_KEY, initialLocale);
    }
    // We only need to run this on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
    ensureI18n(locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale,
      toggleLocale: () => setLocale((prev) => (prev === "en" ? "th" : "en")),
    }),
    [locale],
  );

  return (
    <LanguageContext.Provider value={value}>
      <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
