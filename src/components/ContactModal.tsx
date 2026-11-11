"use client";
import { useCallback, useRef, useState } from "react";
import { useModalA11y } from "@/hooks/useModalA11y";
import { contact } from "@/content/contact";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

type Status = "idle" | "sending" | "ok" | "error";

// Web3Forms erişim anahtarı. web3forms.com üzerinden e-posta adresiyle
// ücretsiz alınır ve .env.local içine NEXT_PUBLIC_WEB3FORMS_KEY olarak yazılır.
// Anahtar tanımlı değilse form, ziyaretçinin mail uygulamasını alanları
// önceden doldurarak açmaya geri düşer.
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";
const ENDPOINT = "https://api.web3forms.com/submit";
const FALLBACK_EMAIL = contact.email;

// API hem { message } hem { body: { message } } döndürebiliyor (429 vs 400).
type Web3FormsResponse = {
  success?: boolean;
  message?: string;
  body?: { message?: string };
};

function errorText(res: Response, json: Web3FormsResponse | null): string {
  if (res.status === 429) {
    return "Çok fazla deneme yapıldı. Birkaç dakika sonra tekrar deneyin.";
  }
  if (res.status >= 500) {
    return "Sunucu şu an yanıt vermiyor. Az sonra tekrar deneyin.";
  }
  return (
    json?.message ||
    json?.body?.message ||
    "Mesaj gönderilemedi. İnternet bağlantınızı kontrol edin."
  );
}

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);

  // Kapanışta state'i sıfırla — tekrar açılışta temiz başlasın. Bunu bir
  // effect yerine kapatma yolunda yapıyoruz; effect içinde setState zincirleme
  // render'a yol açıyor.
  const handleClose = useCallback(() => {
    setStatus("idle");
    setErrorMsg("");
    onClose();
  }, [onClose]);

  // Escape, scroll kilidi, focus tuzağı ve focus geri verme
  useModalA11y(open, handleClose, panelRef);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Bal kavanozu — botlar her alanı doldurur; insanlar bu alanı görmez.
    // Web3Forms sunucu tarafında da kontrol ediyor, bu erken çıkış sadece
    // gereksiz istek atmamak için.
    if ((data.get("botcheck") as string)?.length) {
      setStatus("ok");
      return;
    }

    setStatus("sending");

    if (!ACCESS_KEY) {
      // Backend ayarlanmamış → kullanıcının mail uygulamasını aç.
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
      const payload = Object.fromEntries(data.entries());
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ...payload, access_key: ACCESS_KEY }),
      });

      const json: Web3FormsResponse | null = await res
        .json()
        .catch(() => null);

      // 200 dönse bile success:false olabiliyor — ikisini de kontrol et.
      if (!res.ok || json?.success !== true) {
        setErrorMsg(errorText(res, json));
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("ok");
    } catch {
      // Ağ hatası — fetch reddedildi, HTTP yanıtı hiç gelmedi.
      setErrorMsg(
        "Bağlantı kurulamadı. İnternetinizi kontrol edip tekrar deneyin."
      );
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
      <div className="cmodal__backdrop" onClick={handleClose} />
      <div className="cmodal__panel" ref={panelRef}>
        <button
          type="button"
          className="cmodal__close"
          aria-label="Kapat"
          onClick={handleClose}
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
              {ACCESS_KEY
                ? "En kısa sürede dönüş yapacağız."
                : "Mail uygulamanız açıldı — gönder tuşuna basmayı unutmayın."}
            </p>
            <button
              type="button"
              className="nav__cta cmodal__close-cta"
              onClick={handleClose}
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

            {/* Web3Forms bal kavanozu; .cform__hp ile display:none */}
            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="cform__hp"
            />

            {/* Web3Forms'un e-posta konu satırı olarak kullandığı alan */}
            <input
              type="hidden"
              name="subject"
              value="BangBulb · yeni iletişim formu"
            />

            {/* Gelen mailde gönderen adı; varsayılanı "Notifications" */}
            <input type="hidden" name="from_name" value="BangBulb Web" />

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
              Mesajınız {ACCESS_KEY ? "doğrudan ekibimize" : `${FALLBACK_EMAIL} adresine`} iletilir.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
