export default function Manifesto() {
  return (
    <section className="section manifesto" id="hakkimizda">
      <div className="container">
        <div className="s-head reveal">
          <div className="s-head__num">— 04 / manifesto</div>
          <div>
            <h2 className="s-head__title display">
              Niye{" "}
              <span style={{ fontStyle: "italic", color: "var(--sage-2)" }}>
                biz
              </span>
              ?
            </h2>
          </div>
        </div>

        <div className="manifesto__inner">
          <p className="manifesto__quote reveal">
            <span className="ital">Reklamcılık,</span> aslında parlak bir
            ampulün düğmeyi bulması. <br />
            Biz <span className="accent">düğme</span> üretmiyoruz —
            <span className="ital"> doğru ânı</span> üretiyoruz; bu yüzden
            ofiste fazlasıyla gülüyor, dışarıda ise{" "}
            <span className="ital">ciddi</span> iş yapıyoruz.
          </p>

          <div>
            <div className="eyebrow">— rakamlar / ortaklar</div>
            <div className="stats reveal">
              <div className="stat">
                <div className="stat__num">2019</div>
                <div className="stat__label">kuruluş yılı</div>
              </div>
              <div className="stat">
                <div className="stat__num">
                  8<span className="ital">/8</span>
                </div>
                <div className="stat__label">tam zamanlı ekip</div>
              </div>
              <div className="stat">
                <div className="stat__num">3</div>
                <div className="stat__label">partner ajans</div>
              </div>
              <div className="stat">
                <div className="stat__num">
                  12<span className="ital">+</span>
                </div>
                <div className="stat__label">hizmet kalemi · 360°</div>
              </div>
            </div>

            <div style={{ marginTop: 32 }} className="reveal">
              <div className="eyebrow" style={{ marginBottom: 12 }}>
                partner ajanslar
              </div>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                {["Kafa Medya", "BeBu Ajans", "F2R Medya"].map((p) => (
                  <span
                    key={p}
                    className="mono"
                    style={{
                      padding: "8px 12px",
                      border: "1px solid var(--line-strong)",
                      borderRadius: 999,
                    }}
                  >
                    ↳ {p}
                  </span>
                ))}
              </div>
              <p
                style={{
                  marginTop: 14,
                  fontSize: 12,
                  color: "var(--cream-dim)",
                  fontStyle: "italic",
                }}
              >
                * Prodüksiyon, internet reklamları ve influencer marketing
                partnerlerimiz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
