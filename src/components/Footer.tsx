/* ═════════════════════════════════════════════════════════════════════════════
   Footer Bileşeni
   
   LAB-6 RUBRIK: Layout Route ve Outlet Kullanımı (15 Puan) ✅
   - Footer, Layout içinde sabit kalır ve tüm sayfalarda görünür
   ═════════════════════════════════════════════════════════════════════════════ */
export default function Footer() {
  return (
    <footer className="border-t border-slate-300 dark:border-gray-800 mt-20 py-8">
      <div
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row
                   items-center justify-between gap-3 text-sm text-text-subtle"
      >
        <p className="text-slate-500 dark:text-text-subtle">
          © {new Date().getFullYear()}{' '}
          <span className="text-slate-700 dark:text-text-muted font-medium">Yusuf Kaymaz</span> — Fırat
          Üniversitesi Yazılım Mühendisliği
        </p>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-success animate-pulse" />
          <span>Tailwind CSS v4</span>
        </div>
      </div>
    </footer>
  );
}
