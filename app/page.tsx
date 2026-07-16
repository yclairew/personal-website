"use client";

import "./globals.css";
// import Skills_scene from "@/components/Skills_scene";
import Overscroll_color from "@/components/Overscroll_color";
import { useLocale } from "@/lib/i18n/Locale_context";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const Skills_scene = dynamic(
  () => import("@/components/Skills_scene"),
  {
    ssr: false,
  }
);

function LazySkillsScene() {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "300px",
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {loaded ? (
        <Skills_scene />
      ) : (
        <div className="h-40" />
      )}
    </div>
  );
}


function useTypewriter(fullText: string, speed = 40) {
  const [displayedChars, setDisplayedChars] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayedChars(0)
    setDone(false)

    const interval = setInterval(() => {
      setDisplayedChars((prev) => {
        if (prev >= fullText.length) {
          clearInterval(interval)
          setDone(true)
          return prev
        }
        return prev + 1
      })
    }, speed)

    return () => clearInterval(interval)
  }, [fullText, speed])

  return { displayedChars, done }
}


function intro_typing(t: any, speed = 67) {
  const prefix = t.home_subtitle_prefix + " "
  const linkText = t.home_subtitle_link
  const fullText = prefix + linkText

  const { displayedChars, done } = useTypewriter(fullText, speed)

  const typedPrefix = prefix.slice(0, Math.min(displayedChars, prefix.length))
  const typedLinkChars = Math.max(0, displayedChars - prefix.length)
  const typedLink = linkText.slice(0, typedLinkChars)
  const linkFullyTyped = typedLinkChars >= linkText.length

  return (
    <p className="body-text textmd lg:text-2xl
      mb-6 lg:mb-14 text-text whitespace-pre-line 
      max-w-[90vw] text-center"
    >
      {typedPrefix}
      {linkFullyTyped ? (
        <a 
          href="https://mays.tamu.edu/ai/ai-minor/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="underline"
        >
          {typedLink}
        </a>
      ) : (
        <span>{typedLink}</span>
      )}
      <span className="border-r-2 border-text animate-blink-caret"></span>
    </p>
  )
}


export default function Home() {
  Overscroll_color();
  const { t, locale } = useLocale();
  const isChinese = ["zh-Hans", "zh-Hant"].includes(locale);
  const isSimplifiedChinese = locale === "zh-Hans";
  const isTraditionalChinese = locale === "zh-Hant";  
  const typingSpeed =
  isSimplifiedChinese
    ? 120
    : isTraditionalChinese
    ? 120
    : 67 ; // for typing animation


  return (
    <div className="bg-background">
      <title>{t.site_title}</title>
      <main>
        <div>
          <h1 className={`heading-text text-center text-text underline 
          decoration-[0.19rem] decoration-accent mt-5 lg:-mb-4 [text-box-trim:trim-end] 
          ${isChinese ? 
            "text-5xl lg:text-[10rem] mt-18 mb-5! underline-offset-10 lg:underline-offset-20" 
            : "underline-offset-[0.3rem] text-[5rem] lg:text-[10.25rem]"
          }`}
          >
            {t.home_heading}
          </h1>
        </div>

        <div className="flex justify-center">
          {intro_typing(t, typingSpeed)}
        </div>

        <div className="grid md:grid-cols-2 items-center gap-6 lg:gap-12 lg:ml-8 lg:mr-8">
          <div className="flex justify-center items-center">
            {/* <img 
              className="headshot max-h-96 w-auto object-contain" 
              src="/my-headshot.jpg" 
              alt={t.home_headshot_alt}
            /> */}

            {/* for hosting on people.tamu.edu */}
            <img 
              className="headshot max-h-96 w-auto object-contain" 
              src="/~y.clairewu/my-headshot.jpg" 
              alt={t.home_headshot_alt}
              fetchPriority="high"
            />
          </div>

          <div className="flex flex-col justify-center text-text">
            <p className="body-text text-md lg:text-2xl
              max-w-[clamp(36rem,39.9vw,90rem)] ml-4 
              mr-4 lg:ml-0 lg:mr-0 text-left"
            >
              {t.home_intro_p1_prefix}{" "}
              <a href="https://www.xiameng.org/DreamLab/" 
                target="_blank" rel="noopener noreferrer"
              >
                {t.home_intro_p1_link}
              </a>,{" "}
              {t.home_intro_p1_suffix} <i>{t.home_intro_p1_project}</i>, {t.home_intro_p1_suffix2}
            </p>

            <p className="body-text text-md lg:text-2xl
              max-w-[clamp(36rem,39.9vw,90rem)] 
              text-left mt-4 ml-4 mr-4 lg:ml-0 lg:mr-0"
            >
              {t.home_intro_p2_prefix}

              <br/>
              <br/>

              {t.home_intro_p2_middle}{" "} 
              <a href="portfolio">
                {t.home_intro_p2_portfolio_link}
              </a>

              {" "}{t.home_intro_p2_or}{" "}

              <a href="#footer">
                  {t.home_intro_p2_contact_link}
              </a>
            </p>
          </div>
        </div>

        <div className="pt-15 lg:pt-35 pb-40 w-dvw h-auto">
          <h2 className="subheadings mb-10 text-center text-2xl lg:text-4xl">{t.home_skills_heading}</h2>
          {LazySkillsScene()}
          {/* <Skills_scene/> */}
        </div>
      </main>

    </div>
  );
}