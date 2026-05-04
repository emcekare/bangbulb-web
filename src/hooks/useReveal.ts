"use client";
import { useEffect } from "react";

export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .process");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            if (e.target.classList.contains("process"))
              e.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.16 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
