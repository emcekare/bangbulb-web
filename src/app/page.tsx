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
      <ScrollBgMorph />
      <PinwheelCursor enabled={true} />
      <Nav onContactClick={onContactClick} />
      <Hero />
      <Marquee />
      <Services />
      <Process />
      <Works />
      <Manifesto />
      <Team />
      <Clients onShowAll={onShowAllClients} />
      <Contact />
      <Footer />
    </div>
  );
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [clientsModalOpen, setClientsModalOpen] = useState(false);
  // null = ilk SSR/static HTML anı (CSS media query doğru kabuğu anında gösterir);
  // mount sonrasında yalnızca aktif cihaz ağacı bellekte tutulur.
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 820px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <>
      {!loaded && <Loader onDone={() => setLoaded(true)} />}

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
