import type { Metadata } from "next";
import "./globals.css";
import "./styles.css";
import "./styles-extra.css";

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
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Fraunces:ital,wght@0,400;0,500;1,400&family=DM+Serif+Display:ital@0;1&family=Geist:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body data-theme="amber" data-mode="dark">
        {children}
      </body>
    </html>
  );
}
