"use client";
import { RefObject, useEffect, useRef } from "react";

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "iframe",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function focusableIn(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => el.offsetParent !== null || el.tagName === "IFRAME"
  );
}

/**
 * Modal erişilebilirliği tek yerde:
 *  - Escape ile kapatma
 *  - arka planın scroll kilidi
 *  - focus tuzağı (Tab modalın dışına çıkmaz)
 *  - açılışta focus'u modala alma, kapanışta tetikleyen öğeye geri verme
 *
 * `panelRef` modal panelinin kendisine (backdrop'a değil) bağlanmalı.
 */
export function useModalA11y(
  open: boolean,
  onClose: () => void,
  panelRef: RefObject<HTMLElement | null>
) {
  // onClose çağıran tarafta inline arrow olabilir; ref'e alarak effect'in
  // her render'da yeniden kurulmasını engelliyoruz.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    // Focus'u modala al. Odaklanacak bir şey yoksa panelin kendisine ver.
    if (panel) {
      const first = focusableIn(panel)[0];
      if (first) {
        first.focus();
      } else {
        panel.setAttribute("tabindex", "-1");
        panel.focus();
      }
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onCloseRef.current();
        return;
      }

      if (e.key !== "Tab" || !panel) return;

      const items = focusableIn(panel);
      if (items.length === 0) {
        e.preventDefault();
        return;
      }

      const first = items[0]!;
      const last = items[items.length - 1]!;
      const active = document.activeElement;

      // Döngüyü kapat: son öğeden Tab başa, ilk öğeden Shift+Tab sona gitsin.
      if (e.shiftKey && (active === first || active === panel)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      } else if (active && !panel.contains(active)) {
        e.preventDefault();
        first.focus();
      }
    };

    // Emniyet katmanı: Tab yakalama cross-origin iframe'lerde çalışmaz, çünkü
    // iframe içindeyken tuş olayları ana dokümana hiç ulaşmaz. Focus iframe'den
    // dışarı çıkıp sayfaya düştüğü anda burada yakalayıp modala geri alıyoruz.
    const onFocusIn = (e: FocusEvent) => {
      if (!panel) return;
      const target = e.target as HTMLElement | null;
      if (target && !panel.contains(target)) {
        e.stopPropagation();
        (focusableIn(panel)[0] ?? panel).focus();
      }
    };

    document.addEventListener("keydown", onKeyDown, true);
    document.addEventListener("focusin", onFocusIn, true);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      document.removeEventListener("focusin", onFocusIn, true);
      document.body.style.overflow = prevOverflow;
      // Modal kapanınca focus'u açan öğeye geri ver — klavye kullanıcısı
      // aksi halde sayfanın en başına düşer.
      previouslyFocused?.focus?.();
    };
  }, [open, panelRef]);
}
