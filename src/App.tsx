import { Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/sections/Hero';
import { HargaHariIni } from '@/sections/HargaHariIni';
import { PilihKotamu } from '@/sections/PilihKotamu';
import { GrafikTren } from '@/sections/GrafikTren';
import { LaporanWargaSection } from '@/sections/LaporanWarga';
import { BeritaSection } from '@/sections/Berita';
import { CTALapor } from '@/sections/CTALapor';
import { Statistik } from '@/sections/Statistik';
import { Toaster } from '@/components/ui/sonner';

// Pages
import { HargaPage } from '@/pages/HargaPage';
import { KomoditasDetail } from '@/pages/KomoditasDetail';
import { KotaPage } from '@/pages/KotaPage';
import { KotaDetail } from '@/pages/KotaDetail';
import { LaporPage } from '@/pages/LaporPage';
import { BeritaPage } from '@/pages/BeritaPage';
import { TentangPage } from '@/pages/TentangPage';
import { FAQPage } from '@/pages/FAQPage';
import { PanduanPage } from '@/pages/PanduanPage';
import { KontakPage } from '@/pages/KontakPage';
import { KebijakanPrivasiPage } from '@/pages/KebijakanPrivasiPage';
import { SyaratKetentuanPage } from '@/pages/SyaratKetentuanPage';
import { SearchPage } from '@/pages/SearchPage';
import { UnderConstructionPage } from '@/pages/UnderConstructionPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <HargaHariIni />
      <PilihKotamu />
      <GrafikTren />
      <LaporanWargaSection />
      <BeritaSection />
      <CTALapor />
      <Statistik />
    </main>
  );
}

import { PetaPage } from '@/pages/PetaPage';
import { EdukasiPage } from '@/pages/EdukasiPage';
import { BandingkanPage } from '@/pages/BandingkanPage';

function App() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/harga" element={<HargaPage />} />
          <Route path="/harga/:id" element={<KomoditasDetail />} />
          <Route path="/kota" element={<KotaPage />} />
          <Route path="/kota/:id" element={<KotaDetail />} />
          <Route path="/lapor" element={<LaporPage />} />
          <Route path="/berita" element={<BeritaPage />} />
          <Route path="/tentang" element={<TentangPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/panduan" element={<PanduanPage />} />
          <Route path="/kontak" element={<KontakPage />} />
          <Route path="/kebijakan-privasi" element={<KebijakanPrivasiPage />} />
          <Route path="/syarat-ketentuan" element={<SyaratKetentuanPage />} />
          <Route path="/cari" element={<SearchPage />} />
          <Route path="/peta" element={<PetaPage />} />
          <Route path="/bandingkan" element={<BandingkanPage />} />
          <Route path="/edukasi" element={<EdukasiPage />} />
          <Route path="/tim" element={<UnderConstructionPage />} />
          <Route path="/kontribusi" element={<UnderConstructionPage />} />
          <Route path="/media" element={<UnderConstructionPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
