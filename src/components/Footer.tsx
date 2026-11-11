import { socialLinks } from "@/content/links";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__row">
        <div>© 2026 BangBulb · reklam ajansı</div>
        <ul className="footer__social">
          {socialLinks.map((s) =>
            s.url ? (
              <li key={s.label}>
                <a
                  href={s.url}
                  data-cursor="hover"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.label}
                </a>
              </li>
            ) : (
              // Adres girilene kadar düz metin — tıklanabilir gibi durmasın.
              <li key={s.label} className="footer__social-pending">
                {s.label}
              </li>
            )
          )}
        </ul>
        <div>made in şişli ⚡ kvkk · tescil</div>
      </div>
      <div className="footer__big">bangbulb.</div>
    </footer>
  );
}
