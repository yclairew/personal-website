"use client";

import ".././globals.css";
import Cards from "@/components/Portfolio_cards";
import Overscroll_color from "@/components/Overscroll_color";
import { useLocale } from "@/lib/i18n/Locale_context";
import { useSearchParams } from "next/navigation";
import { BackButton } from "@/components/ui/back-button";


export default function PortfolioContent() {
  Overscroll_color();
  const { t } = useLocale();

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

      <h1 className="heading-text text-text mt-5">{t.portfolio_heading}</h1>

      <div className="center mb-25">
        <Cards />
      </div>
    </div>
  );
}