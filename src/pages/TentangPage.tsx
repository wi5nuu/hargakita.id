import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, Target, Eye, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function TentangPage() {
  const values = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Transparan',
      description: 'Kami menyediakan data harga yang akurat dan dapat diakses oleh semua orang secara gratis.',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Kolaboratif',
      description: 'Platform ini dibangun bersama masyarakat untuk masyarakat. Setiap orang bisa berkontribusi.',
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Terpercaya',
      description: 'Data kami berasal dari sumber resmi dan diverifikasi untuk memastikan akurasi.',
    },
  ];

  return (
    <main id="main-content" className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-primary">Beranda</Link>
          <span>/</span>
          <span className="text-gray-900">Tentang Kami</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-1">
                <ArrowLeft className="w-4 h-4" />
                Kembali
              </Button>
            </Link>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Tentang HargaKita.id
          </h1>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
          <Badge className="mb-4 bg-primary/10 text-primary">Cerita Kami</Badge>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Platform Pemantau Harga untuk Indonesia
          </h2>
          <p className="text-gray-600 mb-4">
            HargaKita.id lahir dari keprihatinan akan sulitnya akses informasi harga bahan pokok 
            yang akurat dan real-time. Kami percaya bahwa setiap orang berhak mendapatkan informasi 
            harga yang transparan untuk membantu pengambilan keputusan dalam kehidupan sehari-hari.
          </p>
          <p className="text-gray-600">
            Didirikan pada tahun 2024, HargaKita.id telah berkembang menjadi platform pemantau 
            harga terbesar di Indonesia dengan data dari lebih dari 500 pasar di 34 provinsi.
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
              <Eye className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Visi</h3>
            <p className="text-gray-600">
              Menjadi platform informasi harga pangan terpercaya yang membantu masyarakat 
              Indonesia membuat keputusan yang lebih baik.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Misi</h3>
            <p className="text-gray-600">
              Menyediakan data harga yang akurat, transparan, dan mudah diakses oleh 
              semua kalangan masyarakat Indonesia.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Nilai-Nilai Kami
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-primary">
                  {value.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-primary to-green-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-xl font-bold mb-2">Ingin Bergabung?</h2>
          <p className="text-white/90 mb-6">
            Kami selalu terbuka untuk kolaborasi dan kontribusi dari siapa saja.
          </p>
          <Link to="/kontak">
            <Button className="bg-white text-primary hover:bg-gray-100">
              Hubungi Kami
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
