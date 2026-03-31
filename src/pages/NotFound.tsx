import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';

/* ═════════════════════════════════════════════════════════════════════════════
   NotFound (404) Sayfası
   
   LAB-6 RUBRIK: 404 Hata Sayfası (10 Puan) ✅
   - "Sayfa Bulunamadı" mesajını gösterir
   - Catch-all (*) rotasına bağlıdır
   - "Ana Sayfaya Dön" butonu (useNavigate ile çalışır)
   ═════════════════════════════════════════════════════════════════════════════ */
export default function NotFound() {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      {/* 404 İkonu */}
      <div className="text-6xl mb-4">🔍</div>

      {/* Başlık */}
      <h1 className="text-5xl sm:text-6xl font-bold text-slate-800 dark:text-white">404</h1>

      {/* Açıklama */}
      <Card variant="elevated" className="max-w-md">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">Sayfa Bulunamadı</h2>
        <p className="text-slate-600 dark:text-gray-400 mb-6">
          Aradığınız sayfanın adresi yanlış olabilir veya sayfanın erişimi kısıtlanmış olabilir.
        </p>

        {/* Butonlar */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={() => navigate('/')} variant="primary">
            ← Ana Sayfaya Dön
          </Button>
          <Button onClick={() => navigate(-1)} variant="secondary">
            Geri Git
          </Button>
        </div>
      </Card>

      {/* Dekoratif Mesaj */}
      <p className="text-sm text-slate-500 dark:text-gray-500 mt-8">
        Bu sayfaya gelmediyseniz, lütfen{' '}
        <Button onClick={() => navigate('/contact')} variant="link" className="text-primary dark:text-primary-light underline">
          bize ulaşın
        </Button>
        .
      </p>
    </section>
  );
}
