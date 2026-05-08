"use client";
import { useEffect, useState } from "react";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

type Status = "idle" | "sending" | "ok" | "error";

// Optional form endpoint. Set NEXT_PUBLIC_CONTACT_ENDPOINT in .env.local to a
// Formspree (https://formspree.io/f/XXXX) or Web3Forms URL. If unset, the
// form falls back to opening the visitor's mail client with prefilled data.
const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "";
const FALLBACK_EMAIL = "bangbulb@gmail.com";

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  // Reset state every time the modal closes so reopening is clean.
  useEffect(() => {
    if (!open) {
      setStatus("idle");
      setErrorMsg("");
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot — bots tend to fill every field; humans never see this one.
    if ((data.get("_gotcha") as string)?.length) {
      setStatus("ok");
      return;
    }

    setStatus("sending");

    if (!ENDPOINT) {
      // No backend configured → open user's email client.
      const subject = "BangBulb · İletişim formu";
      const body =
        `İsim: ${data.get("name")}\n` +
        `E-posta: ${data.get("email")}\n` +
        `Telefon: ${data.get("phone") || "-"}\n\n` +
        `Mesaj:\n${data.get("message")}`;
      window.location.href =
        `mailto:${FALLBACK_EMAIL}` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;
      setStatus("ok");
      return;
    }

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || `HTTP ${res.status}`);
      }
      form.reset();
      setStatus("ok");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Gönderilemedi");
      setStatus("error");
    }
  };

  return (
    <div
      className="cmodal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cmodal-title"
    >
      <div className="cmodal__backdrop" onClick={onClose} />
      <div className="cmodal__panel">
        <button
          type="button"
          className="cmodal__close"
          aria-label="Kapat"
          onClick={onClose}
        >
          ×
        </button>

        <div className="cmodal__head">
          <div className="eyebrow">— iletişim formu</div>
          <h2 id="cmodal-title" className="cmodal__title display">
            Bir <span className="italic">kahve</span> içelim.
          </h2>
          <p className="cmodal__sub">
            Form üzerinden hızlıca yazabilirsin — 24 saat içinde geri döneriz.
          </p>
        </div>

        {status === "ok" ? (
          <div className="cmodal__success">
            <div className="cmodal__success-mark">✓</div>
            <h3 className="display">Aldık!</h3>
            <p>
              {ENDPOINT
                ? "En kısa sürede dönüş yapacağız."
                : "Mail uygulamanız açıldı — gönder tuşuna basmayı unutmayın."}
            </p>
            <button
              type="button"
              className="nav__cta cmodal__close-cta"
              onClick={onClose}
            >
              Kapat
            </button>
          </div>
        ) : (
          <form className="cform" onSubmit={handleSubmit} noValidate>
            <label className="cform__field">
              <span>İsim</span>
              <input
                type="text"
                name="name"
                required
                autoComplete="name"
                placeholder="Adınız Soyadınız"
              />
            </label>
            <label className="cform__field">
              <span>E-posta</span>
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="ornek@firma.com"
              />
            </label>
            <label className="cform__field">
              <span>Telefon (opsiyonel)</span>
              <input
                type="tel"
                name="phone"
                autoComplete="tel"
                placeholder="0 5xx xxx xx xx"
              />
            </label>
            <label className="cform__field">
              <span>Mesaj</span>
              <textarea
                name="message"
                rows={5}
                required
                placeholder="Anlatın bakalım — proje türü, bütçe, takvim?"
              />
            </label>

            {/* Honeypot field; styled off-screen via CSS class .cform__hp */}
            <input
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="cform__hp"
            />

            {/* Subject line for Formspree-style services */}
            <input type="hidden" name="_subject" value="BangBulb iletişim formu" />

            {status === "error" && (
              <div className="cform__error">⚠ {errorMsg}</div>
            )}

            <button
              type="submit"
              className="nav__cta cform__submit"
              disabled={status === "sending"}
            >
              <span className="nav__cta-dot"></span>
              {status === "sending" ? "Gönderiliyor…" : "Mesajı yolla"}
            </button>

            <p className="cform__note">
              Mesajınız {ENDPOINT ? "doğrudan ekibimize" : `${FALLBACK_EMAIL} adresine`} iletilir.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
