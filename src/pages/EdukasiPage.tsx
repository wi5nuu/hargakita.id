import { GraduationCap, BookOpen, Lightbulb, ArrowRight, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const articles = [
  {
    id: 'inflasi-101',
    title: 'Memahami Inflasi Bahan Pokok di Indonesia',
    excerpt: 'Mengapa harga beras sering naik menjelang hari raya? Pelajari faktor ekonomi di balik fluktuasi harga sembako.',
    category: 'Ekonomi',
    date: '25 Mar 2026',
    author: 'Tim Riset HargaKita',
    readTime: '5 menit',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'food-security',
    title: 'Ketahanan Pangan Rumah Tangga',
    excerpt: 'Tips mengelola stok bahan makanan di rumah agar tetap hemat dan bergizi meskipun harga pasar sedang tidak stabil.',
    category: 'Gaya Hidup',
    date: '22 Mar 2026',
    author: 'Budi Santoso',
    readTime: '8 menit',
    image: 'https://images.unsplash.com/photo-1506484334402-40f2269bd39f?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'hpp-petani',
    title: 'Mengenal Harga Pokok Penjualan Petani',
    excerpt: 'Berapa sebenarnya keuntungan yang didapat petani dari satu kilogram gabah? Mari bedah rantai distribusi pangan kita.',
    category: 'Pertanian',
    date: '20 Mar 2026',
    author: 'Siti Aminah',
    readTime: '10 menit',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800',
  },
];

export function EdukasiPage() {
  return (
    <main className="min-h-screen bg-[#FDFDFD] py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 border-primary/20 text-primary bg-primary/5 px-4 py-1.5 rounded-full font-bold">
            Portal Edukasi
          </Badge>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Cerdas Pantau, Bijak Belanja
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Pusat informasi dan edukasi mengenai ekonomi pangan, tips hemat, dan perkembangan 
            sektor pertanian di Indonesia untuk membantu Anda mengambil keputusan keuangan yang lebih baik.
          </p>
        </div>

        {/* Categories / Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <Card className="p-8 rounded-3xl border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all text-center group cursor-pointer border-t-4 border-t-primary">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-xl text-gray-900 mb-2">Ekonomi 101</h3>
            <p className="text-sm text-gray-500">Dasar-dasar ekonomi pangan dan faktor penyebab fluktuasi harga pasar.</p>
          </Card>
          
          <Card className="p-8 rounded-3xl border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue/5 transition-all text-center group cursor-pointer border-t-4 border-t-blue-500">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Lightbulb className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-xl text-gray-900 mb-2">Tips & Trik</h3>
            <p className="text-sm text-gray-500">Kumpulan strategi belanja cerdas dan pengelolaan stok makanan rumah tangga.</p>
          </Card>

          <Card className="p-8 rounded-3xl border-gray-100 shadow-sm hover:shadow-xl hover:shadow-orange/5 transition-all text-center group cursor-pointer border-t-4 border-t-orange-500">
            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mx-auto mb-6 group-hover:scale-110 transition-transform">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-xl text-gray-900 mb-2">Riset Pasar</h3>
            <p className="text-sm text-gray-500">Data mendalam mengenai rantai pasok dan kondisi pertanian nasional terbaru.</p>
          </Card>
        </div>

        {/* Featured Articles Grid */}
        <div className="flex items-center justify-between mb-8">
           <h2 className="text-2xl font-bold text-gray-900">Artikel Pilihan</h2>
           <Button variant="ghost" className="text-primary font-bold hover:bg-primary/5">Lihat Semua</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {articles.map((article) => (
            <Card key={article.id} className="overflow-hidden rounded-3xl border-gray-100 shadow-sm hover:shadow-2xl transition-all h-full flex flex-col group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <Badge className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-gray-900 border-none font-bold text-[10px] uppercase tracking-widest">
                  {article.category}
                </Badge>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-3 font-medium">
                   <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime}</span>
                   </div>
                   <div className="flex items-center gap-1 text-primary">
                      <User className="w-3 h-3" />
                      <span>{article.author}</span>
                   </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 leading-snug mb-3 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                  {article.excerpt}
                </p>
                <Link to={`/edukasi/${article.id}`} className="mt-auto inline-flex items-center text-sm font-bold text-gray-900 hover:text-primary gap-2 transition-colors">
                  Baca Selengkapnya
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* Newsletter / CTA */}
        <Card className="p-12 rounded-[40px] bg-gray-900 text-white relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
                <h2 className="text-3xl font-extrabold mb-4">Ingin Menjadi Pembeli Bijak?</h2>
                <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                    Berlangganan newsletter mingguan kami untuk mendapatkan update harga terbaru, tips hemat, 
                    dan analisis pasar langsung di email Anda.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input 
                        type="email" 
                        placeholder="Alamat Email Anda" 
                        className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-6 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <Button className="bg-primary hover:bg-primary/90 text-white rounded-2xl h-12 px-8 font-bold">
                        Daftar Sekarang
                    </Button>
                </div>
                <p className="text-[10px] text-gray-500 mt-4">Kami menjaga privasi Anda. Berhenti berlangganan kapan saja.</p>
            </div>
        </Card>
      </div>
    </main>
  );
}
