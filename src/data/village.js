/* =====================================================================
   DATA DESA — satu sumber data untuk seluruh halaman.
   Ganti isi objek/array di bawah ini dengan data resmi desa Anda.
   Nama field sengaja dibuat stabil agar komponen di src/pages tidak
   perlu diubah saat data diganti.
===================================================================== */

export const VILLAGE = {
  nama: 'Desa Sigama Ujung Gading',
  kecamatan: 'Kecamatan Padang Bolak',
  kabupaten: 'Kabupaten Padang Lawas',
  provinsi: 'Sumatera Utara',
  kodePos: '22761',
  tagline: 'Menuju desa mandiri, transparan, dan sejahtera berbasis potensi perkebunan rakyat di kaki Bukit Barisan.',
  kepalaDesa: 'Ali Sutan Harahap',
  sambutan: 'Selamat datang di kanal informasi resmi Desa Sigama Ujung Gading. Website ini kami hadirkan sebagai wujud keterbukaan informasi publik — mulai dari agenda kegiatan, struktur pemerintahan, pengelolaan Anggaran Pendapatan dan Belanja Desa (APBDes), produk hukum desa, hingga data kependudukan. Kami mengundang seluruh warga untuk turut memantau dan berpartisipasi dalam pembangunan desa.',
  stats: { penduduk: 2340, luas: 18.4, dusun: 4, tahunBentuk: 1987 },
  visi: 'Terwujudnya Desa Sigama Ujung Gading yang mandiri secara ekonomi melalui optimalisasi hasil perkebunan rakyat, berpemerintahan bersih dan transparan, serta masyarakat yang guyub dan sejahtera.',
  misi: [
    'Meningkatkan tata kelola pemerintahan desa yang partisipatif, transparan, dan akuntabel.',
    'Mengembangkan nilai tambah hasil perkebunan nilam, karet, kopi, cengkih, dan kulit manis melalui pelatihan dan koperasi desa.',
    'Membangun dan memelihara infrastruktur dasar: jalan usaha tani, irigasi, dan sarana air bersih.',
    'Meningkatkan kualitas pelayanan kesehatan dan pendidikan bagi seluruh warga.',
    'Melestarikan gotong royong dan kearifan lokal sebagai fondasi kehidupan bermasyarakat.',
  ],
  kontak: {
    alamat: 'Kantor Desa Sigama Ujung Gading, Kecamatan Padang Bolak, Kabupaten Padang Lawas, Sumatera Utara 22761',
    telepon: '(0636) 123-4567',
    email: 'desaSigama Ujung Gading@padanglawaskab.go.id',
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
  { tanggal: '2026-08-06', waktu: '09:00', judul: 'Musyawarah Desa: Pembahasan Perubahan APBDes 2026', kategori: 'Pemerintahan', lokasi: 'Balai Desa Sigama Ujung Gading' },
  { tanggal: '2026-08-10', waktu: '08:00', judul: 'Gotong Royong Pembersihan Saluran Irigasi', kategori: 'Pembangunan', lokasi: 'Dusun II' },
  { tanggal: '2026-08-14', waktu: '13:00', judul: 'Posyandu Balita & Lansia Bulanan', kategori: 'PKK & Posyandu', lokasi: 'Poskesdes Desa' },
  { tanggal: '2026-08-17', waktu: '07:00', judul: 'Upacara Peringatan HUT Kemerdekaan RI Ke-81', kategori: 'Pemerintahan', lokasi: 'Lapangan Desa' },
  { tanggal: '2026-08-20', waktu: '19:30', judul: 'Pengajian Rutin Malam Jumat', kategori: 'Keagamaan', lokasi: 'Masjid Nurul Huda' },
  { tanggal: '2026-08-24', waktu: '09:00', judul: 'Pelatihan Pengolahan Hasil Nilam dan Kopi', kategori: 'Sosial & Kemasyarakatan', lokasi: 'Balai Desa Sigama Ujung Gading' },
  { tanggal: '2026-08-29', waktu: '15:30', judul: 'Turnamen Bola Voli Antar Dusun', kategori: 'Pemuda & Olahraga', lokasi: 'Lapangan Dusun I' },
  { tanggal: '2026-09-02', waktu: '09:00', judul: 'Rapat Koordinasi BPD dan Perangkat Desa', kategori: 'Pemerintahan', lokasi: 'Balai Desa Sigama Ujung Gading' },
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

export const DEMOGRAFI = {
  gender: [
    { name: 'Laki-laki', value: 1205 },
    { name: 'Perempuan', value: 1135 },
  ],
  dusun: [
    { name: 'Dusun I', value: 640 },
    { name: 'Dusun II', value: 590 },
    { name: 'Dusun III', value: 560 },
    { name: 'Dusun IV', value: 550 },
  ],
  pendidikan: [
    { name: 'Belum/Tidak Sekolah', value: 310 },
    { name: 'Tamat SD', value: 640 },
    { name: 'Tamat SMP', value: 520 },
    { name: 'Tamat SMA', value: 610 },
    { name: 'Diploma/Sarjana', value: 260 },
  ],
  mataPencaharian: [
    { name: 'Petani/Pekebun', value: 1180 },
    { name: 'Pedagang', value: 220 },
    { name: 'PNS/Aparatur', value: 95 },
    { name: 'Buruh/Karyawan', value: 340 },
    { name: 'Jasa & Lainnya', value: 505 },
  ],
  ringkasan: { kk: 612, rt: 16, kepadatan: Math.round(2340 / 18.4) },
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