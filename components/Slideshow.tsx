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
    <div className="slideshow-container flex flex-col align-center w-full">
      <img className="slide-img mx-auto block" src={slides[currentSlide].src} />
      <div className="photo-captions">{slides[currentSlide].caption}</div>
      <div className="arrows cursor-pointer">
        <a onClick={() => plusSlides(-1)}>&#10229;</a>
        <div className="numbertext">{currentSlide + 1} / {slides.length}</div>
        <a onClick={() => plusSlides(1)}>&#10230;</a>
      </div>
    </div>
  );
}