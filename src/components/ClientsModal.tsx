"use client";
import { useRef } from "react";
import Image from "next/image";
import { allClients } from "./sections/Clients";
import { getAssetPath } from "@/lib/asset";
import { useModalA11y } from "@/hooks/useModalA11y";

interface ClientsModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ClientsModal({ open, onClose }: ClientsModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Escape, scroll kilidi, focus tuzağı ve focus geri verme
  useModalA11y(open, onClose, panelRef);

  if (!open) return null;

  return (
    <div
      className="cmodal cmodal--active"
      role="dialog"
      aria-modal="true"
      aria-labelledby="clients-modal-title"
    >
      <div className="cmodal__backdrop" onClick={onClose} />
      <div className="cmodal__panel cmodal__panel--lg" ref={panelRef}>
        <button
          type="button"
          className="cmodal__close"
          onClick={onClose}
          aria-label="Kapat"
        >
          <span aria-hidden="true">×</span>
        </button>

        <h2 id="clients-modal-title" className="cmodal__title display">
          Tüm Referanslar
        </h2>
        <p className="cmodal__desc">
          Bugüne kadar iş yaptığımız tüm değerli markalar.
        </p>

        <ul className="clients-modal__grid">
          {allClients.map((c, i) => (
            <li className="client-modal__item" key={i}>
              <div style={{ position: "relative", width: "100%", height: "100%" }}>
                <Image
                  src={getAssetPath(`/assets/clients/${c.logo}`)}
                  alt={c.name}
                  fill
                  sizes="(max-width: 640px) 33vw, 160px"
                  style={{ objectFit: "contain", padding: "8px" }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
