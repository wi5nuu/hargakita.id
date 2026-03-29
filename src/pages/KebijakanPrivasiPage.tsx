import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function KebijakanPrivasiPage() {
  return (
    <main id="main-content" className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-primary">Beranda</Link>
          <span>/</span>
          <span className="text-gray-900">Kebijakan Privasi</span>
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
            <Shield className="w-8 h-8 text-primary" />
            Kebijakan Privasi
          </h1>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 prose max-w-none">
          <p className="text-gray-600">
            Kebijakan Privasi ini menjelaskan bagaimana HargaKita.id mengumpulkan, menggunakan, 
            dan melindungi informasi Anda saat menggunakan platform kami.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
            1. Informasi yang Kami Kumpulkan
          </h2>
          <p className="text-gray-600">
            Kami mengumpulkan informasi berikut:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Informasi lokasi (jika Anda mengizinkan)</li>
            <li>Data laporan harga yang Anda kirimkan</li>
            <li>Informasi kontak saat Anda menghubungi kami</li>
            <li>Data penggunaan website (anonim)</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
            2. Penggunaan Informasi
          </h2>
          <p className="text-gray-600">
            Informasi yang kami kumpulkan digunakan untuk:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Menampilkan harga bahan pokok di daerah Anda</li>
            <li>Meverifikasi dan menampilkan laporan harga dari masyarakat</li>
            <li>Meningkatkan kualitas layanan kami</li>
            <li>Berkomunikasi dengan Anda jika diperlukan</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
            3. Perlindungan Data
          </h2>
          <p className="text-gray-600">
            Kami mengambil langkah-langkah keamanan yang sesuai untuk melindungi informasi Anda 
            dari akses, perubahan, pengungkapan, atau penghancuran yang tidak sah. Data Anda 
            disimpan dengan aman dan hanya dapat diakses oleh personel yang berwenang.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
            4. Berbagi Informasi
          </h2>
          <p className="text-gray-600">
            Kami tidak menjual, memperdagangkan, atau mentransfer informasi pribadi Anda kepada 
            pihak ketiga. Informasi Anda hanya digunakan untuk keperluan operasional platform ini.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
            5. Cookie dan Teknologi Pelacakan
          </h2>
          <p className="text-gray-600">
            Kami menggunakan cookie untuk meningkatkan pengalaman pengguna, mengingat preferensi, 
            dan menganalisis penggunaan website. Anda dapat menonaktifkan cookie melalui pengaturan 
            browser Anda.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
            6. Hak Anda
          </h2>
          <p className="text-gray-600">
            Anda memiliki hak untuk:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Mengakses informasi pribadi Anda</li>
            <li>Meminta koreksi data yang tidak akurat</li>
            <li>Meminta penghapusan data Anda</li>
            <li>Menolak penggunaan data untuk tertentu</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
            7. Perubahan Kebijakan
          </h2>
          <p className="text-gray-600">
            Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Perubahan akan 
            diposting di halaman ini dengan tanggal revisi yang diperbarui.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
            8. Hubungi Kami
          </h2>
          <p className="text-gray-600">
            Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, silakan hubungi kami 
            melalui email di info@hargakita.id.
          </p>

          <p className="text-sm text-gray-500 mt-8">
            Terakhir diperbarui: Januari 2025
          </p>
        </div>
      </div>
    </main>
  );
}
