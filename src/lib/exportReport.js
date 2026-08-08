import { downloadBlob } from './download';
import { reportMeta, slugify } from './reportData';

// Palet warna yang sama seperti di website (lihat @theme di src/index.css)
// supaya laporan yang diunduh terasa satu identitas dengan situsnya.
const COLOR = {
  pine: '1E4632',
  pineDeep: '0F2A1E',
  gold: 'BE9756',
  goldInk: '8C6D22',
  mist: '7C8C7E',
  mistSoft: 'D3DACD',
  paperSoft: 'E7EBE1',
  ink: '1B241C',
  white: 'FFFFFF',
};

/** Menyusun objek Document (docx) untuk laporan data desa. Fungsi murni —
 *  belum di-pack jadi file, sehingga bisa diuji langsung (mis. dengan
 *  Packer.toBuffer di Node) tanpa memerlukan browser. `docx` (modul
 *  package docx) dioper sebagai parameter supaya pemanggil di browser bebas
 *  memuatnya secara lazy (dynamic import) — library ini cukup besar dan
 *  hanya dibutuhkan saat tombol "Unduh Laporan (Word)" benar-benar diklik. */
export function buildReportDocument(docx, tables, meta = reportMeta()) {
  const {
    Document, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell,
    WidthType, AlignmentType, BorderStyle, ShadingType, Footer, PageNumber,
  } = docx;

  const cellBorder = { style: BorderStyle.SINGLE, size: 2, color: COLOR.mistSoft };
  const CELL_BORDERS = { top: cellBorder, bottom: cellBorder, left: cellBorder, right: cellBorder };

  const headerCell = (text) =>
    new TableCell({
      borders: CELL_BORDERS,
      shading: { fill: COLOR.pine, type: ShadingType.CLEAR, color: 'auto' },
      margins: { top: 100, bottom: 100, left: 120, right: 120 },
      children: [
        new Paragraph({
          children: [new TextRun({ text: String(text), bold: true, color: COLOR.white, size: 20 })],
        }),
      ],
    });

  const bodyCell = (text, alt) =>
    new TableCell({
      borders: CELL_BORDERS,
      shading: alt ? { fill: COLOR.paperSoft, type: ShadingType.CLEAR, color: 'auto' } : undefined,
      margins: { top: 90, bottom: 90, left: 120, right: 120 },
      children: [new Paragraph({ children: [new TextRun({ text: String(text), size: 20, color: COLOR.ink })] })],
    });

  const tableFromData = (header, rows) =>
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({ tableHeader: true, children: header.map(headerCell) }),
        ...rows.map((r, i) => new TableRow({ children: r.map((cell) => bodyCell(cell, i % 2 === 1)) })),
      ],
    });

  const children = [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 },
      children: [new TextRun({ text: meta.judul.toUpperCase(), bold: true, size: 30, color: COLOR.pine })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 40 },
      children: [new TextRun({ text: meta.nama, bold: true, size: 44, color: COLOR.pineDeep })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 40 },
      children: [new TextRun({ text: meta.wilayah, size: 20, color: COLOR.mist })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 40 },
      children: [new TextRun({ text: meta.periode, bold: true, size: 19, color: COLOR.goldInk })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 300 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: COLOR.gold, space: 8 } },
      children: [new TextRun({ text: `Dicetak pada ${meta.tanggal}`, italics: true, size: 18, color: COLOR.mist })],
    }),
  ];

  tables.forEach((t) => {
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 320, after: 140 },
        children: [new TextRun({ text: t.sheetName, bold: true, size: 26, color: COLOR.pine })],
      }),
      tableFromData(t.header, t.rows),
      new Paragraph({ text: '', spacing: { after: 120 } })
    );
  });

  children.push(
    new Paragraph({
      spacing: { before: 300 },
      children: [new TextRun({ text: 'Catatan', bold: true, size: 19, color: COLOR.goldInk })],
    }),
    new Paragraph({
      children: [new TextRun({ text: meta.catatan, italics: true, size: 19, color: COLOR.mist })],
    })
  );

  return new Document({
    styles: {
      default: {
        document: { run: { font: 'Calibri', size: 22, color: COLOR.ink } },
      },
    },
    sections: [
      {
        properties: {
          page: { margin: { top: 800, bottom: 800, left: 900, right: 900 } },
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: 'Halaman ', size: 16, color: COLOR.mist }),
                  new TextRun({ children: [PageNumber.CURRENT], size: 16, color: COLOR.mist }),
                  new TextRun({ text: ' dari ', size: 16, color: COLOR.mist }),
                  new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 16, color: COLOR.mist }),
                ],
              }),
            ],
          }),
        },
        children,
      },
    ],
  });
}

/** Unduh laporan-data-desa-*.docx (browser only). Library `docx` baru
 *  dimuat saat fungsi ini dipanggil (dynamic import). */
export async function exportReportWord(villageName, tables, meta = reportMeta()) {
  const docx = await import('docx');
  const doc = buildReportDocument(docx, tables, meta);
  const blob = await docx.Packer.toBlob(doc);
  downloadBlob(blob, `laporan-data-desa-${slugify(villageName)}.docx`);
}