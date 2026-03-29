import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Home, 
  Settings, 
  Construction, 
  Clock,
  LayoutGrid
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function UnderConstructionPage() {
  return (
    <main id="main-content" className="min-h-[80vh] bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-4xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Info Card */}
          <div className="md:col-span-2 bg-white p-8 rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-center items-center text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
              <Construction className="w-10 h-10 text-primary animate-bounce" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Halaman Sedang Dikembangkan
            </h1>
            <p className="text-gray-600 mb-8 max-w-md">
              Tim kami sedang bekerja keras untuk menghadirkan fitur ini bagi Anda. 
              Silakan periksa kembali dalam waktu dekat!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/">
                <Button className="bg-primary hover:bg-primary/90 gap-2">
                  <Home className="w-4 h-4" />
                  Kembali ke Beranda
                </Button>
              </Link>
              <Button variant="outline" onClick={() => window.history.back()} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Halaman Sebelumnya
              </Button>
            </div>
          </div>

          {/* Side Cards (Bento style) */}
          <div className="space-y-6">
            <div className="bg-primary p-6 rounded-3xl text-white">
              <Clock className="w-8 h-8 mb-4 opacity-80" />
              <h3 className="font-bold text-lg mb-2">Update Terakhir</h3>
              <p className="text-sm text-white/80">
                Pengerjaan bagian ini sudah mencapai 65%. Nantikan updatenya segera!
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
              <Settings className="w-8 h-8 mb-4 text-gray-400" />
              <h3 className="font-bold text-lg text-gray-900 mb-2">Sistem Stabil</h3>
              <p className="text-sm text-gray-500">
                Layanan inti HargaKita tetap berjalan normal selama pemeliharaan.
              </p>
            </div>

            <div className="bg-gray-900 p-6 rounded-3xl text-white">
              <LayoutGrid className="w-8 h-8 mb-4 text-primary" />
              <h3 className="font-bold text-lg mb-2">Fitur Lain</h3>
              <p className="text-sm text-white/60">
                Coba jelajahi fitur Harga Hari Ini atau Laporan Warga.
              </p>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            Ada pertanyaan mendesak? 
            <Link to="/kontak" className="text-primary hover:underline ml-1">Hubungi Tim Support</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
