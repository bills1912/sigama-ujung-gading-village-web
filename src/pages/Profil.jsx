import { useEffect, useRef, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { VILLAGE, ORG_STRUCTURES } from '../data/village';
import { PageHeader, OrgTree } from '../components/ui';

export default function Profil() {
  const [tab, setTab] = useState(ORG_STRUCTURES[0].key);
  const aktif = ORG_STRUCTURES.find((s) => s.key === tab);
  const scrollRef = useRef(null);

  // Bagan bisa lebih lebar dari layar (terutama di mobile). Tanpa ini,
  // posisi scroll awal ada di ujung kiri sehingga node paling penting
  // (mis. Kepala Desa/Ketua, yang diletakkan di tengah bagan) malah
  // tidak terlihat. Pusatkan scroll setiap kali tab/bagan berganti.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
  }, [tab]);

  return (
    <>
      <PageHeader
        eyebrow="Profil Desa"
        title="Pemerintahan, Visi & Misi"
        description={`Mengenal kepemimpinan, arah pembangunan, dan struktur organisasi pemerintahan ${VILLAGE.nama}.`}
      />

      <section className="max-w-7xl mx-auto px-5 md:px-10 py-16 md:py-24">
        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2 card rounded-2xl p-7 terrace">
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-display text-lg font-semibold bg-pine">
              {VILLAGE.kepalaDesa.split(' ').map((w) => w[0]).slice(0, 2).join('')}
            </div>
            <div className="mt-4 font-semibold text-[15px] text-pine-deep">{VILLAGE.kepalaDesa}</div>
            <div className="text-xs text-mist mb-4">Kepala {VILLAGE.nama}</div>
            <p className="text-[13.5px] leading-relaxed text-mist">{VILLAGE.sambutan}</p>
          </div>

          <div className="md:col-span-3 grid gap-5">
            <div className="card rounded-2xl p-7">
              <div className="font-mono text-[11px] tracking-widest uppercase font-semibold text-gold-ink">Visi</div>
              <p className="font-display text-lg md:text-xl leading-snug mt-2 text-pine-deep">{VILLAGE.visi}</p>
            </div>
            <div className="card rounded-2xl p-7">
              <div className="font-mono text-[11px] tracking-widest uppercase font-semibold text-gold-ink">Misi</div>
              <ul className="mt-3 space-y-2.5">
                {VILLAGE.misi.map((m, i) => (
                  <li key={i} className="flex gap-3 text-[13.5px] leading-relaxed text-mist">
                    <ChevronRight size={16} className="shrink-0 mt-0.5 text-pine" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* struktur organisasi */}
        <div className="mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-pine-deep">Struktur Organisasi</h2>
          <p className="text-[13.5px] text-mist max-w-2xl mt-2 mb-6">
            {VILLAGE.nama} memiliki beberapa lembaga dengan bagan kepengurusan masing-masing. Pilih lembaga di bawah
            untuk melihat susunannya.
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {ORG_STRUCTURES.map((s) => (
              <button
                key={s.key}
                data-active={tab === s.key}
                onClick={() => setTab(s.key)}
                className="chip rounded-full px-4 py-1.5 text-[12.5px] font-medium"
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="card rounded-2xl p-6 md:p-10">
            <p className="text-[12.5px] text-mist max-w-xl mx-auto text-center mb-8">{aktif.catatan}</p>
            <div ref={scrollRef} className="overflow-x-auto pb-2">
              <div className="flex justify-center min-w-max mx-auto">
                <OrgTree data={aktif.tree} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}