import i18next, { type Resource } from "i18next";
import { initReactI18next } from "react-i18next";
import { translations } from "./resources";
import type { SupportedLocale } from "@/lib/locale";

type NamespaceMap = Record<string, Record<string, unknown>>;
type ResourceMap = Record<string, NamespaceMap>;

const resources: Resource = Object.entries(translations).reduce<ResourceMap>(
  (acc, [locale, namespaces]) => {
    acc[locale] = Object.entries(namespaces).reduce<NamespaceMap>(
      (nsAcc, [namespace, value]) => {
        nsAcc[namespace] = { ...value };
        return nsAcc;
      },
      {},
    );
    return acc;
  },
  {},
) as Resource;

const DEFAULT_NAMESPACE = "common";

export function ensureI18n(lng: SupportedLocale) {
  if (!i18next.isInitialized) {
    i18next.use(initReactI18next).init({
      resources,
      lng,
      fallbackLng: "en",
      defaultNS: DEFAULT_NAMESPACE,
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });
  } else if (i18next.language !== lng) {
    i18next.changeLanguage(lng);
  }

  return i18next;
}

export { i18next };
