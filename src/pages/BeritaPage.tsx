import { Link } from 'react-router-dom';
import { ArrowLeft, Newspaper, Calendar, User, Tag } from 'lucide-react';
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
    <main id="main-content" className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
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
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="aspect-video md:aspect-[21/9] bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <Newspaper className="w-20 h-20 text-primary/40" />
              </div>
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Badge className={getCategoryColor(beritaList[0].kategori)}>
                    {beritaList[0].kategori}
                  </Badge>
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(beritaList[0].tanggal).toLocaleDateString('id-ID', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 hover:text-primary transition-colors">
                  {beritaList[0].judul}
                </h2>
                <p className="text-gray-600 mb-4">
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {beritaList.slice(1).map((berita) => (
            <Link key={berita.id} to={`/berita/${berita.id}`}>
              <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition-shadow h-full">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <Newspaper className="w-12 h-12 text-primary/30" />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={`${getCategoryColor(berita.kategori)} text-xs`}>
                      {berita.kategori}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {new Date(berita.tanggal).toLocaleDateString('id-ID', { 
                        day: 'numeric', 
                        month: 'short' 
                      })}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 hover:text-primary transition-colors line-clamp-2">
                    {berita.judul}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">
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
