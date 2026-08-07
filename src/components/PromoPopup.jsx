import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { X } from 'lucide-react';

const SESSION_KEY = 'se2026-promo-popup-shown';

/** Popup promosi Sensus Ekonomi 2026 (SE2026) dari BPS.
 *  Tampil sekali per sesi browser, sesaat setelah halaman dibuka. */
export default function PromoPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    const timer = setTimeout(() => setOpen(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setOpen(false);
    sessionStorage.setItem(SESSION_KEY, '1');
  };

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-pine-deep/70 backdrop-blur-sm popup-backdrop"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Promosi Sensus Ekonomi 2026"
    >
      <div
        className="popup-card relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          aria-label="Tutup"
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/45 hover:bg-black/65 text-white flex items-center justify-center transition-colors"
        >
          <X size={18} />
        </button>

        <div className="max-h-[75vh] overflow-y-auto">
          <picture>
            <source srcSet="/flyer-se2026.webp" type="image/webp" />
            <img
              src="/flyer-se2026.jpg"
              alt="Flyer Sensus Ekonomi 2026: Semua Didata! Ayo sukseskan Sensus Ekonomi, 1 Mei - 31 Agustus 2026. Seluruh UMKM dan jenis usaha lainnya akan didata. Data dijamin rahasia."
              className="w-full h-auto block"
              loading="eager"
            />
          </picture>
        </div>

        <div className="p-4 flex flex-col sm:flex-row gap-2.5 border-t border-mist-soft">
          <Link
            to="/agenda"
            onClick={close}
            className="btn-gold flex-1 text-center rounded-full px-5 py-2.5 text-[13px]"
          >
            Lihat Agenda Sensus
          </Link>
          <button
            onClick={close}
            className="flex-1 text-center rounded-full px-5 py-2.5 text-[13px] font-semibold text-pine border border-mist-soft hover:border-pine transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
