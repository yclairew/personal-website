"use client";

import { useLocale } from "@/lib/i18n/Locale_context";
import { locales, localeLabels } from "@/lib/i18n/config";

export default function LanguageSwitcher() {
  const { setLocale } = useLocale();

  return (
    <>
      {locales.map((l) => (
        <button key={l} onClick={() => {
          console.log("clicked", l);
          setLocale(l);
          }}
        >
          {localeLabels[l]}
        </button>
      ))}
    </>
  );
}