import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

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

  // Only apply the subpath in production builds. Dev runs at `/` so
  // `localhost:3000/` opens the site directly; production export still
  // lives under `/bangbulb-web/` for sub-path hosting (e.g. GitHub Pages).
  basePath: isProd ? "/bangbulb-web" : "",
  assetPrefix: isProd ? "/bangbulb-web/" : "",

  images: {
    unoptimized: true,
  },
  trailingSlash: true,

  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
