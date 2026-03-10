import type { ReactNode } from "react";

/* ─── Tip Tanımları ─── */
type CardVariant = "elevated" | "outlined" | "filled";

interface CardProps {
  variant?: CardVariant;
  title?: string;
  image?: string;
  imageAlt?: string;
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
}

/* ─── Variant → Tailwind sınıfları ─── */
const variantMap: Record<CardVariant, string> = {
  elevated:
    "bg-white dark:bg-surface shadow-md dark:shadow-black/40 border border-slate-200 dark:border-border-subtle " +
    "hover:shadow-xl dark:hover:shadow-primary/10 hover:-translate-y-0.5",

  outlined:
    "bg-transparent border-2 border-slate-300 dark:border-border " +
    "hover:border-blue-400 dark:hover:border-primary/60 hover:bg-slate-50 dark:hover:bg-surface/50",

  filled:
    "bg-slate-100 dark:bg-surface-3 border border-slate-200 dark:border-border-subtle " +
    "hover:bg-slate-200 dark:hover:bg-surface-2",
};

/* ═══════════════════════════════════════════════════════════════
   Card Bileşeni
   ═══════════════════════════════════════════════════════════════ */
export default function Card({
  variant = "elevated",
  title,
  image,
  imageAlt = "",
  footer,
  children,
  className = "",
}: CardProps) {
  return (
    <article
      className={[
        "rounded-xl overflow-hidden",
        "transition-all duration-300",
        variantMap[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Üst Görsel */}
      {image && (
        <div className="overflow-hidden">
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}

      {/* İçerik */}
      <div className="p-5">
        {title && (
          <h3 className="text-base font-semibold text-slate-800 dark:text-text mb-2 leading-snug">
            {title}
          </h3>
        )}
        {children && (
          <div className="text-sm text-slate-600 dark:text-text-muted leading-relaxed">
            {children}
          </div>
        )}
      </div>

      {/* Footer */}
      {footer && (
        <div className="px-5 py-3 border-t border-slate-200 dark:border-border-subtle flex items-center justify-between gap-2">
          {footer}
        </div>
      )}
    </article>
  );
}
