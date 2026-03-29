import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export function KontakPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    subjek: '',
    pesan: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi sederhana
    if (!formData.nama || !formData.email || !formData.pesan) {
      toast.error('Mohon lengkapi semua field yang wajib diisi');
      return;
    }

    // Simulasi submit
    toast.success('Pesan berhasil dikirim!');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main id="main-content" className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-lg">
          <div className="bg-white rounded-2xl p-8 border border-gray-200 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Pesan Terkirim!
            </h1>
            <p className="text-gray-600 mb-6">
              Terima kasih telah menghubungi kami. Kami akan membalas pesan Anda secepatnya.
            </p>
            <Link to="/">
              <Button className="bg-primary hover:bg-primary/90">
                Kembali ke Beranda
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-primary">Beranda</Link>
          <span>/</span>
          <span className="text-gray-900">Hubungi Kami</span>
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
            Hubungi Kami
          </h1>
          <p className="text-gray-600 mt-1">
            Ada pertanyaan atau saran? Silakan hubungi kami
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Contact Info */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
              <a href="mailto:info@hargakita.id" className="text-gray-600 hover:text-primary">
                info@hargakita.id
              </a>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Telepon</h3>
              <a href="tel:+6281234567890" className="text-gray-600 hover:text-primary">
                0812-3456-7890
              </a>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Alamat</h3>
              <p className="text-gray-600">
                Jakarta, Indonesia
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Kirim Pesan</h2>
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nama">Nama <span className="text-red-500">*</span></Label>
                    <Input
                      id="nama"
                      placeholder="Nama Anda"
                      value={formData.nama}
                      onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@anda.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subjek">Subjek</Label>
                  <Input
                    id="subjek"
                    placeholder="Subjek pesan"
                    value={formData.subjek}
                    onChange={(e) => setFormData({ ...formData, subjek: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="pesan">Pesan <span className="text-red-500">*</span></Label>
                  <Textarea
                    id="pesan"
                    placeholder="Tulis pesan Anda di sini..."
                    rows={5}
                    value={formData.pesan}
                    onChange={(e) => setFormData({ ...formData, pesan: e.target.value })}
                  />
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 gap-2">
                  <Send className="w-4 h-4" />
                  Kirim Pesan
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
