import { useEffect, useState, useRef } from 'react';
import { 
  FileText, 
  Building2, 
  ShoppingCart, 
  Users,
  TrendingUp
} from 'lucide-react';
import { statistikPlatform } from '@/data';

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix?: string;
}

function useCountUp(end: number, duration: number = 2000, start: boolean = true) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start]);

  return count;
}

function StatItem({ icon, value, label, suffix = '' }: StatItemProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const count = useCountUp(value, 2000, isVisible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + 'K';
    }
    return num.toString();
  };

  return (
    <div ref={ref} className="text-center p-6">
      <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
        {formatNumber(count)}{suffix}
      </div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
}

export function Statistik() {
  const stats = [
    { 
      icon: <FileText className="w-7 h-7 text-primary" />, 
      value: statistikPlatform.totalLaporan, 
      label: 'Total Laporan Warga' 
    },
    { 
      icon: <Building2 className="w-7 h-7 text-primary" />, 
      value: statistikPlatform.jumlahKota, 
      label: 'Kota Terpantau' 
    },
    { 
      icon: <ShoppingCart className="w-7 h-7 text-primary" />, 
      value: statistikPlatform.jumlahKomoditas, 
      label: 'Jenis Komoditas' 
    },
    { 
      icon: <Users className="w-7 h-7 text-primary" />, 
      value: statistikPlatform.penggunaHariIni, 
      label: 'Pengguna Hari Ini' 
    },
  ];

  return (
    <section id="statistik" className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Statistik Platform</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            HargaKita dalam Angka
          </h2>
          <p className="text-gray-600 mt-2">
            Platform pemantau harga terbesar di Indonesia
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`
                  border-gray-100
                  ${index % 2 !== 0 ? '' : 'border-r'} 
                  ${index < 2 ? 'border-b md:border-b-0' : 'md:border-b-0'}
                  ${(index === 1 || index === 3) ? 'md:border-r' : 'md:border-r'}
                  ${index === 3 ? 'md:border-r-0' : ''}
                `}
              >
                <StatItem
                  icon={stat.icon}
                  value={stat.value}
                  label={stat.label}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
