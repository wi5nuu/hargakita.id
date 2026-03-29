import { useState, useMemo } from 'react';
import { 
  ArrowLeftRight, 
  MapPin, 
  Search, 
  TrendingUp, 
  TrendingDown, 
  Info,
  ChevronDown,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { komoditasList, kotaList } from '@/data';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function BandingkanPage() {
  const [city1, setCity1] = useState(kotaList[0]); // Jakarta
  const [city2, setCity2] = useState(kotaList[1]); // Surabaya
  const [commodity, setCommodity] = useState(komoditasList[0]); // Beras
  
  const [searchCity1, setSearchCity1] = useState('');
  const [searchCity2, setSearchCity2] = useState('');

  // Simulated price variations for cities
  const price1 = useMemo(() => commodity.harga + (Math.random() - 0.5) * 2000, [city1, commodity]);
  const price2 = useMemo(() => commodity.harga + (Math.random() - 0.5) * 2000, [city2, commodity]);

  const chartData = {
    labels: [city1.nama, city2.nama],
    datasets: [
      {
        label: `Harga ${commodity.nama} (Rp)`,
        data: [price1, price2],
        backgroundColor: [
          'rgba(22, 163, 74, 0.8)', // Primary
          'rgba(37, 99, 235, 0.8)', // Blue
        ],
        borderRadius: 12,
        barThickness: 60,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#111827',
        padding: 12,
        titleFont: { size: 14, weight: 'bold' as const },
        bodyFont: { size: 13 },
        cornerRadius: 8,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: { display: false },
        ticks: { font: { size: 12 } }
      },
      x: {
        grid: { display: false },
        ticks: { font: { size: 14, weight: 'bold' as const } }
      }
    }
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA] py-12 px-4 shadow-inner">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl text-primary mb-4">
             <ArrowLeftRight className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
             Bandingkan Harga
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
             Lihat perbandingan harga komoditas antar wilayah secara langsung untuk menemukan harga pasar terbaik.
          </p>
        </div>

        {/* Selection Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 items-start">
           {/* City 1 Selector */}
           <Card className="p-6 rounded-[32px] border-gray-100 shadow-xl shadow-gray-200/50 bg-white">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-4">Wilayah Pertama</span>
              <div className="relative mb-4">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                 <Input 
                   placeholder="Cari Kota 1..." 
                   className="pl-10 rounded-xl"
                   value={searchCity1}
                   onChange={(e) => setSearchCity1(e.target.value)}
                 />
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                 {kotaList.filter(k => k.nama.toLowerCase().includes(searchCity1.toLowerCase())).map(k => (
                    <button 
                      key={k.id}
                      onClick={() => setCity1(k)}
                      className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${city1.id === k.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-gray-50 text-gray-600'}`}
                    >
                       <MapPin className={`w-3 h-3 inline mr-2 ${city1.id === k.id ? 'text-white' : 'text-gray-400'}`} />
                       {k.nama}
                    </button>
                 ))}
              </div>
           </Card>

           {/* Commodity Selector (Middle) */}
           <div className="flex flex-col gap-6">
              <Card className="p-6 rounded-[32px] border-primary/20 bg-primary/5 text-center relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1 bg-primary opacity-20" />
                 <span className="text-[10px] font-bold text-primary/60 uppercase tracking-widest block mb-4">Pilih Komoditas</span>
                 <div className="relative">
                    <select 
                      className="w-full bg-white border border-gray-100 rounded-2xl py-4 px-6 text-lg font-bold text-gray-900 shadow-sm focus:ring-2 focus:ring-primary/20 outline-none appearance-none cursor-pointer"
                      value={commodity.id}
                      onChange={(e) => setCommodity(komoditasList.find(k => k.id === e.target.value)!)}
                    >
                       {komoditasList.map(k => (
                          <option key={k.id} value={k.id}>{k.nama}</option>
                       ))}
                    </select>
                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                 </div>
              </Card>

              <div className="flex items-center justify-center">
                 <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center text-white shadow-xl">
                    <ArrowLeftRight className="w-6 h-6" />
                 </div>
              </div>

              <Card className="p-8 rounded-[32px] border-gray-900 bg-gray-900 text-white text-center shadow-2xl">
                 <h4 className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-2">Selisih Harga</h4>
                 <div className="text-4xl font-extrabold mb-2">
                    Rp {Math.abs(price1 - price2).toLocaleString('id-ID')}
                 </div>
                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-primary-foreground">
                    {price1 > price2 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {((Math.abs(price1 - price2) / Math.min(price1, price2)) * 100).toFixed(1)}% Perbedaan
                 </div>
              </Card>
           </div>

           {/* City 2 Selector */}
           <Card className="p-6 rounded-[32px] border-gray-100 shadow-xl shadow-gray-200/50 bg-white">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-4">Wilayah Kedua</span>
              <div className="relative mb-4">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                 <Input 
                   placeholder="Cari Kota 2..." 
                   className="pl-10 rounded-xl"
                   value={searchCity2}
                   onChange={(e) => setSearchCity2(e.target.value)}
                 />
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                 {kotaList.filter(k => k.nama.toLowerCase().includes(searchCity2.toLowerCase())).map(k => (
                    <button 
                      key={k.id}
                      onClick={() => setCity2(k)}
                      className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${city2.id === k.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'hover:bg-gray-50 text-gray-600'}`}
                    >
                       <MapPin className={`w-3 h-3 inline mr-2 ${city2.id === k.id ? 'text-white' : 'text-gray-400'}`} />
                       {k.nama}
                    </button>
                 ))}
              </div>
           </Card>
        </div>

        {/* Visual Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card className="p-8 rounded-[40px] border-gray-100 shadow-xl bg-white flex flex-col items-center justify-center min-h-[400px]">
                <div className="flex items-center gap-3 mb-8">
                   <BarChart3 className="w-6 h-6 text-primary" />
                   <h3 className="text-xl font-extrabold text-gray-900">Perbandingan Visual</h3>
                </div>
                <div className="w-full h-64">
                    <Bar data={chartData} options={chartOptions} />
                </div>
            </Card>

            <div className="grid grid-cols-1 gap-6">
                {/* Result Card 1 */}
                <Card className="p-6 rounded-[32px] border-l-8 border-l-primary border-transparent bg-white shadow-lg flex items-center justify-between">
                    <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Harga di {city1.nama}</span>
                        <div className="text-2xl font-black text-gray-900">Rp {price1.toLocaleString('id-ID')}</div>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                        <MapPin className="w-6 h-6" />
                    </div>
                </Card>

                {/* Result Card 2 */}
                <Card className="p-6 rounded-[32px] border-l-8 border-l-blue-600 border-transparent bg-white shadow-lg flex items-center justify-between">
                    <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Harga di {city2.nama}</span>
                        <div className="text-2xl font-black text-gray-900">Rp {price2.toLocaleString('id-ID')}</div>
                    </div>
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                        <MapPin className="w-6 h-6" />
                    </div>
                </Card>

                <Card className="p-6 rounded-[32px] border-gray-100 bg-gray-50/50 border border-dashed flex items-start gap-4">
                    <Info className="w-6 h-6 text-gray-400 shrink-0" />
                    <p className="text-xs text-gray-500 leading-relaxed">
                        Data ini merupakan perbandingan rata-rata tertimbang dari laporan pasar di masing-masing kota dalam 24 jam terakhir. 
                        Klik pada rincian wilayah untuk melihat daftar pasar spesifik.
                    </p>
                </Card>
            </div>
        </div>

        {/* Action Button */}
        <div className="text-center">
            <Button size="lg" className="rounded-full px-12 h-16 text-lg font-bold bg-gray-900 hover:bg-black text-white shadow-2xl shadow-gray-400 animate-bounce-slow">
               Simpan Hasil Perbandingan
            </Button>
        </div>
      </div>
    </main>
  );
}
