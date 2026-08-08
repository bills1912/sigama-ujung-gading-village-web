import { Link } from 'react-router';
import {
  MapPin, Users, Mountain, Building2, CalendarDays, ArrowUpRight, ArrowRight,
  Landmark, Scale, BarChart3, Clock,
} from 'lucide-react';
import { VILLAGE, AGENDA } from '../data/village';
import { StatChip } from '../components/ui';
import { pecahTanggalId } from '../lib/format';

const QUICK_LINKS = [
  { to: '/profil', title: 'Profil Desa', desc: 'Visi misi dan struktur organisasi pemerintahan desa.', icon: Landmark },
  { to: '/agenda', title: 'Agenda', desc: 'Jadwal kegiatan pemerintahan, sosial, dan kemasyarakatan.', icon: CalendarDays },
  { to: '/anggaran', title: 'Anggaran', desc: 'Transparansi APBDes: pendapatan, belanja, dan realisasi.', icon: BarChart3 },
  { to: '/jdih', title: 'JDIH', desc: 'Arsip peraturan desa dan produk hukum lainnya.', icon: Scale },
];

export default function Beranda() {
  const agendaTerdekat = AGENDA.slice(0, 3);

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, var(--color-pine) 0%, var(--color-pine-deep) 78%)' }}>
        <div className="max-w-7xl mx-auto px-5 md:px-10 pt-32 pb-40 md:pt-40 md:pb-52 relative z-10">
          <div className="animate-fadeUp">
            <div className="font-mono inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase font-semibold text-white/60">
              <MapPin size={12} />
              {VILLAGE.kecamatan} · {VILLAGE.kabupaten} · {VILLAGE.provinsi}
            </div>
          </div>
          <h1 className="animate-fadeUp delay-1 font-display text-white font-semibold leading-[1.04] mt-5" style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)' }}>
            {VILLAGE.nama}
          </h1>
          <p className="animate-fadeUp delay-2 text-white/75 max-w-xl mt-5 text-[15.5px] leading-relaxed">
            {VILLAGE.tagline}
          </p>
          <div className="animate-fadeUp delay-2 flex flex-wrap gap-3 mt-8">
            <Link to="/anggaran" className="btn-gold rounded-full px-6 py-3 text-[14px] inline-flex items-center gap-2">
              Transparansi Anggaran <ArrowUpRight size={16} />
            </Link>
            <Link to="/profil" className="btn-ghost rounded-full px-6 py-3 text-[14px]">
              Profil Desa
            </Link>
          </div>

          <div className="animate-fadeUp delay-3 grid grid-cols-2 md:grid-cols-4 gap-3 mt-14 max-w-3xl">
            <StatChip icon={Users} value={VILLAGE.stats.penduduk.toLocaleString('id-ID')} label="Jiwa Penduduk" />
            <StatChip icon={Mountain} value={`${VILLAGE.stats.luas} km²`} label="Luas Wilayah" />
            {/* <StatChip icon={Building2} value={`${VILLAGE.stats.dusun} Dusun`} label="Wilayah Administratif" /> */}
            {/* <StatChip icon={CalendarDays} value={VILLAGE.stats.tahunBentuk} label="Tahun Pemekaran" /> */}
          </div>
        </div>

        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 220" preserveAspectRatio="none" style={{ height: '130px' }} aria-hidden="true">
          <path d="M0,120 C240,60 480,160 720,100 C960,40 1200,140 1440,80 L1440,220 L0,220 Z" fill="#2F5C43" opacity="0.55" />
          <path d="M0,160 C260,110 500,190 760,140 C1000,95 1220,180 1440,130 L1440,220 L0,220 Z" fill="#1E4632" opacity="0.8" />
          <path d="M0,190 C300,150 560,210 800,170 C1040,135 1260,205 1440,170 L1440,220 L0,220 Z" fill="#0F2A1E" opacity="1" />
        </svg>
      </section>

      {/* ============ QUICK LINKS ============ */}
      <section className="max-w-7xl mx-auto px-5 md:px-10 py-16 md:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {QUICK_LINKS.map((q) => (
            <Link key={q.to} to={q.to} className="card rounded-2xl p-6 terrace group">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-pine/10 mb-4">
                <q.icon size={20} className="text-pine" strokeWidth={1.8} />
              </div>
              <div className="font-semibold text-[15px] text-pine-deep">{q.title}</div>
              <p className="text-[12.5px] text-mist leading-relaxed mt-1.5">{q.desc}</p>
              <span className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-pine mt-4 group-hover:gap-2 transition-all">
                Lihat selengkapnya <ArrowRight size={13} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ AGENDA TERDEKAT ============ */}
      <section className="bg-paper-soft">
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-16 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <div className="font-mono inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase font-semibold text-gold-ink">
                <span className="inline-block w-[18px] h-[1.5px] bg-gold-ink" /> Agenda Terdekat
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-semibold mt-2 text-pine-deep">Kegiatan Mendatang</h2>
            </div>
            <Link to="/agenda" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-pine">
              Lihat semua agenda <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {agendaTerdekat.map((a, i) => {
              const d = pecahTanggalId(a.tanggal);
              return (
                <div key={i} className="card rounded-2xl p-5 flex gap-4">
                  <div className="shrink-0 w-14 h-14 rounded-xl flex flex-col items-center justify-center bg-pine">
                    <span className="font-display text-white text-lg font-semibold leading-none">{d.tgl}</span>
                    <span className="text-[9.5px] uppercase tracking-wide text-white/70 mt-1">{d.bln}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-[13.5px] leading-snug text-pine-deep">{a.judul}</div>
                    <div className="flex items-center gap-1.5 text-[11.5px] text-mist mt-2">
                      <Clock size={11} /> {a.waktu} WIB · {a.lokasi}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
