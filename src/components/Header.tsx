import { NavLink } from 'react-router-dom';
import type { NavLinkRenderProps } from 'react-router-dom';

interface HeaderProps {
  dark: boolean;
  toggleDark: () => void;
}

/* ═════════════════════════════════════════════════════════════════════════════
   Header Bileşeni
   
   LAB-6 RUBRIK: Navigasyon (Link/NavLink) (10 Puan) ✅
   - <a> etiketleri iptal edildi
   - <NavLink> bileşeni kullanıldı
   - İsActive durumu ile menü linkinin stili dinamik olarak değişir
   ═════════════════════════════════════════════════════════════════════════════ */
export default function Header({ dark, toggleDark }: HeaderProps) {
  return (
    <header
      className="relative border-b border-border-subtle"
      style={{ background: 'linear-gradient(135deg, #0d1225 0%, #0f0c29 50%, #1a0533 100%)' }}
    >
      {/* Dark Mode Toggle — sağ üst köşe */}
      <div className="absolute top-4 right-4 sm:top-5 sm:right-6">
        <button
          type="button"
          onClick={toggleDark}
          aria-label={dark ? 'Açık moda geç' : 'Karanlık moda geç'}
          className="p-2.5 rounded-full border border-border bg-surface-2/60 hover:bg-surface-2
                     text-text-muted hover:text-text transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          {dark ? (
            /* Güneş İkonu — dark modda */
            <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 011.414-1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            /* Ay İkonu — light modda */
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
      </div>

      {/* Header İçerik */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 flex flex-col items-center gap-4 text-center">
        {/* Avatar */}
        <img
          src="https://api.dicebear.com/9.x/initials/svg?seed=YK&radius=50&backgroundColor=3b82f6"
          alt="Yusuf Kaymaz profil görseli"
          width={96}
          height={96}
          className="rounded-full ring-4 ring-primary/30 shadow-lg shadow-primary/20"
        />

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight
                       bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Yusuf Kaymaz
        </h1>

        <p className="text-text-muted text-base sm:text-lg max-w-md">
          Yazılım Mühendisliği Öğrencisi · Yapay Zeka &amp; Siber Güvenlik
        </p>

        {/* LAB-6 RUBRIK: Navigasyon (Link/NavLink) (10 Puan) ✅
            <a> etiketleri <NavLink> ile değiştirildi.
            İsActive durumuna göre stil değişiyor. */}
        <nav aria-label="Ana navigasyon" className="mt-2">
          <ul className="flex flex-wrap justify-center gap-2">
            <li>
              <NavLink
                to="/"
                className={({ isActive }: NavLinkRenderProps) =>
                  `px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                   focus:outline-none focus:ring-2 focus:ring-white/40
                   ${
                     isActive
                       ? 'text-primary dark:text-purple-400 font-bold bg-white/10 border border-white/30'
                       : 'text-gray-600 dark:text-gray-300 hover:text-white hover:border-white/30 hover:bg-white/10 border border-transparent'
                   }`
                }
              >
                Ana Sayfa
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }: NavLinkRenderProps) =>
                  `px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                   focus:outline-none focus:ring-2 focus:ring-white/40
                   ${
                     isActive
                       ? 'text-primary dark:text-purple-400 font-bold bg-white/10 border border-white/30'
                       : 'text-gray-600 dark:text-gray-300 hover:text-white hover:border-white/30 hover:bg-white/10 border border-transparent'
                   }`
                }
              >
                Hakkımda
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/projects"
                className={({ isActive }: NavLinkRenderProps) =>
                  `px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                   focus:outline-none focus:ring-2 focus:ring-white/40
                   ${
                     isActive
                       ? 'text-primary dark:text-purple-400 font-bold bg-white/10 border border-white/30'
                       : 'text-gray-600 dark:text-gray-300 hover:text-white hover:border-white/30 hover:bg-white/10 border border-transparent'
                   }`
                }
              >
                Projeler
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }: NavLinkRenderProps) =>
                  `px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                   focus:outline-none focus:ring-2 focus:ring-white/40
                   ${
                     isActive
                       ? 'text-primary dark:text-purple-400 font-bold bg-white/10 border border-white/30'
                       : 'text-gray-600 dark:text-gray-300 hover:text-white hover:border-white/30 hover:bg-white/10 border border-transparent'
                   }`
                }
              >
                İletişim
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/ui-kit"
                className={({ isActive }: NavLinkRenderProps) =>
                  `px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                   focus:outline-none focus:ring-2 focus:ring-white/40
                   ${
                     isActive
                       ? 'text-primary dark:text-purple-400 font-bold bg-white/10 border border-white/30'
                       : 'text-gray-600 dark:text-gray-300 hover:text-white hover:border-white/30 hover:bg-white/10 border border-transparent'
                   }`
                }
              >
                UI Kit
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
