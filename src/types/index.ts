export interface Komoditas {
  id: string;
  nama: string;
  namaLengkap: string;
  kategori: 'pokok' | 'protein' | 'energi';
  icon: string;
  satuan: string;
  harga: number;
  hargaSebelumnya: number;
  perubahan: number;
  perubahanPersen: number;
  tren: 'naik' | 'turun' | 'stabil';
}

export interface Kota {
  id: string;
  nama: string;
  provinsi: string;
  region: 'jawa' | 'sumatera' | 'kalimantan' | 'sulawesi' | 'timur';
}

export interface HargaData {
  komoditasId: string;
  kotaId: string;
  harga: number;
  tanggal: string;
  pasar?: string;
}

export interface TrenHarga {
  tanggal: string;
  harga: number;
}

export interface LaporanWarga {
  id: string;
  komoditas: string;
  harga: number;
  satuan: string;
  kota: string;
  pasar?: string;
  tanggal: string;
  status: 'terverifikasi' | 'menunggu';
  waktuLapor: string;
}

export interface Berita {
  id: string;
  judul: string;
  ringkasan: string;
  konten: string;
  gambar?: string;
  tanggal: string;
  kategori: string;
  penulis: string;
}

export interface StatistikPlatform {
  totalLaporan: number;
  jumlahKota: number;
  jumlahKomoditas: number;
  penggunaHariIni: number;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavSubItem[];
}

export interface NavSubItem {
  label: string;
  href: string;
  description?: string;
  icon?: string;
  group?: string;
}
