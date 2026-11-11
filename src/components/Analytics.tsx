"use client";

import { useEffect } from "react";
import Script from "next/script";
import { track } from "@/lib/analytics";

const src = process.env.NEXT_PUBLIC_UMAMI_SRC;
const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

/**
 * Umami betiği ve olay dinleyicileri. src veya website id boşsa hiçbir şey
 * yüklenmez ve hiçbir dinleyici eklenmez.
 *
 * Takip edilen olaylar:
 *  - a[href^="tel:"]    tıklaması -> "phone_click"
 *  - a[href^="mailto:"] tıklaması -> "email_click"
 *  - window'da "bb:form-sent" özel olayı -> "contact_form_sent"
 *    (iletişim formu başarıyla gönderilince şöyle tetiklenmeli:
 *     window.dispatchEvent(new CustomEvent("bb:form-sent")))
 */
export default function Analytics() {
  const enabled = Boolean(src && websiteId);

  useEffect(() => {
    if (!enabled) return;

    const onClick = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const a = target.closest("a[href]");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) track("phone_click");
      else if (href.startsWith("mailto:")) track("email_click");
    };
    const onFormSent = () => track("contact_form_sent");

    document.addEventListener("click", onClick);
    window.addEventListener("bb:form-sent", onFormSent);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("bb:form-sent", onFormSent);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <Script
      src={src}
      data-website-id={websiteId}
      defer
      strategy="afterInteractive"
    />
  );
}
