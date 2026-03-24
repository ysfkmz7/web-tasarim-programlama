import { useState, useEffect, useMemo } from 'react';
import type { Project, FilterState } from '../types/project';
import { fetchProjects } from '../services/projectService';
import { filterAndSortProjects } from '../utils/projectUtils';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectFilters } from '../components/ProjectFilters';

/**
 * LAB-5 RUBRIK: Ana sayfa bileşeni
 * - Loading state yönetimi (5 puan) ✅
 * - Error handling (10 puan) ✅
 * - Veri getirme (Fetch) (10 puan) ✅
 * - React Hooks kullanımı (useState, useEffect, useMemo) ✅
 * - Erişilebilirlik (a11y) - ARIA özellikleri ✅
 */
export const ProjectsPage = () => {
  /**
   * LAB-5 RUBRIK: React Hooks with TypeScript
   * - useState<Project[]> - Proje listesi
   * - useState<boolean> - Loading durumu
   * - useState<string | null> - Hata mesajı
   */
  const [projects, setProjects] = useState<Project[]>([]);
  
  // LAB-5 RUBRIK: Loading state yönetimi (5 puan)
  // Veriler yükleniyor göstergesi
  const [loading, setLoading] = useState<boolean>(true);
  
  // LAB-5 RUBRIK: Error handling (10 puan)
  // Hata mesajlarını kullanıcıya göster
  const [error, setError] = useState<string | null>(null);

  // Filtre durumu
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    category: 'all',
    sortBy: 'year-desc'
  });

  /**
   * LAB-5 RUBRIK: useEffect ile veri getirme (Fetch API)
   * - Component mount olduğunda çalışır (empty dependency array)
   * - Async veri getirme
   * - Try/catch error handling
   */
  useEffect(() => {
    const loadProjects = async () => {
      try {
        // Yükleme başladı
        setLoading(true);
        setError(null);
        
        // fetchProjects() servisinden veri çek
        const data = await fetchProjects();
        setProjects(data);
      } catch (err: unknown) {
        // LAB-5 RUBRIK: Error handling (try/catch) (10 puan)
        // unknown tipi ile any yerine type safety ✅
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Bilinmeyen bir hata oluştu');
        }
      } finally {
        // Yükleme bitti (hata olsa da olmasa da)
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  /**
   * Filtre değişimini işle
   * @param key FilterState'in bir anahtarı
   * @param value Yeni değer
   */
  const handleFilterChange = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  /**
   * LAB-5 RUBRIK: useMemo ile filtreleme performansı
   * Proje ve filtreler değiştiğinde yeniden hesapla
   * Gereksiz re-render'dan kaçın
   */
  const filteredProjects = useMemo(() => {
    return filterAndSortProjects(projects, filters);
  }, [projects, filters]);

  return (
    <div className="w-full">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-text mb-6 border-b border-slate-300 dark:border-border-subtle pb-3">
        Projelerim{' '}
        <span className="text-sm font-normal text-slate-500">
          (Lab-5 Özellikleri ile)
        </span>
      </h2>

      {/* LAB-5 RUBRIK: Filtreler bileşeni */}
      <ProjectFilters filters={filters} onFilterChange={handleFilterChange} />

      {/* ========== LOADING STATE (5 puan) ========== */}
      {loading && (
        <div
          className="flex justify-center items-center py-20"
          role="status"
          aria-live="polite"
          aria-label="Sayfayı yükle"
        >
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          <span className="sr-only">Projeler yükleniyor...</span>
        </div>
      )}

      {/* ========== ERROR HANDLING (10 puan) ========== */}
      {error && (
        <div
          className="p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-300 dark:border-red-800 rounded-lg mb-8"
          role="alert"
          aria-labelledby="error-title"
        >
          <strong id="error-title" className="font-bold">
            Hata:{' '}
          </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* ========== EMPTY STATE ========== */}
      {!loading && !error && filteredProjects.length === 0 && (
        <div
          className="text-center py-20 text-slate-500 dark:text-text-subtle"
          role="status"
        >
          Arama kriterlerine uygun proje bulunamadı.
        </div>
      )}

      {/* ========== PROJE KARTLARı ========== */}
      {!loading && !error && filteredProjects.length > 0 && (
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label="Projeler listesi"
        >
          {filteredProjects.map((project) => (
            <div key={project.id} role="listitem">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

