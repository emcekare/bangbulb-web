"use client";
import { useState } from "react";
import { serviceGroups, serviceItems } from "@/content/services";

interface ServicesProps {
  onContactClick?: () => void;
}

export default function Services({ onContactClick }: ServicesProps) {
  // Aynı anda tek satır açık. Fare, dokunma ve klavye aynı düğmeyi kullanır.
  const [openNum, setOpenNum] = useState<string | null>(null);

  return (
    <section className="section services" id="hizmetler">
      <div className="container">
        <svg
          className="services__circle services__circle--rot"
          viewBox="0 0 220 220"
          aria-hidden="true"
        >
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
              Sosyal medyadan TV reklamına, ambalajdan influencer&apos;a, tek elden
              ve abartısız. Bir satıra dokunun, ayrıntısını görün.
            </p>
          </div>
        </div>

        <div className="services__groups reveal">
          {serviceGroups.map((g) => (
            <div className="services__group" key={g.id}>
              <h3 className="services__group-title mono">{g.label}</h3>
              <ul className="services__list">
                {serviceItems
                  .filter((s) => s.group === g.id)
                  .map((s) => {
                    const open = openNum === s.num;
                    const btnId = `service-btn-${s.num}`;
                    const panelId = `service-panel-${s.num}`;
                    return (
                      <li
                        key={s.num}
                        className={"service" + (open ? " is-open" : "")}
                      >
                        <h4 className="service__heading">
                          <button
                            type="button"
                            id={btnId}
                            className="service__toggle"
                            aria-expanded={open}
                            aria-controls={panelId}
                            data-cursor={open ? "kapat" : "aç"}
                            onClick={() => setOpenNum(open ? null : s.num)}
                          >
                            <span className="service__num">{s.num}</span>
                            <span className="service__name">{s.name}</span>
                            <span className="service__tag">{s.tag}</span>
                            <span className="service__icon" aria-hidden="true">
                              +
                            </span>
                          </button>
                        </h4>
                        <div
                          id={panelId}
                          role="region"
                          aria-labelledby={btnId}
                          className="service__panel"
                          inert={!open}
                        >
                          <div className="service__panel-inner">
                            <p className="service__desc">{s.desc}</p>
                            <button
                              type="button"
                              className="service__cta"
                              data-cursor="hadi"
                              onClick={onContactClick}
                            >
                              Bu hizmet için yaz <span aria-hidden="true">→</span>
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
