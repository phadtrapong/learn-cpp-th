import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { detectInitialLocale } from "@/lib/locale";
import { LanguageProvider } from "@/providers/language-provider";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Learn C++ for Beginners — MVP Beta",
  description:
    "MVP beta experience for Thai beginners learning C++ with bilingual hints and an in-browser editor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialLocale = detectInitialLocale();

  return (
    <html lang={initialLocale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-slate-50 font-sans text-slate-900 antialiased`}
      >
        <LanguageProvider initialLocale={initialLocale}>
          <div className="min-h-screen">
            <SiteHeader />
            <main className="mx-auto mt-10 flex w-full max-w-5xl flex-col gap-12 px-6 pb-24 sm:px-12">
              {children}
            </main>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
