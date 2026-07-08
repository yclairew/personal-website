"use client";

import { useLocale } from "@/lib/i18n/Locale_context";
import { locales, localeLabels } from "@/lib/i18n/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useState } from "react";


const localeShort: Record<string, string> = {
  en: "EN",
  "zh-Hans": "简",
  "zh-Hant": "繁",
};


export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="flex items-center gap-1 p-2 px-2 py-1 text-sm font-[Montserrat] bg-accent-tag rounded-lg">
        {localeShort[locale]}
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={18} >
        {locales.map((l) => (
          <DropdownMenuItem key={l} 
            onClick={() => {
            console.log("clicked", l);
            setLocale(l);
            }} 
            className="data-highlighted:bg-accent-light"
          >
            {localeLabels[l]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}