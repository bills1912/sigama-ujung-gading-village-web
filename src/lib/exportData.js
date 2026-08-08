import { downloadBlob } from './download';
import { buildDataDesaTables, slugify } from './reportData';

/** Satu sheet Excel dari satu tabel. Pakai rawRows (angka asli) supaya kolom
 *  angka tetap berupa number di Excel, bukan text — biar bisa langsung
 *  dihitung/di-SUM oleh penggunanya. `XLSX` dioper sebagai parameter (bukan
 *  di-import statis di atas) supaya pemanggilnya bebas memuat library ini
 *  secara lazy dan tidak membengkakkan bundle halaman Data Desa. */
export function sheetFromTable(XLSX, table) {
  const rows = table.rawRows || table.rows;
  const aoa = [table.header, ...rows];
  const ws = XLSX.utils.aoa_to_sheet(aoa);
  ws['!cols'] = table.header.map((h, i) => {
    const lens = [String(h).length, ...rows.map((r) => String(r[i] ?? '').length)];
    return { wch: Math.min(Math.max(...lens) + 2, 40) };
  });
  return ws;
}

/** Susun workbook multi-sheet (satu sheet per kategori data). Fungsi murni —
 *  tidak menyentuh DOM, aman dipakai di luar browser (mis. untuk pengujian). */
export function buildDataWorkbook(XLSX, tables = buildDataDesaTables()) {
  const wb = XLSX.utils.book_new();
  tables.forEach((t) => {
    XLSX.utils.book_append_sheet(wb, sheetFromTable(XLSX, t), t.sheetName.slice(0, 31));
  });
  return wb;
}

function csvEscape(value) {
  const s = String(value ?? '');
  if (/[",\n\r]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}

/** Gabungkan seluruh tabel jadi satu teks CSV, dipisah per bagian dengan
 *  baris judul kategori + baris kosong. Fungsi murni, tanpa dependensi
 *  library apa pun (CSV cukup string biasa). */
export function buildDataCsv(tables = buildDataDesaTables()) {
  const lines = [];
  tables.forEach((t, i) => {
    if (i > 0) lines.push('');
    lines.push(csvEscape(t.sheetName));
    lines.push(t.header.map(csvEscape).join(','));
    t.rows.forEach((r) => lines.push(r.map(csvEscape).join(',')));
  });
  return lines.join('\r\n');
}

/** Unduh data-desa-*.xlsx berisi seluruh kategori sebagai sheet terpisah.
 *  `xlsx` baru dimuat (dynamic import) saat fungsi ini benar-benar dipanggil. */
export async function exportDataExcel(villageName, tables = buildDataDesaTables()) {
  const XLSX = await import('xlsx');
  const wb = buildDataWorkbook(XLSX, tables);
  const buf = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });
  downloadBlob(
    new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
    `data-desa-${slugify(villageName)}.xlsx`
  );
}

/** Unduh data-desa-*.csv berisi seluruh kategori dalam satu berkas
 *  (dipisah per bagian). Diberi BOM UTF-8 supaya Excel membaca karakter
 *  seperti "²" dengan benar, bukan menampilkan karakter rusak. Tidak
 *  memerlukan library apa pun, jadi tidak async. */
export function exportDataCsv(villageName, tables = buildDataDesaTables()) {
  const csv = '\uFEFF' + buildDataCsv(tables);
  downloadBlob(csv, `data-desa-${slugify(villageName)}.csv`, 'text/csv;charset=utf-8;');
}
