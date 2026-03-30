import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  ArrowRight,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useHargaKomoditas } from '@/hooks/useHarga';
import type { Komoditas } from '@/types';

type FilterType = 'semua' | 'naik' | 'turun' | 'stabil';

function formatRupiah(harga: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(harga);
}

function KomoditasCard({ komoditas }: { komoditas: Komoditas }) {
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
        return 'badge-naik';
      case 'turun':
        return 'badge-turun';
      default:
        return 'badge-stabil';
    }
  };

  const getPriceTextClass = () => {
    switch (komoditas.tren) {
      case 'naik':
        return 'text-emerald-600';
      case 'turun':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <Link to={`/harga/${komoditas.id}`}>
      <div className="kartu-harga group cursor-pointer h-full p-1.5 sm:p-2 lg:p-3">
        <div className="mb-1.5">
          <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors text-sm">
            {komoditas.nama}
          </h3>
          <span className="text-[10px] text-gray-500 uppercase tracking-[0.12em]">per {komoditas.satuan}</span>
        </div>

        <div className="flex items-start justify-between gap-1">
          <div>
            <div className={`text-base sm:text-lg font-semibold ${getPriceTextClass()}`}>
              {formatRupiah(komoditas.harga)}
            </div>
            <div className="text-[10px] text-gray-500 mt-0.5">
              Sebelumnya {formatRupiah(komoditas.hargaSebelumnya)}
            </div>
          </div>

          <div className={`flex items-center gap-1 text-[10px] sm:text-xs ${getTrendClass()}`}>
            {getTrendIcon()}
            <span className="font-medium">
              {komoditas.perubahanPersen > 0 ? '+' : ''}{komoditas.perubahanPersen.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="flex items-center gap-3 mb-4">
        <Skeleton className="w-12 h-12 rounded-lg" />
        <div className="flex-1">
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
      <Skeleton className="h-8 w-32 mb-2" />
      <Skeleton className="h-3 w-24" />
    </div>
  );
}

export function HargaHariIni() {
  const { data: komoditas, loading } = useHargaKomoditas();
  const [filter, setFilter] = useState<FilterType>('semua');

  const filteredKomoditas = komoditas?.filter(k => {
    if (filter === 'semua') return true;
    return k.tren === filter;
  }) || [];

  const mainKomoditas = filteredKomoditas.slice(0, 8);

  const filters: { value: FilterType; label: string }[] = [
    { value: 'semua', label: 'Semua' },
    { value: 'naik', label: 'Naik' },
    { value: 'turun', label: 'Turun' },
    { value: 'stabil', label: 'Stabil' },
  ];

  return (
    <section id="harga-hari-ini" className="py-8 md:py-10 bg-white">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Harga Hari Ini
            </h2>
            <p className="text-gray-600 mt-1">
              Update terbaru harga bahan pokok di Indonesia
            </p>
          </div>

          {/* Filter */}
          <div className="flex flex-wrap items-center gap-1 text-xs sm:text-sm">
            <Filter className="w-3.5 h-3.5 text-gray-400" />
            <div className="flex flex-wrap gap-1">
              {filters.map((f) => (
                <Button
                  key={f.value}
                  variant={filter === f.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(f.value)}
                  className={filter === f.value ? 'bg-primary' : ''}
                >
                  {f.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 sm:gap-2">
          {loading ? (
            // Skeleton loading
            Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))
          ) : (
            mainKomoditas.map((k) => (
              <KomoditasCard key={k.id} komoditas={k} />
            ))
          )}
        </div>

        {/* CTA */}
        <div className="mt-4 text-center">
          <Link to="/harga">
            <Button variant="outline" className="gap-2">
              Lihat Semua Komoditas
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
