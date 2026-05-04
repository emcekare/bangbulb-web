import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/bangbulb-web",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
