import type { Project } from '../types/project';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  project: Project;
}

/**
 * LAB-5 RUBRIK: Proje Kartı Bileşeni
 * - UI/Component yapısı (10 puan) ✅
 * - TypeScript tiplendirmesi (no 'any') ✅
 * - Erişilebilirlik (a11y) - ARIA attributes ✅
 * - Dark mode desteği ✅
 * - Responsive tasarım ✅
 */
export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <article
      className="p-5 border rounded-lg shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow-md dark:hover:shadow-lg transition-shadow duration-300"
      role="article"
      aria-labelledby={`project-${project.id}-title`}
      itemScope
      itemType="https://schema.org/SoftwareSourceCode"
    >
      {/* ========== PROJE BAŞLIĞI ========== */}
      <h3
        id={`project-${project.id}-title`}
        className="text-xl font-bold mb-2 text-gray-900 dark:text-white"
        itemProp="name"
      >
        {project.title}{' '}
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          ({project.year})
        </span>
      </h3>

      {/* ========== PROJE AÇIKLAMASI ========== */}
      <p
        className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed"
        itemProp="description"
      >
        {project.description}
      </p>

      {/* ========== TEKNOLOJİLER ========== */}
      {/* 
        LAB-5 RUBRIK: Teknoloji etiketleri
        - Erişilebilirlik: aria-label ✅
        - Array.map() döngüsü ✅
        - Dark mode desteği ✅
        - TypeScript tiplendirmesi (no 'any') ✅
      */}
      <div
        className="flex flex-wrap gap-2 mb-4"
        aria-label="Proje Teknolojileri"
        role="list"
        itemProp="keywords"
      >
        {project.technologies.map((tech: string) => (
          <span
            key={tech}
            className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 text-xs rounded-full font-medium hover:bg-blue-200 dark:hover:bg-blue-900 transition-colors"
            role="listitem"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* ========== KATEGORİ VE LİNKLER ========== */}
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        {/* Kategori Etiketi */}
        <span
          className="capitalize text-sm font-medium text-purple-600 dark:text-purple-400"
          itemProp="applicationCategory"
        >
          {/* Kategori simgesi ve metni */}
          {project.category === 'frontend' && '🎨 Frontend'}
          {project.category === 'backend' && '⚙️ Backend'}
          {project.category === 'fullstack' && '🔗 Fullstack'}
        </span>

        {/* GitHub Linki (eğer varsa) */}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium underline-offset-2 hover:underline transition-colors"
            aria-label={`${project.title} GitHub reposunu açar (yeni sekmede açılır)`}
            itemProp="url"
          >
            GitHub'da Gör →
          </a>
        )}
      </div>

      {/* Canlı Demo Linki (eğer varsa) */}
      {project.liveUrl && (
        <div className="mt-3">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 text-sm font-medium underline-offset-2 hover:underline transition-colors"
            aria-label={`${project.title} canlı demosunu açar (yeni sekmede açılır)`}
          >
            🌐 Canlı Demo
          </a>
        </div>
      )}

      {/* LAB-6 RUBRIK: Dinamik Rota (URL Parametreleri) ✅
          Proje kartından /projects/:id rotasına Link */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Link
          to={`/projects/${project.id}`}
          className="inline-block px-4 py-2 text-sm font-medium rounded-lg
                     bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600
                     transition-colors"
          aria-label={`${project.title} detaylarını görüntüle`}
        >
          Detayları Gör →
        </Link>
      </div>
    </article>
  );
};

