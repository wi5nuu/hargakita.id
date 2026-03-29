import { Link } from 'react-router-dom';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Dari mana data harga diambil?',
    answer: 'Data harga diambil dari Panel Harga Pangan Badan Pangan Nasional yang mencakup 500+ pasar di seluruh Indonesia. Kami juga menerima laporan harga dari masyarakat yang telah diverifikasi oleh tim kami.',
  },
  {
    question: 'Seberapa sering data diperbarui?',
    answer: 'Data harga diperbarui setiap hari dari sumber resmi. Untuk laporan dari masyarakat, data akan diverifikasi dalam waktu 1-2 jam sebelum ditampilkan di platform.',
  },
  {
    question: 'Mengapa harga berbeda antar kota?',
    answer: 'Harga dapat berbeda antar kota karena beberapa faktor seperti biaya transportasi, ketersediaan pasokan, permintaan lokal, dan kondisi geografis. Harga juga bisa berbeda antar pasar dalam satu kota yang sama.',
  },
  {
    question: 'Bagaimana cara lapor harga?',
    answer: 'Anda dapat melaporkan harga dengan mengklik tombol "Lapor Harga" di menu utama. Isi formulir dengan komoditas, harga, kota, dan informasi lainnya. Laporan Anda akan diverifikasi sebelum ditampilkan.',
  },
  {
    question: 'Apakah data ini akurat?',
    answer: 'Kami berusaha menyediakan data seakurat mungkin. Data berasal dari sumber resmi pemerintah dan diverifikasi. Namun, harga aktual di pasar mungkin sedikit berbeda karena fluktuasi harian.',
  },
  {
    question: 'Apakah website ini gratis?',
    answer: 'Ya, HargaKita.id sepenuhnya gratis untuk digunakan. Tidak ada biaya berlangganan atau fitur berbayar. Kami percaya informasi harga harus dapat diakses oleh semua orang.',
  },
  {
    question: 'Bagaimana cara menggunakan fitur peta harga?',
    answer: 'Fitur peta harga memungkinkan Anda melihat visualisasi harga per provinsi. Klik menu "Peta Harga Indonesia" untuk melihat peta interaktif dengan warna yang menunjukkan rentang harga.',
  },
  {
    question: 'Bisakah saya mendapatkan notifikasi perubahan harga?',
    answer: 'Saat ini fitur notifikasi masih dalam pengembangan. Anda dapat membookmark halaman komoditas favorit Anda dan mengunjunginya secara berkala untuk melihat update terbaru.',
  },
  {
    question: 'Bagaimana cara menjadi relawan data?',
    answer: 'Anda dapat menjadi relawan dengan rutin melaporkan harga di daerah Anda. Semakin sering Anda melapor, semakin besar kontribusi Anda untuk komunitas. Hubungi kami untuk informasi lebih lanjut.',
  },
  {
    question: 'Apakah ada aplikasi mobile?',
    answer: 'Saat ini kami menyediakan versi web yang responsif dan dapat diakses dari browser HP. Anda juga dapat menambahkan HargaKita.id ke layar beranda HP Anda (Add to Home Screen) untuk akses lebih cepat.',
  },
];

export function FAQPage() {
  return (
    <main id="main-content" className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-primary">Beranda</Link>
          <span>/</span>
          <span className="text-gray-900">FAQ</span>
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
            <HelpCircle className="w-8 h-8 text-primary" />
            Pertanyaan Umum (FAQ)
          </h1>
          <p className="text-gray-600 mt-1">
            Jawaban untuk pertanyaan yang sering ditanyakan
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium text-gray-900 hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact CTA */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Tidak menemukan jawaban yang Anda cari?
          </p>
          <Link to="/kontak">
            <Button className="bg-primary hover:bg-primary/90">
              Hubungi Kami
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
