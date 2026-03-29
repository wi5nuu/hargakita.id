import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function NotFoundPage() {
  return (
    <main id="main-content" className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
      <div className="container mx-auto px-4 max-w-lg text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-16 h-16 text-primary/40" />
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-gray-600">
            Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
          </p>
        </div>

        {/* Suggestions */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">
            Mungkin Anda mencari:
          </h3>
          <ul className="space-y-2 text-left">
            <li>
              <Link to="/" className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Home className="w-5 h-5 text-primary" />
                <span className="text-gray-700">Beranda</span>
              </Link>
            </li>
            <li>
              <Link to="/harga" className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Search className="w-5 h-5 text-primary" />
                <span className="text-gray-700">Daftar Harga</span>
              </Link>
            </li>
            <li>
              <Link to="/kota" className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Search className="w-5 h-5 text-primary" />
                <span className="text-gray-700">Daftar Kota</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Back Button */}
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Button>
      </div>
    </main>
  );
}
