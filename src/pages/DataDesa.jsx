import { useEffect, useMemo, useState } from 'react';
import {
  Users, Home as HomeIcon, Building2, HandHeart, Gauge,
  FileSpreadsheet, FileText, FileType, Loader2, Square, CheckSquare,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line,
} from 'recharts';
import { VILLAGE, IDM_TAHUN_LIST, IDM_TAHUN_MENYUSUL, IDM_DATA, IDM_SKOR_2024, IDM_SUMBER } from '../data/village';
import { PageHeader, StatCard } from '../components/ui';
import DataTable from '../components/DataTable';
import { buildDataDesaTables, buildSeriesTables, buildIdmSkorTable, reportMeta, formatYearsLabel } from '../lib/reportData';
import { exportDataExcel, exportDataCsv } from '../lib/exportData';
import { exportReportWord } from '../lib/exportReport';
import { exportReportPdf } from '../lib/exportReportPdf';

const LATEST_YEAR = IDM_TAHUN_LIST[IDM_TAHUN_LIST.length - 1];
const AXIS_STYLE = { fontSize: 10, fill: '#7C8C7E' };
const TOOLTIP_STYLE = { fontSize: 12, borderRadius: 10, border: '1px solid #D3DACD' };

export default function DataDesa() {
  const [selectedYear, setSelectedYear] = useState(LATEST_YEAR);
  const [mode, setMode] = useState('tahun'); // 'tahun' | 'series'
  const [seriesYears, setSeriesYears] = useState(() => new Set(IDM_TAHUN_LIST));
  const [generating, setGenerating] = useState(null); // 'word' | 'pdf' | null

  const tahunData = IDM_DATA[selectedYear];
  const r = tahunData.ringkasan;
  const kepadatan = r.luasWilayah ? Math.round(r.totalPenduduk / r.luasWilayah) : null;

  const genderData = [
    { name: 'Laki-laki', value: r.lk },
    { name: 'Perempuan', value: r.pr },
  ];
  const keluargaData = [
    { name: 'Total KK', value: r.kk },
    { name: 'KK Perempuan', value: r.kkPerempuan },
    { name: 'Keluarga Miskin', value: r.keluargaMiskin },
  ];

  // Tren antar tahun — selalu menampilkan seluruh 2021-2024, tidak terikat selectedYear.
  const trenData = IDM_TAHUN_LIST.map((y) => ({
    tahun: String(y),
    totalPenduduk: IDM_DATA[y].ringkasan.totalPenduduk,
    keluargaMiskin: IDM_DATA[y].ringkasan.keluargaMiskin,
  }));

  // ---- Tabel & Unduhan: sumber tabel berubah mengikuti mode ekspor ----
  const seriesYearsSorted = useMemo(() => Array.from(seriesYears).sort((a, b) => a - b), [seriesYears]);

  const toggleSeriesYear = (y) => {
    setSeriesYears((prev) => {
      const next = new Set(prev);
      if (next.has(y)) next.delete(y);
      else next.add(y);
      return next;
    });
  };

  const baseTables = useMemo(() => {
    if (mode === 'series') {
      if (seriesYearsSorted.length === 0) return [];
      return buildSeriesTables(seriesYearsSorted);
    }
    const t = buildDataDesaTables(selectedYear);
    return selectedYear === 2024 ? [...t, ...buildIdmSkorTable()] : t;
  }, [mode, selectedYear, seriesYearsSorted]);

  const [selectedKeys, setSelectedKeys] = useState(() => new Set(baseTables.map((t) => t.key)));
  // Reset pilihan ke "semua tercentang" setiap kali mode/tahun ekspor berganti,
  // supaya tidak ada key tersisa dari kategori yang sudah tidak relevan.
  useEffect(() => {
    setSelectedKeys(new Set(baseTables.map((t) => t.key)));
  }, [baseTables]);

  const selectedTables = baseTables.filter((t) => selectedKeys.has(t.key));
  const seriesNoYears = mode === 'series' && seriesYearsSorted.length === 0;
  const noneSelected = selectedTables.length === 0;

  const toggleKey = (key) => {
    setSelectedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };
  const selectAll = () => setSelectedKeys(new Set(baseTables.map((t) => t.key)));
  const clearAll = () => setSelectedKeys(new Set());

  const meta = () => reportMeta(mode, selectedYear, seriesYearsSorted);

  const handleReportWord = async () => {
    setGenerating('word');
    try {
      await exportReportWord(VILLAGE.nama, selectedTables, meta());
    } finally {
      setGenerating(null);
    }
  };
  const handleReportPdf = async () => {
    setGenerating('pdf');
    try {
      await exportReportPdf(VILLAGE.nama, selectedTables, meta());
    } finally {
      setGenerating(null);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Statistik Desa"
        title="Data Makro Desa"
        description={`Data kependudukan ${VILLAGE.nama} bersumber dari Kuesioner Indeks Desa Membangun (IDM) tahun ${IDM_TAHUN_LIST[0]}–2024 dan Data Pokok Desa (Prodeskel Kemendagri) tahun 2025. Data tahun ${IDM_TAHUN_MENYUSUL} menyusul.`}
      />

      <section className="max-w-7xl mx-auto px-5 md:px-10 py-16 md:py-24">
        {/* ============ Selector tahun ============ */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-[11px] font-semibold text-mist uppercase tracking-wide mr-1">Tahun Data</span>
          {IDM_TAHUN_LIST.map((y) => (
            <button
              key={y}
              onClick={() => setSelectedYear(y)}
              data-active={selectedYear === y}
              className="chip rounded-full px-4 py-1.5 text-[13px] font-semibold font-mono"
            >
              {y}
            </button>
          ))}
          <span className="chip rounded-full px-4 py-1.5 text-[13px] font-semibold font-mono opacity-50 cursor-not-allowed">
            {IDM_TAHUN_MENYUSUL} (segera)
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Users} label="Jumlah Penduduk" value={r.totalPenduduk.toLocaleString('id-ID')} sub="jiwa" />
          <StatCard icon={HomeIcon} label="Jumlah Kepala Keluarga" value={r.kk.toLocaleString('id-ID')} sub="KK" />
          <StatCard icon={Building2} label="Kepadatan Penduduk" value={kepadatan ? kepadatan.toLocaleString('id-ID') : '-'} sub="jiwa / km²" />
          <StatCard icon={HandHeart} label="Keluarga Miskin" value={r.keluargaMiskin.toLocaleString('id-ID')} sub="KK" />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mt-8">
          <div className="card rounded-2xl p-6 md:p-7">
            <div className="font-semibold text-[14px] text-pine-deep">Penduduk Menurut Jenis Kelamin — {selectedYear}</div>
            <div style={{ width: '100%', height: 240 }} className="mt-2">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={genderData} dataKey="value" nameKey="name" innerRadius={54} outerRadius={86} paddingAngle={3}>
                    {genderData.map((_, i) => (
                      <Cell key={i} fill={['#1E4632', '#BE9756'][i]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => v.toLocaleString('id-ID') + ' jiwa'} contentStyle={TOOLTIP_STYLE} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card rounded-2xl p-6 md:p-7">
            <div className="font-semibold text-[14px] text-pine-deep">Ringkasan Keluarga — {selectedYear}</div>
            <div style={{ width: '100%', height: 240 }} className="mt-4">
              <ResponsiveContainer>
                <BarChart data={keluargaData} margin={{ top: 4, right: 8, left: -12, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D3DACD" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 10.5, fill: '#1B241C' }} axisLine={false} tickLine={false} />
                  <YAxis tick={AXIS_STYLE} axisLine={false} tickLine={false} />
                  <Tooltip formatter={(v) => v.toLocaleString('id-ID') + ' KK'} contentStyle={TOOLTIP_STYLE} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#1E4632" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card rounded-2xl p-6 md:p-7 lg:col-span-2">
            <div className="font-semibold text-[14px] text-pine-deep">Struktur Usia Penduduk — {selectedYear}</div>
            {tahunData.usia.length > 0 ? (
              <div style={{ width: '100%', height: 260 }} className="mt-4">
                <ResponsiveContainer>
                  <BarChart data={tahunData.usia} layout="vertical" margin={{ left: 8, right: 24, top: 4, bottom: 4 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#D3DACD" horizontal={false} />
                    <XAxis type="number" tick={AXIS_STYLE} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 11, fill: '#1B241C' }} axisLine={false} tickLine={false} />
                    <Tooltip formatter={(v) => v.toLocaleString('id-ID') + ' jiwa'} contentStyle={TOOLTIP_STYLE} />
                    <Bar dataKey="value" radius={[0, 6, 6, 0]} fill="#BE9756" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-[260px] mt-4 flex items-center justify-center text-center px-6">
                <p className="text-[12.5px] text-mist max-w-xs">
                  Rincian struktur usia {selectedYear} belum tersedia — data pada sumber resmi tidak konsisten
                  (jumlah kelompok usia melebihi total penduduk), sehingga tidak ditampilkan.
                </p>
              </div>
            )}
          </div>

          <div className="card rounded-2xl p-6 md:p-7 lg:col-span-2">
            <div className="font-semibold text-[14px] text-pine-deep">Mata Pencaharian Pokok — {selectedYear}</div>
            <div style={{ width: '100%', height: 260 }} className="mt-4">
              <ResponsiveContainer>
                <BarChart data={tahunData.pekerjaan} layout="vertical" margin={{ left: 8, right: 24, top: 4, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D3DACD" horizontal={false} />
                  <XAxis type="number" tick={AXIS_STYLE} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 11, fill: '#1B241C' }} axisLine={false} tickLine={false} />
                  <Tooltip formatter={(v) => v.toLocaleString('id-ID') + ' jiwa'} contentStyle={TOOLTIP_STYLE} />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]} fill="#A6552E" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="text-[11.5px] text-mist mt-5">
          Sumber: {IDM_SUMBER[selectedYear]} ({selectedYear}) — sesuaikan dengan hasil pemutakhiran data desa terbaru.
        </div>

        {/* ============ Tren Antar Tahun ============ */}
        <div className="mt-16">
          <h2 className="font-display text-2xl font-semibold text-pine-deep">
            Tren Antar Tahun ({IDM_TAHUN_LIST[0]}–{LATEST_YEAR})
          </h2>
          <p className="text-[13px] text-mist mt-1 max-w-lg">
            Perkembangan indikator utama desa dari tahun ke tahun berdasarkan kuesioner IDM.
          </p>

          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            <div className="card rounded-2xl p-6 md:p-7">
              <div className="font-semibold text-[14px] text-pine-deep">Jumlah Penduduk</div>
              <div style={{ width: '100%', height: 220 }} className="mt-4">
                <ResponsiveContainer>
                  <LineChart data={trenData} margin={{ top: 4, right: 16, left: -12, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#D3DACD" vertical={false} />
                    <XAxis dataKey="tahun" tick={{ fontSize: 11, fill: '#1B241C' }} axisLine={false} tickLine={false} />
                    <YAxis tick={AXIS_STYLE} axisLine={false} tickLine={false} domain={['dataMin - 20', 'dataMax + 20']} />
                    <Tooltip formatter={(v) => v.toLocaleString('id-ID') + ' jiwa'} contentStyle={TOOLTIP_STYLE} />
                    <Line type="monotone" dataKey="totalPenduduk" stroke="#1E4632" strokeWidth={2.5} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card rounded-2xl p-6 md:p-7">
              <div className="font-semibold text-[14px] text-pine-deep">Keluarga Miskin</div>
              <div style={{ width: '100%', height: 220 }} className="mt-4">
                <ResponsiveContainer>
                  <LineChart data={trenData} margin={{ top: 4, right: 16, left: -12, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#D3DACD" vertical={false} />
                    <XAxis dataKey="tahun" tick={{ fontSize: 11, fill: '#1B241C' }} axisLine={false} tickLine={false} />
                    <YAxis tick={AXIS_STYLE} axisLine={false} tickLine={false} />
                    <Tooltip formatter={(v) => v.toLocaleString('id-ID') + ' KK'} contentStyle={TOOLTIP_STYLE} />
                    <Line type="monotone" dataKey="keluargaMiskin" stroke="#A6552E" strokeWidth={2.5} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="text-[11.5px] text-mist mt-4">
            Catatan: sebagian angka tahun berdekatan identik pada kuesioner sumber (indikasi data belum sempat
            dimutakhirkan petugas lapangan pada tahun tersebut) — ditampilkan apa adanya sesuai isian resmi.
          </div>
        </div>

        {/* ============ Skor IDM 2024 ============ */}
        <div className="mt-16">
          <h2 className="font-display text-2xl font-semibold text-pine-deep">Indeks Desa Membangun (IDM) 2024</h2>
          <p className="text-[13px] text-mist mt-1 max-w-lg">
            Rubrik skor per dimensi baru tersedia mulai kuesioner tahun 2024. Data {IDM_TAHUN_MENYUSUL} menyusul.
          </p>

          <div className="grid lg:grid-cols-3 gap-6 mt-6">
            <div className="card rounded-2xl p-6 md:p-7 lg:col-span-2">
              <div className="font-semibold text-[14px] text-pine-deep">Skor per Dimensi</div>
              <div style={{ width: '100%', height: 280 }} className="mt-4">
                <ResponsiveContainer>
                  <BarChart data={IDM_SKOR_2024.dimensi} layout="vertical" margin={{ left: 8, right: 24, top: 4, bottom: 4 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#D3DACD" horizontal={false} />
                    <XAxis type="number" tick={AXIS_STYLE} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="nama" width={170} tick={{ fontSize: 11, fill: '#1B241C' }} axisLine={false} tickLine={false} />
                    <Tooltip formatter={(v) => v.toLocaleString('id-ID') + ' poin'} contentStyle={TOOLTIP_STYLE} />
                    <Bar dataKey="skor" radius={[0, 6, 6, 0]} fill="#2F5C43" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <StatCard icon={Gauge} label="Total Skor IDM 2024" value={IDM_SKOR_2024.total.toLocaleString('id-ID')} sub="dari 6 dimensi penilaian" />
          </div>
        </div>

        {/* ============ Tabel & Unduhan ============ */}
        <div className="mt-16">
          <div className="mb-6">
            <h2 className="font-display text-2xl font-semibold text-pine-deep">Tabel & Unduhan</h2>
            <p className="text-[13px] text-mist mt-1 max-w-lg">
              Salin langsung tiap tabel, atau unduh datanya sebagai berkas Excel/CSV. Butuh laporan siap cetak?
              Unduh dalam format Word atau PDF — pilih satu tahun atau seluruh tahun sekaligus (series).
            </p>
          </div>

          <div className="card rounded-2xl p-5 mb-6">
            {/* mode ekspor: satu tahun vs series */}
            <div className="flex flex-wrap items-center gap-2 mb-4 pb-4 border-b border-mist-soft">
              <span className="text-[11px] font-semibold text-mist uppercase tracking-wide mr-1">Cakupan Laporan</span>
              <button
                onClick={() => setMode('tahun')}
                data-active={mode === 'tahun'}
                className="chip rounded-full px-4 py-1.5 text-[12.5px] font-medium"
              >
                Satu Tahun ({selectedYear})
              </button>
              <button
                onClick={() => setMode('series')}
                data-active={mode === 'series'}
                className="chip rounded-full px-4 py-1.5 text-[12.5px] font-medium"
              >
                Series {seriesYearsSorted.length > 0 ? `(${formatYearsLabel(seriesYearsSorted)})` : ''}
              </button>
              {mode === 'tahun' && (
                <span className="text-[11.5px] text-mist ml-1">
                  Memakai tahun yang dipilih di bagian atas halaman ini.
                </span>
              )}
            </div>

            {mode === 'series' && (
              <div className="flex flex-wrap items-center gap-2 mb-4 pb-4 border-b border-mist-soft">
                <span className="text-[11px] font-semibold text-mist uppercase tracking-wide mr-1">
                  Pilih Tahun untuk Series
                </span>
                {IDM_TAHUN_LIST.map((y) => {
                  const active = seriesYears.has(y);
                  return (
                    <button
                      key={y}
                      onClick={() => toggleSeriesYear(y)}
                      data-active={active}
                      aria-pressed={active}
                      className="chip rounded-full pl-2.5 pr-3.5 py-1.5 text-[12.5px] font-medium font-mono inline-flex items-center gap-1.5"
                    >
                      {active ? <CheckSquare size={14} /> : <Square size={14} />}
                      {y}
                    </button>
                  );
                })}
                <span className="text-[11.5px] text-mist ml-1">
                  Bebas pilih satu atau lebih — tabel & laporan hanya memuat tahun yang dicentang.
                </span>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <span className="text-[11px] font-semibold text-mist uppercase tracking-wide">
                Pilih data untuk diekspor ({selectedTables.length}/{baseTables.length})
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

            {seriesNoYears ? (
              <p className="text-[12.5px] text-clay mb-5">Pilih minimal satu tahun di atas untuk membentuk series.</p>
            ) : (
              <div className="flex flex-wrap gap-2 mb-5">
                {baseTables.map((t) => {
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
            )}

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

            {noneSelected && !seriesNoYears && (
              <p className="text-[12px] text-clay mt-3">Pilih minimal satu data terlebih dahulu untuk mengekspor.</p>
            )}
          </div>

          <div className="grid gap-5">
            {baseTables.map((t) => (
              <DataTable key={t.key} title={t.sheetName} header={t.header} rows={t.rows} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}