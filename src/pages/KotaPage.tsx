import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Building2,
  ArrowLeft,
  Navigation
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useGeolocation } from '@/hooks/useHarga';
import { kotaList } from '@/data';

export function KotaPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { city: detectedCity, loading: locLoading, detectLocation } = useGeolocation();

  const regions = [
    { id: 'jawa', name: 'Jawa', color: 'bg-blue-100 text-blue-700' },
    { id: 'sumatera', name: 'Sumatera', color: 'bg-green-100 text-green-700' },
    { id: 'kalimantan', name: 'Kalimantan', color: 'bg-orange-100 text-orange-700' },
    { id: 'sulawesi', name: 'Sulawesi', color: 'bg-purple-100 text-purple-700' },
    { id: 'timur', name: 'Timur', color: 'bg-pink-100 text-pink-700' },
  ];

  const filteredKota = kotaList.filter(k => 
    k.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    k.provinsi.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const kotaByRegion = regions.map(region => ({
    ...region,
    kota: filteredKota.filter(k => k.region === region.id),
  }));

  return (
    <main id="main-content" className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-primary">Beranda</Link>
          <span>/</span>
          <span className="text-gray-900">Daftar Kota</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link to="/">
                <Button variant="ghost" size="sm" className="gap-1">
                  <ArrowLeft className="w-4 h-4" />
                  Kembali
                </Button>
              </Link>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Building2 className="w-8 h-8 text-primary" />
              Daftar Kota
            </h1>
            <p className="text-gray-600 mt-1">
              Pilih kota untuk melihat harga bahan pokok di daerah tersebut
            </p>
          </div>
        </div>

        {/* Search & Detect */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Cari kota atau provinsi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={detectLocation}
              disabled={locLoading}
              className="gap-2"
            >
              <Navigation className="w-4 h-4" />
              {locLoading ? 'Mendeteksi...' : 'Deteksi Lokasi'}
            </Button>
          </div>
        </div>

        {/* Detected City */}
        {detectedCity && (
          <div className="mb-6 p-4 bg-green-50 rounded-xl border border-green-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-green-600" />
                <div>
                  <div className="text-sm text-green-600">Lokasi terdeteksi</div>
                  <div className="font-semibold text-green-900">{detectedCity}</div>
                </div>
              </div>
              <Link to={`/kota/${detectedCity.toLowerCase()}`}>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  Lihat Harga
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Cities by Region */}
        <div className="space-y-8">
          {kotaByRegion.map((region) => (
            region.kota.length > 0 && (
              <div key={region.id}>
                <Badge className={`${region.color} mb-4`}>
                  {region.name}
                </Badge>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {region.kota.map((kota) => (
                    <Link key={kota.id} to={`/kota/${kota.id}`}>
                      <div className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-primary transition-all">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="font-medium text-gray-900">{kota.nama}</div>
                          <div className="text-xs text-gray-500">{kota.provinsi}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>

        {/* Empty State */}
        {filteredKota.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Kota tidak ditemukan
            </h3>
            <p className="text-gray-500">
              Coba kata kunci lain
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
