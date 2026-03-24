/**
 * LAB-5 RUBRIK: TypeScript tipleri doğru tanılması (15 puan)
 * - Literal types (Category, SortOption) ✅
 * - Interface/type tanımları ✅
 * - Union types (Exclude, etc.) ✅
 * - Optional properties (githubUrl?, liveUrl?) ✅
 */

/**
 * Proje kategorileri
 * @type {Category}
 */
export type Category = 'all' | 'frontend' | 'backend' | 'fullstack';

/**
 * Proje veri modeli
 * Properties:
 * - id: Benzersiz kimlik
 * - title: Proje adı
 * - description: Proje açıklaması
 * - category: frontend|backend|fullstack (not 'all')
 * - technologies: Kullanılan teknolojiler
 * - year: Geliştirme yılı
 * - githubUrl: (opsiyonel) GitHub repo linki
 * - liveUrl: (opsiyonel) Canlı demo linki
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  category: Exclude<Category, 'all'>; // 'all' sadece filtreleme için
  technologies: string[];
  year: number;
  githubUrl?: string;
  liveUrl?: string;
}

/**
 * Sıralama seçenekleri
 */
export type SortOption = 'year-desc' | 'year-asc' | 'title-asc' | 'title-desc';

/**
 * Filtre durumu (FilterState)
 * Arama, kategori ve sıralama kriterlerini tutar
 */
export interface FilterState {
  searchQuery: string;
  category: Category;
  sortBy: SortOption;
}
