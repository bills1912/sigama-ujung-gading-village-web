import { useState } from 'react';
import {
  Hammer, BadgeCheck, FileCheck, CalendarClock, Clock, MapPinned, ShieldCheck, Download,
  FileSpreadsheet, FileText, FileType, Loader2, CheckCircle2,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { VILLAGE, BSPS_PROGRAM } from '../data/village';
import { PageHeader, StatCard } from '../components/ui';
import DataTable from '../components/DataTable';
import { buildBspsTables } from '../lib/reportData';
import { exportDataExcel, exportDataCsv } from '../lib/exportData';
import { exportReportWord } from '../lib/exportReport';
import { exportReportPdf } from '../lib/exportReportPdf';

const AXIS_STYLE = { fontSize: 10, fill: '#7C8C7E' };
const TOOLTIP_STYLE = { fontSize: 12, borderRadius: 10, border: '1px solid #D3DACD' };

export default function Bsps() {
  const [generating, setGenerating] = useState(null); // 'word' | 'pdf' | null
  const tables = buildBspsTables();
  const s = BSPS_PROGRAM.surat;
  const namaLaporan = `${VILLAGE.nama} — Usulan BSPS`;

  const meta = {
    judul: 'Laporan Data Usulan BSPS',
    periode: 'Usulan Tahun Anggaran 2026',
    nama: VILLAGE.nama,
    wilayah: `${VILLAGE.kecamatan}, ${VILLAGE.kabupaten}, ${VILLAGE.provinsi}`,
    tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    catatan:
      `Data bersumber dari Surat Undangan ${s.instansi} Nomor ${s.nomor} tanggal ${s.tanggal}. ` +
      'Data bersifat agregat — nama, NIK, dan Nomor KK calon penerima tidak dipublikasikan untuk melindungi privasi warga.',
  };

  const handleWord = async () => {
    setGenerating('word');
    try {
      await exportReportWord(namaLaporan, tables, meta);
    } finally {
      setGenerating(null);
    }
  };
  const handlePdf = async () => {
    setGenerating('pdf');
    try {
      await exportReportPdf(namaLaporan, tables, meta);
    } finally {
      setGenerating(null);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Program Kolaborasi"
        title="Desa Cantik & Program Bedah Rumah (BSPS)"
        description={`Kolaborasi semangat Desa Cinta Statistik (Desa Cantik) dengan Program Bedah Rumah — Bantuan Stimulan Perumahan Swadaya (BSPS) yang melibatkan ${VILLAGE.nama}.`}
      />

      <section className="max-w-7xl mx-auto px-5 md:px-10 py-16 md:py-24">
        {/* ============ Tentang Program ============ */}
        <div>
          <h2 className="font-display text-2xl font-semibold text-pine-deep">Tentang Program</h2>
          <div className="grid md:grid-cols-2 gap-5 mt-6">
            <div className="card rounded-2xl p-6 md:p-7">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-pine/10 mb-4">
                <Hammer size={20} className="text-pine" strokeWidth={1.8} />
              </div>
              <div className="font-semibold text-[15px] text-pine-deep mb-2">Apa itu BSPS?</div>
              <p className="text-[13px] text-mist leading-relaxed">{BSPS_PROGRAM.tentang.bsps}</p>
            </div>
            <div className="card rounded-2xl p-6 md:p-7">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-gold/15 mb-4">
                <BadgeCheck size={20} className="text-gold-ink" strokeWidth={1.8} />
              </div>
              <div className="font-semibold text-[15px] text-pine-deep mb-2">Apa itu Desa Cantik?</div>
              <p className="text-[13px] text-mist leading-relaxed">{BSPS_PROGRAM.tentang.desaCantik}</p>
            </div>
          </div>
          <div className="rounded-2xl p-6 md:p-7 mt-5 bg-paper-soft border border-mist-soft">
            <p className="text-[13px] text-ink leading-relaxed">{BSPS_PROGRAM.tentang.kolaborasi}</p>
          </div>
        </div>

        {/* ============ Dasar & Jadwal Kegiatan ============ */}
        <div className="mt-16">
          <h2 className="font-display text-2xl font-semibold text-pine-deep">Dasar & Jadwal Kegiatan</h2>
          <p className="text-[13px] text-mist mt-1 max-w-2xl">
            Rincian surat resmi yang menjadi dasar kegiatan ini, sebagaimana diterima Pemerintah{' '}
            {VILLAGE.nama}.
          </p>

          <div className="card rounded-2xl p-6 md:p-7 mt-6">
            <div className="flex items-start gap-3.5 pb-5 mb-5 border-b border-mist-soft">
              <div className="rounded-xl p-2.5 shrink-0 bg-pine/10">
                <FileCheck size={18} className="text-pine" strokeWidth={1.8} />
              </div>
              <div>
                <div className="font-semibold text-[14px] text-pine-deep">
                  Surat Undangan Nomor <span className="font-mono">{s.nomor}</span>
                </div>
                <div className="text-[12px] text-mist mt-1">
                  {s.instansi} · {s.tempatTerbit}, {s.tanggal}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-4 pb-5 mb-5 border-b border-mist-soft">
              <div>
                <div className="text-[10.5px] text-mist uppercase tracking-wide mb-1">Sifat</div>
                <div className="text-[13px] text-ink font-medium">{s.sifat}</div>
              </div>
              <div>
                <div className="text-[10.5px] text-mist uppercase tracking-wide mb-1">Lampiran</div>
                <div className="text-[13px] text-ink font-medium">{s.lampiran}</div>
              </div>
              <div>
                <div className="text-[10.5px] text-mist uppercase tracking-wide mb-1">Hal</div>
                <div className="text-[13px] text-ink font-medium">{s.hal}</div>
              </div>
              <div>
                <div className="text-[10.5px] text-mist uppercase tracking-wide mb-1">Dasar</div>
                <div className="text-[13px] text-ink font-medium">SPT No. 41/SPT/FAS.DS/Rb2.7/2026</div>
              </div>
            </div>

            <div className="text-[12.5px] text-mist mb-1">Perihal</div>
            <p className="text-[13.5px] text-ink italic leading-relaxed mb-5">&ldquo;{s.perihal}&rdquo;</p>

            <div className="text-[12.5px] text-mist mb-1">Ditandatangani oleh</div>
            <p className="text-[13.5px] text-ink leading-relaxed">
              <strong>{s.penandatangan.nama}</strong> — {s.penandatangan.jabatan}
              <br />
              <span className="font-mono text-mist text-[12px]">NIP. {s.penandatangan.nip}</span>
            </p>

            <a
              href="/surat-undangan-bsps-005-1078-2026.pdf"
              download
              className="btn-pine inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] mt-5"
            >
              <Download size={15} /> Unduh Surat Undangan (PDF)
            </a>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mt-5">
            <StatCard icon={CalendarClock} label="Hari / Tanggal Rapat" value={s.rapat.hari} />
            <StatCard icon={Clock} label="Waktu" value={s.rapat.waktu} />
            <StatCard icon={MapPinned} label="Tempat" value={s.rapat.tempat} />
          </div>
        </div>

        {/* ============ Konfirmasi Keikutsertaan Desa ============ */}
        <div className="mt-16">
          <h2 className="font-display text-2xl font-semibold text-pine-deep">Konfirmasi Keikutsertaan Desa</h2>
          <p className="text-[13px] text-mist mt-1 max-w-2xl leading-relaxed">
            Pada lampiran Daftar Undangan surat tersebut,{' '}
            <strong className="text-ink">
              {VILLAGE.nama} tercantum sebagai desa ke-{s.urutanLampiran} dari {s.totalDesaUndangan} desa
            </strong>{' '}
            yang diundang dalam Rapat Pembahasan Hasil Usulan BSPS Kabupaten Padang Lawas Utara — mengonfirmasi
            keikutsertaan desa dalam program ini.
          </p>

          <div className="card rounded-2xl overflow-hidden mt-6">
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]" style={{ tableLayout: 'fixed' }}>
                <colgroup>
                  <col style={{ width: '64px' }} />
                  <col style={{ width: '58%' }} />
                  <col />
                </colgroup>
                <thead>
                  <tr className="bg-paper-soft">
                    <th className="text-left font-semibold text-pine-deep px-6 py-4 text-[11px] uppercase tracking-wide">No.</th>
                    <th className="text-left font-semibold text-pine-deep px-3 py-4 text-[11px] uppercase tracking-wide">Desa</th>
                    <th className="text-left font-semibold text-pine-deep px-6 py-4 text-[11px] uppercase tracking-wide">Kecamatan</th>
                  </tr>
                </thead>
                <tbody>
                  {BSPS_PROGRAM.daftarUndangan.map((d, i) => (
                    <tr key={d.desa} className={d.kita ? 'bg-gold-soft/30' : i % 2 === 1 ? 'bg-paper-soft/40' : ''}>
                      <td className="px-6 py-5 font-mono text-mist text-[12px] border-t border-mist-soft/70 align-top">
                        {i + 1}.
                      </td>
                      <td className="px-3 py-5 font-medium text-ink border-t border-mist-soft/70 align-top">
                        {d.desa}
                        {d.kita && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-pine text-white text-[9.5px] font-semibold px-2 py-0.5 ml-2.5 whitespace-nowrap">
                            <CheckCircle2 size={9.5} /> Desa Kita
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-5 text-mist border-t border-mist-soft/70 align-top">
                        Kecamatan {d.kecamatan}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ============ Data Makro Usulan BSPS ============ */}
        <div className="mt-16">
          <h2 className="font-display text-2xl font-semibold text-pine-deep">Data Makro Usulan BSPS</h2>
          <p className="text-[13px] text-mist mt-1 max-w-2xl leading-relaxed">
            Ringkasan statistik dari daftar usulan calon penerima BSPS {VILLAGE.nama}.
          </p>

          <div className="grid lg:grid-cols-3 gap-6 mt-6">
            <div className="card rounded-2xl p-6 md:p-7 lg:col-span-2">
              <div className="font-semibold text-[14px] text-pine-deep">Sebaran Desil Perumahan</div>
              <div style={{ width: '100%', height: 260 }} className="mt-4">
                <ResponsiveContainer>
                  <BarChart data={BSPS_PROGRAM.desil} layout="vertical" margin={{ left: 8, right: 24, top: 4, bottom: 4 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#D3DACD" horizontal={false} />
                    <XAxis type="number" tick={AXIS_STYLE} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="name" width={190} tick={{ fontSize: 10.5, fill: '#1B241C' }} axisLine={false} tickLine={false} />
                    <Tooltip formatter={(v) => v.toLocaleString('id-ID') + ' orang'} contentStyle={TOOLTIP_STYLE} />
                    <Bar dataKey="value" radius={[0, 6, 6, 0]} fill="#8C6D22" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <StatCard
              icon={Hammer}
              label="Calon Penerima BSPS"
              value={BSPS_PROGRAM.ringkasan.calonPenerima.toLocaleString('id-ID')}
              sub={`${BSPS_PROGRAM.ringkasan.lakiLaki} L · ${BSPS_PROGRAM.ringkasan.perempuan} P`}
            />
          </div>

          <div className="flex items-start gap-2.5 mt-5 mb-8 text-[12px] text-mist max-w-2xl">
            <ShieldCheck size={15} className="shrink-0 mt-0.5 text-pine" />
            <span>
              Data ditampilkan dalam bentuk agregat/ringkasan saja. Nama, NIK, dan Nomor KK setiap calon penerima
              tidak dipublikasikan di website ini demi melindungi privasi warga.
            </span>
          </div>

          <div className="card rounded-2xl p-5 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-[11px] font-semibold text-mist uppercase tracking-wide">Salin & Unduh Data</span>
              <div className="flex flex-wrap gap-2.5">
                <div className="flex items-center gap-1 rounded-full border border-mist-soft bg-white p-1">
                  <span className="pl-2.5 pr-1 text-[10.5px] font-semibold text-mist uppercase tracking-wide">Data</span>
                  <button
                    onClick={() => exportDataExcel(namaLaporan, tables)}
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-semibold text-pine hover:bg-paper-soft transition-colors"
                  >
                    <FileSpreadsheet size={13} /> Excel
                  </button>
                  <button
                    onClick={() => exportDataCsv(namaLaporan, tables)}
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-semibold text-pine hover:bg-paper-soft transition-colors"
                  >
                    <FileText size={13} /> CSV
                  </button>
                </div>
                <div className="flex items-center gap-1 rounded-full border border-mist-soft bg-white p-1">
                  <span className="pl-2.5 pr-1 text-[10.5px] font-semibold text-mist uppercase tracking-wide">Laporan</span>
                  <button
                    onClick={handleWord}
                    disabled={generating === 'word'}
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-semibold text-pine hover:bg-paper-soft transition-colors disabled:opacity-40"
                  >
                    {generating === 'word' ? <Loader2 size={13} className="animate-spin" /> : <FileText size={13} />}
                    Word
                  </button>
                  <button
                    onClick={handlePdf}
                    disabled={generating === 'pdf'}
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-semibold text-pine hover:bg-paper-soft transition-colors disabled:opacity-40"
                  >
                    {generating === 'pdf' ? <Loader2 size={13} className="animate-spin" /> : <FileType size={13} />}
                    PDF
                  </button>
                </div>
              </div>
            </div>
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