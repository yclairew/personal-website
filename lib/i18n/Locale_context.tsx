// "use client";

// import { createContext, useContext, useState, ReactNode } from "react";
// import { useRouter } from "next/navigation";
// import en from "@/locales/en.json";
// import zhHans from "@/locales/zh-Hans.json";
// import zhHant from "@/locales/zh-Hant.json";
// import type { Locale } from "@/lib/i18n/config";

// const translations = {
//   en,
//   "zh-Hans": zhHans,
//   "zh-Hant": zhHant,
// };

// const LocaleContext = createContext<{
//   locale: Locale;
//   setLocale: (l: Locale) => void;
//   t: Record<string, string>;
// }>({
//   locale: "en",
//   setLocale: () => {},
//   t: en,
// });


// export function LocaleProvider({
//   children,
//   initialLocale,
// }: {
//   children: ReactNode;
//   initialLocale: Locale;
// }) {

//   const [locale, setLocaleState] = useState(initialLocale);
//   const router = useRouter();

//   const setLocale = (newLocale: Locale) => {
//     setLocaleState(newLocale);

//     document.cookie = `locale=${newLocale}; path=/; max-age=31536000`;
    
//     router.refresh();
//   };

//   const t = translations[locale];

//   return (
//     <LocaleContext.Provider
//       value={{
//         locale,
//         setLocale,
//         t,
//       }}
//     >
//       {children}
//     </LocaleContext.Provider>
//   );
// }


// export function useLocale() {
//   return useContext(LocaleContext);
// }

"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import en from "@/locales/en.json";
import zhHans from "@/locales/zh-Hans.json";
import zhHant from "@/locales/zh-Hant.json";
import type { Locale } from "@/lib/i18n/config";

const translations = {
  en,
  "zh-Hans": zhHans,
  "zh-Hant": zhHant,
};

const LocaleContext = createContext<{
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Record<string, string>;
}>({
  locale: "en",
  setLocale: () => {},
  t: en,
});

export function LocaleProvider({
  children,
  initialLocale,
}: {
  children: ReactNode;
  initialLocale: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  // load saved language when the browser loads
  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") as Locale | null;

    if (
      savedLocale &&
      ["en", "zh-Hans", "zh-Hant"].includes(savedLocale)
    ) {
      setLocaleState(savedLocale);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);

    // save preference in browser
    localStorage.setItem("locale", newLocale);
  };

  const t = translations[locale];

  return (
    <LocaleContext.Provider
      value={{
        locale,
        setLocale,
        t,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}