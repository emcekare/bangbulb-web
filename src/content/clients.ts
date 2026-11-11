export type Client = {
  name: string;
  logo: string;
};

export const mainClients: Client[] = [
  { name: "A101", logo: "a-101.svg" },
  { name: "TurkNet", logo: "turknet.svg" },
  { name: "Gelik", logo: "gelik.svg" },
  { name: "Filizler", logo: "filizler.svg" },
  { name: "Helen Doron", logo: "helen-doron.svg" },
  { name: "Kumanya", logo: "kumanya.svg" },
  { name: "Rags", logo: "rags.svg" },
  { name: "Zavinna", logo: "zavinna.svg" },
  { name: "Souffle", logo: "souffle.svg" },
  { name: "Alisya", logo: "alisya.svg" },
  { name: "New Face", logo: "new-face.svg" },
  { name: "Birey Koleji", logo: "birey.svg" },
];

export const allClients: Client[] = [
  ...mainClients,
  { name: "Esen Bahçe", logo: "esen-bahce.svg" },
  { name: "Estetech", logo: "estetech.svg" },
  { name: "Fistalora", logo: "fistalora.svg" },
  { name: "Golden Plus", logo: "golden-plus.svg" },
  { name: "Hedef Akademi", logo: "hedef-akademi.svg" },
  { name: "Hemdem", logo: "hemdem.svg" },
  { name: "Kalyoncuoğlu", logo: "kalyoncuoglu.svg" },
  { name: "La Liberte", logo: "la-liberte.svg" },
  { name: "Lumiere", logo: "lumiere.svg" },
  { name: "Reborn", logo: "reborn.svg" },
  { name: "YL", logo: "yl.svg" },
];
