"use client";

import ".././globals.css";
import CourseworkSection from "@/components/Coursework_section";
import Overscroll_color from "@/components/Overscroll_color";
import { useLocale } from "@/lib/i18n/Locale_context";


export default function Coursework() {
  Overscroll_color(); 
  const { t, locale } = useLocale();
  const isChinese = ["zh-Hans", "zh-Hant"].includes(locale);

  return (
    <div className="bg-background">
      <title>{t.site_title}</title>

      <h1 className={`heading-text text-center text-text underline 
        decoration-[0.19rem] decoration-accent mt-5
        ${isChinese ? 
          "text-5xl lg:text-[10rem] mt-18 mb-5! underline-offset-10 lg:underline-offset-20" 
          : "underline-offset-[0.3rem] text-[5rem] lg:text-[10.25rem]"
        }`}
      >
        {t.coursework_heading}
      </h1>

      <div className="inspire-div pt-5 pl-6 pr-6 pb-7 mb-6 lg:pt-15 lg:pl-15 lg:pr-15 lg:pb-20 lg:mb-15 bg-accent-light">
        <h2 className="reveal-box areas-subheading subheadings mb-7 lg:mb-8 text-2xl lg:text-5xl">{t.coursework_inspire_heading}</h2>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="body-text border-l-3 border-accent pl-4">
            <h3 className="text-xl lg:text-4xl third-level-headings mb-2">{t.coursework_datascience_title}</h3>
            <p className="text-base lg:text-2xl">
              {t.coursework_datascience_text_prefix}{" "}
              <a href="https://www.signifyhealth.com/" target="_blank" rel="noopener noreferrer">{t.coursework_datascience_link}</a>{" "}
              {t.coursework_datascience_text_suffix}
            </p>
          </div>

          <div className="body-text border-l-3 border-accent pl-4">
            <h3 className="text-xl lg:text-4xl third-level-headings mb-2">{t.coursework_ai_title}</h3>
            <p className="text-base lg:text-2xl">
              {t.coursework_ai_text_prefix}{" "}
              <a href="https://www.xiameng.org/" target="_blank" rel="noopener noreferrer">{t.coursework_ai_link}</a>{" "}
              {t.coursework_ai_text_suffix}
            </p>
          </div>

          <div className="body-text border-l-4 border-accent pl-4">
            <h3 className="text-xl lg:text-4xl third-level-headings mb-2">{t.coursework_business_title}</h3>
            <p className="text-base lg:text-2xl">
              {t.coursework_business_text_prefix}{" "}
              <a href="https://mays.tamu.edu/ai/ai-minor/" target="_blank" rel="noopener noreferrer">
                {t.coursework_business_link}
              </a>
              {isChinese ? "。" : "."}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-40">
        <h2 className="subheadings ml-6 lg:ml-12 mb-6 text-2xl lg:text-5xl">{t.coursework_coursework_heading}</h2>
        <CourseworkSection />
      </div>
      
    </div>
  );
}