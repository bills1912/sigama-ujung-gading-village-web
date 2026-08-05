export const formatRupiah = (n) => 'Rp ' + Math.round(n).toLocaleString('id-ID');

export const formatRupiahSingkat = (n) => {
  if (n >= 1e9) return 'Rp ' + (n / 1e9).toFixed(2).replace('.', ',') + ' M';
  if (n >= 1e6) return 'Rp ' + (n / 1e6).toFixed(0) + ' Jt';
  return formatRupiah(n);
};

const BULAN_ID = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

export const pecahTanggalId = (isoDate) => {
  const [y, m, d] = isoDate.split('-');
  return { tgl: d, bln: BULAN_ID[parseInt(m, 10) - 1], thn: y };
};
