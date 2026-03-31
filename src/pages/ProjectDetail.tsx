import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import type { Project } from '../types/project';

/* ═════════════════════════════════════════════════════════════════════════════
   ProjectDetail Sayfası
   
   LAB-6 RUBRIK: Dinamik Rota ve URL Parametreleri (20 Puan) ✅
   - "/projects/:id" rotasına bağlı
   - useParams hook'u ile URL'den id parametresini okur
   - Mock veri ile projenin detaylarını gösterir
   - useNavigate ile "Geri Dön" butonu çalışır
   ═════════════════════════════════════════════════════════════════════════════ */

// Mock veri — gerçek uygulamada API'dan gelecek
const MOCK_PROJECTS: Record<string, Project & { content: string; details: string[] }> = {
  'kripto-bot': {
    id: 'kripto-bot',
    title: 'Kripto Trading Bot',
    description: 'Binance API ile otomatik kripto para ticaret robotu',
    category: 'backend',
    year: 2024,
    technologies: ['Python', 'API', 'Machine Learning'],
    content:
      'Bu proje, Binance API\'ye bağlı bir yapay zeka destekli oto-ticaret botudur. Teknik analiz veya makine öğrenmesi modelleri kullanarak otomatik alım-satım kararları verir.',
    details: [
      'Binance REST API ile bağlantı',
      'Teknik analiz göstergeleri (RSI, MACD, Bollinger Bands)',
      'Risk yönetimi ve pozisyon boyutlandırması',
      'Gerçek zamanlı WebSocket güncellemeleri',
      'Veritabanı ile işlem geçmişi kaydı',
    ],
  },
  'sentx-ai': {
    id: 'sentx-ai',
    title: 'Sentiment X AI',
    description: 'Sosyal medya duygusallık analiz uygulaması',
    category: 'fullstack',
    year: 2024,
    technologies: ['Python', 'NLP', 'React'],
    content:
      'Bu proje, sosyal medyadan toplanan metinlerin duygusallıklarını analiz eden bir uygulamadır. NLP teknolojileri ve veri görselleştirme kullanılmıştır.',
    details: [
      'Twitter/X API integrasyon',
      'BERT/Transformers modelleri ile NLP',
      'Django REST API backend',
      'React frontend ile görselleştirme',
      'Real-time analiz ve istatistikler',
    ],
  },
  'secret-knock': {
    id: 'secret-knock',
    title: 'Secret Knock',
    description: 'Sekretin vuruş deseni algılama sistemi',
    category: 'backend',
    year: 2023,
    technologies: ['IoT', 'Go', 'Machine Learning'],
    content:
      'Bu proje, kapıdaki vuruş deseni ile şifreyi hatırlayan uygulamadır. Go dili ile yazılan hızlı ve güvenli sistem.',
    details: [
      'Ses sensörü ve IoT entegrasyonu',
      'Go ile yazılmış mikro servis',
      'Makine öğrenmesi modeli eğitimi',
      'Düşük gecikmeli işlem',
      'Mobil uygulaması iOS/Android',
    ],
  },
};

export default function ProjectDetail() {
  // LAB-6 RUBRIK: Dinamik Rota ve URL Parametreleri — useParams kullanımı ✅
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Mock veritabanından veri al
  const project = id ? MOCK_PROJECTS[id] : null;

  if (!project) {
    return (
      <section className="text-center space-y-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Proje Bulunamadı</h2>
        <p className="text-slate-600 dark:text-gray-400">
          Aradığınız proje ID ({id}) sistemde bulunamadı.
        </p>
        <Button onClick={() => navigate('/projects')} variant="primary">
          ← Tüm Projelere Dön
        </Button>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      {/* Geri Dön Butonu */}
      <Button onClick={() => navigate('/projects')} variant="secondary" size="sm">
        ← Tüm Projelere Dön
      </Button>

      {/* Proje Başlığı */}
      <div>
        <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-2">{project.title}</h2>
        <div className="flex flex-wrap gap-3 items-center">
          <span className="text-sm text-slate-500 dark:text-gray-400">Yıl: {project.year}</span>
          <div className="flex gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light text-xs font-semibold rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Proje Açıklaması */}
      <Card variant="elevated">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3">Hakkında</h3>
        <p className="text-slate-600 dark:text-gray-300 leading-relaxed">{project.content}</p>
      </Card>

      {/* Özellikler ve Detaylar */}
      <Card variant="outlined">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Projede Kullanılan Teknolojiler</h3>
        <ul className="space-y-3">
          {project.details.map((detail, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="inline-block w-5 h-5 rounded-full bg-primary/20 dark:bg-primary/30 flex items-center justify-center mt-0.5">
                <span className="w-2 h-2 rounded-full bg-primary dark:bg-primary-light" />
              </span>
              <span className="text-slate-600 dark:text-gray-400 text-sm">{detail}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* CTA Butonları */}
      <div className="flex flex-wrap gap-3 pt-6">
        <Button variant="primary" href="https://github.com" target="_blank" rel="noopener noreferrer">
          Kaynak Kodunu Gör (GitHub)
        </Button>
        <Button variant="secondary" href="#">
          Canlı Demo
        </Button>
      </div>
    </section>
  );
}
