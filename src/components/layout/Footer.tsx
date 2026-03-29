import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Heart
} from 'lucide-react';

const footerLinks = {
  harga: {
    title: 'Harga',
    links: [
      { label: 'Dashboard Nasional', href: '/' },
      { label: 'Harga per Komoditas', href: '/harga' },
      { label: 'Harga per Kota', href: '/kota' },
      { label: 'Tren Harga', href: '/#tren' },
      { label: 'Peta Harga', href: '/peta' },
    ]
  },
  komoditas: {
    title: 'Komoditas Populer',
    links: [
      { label: 'Beras Premium', href: '/harga/beras-premium' },
      { label: 'Minyak Goreng', href: '/harga/minyak-goreng' },
      { label: 'Cabai Merah', href: '/harga/cabai-merah' },
      { label: 'Telur Ayam', href: '/harga/telur-ayam' },
      { label: 'Gula Pasir', href: '/harga/gula-pasir' },
    ]
  },
  informasi: {
    title: 'Informasi',
    links: [
      { label: 'Berita & Analisis', href: '/berita' },
      { label: 'Panduan Penggunaan', href: '/panduan' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Edukasi Ekonomi', href: '/edukasi' },
      { label: 'Cara Pasang di HP', href: '/pwa-guide' },
    ]
  },
  perusahaan: {
    title: 'Perusahaan',
    links: [
      { label: 'Tentang Kami', href: '/tentang' },
      { label: 'Tim & Kontributor', href: '/tim' },
      { label: 'Berkontribusi', href: '/kontribusi' },
      { label: 'Hubungi Kami', href: '/kontak' },
      { label: 'Media Kit', href: '/media' },
    ]
  }
};

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'Youtube' },
];

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <img 
                src="/logo_hargakita.png" 
                alt="HargaKita.id Logo" 
                className="h-10 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-sm text-gray-400 mb-4 max-w-xs">
              Platform pemantau harga bahan pokok Indonesia secara real-time. 
              Data dari 500+ pasar di 34 provinsi.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <a href="mailto:info@hargakita.id" className="flex items-center gap-2 text-sm hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                info@hargakita.id
              </a>
              <a href="tel:+6281234567890" className="flex items-center gap-2 text-sm hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                0812-3456-7890
              </a>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4" />
                Jakarta, Indonesia
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      to={link.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-1 text-sm">
              <span>&copy; {new Date().getFullYear()} HargaKita.id.</span>
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>untuk Indonesia</span>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-4 text-sm">
              <Link to="/kebijakan-privasi" className="hover:text-white transition-colors">
                Kebijakan Privasi
              </Link>
              <Link to="/syarat-ketentuan" className="hover:text-white transition-colors">
                Syarat & Ketentuan
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
