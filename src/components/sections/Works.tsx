"use client";
import { useEffect, useRef } from "react";

const works = [
  { id: "a", title: "Quasar Lansman", cat: "KAMPANYA / FILM", year: "2025", layout: "a" },
  { id: "b", title: "Offis Mekan", cat: "SOSYAL MEDYA", year: "2025", layout: "b" },
  { id: "c", title: "Beyaz Bahçe", cat: "AMBALAJ", year: "2024", layout: "c" },
  { id: "d", title: "Saatçi Co.", cat: "KIMLIK", year: "2024", layout: "d" },
  { id: "e", title: "Lale Sokağı", cat: "TVC", year: "2024", layout: "e" },
  { id: "f", title: "Mira Skincare", cat: "META PERFORMANCE", year: "2025", layout: "f" },
  { id: "g", title: "Kahve & Co.", cat: "AÇIK HAVA", year: "2025", layout: "g" },
];

export default function Works() {
  const pinRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pinRef.current || !trackRef.current) return;
    let raf: number;
    const tick = () => {
      const pin = pinRef.current;
      const track = trackRef.current;
      if (pin && track) {
        const r = pin.getBoundingClientRect();
        const total = pin.offsetHeight - window.innerHeight;
        const passed = -r.top;
        const p = Math.max(0, Math.min(1, passed / total));
        const trackW = track.scrollWidth - window.innerWidth + 80;
        track.style.transform = `translateX(${-p * trackW}px)`;
        const fill = document.getElementById("works-progress-fill");
        if (fill) fill.style.transform = `scaleX(${p})`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="works" id="islerimiz" ref={pinRef}>
      <div className="works__sticky">
        <div className="container works__head reveal">
          <div className="s-head__num">— 03 / seçilmiş işler</div>
          <div>
            <h2 className="s-head__title display">
              Vitrin{" "}
              <span style={{ fontStyle: "italic", color: "var(--sage-2)" }}>
                — sıkıcı kısmı atladık.
              </span>
            </h2>
            <p className="s-head__sub">
              Marka kimliğinden 30 saniyelik filme, ambalajdan içerik serisine.
              ↓ aşağı scroll → yatay galeri kayar.
            </p>
          </div>
        </div>

        <div className="works__viewport">
          <div className="works__track" ref={trackRef}>
            {works.map((w, i) => (
              <article key={w.id} className="hwork" data-cursor="vakayı aç">
                <div className="hwork__index mono">
                  / {String(i + 1).padStart(2, "0")} — {String(works.length).padStart(2, "0")}
                </div>
                <div className={"hwork__media work__bg-" + w.layout}>
                  <div className="hwork__media-label">
                    {w.title.toUpperCase()} / {w.cat}
                  </div>
                </div>
                <div className="hwork__meta">
                  <h3 className="hwork__title display">{w.title}</h3>
                  <div className="hwork__row">
                    <span>{w.cat}</span>
                    <span>·</span>
                    <span>{w.year}</span>
                  </div>
                </div>
              </article>
            ))}
            <div className="hwork hwork--end">
              <div className="hwork__end">
                <div className="display" style={{ fontSize: 64, lineHeight: 0.95 }}>
                  hepsini{" "}
                  <span style={{ fontStyle: "italic", color: "var(--sage-2)" }}>
                    gör
                  </span>
                </div>
                <a
                  className="nav__cta"
                  data-cursor="hepsi"
                  style={{ marginTop: 24 }}
                >
                  <span className="nav__cta-dot"></span>
                  arşivi aç
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="works__progress">
          <div className="works__progress-track">
            <div
              className="works__progress-fill"
              id="works-progress-fill"
            ></div>
          </div>
          <span className="mono">scroll ↓ horizontal</span>
        </div>
      </div>
    </section>
  );
}
