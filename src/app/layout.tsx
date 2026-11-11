import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "./styles.css";
import "./styles-extra.css";
import "./mobile.css";
import "./not-found.css";
import Analytics from "@/components/Analytics";
import JsonLd from "@/components/JsonLd";
import { siteBase, siteName, siteDescription, ogImagePath } from "@/lib/site";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  axes: ["opsz", "wdth"],
  display: "swap",
  variable: "--font-bricolage",
});
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-inter",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-jetbrains",
});

const title = "BangBulb | Reklam ajansı, İstanbul";

export const metadata: Metadata = {
  metadataBase: new URL(siteBase),
  title: { default: title, template: "%s | BangBulb" },
  description: siteDescription,
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName,
    title,
    description: siteDescription,
    url: "./",
    images: [
      {
        url: `.${ogImagePath}`,
        width: 1200,
        height: 630,
        alt: "BangBulb: parlak fikirler karanlık odalar için.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteDescription,
    images: [`.${ogImagePath}`],
  },
};

export const viewport: Viewport = {
  themeColor: "#0c1816",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="tr"
      className={`${bricolage.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body data-theme="amber" data-mode="dark">
        {children}
        <JsonLd />
        <Analytics />
      </body>
    </html>
  );
}
