"use client";
import { useEffect } from "react";

const stops = [
  { t: 0.0, bg: [12, 24, 22] },
  { t: 0.25, bg: [15, 32, 29] },
  { t: 0.45, bg: [25, 50, 47] },
  { t: 0.65, bg: [40, 65, 60] },
  { t: 0.85, bg: [60, 90, 84] },
  { t: 1.0, bg: [12, 24, 22] },
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const colorAt = (p: number) => {
  for (let i = 0; i < stops.length - 1; i++) {
    if (p <= stops[i + 1].t) {
      const span = stops[i + 1].t - stops[i].t;
      const local = (p - stops[i].t) / span;
      const r = lerp(stops[i].bg[0], stops[i + 1].bg[0], local);
      const g = lerp(stops[i].bg[1], stops[i + 1].bg[1], local);
      const b = lerp(stops[i].bg[2], stops[i + 1].bg[2], local);
      return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
    }
  }
  return `rgb(${stops[0].bg.join(",")})`;
};

export default function ScrollBgMorph() {
  useEffect(() => {
    let raf: number;
    const tick = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = Math.max(0, Math.min(1, window.scrollY / max));
      document.documentElement.style.setProperty("--scroll-bg", colorAt(p));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return null;
}
