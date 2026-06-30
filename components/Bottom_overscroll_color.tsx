"use client";

import { useEffect } from "react";

export default function Bottom_overscroll_color() {
  useEffect(() => {
    const updateOverscrollColor = () => {
      const scrollBottom = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const nearBottom = pageHeight - scrollBottom < 50;
      document.body.style.backgroundColor = nearBottom ? "var(--color-accent-tag)" : "var(--color-background)";
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