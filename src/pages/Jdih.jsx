import { useMemo, useState } from 'react';
import { Search, Download } from 'lucide-react';
import { JDIH_DOCS, JDIH_KATEGORI, JDIH_STYLE, VILLAGE } from '../data/village';
import { PageHeader, Badge } from '../components/ui';

export default function Jdih() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('Semua');

  const docs = useMemo(() => {
    return JDIH_DOCS.filter((d) => {
      const matchKategori = filter === 'Semua' || d.kategori === filter;
      const q = query.trim().toLowerCase();
      const matchQuery = !q || d.judul.toLowerCase().includes(q) || d.nomor.toLowerCase().includes(q);
      return matchKategori && matchQuery;
    });
  }, [query, filter]);

  return (
    <>
      <PageHeader
        eyebrow="Jaringan Dokumentasi & Informasi Hukum"
        title="Produk Hukum Desa (JDIH)"
        description={`Arsip Peraturan Desa, Peraturan Kepala Desa, dan Keputusan resmi yang berlaku di ${VILLAGE.nama}.`}
      />

      <section className="max-w-7xl mx-auto px-5 md:px-10 py-16 md:py-24">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-mist" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari nomor atau judul dokumen…"
              className="w-full pl-11 pr-4 py-3 rounded-full text-[13.5px] outline-none bg-white border border-mist-soft focus:border-pine transition-colors"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {JDIH_KATEGORI.map((k) => (
              <button key={k} data-active={filter === k} onClick={() => setFilter(k)} className="chip rounded-full px-3.5 py-2 text-[12px] font-medium">
                {k}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-7 rounded-2xl overflow-hidden card">
          <div className="hidden md:grid grid-cols-12 px-6 py-3 text-[11px] uppercase tracking-wide font-semibold text-mist border-b border-mist-soft">
            <div className="col-span-2">Nomor</div>
            <div className="col-span-5">Judul / Tentang</div>
            <div className="col-span-2">Kategori</div>
            <div className="col-span-2">Tanggal</div>
            <div className="col-span-1 text-right">Berkas</div>
          </div>
          {docs.map((doc, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-12 gap-y-1.5 px-6 py-4 items-center"
              style={{ borderBottom: i === docs.length - 1 ? 'none' : '1px solid var(--color-mist-soft)' }}
            >
              <div className="md:col-span-2 font-mono text-[12.5px] font-medium text-pine-deep">{doc.nomor}</div>
              <div className="md:col-span-5 text-[13px] leading-snug pr-4">{doc.judul}</div>
              <div className="md:col-span-2">
                <Badge label={doc.kategori} style={JDIH_STYLE[doc.kategori]} />
              </div>
              <div className="md:col-span-2 text-[12.5px] text-mist">{doc.tanggal}</div>
              <div className="md:col-span-1 md:text-right">
                <button
                  onClick={() => alert('Berkas resmi akan tersedia setelah dokumen ini dihubungkan ke arsip desa.')}
                  className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-pine"
                >
                  <Download size={13} /> Unduh
                </button>
              </div>
            </div>
          ))}
          {docs.length === 0 && <div className="text-mist text-sm py-10 text-center">Dokumen tidak ditemukan.</div>}
        </div>
      </section>
    </>
  );
}