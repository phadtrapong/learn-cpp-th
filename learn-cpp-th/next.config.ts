import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    typedRoutes: true,
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "th"],
    localeDetection: false,
  },
};

export default nextConfig;
