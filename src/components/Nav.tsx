"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import pinwheelSvg from "../../public/assets/bangbulb-pinwheel.svg";

function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLAnchorElement>(null);
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

export default function Nav() {
  const ctaRef = useMagnetic(0.3);
  return (
    <nav className="nav">
      <a href="#top" className="nav__brand" data-cursor="ana sayfa">
        <span className="nav__brand-mark nav__brand-mark--lg">
          <Image
            src={pinwheelSvg}
            alt=""
            width={32}
            height={32}
          />
        </span>
        <span className="nav__brand-text">
          Bangbulb<span style={{ opacity: 0.5 }}>®</span> 2026
        </span>
      </a>
      <div className="nav__links">
        <a href="#hizmetler" data-cursor="hover">
          Hizmetler
        </a>
        <a href="#islerimiz" data-cursor="hover">
          İşler
        </a>
        <a href="#surec" data-cursor="hover">
          Süreç
        </a>
        <a href="#ekip" data-cursor="hover">
          Ekip
        </a>
        <a href="#iletisim" data-cursor="hover">
          İletişim
        </a>
      </div>
      <a
        href="#iletisim"
        className="nav__cta"
        ref={ctaRef}
        data-cursor="hadi"
      >
        <span className="nav__cta-dot"></span>
        Yeni iş başlat
      </a>
    </nav>
  );
}
