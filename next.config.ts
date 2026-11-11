import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

// Alt yol tek kaynaktan gelir: NEXT_PUBLIC_BASE_PATH.
//   tanımsız ya da boş -> production "/bangbulb-web", dev ""
//   "/"                -> kök (alan adı kökünde yayın)
//   "/baska-yol"       -> o alt yol
// Boş değer bilerek "tanımsız" sayılır: GitHub Actions tanımlanmamış bir
// repo değişkenini boş string olarak verir. Boşu "kök" saymak GitHub Pages'te
// tüm asset yollarını kırmıştı.
// Çözülen değer aşağıdaki `env` ile tarayıcı koduna da (getAssetPath) aktarılır.
const rawBasePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").trim();
const basePath =
  rawBasePath === ""
    ? isProd
      ? "/bangbulb-web"
      : ""
    : rawBasePath === "/"
      ? ""
      : rawBasePath.replace(/\/+$/, "");

const nextConfig: NextConfig = {
  output: "export",

  // Yerel ağdan (telefon/tablet) dev sunucusuna girildiğinde Next.js 16'nın
  // /_next/static JS dosyalarına 403 Forbidden vermesini engeller.
  allowedDevOrigins: [
    "192.168.68.62",
    "192.168.68.*",
    "localhost",
    "127.0.0.1",
  ],

  basePath,
  assetPrefix: basePath ? `${basePath}/` : "",
  env: { NEXT_PUBLIC_BASE_PATH: basePath },

  images: {
    unoptimized: true,
  },
  trailingSlash: true,

  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
