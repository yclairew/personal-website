"use client";

import ".././globals.css";
import Slideshow from "@/components/Slideshow";
import Overscroll_color from "@/components/Overscroll_color";
import { useAnimateOnScroll } from "@/hooks/useAnimateOnScroll";
import { useLocale } from "@/lib/i18n/Locale_context";

const serviceSlidesData = [
  { id: "park-cleanup", src: "park-cleanup.jpg" },
  { id: "flo-bowl", src: "flo-bowl.jpg" },
  { id: "freshman-big-event", src: "freshman-big-event.jpg" },
  { id: "sophomore-big-event", src: "sophomore-big-event.png" },
];

function getServiceSlides(t: Record<string, string>) {
  return serviceSlidesData.map((slide) => ({
    ...slide,
    caption: t[`service_slide_${slide.id}_caption`],
  }));
}


export default function Service() {
  const ref1 = useAnimateOnScroll();  
  const ref2 = useAnimateOnScroll(); 
  Overscroll_color(); 
  const { t, locale } = useLocale();
  const isChinese = ["zh-Hans", "zh-Hant"].includes(locale);

  const serviceSlides = getServiceSlides(t);

  return (
    <div className="bg-background">
      <title>{t.site_title}</title>

      <h1 className={`heading-text text-text mt-5 ${isChinese ? "text-[10rem]! mt-18 mb-5! underline-offset-20!" : ""}`}>{t.service_heading}</h1>

      <div className="service-container">
          <Slideshow slides={serviceSlides}/>

          <div ref={ref1} className="animate-target service-text-container pt-10 pb-8 ml-12 mr-12">
              <p className="service-text body-text">
                  {t.service_text_prefix}{" "}
                  <a href="https://fish.tamu.edu/">MSC FISH</a>,{" "}
                  {t.service_text_suffix}
              </p>
          </div>
      </div>

      <div ref={ref2} className="animate-target extra-service-text-container ml-12 mr-12 mb-35">
          <p className="body-text">
              {t.service_extra_text_prefix}{" "}
              <a href="https://bigevent.tamu.edu/">Big Event</a>,{" "}
              {t.service_extra_text_suffix}
          </p>
      </div>

    </div>
  );
}
