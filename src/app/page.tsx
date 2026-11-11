"use client";
import { useEffect, useState } from "react";
import { useReveal } from "@/hooks/useReveal";

import Loader from "@/components/effects/Loader";
import PinwheelCursor from "@/components/effects/PinwheelCursor";
import ScrollBgMorph from "@/components/effects/ScrollBgMorph";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Works from "@/components/sections/Works";
import Manifesto from "@/components/sections/Manifesto";
import Team from "@/components/sections/Team";
import Clients from "@/components/sections/Clients";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";
import ClientsModal from "@/components/ClientsModal";
import MobileHome from "@/components/mobile/MobileHome";

const INTRO_KEY = "bb-intro-seen";
const PRE_LOADER_SCRIPT = `try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches&&!sessionStorage.getItem("${INTRO_KEY}"))document.documentElement.classList.add("is-loading")}catch(e){}`;

function DesktopHome({
  onContactClick,
  onShowAllClients,
}: {
  onContactClick: () => void;
  onShowAllClients: () => void;
}) {
  useReveal();

  return (
    <div className="desktop-shell">
      <a className="skip-link" href="#icerik">
        İçeriğe atla
      </a>
      <ScrollBgMorph />
      <PinwheelCursor enabled={true} />
      <Nav onContactClick={onContactClick} />
      <main id="icerik" tabIndex={-1}>
        <Hero onContactClick={onContactClick} />
        <Marquee />
        <Services onContactClick={onContactClick} />
        <Process />
        <Works />
        <Manifesto />
        <Team />
        <Clients onShowAll={onShowAllClients} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function Home() {
  // Loader yalnızca ilk ziyarette, oturum başına bir kez ve hareket azaltma
  // tercihi yokken çalışır. Sunucu HTML'inde loader yoktur: JS kapalıysa
  // içerik doğrudan okunur.
  const [showLoader, setShowLoader] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [clientsModalOpen, setClientsModalOpen] = useState(false);
  // null = ilk SSR/static HTML anı (CSS media query doğru kabuğu anında gösterir);
  // mount sonrasında yalnızca aktif cihaz ağacı bellekte tutulur.
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    let show = false;
    try {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (!reduced && !window.sessionStorage.getItem(INTRO_KEY)) {
        window.sessionStorage.setItem(INTRO_KEY, "1");
        show = true;
      }
    } catch {
      // sessionStorage kapalı: loader'ı hiç göstermeyiz.
    }
    if (!show) {
      document.documentElement.classList.remove("is-loading");
      return;
    }
    // Mount sonrası bir sonraki görevde aç (effect içinde eşzamanlı setState yok).
    const t = window.setTimeout(() => setShowLoader(true), 0);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 820px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <>
      {/* İlk ziyarette içeriğin loader'dan önce yanıp sönmesini engeller.
          Sınıfı Loader (ya da yukarıdaki effect) kaldırır, hydrate olmazsa
          CSS 2.5 sn sonra içeriği yine de gösterir. */}
      <script dangerouslySetInnerHTML={{ __html: PRE_LOADER_SCRIPT }} />
      {/* JS kapalıyken kaydırmayla beliren bölümler gizli kalmasın. */}
      <noscript>
        <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
      </noscript>
      {showLoader && <Loader onDone={() => setShowLoader(false)} />}

      {(isMobile === null || isMobile === false) && (
        <DesktopHome
          onContactClick={() => setContactOpen(true)}
          onShowAllClients={() => setClientsModalOpen(true)}
        />
      )}

      {(isMobile === null || isMobile === true) && (
        <div className="mobile-shell">
          <MobileHome
            onContactClick={() => setContactOpen(true)}
            onShowAllClients={() => setClientsModalOpen(true)}
          />
        </div>
      )}

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
      <ClientsModal
        open={clientsModalOpen}
        onClose={() => setClientsModalOpen(false)}
      />
    </>
  );
}
