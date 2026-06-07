"use client";
import { useState } from 'react';


const slides = [
  { src: "park-cleanup.jpg", caption: "Austin Park Cleanup" },
  { src: "flo-bowl.jpg", caption: "FLO Bowl Volunteering" },
  { src: "freshman-big-event.jpg", caption: "Freshman Year at Big Event with MSC FISH" },
  { src: "sophomore-big-event.png", caption: "Sophomore Year at Big Event with Aggies Create" }
];


export default function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const plusSlides = (n: number) => {
    setCurrentSlide(prev => (prev + n + slides.length) % slides.length);
  };

  return (
    <div className="slideshow-container flex flex-col align-center w-full">
      <img className="slide-img mx-auto block" src={slides[currentSlide].src} />
      <div className="photo-captions">{slides[currentSlide].caption}</div>
      <div className="arrows">
        <a onClick={() => plusSlides(-1)}>&#10229;</a>
        <div className="numbertext">{currentSlide + 1} / {slides.length}</div>
        <a onClick={() => plusSlides(1)}>&#10230;</a>
      </div>
    </div>
  );
}