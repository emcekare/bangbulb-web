export default function Contact() {
  return (
    <section className="section contact" id="iletisim">
      <div className="container">
        <div className="s-head reveal">
          <div className="s-head__num">— 08 / iletişim</div>
          <div>
            <h2 className="s-head__title display">
              Bir{" "}
              <span style={{ fontStyle: "italic", color: "var(--sage-2)" }}>
                kahve
              </span>{" "}
              içelim.
            </h2>
          </div>
        </div>

        <div className="contact__inner reveal">
          <h3 className="contact__big display">
            <span className="ital">yaz:</span>{" "}
            <a href="mailto:bangbulb@gmail.com" data-cursor="mail at">
              bangbulb<span className="ital">@</span>gmail.com
            </a>
            <br />
            <span className="ital">ara:</span>{" "}
            <a href="tel:+905523807202" data-cursor="ara">
              0 552 380 72 02
            </a>
          </h3>

          <div className="contact__details">
            <div className="detail">
              <div className="detail__label">stüdyo</div>
              <div className="detail__value">
                Quasar İstanbul — Offis Mekan
                <br />
                Fulya Mh., Büyükdere Cd. No:76
                <br />
                Şişli / İstanbul
              </div>
            </div>
            <div className="detail">
              <div className="detail__label">ikincil</div>
              <div className="detail__value">
                info<span style={{ color: "var(--accent)" }}>@</span>
                bangbulb.com
                <br />0 537 393 16 11
              </div>
            </div>
            <div className="detail">
              <div className="detail__label">çalışma saatleri</div>
              <div className="detail__value">
                Pzt — Cum / 09:00 — 19:00
                <br />
                Cmt: kahve, sohbet, randevuyla
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
