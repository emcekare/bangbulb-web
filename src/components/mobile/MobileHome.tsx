"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import pinwheelSvg from "../../../public/assets/bangbulb-pinwheel.svg";
import { getAssetPath } from "@/lib/asset";
import { useModalA11y } from "@/hooks/useModalA11y";
import { works, behanceEmbedSrc } from "@/content/works";
import { serviceItems, serviceGroups } from "@/content/services";
import { processSteps } from "@/content/process";
import { teamMembers, initials } from "@/content/team";
import { mainClients, allClients } from "@/content/clients";
import { contact } from "@/content/contact";
import { socialLinks } from "@/content/links";

interface MobileHomeProps {
  onContactClick: () => void;
  onShowAllClients: () => void;
}

const navItems = [
  { label: "İşler", href: "#m-islerimiz" },
  { label: "Hizmetler", href: "#m-hizmetler" },
  { label: "İşleyiş", href: "#m-surec" },
  { label: "Referanslar", href: "#m-referanslar" },
  { label: "Ekip", href: "#m-ekip" },
  { label: "İletişim", href: "#m-iletisim" },
];

export default function MobileHome({
  onContactClick,
  onShowAllClients,
}: MobileHomeProps) {
  const topbarRef = useRef<HTMLElement>(null);
  const sheetRef = useRef<HTMLElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const worksScrollerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const modalPanelRef = useRef<HTMLDivElement>(null);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeWork, setActiveWork] = useState(0);
  const [openService, setOpenService] = useState<string | null>(null);
  const [processInView, setProcessInView] = useState(false);
  const [modalLink, setModalLink] = useState<string | null>(null);

  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const closeWorkModal = useCallback(() => setModalLink(null), []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setDrawerOpen(false);
      window.setTimeout(() => {
        const el = document.querySelector(href);
        const reduce = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;
        el?.scrollIntoView({
          behavior: reduce ? "auto" : "smooth",
          block: "start",
        });
      }, 60);
    },
    []
  );

  useModalA11y(drawerOpen, closeDrawer, sheetRef);
  useModalA11y(modalLink !== null, closeWorkModal, modalPanelRef);

  useEffect(() => {
    if (
      typeof CSS !== "undefined" &&
      CSS.supports("container-type", "scroll-state")
    ) {
      return;
    }
    const bar = topbarRef.current;
    if (!bar) return;

    let lastY = window.scrollY;
    const onScroll = () => {
      const maxScroll = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const y = Math.max(0, Math.min(window.scrollY, maxScroll));
      if (y === lastY) return;
      bar.classList.toggle("is-hidden", y > lastY && y > bar.offsetHeight);
      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const scroller = worksScrollerRef.current;
    if (!scroller) return;
    const onScroll = () => {
      // Başlangıç hizasına en yakın kartı bul, en sağdaysa sonuncuyu seç.
      const cards = Array.from(scroller.children) as HTMLElement[];
      const atEnd =
        scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 2;
      let idx = 0;
      if (atEnd) {
        idx = cards.length - 1;
      } else {
        let best = Infinity;
        cards.forEach((c, i) => {
          const d = Math.abs(c.offsetLeft - 20 - scroller.scrollLeft);
          if (d < best) {
            best = d;
            idx = i;
          }
        });
      }
      setActiveWork(Math.max(0, Math.min(works.length - 1, idx)));
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, []);

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
      { threshold: 0.35 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  // Aylık döngü (Sunum → Toplantı → Yayın → Rapor) ekrana girdiğinde
  // çizgiyi doldur ve 01–04 düğümlerini sırayla sarıya boya.
  useEffect(() => {
    const el = processRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setProcessInView(true);
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="m-app">
      {/* Sade Mobil Menü */}
      <div
        className={"m-drawer " + (drawerOpen ? "is-open" : "")}
        id="mobile-drawer"
        aria-hidden={!drawerOpen}
      >
        <div
          className="m-drawer__backdrop"
          aria-hidden="true"
          onClick={closeDrawer}
        />
        <nav
          className="m-drawer__sheet"
          ref={sheetRef}
          tabIndex={-1}
          aria-label="Mobil ana menü"
          onTouchStart={(e) => {
            const t = e.touches[0];
            if (t) touchStartRef.current = { x: t.clientX, y: t.clientY };
          }}
          onTouchEnd={(e) => {
            const start = touchStartRef.current;
            const end = e.changedTouches[0];
            touchStartRef.current = null;
            if (!start || !end) return;
            const dx = end.clientX - start.x;
            const dy = end.clientY - start.y;
            if (dx < -45 && Math.abs(dx) > Math.abs(dy)) {
              closeDrawer();
            }
          }}
        >
          <div className="m-drawer__head">
            <span className="m-topbar__name">BangBulb®</span>
            <button
              type="button"
              className="m-drawer__close"
              aria-label="Menüyü kapat"
              onClick={closeDrawer}
            >
              ×
            </button>
          </div>

          <ul className="m-drawer__list">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="m-drawer__link"
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  <span>{item.label}</span>
                  <span className="m-drawer__link-arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="m-drawer__foot">
            <button
              type="button"
              className="m-drawer__QuickBtn"
              onClick={() => {
                closeDrawer();
                onContactClick();
              }}
            >
              Bize Yaz
            </button>
            <div className="m-drawer__QuickSub">
              <a href={`tel:${contact.phone.tel}`} onClick={closeDrawer}>
                Ara
              </a>
              <a href={`mailto:${contact.email}`} onClick={closeDrawer}>
                E-posta
              </a>
            </div>
          </div>
        </nav>
      </div>

      <main>
        {/* ÜST BAR */}
        <header className="m-topbar" ref={topbarRef}>
          <a href="#m-top" className="m-topbar__brand">
            <span className="m-topbar__mark">
              <Image src={pinwheelSvg} alt="" width={28} height={28} />
            </span>
            <span className="m-topbar__name">BangBulb®</span>
          </a>

          <div className="m-topbar__actions">
            <button
              type="button"
              className="m-topbar__cta"
              onClick={onContactClick}
            >
              <span className="m-topbar__cta-dot" />
              İletişim
            </button>
            <button
              type="button"
              id="mobile-drawer-open"
              className="m-topbar__menu-btn"
              aria-label="Menü"
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
              onClick={openDrawer}
            >
              <svg
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="16" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            </button>
          </div>
        </header>

        {/* 1. HERO */}
        <section className="m-hero" id="m-top">
          <div className="m-hero__pinwheel" aria-hidden="true">
            <div className="m-hero__orb-glow" />
            <div className="m-hero__orb-spin">
              <Image src={pinwheelSvg} alt="" width={112} height={112} />
            </div>
          </div>

          <h1 className="m-hero__title">
            parlak <span className="ital">fikirler</span>
            <br />
            karanlık <span className="accent">odalar</span>{" "}
            <span className="ital">için.</span>
          </h1>

          <p className="m-hero__lede">
            Sekiz kişilik 360° kreatif ve sosyal medya ajansı.
          </p>

          <div className="m-hero__cta-row">
            <button
              type="button"
              className="m-btn m-btn--primary"
              onClick={onContactClick}
            >
              Proje Konuşalım
            </button>
            <a href="#m-islerimiz" className="m-btn m-btn--ghost">
              İşleri Gör ↓
            </a>
          </div>

          <p className="m-hero__trust">
            2019&apos;dan beri · {teamMembers.length} kişi · {allClients.length}{" "}
            marka
          </p>
        </section>

        {/* 2. SEÇİLMİŞ İŞLER */}
        <section className="m-section" id="m-islerimiz">
          <div className="m-sec-head">
            <h2 className="m-sec-head__title">
              Seçilmiş <span className="ital">işler.</span>
            </h2>
          </div>

          <div className="m-carousel-bleed">
            <div
              className="m-works-scroller"
              ref={worksScrollerRef}
              role="region"
              aria-label="Seçilmiş işler, yatay kaydırılır"
              tabIndex={0}
            >
              {works.map((w) => (
                <article
                  className={
                    "m-work-card " + (w.link ? "m-work-card--link" : "")
                  }
                  key={w.id}
                  aria-labelledby={`m-work-title-${w.id}`}
                >
                  <div className={"m-work-card__media work__bg-" + w.layout}>
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
                          style={{
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: "rgba(0,0,0,0.28)",
                          }}
                        />
                      </>
                    )}

                    {/* TODO: Work tipine `image` alanı eklendiğinde gerçek görsel
                        burada (video yoksa) <Image fill /> olarak render edilecek.
                        O zamana kadar yalnızca gradyan ve başlık gösterilir. */}
                    {!w.video && (
                      <div className="m-work-card__center-label" aria-hidden="true">
                        {w.title}
                      </div>
                    )}
                  </div>

                  <div className="m-work-card__body">
                    <div>
                      <h3
                        className="m-work-card__title"
                        id={`m-work-title-${w.id}`}
                      >
                        {w.title}
                      </h3>
                      <div className="m-work-card__meta">{w.cat}</div>
                    </div>

                    {w.link && (
                      <button
                        type="button"
                        className="m-work-card__btn"
                        aria-label={`${w.title} işini incele`}
                        onClick={() => setModalLink(w.link!)}
                      >
                        İncele ↗
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div
            className="m-dots"
            role="img"
            aria-label={`İş ${activeWork + 1} / ${works.length}`}
          >
            {works.map((w, idx) => (
              <span
                key={w.id}
                className={"m-dot " + (idx === activeWork ? "is-active" : "")}
              />
            ))}
          </div>
        </section>

        {/* 3. 360° HİZMETLER: gruplu, tek seferde bir kalem açılan akordeon */}
        <section className="m-section m-section--alt" id="m-hizmetler">
          <div className="m-sec-head">
            <h2 className="m-sec-head__title">
              360° <span className="ital">hizmetler.</span>
            </h2>
          </div>

          {serviceGroups.map((g) => (
            <div className="m-sgroup" key={g.id}>
              <h3 className="m-sgroup__title">{g.label}</h3>
              <ul className="m-acc">
                {serviceItems
                  .filter((s) => s.group === g.id)
                  .map((s) => {
                    const open = openService === s.num;
                    return (
                      <li
                        className={"m-acc__item " + (open ? "is-open" : "")}
                        key={s.num}
                      >
                        <h4 className="m-acc__head">
                          <button
                            type="button"
                            className="m-acc__btn"
                            id={`m-acc-btn-${s.num}`}
                            aria-expanded={open}
                            aria-controls={`m-acc-panel-${s.num}`}
                            onClick={() => setOpenService(open ? null : s.num)}
                          >
                            <span className="m-acc__num">{s.num}</span>
                            <span className="m-acc__name">{s.name}</span>
                            <span className="m-acc__icon" aria-hidden="true" />
                          </button>
                        </h4>
                        <div
                          className="m-acc__panel"
                          id={`m-acc-panel-${s.num}`}
                          role="region"
                          aria-labelledby={`m-acc-btn-${s.num}`}
                          hidden={!open}
                        >
                          <div className="m-acc__tag">{s.tag}</div>
                          <p className="m-acc__desc">{s.desc}</p>
                          <button
                            type="button"
                            className="m-btn m-btn--primary m-acc__cta"
                            onClick={onContactClick}
                          >
                            Bu hizmet için yaz
                          </button>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          ))}
        </section>

        {/* 4. İŞLEYİŞ — Masaüstündeki sırayla yanan sarı düğümler ve çizgi animasyonu */}
        <section
          className={
            "m-section m-process " + (processInView ? "in-view" : "")
          }
          id="m-surec"
          ref={processRef}
        >
          <div className="m-sec-head">
            <div className="m-eyebrow">— 02 / işleyiş</div>
            <h2 className="m-sec-head__title">
              Aylık <span className="ital">döngü.</span> Sürpriz yok.
            </h2>
          </div>

          <div className="m-psteps">
            <div className="m-psteps__line" aria-hidden="true">
              <div className="m-psteps__line-fill" />
            </div>

            {processSteps.map((s) => (
              <div
                className="m-pstep"
                key={s.i}
                style={{ "--i": s.i } as React.CSSProperties}
              >
                <div className="m-pstep__node">
                  {String(s.i + 1).padStart(2, "0")}
                </div>
                <div className="m-pstep__content">
                  <div className="m-pstep__tag">{s.tag}</div>
                  <h3 className="m-pstep__title">{s.title}</h3>
                  <p className="m-pstep__body">{s.body}</p>
                  <div className="m-pstep__when">↳ {s.when}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* NİYE BİZ */}
        <section className="m-section m-why" id="m-neden">
          <div className="m-sec-head">
            <h2 className="m-sec-head__title">
              Niye <span className="ital">biz?</span>
            </h2>
          </div>
          <p className="m-why__lead">
            Sekiz kişiyiz, hepimiz aynı odadayız. Kararı bir öğle yemeğinde
            alırız.
          </p>
          <dl className="m-why__stats">
            <div className="m-why__stat">
              <dt>kuruluş</dt>
              <dd>2019</dd>
            </div>
            <div className="m-why__stat">
              <dt>tam zamanlı ekip</dt>
              <dd>{teamMembers.length}</dd>
            </div>
            <div className="m-why__stat">
              <dt>hizmet kalemi</dt>
              <dd>{serviceItems.length}</dd>
            </div>
          </dl>
          <p className="m-why__partners">
            Partner ajanslar: Kafa Medya, BeBu Ajans, F2R Medya
          </p>
        </section>

        {/* 5. REFERANSLAR */}
        <section className="m-section" id="m-referanslar">
          <div className="m-sec-head">
            <h2 className="m-sec-head__title">
              Referanslar <span className="ital">({allClients.length})</span>
            </h2>
          </div>

          <div className="m-clients-grid">
            {mainClients.map((c) => (
              <div className="m-client-card" key={c.name} title={c.name}>
                <Image
                  src={getAssetPath(`/assets/clients/${c.logo}`)}
                  alt={c.name}
                  fill
                  sizes="30vw"
                  style={{ objectFit: "contain", padding: "10px" }}
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            className="m-btn m-btn--ghost m-clients-more"
            onClick={onShowAllClients}
          >
            Tümünü Gör ({allClients.length})
          </button>
        </section>

        {/* 6. EKİP */}
        <section className="m-section m-section--alt" id="m-ekip">
          <div className="m-sec-head">
            <h2 className="m-sec-head__title">
              Sekiz kişi, <span className="ital">bir oda.</span>
            </h2>
          </div>

          <div className="m-carousel-bleed">
            <div
              className="m-team-scroller"
              role="region"
              aria-label="Ekip, yatay kaydırılır"
              tabIndex={0}
            >
              {teamMembers.map((m, idx) => (
                <div className="m-member-card" key={idx}>
                  <div className="m-member-card__avatar">
                    {m.image ? (
                      <Image
                        src={getAssetPath(`/assets/team/${m.image}`)}
                        alt={m.name}
                        fill
                        sizes="80px"
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <span className="m-member-card__init">
                        {initials(m.name)}
                      </span>
                    )}
                  </div>
                  <div className="m-member-card__name">{m.name}</div>
                  <div className="m-member-card__role">{m.role}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. İLETİŞİM */}
        <section className="m-section" id="m-iletisim">
          <div className="m-sec-head">
            <h2 className="m-sec-head__title">
              Bir <span className="ital">kahve</span> içelim.
            </h2>
          </div>

          <button
            type="button"
            className="m-btn m-btn--primary"
            style={{ width: "100%" }}
            onClick={onContactClick}
          >
            İletişim Formunu Aç
          </button>

          <div className="m-contact-actions">
            <a href={`tel:${contact.phone.tel}`} className="m-contact-card">
              <span className="m-contact-card__label">Telefon</span>
              <span className="m-contact-card__val">{contact.phone.display}</span>
            </a>
            <a
              href={`tel:${contact.phoneSecondary.tel}`}
              className="m-contact-card"
            >
              <span className="m-contact-card__label">Telefon 2</span>
              <span className="m-contact-card__val">
                {contact.phoneSecondary.display}
              </span>
            </a>
            <a href={`mailto:${contact.email}`} className="m-contact-card">
              <span className="m-contact-card__label">E-posta</span>
              <span className="m-contact-card__val">{contact.email}</span>
            </a>
            <a
              href={`mailto:${contact.emailSecondary}`}
              className="m-contact-card"
            >
              <span className="m-contact-card__label">E-posta 2</span>
              <span className="m-contact-card__val">
                {contact.emailSecondary}
              </span>
            </a>
          </div>

          <div className="m-hours">
            <div className="m-contact-card__label">Çalışma saatleri</div>
            {contact.hours.map((h) => (
              <div className="m-hours__row" key={h}>
                {h}
              </div>
            ))}
          </div>

          <div className="m-address-line">{contact.addressShort}</div>
        </section>

        {/* FOOTER */}
        <footer className="m-footer">
          {socialLinks.some((s) => s.url) && (
            <ul className="m-footer__socials">
              {socialLinks
                .filter((s) => s.url)
                .map((s) => (
                  <li key={s.label}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer">
                      {s.label}
                    </a>
                  </li>
                ))}
            </ul>
          )}
          <div className="m-footer__copy">© {new Date().getFullYear()} BangBulb · Şişli, İstanbul</div>
          <div className="m-footer__wordmark">bangbulb.</div>
        </footer>
      </main>

      {/* Behance İş Önizleme Modalı */}
      {modalLink && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="İş önizlemesi"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.86)",
            padding: "12px",
          }}
        >
          <div
            style={{ position: "absolute", inset: 0 }}
            onClick={closeWorkModal}
          />
          <div
            ref={modalPanelRef}
            style={{
              position: "relative",
              width: "100%",
              height: "84svh",
              backgroundColor: "#1a1a1a",
              borderRadius: "12px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                minHeight: "52px",
                backgroundColor: "#2a2a2a",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 14px",
                gap: "12px",
              }}
            >
              <a
                href={modalLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  minHeight: "44px",
                  color: "#f5c24a",
                  fontSize: "12px",
                  fontFamily: "var(--font-mono)",
                  textDecoration: "underline",
                }}
              >
                Behance&apos;te aç ↗
              </a>
              <button
                type="button"
                onClick={closeWorkModal}
                aria-label="Kapat"
                style={{
                  background: "none",
                  border: "none",
                  color: "#fff",
                  fontSize: "26px",
                  width: "44px",
                  height: "44px",
                }}
              >
                ×
              </button>
            </div>
            <div style={{ flex: 1, backgroundColor: "#fff" }}>
              <iframe
                src={behanceEmbedSrc(modalLink)}
                title="İş önizlemesi"
                loading="lazy"
                tabIndex={-1}
                style={{ width: "100%", height: "100%", border: "none" }}
                allow="fullscreen"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
