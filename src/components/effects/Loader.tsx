"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface LoaderProps {
  onDone?: () => void;
}

export default function Loader({ onDone }: LoaderProps) {
  const [n, setN] = useState(0);
  const [phase, setPhase] = useState<"loading" | "exiting" | "done">("loading");
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    document.documentElement.classList.add("is-loading");
    const start = performance.now();
    startRef.current = start;
    const dur = 2200;
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setPhase("exiting");
        setTimeout(() => {
          setPhase("done");
          document.documentElement.classList.remove("is-loading");
          onDone?.();
        }, 1100);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  if (phase === "done") return null;

  return (
    <div className={"loader loader--" + phase}>
      <div className="loader__bg"></div>
      <div className="loader__center">
        <div className="loader__pinwheel">
          <Image
            src="/assets/bangbulb-pinwheel.svg"
            alt=""
            width={240}
            height={240}
          />
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
