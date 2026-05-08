"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import pinwheelSvg from "../../../public/assets/bangbulb-pinwheel.svg";
import wordmarkSvg from "../../../public/assets/bangbulb-wordmark.svg";

interface LoaderProps {
  onDone?: () => void;
}

export default function Loader({ onDone }: LoaderProps) {
  const [n, setN] = useState(0);
  const [phase, setPhase] = useState<"loading" | "exiting" | "done">("loading");

  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    document.documentElement.classList.add("is-loading");
    const start = performance.now();
    const dur = 2200;
    let raf = 0;
    let exitTimer: number | undefined;
    let failsafe: number | undefined;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      setPhase("exiting");
      exitTimer = window.setTimeout(() => {
        setPhase("done");
        document.documentElement.classList.remove("is-loading");
        onDoneRef.current?.();
      }, 1100);
    };

    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        finish();
      }
    };
    raf = requestAnimationFrame(tick);

    failsafe = window.setTimeout(() => {
      if (!finished) {
        setN(100);
        finish();
      }
    }, 5000);

    return () => {
      cancelAnimationFrame(raf);
      if (exitTimer !== undefined) clearTimeout(exitTimer);
      if (failsafe !== undefined) clearTimeout(failsafe);
    };
  }, []);

  if (phase === "done") return null;

  // Reveal the wordmark from left to right as the counter ticks up.
  // Uses inset() clip-path: at n=0 the right side is fully clipped (100%),
  // at n=100 nothing is clipped — the full logo is visible.
  const wordmarkClip = `inset(0 ${100 - n}% 0 0)`;

  return (
    <div className={"loader loader--" + phase}>
      <div className="loader__bg"></div>
      <div className="loader__center">
        <div className="loader__wordmark-stage">
          {/* Faint placeholder — gives the eye an anchor at 0% */}
          <div className="loader__wordmark loader__wordmark--ghost">
            <Image src={wordmarkSvg} alt="" width={520} height={350} />
          </div>
          {/* Filled wordmark, revealed left→right with clip-path */}
          <div className="loader__wordmark loader__wordmark--fill" style={{ clipPath: wordmarkClip }}>
            <Image src={wordmarkSvg} alt="BangBulb" width={520} height={350} priority />
          </div>
          {/* Small spinning pinwheel as a kinetic accent */}
          <div className="loader__pinwheel-mini">
            <Image src={pinwheelSvg} alt="" width={64} height={64} />
          </div>
        </div>
      </div>
      <div className="loader__top">
        <span className="mono">BangBulb® / 2026</span>
        <span className="mono">v.07 — yükleniyor</span>
      </div>
      <div className="loader__bottom">
        <span className="mono">— reklam ajansı —</span>
        <span className="loader__counter mono">
          {String(n).padStart(3, "0")}
          <span style={{ opacity: 0.5 }}>%</span>
        </span>
      </div>
      <div className="loader__bar">
        <div
          className="loader__bar-fill"
          style={{ transform: `scaleX(${n / 100})` }}
        ></div>
      </div>
    </div>
  );
}
