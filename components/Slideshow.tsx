"use client";
import { useState } from "react";


type Slide = {
  src: string;
  caption: string;
};

type Props = {
  slides: Slide[];
  onSlideChange?: (slide: Slide) => void;
};

export default function Slideshow({ slides, onSlideChange }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const plusSlides = (n: number) => {
    const next = (currentSlide + n + slides.length) % slides.length;
    setCurrentSlide(next);
    onSlideChange?.(slides[next]);
  };

  return (
    <div className="slideshow-container flex flex-col align-center w-full mb-5 lg:mb-0">
      {/* <img className="slide-img mx-auto block" src={slides[currentSlide].src} /> */}

      {/* for hosting on people.tamu.edu */}
      <img className="slide-img mx-auto block" src={`/~y.clairewu${slides[currentSlide].src}`} />
      <div className="font-[Lora] text-center text-sm lg:text-xl mt-2">{slides[currentSlide].caption}</div>
      <div className="cursor-pointer flex text-sm lg:text-2xl justify-center gap-3 
        lg:gap-4 align-center m-auto lg:underline-offset-11 mt-1 lg:mt-0"
      >
        <a onClick={() => plusSlides(-1)} aria-label="Go to previous slide">&#10229;</a>
        <div className="font-[Lora] text-center text-xs lg:text-lg whitespace-nowrap m-auto">{currentSlide + 1} / {slides.length}</div>
        <a onClick={() => plusSlides(1)} aria-label="Go to next slide">&#10230;</a>
      </div>
    </div>
  );
}