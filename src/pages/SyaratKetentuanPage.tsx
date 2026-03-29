import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SyaratKetentuanPage() {
  return (
    <main id="main-content" className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-primary">Beranda</Link>
          <span>/</span>
          <span className="text-gray-900">Syarat & Ketentuan</span>
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
            <FileText className="w-8 h-8 text-primary" />
            Syarat & Ketentuan
          </h1>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 prose max-w-none">
          <p className="text-gray-600">
            Dengan mengakses dan menggunakan HargaKita.id, Anda menyetujui untuk terikat oleh 
            syarat dan ketentuan berikut. Harap baca dengan seksama sebelum menggunakan platform kami.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
            1. Penggunaan Platform
          </h2>
          <p className="text-gray-600">
            HargaKita.id menyediakan informasi harga bahan pokok untuk tujuan informasi umum. 
            Anda setuju untuk menggunakan platform ini dengan cara yang:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Tidak melanggar hukum yang berlaku</li>
            <li>Tidak merugikan pihak lain</li>
            <li>Tidak mengganggu operasional platform</li>
            <li>Tidak menyebarkan informasi palsu atau menyesatkan</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
            2. Akurasi Data
          </h2>
          <p className="text-gray-600">
            Meskipun kami berusaha menyediakan data yang akurat dan terkini, kami tidak menjamin 
            keakuratan, kelengkapan, atau ketersediaan data. Harga aktual di pasar dapat berbeda 
            dari yang ditampilkan di platform. Pengguna disarankan untuk memverifikasi harga 
            langsung di pasar sebelum melakukan transaksi.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
            3. Laporan dari Pengguna
          </h2>
          <p className="text-gray-600">
            Ketika Anda mengirimkan laporan harga, Anda menyatakan bahwa:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Informasi yang diberikan adalah akurat dan benar</li>
            <li>Anda memiliki hak untuk membagikan informasi tersebut</li>
            <li>Anda tidak menyamar sebagai pihak lain</li>
          </ul>
          <p className="text-gray-600 mt-4">
            Kami berhak untuk memverifikasi, mengubah, atau menolak laporan yang tidak memenuhi 
            kriteria kami tanpa memberikan alasan.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
            4. Kekayaan Intelektual
          </h2>
          <p className="text-gray-600">
            Semua konten di HargaKita.id, termasuk teks, grafik, logo, dan kode, dilindungi oleh 
            hak cipta dan hak kekayaan intelektual lainnya. Anda tidak diperbolehkan menyalin, 
            memodifikasi, atau mendistribusikan konten tanpa izin tertulis dari kami.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
            5. Batasan Tanggung Jawab
          </h2>
          <p className="text-gray-600">
            HargaKita.id tidak bertanggung jawab atas:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Kerugian langsung atau tidak langsung dari penggunaan platform</li>
            <li>Ketidakakuratan data yang ditampilkan</li>
            <li>Gangguan atau kehilangan akses ke platform</li>
            <li>Tindakan pihak ketiga yang terhubung melalui platform</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
            6. Perubahan Syarat
          </h2>
          <p className="text-gray-600">
            Kami berhak untuk mengubah syarat dan ketentuan ini kapan saja. Perubahan akan 
            efektif segera setelah diposting di halaman ini. Penggunaan berkelanjutan atas 
            platform setelah perubahan merupakan persetujuan Anda terhadap syarat yang diperbarui.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
            7. Penghentian Akses
          </h2>
          <p className="text-gray-600">
            Kami berhak untuk menghentikan atau membatasi akses Anda ke platform jika kami 
            menentukan bahwa Anda telah melanggar syarat dan ketentuan ini atau berperilaku 
            dengan cara yang merugikan platform atau pengguna lain.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
            8. Hukum yang Berlaku
          </h2>
          <p className="text-gray-600">
            Syarat dan ketentuan ini diatur oleh hukum Republik Indonesia. Setiap perselisihan 
            yang timbul akan diselesaikan secara damai atau melalui jalur hukum yang berlaku.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
            9. Kontak
          </h2>
          <p className="text-gray-600">
            Jika Anda memiliki pertanyaan tentang syarat dan ketentuan ini, silakan hubungi 
            kami melalui email di info@hargakita.id.
          </p>

          <p className="text-sm text-gray-500 mt-8">
            Terakhir diperbarui: Januari 2025
          </p>
        </div>
      </div>
    </main>
  );
}
