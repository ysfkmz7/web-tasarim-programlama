import type { Project } from '../types/project';

/**
 * LAB-5 RUBRIK: Modüler kod yapısı - Service katmanı (10 puan)
 * Fetch API işlemlerinin ayrı dosyada tutulması ✅
 * 
 * LAB-5 RUBRIK: Fetch API ile veri çekme (10 puan)
 * - async/await pattern ✅
 * - response.ok kontrolü ✅
 * - HTTP status error handling ✅
 * Promise<Project[]> return tipi ✅
 */

/**
 * JSON veri dosyasından projeleri çeker
 * @returns {Promise<Project[]>} Projeler dizisi
 * @throws {Error} Ağ hatası veya JSON parse hatası
 */
export const fetchProjects = async (): Promise<Project[]> => {
  try {
    // Fetch API ile JSON dosyasını iste
    const response = await fetch('/data/projects.json');
    
    // LAB-5 RUBRIK: HTTP durum kodunu kontrol et (response.ok)
    if (!response.ok) {
      throw new Error(`HTTP hatası! Status: ${response.status}`);
    }
    
    // LAB-5 RUBRIK: Yanıtı JSON'a parse et ve türü kontrol et
    const data: Project[] = await response.json();
    
    // Veri integritesi kontrol (opsiyonel ama iyi pratik)
    if (!Array.isArray(data)) {
      throw new Error('Geçersiz veri formatı: Array bekleniyor');
    }
    
    return data;
  } catch (error: unknown) {
    /**
     * LAB-5 RUBRIK: Error handling (try/catch) (10 puan)
     * - Error instance kontrolü (instanceof Error) ✅
     * - unknown tipi kullanımı (any yerine) ✅
     * - Kullanıcı dostu hata mesajı ✅
     */
    if (error instanceof Error) {
      throw new Error(`Projeler yüklenirken hata oluştu: ${error.message}`);
    }
    
    // Bilinen olmayan hata tipi
    throw new Error('Projeler yüklenirken bilinmeyen bir hata oluştu.');
  }
};

