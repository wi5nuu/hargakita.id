import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Navigation, 
  Search,
  ChevronRight,
  Building2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useGeolocation } from '@/hooks/useHarga';
import { kotaList, komoditasList } from '@/data';

function formatRupiah(harga: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(harga);
}

export function PilihKotamu() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const { city: detectedCity, loading: locLoading, detectLocation } = useGeolocation();

  const filteredCities = kotaList.filter(k => 
    k.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    k.provinsi.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 6);

  // Mock harga untuk kota yang dipilih (dalam produksi akan fetch dari API)
  const getCityPrices = () => {
    return komoditasList.slice(0, 5).map(k => ({
      ...k,
      harga: Math.round(k.harga * (0.9 + Math.random() * 0.2)), // Variasi harga 10%
    }));
  };

  return (
    <section id="pilih-kota" className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div>
          <Badge variant="secondary" className="mb-4">
            <MapPin className="w-3 h-3 mr-1" />
            Pilih Lokasi
          </Badge>
          
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Cek Harga di Kotamu
          </h2>
          <p className="text-gray-600 mb-6">
            Klik salah satu kota, lalu lihat harga langsung muncul di bawah nama kota yang kamu pilih.
          </p>

{/* Search Input + Detect Location */}
            <div className="flex items-center gap-3 mb-4 flex-nowrap">
              <div className="relative flex-1 min-w-0">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Cari kota atau kabupaten..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 py-5 bg-white border-2 border-gray-200 focus:border-primary rounded-xl w-full"
                />
              </div>
              <Button
                variant="outline"
                className="flex-shrink-0 gap-2 whitespace-nowrap px-4 py-4"
                onClick={detectLocation}
                disabled={locLoading}
              >
                <Navigation className="w-4 h-4" />
                {locLoading ? 'Mendeteksi lokasi...' : 'Deteksi Lokasi Otomatis'}
              </Button>
            </div>

          {/* City List */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              {searchQuery ? 'Hasil Pencarian' : 'Kota Populer'}
            </h3>
            {(searchQuery ? filteredCities : kotaList.slice(0, 6)).map((city) => (
              <div key={city.id} className="space-y-2">
                <button
                  onClick={() => setSelectedCity(city.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors ${
                    selectedCity === city.id 
                      ? 'bg-primary text-white' 
                      : 'bg-white hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Building2 className={`w-5 h-5 ${
                      selectedCity === city.id ? 'text-white' : 'text-gray-400'
                    }`} />
                    <div className="text-left">
                      <div className="font-medium">{city.nama}</div>
                      <div className={`text-sm ${
                        selectedCity === city.id ? 'text-white/80' : 'text-gray-500'
                      }`}>
                        {city.provinsi}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${
                    selectedCity === city.id ? 'text-white' : 'text-gray-400'
                  }`} />
                </button>

                {selectedCity === city.id && (
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {city.nama}
                        </h3>
                        <p className="text-gray-500">{city.provinsi}</p>
                      </div>
                      <Link to={`/kota/${city.id}`}>
                        <Button variant="outline" size="sm">
                          Lihat Detail
                        </Button>
                      </Link>
                    </div>

                    <div className="space-y-3">
                      {getCityPrices().map((item) => (
                        <div 
                          key={item.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{item.icon}</span>
                            <div>
                              <div className="font-medium text-gray-900">{item.nama}</div>
                              <div className="text-xs text-gray-500">per {item.satuan}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-gray-900">
                              {formatRupiah(item.harga)}
                            </div>
                            <div className={`text-xs ${
                              item.tren === 'naik' ? 'text-red-500' :
                              item.tren === 'turun' ? 'text-blue-500' : 'text-gray-500'
                            }`}>
                              {item.tren === 'naik' ? '↑' : item.tren === 'turun' ? '↓' : '→'}
                              {' '}
                              {item.perubahanPersen > 0 ? '+' : ''}{item.perubahanPersen.toFixed(1)}%
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t text-center">
                      <Link to={`/kota/${city.id}`}>
                        <Button variant="link" className="gap-1">
                          Lihat semua harga di {city.nama}
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {detectedCity && (
            <div className="mt-4 p-4 bg-green-50 rounded-xl">
              <div className="flex items-center gap-2 text-green-700">
                <MapPin className="w-4 h-4" />
                <span className="font-medium">Lokasi terdeteksi: {detectedCity}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
