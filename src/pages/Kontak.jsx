import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { VILLAGE } from '../data/village';
import { PageHeader } from '../components/ui';

const INFO = [
  { icon: MapPin, label: 'Alamat Kantor', value: VILLAGE.kontak.alamat },
  { icon: Phone, label: 'Telepon', value: VILLAGE.kontak.telepon },
  { icon: Mail, label: 'Email', value: VILLAGE.kontak.email },
  { icon: Clock, label: 'Jam Pelayanan', value: VILLAGE.kontak.jamLayanan },
];

export default function Kontak() {
  return (
    <>
      <PageHeader
        eyebrow="Hubungi Kami"
        title={`Kontak ${VILLAGE.nama}`}
        description={`Sampaikan pertanyaan, aspirasi, atau kebutuhan layanan administrasi kepada Pemerintah ${VILLAGE.nama}.`}
      />

      <section className="max-w-7xl mx-auto px-5 md:px-10 py-16 md:py-24">
        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 grid gap-4">
            {INFO.map((item) => (
              <div key={item.label} className="card rounded-2xl p-6 flex items-start gap-4">
                <div className="rounded-xl p-2.5 shrink-0 bg-pine/10">
                  <item.icon size={20} className="text-pine" strokeWidth={1.8} />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wide font-semibold text-mist">{item.label}</div>
                  <div className="text-[14px] font-medium text-pine-deep mt-1 leading-relaxed">{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3 card rounded-2xl p-2 min-h-[320px] flex items-center justify-center overflow-hidden">
            <div className="text-center py-16 px-6">
              <div className="w-14 h-14 rounded-full bg-pine/10 flex items-center justify-center mx-auto">
                <MapPin size={24} className="text-pine" strokeWidth={1.8} />
              </div>
              <div className="font-display text-lg font-semibold text-pine-deep mt-4">Kantor {VILLAGE.nama}</div>
              <p className="text-[13px] text-mist mt-2 max-w-sm mx-auto leading-relaxed">
                {VILLAGE.kontak.alamat}
              </p>
              <p className="text-[11.5px] text-mist mt-4">Tautkan peta interaktif (Google Maps) di sini setelah lokasi resmi tersedia.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}