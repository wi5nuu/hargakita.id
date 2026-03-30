import type { Komoditas, Kota, LaporanWarga, Berita, StatistikPlatform } from '@/types';

export const komoditasList: Komoditas[] = [
  { id: 'beras-premium', nama: 'Beras Premium', namaLengkap: 'Beras Premium', kategori: 'pokok', icon: '', satuan: 'kg', harga: 15500, hargaSebelumnya: 15200, perubahan: 300, perubahanPersen: 1.97, tren: 'naik' },
  { id: 'beras-medium', nama: 'Beras Medium', namaLengkap: 'Beras Medium', kategori: 'pokok', icon: '', satuan: 'kg', harga: 13200, hargaSebelumnya: 13200, perubahan: 0, perubahanPersen: 0, tren: 'stabil' },
  { id: 'minyak-goreng', nama: 'Minyak Goreng', namaLengkap: 'Minyak Goreng Curah', kategori: 'pokok', icon: '', satuan: 'liter', harga: 18500, hargaSebelumnya: 19200, perubahan: -700, perubahanPersen: -3.65, tren: 'turun' },
  { id: 'gula-pasir', nama: 'Gula Pasir', namaLengkap: 'Gula Pasir Lokal', kategori: 'pokok', icon: '', satuan: 'kg', harga: 16800, hargaSebelumnya: 16500, perubahan: 300, perubahanPersen: 1.82, tren: 'naik' },
  { id: 'bawang-merah', nama: 'Bawang Merah', namaLengkap: 'Bawang Merah', kategori: 'pokok', icon: '', satuan: 'kg', harga: 42000, hargaSebelumnya: 38500, perubahan: 3500, perubahanPersen: 9.09, tren: 'naik' },
  { id: 'bawang-putih', nama: 'Bawang Putih', namaLengkap: 'Bawang Putih Lokal', kategori: 'pokok', icon: '', satuan: 'kg', harga: 38500, hargaSebelumnya: 38000, perubahan: 500, perubahanPersen: 1.32, tren: 'naik' },
  { id: 'cabai-merah', nama: 'Cabai Merah', namaLengkap: 'Cabai Merah Besar', kategori: 'pokok', icon: '', satuan: 'kg', harga: 65000, hargaSebelumnya: 72000, perubahan: -7000, perubahanPersen: -9.72, tren: 'turun' },
  { id: 'cabai-rawit', nama: 'Cabai Rawit', namaLengkap: 'Cabai Rawit Merah', kategori: 'pokok', icon: '', satuan: 'kg', harga: 78000, hargaSebelumnya: 85000, perubahan: -7000, perubahanPersen: -8.24, tren: 'turun' },
  { id: 'tomat', nama: 'Tomat', namaLengkap: 'Tomat Merah', kategori: 'pokok', icon: '', satuan: 'kg', harga: 12000, hargaSebelumnya: 11500, perubahan: 500, perubahanPersen: 4.35, tren: 'naik' },
  { id: 'kentang', nama: 'Kentang', namaLengkap: 'Kentang Lokal', kategori: 'pokok', icon: '', satuan: 'kg', harga: 22500, hargaSebelumnya: 22000, perubahan: 500, perubahanPersen: 2.27, tren: 'naik' },
  { id: 'telur-ayam', nama: 'Telur Ayam', namaLengkap: 'Telur Ayam Ras', kategori: 'protein', icon: '', satuan: 'kg', harga: 32000, hargaSebelumnya: 31500, perubahan: 500, perubahanPersen: 1.59, tren: 'naik' },
  { id: 'daging-ayam', nama: 'Daging Ayam', namaLengkap: 'Daging Ayam Broiler', kategori: 'protein', icon: '', satuan: 'kg', harga: 42000, hargaSebelumnya: 41500, perubahan: 500, perubahanPersen: 1.20, tren: 'naik' },
  { id: 'daging-sapi', nama: 'Daging Sapi', namaLengkap: 'Daging Sapi Murni', kategori: 'protein', icon: '', satuan: 'kg', harga: 135000, hargaSebelumnya: 135000, perubahan: 0, perubahanPersen: 0, tren: 'stabil' },
  { id: 'ikan-tongkol', nama: 'Ikan Tongkol', namaLengkap: 'Ikan Tongkol Segar', kategori: 'protein', icon: '', satuan: 'kg', harga: 35000, hargaSebelumnya: 36000, perubahan: -1000, perubahanPersen: -2.78, tren: 'turun' },
  { id: 'tahu', nama: 'Tahu', namaLengkap: 'Tahu Putih', kategori: 'protein', icon: '', satuan: 'kg', harga: 18000, hargaSebelumnya: 18000, perubahan: 0, perubahanPersen: 0, tren: 'stabil' },
  { id: 'tempe', nama: 'Tempe', namaLengkap: 'Tempe Kedelai', kategori: 'protein', icon: '', satuan: 'kg', harga: 22000, hargaSebelumnya: 21500, perubahan: 500, perubahanPersen: 2.33, tren: 'naik' },
  { id: 'tepung-terigu', nama: 'Tepung Terigu', namaLengkap: 'Tepung Terigu Segitiga', kategori: 'pokok', icon: '', satuan: 'kg', harga: 14500, hargaSebelumnya: 14500, perubahan: 0, perubahanPersen: 0, tren: 'stabil' },
  { id: 'garam', nama: 'Garam', namaLengkap: 'Garam Beryodium', kategori: 'pokok', icon: '', satuan: 'kg', harga: 5500, hargaSebelumnya: 5500, perubahan: 0, perubahanPersen: 0, tren: 'stabil' },
  { id: 'jagung', nama: 'Jagung', namaLengkap: 'Jagung Pipilan', kategori: 'pokok', icon: '', satuan: 'kg', harga: 8500, hargaSebelumnya: 8200, perubahan: 300, perubahanPersen: 3.66, tren: 'naik' },
  { id: 'kedelai', nama: 'Kedelai', namaLengkap: 'Kedelai Impor', kategori: 'pokok', icon: '', satuan: 'kg', harga: 12500, hargaSebelumnya: 12300, perubahan: 200, perubahanPersen: 1.63, tren: 'naik' },
];

export const kotaList: Kota[] = [
  { id: 'jakarta', nama: 'Jakarta', provinsi: 'DKI Jakarta', region: 'jawa' },
  { id: 'surabaya', nama: 'Surabaya', provinsi: 'Jawa Timur', region: 'jawa' },
  { id: 'bandung', nama: 'Bandung', provinsi: 'Jawa Barat', region: 'jawa' },
  { id: 'semarang', nama: 'Semarang', provinsi: 'Jawa Tengah', region: 'jawa' },
  { id: 'yogyakarta', nama: 'Yogyakarta', provinsi: 'DI Yogyakarta', region: 'jawa' },
  { id: 'malang', nama: 'Malang', provinsi: 'Jawa Timur', region: 'jawa' },
  { id: 'medan', nama: 'Medan', provinsi: 'Sumatera Utara', region: 'sumatera' },
  { id: 'palembang', nama: 'Palembang', provinsi: 'Sumatera Selatan', region: 'sumatera' },
  { id: 'pekanbaru', nama: 'Pekanbaru', provinsi: 'Riau', region: 'sumatera' },
  { id: 'padang', nama: 'Padang', provinsi: 'Sumatera Barat', region: 'sumatera' },
  { id: 'bandar-lampung', nama: 'Bandar Lampung', provinsi: 'Lampung', region: 'sumatera' },
  { id: 'jambi', nama: 'Jambi', provinsi: 'Jambi', region: 'sumatera' },
  { id: 'makassar', nama: 'Makassar', provinsi: 'Sulawesi Selatan', region: 'timur' },
  { id: 'manado', nama: 'Manado', provinsi: 'Sulawesi Utara', region: 'timur' },
  { id: 'denpasar', nama: 'Denpasar', provinsi: 'Bali', region: 'timur' },
  { id: 'mataram', nama: 'Mataram', provinsi: 'NTB', region: 'timur' },
  { id: 'kupang', nama: 'Kupang', provinsi: 'NTT', region: 'timur' },
  { id: 'ambon', nama: 'Ambon', provinsi: 'Maluku', region: 'timur' },
  { id: 'jayapura', nama: 'Jayapura', provinsi: 'Papua', region: 'timur' },
  { id: 'balikpapan', nama: 'Balikpapan', provinsi: 'Kalimantan Timur', region: 'kalimantan' },
  { id: 'banjarmasin', nama: 'Banjarmasin', provinsi: 'Kalimantan Selatan', region: 'kalimantan' },
  { id: 'pontianak', nama: 'Pontianak', provinsi: 'Kalimantan Barat', region: 'kalimantan' },
  { id: 'palu', nama: 'Palu', provinsi: 'Sulawesi Tengah', region: 'sulawesi' },
  { id: 'kendari', nama: 'Kendari', provinsi: 'Sulawesi Tenggara', region: 'sulawesi' },
  { id: 'gorontalo', nama: 'Gorontalo', provinsi: 'Gorontalo', region: 'sulawesi' },
];

export const laporanWargaList: LaporanWarga[] = [
  { id: '1', komoditas: 'Beras Premium', harga: 15800, satuan: 'kg', kota: 'Jakarta', pasar: 'Pasar Senen', tanggal: '2025-01-15', status: 'terverifikasi', waktuLapor: '2 jam lalu' },
  { id: '2', komoditas: 'Minyak Goreng', harga: 18200, satuan: 'liter', kota: 'Bandung', pasar: 'Pasar Ciroyom', tanggal: '2025-01-15', status: 'terverifikasi', waktuLapor: '3 jam lalu' },
  { id: '3', komoditas: 'Cabai Rawit', harga: 75000, satuan: 'kg', kota: 'Surabaya', pasar: 'Pasar Wonokromo', tanggal: '2025-01-15', status: 'menunggu', waktuLapor: '1 jam lalu' },
  { id: '4', komoditas: 'Telur Ayam', harga: 32500, satuan: 'kg', kota: 'Yogyakarta', pasar: 'Pasar Beringharjo', tanggal: '2025-01-15', status: 'terverifikasi', waktuLapor: '4 jam lalu' },
  { id: '5', komoditas: 'Bawang Merah', harga: 43500, satuan: 'kg', kota: 'Semarang', pasar: 'Pasar Johar', tanggal: '2025-01-15', status: 'menunggu', waktuLapor: '30 menit lalu' },
];

export const beritaList: Berita[] = [
  {
    id: '1',
    judul: 'Harga Cabai Mulai Turun, Ini Penyebabnya',
    ringkasan: 'Harga cabai merah dan rawit mengalami penurunan signifikan di berbagai pasar tradisional.',
    konten: 'Harga cabai merah dan rawit mengalami penurunan signifikan di berbagai pasar tradisional. Penurunan ini disebabkan oleh panen raya di berbagai daerah sentra produksi.',
    gambar: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    tanggal: '2025-01-15',
    kategori: 'Analisis',
    penulis: 'Tim HargaKita'
  },
  {
    id: '2',
    judul: 'Menteri Perdagangan Pastikan Stok Beras Aman',
    ringkasan: 'Pemerintah menjamin ketersediaan beras nasional aman hingga awal tahun depan.',
    konten: 'Pemerintah menjamin ketersediaan beras nasional aman hingga awal tahun depan. Stok cadangan pemerintah dan produksi petani dinilai cukup untuk memenuhi kebutuhan masyarakat.',
    gambar: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1200&q=80',
    tanggal: '2025-01-14',
    kategori: 'Berita',
    penulis: 'Tim HargaKita'
  },
  {
    id: '3',
    judul: 'Tips Hemat Belanja Bulanan di Awal Tahun',
    ringkasan: 'Strategi cerdas untuk mengelola pengeluaran belanja kebutuhan pokok.',
    konten: 'Strategi cerdas untuk mengelola pengeluaran belanja kebutuhan pokok. Dengan perencanaan yang tepat, Anda bisa menghemat hingga 20% dari anggaran belanja bulanan.',
    gambar: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
    tanggal: '2025-01-13',
    kategori: 'Analisis',
    penulis: 'Tim HargaKita'
  },
  {
    id: '4',
    judul: 'Inflasi Bahan Pokok Terkendali, Harga Beras Stabil',
    ringkasan: 'Harga beras premium dan medium stabil setelah pasokan meningkat di Jawa dan Sumatera.',
    konten: 'Pasokan beras dari sentra produksi seperti Karawang dan Indramayu meningkat, sehingga harga beras premium dan medium di pasar tradisional tetap stabil. Langkah ini diharapkan menjamin ketersediaan pangan menjelang bulan ramadan.',
    gambar: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80',
    tanggal: '2025-01-12',
    kategori: 'Berita',
    penulis: 'Tim HargaKita'
  },
  {
    id: '5',
    judul: 'Analisis: Permintaan Minyak Goreng Naik Jelang Libur Nasional',
    ringkasan: 'Permintaan minyak goreng diprediksi naik sementara distribusi mulai menyesuaikan stok.',
    konten: 'Menjelang libur nasional, permintaan minyak goreng diprediksi meningkat tajam di kota-kota besar. Pedagang dan distributor mulai menyesuaikan stok untuk menjaga ketersediaan dan menahan lonjakan harga.',
    gambar: 'https://images.unsplash.com/photo-1589927986089-35812386f3ef?auto=format&fit=crop&w=1200&q=80',
    tanggal: '2025-01-11',
    kategori: 'Analisis',
    penulis: 'Tim HargaKita'
  },
];

export const statistikPlatform: StatistikPlatform = {
  totalLaporan: 15432,
  jumlahKota: 514,
  jumlahKomoditas: 28,
  penggunaHariIni: 8934,
};

export const generateTrenData = (days: number = 30): { labels: string[]; data: number[] } => {
  const labels: string[] = [];
  const data: number[] = [];
  const basePrice = 15000;
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    labels.push(date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }));
    
    const randomChange = (Math.random() - 0.5) * 1000;
    data.push(Math.round(basePrice + randomChange + (days - i) * 20));
  }
  
  return { labels, data };
};

export const getKomoditasByKategori = (kategori: string): Komoditas[] => {
  return komoditasList.filter(k => k.kategori === kategori);
};

export const getKomoditasById = (id: string): Komoditas | undefined => {
  return komoditasList.find(k => k.id === id);
};

export const getKotaByRegion = (region: string): Kota[] => {
  return kotaList.filter(k => k.region === region);
};

export const getKotaById = (id: string): Kota | undefined => {
  return kotaList.find(k => k.id === id);
};
