"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import pinwheelSvg from "../../../public/assets/bangbulb-pinwheel.svg";

interface PinwheelCursorProps {
  enabled: boolean;
}

export default function PinwheelCursor({ enabled }: PinwheelCursorProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on touch / no-hover devices: there's no cursor to replace, and
    // leaving body.no-cursor on hides any inherited cursor unnecessarily.
    const isCoarse =
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(hover: none)").matches;
    if (!enabled || isCoarse) {
      document.body.classList.remove("no-cursor");
      return;
    }
    document.body.classList.add("no-cursor");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let rot = 0;
    let speed = 0.4;
    let raf: number;

    const move = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const tick = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      rot += speed;
      if (wrapRef.current) {
        wrapRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
      if (pinRef.current) {
        pinRef.current.style.transform = `translate(-50%, -50%) rotate(${rot}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    const onOver = (e: MouseEvent) => {
      const t = (e.target as Element).closest("[data-cursor]");
      if (t) {
        wrapRef.current?.classList.add("is-hover");
        speed = 1.6;
        const label = t.getAttribute("data-cursor");
        if (label && label !== "hover" && labelRef.current) {
          labelRef.current.textContent = label;
          wrapRef.current?.classList.add("is-label");
        }
      } else {
        wrapRef.current?.classList.remove("is-hover");
        wrapRef.current?.classList.remove("is-label");
        speed = 0.4;
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", onOver);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onOver);
      document.body.classList.remove("no-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;
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
