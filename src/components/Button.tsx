import type { ButtonHTMLAttributes, ReactNode } from "react";

/* ─── Tip Tanımları ─── */
type Variant = "primary" | "secondary" | "danger" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

/* ─── Variant → Tailwind sınıfları ─── */
const variantMap: Record<Variant, string> = {
  primary:
    "bg-primary text-white border border-primary " +
    "hover:bg-primary-dark hover:border-primary-dark " +
    "focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 " +
    "focus:ring-offset-white dark:focus:ring-offset-surface",

  secondary:
    "bg-secondary text-white border border-secondary " +
    "hover:bg-secondary-dark hover:border-secondary-dark " +
    "focus:ring-2 focus:ring-secondary/50 focus:ring-offset-2 " +
    "focus:ring-offset-white dark:focus:ring-offset-surface",

  danger:
    "bg-red-600 text-white border border-red-600 " +
    "hover:bg-red-700 hover:border-red-700 " +
    "focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 " +
    "focus:ring-offset-white dark:focus:ring-offset-surface",

  ghost:
    "bg-transparent text-slate-600 dark:text-text-muted " +
    "border border-slate-300 dark:border-border " +
    "hover:bg-slate-100 dark:hover:bg-surface-2 " +
    "hover:text-slate-900 dark:hover:text-text " +
    "hover:border-slate-400 dark:hover:border-primary/40 " +
    "focus:ring-2 focus:ring-slate-400/40 dark:focus:ring-primary/40 " +
    "focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-surface",
};

/* ─── Size → Tailwind sınıfları ─── */
const sizeMap: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm rounded-md gap-1.5",
  md: "px-5 py-2.5 text-base rounded-lg gap-2",
  lg: "px-7 py-3.5 text-lg rounded-xl gap-2.5",
};

/* ═══════════════════════════════════════════════════════════════
   Button Bileşeni
   ═══════════════════════════════════════════════════════════════ */
export default function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={[
        /* Temel stiller */
        "inline-flex items-center justify-center font-semibold",
        "cursor-pointer select-none",
        "transition-all duration-200",
        "focus:outline-none",
        /* Disabled */
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
        /* Variant & Size */
        variantMap[variant],
        sizeMap[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </button>
  );
}
