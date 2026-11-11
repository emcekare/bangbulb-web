export type ProcessStep = {
  i: number;
  tag: string;
  title: string;
  body: string;
  when: string;
};

export const processSteps: ProcessStep[] = [
  {
    i: 0,
    tag: "AYIN SON HAFTASI",
    title: "Sunum",
    body: "Bir sonraki ayın bütün içerikleri (örn: 12 post, 4 reels, 4 story) hazırlanır, size sunulur.",
    when: "Aralık → Ocak için",
  },
  {
    i: 1,
    tag: "BİRLİKTE",
    title: "Toplantı",
    body: "İçerikler birlikte gözden geçirilir, revizeler not alınır, takvim netleştirilir.",
    when: "1 saatlik oturum",
  },
  {
    i: 2,
    tag: "REVİZE & TAKVİM",
    title: "Yayın",
    body: "Paylaşım takvimine göre revizeler tamamlanır, içerikler yayına girer.",
    when: "Haftalık ritim",
  },
  {
    i: 3,
    tag: "AYIN SONUNDA",
    title: "Rapor",
    body: "Geçen ayın istatistik ve durum verileri size iletilir; döngü baştan başlar.",
    when: "Sözleşme süresince",
  },
];
