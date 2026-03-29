import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Search, MapPin, TrendingUp, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

const guides = [
  {
    icon: <Search className="w-6 h-6" />,
    title: 'Mencari Harga',
    steps: [
      'Gunakan kotak pencarian di halaman utama',
      'Ketik nama komoditas atau kota yang ingin dicari',
      'Pilih dari hasil yang muncul',
      'Lihat detail harga dan tren',
    ],
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: 'Melihat Harga di Kotamu',
    steps: [
      'Klik tombol "Pilih Kotamu" di halaman utama',
      'Izinkan akses lokasi atau pilih kota manual',
      'Lihat daftar harga bahan pokok di kota tersebut',
      'Bandingkan dengan harga nasional',
    ],
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Membaca Grafik',
    steps: [
      'Pilih komoditas yang ingin dilihat trennya',
      'Pilih periode waktu (7 hari, 30 hari, atau 3 bulan)',
      'Lihat pergerakan harga pada grafik',
      'Analisis tren naik, turun, atau stabil',
    ],
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: 'Melaporkan Harga',
    steps: [
      'Klik tombol "Lapor Harga" di menu',
      'Isi formulir dengan data yang valid',
      'Pilih komoditas, masukkan harga, dan lokasi',
      'Kirim laporan dan tunggu verifikasi',
    ],
  },
];

export function PanduanPage() {
  return (
    <main id="main-content" className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-primary">Beranda</Link>
          <span>/</span>
          <span className="text-gray-900">Panduan Penggunaan</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-1">
                <ArrowLeft className="w-4 h-4" />
                Kembali
              </Button>
            </Link>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-primary" />
            Panduan Penggunaan
          </h1>
          <p className="text-gray-600 mt-1">
            Pelajari cara menggunakan HargaKita.id dengan optimal
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {guides.map((guide, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-primary">
                {guide.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">{guide.title}</h3>
              <ol className="space-y-2">
                {guide.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="flex items-start gap-2 text-gray-600">
                    <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-medium text-primary flex-shrink-0 mt-0.5">
                      {stepIndex + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-gradient-to-r from-primary/5 to-green-50 rounded-2xl p-6 border border-primary/10">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Tips Penggunaan</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Gunakan fitur pencarian untuk menemukan harga dengan cepat</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Pantau tren harga untuk merencanakan belanja bulanan</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Bandingkan harga antar kota sebelum bepergian</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Kontribusi dengan melaporkan harga di daerahmu</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
