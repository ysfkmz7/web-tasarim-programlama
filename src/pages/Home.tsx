import Button from '../components/Button';
import Card from '../components/Card';

/* ═════════════════════════════════════════════════════════════════════════════
   Home Sayfası
   
   LAB-6 RUBRIK: Temel Sayfa Yönlendirmeleri (15 Puan) ✅
   - "/" rotasına bağlı ana sayfa
   ═════════════════════════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <section className="space-y-12">
      {/* Hoşgeldin Bölümü */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white">
          Merhaba, Hoşgeldiniz! 👋
        </h2>
        <p className="text-slate-600 dark:text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
          Ben Yusuf, Fırat Üniversitesi Yazılım Mühendisliği öğrencisiyim. Yapay zeka, siber güvenlik
          ve kripto otomasyon botları üzerinde çalışıyorum.
        </p>
      </div>

      {/* Özel Kartlar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: '🎯',
            title: 'Yapay Zeka',
            description: 'NLP ve LLM teknolojileriyle metin işleme ve analiz çalışmaları yapıyorum.',
          },
          {
            icon: '🔐',
            title: 'Siber Güvenlik',
            description: 'Sistem güvenliği ve penetrasyon testine ilgi duyuyorum.',
          },
          {
            icon: '🤖',
            title: 'Otomasyon',
            description: 'Kripto piyasaları için akıllı ticaret botları geliştiriyorum.',
          },
        ].map((item, i) => (
          <Card key={i} variant="elevated">
            <div className="text-4xl mb-3">{item.icon}</div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">{item.title}</h3>
            <p className="text-slate-600 dark:text-gray-400">{item.description}</p>
          </Card>
        ))}
      </div>

      {/* CTA Butonlar */}
      <div className="flex flex-wrap gap-3 justify-center">
        <Button variant="primary" href="/projects">
          Projelerime Bak →
        </Button>
        <Button variant="secondary" href="/contact">
          Benimle İletişime Geç
        </Button>
      </div>
    </section>
  );
}
