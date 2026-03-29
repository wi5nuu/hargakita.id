import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowLeftRight,
  Search, 
  Bell, 
  Menu, 
  ChevronDown, 
  MapPin, 
  TrendingUp, 
  Zap, 
  LayoutDashboard,
  Map,
  Wheat,
  Newspaper,
  BookOpen,
  HelpCircle,
  GraduationCap,
  Smartphone,
  Home,
  Users,
  HandHeart,
  Megaphone,
  Mail,
  FileText,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { komoditasList, kotaList } from '@/data';

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  children?: {
    groups: {
      title: string;
      items: {
        label: string;
        href: string;
        icon?: React.ReactNode;
        description?: string;
      }[];
    }[];
  };
}

const navItems: NavItem[] = [
  {
    label: 'Harga Hari Ini',
    href: '/',
    icon: <LayoutDashboard className="w-4 h-4" />,
    children: {
      groups: [
        {
          title: 'Menu Utama',
          items: [
            { label: 'Dashboard Nasional', href: '/', icon: <LayoutDashboard className="w-4 h-4" />, description: 'Tampilan harga semua komoditas' },
            { label: 'Harga di Kotamu', href: '/kota/jakarta', icon: <MapPin className="w-4 h-4" />, description: 'Deteksi lokasi otomatis' },
            { label: 'Tren Minggu Ini', href: '/#tren', icon: <TrendingUp className="w-4 h-4" />, description: 'Grafik 7 hari terakhir' },
            { label: 'Bandingkan Wilayah', href: '/bandingkan', icon: <ArrowLeftRight className="w-4 h-4" />, description: 'Jakarta vs Surabaya' },
            { label: 'Update Terbaru', href: '/#update', icon: <Zap className="w-4 h-4" />, description: 'Update 1 jam terakhir' },
            { label: 'Peta Harga Indonesia', href: '/peta', icon: <Map className="w-4 h-4" />, description: 'Visualisasi per provinsi' },
          ]
        }
      ]
    }
  },
  {
    label: 'Komoditas',
    href: '/harga',
    icon: <Wheat className="w-4 h-4" />,
    children: {
      groups: [
        {
          title: 'Bahan Pokok Utama',
          items: komoditasList.filter(k => k.kategori === 'pokok').slice(0, 8).map(k => ({
            label: k.nama,
            href: `/harga/${k.id}`
          }))
        },
        {
          title: 'Protein & Lauk',
          items: komoditasList.filter(k => k.kategori === 'protein').slice(0, 5).map(k => ({
            label: k.nama,
            href: `/harga/${k.id}`
          }))
        }
      ]
    }
  },
  {
    label: 'Kota',
    href: '/kota',
    icon: <MapPin className="w-4 h-4" />,
    children: {
      groups: [
        {
          title: 'Jawa',
          items: kotaList.filter(k => k.region === 'jawa').map(k => ({
            label: k.nama,
            href: `/kota/${k.id}`,
            icon: <MapPin className="w-4 h-4" />
          }))
        },
        {
          title: 'Sumatera',
          items: kotaList.filter(k => k.region === 'sumatera').map(k => ({
            label: k.nama,
            href: `/kota/${k.id}`,
            icon: <MapPin className="w-4 h-4" />
          }))
        },
        {
          title: 'Kalimantan & Timur',
          items: [
            ...kotaList.filter(k => k.region === 'kalimantan').slice(0, 3),
            ...kotaList.filter(k => k.region === 'timur').slice(0, 3)
          ].map(k => ({
            label: k.nama,
            href: `/kota/${k.id}`,
            icon: <MapPin className="w-4 h-4" />
          }))
        }
      ]
    }
  },
  {
    label: 'Info & Panduan',
    href: '/panduan',
    icon: <BookOpen className="w-4 h-4" />,
    children: {
      groups: [
        {
          title: 'Informasi',
          items: [
            { label: 'Berita & Analisis', href: '/berita', icon: <Newspaper className="w-4 h-4" />, description: 'Kenapa harga naik?' },
            { label: 'Panduan Penggunaan', href: '/panduan', icon: <BookOpen className="w-4 h-4" />, description: 'Cara membaca grafik' },
            { label: 'FAQ', href: '/faq', icon: <HelpCircle className="w-4 h-4" />, description: 'Pertanyaan umum' },
            { label: 'Edukasi Ekonomi', href: '/edukasi', icon: <GraduationCap className="w-4 h-4" />, description: 'Apa itu inflasi?' },
            { label: 'Pasang di HP', href: '/pwa-guide', icon: <Smartphone className="w-4 h-4" />, description: 'Add to homescreen' },
          ]
        }
      ]
    }
  },
  {
    label: 'Tentang Kami',
    href: '/tentang',
    icon: <Home className="w-4 h-4" />,
    children: {
      groups: [
        {
          title: 'Perusahaan',
          items: [
            { label: 'Tentang HargaKita', href: '/tentang', icon: <Home className="w-4 h-4" />, description: 'Visi dan misi' },
            { label: 'Tim & Kontributor', href: '/tim', icon: <Users className="w-4 h-4" />, description: 'Siapa kami' },
            { label: 'Cara Berkontribusi', href: '/kontribusi', icon: <HandHeart className="w-4 h-4" />, description: 'Jadi relawan' },
            { label: 'Media & Press', href: '/media', icon: <Megaphone className="w-4 h-4" />, description: 'Logo dan fact sheet' },
            { label: 'Hubungi Kami', href: '/kontak', icon: <Mail className="w-4 h-4" />, description: 'Form kontak' },
            { label: 'Kebijakan Privasi', href: '/kebijakan-privasi', icon: <Shield className="w-4 h-4" /> },
            { label: 'Syarat & Ketentuan', href: '/syarat-ketentuan', icon: <FileText className="w-4 h-4" /> },
          ]
        }
      ]
    }
  }
];

export function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setActiveDropdown(null);
  }, [location.pathname]);

  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Handle scroll visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Always show at top (less than 100px)
      if (currentScrollY < 100) {
        setIsVisible(true);
      } else {
        // Show if scrolling up, hide if scrolling down
        if (currentScrollY < lastScrollY.current) {
          setIsVisible(true);
        } else if (currentScrollY > lastScrollY.current + 10) { // Small threshold for scroll down
          setIsVisible(false);
          // Also hide mobile search if open
          setShowSearch(false);
        }
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/cari?q=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
    }
  };

  return (
    <>
      <div className="h-16 lg:h-20" /> {/* Spacer for fixed header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all duration-300 transform-gpu md:translate-y-0 ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 md:translate-y-0 md:opacity-100'
        }`}
      >
        <a href="#main-content" className="skip-link">
          Langsung ke konten utama
        </a>
        
        <div className="container mx-auto px-4 h-16 lg:h-20 flex items-center justify-between gap-4">
          {/* Left section: Logo + Nav */}
          <div className="flex items-center gap-8 lg:gap-12 shrink-0">
            <Link to="/" className="flex items-center shrink-0">
              <img 
                src="/logo_hargakita.png" 
                alt="HargaKita.id Logo" 
                className="h-10 lg:h-14 w-auto object-contain hover:scale-105 transition-transform"
              />
            </Link>

            {/* Desktop Navigation - Integrated into main row */}
            <nav ref={dropdownRef} className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.href}
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-full transition-all ${
                      activeDropdown === item.label || location.pathname === item.href
                        ? 'text-primary bg-primary/10'
                        : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                    {item.children && <ChevronDown className="w-3 h-3 opacity-50" />}
                  </Link>

                  {/* Mega Dropdown */}
                  {item.children && activeDropdown === item.label && (
                    <div className="absolute top-[calc(100%+0.5rem)] left-0 bg-white rounded-2xl shadow-2xl border border-gray-100 w-[max-content] max-w-[calc(100vw-2rem)] z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="p-6">
                        <div className={`grid gap-8 ${
                          item.children.groups.length > 1 ? 'grid-cols-3' : 'grid-cols-1'
                        }`}>
                          {item.children.groups.map((group) => (
                            <div key={group.title}>
                              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                                {group.title}
                              </h3>
                              <ul className="space-y-2">
                                {group.items.map((subItem) => (
                                  <li key={subItem.label}>
                                    <Link
                                      to={subItem.href}
                                      className="flex items-start gap-3 p-2 rounded-xl hover:bg-primary/5 transition-all group"
                                    >
                                      {subItem.icon && (
                                        <span className="text-gray-400 group-hover:text-primary mt-1 transition-colors">
                                          {subItem.icon}
                                        </span>
                                      )}
                                      <div>
                                        <span className="text-sm font-bold text-gray-800 group-hover:text-primary block transition-colors">
                                          {subItem.label}
                                        </span>
                                        {subItem.description && (
                                          <span className="text-xs text-gray-500 line-clamp-1">
                                            {subItem.description}
                                          </span>
                                        )}
                                      </div>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Right section: Search + Actions */}
          <div className="flex items-center gap-2 lg:gap-4 flex-1 justify-end">
            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-xs xl:max-w-md">
              <form onSubmit={handleSearch} className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Cari kota atau komoditas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10 w-full bg-gray-50 border-gray-100 focus:bg-white rounded-xl shadow-sm focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                />
              </form>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setShowSearch(!showSearch)}
              >
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative group">
                <Bell className="w-5 h-5 group-hover:text-primary transition-colors" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </Button>
              <Link to="/lapor">
                <Button className="hidden sm:flex bg-primary hover:bg-primary/90 rounded-full px-6 text-sm font-semibold h-10">
                  Lapor Harga
                </Button>
              </Link>
              
              {/* Mobile Menu Toggle */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 p-0">
                  <MobileMenu />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        {/* Mobile Search - Conditional Rendering */}
        {showSearch && (
          <div className="md:hidden px-4 pb-4 bg-white border-t border-gray-50">
            <form onSubmit={handleSearch} className="relative mt-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Cari kota atau komoditas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full rounded-xl"
                autoFocus
              />
            </form>
          </div>
        )}
      </header>
    </>
  );
}

function MobileMenu() {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleItem = (label: string) => {
    setExpandedItems(prev =>
      prev.includes(label)
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 overflow-auto p-6 pt-16">
        <div className="space-y-2">
          {navItems.map((item) => (
            <div key={item.label}>
              <div className="flex items-center justify-between">
                <Link
                  to={item.href}
                  className="flex-1 py-2 text-sm font-medium text-gray-700"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleItem(item.label)}
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform ${
                      expandedItems.includes(item.label) ? 'rotate-180' : ''
                    }`} />
                  </Button>
                )}
              </div>
              
              {item.children && expandedItems.includes(item.label) && (
                <div className="ml-4 mt-2 space-y-1 border-l-2 border-gray-100 pl-3">
                  {item.children.groups.flatMap(g => g.items).map((subItem) => (
                    <SheetClose key={subItem.label} asChild>
                      <Link
                        to={subItem.href}
                        className="flex items-center gap-2 py-2 text-sm text-gray-600 hover:text-primary"
                      >
                        {subItem.icon && <span>{subItem.icon}</span>}
                        {subItem.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t">
          <Link to="/lapor">
            <Button className="w-full bg-primary hover:bg-primary/90">
              Lapor Harga
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
