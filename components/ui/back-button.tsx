"use client";
import { useRouter } from "next/navigation";
import { useLocale } from "@/lib/i18n/Locale_context";


export function BackButton() {
  const router = useRouter();
  const { t } = useLocale();

  return (
    <button onClick={() => router.back()}>
      ← {t.back_to_coursework_label}
    </button>
  );
}