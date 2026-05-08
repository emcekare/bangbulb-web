import { useState } from "react";
import Image from "next/image";

export const mainClients = [
  { name: "A101", logo: "a-101.svg" },
  { name: "TurkNet", logo: "turknet.svg" },
  { name: "Gelik", logo: "gelik.svg" },
  { name: "Filizler", logo: "filizler.svg" },
  { name: "Helen Doron", logo: "helen-doron.svg" },
  { name: "Kumanya", logo: "kumanya.svg" },
  { name: "Rags", logo: "rags.svg" },
  { name: "Zavinna", logo: "zavinna.svg" },
  { name: "Souffle", logo: "souffle.svg" },
  { name: "Alisya", logo: "alisya.svg" },
  { name: "New Face", logo: "new-face.svg" },
  { name: "Birey Koleji", logo: "birey.svg" },
];

export const allClients = [
  ...mainClients,
  { name: "Esen Bahçe", logo: "esen-bahce.svg" },
  { name: "Estetech", logo: "estetech.svg" },
  { name: "Fistalora", logo: "fistalora.svg" },
  { name: "Golden Plus", logo: "golden-plus.svg" },
  { name: "Hedef Akademi", logo: "hedef-akademi.svg" },
  { name: "Hemdem", logo: "hemdem.svg" },
  { name: "Kalyoncuoğlu", logo: "kalyoncuoglu.svg" },
  { name: "La Liberte", logo: "la-liberte.svg" },
  { name: "Lumiere", logo: "lumiere.svg" },
  { name: "Reborn", logo: "reborn.svg" },
  { name: "YL", logo: "yl.svg" },
];

interface ClientsProps {
  onShowAll: () => void;
}

export default function Clients({ onShowAll }: ClientsProps) {
  return (
    <section className="section clients" id="referanslar">
      <div className="container">
        <div className="s-head reveal">
          <div className="s-head__num">— 06 / referanslar</div>
          <div>
            <h2 className="s-head__title display">
              Birlikte iş yaptıklarımız.
            </h2>
            <p className="s-head__sub">
              Yedi yılda, on iki sektörde, iki ülkede — ama hep aynı ekiple.
            </p>
          </div>
        </div>

        <div className="clients__grid reveal">
          {mainClients.map((c, i) => (
            <div className="client" key={i}>
              <span className="client__name">{c.name}</span>
              <div className="client__logo-wrapper">
                <Image 
                  src={`/assets/clients/${c.logo}`} 
                  alt={c.name}
                  fill
                  style={{ objectFit: 'contain', padding: '12px' }}
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="clients__action reveal">
          <button className="nav__cta" onClick={onShowAll} style={{ background: "transparent" }}>
            <span className="nav__cta-dot" style={{ background: "var(--cream-dim)", boxShadow: "none" }}></span>
            Tüm Referansları Gör
          </button>
        </div>
      </div>
    </section>
  );
}
