import { VILLAGE, IDM_DATA, IDM_TAHUN_LIST, IDM_TAHUN_MENYUSUL, IDM_SKOR_2024 } from '../data/village';

/** Format angka dengan pemisah ribuan gaya Indonesia. */
const n = (v) => v.toLocaleString('id-ID');

/** Format persentase satu angka desimal, koma sebagai pemisah desimal. */
const pct = (value, total) => (total ? ((value / total) * 100).toFixed(1).replace('.', ',') + '%' : '-');

/** Ubah satu kategori {name, value}[] menjadi tabel dengan kolom persentase. */
function tableFromCategory(sheetName, kolomPertama, data) {
  const total = data.reduce((a, b) => a + b.value, 0);
  return {
    key: sheetName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    sheetName,
    header: [kolomPertama, 'Jumlah (jiwa)', 'Persentase'],
    rows: data.map((d) => [d.name, n(d.value), pct(d.value, total)]),
    // versi angka mentah (tanpa format string) — dipakai saat menulis ke Excel
    // supaya kolom "Jumlah" tetap berupa number, bukan text.
    rawRows: data.map((d) => [d.name, d.value, pct(d.value, total)]),
  };
}

/** Menyusun tabel data desa untuk SATU tahun terpilih, bersumber dari
 *  Kuesioner IDM (lihat IDM_DATA di src/data/village.js). Dipakai bersama
 *  oleh tampilan tabel di halaman, ekspor data Excel/CSV, dan laporan
 *  Word/PDF — satu sumber kebenaran per tahun. */
export function buildDataDesaTables(year) {
  const d = IDM_DATA[year];
  if (!d) return [];
  const { ringkasan: r } = d;
  const kepadatan = r.luasWilayah ? Math.round(r.totalPenduduk / r.luasWilayah) : null;

  const ringkasan = {
    key: 'ringkasan',
    sheetName: 'Ringkasan',
    header: ['Indikator', 'Nilai'],
    rows: [
      ['Jumlah Penduduk', `${n(r.totalPenduduk)} jiwa`],
      ['Jumlah Kepala Keluarga', `${n(r.kk)} KK`],
      ['Kepala Keluarga Perempuan', `${n(r.kkPerempuan)} KK`],
      ['Keluarga Miskin', `${n(r.keluargaMiskin)} KK`],
      ['Kepadatan Penduduk', kepadatan ? `${n(kepadatan)} jiwa/km²` : '-'],
      ['Luas Wilayah', `${r.luasWilayah} km²`],
    ],
    rawRows: [
      ['Jumlah Penduduk', r.totalPenduduk],
      ['Jumlah Kepala Keluarga', r.kk],
      ['Kepala Keluarga Perempuan', r.kkPerempuan],
      ['Keluarga Miskin', r.keluargaMiskin],
      ['Kepadatan Penduduk (jiwa/km²)', kepadatan],
      ['Luas Wilayah (km²)', r.luasWilayah],
    ],
  };

  const genderTable = tableFromCategory('Jenis Kelamin', 'Jenis Kelamin', [
    { name: 'Laki-laki', value: r.lk },
    { name: 'Perempuan', value: r.pr },
  ]);
  const usiaTable = tableFromCategory('Struktur Usia', 'Kelompok Usia', d.usia);
  const pekerjaanTable = tableFromCategory('Mata Pencaharian', 'Jenis Pekerjaan', d.pekerjaan);

  return [ringkasan, genderTable, usiaTable, pekerjaanTable];
}

/** Format daftar tahun jadi label ringkas: berurutan penuh -> "2021-2024",
 *  tidak berurutan/sebagian -> "2021, 2023" (dipisah koma). */
export function formatYearsLabel(years) {
  const sorted = [...years].sort((a, b) => a - b);
  const consecutive = sorted.length > 1 && sorted.every((y, i) => i === 0 || y === sorted[i - 1] + 1);
  return consecutive ? `${sorted[0]}-${sorted[sorted.length - 1]}` : sorted.join(', ');
}

/** Tabel tren antar tahun — satu baris per indikator, satu kolom per tahun
 *  TERPILIH (bebas dipilih pengguna, tidak harus seluruh IDM_TAHUN_LIST).
 *  Dipakai untuk mode ekspor "Series". */
export function buildSeriesTables(years = IDM_TAHUN_LIST) {
  const sorted = [...years].sort((a, b) => a - b);
  const header = ['Indikator', ...sorted.map(String)];
  const metrics = [
    ['Jumlah Penduduk', (r) => r.totalPenduduk],
    ['Laki-laki', (r) => r.lk],
    ['Perempuan', (r) => r.pr],
    ['Jumlah Kepala Keluarga', (r) => r.kk],
    ['Kepala Keluarga Perempuan', (r) => r.kkPerempuan],
    ['Keluarga Miskin', (r) => r.keluargaMiskin],
    ['Luas Wilayah (km²)', (r) => r.luasWilayah],
  ];
  const rows = metrics.map(([label, get]) => [label, ...sorted.map((y) => n(get(IDM_DATA[y].ringkasan)))]);
  const rawRows = metrics.map(([label, get]) => [label, ...sorted.map((y) => get(IDM_DATA[y].ringkasan))]);

  return [
    {
      key: 'tren-antar-tahun',
      sheetName: `Tren ${formatYearsLabel(sorted)}`,
      header,
      rows,
      rawRows,
    },
  ];
}

/** Tabel skor Indeks Desa Membangun (IDM) 2024 — dimensi & sub-dimensi. */
export function buildIdmSkorTable() {
  const rows = [];
  IDM_SKOR_2024.dimensi.forEach((dim) => {
    rows.push([dim.nama, n(dim.skor)]);
    dim.sub.forEach((s) => rows.push([`— ${s.nama}`, n(s.skor)]));
  });
  rows.push(['TOTAL SKOR', n(IDM_SKOR_2024.total)]);
  return [
    {
      key: 'idm-skor-2024',
      sheetName: 'Skor IDM 2024',
      header: ['Dimensi', 'Skor'],
      rows,
      rawRows: rows,
    },
  ];
}

/** Info identitas desa dipakai di kop laporan.
 *  mode: 'tahun' (satu titik waktu) | 'series' (beberapa tahun berdampingan)
 *  seriesYears: daftar tahun terpilih saat mode === 'series' (bebas dipilih pengguna). */
export function reportMeta(mode = 'tahun', year = IDM_TAHUN_LIST[IDM_TAHUN_LIST.length - 1], seriesYears = IDM_TAHUN_LIST) {
  const tanggal = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const sortedSeriesYears = [...seriesYears].sort((a, b) => a - b);
  const periode = mode === 'series' ? `Data Tahun ${formatYearsLabel(sortedSeriesYears)}` : `Data Tahun ${year}`;
  return {
    judul: 'Laporan Data Makro Desa',
    periode,
    nama: VILLAGE.nama,
    wilayah: `${VILLAGE.kecamatan}, ${VILLAGE.kabupaten}, ${VILLAGE.provinsi}`,
    tanggal,
    catatan:
      `Data bersumber dari Kuesioner Indeks Desa Membangun (IDM) tahun ${mode === 'series' ? sortedSeriesYears.join(', ') : year}. ` +
      `Data tahun ${IDM_TAHUN_MENYUSUL} menyusul. Sesuaikan dengan hasil pemutakhiran data desa terbaru.`,
  };
}

export function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}