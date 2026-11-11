import type { Metadata } from "next";
import "./globals.css";
import "./styles.css";
import "./styles-extra.css";
import "./mobile.css";

export const metadata: Metadata = {
  title: "BangBulb — reklam ajansı",
  description:
    "Reklamı seven, sosyal medyayı önemseyen, abartmadan iş yapan sekiz kişilik bir ajansız.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,300..800&family=Inter:ital,wght@0,300..700;1,300..700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body data-theme="amber" data-mode="dark">
        {children}
      </body>
    </html>
  );
}
