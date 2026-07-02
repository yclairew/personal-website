export const locales = ["en", "zh-Hans", "zh-Hant"] as const;
export type Locale = typeof locales[number];
export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  "zh-Hans": "简体中文",
  "zh-Hant": "繁體中文",
};