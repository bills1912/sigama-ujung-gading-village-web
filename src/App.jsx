import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Setiap halaman dimuat sebagai chunk terpisah (route-based code splitting)
// supaya pengunjung hanya mengunduh JS untuk halaman yang sedang dibuka.
const Beranda = lazy(() => import('./pages/Beranda'));
const Profil = lazy(() => import('./pages/Profil'));
const Agenda = lazy(() => import('./pages/Agenda'));
const Anggaran = lazy(() => import('./pages/Anggaran'));
const Jdih = lazy(() => import('./pages/Jdih'));
const DataDesa = lazy(() => import('./pages/DataDesa'));
const Kontak = lazy(() => import('./pages/Kontak'));

function PageFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-pine/20 border-t-pine animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<Beranda />} />
              <Route path="/profil" element={<Profil />} />
              <Route path="/agenda" element={<Agenda />} />
              <Route path="/anggaran" element={<Anggaran />} />
              <Route path="/jdih" element={<Jdih />} />
              <Route path="/data-desa" element={<DataDesa />} />
              <Route path="/kontak" element={<Kontak />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
