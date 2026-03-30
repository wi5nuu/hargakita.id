import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  TrendingUp, 
  CheckCircle2,
  Building2,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useGeolocation } from '@/hooks/useHarga';
import { kotaList } from '@/data';

export function Hero() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const { city, loading: locLoading, detectLocation } = useGeolocation();

  const filteredCities = kotaList.filter(k => 
    k.nama.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5);

  const handleCitySelect = (cityId: string) => {
    window.location.href = `/kota/${cityId}`;
  };

  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-white to-primary/5 h-[calc(100vh-4rem)] min-h-[calc(100vh-4rem)] lg:h-[calc(100vh-5rem)] lg:min-h-[calc(100vh-5rem)] pt-10 pb-8 lg:pt-16 lg:pb-14">
      <div className="container mx-auto px-4 flex h-full items-start justify-center">
        <div className="max-w-4xl mx-auto text-center mt-8 md:mt-10">
          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Diperbarui setiap 1 jam
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
              <Building2 className="w-3 h-3 mr-1" />
              34 Provinsi
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-100">
              <RefreshCw className="w-3 h-3 mr-1" />
              Gratis
            </Badge>
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight tracking-tight">
            Harga Sembako Hari Ini
            <span className="block text-primary">di Indonesia</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Data real-time dari 500+ pasar di 34 provinsi. Pantau harga bahan pokok 
            favoritmu tanpa perlu login.
          </p>

          {/* Search Box */}
          <div className="max-w-xl mx-auto mb-6 px-2 sm:px-0">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Cari kota atau komoditas..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowCityDropdown(e.target.value.length > 0);
                }}
                onFocus={() => setShowCityDropdown(searchQuery.length > 0)}
                className="pl-12 pr-4 py-5 text-base bg-white border-2 border-gray-200 focus:border-primary rounded-2xl shadow-lg"
              />
              
              {/* City Dropdown */}
              {showCityDropdown && filteredCities.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 z-20">
                  {filteredCities.map((city) => (
                    <button
                      key={city.id}
                      onClick={() => handleCitySelect(city.id)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left first:rounded-t-xl last:rounded-b-xl"
                    >
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <div>
                        <span className="font-medium text-gray-900">{city.nama}</span>
                        <span className="text-sm text-gray-500 ml-2">{city.provinsi}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 text-white px-4 py-3"
              onClick={detectLocation}
              disabled={locLoading}
            >
              <MapPin className="w-4 h-4 mr-2" />
              {locLoading ? 'Mendeteksi...' : city ? `Harga di ${city}` : 'Pilih Kotamu'}
            </Button>
            <Link to="/harga">
              <Button
                size="sm"
                variant="outline"
                className="border-2 px-4 py-3"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Lihat Semua Harga
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="mt-12 grid grid-cols-3 md:grid-cols-3 gap-4 md:gap-8 max-w-lg mx-auto">
            <div className="text-center p-2">
              <div className="text-2xl md:text-3xl font-bold text-primary">500+</div>
              <div className="text-xs md:text-sm text-gray-600">Pasar Terpantau</div>
            </div>
            <div className="text-center p-2 border-x border-gray-100">
              <div className="text-2xl md:text-3xl font-bold text-primary">28</div>
              <div className="text-xs md:text-sm text-gray-600">Komoditas</div>
            </div>
            <div className="text-center p-2">
              <div className="text-2xl md:text-3xl font-bold text-primary">34</div>
              <div className="text-xs md:text-sm text-gray-600">Provinsi</div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
    </section>
  );
}
