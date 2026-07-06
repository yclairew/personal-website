import { cookies } from "next/headers";
import { defaultLocale, type Locale } from "@/lib/i18n/config";

const supportedLocales: Locale[] = [
  "en",
  "zh-Hans",
  "zh-Hant",
];

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();

  const locale = cookieStore.get("locale")?.value as Locale | undefined;

  if (locale && supportedLocales.includes(locale)) {
    return locale;
  }

  return defaultLocale;
}