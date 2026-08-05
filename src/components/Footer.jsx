import { Link } from 'react-router';
import { Mountain, Phone, Mail, Clock, Globe, MessageCircle, Share2 } from 'lucide-react';
import { VILLAGE, NAV_ITEMS } from '../data/village';

export default function Footer() {
  return (
    <footer className="bg-pine-deep text-white">
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-16 md:py-20">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-full flex items-center justify-center bg-gold">
                <Mountain size={16} className="text-pine-deep" strokeWidth={2} />
              </span>
              <span className="font-display font-semibold text-[16px]">{VILLAGE.nama}</span>
            </div>
            <p className="text-white/60 text-[13px] leading-relaxed mt-4 max-w-sm">
              {VILLAGE.kontak.alamat}. Website resmi ini dikelola oleh Pemerintah {VILLAGE.nama} sebagai bentuk keterbukaan
              informasi publik.
            </p>
            <div className="flex gap-3 mt-5">
              {[Globe, MessageCircle, Share2].map((Icon, i) => (
                <span key={i} className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer bg-white/8 hover:bg-white/15 transition-colors">
                  <Icon size={15} />
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="font-mono text-[11px] tracking-widest uppercase text-white/45 font-semibold mb-4">Tautan Cepat</div>
            <ul className="space-y-2.5 text-[13px] text-white/70">
              {NAV_ITEMS.slice(1).map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="hover:text-white transition-colors">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-mono text-[11px] tracking-widest uppercase text-white/45 font-semibold mb-4">Kontak</div>
            <ul className="space-y-3 text-[13px] text-white/70">
              <li className="flex items-start gap-2.5">
                <Phone size={14} className="mt-0.5 shrink-0" /> {VILLAGE.kontak.telepon}
              </li>
              <li className="flex items-start gap-2.5">
                <Mail size={14} className="mt-0.5 shrink-0" /> {VILLAGE.kontak.email}
              </li>
              <li className="flex items-start gap-2.5">
                <Clock size={14} className="mt-0.5 shrink-0" /> {VILLAGE.kontak.jamLayanan}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-3 mt-14 pt-6 text-[12px] text-white/45 border-t border-white/10">
          <span>© {new Date().getFullYear()} Pemerintah {VILLAGE.nama}. Seluruh hak cipta dilindungi.</span>
          <span>Dibangun dengan Vite + React — data pada situs ini bersifat ilustratif.</span>
        </div>
      </div>
    </footer>
  );
}
