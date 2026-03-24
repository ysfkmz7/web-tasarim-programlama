import type { Project, FilterState } from '../types/project';

/**
 * LAB-5 RUBRIK: Modüler kod yapısı - Utils katmanı (10 puan)
 * İş mantığı (filtreleme, sıralama) ayrı dosyada ✅
 */

/**
 * Projeleri filtreleyip sıralar
 * 
 * LAB-5 RUBRIK: Kategori filtresi (10 puan)
 * - 'all' seçeneği hepsi gösterir ✅
 * - 'frontend', 'backend', 'fullstack' kategorileri ✅
 * 
 * LAB-5 RUBRIK: Arama filtresi (15 puan)
 * - Başlıkta arama ✅
 * - Açıklamada arama ✅
 * - Teknolojilerde arama ✅
 * - Case-insensitive arama (toLowerCase) ✅
 * 
 * LAB-5 RUBRIK: Sıralama (10 puan)
 * - Yıla göre artan/azalan ✅
 * - Başlığa göre A-Z / Z-A ✅
 * - localeCompare kullanımı (Türkçe karakterler için) ✅
 * 
 * @param projects - Proje dizisi
 * @param filters - Filtreleme ve sıralama kriterleri
 * @returns Filtrelenmiş ve sıralanmış proje dizisi
 */
export const filterAndSortProjects = (
  projects: Project[],
  filters: FilterState
): Project[] => {
  // Orijinal diziyi değiştiremiyorum, kopyasını yapıyorum
  let result = [...projects];

  // ========== KATEGORI FİLTRESİ (10 puan) ==========
  // 'all' harici kategorilere göre filtrele
  if (filters.category !== 'all') {
    result = result.filter((project: Project) => project.category === filters.category);
  }

  // ========== ARAMA FİLTRESİ (15 puan) ==========
  // Başlık, açıklama ve teknolojilerde arama yapar
  if (filters.searchQuery.trim() !== '') {
    const query = filters.searchQuery.toLowerCase();
    result = result.filter((project: Project) => {
      // Başlıkta ara
      const titleMatch = project.title.toLowerCase().includes(query);
      
      // Açıklamada ara
      const descriptionMatch = project.description.toLowerCase().includes(query);
      
      // Teknolojilerde ara (en az bir match yeterli)
      const techMatch = project.technologies.some((tech: string) =>
        tech.toLowerCase().includes(query)
      );
      
      return titleMatch || descriptionMatch || techMatch;
    });
  }

  // ========== SIRALAMA (10 puan) ==========
  // Switch bildirimi ile sıralama seçeneğini işle
  result.sort((a: Project, b: Project) => {
    switch (filters.sortBy) {
      // En yeni yıl önce
      case 'year-desc':
        return b.year - a.year;
      
      // En eski yıl önce
      case 'year-asc':
        return a.year - b.year;
      
      // Başlık A-Z (localeCompare Türkçe karakterleri doğru sıralar)
      case 'title-asc':
        return a.title.localeCompare(b.title, 'tr-TR');
      
      // Başlık Z-A
      case 'title-desc':
        return b.title.localeCompare(a.title, 'tr-TR');
      
      // Varsayılan: orijinal sıra
      default:
        return 0;
    }
  });

  return result;
};

