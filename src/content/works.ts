export type Work = {
  id: string;
  title: string;
  cat: string;
  year: string;
  layout: string;
  link?: string;
  video?: string;
  poster?: string;
};

export const works: Work[] = [
  { id: "a", title: "Quasar Lansman", cat: "KAMPANYA / FILM", year: "2025", layout: "a" },
  { id: "b", title: "Offis Mekan", cat: "SOSYAL MEDYA", year: "2025", layout: "b" },
  { id: "c", title: "La Liberté", cat: "AMBALAJ", year: "2024", layout: "c", link: "https://www.behance.net/gallery/145736391/LaLibert-Coffee-Packaging-design", video: "/assets/videos/la-liberte.mp4", poster: "/assets/videos/la-liberte-poster.webp" },
  { id: "d", title: "Saatçi Co.", cat: "KIMLIK", year: "2024", layout: "d" },
  { id: "e", title: "Lale Sokağı", cat: "TVC", year: "2024", layout: "e" },
  { id: "f", title: "Mira Skincare", cat: "META PERFORMANCE", year: "2025", layout: "f" },
  { id: "g", title: "Kahve & Co.", cat: "AÇIK HAVA", year: "2025", layout: "g" },
];

/**
 * Behance galeri URL'inden embed adresi üretir.
 * `split('/')[4]` kırılgandı — URL yapısı değişince sessizce bozuluyordu.
 */
export function behanceEmbedSrc(link: string): string {
  const match = link.match(/behance\.net\/gallery\/(\d+)/);
  return match
    ? `https://www.behance.net/embed/project/${match[1]}?tracking_source=project_controls`
    : link;
}
