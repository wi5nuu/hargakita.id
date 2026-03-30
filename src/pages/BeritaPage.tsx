import { Link } from 'react-router-dom';
import { ArrowLeft, Newspaper, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { beritaList } from '@/data';

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'Analisis': 'bg-blue-100 text-blue-700',
    'Berita': 'bg-green-100 text-green-700',
    'Edukasi': 'bg-purple-100 text-purple-700',
  };
  return colors[category] || 'bg-gray-100 text-gray-700';
}

export function BeritaPage() {
  return (
    <main id="main-content" className="min-h-screen bg-gray-50 py-8 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-5 lg:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-primary">Beranda</Link>
          <span>/</span>
          <span className="text-gray-900">Berita & Analisis</span>
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
            <Newspaper className="w-8 h-8 text-primary" />
            Berita & Analisis
          </h1>
          <p className="text-gray-600 mt-1">
            Update terbaru seputar harga pangan dan ekonomi di Indonesia
          </p>
        </div>

        {/* Featured Article */}
        <div className="mb-8">
          <Link to={`/berita/${beritaList[0].id}`}>
            <div className="mx-auto w-full max-w-[calc(100%-32px)] bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="relative aspect-video min-h-[180px] overflow-hidden bg-gray-100">
                {beritaList[0].gambar ? (
                  <img
                    src={beritaList[0].gambar}
                    alt={beritaList[0].judul}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gradient-to-br from-primary/20 to-primary/5">
                    <Newspaper className="w-20 h-20 text-primary/40" />
                  </div>
                )}
              </div>
              <div className="p-4 md:p-6">
                <div className="flex flex-wrap items-center gap-2 mb-3 text-sm">
                  <Badge className={getCategoryColor(beritaList[0].kategori)}>
                    {beritaList[0].kategori}
                  </Badge>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(beritaList[0].tanggal).toLocaleDateString('id-ID', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-2 hover:text-primary transition-colors">
                  {beritaList[0].judul}
                </h2>
                <p className="text-sm text-gray-600 mb-3">
                  {beritaList[0].ringkasan}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <User className="w-4 h-4" />
                  {beritaList[0].penulis}
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Article Grid */}
        <div className="grid md:grid-cols-2 gap-3">
          {beritaList.slice(1).map((berita) => (
            <Link key={berita.id} to={`/berita/${berita.id}`} className="block w-full min-w-0">
              <div className="mx-auto w-full max-w-[calc(100%-32px)] bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-sm transition-shadow h-full flex flex-col min-w-0">
                <div className="relative aspect-[4/3] min-h-[110px] overflow-hidden bg-gray-100 w-full max-w-full">
                  {berita.gambar ? (
                    <img
                      src={berita.gambar}
                      alt={berita.judul}
                      loading="lazy"
                      className="block w-full h-full max-w-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gradient-to-br from-primary/10 to-primary/5">
                      <Newspaper className="w-10 h-10 text-primary/30" />
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-1 text-[11px]">
                    <Badge className={`${getCategoryColor(berita.kategori)} text-[10px] py-1 px-2`}>
                      {berita.kategori}
                    </Badge>
                    <span className="text-[11px] text-gray-500">
                      {new Date(berita.tanggal).toLocaleDateString('id-ID', { 
                        day: 'numeric', 
                        month: 'short' 
                      })}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm text-gray-900 hover:text-primary transition-colors line-clamp-2">
                    {berita.judul}
                  </h3>
                  <p className="text-[12px] text-gray-500 mt-1 line-clamp-2">
                    {berita.ringkasan}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <Button variant="outline">Muat Lebih Banyak</Button>
        </div>
      </div>
    </main>
  );
}
