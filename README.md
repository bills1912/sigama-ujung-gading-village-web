# Website Desa Sosopan

Website resmi desa berbasis **Vite + React 19**, multi-halaman (React Router), dengan Tailwind CSS v4.
Mencakup: Beranda, Profil Desa (visi misi & struktur organisasi), Agenda/Jadwal Kegiatan, Anggaran (APBDes),
JDIH (produk hukum desa), Data Makro Desa, dan Kontak.

## Menjalankan di komputer lokal

Butuh [Node.js](https://nodejs.org) versi 20 ke atas.

```bash
npm install     # pasang semua dependency
npm run dev     # jalankan mode pengembangan → http://localhost:5173
npm run build   # build produksi ke folder dist/
npm run preview # pratinjau hasil build produksi
```

## Struktur project

```
src/
  data/village.js     ← SATU-SATUNYA file yang perlu diedit untuk mengganti
                         data dummy (profil, agenda, anggaran, JDIH, demografi)
                         dengan data resmi desa Anda.
  lib/format.js        Fungsi bantu format rupiah & tanggal.
  components/          Navbar, Footer, dan komponen UI yang dipakai berulang.
  pages/                Satu file per halaman (routing di src/App.jsx).
```

## Mengganti data desa

Buka `src/data/village.js` dan ubah nilai pada objek `VILLAGE`, `STRUKTUR`, `AGENDA`,
`JDIH_DOCS`, `DEMOGRAFI`, dsb. Tampilan (komponen di `src/pages`) tidak perlu disentuh
selama nama field tetap sama.

## Mengubah warna/font

Buka `src/index.css`, bagian `@theme { ... }` di paling atas. Semua nilai warna (`--color-*`)
dan font (`--font-*`) di situ otomatis tersedia sebagai utility class Tailwind
(mis. `bg-pine`, `text-gold-ink`, `font-display`).

## Deploy

Setelah `npm run build`, folder `dist/` berisi berkas statis siap diunggah ke Netlify,
Vercel, GitHub Pages, atau hosting statis desa.id/apps desa lainnya.

---
Catatan: seluruh data pada situs ini (nama pejabat, angka anggaran, jumlah penduduk,
dokumen JDIH) bersifat **ilustrasi** dan perlu diganti dengan data resmi sebelum publikasi.
