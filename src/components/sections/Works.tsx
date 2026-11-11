"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { getAssetPath } from "@/lib/asset";
import { useModalA11y } from "@/hooks/useModalA11y";
import { archiveUrl } from "@/content/links";
import { works, behanceEmbedSrc } from "@/content/works";

export default function Works() {
  const pinRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalPanelRef = useRef<HTMLDivElement>(null);
  const [modalLink, setModalLink] = useState<string | null>(null);

  const closeModal = useCallback(() => setModalLink(null), []);

  // Escape, scroll kilidi, focus tuzağı ve focus geri verme
  useModalA11y(modalLink !== null, closeModal, modalPanelRef);

  // Video yalnızca görünürken oynasın. preload="none" ile birleşince
  // kart ekrana girene kadar tek bayt indirilmiyor.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? false;
        if (visible) {
          void v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return;

    // Layout'tan türeyen değerleri cache'le; yalnızca resize / font
    // yüklenince yeniden hesapla. Her frame'de scrollWidth okumak layout
    // thrash yaratıyordu ve prototipteki +80 buffer masaüstünde son
    // kartın sağında 100+ piksellik boşluk bırakıyordu.
    let trackW = 0;
    let total = 0;

    const recalc = () => {
      // Track'in sağ kenarı viewport'un sağ kenarına denk gelene kadar
      // kayması gereken mesafe (track'te `padding: 0 var(--pad)` var, yani
      // sayfa kenar boşluğu otomatik korunur — ekstra buffer gerekmez).
      trackW = Math.max(0, track.scrollWidth - window.innerWidth);
      total = Math.max(0, pin.offsetHeight - window.innerHeight);
    };

    recalc();
    window.addEventListener("resize", recalc);
    // Webfont'lar yüklenince kart genişlikleri değişebilir — hazır olunca yeniden hesapla.
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
                // "İNCELE" imleci yalnızca gerçekten açılacak bir iş varsa
                // görünsün; diğer kartlarda tıklama vaadi veriyordu.
                // Link varsa kart bir butondur: klavyeyle odaklanılır,
                // Enter/Space ile açılır.
                {...(w.link
                  ? {
                      "data-cursor": "İNCELE",
                      role: "button",
                      tabIndex: 0,
                      "aria-label": `${w.title} — ${w.cat} işini incele`,
                      onClick: () => setModalLink(w.link!),
                      onKeyDown: (e: React.KeyboardEvent) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setModalLink(w.link!);
                        }
                      },
                      style: { cursor: "pointer" },
                    }
                  : {})}
              >
                <div className="hwork__index mono">
                  / {String(i + 1).padStart(2, "0")} — {String(works.length).padStart(2, "0")}
                </div>
                <div className={"hwork__media work__bg-" + w.layout} style={{ position: 'relative', overflow: 'hidden' }}>
                  {w.video && (
                    <>
                      <video
                        ref={videoRef}
                        src={getAssetPath(w.video)}
                        poster={w.poster ? getAssetPath(w.poster) : undefined}
                        loop
                        muted
                        playsInline
                        preload="none"
                        aria-hidden="true"
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
                {archiveUrl && (
                  <a
                    className="nav__cta"
                    data-cursor="hepsi"
                    href={archiveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginTop: 24 }}
                  >
                    <span className="nav__cta-dot"></span>
                    arşivi aç
                  </a>
                )}
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
          role="dialog"
          aria-modal="true"
          aria-label="İş önizlemesi"
          style={{
            position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.8)', padding: '2rem'
          }}
        >
          <div style={{ position: 'absolute', inset: 0 }} onClick={() => setModalLink(null)} />
          <div ref={modalPanelRef} style={{
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
              {/* iframe sekme sırasının dışında olduğu için gerçek erişim
                  yolu bu link: klavye kullanıcısı işi Behance'te açabilir. */}
              <a
                href={modalLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#aaa', fontSize: '12px', textDecoration: 'underline',
                  whiteSpace: 'nowrap',
                }}
              >
                Behance&apos;te aç ↗
              </a>
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
                src={behanceEmbedSrc(modalLink)}
                title="İş önizlemesi"
                loading="lazy"
                // Sekme sırasının dışında: cross-origin iframe'in içine giren
                // focus Escape'i yutuyor ve klavye tuzağı oluşturuyordu
                // (WCAG 2.1.2). Klavye erişimi üstteki "Behance'te aç" linki.
                tabIndex={-1}
                style={{ width: '100%', height: '100%', border: 'none' }}
                allow="fullscreen"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
