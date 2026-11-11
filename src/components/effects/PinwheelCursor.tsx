"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import pinwheelSvg from "../../../public/assets/bangbulb-pinwheel.svg";

interface PinwheelCursorProps {
  enabled: boolean;
}

export default function PinwheelCursor({ enabled }: PinwheelCursorProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    // Dokunmatik / hover olmayan cihazlarda ve hareket azaltma tercihinde
    // atla: değiştirilecek imleç yok, sistem imleci kalır.
    const isCoarse =
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(hover: none)").matches;
    if (!enabled || isCoarse || reduced) {
      document.body.classList.remove("no-cursor");
      return;
    }
    document.body.classList.add("no-cursor");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = 0;

    // Döngü yalnızca imleç hareket ederken ya da hedefe yaklaşırken çalışır.
    // Pervanenin dönüşü CSS animasyonu (compositor), JS gerektirmez.
    const tick = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      const settled = Math.abs(tx - x) < 0.1 && Math.abs(ty - y) < 0.1;
      if (settled) {
        x = tx;
        y = ty;
      }
      if (wrapRef.current) {
        wrapRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
      raf = settled ? 0 : requestAnimationFrame(tick);
    };

    const move = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onOver = (e: MouseEvent) => {
      const t = (e.target as Element).closest("[data-cursor]");
      if (t) {
        wrapRef.current?.classList.add("is-hover");
        const label = t.getAttribute("data-cursor");
        if (label && label !== "hover" && labelRef.current) {
          labelRef.current.textContent = label;
          wrapRef.current?.classList.add("is-label");
        } else {
          wrapRef.current?.classList.remove("is-label");
        }
      } else {
        wrapRef.current?.classList.remove("is-hover");
        wrapRef.current?.classList.remove("is-label");
      }
    };

    // İlk konumu yaz
    if (wrapRef.current) {
      wrapRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", onOver);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onOver);
      document.body.classList.remove("no-cursor");
    };
  }, [enabled, reduced]);

  if (!enabled || reduced) return null;
  return (
    <div className="pcursor" ref={wrapRef}>
      <div className="pcursor__pin" ref={pinRef}>
        <Image
          src={pinwheelSvg}
          alt=""
          width={40}
          height={40}
        />
      </div>
      <div className="pcursor__label" ref={labelRef}></div>
    </div>
  );
}
