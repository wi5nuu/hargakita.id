import { useState } from 'react';
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
import { TrendingUp, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useTrenHarga } from '@/hooks/useHarga';
import { komoditasList } from '@/data';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

type PeriodType = 7 | 30 | 90;

const periodLabels: Record<PeriodType, string> = {
  7: '7 Hari',
  30: '30 Hari',
  90: '3 Bulan',
};

export function GrafikTren() {
  const [period, setPeriod] = useState<PeriodType>(30);
  const [selectedKomoditas, setSelectedKomoditas] = useState<string[]>([
    'beras-premium',
    'minyak-goreng',
    'cabai-merah'
  ]);

  const mainKomoditas = komoditasList.slice(0, 6);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            family: "'Plus Jakarta Sans', sans-serif",
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        padding: 12,
        cornerRadius: 8,
        titleFont: {
          family: "'Plus Jakarta Sans', sans-serif",
          size: 13,
        },
        bodyFont: {
          family: "'Plus Jakarta Sans', sans-serif",
          size: 12,
        },
        callbacks: {
          label: (context: any) => {
            const value = context.parsed.y;
            return `${context.dataset.label}: Rp ${value.toLocaleString('id-ID')}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: "'Plus Jakarta Sans', sans-serif",
            size: 11,
          },
        },
      },
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            family: "'Plus Jakarta Sans', sans-serif",
            size: 11,
          },
          callback: (value: any) => {
            return 'Rp ' + (value / 1000) + 'K';
          },
        },
      },
    },
  };

  const generateChartData = () => {
    const colors = [
      { border: '#16a34a', bg: 'rgba(22, 163, 74, 0.1)' },
      { border: '#2563eb', bg: 'rgba(37, 99, 235, 0.1)' },
      { border: '#dc2626', bg: 'rgba(220, 38, 38, 0.1)' },
    ];

    const labels = Array.from({ length: period }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (period - 1 - i));
      return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
    });

    const datasets = selectedKomoditas.slice(0, 3).map((komoditasId, index) => {
      const komoditas = komoditasList.find(k => k.id === komoditasId);
      const basePrice = komoditas?.harga || 15000;
      
      const data = Array.from({ length: period }, (_, i) => {
        const trend = Math.sin(i / 5) * 500;
        const random = (Math.random() - 0.5) * 300;
        return Math.round(basePrice + trend + random);
      });

      return {
        label: komoditas?.nama || komoditasId,
        data,
        borderColor: colors[index]?.border || colors[0].border,
        backgroundColor: colors[index]?.bg || colors[0].bg,
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
      };
    });

    return { labels, datasets };
  };

  const chartData = generateChartData();

  const toggleKomoditas = (id: string) => {
    setSelectedKomoditas(prev => 
      prev.includes(id) 
        ? prev.filter(k => k !== id)
        : [...prev.slice(-2), id]
    );
  };

  return (
    <section id="tren" className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <Badge variant="secondary" className="mb-2">
              <TrendingUp className="w-3 h-3 mr-1" />
              Analisis
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Grafik Tren Harga
            </h2>
            <p className="text-gray-600 mt-1">
              Pergerakan harga komoditas utama dalam beberapa waktu terakhir
            </p>
          </div>

          {/* Period Selector */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            {(Object.keys(periodLabels) as unknown as PeriodType[]).map((p) => (
              <Button
                key={p}
                variant={period === p ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPeriod(p)}
                className={period === p ? 'bg-primary' : ''}
              >
                {periodLabels[p]}
              </Button>
            ))}
          </div>
        </div>

        {/* Komoditas Selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          {mainKomoditas.map((k) => (
            <button
              key={k.id}
              onClick={() => toggleKomoditas(k.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedKomoditas.includes(k.id)
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{k.icon}</span>
              {k.nama}
            </button>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-6">
          <div className="h-[300px] md:h-[400px]">
            <Line options={chartOptions} data={chartData} />
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {selectedKomoditas.slice(0, 3).map((id) => {
            const k = komoditasList.find(item => item.id === id);
            if (!k) return null;
            
            return (
              <div key={id} className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{k.icon}</span>
                  <span className="font-medium text-gray-900">{k.nama}</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  Rp {k.harga.toLocaleString('id-ID')}
                </div>
                <div className={`text-sm ${
                  k.tren === 'naik' ? 'text-red-500' :
                  k.tren === 'turun' ? 'text-blue-500' : 'text-gray-500'
                }`}>
                  {k.tren === 'naik' ? '↑' : k.tren === 'turun' ? '↓' : '→'}
                  {' '}
                  {k.perubahanPersen > 0 ? '+' : ''}{k.perubahanPersen.toFixed(1)}% vs kemarin
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
