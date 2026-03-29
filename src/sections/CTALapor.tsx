import { Link } from 'react-router-dom';
import { MessageSquare, ArrowRight, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTALapor() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-primary to-green-600 rounded-3xl p-8 md:p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-6">
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm font-medium">Bantu Sesama</span>
            </div>

            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Tau Harga di Pasarmu?
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Bantu ribuan orang lain dengan melaporkan harga bahan pokok di daerahmu. 
              Gratis, tanpa daftar, dan hanya butuh 1 menit!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link to="/lapor">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-gray-100 gap-2"
                >
                  Lapor Sekarang
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>100% Gratis</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>Tanpa Daftar</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                <span>Cepat & Mudah</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
