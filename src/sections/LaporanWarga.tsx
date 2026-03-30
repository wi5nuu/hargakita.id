import { Link } from 'react-router-dom';
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  MapPin,
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useLaporanWarga } from '@/hooks/useHarga';

function formatRupiah(harga: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(harga);
}

function LaporanCard({ laporan }: { laporan: any }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
            <span className="text-base">
              {laporan.komoditas.includes('Beras') ? '🌾' :
               laporan.komoditas.includes('Minyak') ? '🫙' :
               laporan.komoditas.includes('Cabai') ? '🌶️' :
               laporan.komoditas.includes('Telur') ? '🥚' :
               laporan.komoditas.includes('Bawang') ? '🧅' : '🛒'}
            </span>
          </div>
          <div className="min-w-0">
            <h4 className="font-medium text-gray-900 text-sm truncate">{laporan.komoditas}</h4>
            <div className="flex flex-wrap items-center gap-1 text-[11px] text-gray-500">
              <MapPin className="w-3 h-3" />
              <span className="truncate">{laporan.kota}{laporan.pasar ? ` • ${laporan.pasar}` : ''}</span>
            </div>
          </div>
        </div>
        <Badge 
          variant={laporan.status === 'terverifikasi' ? 'default' : 'secondary'}
          className={`text-xs py-1 px-2 rounded-full ${laporan.status === 'terverifikasi' ? 'bg-green-100 text-green-700' : ''}`}
        >
          {laporan.status === 'terverifikasi' ? (
            <><CheckCircle2 className="w-3 h-3 mr-1" /> Terverifikasi</>
          ) : (
            <><Clock className="w-3 h-3 mr-1" /> Menunggu</>
          )}
        </Badge>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-lg sm:text-xl font-semibold text-gray-900">
            {formatRupiah(laporan.harga)}
          </div>
          <div className="text-[11px] text-gray-500">
            per {laporan.satuan}
          </div>
        </div>
        <div className="text-right min-w-[80px]">
          <div className="flex items-center gap-1 text-[11px] text-gray-500 justify-end">
            <Clock className="w-3 h-3" />
            <span>{laporan.waktuLapor}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SkeletonLaporan() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-3">
      <div className="flex items-start gap-3 mb-2">
        <Skeleton className="w-9 h-9 rounded-lg" />
        <div className="flex-1 min-w-0">
          <Skeleton className="h-4 w-28 mb-2" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="h-5 w-16" />
      </div>
      <div className="flex justify-between gap-3">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-4 w-14" />
      </div>
    </div>
  );
}

export function LaporanWargaSection() {
  const { data: laporan, loading } = useLaporanWarga();

  return (
    <section id="laporan-warga" className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <Badge variant="secondary" className="mb-2">
              <Users className="w-3 h-3 mr-1" />
              Komunitas
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Laporan Warga Terbaru
            </h2>
            <p className="text-gray-600 mt-1">
              Harga yang dilaporkan langsung oleh masyarakat dari berbagai daerah
            </p>
          </div>

          <Link to="/lapor">
            <Button className="bg-primary hover:bg-primary/90 gap-2">
              <MessageSquare className="w-4 h-4" />
              Lapor Harga
            </Button>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <SkeletonLaporan key={i} />
            ))
          ) : (
            laporan?.slice(0, 6).map((l) => (
              <LaporanCard key={l.id} laporan={l} />
            ))
          )}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link to="/laporan">
            <Button variant="outline" className="gap-2">
              Lihat Semua Laporan
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
