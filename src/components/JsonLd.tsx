import { contact } from "@/content/contact";
import { socialLinks } from "@/content/links";
import { siteBase, siteName, siteDescription, ogImagePath } from "@/lib/site";
import { basePath } from "@/lib/asset";
import { siteUrl } from "@/lib/site";

export default function JsonLd() {
  const sameAs = socialLinks.map((l) => l.url).filter((u): u is string => !!u);

  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteName,
    description: siteDescription,
    url: siteBase,
    image: `${siteUrl}${basePath}${ogImagePath}`,
    email: contact.email,
    telephone: contact.phone.tel,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Fulya Mh., Büyükdere Cd. No:76",
      addressLocality: "Şişli",
      addressRegion: "İstanbul",
      addressCountry: "TR",
    },
    foundingDate: "2019",
    openingHours: "Mo-Fr 09:00-19:00",
    ...(sameAs.length ? { sameAs } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
