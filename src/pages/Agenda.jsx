import { useMemo, useState } from 'react';
import { Clock, MapPin } from 'lucide-react';
import { AGENDA, AGENDA_KATEGORI, CATEGORY_STYLE, VILLAGE } from '../data/village';
import { PageHeader, Badge } from '../components/ui';
import { pecahTanggalId } from '../lib/format';

export default function Agenda() {
  const [filter, setFilter] = useState('Semua');

  const agendaFiltered = useMemo(
    () => (filter === 'Semua' ? AGENDA : AGENDA.filter((a) => a.kategori === filter)),
    [filter]
  );

  return (
    <>
      <PageHeader
        eyebrow="Agenda Desa"
        title="Jadwal Kegiatan"
        description={`Informasi kegiatan pemerintahan, pembangunan, keagamaan, dan kemasyarakatan yang berlangsung di ${VILLAGE.nama}.`}
      />

      <section className="max-w-7xl mx-auto px-5 md:px-10 py-16 md:py-24">
        <div className="flex flex-wrap gap-2">
          {AGENDA_KATEGORI.map((k) => (
            <button
              key={k}
              data-active={filter === k}
              onClick={() => setFilter(k)}
              className="chip rounded-full px-4 py-1.5 text-[12.5px] font-medium"
            >
              {k}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-8">
          {agendaFiltered.map((a, i) => {
            const d = pecahTanggalId(a.tanggal);
            const style = CATEGORY_STYLE[a.kategori];
            return (
              <div key={i} className="card rounded-2xl p-5 flex gap-4">
                <div className="shrink-0 w-16 h-16 rounded-xl flex flex-col items-center justify-center bg-pine">
                  <span className="font-display text-white text-xl font-semibold leading-none">{d.tgl}</span>
                  <span className="text-[10.5px] uppercase tracking-wide text-white/70 mt-1">
                    {d.bln} {d.thn}
                  </span>
                </div>
                <div className="min-w-0">
                  <Badge label={a.kategori} style={style} />
                  <div className="font-semibold text-[14px] mt-2 leading-snug text-pine-deep">{a.judul}</div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-mist mt-2">
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {a.waktu} WIB
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} /> {a.lokasi}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          {agendaFiltered.length === 0 && (
            <div className="text-mist text-sm py-10 text-center col-span-2">Belum ada kegiatan pada kategori ini.</div>
          )}
        </div>
      </section>
    </>
  );
}