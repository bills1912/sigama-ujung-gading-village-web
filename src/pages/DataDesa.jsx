import { useState } from 'react';
import {
  Users, Home as HomeIcon, Building2, ScrollText, FileSpreadsheet, FileText, FileType, Loader2,
  Square, CheckSquare,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { VILLAGE, DEMOGRAFI } from '../data/village';
import { PageHeader, StatCard } from '../components/ui';
import DataTable from '../components/DataTable';
import { buildDataDesaTables } from '../lib/reportData';
import { exportDataExcel, exportDataCsv } from '../lib/exportData';
import { exportReportWord } from '../lib/exportReport';
import { exportReportPdf } from '../lib/exportReportPdf';

export default function DataDesa() {
  const [generating, setGenerating] = useState(null); // 'word' | 'pdf' | null
  const tables = buildDataDesaTables();

  // Data mana saja yang disertakan saat ekspor/laporan — defaultnya semua
  // tercentang, pengguna bebas menyisakan salah satu atau beberapa saja
  // (mis. hanya untuk profil desa ringkas).
  const [selectedKeys, setSelectedKeys] = useState(() => new Set(tables.map((t) => t.key)));
  const selectedTables = tables.filter((t) => selectedKeys.has(t.key));
  const noneSelected = selectedTables.length === 0;

  const toggleKey = (key) => {
    setSelectedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };
  const selectAll = () => setSelectedKeys(new Set(tables.map((t) => t.key)));
  const clearAll = () => setSelectedKeys(new Set());

  const handleReportWord = async () => {
    setGenerating('word');
    try {
      await exportReportWord(VILLAGE.nama, selectedTables);
    } finally {
      setGenerating(null);
    }
  };

  const handleReportPdf = async () => {
    setGenerating('pdf');
    try {
      await exportReportPdf(VILLAGE.nama, selectedTables);
    } finally {
      setGenerating(null);
    }
  };

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

        {/* ============ Tabel & Unduhan ============ */}
        <div className="mt-16">
          <div className="mb-6">
            <h2 className="font-display text-2xl font-semibold text-pine-deep">Tabel & Unduhan</h2>
            <p className="text-[13px] text-mist mt-1 max-w-lg">
              Salin langsung tiap tabel, atau unduh datanya sebagai berkas Excel/CSV. Butuh laporan siap cetak?
              Unduh dalam format Word atau PDF.
            </p>
          </div>

          <div className="card rounded-2xl p-5 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <span className="text-[11px] font-semibold text-mist uppercase tracking-wide">
                Pilih data untuk diekspor ({selectedTables.length}/{tables.length})
              </span>
              <div className="flex gap-4 text-[12px] font-semibold text-pine">
                <button onClick={selectAll} className="hover:text-pine-deep transition-colors">
                  Pilih semua
                </button>
                <button onClick={clearAll} className="hover:text-pine-deep transition-colors">
                  Kosongkan
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              {tables.map((t) => {
                const active = selectedKeys.has(t.key);
                return (
                  <button
                    key={t.key}
                    onClick={() => toggleKey(t.key)}
                    data-active={active}
                    aria-pressed={active}
                    className="chip rounded-full pl-2.5 pr-3.5 py-1.5 text-[12.5px] font-medium inline-flex items-center gap-1.5"
                  >
                    {active ? <CheckSquare size={14} /> : <Square size={14} />}
                    {t.sheetName}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-2.5">
              <div className="flex items-center gap-1 rounded-full border border-mist-soft bg-white p-1">
                <span className="pl-2.5 pr-1 text-[10.5px] font-semibold text-mist uppercase tracking-wide">
                  Data
                </span>
                <button
                  onClick={() => exportDataExcel(VILLAGE.nama, selectedTables)}
                  disabled={noneSelected}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-semibold text-pine hover:bg-paper-soft transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                >
                  <FileSpreadsheet size={13} /> Excel
                </button>
                <button
                  onClick={() => exportDataCsv(VILLAGE.nama, selectedTables)}
                  disabled={noneSelected}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-semibold text-pine hover:bg-paper-soft transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                >
                  <FileText size={13} /> CSV
                </button>
              </div>

              <div className="flex items-center gap-1 rounded-full border border-mist-soft bg-white p-1">
                <span className="pl-2.5 pr-1 text-[10.5px] font-semibold text-mist uppercase tracking-wide">
                  Laporan
                </span>
                <button
                  onClick={handleReportWord}
                  disabled={noneSelected || generating === 'word'}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-semibold text-pine hover:bg-paper-soft transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                >
                  {generating === 'word' ? <Loader2 size={13} className="animate-spin" /> : <FileText size={13} />}
                  Word
                </button>
                <button
                  onClick={handleReportPdf}
                  disabled={noneSelected || generating === 'pdf'}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-semibold text-pine hover:bg-paper-soft transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                >
                  {generating === 'pdf' ? <Loader2 size={13} className="animate-spin" /> : <FileType size={13} />}
                  PDF
                </button>
              </div>
            </div>

            {noneSelected && (
              <p className="text-[12px] text-clay mt-3">Pilih minimal satu data terlebih dahulu untuk mengekspor.</p>
            )}
          </div>

          <div className="grid gap-5">
            {tables.map((t) => (
              <DataTable key={t.key} title={t.sheetName} header={t.header} rows={t.rows} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}