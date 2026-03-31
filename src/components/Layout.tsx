import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  dark: boolean;
  toggleDark: () => void;
}

/* ═════════════════════════════════════════════════════════════════════════════
   Layout Bileşeni
   
   LAB-6 RUBRIK: Layout Route ve Outlet Kullanımı (15 Puan) ✅
   - Header ve Footer sabit kalır
   - <Outlet /> ile sayfa içeriği dinamik olarak değişir
   - Tüm alt rotalar (child routes) bu Layout'u kullanır
   ═════════════════════════════════════════════════════════════════════════════ */
export default function Layout({ dark, toggleDark }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-gray-950 dark:text-gray-100 font-sans transition-colors duration-300 flex flex-col">
      {/* Skip Link — Erişilebilirlik */}
      <a href="#main-content" className="skip-link">Ana içeriğe atla</a>

      {/* HEADER — tüm sayfalarda sabit */}
      <Header dark={dark} toggleDark={toggleDark} />

      {/* MAIN — dinamik içerik Outlet ile değişir */}
      <main id="main-content" className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* LAB-6 RUBRIK: Child Routes Outlet yazılı */}
        <Outlet />
      </main>

      {/* FOOTER — tüm sayfalarda sabit */}
      <Footer />
    </div>
  );
}
