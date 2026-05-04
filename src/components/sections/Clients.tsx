const clients = [
  "Quasar İstanbul",
  "Offis Mekan",
  "Beyaz Bahçe",
  "Saatçi Co.",
  "Lale Sokağı",
  "Mira",
  "Kahve & Co.",
  "Bir Studio",
  "Nokta Press",
  "Form Lab",
  "Atölye 41",
  "İmge Yayın",
];

export default function Clients() {
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
          {clients.map((c, i) => (
            <div className="client" key={i} data-cursor="vakayı gör">
              <span>{c}</span>
              <div className="client__hover">↗ vakayı gör</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
