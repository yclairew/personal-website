"use client";

import ".././globals.css";
import Cards from "@/components/Portfolio_cards";
import Overscroll_color from "@/components/Overscroll_color";
import { useLocale } from "@/lib/i18n/Locale_context";
import { useSearchParams } from "next/navigation";
import { BackButton } from "@/components/ui/back-button";


export default function PortfolioContent() {
  Overscroll_color();
  const { t, locale } = useLocale();
  const isChinese = ["zh-Hans", "zh-Hant"].includes(locale);

  const searchParams = useSearchParams();
  const showBackButton = searchParams.get("from") === "coursework";

  return (
    <div className="bg-background">
      <title>{t.site_title}</title>

      {showBackButton && (
        <div className="fixed top-4 left-4 z-50">
          <BackButton />
        </div>
      )}

      <h1 className={`heading-text text-center text-text underline 
        decoration-[0.19rem] decoration-accent mt-5
        ${isChinese ? 
          "text-5xl lg:text-[10rem] mt-18 mb-5! underline-offset-10 lg:underline-offset-20" 
          : "underline-offset-[0.3rem] text-[5rem] lg:text-[10.25rem]"
        }`}
      >
        {t.portfolio_heading}
      </h1>

      

      <div className="center mb-25">
        <Cards />
      </div>
    </div>
  );
}