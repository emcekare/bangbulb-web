"use client";
import { useState } from "react";
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
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  useReveal();

  return (
    <>
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <ScrollBgMorph />
      <PinwheelCursor enabled={true} />
      <Nav onContactClick={() => setContactOpen(true)} />
      <Hero />
      <Marquee />
      <Services />
      <Process />
      <Works />
      <Manifesto />
      <Team />
      <Clients />
      <Blog />
      <Contact />
      <Footer />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
