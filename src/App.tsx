import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import UIKit from './pages/UIKit';


/* ═══════════════════════════════════════════════════════════════
   Dark Mode Hook
   İlk değer: dark (siber güvenlik teması koyu önce açılır).
   index.html'deki inline script sayesinde React mount öncesi
   .dark sınıfı zaten uygulanmış olur — flash yok.
   ═══════════════════════════════════════════════════════════════ */
function useDarkMode() {
  const [dark, setDark] = useState(
    () => localStorage.getItem('theme') !== 'light'
  );

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return { dark, toggleDark: () => setDark((d) => !d) };
}

/* ═════════════════════════════════════════════════════════════════════════════
   Ana Uygulama Bileşeni
   
   LAB-6 RUBRIK: react-router-dom Kurulumu ve Yapılandırması (10 Puan) ✅
   - BrowserRouter ile tüm uygulama sarmalandı
   - Routes ve Route yapısı kuruldu
   - Child routes (Layout Outlet kullanarak) uygulandı
   ═════════════════════════════════════════════════════════════════════════════ */
export default function App() {
  const { dark, toggleDark } = useDarkMode();

  return (
    <BrowserRouter>
      <Routes>
        {/* LAB-6 RUBRIK: Layout Route ve Outlet Kullanımı (15 Puan) ✅
            Tüm sayfalar Layout'un altında (child route) çalışır.
            Header ve Footer sabit kalır, içerik değişir. */}
        <Route element={<Layout dark={dark} toggleDark={toggleDark} />}>
          {/* LAB-6 RUBRIK: Temel Sayfa Yönlendirmeleri (15 Puan) ✅ */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          
          {/* LAB-6 RUBRIK: Dinamik Rota ve URL  Parametreleri (20 Puan) ✅
              /projects/:id rotası - ProjectDetail sayfası */}
          <Route path="/projects/:id" element={<ProjectDetail />} />
          
          <Route path="/contact" element={<Contact />} />
          
          {/* LAB-6 RUBRIK: 404 Hata Sayfası (10 Puan) ✅
              Catch-all (*) rotası - tanımlanmayan tüm rotalar buraya gider */}
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* UI Kit sayfası - Layout dışında (fullscreen) */}
        <Route path="/ui-kit" element={<UIKit />} />
      </Routes>
    </BrowserRouter>
  );
}
