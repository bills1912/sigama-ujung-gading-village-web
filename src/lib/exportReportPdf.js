import { downloadBlob } from './download';
import { buildDataDesaTables, reportMeta, slugify } from './reportData';

// Palet warna yang sama seperti di website (lihat @theme di src/index.css),
// dalam bentuk RGB (0-255) karena itu format yang diterima jsPDF/autoTable.
const RGB = {
  pine: [30, 70, 50],
  pineDeep: [15, 42, 30],
  gold: [190, 151, 86],
  goldInk: [140, 109, 34],
  mist: [124, 140, 126],
  mistSoft: [211, 218, 205],
  paperSoft: [231, 235, 225],
  ink: [27, 36, 28],
  white: [255, 255, 255],
};

// Font standar (Helvetica) bawaan jsPDF tidak mendukung sebagian karakter
// Unicode seperti "²" — karakter itu hilang begitu saja saat dirender,
// bukan diganti tanda lain. Jadi khusus untuk keluaran PDF, gantikan dengan
// padanan ASCII-nya. Data aslinya (reportData.js) tidak disentuh — tabel di
// halaman, Word, dan Excel tetap menampilkan "²" dengan normal karena
// keduanya pakai font yang mendukung Unicode penuh.
const pdfSafe = (value) =>
  String(value)
    .replace(/²/g, '2')
    .replace(/³/g, '3');

const pdfSafeRow = (row) => row.map(pdfSafe);

/** Menyusun dokumen jsPDF untuk laporan data desa. Fungsi murni (belum
 *  diunduh) — `jsPDF` dan `autoTable` dioper sebagai parameter supaya
 *  pemanggil di browser bebas memuat kedua library ini secara lazy
 *  (dynamic import), karena cukup besar dan hanya dibutuhkan saat tombol
 *  "Unduh Laporan (PDF)" benar-benar diklik. */
export function buildReportPdf({ jsPDF, autoTable }, tables = buildDataDesaTables(), meta = reportMeta()) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 42;

  // ---- kop laporan ----
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...RGB.pine);
  doc.text(pdfSafe(meta.judul.toUpperCase()), pageWidth / 2, 52, { align: 'center' });

  doc.setFontSize(22);
  doc.setTextColor(...RGB.pineDeep);
  doc.text(pdfSafe(meta.nama), pageWidth / 2, 76, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...RGB.mist);
  doc.text(pdfSafe(meta.wilayah), pageWidth / 2, 94, { align: 'center' });

  doc.setFont('helvetica', 'italic');
  doc.text(pdfSafe(`Dicetak pada ${meta.tanggal}`), pageWidth / 2, 108, { align: 'center' });

  doc.setDrawColor(...RGB.gold);
  doc.setLineWidth(1.2);
  doc.line(margin, 122, pageWidth - margin, 122);

  let cursorY = 148;
  const bottomLimit = pageHeight - 90;

  tables.forEach((t) => {
    if (cursorY > bottomLimit) {
      doc.addPage();
      cursorY = 56;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...RGB.pine);
    doc.text(pdfSafe(t.sheetName), margin, cursorY);

    autoTable(doc, {
      head: [pdfSafeRow(t.header)],
      body: t.rows.map(pdfSafeRow),
      startY: cursorY + 10,
      margin: { left: margin, right: margin },
      theme: 'plain',
      styles: {
        font: 'helvetica',
        fontSize: 9,
        textColor: RGB.ink,
        lineColor: RGB.mistSoft,
        lineWidth: 0.6,
        cellPadding: 6,
      },
      headStyles: { fillColor: RGB.pine, textColor: RGB.white, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: RGB.paperSoft },
    });

    cursorY = doc.lastAutoTable.finalY + 30;
  });

  if (cursorY > bottomLimit) {
    doc.addPage();
    cursorY = 56;
  }
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...RGB.goldInk);
  doc.text('Catatan', margin, cursorY);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(...RGB.mist);
  doc.text(doc.splitTextToSize(pdfSafe(meta.catatan), pageWidth - margin * 2), margin, cursorY + 14);

  // ---- footer nomor halaman di setiap halaman ----
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...RGB.mist);
    doc.text(`Halaman ${i} dari ${totalPages}`, pageWidth / 2, pageHeight - 26, { align: 'center' });
  }

  return doc;
}

/** Unduh laporan-data-desa-*.pdf (browser only). `jspdf` dan
 *  `jspdf-autotable` baru dimuat saat fungsi ini dipanggil (dynamic import). */
export async function exportReportPdf(villageName, tables = buildDataDesaTables(), meta = reportMeta()) {
  const [{ jsPDF }, autoTableModule] = await Promise.all([import('jspdf'), import('jspdf-autotable')]);
  const autoTable = autoTableModule.default;
  const doc = buildReportPdf({ jsPDF, autoTable }, tables, meta);
  downloadBlob(doc.output('blob'), `laporan-data-desa-${slugify(villageName)}.pdf`);
}
