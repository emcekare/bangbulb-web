export type TeamMember = {
  role: string;
  name: string;
  q: string;
  image?: string;
};

export const teamMembers: TeamMember[] = [
  { role: "Kreatif direktör", name: "Evren Akşahin", q: "Sabah kahvesi olmadan slogan yazmaz.", image: "evren.webp" },
  { role: "Art direktör", name: "Anıl Birsin", q: "Mood board'u 47 kez değiştirir, bir kez gönderir.", image: "anil.webp" },
  { role: "Sosyal Medya Direktörü", name: "Niran Birsin", q: "Algoritmayı düşmanı sayıp sonra arkadaş eder.", image: "niran.webp" },
  { role: "S.M. yöneticisi", name: "Berk T.", q: "DM kutusunu hiç boş bırakmaz." },
  { role: "Grafik tasarımcı", name: "Selin C.", q: "Pixel-perfect ya da hiç." },
  { role: "Grafik tasarımcı", name: "Mert C.", q: "Tipografiyi 'insan gibi' konuşturur." },
  { role: "İçerik yazarı", name: "Ada B.", q: "Bir kelimeyle kampanya kurtarır." },
  { role: "Kurgu operatörü", name: "Onur P.", q: "Cut'ları matematiksel duyar." },
];

export const initials = (n: string) =>
  n
    .split(/\s|\./)
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
