import Image from "next/image";
import { getAssetPath } from "@/lib/asset";
import { mainClients } from "@/content/clients";

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
              Yedi yılda, on iki sektörde, iki ülkede ve hep aynı ekiple.
            </p>
          </div>
        </div>

        <div className="clients__grid reveal">
          {mainClients.map((c, i) => (
            <div className="client" key={i}>
              <div className="client__logo-wrapper">
                <Image
                  src={getAssetPath(`/assets/clients/${c.logo}`)}
                  alt={c.name}
                  fill
                  sizes="(max-width: 1100px) 33vw, 220px"
                  style={{ objectFit: 'contain', padding: '10px' }}
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
