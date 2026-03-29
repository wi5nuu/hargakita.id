import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useHargaKomoditas } from '@/hooks/useHarga';
import type { Komoditas } from '@/types';

function formatRupiah(harga: number): string {
  // Safe number formatting with fallback
  const validHarga = Number(harga) || 0;
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(validHarga);
}

function KomoditasRow({ komoditas }: { komoditas: Komoditas }) {
  const getTrendIcon = () => {
    switch (komoditas.tren) {
      case 'naik':
        return <TrendingUp className="w-4 h-4" />;
      case 'turun':
        return <TrendingDown className="w-4 h-4" />;
      default:
        return <Minus className="w-4 h-4" />;
    }
  };

  const getTrendClass = () => {
    switch (komoditas.tren) {
      case 'naik':
        return 'text-red-600 bg-red-50';
      case 'turun':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <Link to={`/harga/${komoditas.id || (komoditas as any).$id}`} className="block">
      <div className="flex items-center justify-between p-4 md:p-5 bg-white border border-gray-100 rounded-xl hover:shadow-md hover:border-gray-200 transition-all duration-200 gap-3 group">
        <div className="min-w-0">
          <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors truncate text-base mb-1">
            {komoditas.nama || 'Tanpa Nama'}
          </h3>
          <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-wide font-medium">
            <span>per {komoditas.satuan || 'UNIT'}</span>
            <span>•</span>
            <span>{komoditas.kategori || 'Lainnya'}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <div className="text-right">
            <div className="text-sm md:text-lg font-bold text-gray-900 leading-none mb-1">
              {formatRupiah(komoditas.harga)}
            </div>
            <div className="text-[10px] text-gray-400 whitespace-nowrap font-medium">
              Prev {formatRupiah(komoditas.hargaSebelumnya)}
            </div>
          </div>

          <div className={`flex items-center gap-0.5 px-2 py-1 rounded-lg ${getTrendClass()}`}>
            {getTrendIcon()}
            <span className="font-bold text-[10px] md:text-xs">
              {Number(komoditas.perubahanPersen || 0).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function HargaPage() {
  const { data: komoditas, loading } = useHargaKomoditas();
  const [searchQuery, setSearchQuery] = useState('');
  const [kategoriFilter, setKategoriFilter] = useState<string>('semua');

  // Robust filtering preventing undefined crashes
  const filteredKomoditas = komoditas?.filter(k => {
    const rawNama = k?.nama || '';
    const rawKategori = k?.kategori || '';
    
    const matchesSearch = rawNama.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesKategori = kategoriFilter === 'semua' || rawKategori.toLowerCase() === kategoriFilter.toLowerCase();
    
    return matchesSearch && matchesKategori;
  }) || [];

  const kategoriOptions = [
    { value: 'semua', label: 'Semua' },
    { value: 'pokok', label: 'Bahan Pokok' },
    { value: 'protein', label: 'Protein' },
    { value: 'energi', label: 'Energi' },
  ];

  return (
    <main id="main-content" className="min-h-screen bg-gray-50/50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Simplified Minimalist Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            Harga Komoditas
          </h1>
          <p className="text-gray-500 font-medium">
            Daftar lengkap harga bahan pokok dan komoditas lainnya
          </p>
        </div>

        {/* Floating Controls Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {kategoriOptions.map((k) => (
              <button
                key={k.value}
                onClick={() => setKategoriFilter(k.value)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  kategoriFilter === k.value 
                    ? 'bg-gray-900 text-white shadow-md' 
                    : 'bg-white text-gray-500 hover:text-gray-900 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {k.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-64 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Cari komoditas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-gray-200 rounded-full shadow-sm focus:ring-1 focus:ring-gray-900 h-10 w-full"
            />
          </div>
        </div>

        {/* Results List */}
        <div className="space-y-3">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-xl" />
            ))
          ) : filteredKomoditas.length > 0 ? (
            filteredKomoditas.map((k, index) => (
              <KomoditasRow key={k.id || (k as any).$id || index} komoditas={k} />
            ))
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                Data Tidak Ditemukan
              </h3>
              <p className="text-gray-500 text-sm">
                Coba gunakan kata kunci lain atau ubah tab kategori di atas.
              </p>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
