import { useState } from 'react';
import { MapPin, Info, TrendingUp, TrendingDown, Minus, Filter, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface RegionalPrice {
  id: string;
  name: string;
  price: number;
  trend: 'naik' | 'turun' | 'stabil';
  change: number;
}

const mockRegionalData: RegionalPrice[] = [
  { id: 'sumatera', name: 'Sumatera', price: 15400, trend: 'naik', change: 1.2 },
  { id: 'jawa', name: 'Jawa', price: 14800, trend: 'turun', change: -0.5 },
  { id: 'kalimantan', name: 'Kalimantan', price: 16200, trend: 'naik', change: 2.1 },
  { id: 'sulawesi', name: 'Sulawesi', price: 15100, trend: 'stabil', change: 0 },
  { id: 'bali-nusa', name: 'Bali & Nusa Tenggara', price: 15900, trend: 'naik', change: 0.8 },
  { id: 'maluku-papua', name: 'Maluku & Papua', price: 18500, trend: 'naik', change: 3.4 },
];

export function PetaPage() {
  const [selectedRegion, setSelectedRegion] = useState<RegionalPrice | null>(mockRegionalData[1]); // Jawa by default
  const selectedCommodity = 'Beras Premium';

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'naik': return <TrendingUp className="w-3 h-3" />;
      case 'turun': return <TrendingDown className="w-3 h-3" />;
      default: return <Minus className="w-3 h-3" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'naik': return 'text-red-600 bg-red-50';
      case 'turun': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <main className="min-h-screen bg-gray-50/50 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <Badge variant="outline" className="mb-3 border-primary/20 text-primary bg-primary/5 px-3 py-1">
              Fitur Baru: Visualisasi Spasial
            </Badge>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
              Peta Harga Nasional
            </h1>
            <p className="text-gray-600 text-lg">
              Visualisasi sebaran harga bahan pokok secara real-time di seluruh wilayah Indonesia. 
              Pilih wilayah atau komoditas untuk melihat detail lebih lanjut.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="rounded-xl border-gray-200 shadow-sm bg-white">
              <Filter className="w-4 h-4 mr-2" />
              Filter Wilayah
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/20 px-6">
              <Layers className="w-4 h-4 mr-2" />
              Ganti Komoditas
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Viewer */}
          <Card className="lg:col-span-2 p-6 rounded-3xl border-gray-100 shadow-xl shadow-gray-200/50 bg-white relative overflow-hidden min-h-[400px] flex flex-col items-center justify-center">
            <div className="absolute top-6 left-6 z-10">
               <div className="bg-white/80 backdrop-blur-sm border border-gray-100 p-3 rounded-2xl shadow-sm">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Komoditas terpilih</span>
                  <span className="text-sm font-bold text-gray-900">{selectedCommodity}</span>
               </div>
            </div>

            {/* Simplified Indonesia SVG Map */}
            <svg viewBox="0 0 1000 400" className="w-full h-auto drop-shadow-2xl">
              {/* Sumatera */}
              <path 
                d="M50,150 L150,50 L250,150 L200,300 L100,350 Z" 
                className={`transition-all duration-300 cursor-pointer ${selectedRegion?.id === 'sumatera' ? 'fill-primary scale-[1.02]' : 'fill-gray-200 hover:fill-primary/40'}`}
                onClick={() => setSelectedRegion(mockRegionalData[0])}
              />
              {/* Jawa */}
              <path 
                d="M200,310 L450,310 L450,340 L200,340 Z" 
                className={`transition-all duration-300 cursor-pointer ${selectedRegion?.id === 'jawa' ? 'fill-primary scale-[1.02]' : 'fill-gray-200 hover:fill-primary/40'}`}
                onClick={() => setSelectedRegion(mockRegionalData[1])}
              />
              {/* Kalimantan */}
              <path 
                d="M300,50 L500,50 L500,200 L300,200 Z" 
                className={`transition-all duration-300 cursor-pointer ${selectedRegion?.id === 'kalimantan' ? 'fill-primary scale-[1.02]' : 'fill-gray-200 hover:fill-primary/40'}`}
                onClick={() => setSelectedRegion(mockRegionalData[2])}
              />
              {/* Sulawesi */}
              <path 
                d="M550,80 L650,80 L650,220 L550,220 Z" 
                className={`transition-all duration-300 cursor-pointer ${selectedRegion?.id === 'sulawesi' ? 'fill-primary scale-[1.02]' : 'fill-gray-200 hover:fill-primary/40'}`}
                onClick={() => setSelectedRegion(mockRegionalData[3])}
              />
              {/* Bali-Nusa */}
              <path 
                d="M460,320 L750,320 L750,350 L460,350 Z" 
                className={`transition-all duration-300 cursor-pointer ${selectedRegion?.id === 'bali-nusa' ? 'fill-primary scale-[1.02]' : 'fill-gray-200 hover:fill-primary/40'}`}
                onClick={() => setSelectedRegion(mockRegionalData[4])}
              />
              {/* Maluku-Papua */}
              <path 
                d="M750,50 L950,50 L950,250 L750,250 Z" 
                className={`transition-all duration-300 cursor-pointer ${selectedRegion?.id === 'maluku-papua' ? 'fill-primary scale-[1.02]' : 'fill-gray-200 hover:fill-primary/40'}`}
                onClick={() => setSelectedRegion(mockRegionalData[5])}
              />
            </svg>

            <div className="mt-8 grid grid-cols-4 gap-4 w-full max-w-md">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-400" />
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Di Bawah Rata-rata</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-200" />
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Normal</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Di Atas Rata-rata</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Wilayah Terpilih</span>
                </div>
            </div>
          </Card>

          {/* Details Panel */}
          <div className="space-y-6">
            <Card className="p-6 rounded-3xl border-gray-100 shadow-xl shadow-gray-200/50 bg-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedRegion?.name || 'Pilih Wilayah'}</h3>
                  <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold font-mono">ID: {selectedRegion?.id}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <span className="text-sm text-gray-500 block mb-1 font-medium">Harga Rata-rata</span>
                  <div className="flex items-end justify-between">
                    <span className="text-3xl font-extrabold text-gray-900 leading-none">
                      {selectedRegion ? `Rp ${selectedRegion.price.toLocaleString('id-ID')}` : '-'}
                    </span>
                    {selectedRegion && (
                       <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${getTrendColor(selectedRegion.trend)}`}>
                        {getTrendIcon(selectedRegion.trend)}
                        {selectedRegion.change > 0 ? '+' : ''}{selectedRegion.change}%
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white border border-gray-100 rounded-2xl">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Tertinggi</span>
                    <span className="font-bold text-gray-900 block">Rp 16.200</span>
                    <span className="text-[10px] text-gray-500">Papua Barat</span>
                  </div>
                  <div className="p-4 bg-white border border-gray-100 rounded-2xl">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Terendah</span>
                    <span className="font-bold text-gray-900 block">Rp 13.100</span>
                    <span className="text-[10px] text-gray-500">Jawa Timur</span>
                  </div>
                </div>
              </div>

              <Button className="w-full mt-8 bg-gray-900 hover:bg-black text-white rounded-2xl h-14 font-bold shadow-lg shadow-gray-200">
                Lihat Laporan Pasar Terkait
              </Button>
            </Card>

            <Card className="p-6 rounded-3xl border-primary/10 bg-gradient-to-br from-primary to-primary-600 text-white shadow-xl shadow-primary/20">
              <div className="flex items-start gap-3 mb-4">
                <Info className="w-6 h-6 text-white/80" />
                <h4 className="font-bold text-lg leading-tight">Insight Minggu Ini</h4>
              </div>
              <p className="text-white/90 text-sm leading-relaxed mb-6">
                Wilayah **Maluku & Papua** mengalami lonjakan harga tertinggi (+3.4%) akibat kendala logistik
                transportasi laut minggu ini. Segera laporkan jika Anda menemukan harga di atas rata-rata!
              </p>
              <Button className="w-full bg-white text-primary hover:bg-primary/5 font-bold rounded-xl border-none">
                Cara Kami Menghitung
              </Button>
            </Card>
          </div>
        </div>

        {/* Legend/Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="flex gap-4 p-5 rounded-2xl bg-white border border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                  <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                  <h5 className="font-bold text-gray-900 text-sm mb-1">Prediksi Harga</h5>
                  <p className="text-xs text-gray-500 leading-relaxed">Analisis AI memprediksi penurunan harga di Jawa sebesar 2% dalam 3 hari ke depan.</p>
              </div>
           </div>
           <div className="flex gap-4 p-5 rounded-2xl bg-white border border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                  <MapPin className="w-5 h-5" />
              </div>
              <div>
                  <h5 className="font-bold text-gray-900 text-sm mb-1">Cakupan Wilayah</h5>
                  <p className="text-xs text-gray-500 leading-relaxed">Sistem kami memantau harga di 514 kabupaten/kota dan 34 provinsi secara berkelanjutan.</p>
              </div>
           </div>
           <div className="flex gap-4 p-5 rounded-2xl bg-white border border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <Info className="w-5 h-5" />
              </div>
              <div>
                  <h5 className="font-bold text-gray-900 text-sm mb-1">Sumber Data</h5>
                  <p className="text-xs text-gray-500 leading-relaxed">Data dikumpulkan melalui kontribusi warga dan API resmi lembaga pemantau pasar.</p>
              </div>
           </div>
        </div>
      </div>
    </main>
  );
}
