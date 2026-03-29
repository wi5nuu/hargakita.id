import { Link } from 'react-router-dom';
import { 
  Newspaper, 
  Calendar, 
  User, 
  ArrowRight,
  Tag
} from 'lucide-react';
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

function BeritaCard({ berita, featured = false }: { berita: any; featured?: boolean }) {
  if (featured) {
    return (
      <Link to={`/berita/${berita.id}`}>
        <div className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow h-full">
          <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <Newspaper className="w-16 h-16 text-primary/40" />
          </div>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <Badge className={getCategoryColor(berita.kategori)}>
                <Tag className="w-3 h-3 mr-1" />
                {berita.kategori}
              </Badge>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(berita.tanggal).toLocaleDateString('id-ID', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
              {berita.judul}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-2">
              {berita.ringkasan}
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <User className="w-4 h-4" />
              {berita.penulis}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/berita/${berita.id}`}>
      <div className="group flex gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
        <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center flex-shrink-0">
          <Newspaper className="w-8 h-8 text-primary/40" />
        </div>
        <div className="flex-1 min-w-0">
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
          <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
            {berita.judul}
          </h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-1">
            {berita.ringkasan}
          </p>
        </div>
      </div>
    </Link>
  );
}

export function BeritaSection() {
  const featuredBerita = beritaList[0];
  const otherBerita = beritaList.slice(1);

  return (
    <section id="berita" className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <Badge variant="secondary" className="mb-2">
              <Newspaper className="w-3 h-3 mr-1" />
              Informasi
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Berita & Analisis
            </h2>
            <p className="text-gray-600 mt-1">
              Update terbaru seputar harga pangan dan ekonomi
            </p>
          </div>

          <Link to="/berita">
            <Button variant="outline" className="gap-2">
              Baca Semua Berita
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Featured Article */}
          <BeritaCard berita={featuredBerita} featured />

          {/* Other Articles */}
          <div className="space-y-4">
            {otherBerita.map((berita) => (
              <BeritaCard key={berita.id} berita={berita} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
