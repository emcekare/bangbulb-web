const team = [
  { role: "Kreatif direktör", name: "Evren Akşahin", q: "Sabah kahvesi olmadan slogan yazmaz.", image: "evren.png" },
  { role: "Art direktör", name: "Anıl Birsin.", q: "Mood board'u 47 kez değiştirir, bir kez gönderir.", image: "anil.png" },
  { role: "Sosyal Medya Direktörü", name: "Niran Birsin", q: "Algoritmayı düşmanı sayıp sonra arkadaş eder.", image: "niran.png" },
  { role: "S.M. yöneticisi", name: "Berk T.", q: "DM kutusunu hiç boş bırakmaz." },
  { role: "Grafik tasarımcı", name: "Selin C.", q: "Pixel-perfect ya da hiç." },
  { role: "Grafik tasarımcı", name: "Mert C.", q: "Tipografiyi 'insan gibi' konuşturur." },
  { role: "İçerik yazarı", name: "Ada B.", q: "Bir kelimeyle kampanya kurtarır." },
  { role: "Kurgu operatörü", name: "Onur P.", q: "Cut'ları matematiksel duyar." },
];

const initials = (n: string) =>
  n
    .split(/\s|\./)
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

import Image from "next/image";

export default function Team() {
  return (
    <section className="section team" id="ekip">
      <div className="container">
        <div className="s-head reveal">
          <div className="s-head__num">— 05 / ekip</div>
          <div>
            <h2 className="s-head__title display">
              Sekiz kişi,{" "}
              <span style={{ fontStyle: "italic", color: "var(--sage-2)" }}>
                bir oda.
              </span>
            </h2>
            <p className="s-head__sub">
              Kalabalık ajansların yavaşlığı, freelancer&apos;ların dağınıklığı yok.
              Sekiz kişiyiz — kararı bir öğle yemeğinde alıyoruz.
            </p>
          </div>
        </div>

        <div className="team__grid reveal">
          {team.map((m, i) => (
            <div className="member" key={i} data-cursor="merhaba">
              <div className="member__avatar" data-init={!m.image ? initials(m.name) : ""}>
                {m.image && (
                  <Image 
                    src={`/assets/team/${m.image}`}
                    alt={m.name}
                    fill
                    style={{ objectFit: "cover" }}
                    className="member__photo"
                  />
                )}
              </div>
              <div className="member__role">{m.role}</div>
              <div className="member__name display">{m.name}</div>
              <div className="member__quirk">&quot;{m.q}&quot;</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
