"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import pinwheelSvg from "../../public/assets/bangbulb-pinwheel.svg";

function useMagnetic<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };
    const onLeave = () => (el.style.transform = "");
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);
  return ref;
}

interface NavProps {
  onContactClick?: () => void;
}

export default function Nav({ onContactClick }: NavProps) {
  const ctaRef = useMagnetic<HTMLButtonElement>(0.3);
  return (
    <nav className="nav">
      <a href="#top" className="nav__brand" data-cursor="ana sayfa">
        <span className="nav__brand-mark nav__brand-mark--lg">
          <Image src={pinwheelSvg} alt="" width={32} height={32} />
        </span>
        <span className="nav__brand-text">
          Bangbulb<span style={{ opacity: 0.5 }}>®</span> 2026
        </span>
      </a>
      <div className="nav__links">
        <a href="#hizmetler" data-cursor="hover">Hizmetler</a>
        <a href="#islerimiz" data-cursor="hover">İşler</a>
        <a href="#surec" data-cursor="hover">Süreç</a>
        <a href="#ekip" data-cursor="hover">Ekip</a>
        <a href="#iletisim" data-cursor="hover">İletişim</a>
      </div>
      <button
        type="button"
        className="nav__cta"
        ref={ctaRef}
        data-cursor="hadi"
        onClick={onContactClick}
      >
        <span className="nav__cta-dot"></span>
        İletişime Geç
      </button>
    </nav>
  );
}
