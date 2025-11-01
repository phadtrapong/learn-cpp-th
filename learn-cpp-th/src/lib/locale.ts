import { headers } from "next/headers";

const SUPPORTED_LOCALES = ["en", "th"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

const DEFAULT_LOCALE: SupportedLocale = "en";

function normalize(locale: string | null | undefined): SupportedLocale | null {
  if (!locale) return null;
  const lower = locale.toLowerCase();
  if (lower.startsWith("th")) {
    return "th";
  }
  if (lower.startsWith("en")) {
    return "en";
  }
  return null;
}

export function detectInitialLocale(): SupportedLocale {
  const headerList = headers();

  const list = headerList as unknown as {
    get?: (key: string) => string | string[] | undefined | null;
    [key: string]: unknown;
  };

  const getHeader = (name: string): string | null => {
    if (typeof list.get === "function") {
      const value = list.get(name);
      if (typeof value === "string") {
        return value;
      }
      if (Array.isArray(value)) {
        return value[0] ?? null;
      }
      return null;
    }

    const lower = name.toLowerCase();
    const direct = (list[lower] ?? list[name]) as
      | string
      | string[]
      | undefined;
    if (typeof direct === "string") {
      return direct;
    }
    if (Array.isArray(direct)) {
      return direct[0] ?? null;
    }
    return null;
  };

  const country =
    getHeader("x-vercel-ip-country") ??
    getHeader("x-country-code") ??
    getHeader("cf-ipcountry");
  if (country && country.toLowerCase() === "th") {
    return "th";
  }

  const acceptLanguage = getHeader("accept-language");
  const preferredFromHeader =
    acceptLanguage
      ?.split(",")
      .map((part) => part.split(";")[0]?.trim())
      .map(normalize)
      .find((value): value is SupportedLocale => Boolean(value)) ?? null;

  return preferredFromHeader ?? DEFAULT_LOCALE;
}

export function isSupportedLocale(
  locale: string | null | undefined,
): locale is SupportedLocale {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale);
}
