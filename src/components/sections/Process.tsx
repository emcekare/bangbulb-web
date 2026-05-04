"use client";
import React from "react";

const steps = [
  {
    i: 0,
    tag: "AYIN SON HAFTASI",
    title: "Sunum",
    body: "Bir sonraki ayın bütün içerikleri (örn: 12 post, 4 reels, 4 story) hazırlanır, size sunulur.",
    when: "Aralık → Ocak için",
  },
  {
    i: 1,
    tag: "BİRLİKTE",
    title: "Toplantı",
    body: "İçerikler birlikte gözden geçirilir, revizeler not alınır, takvim netleştirilir.",
    when: "1 saatlik oturum",
  },
  {
    i: 2,
    tag: "REVİZE & TAKVİM",
    title: "Yayın",
    body: "Paylaşım takvimine göre revizeler tamamlanır, içerikler yayına girer.",
    when: "Haftalık ritim",
  },
  {
    i: 3,
    tag: "AYIN SONUNDA",
    title: "Rapor",
    body: "Geçen ayın istatistik ve durum verileri size iletilir; döngü baştan başlar.",
    when: "Sözleşme süresince",
  },
];

export default function Process() {
  return (
    <section className="section process" id="surec">
      <div className="container">
        <div className="s-head reveal">
          <div className="s-head__num">— 02 / işleyiş</div>
          <div>
            <h2 className="s-head__title display">
              Aylık{" "}
              <span style={{ fontStyle: "italic", color: "var(--sage-2)" }}>
                döngü
              </span>
              . Sürpriz yok.
            </h2>
            <p className="s-head__sub">
              Sözleşme süresi boyunca aynı temiz ritimde çalışırız. Net adımlar,
              net kişiler, net tarihler — ve fazlasıyla esprili toplantılar.
            </p>
          </div>
        </div>

        <div className="process__steps">
          <div className="process__line">
            <div className="process__line-fill"></div>
          </div>
          {steps.map((s) => (
            <div
              className="step"
              key={s.i}
              style={{ "--i": s.i } as React.CSSProperties}
            >
              <div className="step__node">{String(s.i + 1).padStart(2, "0")}</div>
              <div className="step__when">{s.tag}</div>
              <h3 className="step__title display">{s.title}</h3>
              <p className="step__body">{s.body}</p>
              <div className="step__when">↳ {s.when}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
