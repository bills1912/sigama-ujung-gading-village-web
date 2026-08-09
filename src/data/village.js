/* =====================================================================
   DATA DESA — satu sumber data untuk seluruh halaman.
   Ganti isi objek/array di bawah ini dengan data resmi desa Anda.
   Nama field sengaja dibuat stabil agar komponen di src/pages tidak
   perlu diubah saat data diganti.
===================================================================== */

export const VILLAGE = {
  nama: 'Desa Sigama Ujung Gading',
  kecamatan: 'Kecamatan Padang Bolak',
  kabupaten: 'Kabupaten Padang Lawas Utara',
  provinsi: 'Sumatera Utara',
  kodeDesa: '1220042063',
  kodePos: '-',
  tagline: 'Menuju desa mandiri, transparan, dan sejahtera berbasis potensi perkebunan rakyat di kaki Bukit Barisan.',
  kepalaDesa: 'Al Afgani Saparuddin Harahap',
  sambutan: 'Selamat datang di kanal informasi resmi Desa Sigama Ujung Gading. Website ini kami hadirkan sebagai wujud keterbukaan informasi publik — mulai dari agenda kegiatan, struktur pemerintahan, pengelolaan Anggaran Pendapatan dan Belanja Desa (APBDes), produk hukum desa, hingga data kependudukan. Kami mengundang seluruh warga untuk turut memantau dan berpartisipasi dalam pembangunan desa.',
  // penduduk & luas bersumber dari Data Pokok Desa (Kemendagri Prodeskel) 2025,
  // data terbaru yang tersedia; dusun & tahunBentuk dari dokumen Profil Desa 2025.
  stats: { penduduk: 962, luas: 2.5, dusun: 6, tahunBentuk: 2020 },
  visi: 'Terwujudnya Desa Sigama Ujung Gading yang mandiri secara ekonomi melalui optimalisasi hasil perkebunan rakyat, berpemerintahan bersih dan transparan, serta masyarakat yang guyub dan sejahtera.',
  misi: [
    'Meningkatkan tata kelola pemerintahan desa yang partisipatif, transparan, dan akuntabel.',
    'Mengembangkan nilai tambah hasil perkebunan nilam, karet, kopi, cengkih, dan kulit manis melalui pelatihan dan koperasi desa.',
    'Membangun dan memelihara infrastruktur dasar: jalan usaha tani, irigasi, dan sarana air bersih.',
    'Meningkatkan kualitas pelayanan kesehatan dan pendidikan bagi seluruh warga.',
    'Melestarikan gotong royong dan kearifan lokal sebagai fondasi kehidupan bermasyarakat.',
  ],
  kontak: {
    alamat: 'Kantor Desa Sigama Ujung Gading, Kecamatan Padang Bolak, Kabupaten Padang Lawas Utara, Sumatera Utara',
    telepon: '(0636) 123-4567',
    email: 'sigamaujunggading@gmail.com',
    jamLayanan: 'Senin–Jumat, 08.00–16.00 WIB',
  },
};

export const STRUKTUR = {
  kepalaDesa: 'Ali Sutan Harahap',
  sekdes: 'Muhammad Rizal Pulungan',
  kaurKasi: [
    'Kaur Keuangan',
    'Kaur Tata Usaha & Umum',
    'Kaur Perencanaan',
    'Kasi Pemerintahan',
    'Kasi Kesejahteraan',
    'Kasi Pelayanan',
  ],
  dusun: ['Kepala Dusun I', 'Kepala Dusun II', 'Kepala Dusun III', 'Kepala Dusun IV'],
};

/* =====================================================================
   STRUKTUR ORGANISASI — desa memiliki beberapa lembaga dengan bagan
   masing-masing, ditampilkan sebagai tab. Setiap entri berupa pohon
   rekursif: { title, sub?, primary?, children?: [...] }
   Dipakai oleh komponen <OrgTree> (lihat src/components/ui.jsx).
===================================================================== */
export const ORG_STRUCTURES = [
  {
    key: 'pemdes',
    label: 'Pemerintah Desa',
    catatan: 'Badan Permusyawaratan Desa (BPD) berkedudukan sebagai mitra kerja sekaligus pengawas kinerja Kepala Desa, tidak berada dalam garis komando pemerintahan desa.',
    tree: {
      title: 'Kepala Desa',
      sub: STRUKTUR.kepalaDesa,
      primary: true,
      children: [
        {
          title: 'Sekretaris Desa',
          sub: STRUKTUR.sekdes,
          children: STRUKTUR.kaurKasi.map((k) => ({ title: k })),
        },
        {
          title: 'Kepala Wilayah',
          sub: 'Dusun',
          children: STRUKTUR.dusun.map((d) => ({ title: d })),
        },
      ],
    },
  },
  {
    key: 'bpd',
    label: 'BPD',
    catatan: 'Badan Permusyawaratan Desa beranggotakan wakil dari tiap dusun melalui musyawarah perwakilan.',
    tree: {
      title: 'Ketua BPD',
      sub: 'Sahala Pulungan',
      primary: true,
      children: [
        { title: 'Wakil Ketua BPD' },
        { title: 'Sekretaris BPD' },
        { title: 'Anggota', sub: 'Wakil Dusun I' },
        { title: 'Anggota', sub: 'Wakil Dusun II' },
        { title: 'Anggota', sub: 'Wakil Dusun III' },
        { title: 'Anggota', sub: 'Wakil Dusun IV' },
      ],
    },
  },
  {
    key: 'lpm',
    label: 'LPM',
    catatan: 'Lembaga Pemberdayaan Masyarakat (LPM) menjadi mitra pemerintah desa dalam perencanaan dan pelaksanaan pembangunan partisipatif.',
    tree: {
      title: 'Ketua LPM',
      sub: 'Baginda Siregar',
      primary: true,
      children: [
        { title: 'Sekretaris' },
        { title: 'Bendahara' },
        { title: 'Seksi Agama & Sosial Budaya' },
        { title: 'Seksi Ekonomi & Pembangunan' },
        { title: 'Seksi Pendidikan & Kesehatan' },
        { title: 'Seksi Pemberdayaan Perempuan' },
      ],
    },
  },
  {
    key: 'pkk',
    label: 'PKK',
    catatan: 'Tim Penggerak PKK Desa menjalankan 10 program pokok PKK melalui empat kelompok kerja (Pokja).',
    tree: {
      title: 'Ketua TP PKK',
      sub: 'Ny. Siti Harahap',
      primary: true,
      children: [
        { title: 'Wakil Ketua' },
        { title: 'Sekretaris' },
        { title: 'Bendahara' },
        { title: 'Pokja I', sub: 'Gotong Royong & Kerohanian' },
        { title: 'Pokja II', sub: 'Pendidikan & Ekonomi' },
        { title: 'Pokja III', sub: 'Pangan, Sandang & Papan' },
        { title: 'Pokja IV', sub: 'Kesehatan & Lingkungan' },
      ],
    },
  },
  {
    key: 'karang-taruna',
    label: 'Karang Taruna',
    catatan: 'Karang Taruna menjadi wadah pengembangan generasi muda desa di bidang sosial, olahraga, dan kewirausahaan.',
    tree: {
      title: 'Ketua Karang Taruna',
      sub: 'Rendra Pulungan',
      primary: true,
      children: [
        { title: 'Wakil Ketua' },
        { title: 'Sekretaris' },
        { title: 'Bendahara' },
        { title: 'Bidang Olahraga & Seni' },
        { title: 'Bidang Kewirausahaan' },
        { title: 'Bidang Sosial & Kemasyarakatan' },
      ],
    },
  },
];

export const AGENDA_KATEGORI = [
  'Semua',
  'Pemerintahan',
  'Pembangunan',
  'PKK & Posyandu',
  'Keagamaan',
  'Sosial & Kemasyarakatan',
  'Pemuda & Olahraga',
];

export const CATEGORY_STYLE = {
  Pemerintahan: { bg: 'rgba(30,70,50,0.10)', fg: '#1E4632' },
  Pembangunan: { bg: 'rgba(166,85,46,0.10)', fg: '#A6552E' },
  'PKK & Posyandu': { bg: 'rgba(190,150,69,0.18)', fg: '#8C6D22' },
  Keagamaan: { bg: 'rgba(107,143,114,0.18)', fg: '#3E6650' },
  'Sosial & Kemasyarakatan': { bg: 'rgba(124,140,126,0.18)', fg: '#54614F' },
  'Pemuda & Olahraga': { bg: 'rgba(15,42,30,0.08)', fg: '#0F2A1E' },
};

export const AGENDA = [
  { tanggal: '2026-08-06', waktu: '09:00', judul: 'Musyawarah Desa: Pembahasan Perubahan APBDes 2026', kategori: 'Pemerintahan', lokasi: 'Balai Desa Sosopan' },
  { tanggal: '2026-08-10', waktu: '08:00', judul: 'Gotong Royong Pembersihan Saluran Irigasi', kategori: 'Pembangunan', lokasi: 'Dusun II' },
  { tanggal: '2026-08-14', waktu: '13:00', judul: 'Posyandu Balita & Lansia Bulanan', kategori: 'PKK & Posyandu', lokasi: 'Poskesdes Desa' },
  { tanggal: '2026-08-17', waktu: '07:00', judul: 'Upacara Peringatan HUT Kemerdekaan RI Ke-81', kategori: 'Pemerintahan', lokasi: 'Lapangan Desa' },
  { tanggal: '2026-08-20', waktu: '19:30', judul: 'Pengajian Rutin Malam Jumat', kategori: 'Keagamaan', lokasi: 'Masjid Nurul Huda' },
  { tanggal: '2026-08-24', waktu: '09:00', judul: 'Pelatihan Pengolahan Hasil Nilam dan Kopi', kategori: 'Sosial & Kemasyarakatan', lokasi: 'Balai Desa Sosopan' },
  { tanggal: '2026-08-29', waktu: '15:30', judul: 'Turnamen Bola Voli Antar Dusun', kategori: 'Pemuda & Olahraga', lokasi: 'Lapangan Dusun I' },
  { tanggal: '2026-09-02', waktu: '09:00', judul: 'Rapat Koordinasi BPD dan Perangkat Desa', kategori: 'Pemerintahan', lokasi: 'Balai Desa Sosopan' },
];

export const TAHUN_LIST = [2024, 2025, 2026];
export const FAKTOR_TAHUN = { 2024: 0.82, 2025: 0.9, 2026: 1 };

export const BASE_PENDAPATAN = [
  { name: 'Dana Desa', value: 1050000000 },
  { name: 'Alokasi Dana Desa (ADD)', value: 420000000 },
  { name: 'Pendapatan Asli Desa', value: 65000000 },
  { name: 'Bantuan Keuangan Provinsi', value: 45000000 },
  { name: 'Bantuan Keuangan Kabupaten', value: 60000000 },
  { name: 'Lain-lain Pendapatan Sah', value: 18000000 },
];

export const BASE_BELANJA = [
  { name: 'Penyelenggaraan Pemerintahan Desa', value: 420000000 },
  { name: 'Pelaksanaan Pembangunan Desa', value: 720000000 },
  { name: 'Pembinaan Kemasyarakatan', value: 210000000 },
  { name: 'Pemberdayaan Masyarakat', value: 240000000 },
  { name: 'Belanja Tak Terduga', value: 68000000 },
];

export const REALISASI_BASE = [
  { name: 'Pemerintahan Desa', realisasi: 92 },
  { name: 'Pembangunan Desa', realisasi: 78 },
  { name: 'Pembinaan Kemasyarakatan', realisasi: 85 },
  { name: 'Pemberdayaan Masyarakat', realisasi: 70 },
];

export const CHART_COLORS = ['#1E4632', '#BE9756', '#6B8F72', '#A6552E', '#8FA888', '#8C6D3F'];

export const JDIH_KATEGORI = ['Semua', 'Peraturan Desa', 'Peraturan Kepala Desa', 'Keputusan Kepala Desa', 'Keputusan BPD'];

export const JDIH_STYLE = {
  'Peraturan Desa': { bg: 'rgba(30,70,50,0.10)', fg: '#1E4632' },
  'Peraturan Kepala Desa': { bg: 'rgba(190,150,69,0.18)', fg: '#8C6D22' },
  'Keputusan Kepala Desa': { bg: 'rgba(107,143,114,0.18)', fg: '#3E6650' },
  'Keputusan BPD': { bg: 'rgba(166,85,46,0.10)', fg: '#A6552E' },
};

export const JDIH_DOCS = [
  { nomor: '01/2026', judul: 'Anggaran Pendapatan dan Belanja Desa (APBDes) Tahun Anggaran 2026', kategori: 'Peraturan Desa', tanggal: '12 Jan 2026' },
  { nomor: '02/2026', judul: 'Rencana Kerja Pemerintah Desa (RKPDes) Tahun 2026', kategori: 'Peraturan Desa', tanggal: '15 Jan 2026' },
  { nomor: '02/Kep-BPD/2026', judul: 'Persetujuan Bersama Rancangan APBDes Tahun 2026', kategori: 'Keputusan BPD', tanggal: '08 Jan 2026' },
  { nomor: '12/Kep/2026', judul: 'Penetapan Perangkat Desa Tahun 2026', kategori: 'Keputusan Kepala Desa', tanggal: '03 Feb 2026' },
  { nomor: '03/2025', judul: 'Rencana Pembangunan Jangka Menengah Desa (RPJMDes) 2025–2031', kategori: 'Peraturan Desa', tanggal: '20 Nov 2025' },
  { nomor: '04/2025', judul: 'Pungutan dan Retribusi Desa', kategori: 'Peraturan Desa', tanggal: '10 Jun 2025' },
  { nomor: '07/Perkades/2025', judul: 'Standar Operasional Prosedur Pelayanan Administrasi Desa', kategori: 'Peraturan Kepala Desa', tanggal: '01 Agu 2025' },
  { nomor: '09/Kep/2025', judul: 'Pembentukan Tim Pengelola Kegiatan (TPK) Pembangunan Desa', kategori: 'Keputusan Kepala Desa', tanggal: '22 Mar 2025' },
  { nomor: '05/2024', judul: 'Perubahan APBDes Tahun Anggaran 2024', kategori: 'Peraturan Desa', tanggal: '18 Sep 2024' },
  { nomor: '03/Perkades/2024', judul: 'Pengelolaan dan Pemeliharaan Aset Desa', kategori: 'Peraturan Kepala Desa', tanggal: '14 Mei 2024' },
];

/* =====================================================================
   DATA DESA (IDM) — bersumber dari Kuesioner Indeks Desa Membangun (IDM)
   yang diisi Pemerintah Desa Sigama Ujung Gading, tahun 2021–2024.
   Tahun 2025 menyusul (belum diisi/diserahkan saat data ini disusun).

   Struktur usia & mata pencaharian memakai kategori sebagaimana tercatat
   di kuesioner tiap tahun (definisi kelompok usia berubah mulai 2024
   mengikuti pembaruan format kuesioner nasional), sehingga ditampilkan
   per tahun, bukan dipaksakan sama antar tahun.
===================================================================== */

export const IDM_TAHUN_LIST = [2021, 2022, 2023, 2024, 2025];
export const IDM_TAHUN_MENYUSUL = 2026;

/** Label sumber resmi per tahun — dipakai untuk atribusi yang akurat.
 *  2021-2024 bersumber dari Kuesioner IDM (BPS/Kemendes); 2025 bersumber
 *  dari sistem Prodeskel Kemendagri yang formatnya berbeda (lihat catatan
 *  di IDM_DATA[2025]). */
export const IDM_SUMBER = {
  2021: 'Kuesioner Indeks Desa Membangun (IDM)',
  2022: 'Kuesioner Indeks Desa Membangun (IDM)',
  2023: 'Kuesioner Indeks Desa Membangun (IDM)',
  2024: 'Kuesioner Indeks Desa Membangun (IDM)',
  2025: 'Data Pokok Desa — Sistem Prodeskel, Ditjen Bina Pemdes Kemendagri',
};

export const IDM_DATA = {
  2021: {
    ringkasan: { totalPenduduk: 930, lk: 476, pr: 454, kk: 222, kkPerempuan: 25, keluargaMiskin: 69, luasWilayah: 250 },
    usia: [
      { name: '<1 tahun', value: 24 },
      { name: '1-4 tahun', value: 78 },
      { name: '5-14 tahun', value: 284 },
      { name: '15-39 tahun', value: 348 },
      { name: '40-64 tahun', value: 128 },
      { name: '65 tahun ke atas', value: 68 },
    ],
    pekerjaan: [
      { name: 'Petani/Pekebun', value: 848 },
      { name: 'Buruh Tani', value: 0 },
      { name: 'PNS/Aparatur', value: 24 },
      { name: 'Pegawai Swasta', value: 22 },
      { name: 'Tenaga Kesehatan', value: 9 },
      { name: 'Lainnya', value: 33 },
    ],
  },
  2022: {
    ringkasan: { totalPenduduk: 976, lk: 479, pr: 497, kk: 280, kkPerempuan: 30, keluargaMiskin: 136, luasWilayah: 8.5 },
    usia: [
      { name: '<1 tahun', value: 24 },
      { name: '1-4 tahun', value: 78 },
      { name: '5-14 tahun', value: 284 },
      { name: '15-39 tahun', value: 348 },
      { name: '40-64 tahun', value: 128 },
      { name: '65 tahun ke atas', value: 68 },
    ],
    pekerjaan: [
      { name: 'Petani/Pekebun', value: 976 },
      { name: 'Buruh Tani', value: 33 },
      { name: 'PNS/Aparatur', value: 24 },
      { name: 'Pegawai Swasta', value: 15 },
      { name: 'Tenaga Kesehatan', value: 9 },
      { name: 'Lainnya', value: 33 },
    ],
  },
  2023: {
    ringkasan: { totalPenduduk: 983, lk: 476, pr: 507, kk: 260, kkPerempuan: 60, keluargaMiskin: 200, luasWilayah: 8.5 },
    usia: [
      { name: '<1 tahun', value: 24 },
      { name: '1-4 tahun', value: 78 },
      { name: '5-14 tahun', value: 284 },
      { name: '15-39 tahun', value: 348 },
      { name: '40-64 tahun', value: 128 },
      { name: '65 tahun ke atas', value: 68 },
    ],
    pekerjaan: [
      { name: 'Petani/Pekebun', value: 976 },
      { name: 'Buruh Tani', value: 0 },
      { name: 'PNS/Aparatur', value: 24 },
      { name: 'Pegawai Swasta', value: 15 },
      { name: 'Tenaga Kesehatan', value: 9 },
      { name: 'Lainnya', value: 33 },
    ],
  },
  2024: {
    ringkasan: { totalPenduduk: 983, lk: 476, pr: 507, kk: 260, kkPerempuan: 60, keluargaMiskin: 200, luasWilayah: 8.5 },
    usia: [
      { name: '<3 tahun', value: 24 },
      { name: '3-6 tahun', value: 78 },
      { name: '7-12 tahun', value: 284 },
      { name: '13-15 tahun', value: 348 },
      { name: '16-18 tahun', value: 128 },
      { name: '19-59 tahun', value: 0 },
      { name: '>59 tahun', value: 68 },
    ],
    pekerjaan: [
      { name: 'Petani/Pekebun', value: 976 },
      { name: 'Buruh Tani', value: 0 },
      { name: 'PNS/Aparatur', value: 24 },
      { name: 'Pegawai Swasta', value: 15 },
      { name: 'Tenaga Kesehatan', value: 9 },
      { name: 'Lainnya', value: 33 },
    ],
  },
  2025: {
    // Sumber: Data Pokok Desa & Daftar Isian Tingkat Perkembangan Desa,
    // sistem Prodeskel Ditjen Bina Pemdes Kemendagri (Bulan 5 Tahun 2025) —
    // berbeda dari Kuesioner IDM BPS yang dipakai tahun 2021-2024, sehingga
    // sebagian rincian tidak tersedia dalam bentuk yang sama (lihat catatan usia).
    ringkasan: { totalPenduduk: 962, lk: 492, pr: 470, kk: 266, kkPerempuan: 53, keluargaMiskin: 48, luasWilayah: 2.5 },
    // Rincian struktur usia pada dokumen sumber tidak konsisten secara
    // internal (jumlah kelompok usia jauh melebihi total penduduk — indikasi
    // kesalahan/bug saat sistem Prodeskel mencetak laporan), sehingga sengaja
    // dikosongkan daripada menampilkan angka yang jelas keliru. Total
    // penduduk & jenis kelamin di atas sudah konsisten dan aman dipakai.
    usia: [],
    // "Keluarga Miskin" tahun ini memakai proksi "Keluarga Pra Sejahtera"
    // (klasifikasi kesejahteraan keluarga pada sistem Prodeskel), karena
    // sistem ini tidak punya field "Keluarga Miskin" langsung seperti
    // Kuesioner IDM tahun-tahun sebelumnya — definisinya bisa sedikit
    // berbeda, sesuaikan bila ada angka yang lebih tepat.
    pekerjaan: [
      { name: 'Petani/Pekebun', value: 270 },
      { name: 'Buruh Tani', value: 0 },
      { name: 'PNS/Aparatur', value: 33 },
      { name: 'Pegawai Swasta', value: 0 },
      { name: 'Tenaga Kesehatan', value: 3 },
      { name: 'Lainnya', value: 42 },
    ],
  },
};

/** Skor Indeks Desa Membangun (IDM) 2024 — baru tersedia mulai tahun ini
 *  di kuesioner sumber (2021-2023 belum menyertakan rubrik skor). */
export const IDM_SKOR_2024 = {
  tahun: 2024,
  total: 351,
  dimensi: [
    {
      nama: 'Layanan Dasar',
      skor: 110,
      sub: [
        { nama: 'Pendidikan', skor: 27 },
        { nama: 'Kesehatan', skor: 62 },
        { nama: 'Utilitas Dasar', skor: 21 },
      ],
    },
    {
      nama: 'Sosial',
      skor: 45,
      sub: [
        { nama: 'Aktivitas', skor: 41 },
        { nama: 'Fasilitas Masyarakat', skor: 4 },
      ],
    },
    {
      nama: 'Ekonomi',
      skor: 76,
      sub: [
        { nama: 'Produksi Desa', skor: 12 },
        { nama: 'Fasilitas Pendukung Ekonomi', skor: 64 },
      ],
    },
    {
      nama: 'Lingkungan',
      skor: 43,
      sub: [
        { nama: 'Pengelolaan Lingkungan', skor: 38 },
        { nama: 'Penanggulangan Bencana', skor: 5 },
      ],
    },
    {
      nama: 'Aksesibilitas',
      skor: 45,
      sub: [
        { nama: 'Kondisi Akses Jalan', skor: 19 },
        { nama: 'Kemudahan Akses', skor: 26 },
      ],
    },
    {
      nama: 'Tata Kelola Pemerintahan Desa',
      skor: 32,
      sub: [
        { nama: 'Kelembagaan dan Pelayanan Desa', skor: 24 },
        { nama: 'Tata Kelola Keuangan Desa', skor: 8 },
      ],
    },
  ],
};

export const NAV_ITEMS = [
  { to: '/', label: 'Beranda' },
  { to: '/profil', label: 'Profil Desa' },
  { to: '/agenda', label: 'Agenda' },
  { to: '/anggaran', label: 'Anggaran' },
  { to: '/jdih', label: 'JDIH' },
  { to: '/data-desa', label: 'Data Desa' },
  { to: '/kontak', label: 'Kontak' },
];