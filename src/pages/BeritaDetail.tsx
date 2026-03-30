import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
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

export function BeritaDetail() {
  const { id } = useParams<{ id: string }>();
  const berita = beritaList.find((item) => item.id === id);

  if (!berita) {
    return (
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Berita tidak ditemukan
            </h1>
            <Link to="/berita">
              <Button>Kembali ke Berita</Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-primary">Beranda</Link>
          <span>/</span>
          <Link to="/berita" className="hover:text-primary">Berita & Analisis</Link>
          <span>/</span>
          <span className="text-gray-900">{berita.judul}</span>
        </div>

        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <Link to="/berita">
              <Button variant="ghost" size="sm" className="gap-1">
                <ArrowLeft className="w-4 h-4" />
                Kembali
              </Button>
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className={getCategoryColor(berita.kategori)}>
              <Tag className="w-3 h-3 mr-1" />
              {berita.kategori}
            </Badge>
            <span className="inline-flex items-center gap-1 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              {new Date(berita.tanggal).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <span className="inline-flex items-center gap-1 text-sm text-gray-500">
              <User className="w-4 h-4" />
              {berita.penulis}
            </span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
          {berita.gambar ? (
            <div className="aspect-video overflow-hidden bg-gray-100">
              <img
                src={berita.gambar}
                alt={berita.judul}
                className="w-full h-full object-cover"
              />
            </div>
          ) : null}
          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {berita.judul}
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {berita.ringkasan}
            </p>
            <div className="text-gray-700 leading-relaxed space-y-6">
              <p>{berita.konten}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
