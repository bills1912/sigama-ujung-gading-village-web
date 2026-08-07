import { useState } from 'react';
import { ChevronDown, Megaphone } from 'lucide-react';

/** Strip accordion tepat di bawah header, berisi spanduk dukungan
 *  Sensus Ekonomi 2026. Tertutup secara default, bisa dibuka/tutup
 *  oleh pengunjung, dan state-nya bertahan selama pindah halaman
 *  karena komponen ini dirender sekali di App.jsx (di luar <Routes>). */
export default function SupportBanner() {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-pine/10 bg-gold-soft/25">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full max-w-7xl mx-auto px-5 md:px-10 py-2.5 flex items-center justify-between gap-3 text-left"
      >
        <span className="flex items-center gap-2 text-[12.5px] font-semibold text-pine-deep">
          <Megaphone size={15} className="text-gold-ink shrink-0" />
          <span>
            {open ? 'Sembunyikan' : 'Dukungan'} Sensus Ekonomi 2026
            <span className="hidden sm:inline text-mist font-normal"> — #MencatatEkonomiIndonesia</span>
          </span>
        </span>
        <ChevronDown
          size={16}
          className={`text-mist shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="max-w-7xl mx-auto px-5 md:px-10 pb-4">
            <picture>
              <source srcSet="/spanduk-se2026.webp" type="image/webp" />
              <img
                src="/spanduk-se2026.jpg"
                alt="Spanduk dukungan Sensus Ekonomi 2026: Mari bersama sukseskan Sensus Ekonomi 2026, 1 Mei - 31 Agustus 2026, #MencatatEkonomiIndonesia"
                className="w-full h-auto rounded-xl border border-mist-soft"
                loading="lazy"
              />
            </picture>
          </div>
        </div>
      </div>
    </div>
  );
}
