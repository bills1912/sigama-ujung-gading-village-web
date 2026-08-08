import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

/** Tabel data + tombol "Salin" yang menyalin isi tabel sebagai teks
 *  tab-separated (TSV) ke clipboard — begitu ditempel ke Excel/Sheets/Word,
 *  otomatis rapi per kolom. `header` dan `rows` dibangun secara dinamis
 *  dari src/lib/reportData.js, bukan ditulis statis di JSX. */
export default function DataTable({ title, header, rows }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const tsv = [header, ...rows].map((r) => r.join('\t')).join('\n');
    try {
      await navigator.clipboard.writeText(tsv);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API bisa saja diblokir izinnya oleh browser — biarkan saja,
      // tombol cukup tidak menampilkan konfirmasi "Tersalin".
    }
  };

  return (
    <div className="card rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-mist-soft">
        <div className="font-semibold text-[13.5px] text-pine-deep">{title}</div>
        <button
          onClick={copy}
          className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-pine hover:text-pine-deep transition-colors shrink-0"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? 'Tersalin' : 'Salin'}
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="bg-paper-soft">
              {header.map((h, i) => (
                <th key={i} className="text-left font-semibold text-pine-deep px-5 py-2.5 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className={i % 2 === 1 ? 'bg-paper-soft/40' : ''}>
                {r.map((cell, j) => (
                  <td key={j} className="px-5 py-2 text-mist border-t border-mist-soft/70 whitespace-nowrap">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
