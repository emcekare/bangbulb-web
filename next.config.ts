import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

// Alt yol tek kaynaktan gelir: NEXT_PUBLIC_BASE_PATH tanımlıysa (boş string
// dahil) o kullanılır. Tanımsızsa production "/bangbulb-web", dev "" olur.
// Çözülen değer aşağıdaki `env` ile tarayıcı koduna da (getAssetPath) aktarılır.
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH !== undefined
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : isProd
      ? "/bangbulb-web"
      : "";

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
