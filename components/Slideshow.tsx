"use client";
import { useState, useEffect } from "react";

type Slide = {
  src: string;
  caption: string;
  alt: string;
};

type Props = {
  slides: Slide[];
  onSlideChange?: (slide: Slide) => void;
};

export default function Slideshow({ slides, onSlideChange }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // preload all slide images once on mount so browser cache already has them
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = `${process.env.NEXT_PUBLIC_BASE_PATH}${slide.src}`;
    });
  }, [slides]);

  const plusSlides = (n: number) => {
    const next = (currentSlide + n + slides.length) % slides.length;
    setCurrentSlide(next);
    onSlideChange?.(slides[next]);
  };

  return (
    <div className="slideshow-container flex flex-col align-center w-full mb-5 lg:mb-0">
      <img className="slide-img mx-auto block" src={`${process.env.NEXT_PUBLIC_BASE_PATH}${slides[currentSlide].src}`} alt={slides[currentSlide].alt}/>
      <div className="font-[Lora] text-center text-sm lg:text-xl mt-2">{slides[currentSlide].caption}</div>
      <div className="cursor-pointer flex text-sm lg:text-2xl justify-center gap-3 
        lg:gap-4 align-center m-auto lg:underline-offset-11 mt-1 lg:mt-0"
      >
        <button type="button"
          onClick={() => plusSlides(-1)} 
          disabled={currentSlide === 0}
          className="animated-link disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Go to previous slide"
        >
          &#10229;
        </button>

        <div className="font-[Lora] text-center text-xs lg:text-lg whitespace-nowrap m-auto">{currentSlide + 1} / {slides.length}</div>

        <button
          type="button"
          onClick={() => plusSlides(1)} 
          disabled={currentSlide === slides.length - 1}
          className="animated-link disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Go to next slide"
        >
          &#10230;
        </button>
      </div>
    </div>
  );
}