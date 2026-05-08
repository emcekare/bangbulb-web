"use client";
import { useEffect, useRef, useState } from "react";
import { getAssetPath } from "@/lib/asset";

const works = [
  { id: "a", title: "Quasar Lansman", cat: "KAMPANYA / FILM", year: "2025", layout: "a" },
  { id: "b", title: "Offis Mekan", cat: "SOSYAL MEDYA", year: "2025", layout: "b" },
  { id: "c", title: "La Liberté", cat: "AMBALAJ", year: "2024", layout: "c", link: "https://www.behance.net/gallery/145736391/LaLibert-Coffee-Packaging-design", video: "/assets/videos/la-liberte.mp4" },
  { id: "d", title: "Saatçi Co.", cat: "KIMLIK", year: "2024", layout: "d" },
  { id: "e", title: "Lale Sokağı", cat: "TVC", year: "2024", layout: "e" },
  { id: "f", title: "Mira Skincare", cat: "META PERFORMANCE", year: "2025", layout: "f" },
  { id: "g", title: "Kahve & Co.", cat: "AÇIK HAVA", year: "2025", layout: "g" },
];

export default function Works() {
  const pinRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [modalLink, setModalLink] = useState<string | null>(null);

  // ESC tuşu ile modalı kapatma
  useEffect(() => {
    if (!modalLink) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalLink(null);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [modalLink]);

  useEffect(() => {
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return;

    // Cache layout-derived values; only recompute on resize / fonts loaded.
    // Reading scrollWidth every frame caused layout thrash, and the +80
    // buffer the prototype used left a 100+ px gap to the right of the
    // last card on desktop.
    let trackW = 0;
    let total = 0;

    const recalc = () => {
      // Distance the track must shift so its right edge meets the viewport's
      // right edge (track has `padding: 0 var(--pad)`, so the page's edge
      // padding is preserved automatically — no extra buffer needed).
      trackW = Math.max(0, track.scrollWidth - window.innerWidth);
      total = Math.max(0, pin.offsetHeight - window.innerHeight);
    };

    recalc();
    window.addEventListener("resize", recalc);
    // Card widths can shift once webfonts load — recompute when ready.
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(recalc);
    }

    let raf = 0;
    const tick = () => {
      if (total > 0 && trackW > 0) {
        const r = pin.getBoundingClientRect();
        const passed = -r.top;
        const p = Math.max(0, Math.min(1, passed / total));
        track.style.transform = `translateX(${-p * trackW}px)`;
        const fill = document.getElementById("works-progress-fill");
        if (fill) fill.style.transform = `scaleX(${p})`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", recalc);
    };
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
              <article
                key={w.id}
                className="hwork"
                data-cursor="İNCELE"
                onClick={() => w.link && setModalLink(w.link)}
                style={w.link ? { cursor: 'pointer' } : undefined}
              >
                <div className="hwork__index mono">
                  / {String(i + 1).padStart(2, "0")} — {String(works.length).padStart(2, "0")}
                </div>
                <div className={"hwork__media work__bg-" + w.layout} style={{ position: 'relative', overflow: 'hidden' }}>
                  {w.video && (
                    <>
                      <video
                        src={getAssetPath(w.video)}
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 0 }}></div>
                    </>
                  )}
                  <div className="hwork__media-label" style={{ zIndex: 1, color: w.video ? '#fff' : undefined }}>
                    {w.title.toUpperCase()} / {w.cat} / {w.year}
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

      {modalLink && (
        <div
          onWheel={(e) => e.stopPropagation()}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.8)', padding: '2rem'
          }}
        >
          <div style={{ position: 'absolute', inset: 0 }} onClick={() => setModalLink(null)} />
          <div style={{
            position: 'relative', width: '100%', maxWidth: '1200px', height: '85vh',
            backgroundColor: '#1a1a1a', borderRadius: '12px', overflow: 'hidden',
            display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
          }}>
            <div style={{
              height: '40px', backgroundColor: '#2a2a2a', display: 'flex', alignItems: 'center', padding: '0 16px', gap: '16px'
            }}>
              <div style={{
                flex: 1, backgroundColor: '#1a1a1a', height: '24px', borderRadius: '12px',
                color: '#888', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'monospace'
              }}>
                {modalLink}
              </div>
              <button
                onClick={() => setModalLink(null)}
                aria-label="Kapat"
                style={{
                  background: 'none', border: 'none', color: '#aaa', fontSize: '20px',
                  cursor: 'pointer', width: '32px', height: '32px', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', borderRadius: '6px',
                  transition: 'background 0.2s, color 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#aaa'; }}
              >
                ×
              </button>
            </div>
            <div style={{ flex: 1, backgroundColor: '#fff' }}>
              <iframe
                src={modalLink.includes('behance.net/gallery/') ? `https://www.behance.net/embed/project/${modalLink.split('/')[4]}?tracking_source=project_controls` : modalLink}
                style={{ width: '100%', height: '100%', border: 'none' }}
                allow="fullscreen"
                scrolling="yes"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
