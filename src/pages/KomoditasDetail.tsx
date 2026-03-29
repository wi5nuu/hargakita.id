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
  TrendingUp, 
  TrendingDown, 
  Minus,
  MapPin,
  Info,
  Share2,
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getKomoditasById, kotaList, generateTrenData } from '@/data';

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

export function KomoditasDetail() {
  const { id } = useParams<{ id: string }>();
  const [period, setPeriod] = useState<'7' | '30' | '90'>('30');
  
  const komoditas = id ? getKomoditasById(id) : undefined;

  if (!komoditas) {
    return (
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Komoditas tidak ditemukan
            </h1>
            <Link to="/harga">
              <Button className="mt-4">Kembali ke Daftar Harga</Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

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
      label: komoditas.nama,
      data: trenData.data,
      borderColor: komoditas.tren === 'naik' ? '#dc2626' : komoditas.tren === 'turun' ? '#2563eb' : '#16a34a',
      backgroundColor: komoditas.tren === 'naik' ? 'rgba(220, 38, 38, 0.1)' : komoditas.tren === 'turun' ? 'rgba(37, 99, 235, 0.1)' : 'rgba(22, 163, 74, 0.1)',
      borderWidth: 2,
      fill: true,
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 6,
    }],
  };

  // Mock harga per kota dengan variasi
  const hargaPerKota = kotaList.slice(0, 8).map(kota => ({
    ...kota,
    harga: Math.round(komoditas.harga * (0.85 + Math.random() * 0.3)),
  })).sort((a, b) => a.harga - b.harga);

  const getTrendIcon = () => {
    switch (komoditas.tren) {
      case 'naik':
        return <TrendingUp className="w-6 h-6" />;
      case 'turun':
        return <TrendingDown className="w-6 h-6" />;
      default:
        return <Minus className="w-6 h-6" />;
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
    <main id="main-content" className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-primary">Beranda</Link>
          <span>/</span>
          <Link to="/harga" className="hover:text-primary">Harga</Link>
          <span>/</span>
          <span className="text-gray-900">{komoditas.nama}</span>
        </div>

        {/* Header */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-start gap-4">
              <Link to="/harga">
                <Button variant="ghost" size="sm" className="gap-1 -ml-2">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-4xl">{komoditas.icon}</span>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {komoditas.nama}
                    </h1>
                    <p className="text-gray-500">
                      Harga per {komoditas.satuan} • Update terbaru
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
              <Button variant="outline" size="sm" className="gap-1">
                <Bell className="w-4 h-4" />
                Pantau
              </Button>
            </div>
          </div>

          {/* Price Display */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl md:text-5xl font-bold text-gray-900">
                  {formatRupiah(komoditas.harga)}
                </span>
                <span className="text-gray-500">per {komoditas.satuan}</span>
              </div>

              <div className="flex items-center gap-4 mt-4">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${getTrendClass()}`}>
                  {getTrendIcon()}
                  <span className="font-semibold">
                    {komoditas.perubahan > 0 ? '+' : ''}{komoditas.perubahanPersen.toFixed(2)}%
                  </span>
                  <span className="text-sm opacity-80">
                    ({komoditas.perubahan > 0 ? '+' : ''}{formatRupiah(komoditas.perubahan)})
                  </span>
                </div>
                <span className="text-gray-500 text-sm">
                  dibandingkan harga kemarin
                </span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-sm text-gray-500 mb-1">Rentang Harga Nasional</div>
              <div className="text-xl font-bold text-gray-900">
                {formatRupiah(komoditas.harga * 0.8)} - {formatRupiah(komoditas.harga * 1.2)}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                per {komoditas.satuan}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="grafik" className="space-y-6">
          <TabsList className="bg-white border">
            <TabsTrigger value="grafik">Grafik Harga</TabsTrigger>
            <TabsTrigger value="kota">Harga per Kota</TabsTrigger>
            <TabsTrigger value="info">Informasi</TabsTrigger>
          </TabsList>

          <TabsContent value="grafik">
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Grafik Tren Harga</h2>
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

          <TabsContent value="kota">
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Harga {komoditas.nama} per Kota
              </h2>
              <div className="space-y-3">
                {hargaPerKota.map((kota) => (
                  <Link key={kota.id} to={`/kota/${kota.id}`}>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="font-medium text-gray-900">{kota.nama}</div>
                          <div className="text-sm text-gray-500">{kota.provinsi}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">
                          {formatRupiah(kota.harga)}
                        </div>
                        <div className={`text-sm ${
                          kota.harga > komoditas.harga ? 'text-red-500' : 'text-blue-500'
                        }`}>
                          {kota.harga > komoditas.harga ? '+' : ''}
                          {((kota.harga - komoditas.harga) / komoditas.harga * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="info">
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Tentang {komoditas.nama}
              </h2>
              <div className="prose max-w-none text-gray-600">
                <p className="mb-4">
                  {komoditas.nama} adalah salah satu komoditas penting dalam kebutuhan pokok 
                  masyarakat Indonesia. Harga {komoditas.nama} dipantau secara berkala dari 
                  lebih dari 500 pasar di seluruh Indonesia.
                </p>
                <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                  Faktor yang Mempengaruhi Harga
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Kondisi cuaca dan musim panen</li>
                  <li>Biaya transportasi dan distribusi</li>
                  <li>Permintaan dan pasokan di pasar</li>
                  <li>Kebijakan pemerintah dan impor</li>
                  <li>Kondisi geografis daerah</li>
                </ul>
                <div className="mt-6 p-4 bg-blue-50 rounded-xl flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-blue-900">Catatan</div>
                    <div className="text-sm text-blue-700">
                      Harga dapat bervariasi antar pasar bahkan dalam satu kota yang sama. 
                      Harga yang ditampilkan adalah rata-rata dari beberapa pasar di kota tersebut.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
