import { useMemo, useState } from 'react';
import { TrendingUp, BarChart3, Scale } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import {
  TAHUN_LIST, FAKTOR_TAHUN, BASE_PENDAPATAN, BASE_BELANJA, REALISASI_BASE, CHART_COLORS, VILLAGE,
} from '../data/village';
import { PageHeader, StatCard } from '../components/ui';
import { formatRupiah, formatRupiahSingkat } from '../lib/format';

export default function Anggaran() {
  const [tahun, setTahun] = useState(2026);

  const pendapatan = useMemo(
    () => BASE_PENDAPATAN.map((d) => ({ ...d, value: Math.round(d.value * FAKTOR_TAHUN[tahun]) })),
    [tahun]
  );
  const belanja = useMemo(
    () => BASE_BELANJA.map((d) => ({ ...d, value: Math.round(d.value * FAKTOR_TAHUN[tahun]) })),
    [tahun]
  );
  const totalPendapatan = useMemo(() => pendapatan.reduce((a, b) => a + b.value, 0), [pendapatan]);
  const totalBelanja = useMemo(() => belanja.reduce((a, b) => a + b.value, 0), [belanja]);

  return (
    <>
      <PageHeader
        eyebrow="Transparansi Fiskal"
        title="Anggaran Pendapatan & Belanja Desa"
        description={`Ringkasan APBDes ${VILLAGE.nama} sebagai bentuk akuntabilitas pengelolaan keuangan desa kepada warga.`}
      />

      <section className="max-w-7xl mx-auto px-5 md:px-10 py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-pine-deep">Tahun Anggaran</h2>
          <div className="flex gap-2">
            {TAHUN_LIST.map((t) => (
              <button
                key={t}
                data-active={tahun === t}
                onClick={() => setTahun(t)}
                className="chip rounded-full px-4 py-2 text-[13px] font-semibold font-mono"
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mt-8">
          <StatCard icon={TrendingUp} label={`Total Pendapatan ${tahun}`} value={formatRupiahSingkat(totalPendapatan)} />
          <StatCard icon={BarChart3} label={`Total Belanja ${tahun}`} value={formatRupiahSingkat(totalBelanja)} />
          <StatCard
            icon={Scale}
            label="Status Anggaran"
            value={totalPendapatan >= totalBelanja ? 'Berimbang' : 'Defisit'}
            sub={formatRupiah(Math.abs(totalPendapatan - totalBelanja)) + ' selisih'}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mt-8">
          <div className="card rounded-2xl p-6 md:p-7">
            <div className="font-semibold text-[14px] text-pine-deep">Sumber Pendapatan {tahun}</div>
            <div style={{ width: '100%', height: 280 }} className="mt-4">
              <ResponsiveContainer>
                <BarChart data={pendapatan} layout="vertical" margin={{ left: 8, right: 24, top: 4, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D3DACD" horizontal={false} />
                  <XAxis type="number" tickFormatter={(v) => formatRupiahSingkat(v)} tick={{ fontSize: 10, fill: '#7C8C7E' }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" width={150} tick={{ fontSize: 11, fill: '#1B241C' }} axisLine={false} tickLine={false} />
                  <Tooltip formatter={(v) => formatRupiah(v)} contentStyle={{ fontSize: 12, borderRadius: 10, border: '1px solid #D3DACD' }} />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                    {pendapatan.map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card rounded-2xl p-6 md:p-7">
            <div className="font-semibold text-[14px] text-pine-deep">Bidang Belanja {tahun}</div>
            <div style={{ width: '100%', height: 280 }} className="mt-2">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={belanja} dataKey="value" nameKey="name" innerRadius={58} outerRadius={92} paddingAngle={2}>
                    {belanja.map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => formatRupiah(v)} contentStyle={{ fontSize: 12, borderRadius: 10, border: '1px solid #D3DACD' }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="card rounded-2xl p-6 md:p-7 mt-6">
          <div className="font-semibold text-[14px] mb-5 text-pine-deep">Realisasi Anggaran per Bidang {tahun}</div>
          <div className="space-y-4">
            {REALISASI_BASE.map((r) => (
              <div key={r.name}>
                <div className="flex justify-between text-[12.5px] mb-1.5">
                  <span className="text-ink font-medium">{r.name}</span>
                  <span className="font-mono text-mist">{r.realisasi}%</span>
                </div>
                <div className="progress-track h-2 rounded-full overflow-hidden">
                  <div className="progress-fill h-full rounded-full" style={{ width: `${r.realisasi}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-[11.5px] text-mist mt-4">
          Sumber: APBDes {tahun} — data ilustrasi, sesuaikan dengan dokumen resmi sebelum dipublikasikan.
        </div>
      </section>
    </>
  );
}