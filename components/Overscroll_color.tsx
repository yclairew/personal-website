"use client";

import { useEffect } from "react";

export default function Overscroll_color() {
  useEffect(() => {
    const updateOverscrollColor = () => {
      const scrollY = window.scrollY;
      const scrollBottom = scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;

      const nearBottom = pageHeight - scrollBottom < 50;
      const nearTop = scrollY < 50;

      document.body.style.backgroundColor = nearBottom
        ? "var(--color-accent-light)"
        : nearTop
        ? "var(--color-accent-light)"
        : "var(--color-background)";
    };

    window.addEventListener("scroll", updateOverscrollColor);
    window.addEventListener("resize", updateOverscrollColor);
    updateOverscrollColor();

    return () => {
      window.removeEventListener("scroll", updateOverscrollColor);
      window.removeEventListener("resize", updateOverscrollColor);
    };
  }, []);

  return null;
}