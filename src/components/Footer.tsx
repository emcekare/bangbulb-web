export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__row">
        <div>© 2026 BangBulb · reklam ajansı</div>
        <div style={{ display: "flex", gap: 18 }}>
          <a data-cursor="hover">Instagram</a>
          <a data-cursor="hover">LinkedIn</a>
          <a data-cursor="hover">Behance</a>
          <a data-cursor="hover">YouTube</a>
        </div>
        <div>made in şişli ⚡ kvkk · tescil</div>
      </div>
      <div className="footer__big">bangbulb.</div>
    </footer>
  );
}
