import { basePath } from "./asset";

/** Sitenin kök adresi. Alt yol (basePath) dahil DEĞİLDİR. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://bangbulb.com"
).replace(/\/+$/, "");

/** Sitenin yayınlandığı tam adres, sonunda slash ile (alt yol dahil). */
export const siteBase = `${siteUrl}${basePath}/`;

export const siteName = "BangBulb";
export const siteDescription =
  "Reklamı seven, sosyal medyayı önemseyen, abartmadan iş yapan sekiz kişilik bir ajansız.";
export const ogImagePath = "/assets/og-image.png";
