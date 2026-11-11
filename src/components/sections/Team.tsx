import Image from "next/image";
import { getAssetPath } from "@/lib/asset";
import { teamMembers, initials } from "@/content/team";

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
          {teamMembers.map((m, i) => (
            <div className="member" key={i} data-cursor="merhaba">
              <div className="member__avatar" data-init={!m.image ? initials(m.name) : ""}>
                {m.image && (
                  <Image
                    src={getAssetPath(`/assets/team/${m.image}`)}
                    alt={m.name}
                    fill
                    sizes="(max-width: 540px) 100vw, (max-width: 900px) 50vw, 25vw"
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
