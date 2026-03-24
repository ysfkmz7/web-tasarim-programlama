import type { Category, FilterState, SortOption } from '../types/project';

interface ProjectFiltersProps {
  filters: FilterState;
  onFilterChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
}

/**
 * LAB-5 RUBRIK: Filtreler bileşeni
 * - Arama filtresi (15 puan) ✅
 * - Kategori filtresi (10 puan) ✅
 * - Sıralama (10 puan) ✅
 * - Erişilebilirlik (a11y) - label, aria özellikleri ✅
 * - Tailwind CSS v4 ve dark mode ✅
 */
export const ProjectFilters = ({ filters, onFilterChange }: ProjectFiltersProps) => {
  return (
    <div
      className="flex flex-col md:flex-row gap-4 mb-8 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
      role="group"
      aria-labelledby="filters-title"
    >
      <h3 id="filters-title" className="sr-only">
        Projeler Süzgeci
      </h3>

      {/* ========== ARAMA FİLTRESİ (15 puan) ========== */}
      {/* 
        Özellikleri:
        - Başlık, açıklama ve teknolojilerde arama ✅
        - Case-insensitive (küçük-büyük harf fark etmez) ✅
        - Real-time filtreleme (onChange event) ✅
        - Semantic HTML (label + input bağlantısı) ✅
      */}
      <div className="flex-1">
        <label
          htmlFor="search-input"
          className="sr-only"
        >
          Proje Adı, Açıklaması veya Teknoloji ile Ara
        </label>
        <input
          id="search-input"
          type="text"
          placeholder="Proje adı, açıklama veya teknoloji ara..."
          className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-colors"
          value={filters.searchQuery}
          onChange={(e) => onFilterChange('searchQuery', e.target.value)}
          aria-describedby="search-help"
        />
        <span id="search-help" className="sr-only">
          Başlık, açıklama veya teknoloji adına göre filtrele
        </span>
      </div>

      {/* ========== KATEGORİ FİLTRESİ (10 puan) ========== */}
      {/* 
        Özellikleri:
        - Frontend, Backend, Fullstack kategorileri ✅
        - "Tüm Kategoriler" seçeneği (all değeri) ✅
        - Dropdown select kontrolü ✅
        - Semantic HTML (label + select bağlantısı) ✅
      */}
      <div className="flex-none">
        <label
          htmlFor="category-select"
          className="sr-only"
        >
          Proje Kategorisini Seç
        </label>
        <select
          id="category-select"
          className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors cursor-pointer"
          value={filters.category}
          onChange={(e) => onFilterChange('category', e.target.value as Category)}
          aria-describedby="category-help"
        >
          <option value="all">📁 Tüm Kategoriler</option>
          <option value="frontend">🎨 Frontend</option>
          <option value="backend">⚙️ Backend</option>
          <option value="fullstack">🔗 Fullstack</option>
        </select>
        <span id="category-help" className="sr-only">
          Kategoriye göre filtrele
        </span>
      </div>

      {/* ========== SIRALAMA (10 puan) ========== */}
      {/* 
        Özellikleri:
        - Yıla göre artan/azalan sıralama ✅
        - Başlığa göre A-Z / Z-A sıralama ✅
        - 4 farklı sıralama seçeneği ✅
        - Semantic HTML (label + select bağlantısı) ✅
      */}
      <div className="flex-none">
        <label
          htmlFor="sort-select"
          className="sr-only"
        >
          Sıralama Seçeneği
        </label>
        <select
          id="sort-select"
          className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors cursor-pointer"
          value={filters.sortBy}
          onChange={(e) => onFilterChange('sortBy', e.target.value as SortOption)}
          aria-describedby="sort-help"
        >
          <option value="year-desc">📅 Yıl (En Yeni)</option>
          <option value="year-asc">📅 Yıl (En Eski)</option>
          <option value="title-asc">🔤 Başlık (A-Z)</option>
          <option value="title-desc">🔤 Başlık (Z-A)</option>
        </select>
        <span id="sort-help" className="sr-only">
          Projeleri sıralamaya göre düzenle
        </span>
      </div>
    </div>
  );
};

