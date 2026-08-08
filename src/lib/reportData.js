import { VILLAGE, DEMOGRAFI } from '../data/village';

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

/** Menyusun seluruh tabel data desa (dipakai bersama oleh tampilan tabel di
 *  halaman, ekspor data Excel/CSV, dan laporan Word/Excel). Satu sumber
 *  kebenaran — kalau DEMOGRAFI berubah, semua ikut berubah otomatis. */
export function buildDataDesaTables() {
  const ringkasan = {
    key: 'ringkasan',
    sheetName: 'Ringkasan',
    header: ['Indikator', 'Nilai'],
    rows: [
      ['Jumlah Penduduk', `${n(VILLAGE.stats.penduduk)} jiwa`],
      ['Jumlah Kepala Keluarga', `${n(DEMOGRAFI.ringkasan.kk)} KK`],
      ['Kepadatan Penduduk', `${n(DEMOGRAFI.ringkasan.kepadatan)} jiwa/km²`],
      ['Luas Wilayah', `${VILLAGE.stats.luas} km²`],
      ['Jumlah Dusun', `${VILLAGE.stats.dusun} dusun`],
      ['Jumlah Rukun Tetangga (RT)', `${DEMOGRAFI.ringkasan.rt} RT`],
    ],
    rawRows: [
      ['Jumlah Penduduk', VILLAGE.stats.penduduk],
      ['Jumlah Kepala Keluarga', DEMOGRAFI.ringkasan.kk],
      ['Kepadatan Penduduk (jiwa/km²)', DEMOGRAFI.ringkasan.kepadatan],
      ['Luas Wilayah (km²)', VILLAGE.stats.luas],
      ['Jumlah Dusun', VILLAGE.stats.dusun],
      ['Jumlah Rukun Tetangga (RT)', DEMOGRAFI.ringkasan.rt],
    ],
  };

  const genderTable = tableFromCategory('Jenis Kelamin', 'Jenis Kelamin', DEMOGRAFI.gender);
  const dusunTable = tableFromCategory('Penduduk per Dusun', 'Dusun', DEMOGRAFI.dusun);
  const pendidikanTable = tableFromCategory('Tingkat Pendidikan', 'Tingkat Pendidikan', DEMOGRAFI.pendidikan);
  const mataPencaharianTable = tableFromCategory('Mata Pencaharian', 'Jenis Pekerjaan', DEMOGRAFI.mataPencaharian);

  return [ringkasan, genderTable, dusunTable, pendidikanTable, mataPencaharianTable];
}

/** Info identitas desa dipakai di kop laporan. */
export function reportMeta() {
  const tanggal = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return {
    judul: 'Laporan Data Makro Desa',
    nama: VILLAGE.nama,
    wilayah: `${VILLAGE.kecamatan}, ${VILLAGE.kabupaten}, ${VILLAGE.provinsi}`,
    tanggal,
    catatan:
      'Data pada laporan ini bersifat ilustrasi dan perlu disesuaikan dengan hasil pemutakhiran data desa (DTSEN/Profil Desa) terbaru.',
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
