export type Post = {
  date: string;
  cat: string;
  title: [string, string, string];
  /** Yazının adresi. Tanımlanana kadar kart tıklanabilir görünmez. */
  url?: string;
};

export const blogPosts: Post[] = [
  {
    date: "29.04.2026",
    cat: "INSIGHT",
    title: ["TikTok'ta ", "ilk üç saniye", " neden hâlâ önemli?"],
  },
  {
    date: "12.04.2026",
    cat: "VAKA ÇALIŞMASI",
    title: ["Quasar İstanbul: ", "365 günlük", " içerik takvimi"],
  },
  {
    date: "01.03.2026",
    cat: "OPINION",
    title: ["Bir ", "ampulün", " parladığı tek bir oda yeter."],
  },
  {
    date: "14.02.2026",
    cat: "ARAÇ",
    title: ["META'nın yeni ", "ROAS modeli", " ne anlama geliyor?"],
  },
  {
    date: "08.01.2026",
    cat: "NOTLAR",
    title: ["2026 ", "trend listesi", " — hayır, AI değil."],
  },
];

const posts = blogPosts;

export default function Blog() {
  return (
    <section className="section blog" id="blog">
      <div className="container">
        <div className="s-head reveal">
          <div className="s-head__num">— 07 / yazılar</div>
          <div>
            <h2 className="s-head__title display">
              Düşünüyoruz,{" "}
              <span style={{ fontStyle: "italic", color: "var(--sage-2)" }}>
                yazıyoruz.
              </span>
            </h2>
            <p className="s-head__sub">
              Vakalar, tepkiler, kısa notlar. Üç dakika ya da üç saat — istersen
              hepsini.
            </p>
          </div>
        </div>

        <ul className="blog__list reveal">
          {posts.map((p, i) => {
            const body = (
              <>
                <span className="post__date">{p.date}</span>
                <span className="post__category">{p.cat}</span>
                <span className="post__title display">
                  {p.title[0]}
                  <span className="ital">{p.title[1]}</span>
                  {p.title[2]}
                </span>
                <span></span>
                <span className="post__arrow" aria-hidden="true">
                  →
                </span>
              </>
            );

            return (
              <li key={i}>
                {p.url ? (
                  <a className="post" href={p.url} data-cursor="oku">
                    {body}
                  </a>
                ) : (
                  // Adresi olmayan yazı tıklanabilir gibi görünmemeli:
                  // href'siz <a> klavyeyle odaklanılamaz ve hiçbir şey yapmaz.
                  <div className="post post--pending">{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
