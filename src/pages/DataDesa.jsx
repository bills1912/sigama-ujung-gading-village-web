import { Users, Home as HomeIcon, Building2, ScrollText } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { VILLAGE, DEMOGRAFI } from '../data/village';
import { PageHeader, StatCard } from '../components/ui';

export default function DataDesa() {
  return (
    <>
      <PageHeader
        eyebrow="Statistik Desa"
        title="Data Makro Desa"
        description="Gambaran umum kependudukan Desa Sosopan: sebaran wilayah, pendidikan, dan mata pencaharian warga."
      />

      <section className="max-w-7xl mx-auto px-5 md:px-10 py-16 md:py-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Users} label="Jumlah Penduduk" value={VILLAGE.stats.penduduk.toLocaleString('id-ID')} sub="jiwa" />
          <StatCard icon={HomeIcon} label="Jumlah Kepala Keluarga" value={DEMOGRAFI.ringkasan.kk.toLocaleString('id-ID')} sub="KK" />
          <StatCard icon={Building2} label="Kepadatan Penduduk" value={DEMOGRAFI.ringkasan.kepadatan} sub="jiwa / km²" />
          <StatCard icon={ScrollText} label="Rukun Tetangga" value={DEMOGRAFI.ringkasan.rt} sub={`di ${VILLAGE.stats.dusun} dusun`} />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mt-8">
          <div className="card rounded-2xl p-6 md:p-7">
            <div className="font-semibold text-[14px] text-pine-deep">Penduduk Menurut Jenis Kelamin</div>
            <div style={{ width: '100%', height: 240 }} className="mt-2">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={DEMOGRAFI.gender} dataKey="value" nameKey="name" innerRadius={54} outerRadius={86} paddingAngle={3}>
                    {DEMOGRAFI.gender.map((_, i) => (
                      <Cell key={i} fill={['#1E4632', '#BE9756'][i]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => v.toLocaleString('id-ID') + ' jiwa'} contentStyle={{ fontSize: 12, borderRadius: 10, border: '1px solid #D3DACD' }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card rounded-2xl p-6 md:p-7">
            <div className="font-semibold text-[14px] text-pine-deep">Penduduk Menurut Dusun</div>
            <div style={{ width: '100%', height: 240 }} className="mt-4">
              <ResponsiveContainer>
                <BarChart data={DEMOGRAFI.dusun} margin={{ top: 4, right: 8, left: -12, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D3DACD" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#1B241C' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#7C8C7E' }} axisLine={false} tickLine={false} />
                  <Tooltip formatter={(v) => v.toLocaleString('id-ID') + ' jiwa'} contentStyle={{ fontSize: 12, borderRadius: 10, border: '1px solid #D3DACD' }} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#1E4632" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card rounded-2xl p-6 md:p-7">
            <div className="font-semibold text-[14px] text-pine-deep">Tingkat Pendidikan</div>
            <div style={{ width: '100%', height: 260 }} className="mt-4">
              <ResponsiveContainer>
                <BarChart data={DEMOGRAFI.pendidikan} layout="vertical" margin={{ left: 8, right: 24, top: 4, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D3DACD" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 10, fill: '#7C8C7E' }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" width={140} tick={{ fontSize: 11, fill: '#1B241C' }} axisLine={false} tickLine={false} />
                  <Tooltip formatter={(v) => v.toLocaleString('id-ID') + ' jiwa'} contentStyle={{ fontSize: 12, borderRadius: 10, border: '1px solid #D3DACD' }} />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]} fill="#BE9756" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card rounded-2xl p-6 md:p-7">
            <div className="font-semibold text-[14px] text-pine-deep">Mata Pencaharian Pokok</div>
            <div style={{ width: '100%', height: 260 }} className="mt-4">
              <ResponsiveContainer>
                <BarChart data={DEMOGRAFI.mataPencaharian} layout="vertical" margin={{ left: 8, right: 24, top: 4, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D3DACD" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 10, fill: '#7C8C7E' }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" width={140} tick={{ fontSize: 11, fill: '#1B241C' }} axisLine={false} tickLine={false} />
                  <Tooltip formatter={(v) => v.toLocaleString('id-ID') + ' jiwa'} contentStyle={{ fontSize: 12, borderRadius: 10, border: '1px solid #D3DACD' }} />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]} fill="#A6552E" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="text-[11.5px] text-mist mt-5">
          Sumber: Data Kependudukan Desa Sosopan — data ilustrasi, sesuaikan dengan hasil pemutakhiran data desa
          (DTSEN/Profil Desa) terbaru.
        </div>
      </section>
    </>
  );
}
