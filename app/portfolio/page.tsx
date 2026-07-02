"use client";

import ".././globals.css";
import Cards from "@/components/Portfolio_cards";
import Overscroll_color from "@/components/Overscroll_color";
import { useLocale } from "@/lib/i18n/Locale_context";

export default function Portfolio() {
  Overscroll_color(); 
  const { t } = useLocale();

  return (
    <div className="bg-background">
      <title>{t.site_title}</title>

      <h1 className="heading-text text-text mt-5">{t.portfolio_heading}</h1>

      <div className="center mb-25">
        <Cards/>
      </div>

    </div>
  );
}
