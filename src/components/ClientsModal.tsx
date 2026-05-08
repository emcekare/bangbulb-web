import { useEffect } from "react";
import Image from "next/image";
import { allClients } from "./sections/Clients";

interface ClientsModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ClientsModal({ open, onClose }: ClientsModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="cmodal cmodal--active">
      <div className="cmodal__backdrop" onClick={onClose} />
      <div className="cmodal__panel cmodal__panel--lg">
        <button className="cmodal__close" onClick={onClose} aria-label="Kapat">
          <span>×</span>
        </button>

        <h2 className="cmodal__title display">Tüm Referanslar</h2>
        <p className="cmodal__desc">Bugüne kadar iş yaptığımız tüm değerli markalar.</p>
        
        <div className="clients-modal__grid">
          {allClients.map((c, i) => (
            <div className="client-modal__item" key={i}>
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Image 
                  src={`/assets/clients/${c.logo}`} 
                  alt={c.name}
                  fill
                  style={{ objectFit: 'contain', padding: '8px' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
