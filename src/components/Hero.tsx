"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import pinwheelSvg from "../../public/assets/bangbulb-pinwheel.svg";

interface HeroProps {
  titleA?: string;
  titleB?: string;
  titleC?: string;
  titleD?: string;
}

export default function Hero({
  titleA = "parlak",
  titleB = "fikirler",
  titleC = "karanlık",
  titleD = "odalar",
}: HeroProps) {
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let raf: number;
    const tick = () => {
      const y = window.scrollY;
      if (logoRef.current) {
        logoRef.current.style.transform = `rotate(${y * 0.3}deg) scale(${
          1 - Math.min(y / 1600, 0.2)
        })`;
      }
      if (titleRef.current) {
        titleRef.current.style.transform = `translateY(${y * 0.18}px)`;
        titleRef.current.style.letterSpacing = `${
          -0.04 + Math.min(y / 12000, 0.008)
        }em`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!logoRef.current) return;
    logoRef.current.animate(
      [
        { transform: "rotate(-180deg) scale(0.6)", opacity: "0" },
        { transform: "rotate(0deg) scale(1)", opacity: "1" },
      ],
      { duration: 1400, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)", fill: "backwards" }
    );
  }, []);

  return (
    <section className="hero" id="top">
      <div className="hero__bg"></div>
      <div className="hero__noise"></div>
      <div className="hero__grid">
        <div className="hero__top">
          <div className="hero__meta">
            <span className="mono" style={{ color: "var(--sage-2)" }}>
              ◉ İstanbul, 41.0686°N
            </span>
            <span className="mono">2019 — 2026 / yedi yıl</span>
          </div>
          <div className="hero__meta" style={{ alignItems: "center" }}>
            <span className="eyebrow">— reklam ajansı —</span>
            <span className="mono" style={{ color: "var(--sage-2)" }}>
              v.07 / cilt 2026
            </span>
          </div>
          <div className="hero__meta hero__meta-r">
            <span className="mono">/ 360° iletişim</span>
            <span className="mono" style={{ color: "var(--sage-2)" }}>
              kreatif & medya
            </span>
          </div>
        </div>

        <h1 className="hero__title display" ref={titleRef}>
          <span className="word">{titleA}</span>{" "}
          <span className="word ital">{titleB}</span>
          <br />
          <span className="word">{titleC}</span>{" "}
          <span className="word accent">{titleD}</span>
          <br />
          <span className="word ital">için.</span>
        </h1>

        <div className="hero__logo-stage">
          <div className="hero__logo" ref={logoRef}>
            <div className="hero__logo-rays"></div>
            <Image
              src={pinwheelSvg}
              alt="BangBulb"
              width={260}
              height={260}
            />
          </div>
        </div>

        <div className="hero__bottom">
          <p className="hero__lede">
            Reklamı seven, sosyal medyayı önemseyen, abartmadan iş yapan sekiz
            kişilik bir ajansız. Markaların{" "}
            <span className="italic">&apos;aha&apos;</span> ânını yakalıyoruz —
            sonra elektriği çarpıyoruz.
          </p>

          <div className="hero__scroll">
            <span>aşağı in</span>
            <span className="hero__scroll-line"></span>
            <span style={{ opacity: 0.5 }}>scroll</span>
          </div>

          <div className="hero__stats">
            <div className="hero__stat-num">
              8 <span className="italic">kişi</span>
            </div>
            <span className="mono" style={{ color: "var(--sage-2)" }}>
              tek bir ekip — tek bir oda
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
