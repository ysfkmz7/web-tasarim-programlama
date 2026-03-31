import Card from '../components/Card';

/* ═════════════════════════════════════════════════════════════════════════════
   About Sayfası
   
   LAB-6 RUBRIK: Temel Sayfa Yönlendirmeleri (15 Puan) ✅
   - "/about" rotasına bağlı Hakkımda sayfası
   ═════════════════════════════════════════════════════════════════════════════ */
export default function About() {
  return (
    <section className="space-y-12">
      <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white border-b border-slate-300 dark:border-border-subtle pb-4">
        Hakkımda
      </h2>

      {/* Kişisel Bilgiler */}
      <Card variant="elevated">
        <p className="text-slate-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
          Merhaba! Ben <span className="font-semibold text-slate-800 dark:text-white">Yusuf Kaymaz</span>.
          Fırat Üniversitesi Yazılım Mühendisliği öğrencisiyim ve <span className="text-blue-600 dark:text-blue-400 font-medium">Yapay zeka (LLM, NLP)</span>,{' '}
          <span className="text-purple-600 dark:text-purple-400 font-medium">Go dili</span>,{' '}
          <span className="text-red-600 dark:text-red-400 font-medium">siber güvenlik</span> ve kripto piyasaları için{' '}
          <span className="text-green-600 dark:text-green-400 font-medium">otomasyon botları</span> geliştirmekle
          ilgileniyorum.
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: 'Öğrenci No', value: '230541084' },
            { label: 'Bölüm', value: 'Yazılım Mühendisliği' },
            { label: 'Üniversite', value: 'Fırat Üniversitesi' },
          ].map((item) => (
            <li
              key={item.label}
              className="bg-slate-200 dark:bg-surface-2 rounded-lg px-4 py-3 border border-slate-300 dark:border-border-subtle"
            >
              <span className="block text-xs text-slate-500 dark:text-text-subtle uppercase tracking-wider mb-1">
                {item.label}
              </span>
              <span className="text-sm font-semibold text-slate-800 dark:text-white">{item.value}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* İlgi Alanları */}
      <div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">İlgi Alanlarım</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: '🤖 Yapay Zeka', items: ['NLP (Doğal Dil İşleme)', 'LLM (Büyük Dil Modelleri)', 'Makine Öğrenmesi'] },
            { title: '🔐 Siber Güvenlik', items: ['Penetrasyon Testi', 'Sistem Güvenliği', 'Ağ Güvenliği'] },
            { title: '💻 Programlama', items: ['Python', 'Go', 'TypeScript/React'] },
            { title: '📈 Kripto&Fintech', items: ['Trading Botları', 'Blokzincir', 'Otomatik Ticaret'] },
          ].map((category, idx) => (
            <Card key={idx} variant="outlined">
              <h4 className="font-bold text-slate-800 dark:text-white mb-3">{category.title}</h4>
              <ul className="space-y-2">
                {category.items.map((item, i) => (
                  <li key={i} className="text-sm text-slate-600 dark:text-gray-400 flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>

      {/* Hedefler */}
      <div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Hedeflerim</h3>
        <Card variant="elevated">
          <ol className="space-y-3 list-decimal list-inside">
            {[
              'Yapay zeka alanında derinlemesine bilgi sahibi olmak',
              'Siber güvenlik sertifikaları almak (CEH, OSCP)',
              'Go dilinde yüksek performa uygulamalar geliştirmek',
              'Kripto piyasaları için yapay zeka destekli trading botları oluşturmak',
              'Uzmanlaştığım alanlarda katkıda bulunmak ve açık kaynak projelere katılmak',
            ].map((goal, i) => (
              <li key={i} className="text-slate-600 dark:text-gray-300">
                {goal}
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </section>
  );
}
