export type ServiceColor = "a" | "b" | "c" | "d" | "e" | "f";

export const serviceGroups = [
  { id: "kreatif", label: "Kreatif & Marka" },
  { id: "mecra", label: "Mecra & İtibar" },
  { id: "performans", label: "Dijital Performans" },
] as const;

export type ServiceGroup = (typeof serviceGroups)[number]["id"];

export type ServiceItem = {
  num: string;
  name: string;
  tag: string;
  color: ServiceColor;
  desc: string;
  group: ServiceGroup;
};

export const serviceItems: ServiceItem[] = [
  { num: "01", name: "Sosyal medya yönetimi", tag: "META · TIKTOK · X", color: "a", desc: "Aylık içerik stratejisi, reels/post üretimi, topluluk ve moderasyon yönetimi.", group: "kreatif" },
  { num: "02", name: "Kurumsal kimlik tasarımı", tag: "BRAND SYSTEM", color: "b", desc: "Logo ailesi, tipografi, renk sistemi ve tüm temas noktaları için marka rehberi.", group: "kreatif" },
  { num: "03", name: "Ambalaj & stant tasarımı", tag: "3D · PRINT", color: "c", desc: "Rafta ilk bakışta ayrışan ambalaj, kutu, etiket ve satış noktası stant tasarımları.", group: "kreatif" },
  { num: "04", name: "Prodüksiyon hizmeti", tag: "FILM · FOTO", color: "d", desc: "Konseptten kurguya reklam filmi, ürün çekimi, mekan ve sosyal medya video prodüksiyonu.", group: "kreatif" },
  { num: "05", name: "TV reklamları", tag: "BROADCAST", color: "e", desc: "Ulusal ve tematik kanallar için senaryo, prodüksiyon ve medya planlama süreçleri.", group: "mecra" },
  { num: "06", name: "Açık hava reklamları", tag: "OOH · DOOH", color: "f", desc: "Billboard, megalight, dijital ekranlar ve transit mecralar için dikkat çekici kampanyalar.", group: "mecra" },
  { num: "07", name: "Influencer marketing", tag: "CREATOR", color: "e", desc: "Marka tonuna uygun içerik üreticisi seçimi, brief, süreç ve etki raporlaması.", group: "mecra" },
  { num: "08", name: "PR çalışmaları", tag: "EARNED MEDIA", color: "f", desc: "Basın bülteni, medya ilişkileri, itibar yönetimi ve lansman iletişimi.", group: "mecra" },
  { num: "09", name: "META reklamları", tag: "PERFORMANCE", color: "a", desc: "Instagram ve Facebook'ta ROAS odaklı kreatif testler, hedefleme ve bütçe optimizasyonu.", group: "performans" },
  { num: "10", name: "Google ADS", tag: "SEM · DISPLAY", color: "b", desc: "Arama ağı, YouTube, görüntülü reklam ve dönüşüm odaklı performans kampanyaları.", group: "performans" },
  { num: "11", name: "Yandex ADS", tag: "RU · TR", color: "c", desc: "Bölgesel ve uluslararası pazarlar için Yandex arama ve reklam ağı yönetimi.", group: "performans" },
  { num: "12", name: "TikTok ADS", tag: "SHORT-FORM", color: "d", desc: "İlk 3 saniyede yakalayan dikey video kreatifleri ve TikTok performans yönetimi.", group: "performans" },
];
