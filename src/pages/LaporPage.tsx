import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  MessageSquare, 
  CheckCircle2,
  MapPin,
  Tag,
  DollarSign,
  Building2,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { komoditasList, kotaList } from '@/data';

// Sanitasi input untuk keamanan
function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Validasi harga
function validatePrice(price: string): boolean {
  return /^\d{1,7}$/.test(price) && parseInt(price) > 0;
}

export function LaporPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    komoditas: '',
    harga: '',
    satuan: 'kg',
    kota: '',
    pasar: '',
    tanggal: new Date().toISOString().split('T')[0],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi
    const newErrors: Record<string, string> = {};
    
    if (!formData.komoditas) {
      newErrors.komoditas = 'Pilih komoditas';
    }
    if (!formData.harga || !validatePrice(formData.harga)) {
      newErrors.harga = 'Masukkan harga yang valid (1-9999999)';
    }
    if (!formData.kota) {
      newErrors.kota = 'Pilih kota';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Sanitasi dan submit
    const sanitizedData = {
      komoditas: sanitizeInput(formData.komoditas),
      harga: sanitizeInput(formData.harga),
      satuan: sanitizeInput(formData.satuan),
      kota: sanitizeInput(formData.kota),
      pasar: sanitizeInput(formData.pasar),
      tanggal: sanitizeInput(formData.tanggal),
    };

    // Simulasi submit - dalam produksi akan kirim ke API
    console.log('Submitting:', sanitizedData);
    
    toast.success('Laporan berhasil dikirim!', {
      description: 'Tim kami akan memverifikasi data Anda. Terima kasih!',
    });
    
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
              Terima Kasih!
            </h1>
            <p className="text-gray-600 mb-6">
              Laporan Anda telah kami terima dan sedang dalam proses verifikasi. 
              Data Anda sangat berharga untuk komunitas kami.
            </p>
            <div className="flex flex-col gap-3">
              <Link to="/">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Kembali ke Beranda
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    komoditas: '',
                    harga: '',
                    satuan: 'kg',
                    kota: '',
                    pasar: '',
                    tanggal: new Date().toISOString().split('T')[0],
                  });
                }}
              >
                Lapor Harga Lain
              </Button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-primary">Beranda</Link>
          <span>/</span>
          <span className="text-gray-900">Lapor Harga</span>
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
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-primary" />
            Lapor Harga
          </h1>
          <p className="text-gray-600 mt-1">
            Bantu sesama dengan melaporkan harga bahan pokok di daerahmu
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-4 md:p-8 border border-gray-200 shadow-sm">
          <div className="space-y-6">
            {/* Komoditas */}
            <div>
              <Label htmlFor="komoditas" className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Komoditas <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={formData.komoditas} 
                onValueChange={(value) => {
                  setFormData({ ...formData, komoditas: value });
                  setErrors({ ...errors, komoditas: '' });
                }}
              >
                <SelectTrigger className={errors.komoditas ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Pilih komoditas" />
                </SelectTrigger>
                <SelectContent>
                  {komoditasList.map((k) => (
                    <SelectItem key={k.id} value={k.id}>
                      <span className="mr-2">{k.icon}</span>
                      {k.nama}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.komoditas && (
                <p className="text-sm text-red-500 mt-1">{errors.komoditas}</p>
              )}
            </div>

            {/* Harga & Satuan */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="harga" className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Harga <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="harga"
                  type="number"
                  placeholder="Contoh: 15000"
                  value={formData.harga}
                  onChange={(e) => {
                    setFormData({ ...formData, harga: e.target.value });
                    setErrors({ ...errors, harga: '' });
                  }}
                  className={errors.harga ? 'border-red-500' : ''}
                />
                {errors.harga && (
                  <p className="text-sm text-red-500 mt-1">{errors.harga}</p>
                )}
              </div>
              <div>
                <Label htmlFor="satuan">Satuan</Label>
                <Select 
                  value={formData.satuan} 
                  onValueChange={(value) => setFormData({ ...formData, satuan: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">Kilogram (kg)</SelectItem>
                    <SelectItem value="liter">Liter</SelectItem>
                    <SelectItem value="pcs">Pieces (pcs)</SelectItem>
                    <SelectItem value="bungkus">Bungkus</SelectItem>
                    <SelectItem value="lusin">Lusin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Kota */}
            <div>
              <Label htmlFor="kota" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Kota <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={formData.kota} 
                onValueChange={(value) => {
                  setFormData({ ...formData, kota: value });
                  setErrors({ ...errors, kota: '' });
                }}
              >
                <SelectTrigger className={errors.kota ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Pilih kota" />
                </SelectTrigger>
                <SelectContent>
                  {kotaList.map((k) => (
                    <SelectItem key={k.id} value={k.id}>
                      {k.nama}, {k.provinsi}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.kota && (
                <p className="text-sm text-red-500 mt-1">{errors.kota}</p>
              )}
            </div>

            {/* Pasar (Opsional) */}
            <div>
              <Label htmlFor="pasar" className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Nama Pasar <span className="text-gray-400">(Opsional)</span>
              </Label>
              <Input
                id="pasar"
                placeholder="Contoh: Pasar Senen"
                value={formData.pasar}
                onChange={(e) => setFormData({ ...formData, pasar: e.target.value })}
              />
            </div>

            {/* Tanggal */}
            <div>
              <Label htmlFor="tanggal" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Tanggal
              </Label>
              <Input
                id="tanggal"
                type="date"
                value={formData.tanggal}
                onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
              />
            </div>

            {/* Info */}
            <div className="p-4 bg-blue-50 rounded-xl">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-blue-900">Informasi</div>
                  <div className="text-sm text-blue-700">
                    Data yang Anda laporkan akan diverifikasi oleh tim kami sebelum ditampilkan. 
                    Proses verifikasi biasanya memakan waktu 1-2 jam.
                  </div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90 py-6 text-lg"
            >
              Kirim Laporan
            </Button>

            <p className="text-center text-sm text-gray-500">
              Dengan mengirim laporan, Anda menyetujui{' '}
              <Link to="/syarat-ketentuan" className="text-primary hover:underline">
                Syarat & Ketentuan
              </Link>{' '}
              kami.
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
