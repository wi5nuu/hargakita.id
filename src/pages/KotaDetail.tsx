import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { 
  ArrowLeft, 
  MapPin, 
  TrendingUp,
  TrendingDown,
  Minus,
  Building2,
  Share2,
  Navigation
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getKotaById, komoditasList, generateTrenData } from '@/data';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

function formatRupiah(harga: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(harga);
}

export function KotaDetail() {
  const { id } = useParams<{ id: string }>();
  const [period, setPeriod] = useState<'7' | '30' | '90'>('30');
  
  const kota = id ? getKotaById(id) : undefined;

  if (!kota) {
    return (
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Kota tidak ditemukan
            </h1>
            <Link to="/kota">
              <Button className="mt-4">Kembali ke Daftar Kota</Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Generate mock prices for this city
  const cityPrices = komoditasList.map(k => ({
    ...k,
    harga: Math.round(k.harga * (0.9 + Math.random() * 0.2)),
  }));

  const naikCount = cityPrices.filter(k => k.tren === 'naik').length;
  const turunCount = cityPrices.filter(k => k.tren === 'turun').length;
  const stabilCount = cityPrices.filter(k => k.tren === 'stabil').length;

  const trenData = generateTrenData(parseInt(period));

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (context: any) => {
            return `Rp ${context.parsed.y.toLocaleString('id-ID')}`;
          },
        },
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        beginAtZero: false,
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
        ticks: {
          callback: (value: any) => 'Rp ' + (value / 1000) + 'K',
        },
      },
    },
  };

  const chartData = {
    labels: trenData.labels,
    datasets: [{
      label: 'Rata-rata Harga',
      data: trenData.data,
      borderColor: '#16a34a',
      backgroundColor: 'rgba(22, 163, 74, 0.1)',
      borderWidth: 2,
      fill: true,
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 6,
    }],
  };

  return (
    <main id="main-content" className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-primary">Beranda</Link>
          <span>/</span>
          <Link to="/kota" className="hover:text-primary">Kota</Link>
          <span>/</span>
          <span className="text-gray-900">{kota.nama}</span>
        </div>

        {/* Header */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-start gap-4">
              <Link to="/kota">
                <Button variant="ghost" size="sm" className="gap-1 -ml-2">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {kota.nama}
                    </h1>
                    <p className="text-gray-500 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {kota.provinsi}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Share2 className="w-4 h-4" />
                Bagikan
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="bg-red-50 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-1 text-red-600 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-2xl font-bold">{naikCount}</span>
              </div>
              <div className="text-sm text-red-600/80">Harga Naik</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
                <TrendingDown className="w-4 h-4" />
                <span className="text-2xl font-bold">{turunCount}</span>
              </div>
              <div className="text-sm text-blue-600/80">Harga Turun</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                <Minus className="w-4 h-4" />
                <span className="text-2xl font-bold">{stabilCount}</span>
              </div>
              <div className="text-sm text-gray-600/80">Stabil</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="harga" className="space-y-6">
          <TabsList className="bg-white border">
            <TabsTrigger value="harga">Daftar Harga</TabsTrigger>
            <TabsTrigger value="grafik">Grafik Tren</TabsTrigger>
            <TabsTrigger value="pasar">Pasar Terpantau</TabsTrigger>
          </TabsList>

          <TabsContent value="harga">
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Harga Bahan Pokok di {kota.nama}
              </h2>
              <div className="space-y-3">
                {cityPrices.map((item) => (
                  <Link key={item.id} to={`/harga/${item.id}`}>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <div className="font-medium text-gray-900">{item.nama}</div>
                          <div className="text-sm text-gray-500">per {item.satuan}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">
                          {formatRupiah(item.harga)}
                        </div>
                        <div className={`text-sm ${
                          item.tren === 'naik' ? 'text-red-500' :
                          item.tren === 'turun' ? 'text-blue-500' : 'text-gray-500'
                        }`}>
                          {item.tren === 'naik' ? '↑' : item.tren === 'turun' ? '↓' : '→'}
                          {' '}
                          {item.perubahanPersen > 0 ? '+' : ''}{item.perubahanPersen.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="grafik">
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Tren Harga di {kota.nama}
                </h2>
                <div className="flex gap-1">
                  {(['7', '30', '90'] as const).map((p) => (
                    <Button
                      key={p}
                      variant={period === p ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPeriod(p)}
                      className={period === p ? 'bg-primary' : ''}
                    >
                      {p} Hari
                    </Button>
                  ))}
                </div>
              </div>
              <div className="h-[300px] md:h-[400px]">
                <Line options={chartOptions} data={chartData} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pasar">
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Pasar Terpantau di {kota.nama}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  `Pasar ${kota.nama}`,
                  `Pasar Modern ${kota.nama}`,
                  `Pasar Tradisional ${kota.nama}`,
                  `Pasar Induk ${kota.nama}`,
                ].map((pasar, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <Building2 className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">{pasar}</div>
                      <div className="text-sm text-gray-500">Data update setiap hari</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
