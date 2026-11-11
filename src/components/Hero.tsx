"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import pinwheelSvg from "../../public/assets/bangbulb-pinwheel.svg";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface HeroProps {
  titleA?: string;
  titleB?: string;
  titleC?: string;
  titleD?: string;
  onContactClick?: () => void;
}

export default function Hero({
  titleA = "parlak",
  titleB = "fikirler",
  titleC = "karanlık",
  titleD = "odalar",
  onContactClick,
}: HeroProps) {
  const logoRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Hafif paralaks: kaydırdıkça pervane döner ve biraz küçülür.
  // Pasif scroll dinleyicisi, kare başına en çok bir rAF.
  useEffect(() => {
    if (reduced) return;
    const el = logoRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      // Hero ekrandan çıktıktan sonra boşuna stil yazma.
      if (y > window.innerHeight * 1.2) return;
      el.style.transform = `rotate(${y * 0.3}deg) scale(${
        1 - Math.min(y / 1600, 0.2)
      })`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  useEffect(() => {
    if (reduced || !logoRef.current) return;
    logoRef.current.animate(
      [
        { transform: "rotate(-180deg) scale(0.6)", opacity: "0" },
        { transform: "rotate(0deg) scale(1)", opacity: "1" },
      ],
      { duration: 1000, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)", fill: "backwards" }
    );
  }, [reduced]);

  return (
    <section className="hero" id="top">
      <div className="hero__bg"></div>
      <div className="hero__noise"></div>
      <div className="hero__grid">
        <div className="hero__copy">
          <div className="hero__meta">
            <span className="eyebrow">reklam ajansı</span>
            <span className="mono" style={{ color: "var(--sage-2)" }}>
              ◉ İstanbul
            </span>
          </div>

          <h1 className="hero__title display">
            <span className="word">{titleA}</span>{" "}
            <span className="word ital">{titleB}</span>
            <br />
            <span className="word">{titleC}</span>{" "}
            <span className="word accent">{titleD}</span>
            <br />
            <span className="word ital">için.</span>
          </h1>

          <p className="hero__lede">
            BangBulb, markaların fikrini kreatiften medyaya tek elden yürüten,
            sekiz kişilik bir reklam ajansı.
          </p>

          <div className="hero__cta">
            <button
              type="button"
              className="hero__btn hero__btn--primary"
              data-cursor="hadi"
              onClick={onContactClick}
            >
              <span className="nav__cta-dot"></span>
              Proje konuşalım
            </button>
            <a
              href="#islerimiz"
              className="hero__btn hero__btn--ghost"
              data-cursor="hover"
            >
              İşleri gör <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div className="hero__stats">
            <div className="hero__stat-num">
              8 <span className="italic">kişi</span>
            </div>
            <span className="mono" style={{ color: "var(--sage-2)" }}>
              tek bir ekip, tek bir oda
            </span>
          </div>
        </div>

        <div className="hero__logo-stage">
          <div className="hero__logo" ref={logoRef}>
            <div className="hero__logo-rays"></div>
            <Image
              src={pinwheelSvg}
              alt="BangBulb"
              width={260}
              height={260}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
