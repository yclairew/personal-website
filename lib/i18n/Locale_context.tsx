"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import en from "@/locales/en.json";
import zhHans from "@/locales/zh-Hans.json";
import zhHant from "@/locales/zh-Hant.json";
import { locales, defaultLocale, type Locale } from "@/lib/i18n/config";

const translations: Record<Locale, Record<string, string>> = {
  en,
  "zh-Hans": zhHans,
  "zh-Hant": zhHant,
};

const LocaleContext = createContext<{
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Record<string, string>;
}>({ locale: defaultLocale, setLocale: () => {}, t: en });

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const t = translations[locale] || en;

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}