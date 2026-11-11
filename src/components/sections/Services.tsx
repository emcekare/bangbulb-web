"use client";
import { useState, useEffect, useRef } from "react";
import { serviceItems, type ServiceItem } from "@/content/services";

export default function Services() {
  const [hover, setHover] = useState<ServiceItem | null>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!imgRef.current) return;
      imgRef.current.style.left = e.clientX + "px";
      imgRef.current.style.top = e.clientY + "px";
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="section services" id="hizmetler">
      <div className="container">
        <svg className="services__circle services__circle--rot" viewBox="0 0 220 220">
          <defs>
            <path
              id="circ"
              d="M 110, 110 m -90, 0 a 90,90 0 1,1 180,0 a 90,90 0 1,1 -180,0"
            />
          </defs>
          <text>
            <textPath href="#circ">
              ✱ 360° iletişim · kreatif · strateji · medya · ✱ 360° iletişim · kreatif ·
            </textPath>
          </text>
        </svg>

        <div className="s-head reveal">
          <div className="s-head__num">— 01 / hizmetler</div>
          <div>
            <h2 className="s-head__title display">
              360°{" "}
              <span style={{ fontStyle: "italic", color: "var(--sage-2)" }}>
                ne yapıyoruz?
              </span>
            </h2>
            <p className="s-head__sub">
              Sosyal medyadan TV reklamına, ambalajdan influencer&apos;a — tek elden,
              eksiksiz, ama abartısız. Aşağıdakilerin hepsi bir oda içinde olup
              biter.
            </p>
          </div>
        </div>

        <div className="services__list reveal">
          {serviceItems.map((s, i) => (
            <div
              key={i}
              className="service"
              data-cursor="görüntüle"
              onMouseEnter={() => setHover(s)}
              onMouseLeave={() => setHover(null)}
            >
              <span className="service__num">{s.num}</span>
              <span className="service__name">{s.name}</span>
              <span className="service__tag">{s.tag}</span>
              <span className="service__arrow">↗</span>
            </div>
          ))}
        </div>
      </div>

      <div
        ref={imgRef}
        className={"services__hover-img " + (hover ? "is-active" : "")}
      >
        <div
          className={"work__bg-" + (hover?.color || "a")}
          style={{ position: "absolute", inset: 0 }}
        ></div>
        <div className="services__hover-img-stripe"></div>
        <div className="services__hover-img-label">
          {hover?.name || ""} / preview
        </div>
      </div>
    </section>
  );
}
