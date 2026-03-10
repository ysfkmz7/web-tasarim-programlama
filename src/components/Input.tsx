import type { InputHTMLAttributes } from "react";
import { useId } from "react";

/* ─── Tip Tanımları ─── */
interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  label?: string;
  error?: string;
  helpText?: string;
}

/* ═══════════════════════════════════════════════════════════════
   Input Bileşeni
   ═══════════════════════════════════════════════════════════════ */
export default function Input({
  label,
  error,
  helpText,
  disabled = false,
  className = "",
  ...rest
}: InputProps) {
  const uid = useId();
  const inputId = `input-${uid}`;
  const errorId = `error-${uid}`;
  const helpId  = `help-${uid}`;

  /* aria-describedby: varsa error + helpText id'lerini birleştir */
  const describedBy = [
    error    ? errorId : "",
    helpText ? helpId  : "",
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className={[
            "text-sm font-medium",
            disabled
              ? "text-slate-400 dark:text-text-subtle"
              : "text-slate-700 dark:text-text-muted",
          ].join(" ")}
        >
          {label}
        </label>
      )}

      {/* Input */}
      <input
        id={inputId}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        className={[
          "w-full rounded-lg px-4 py-2.5 text-sm",
          "bg-white dark:bg-surface-2",
          "text-slate-800 dark:text-text",
          "placeholder:text-slate-400 dark:placeholder:text-text-subtle",
          "border",
          "transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-offset-1",
          "focus:ring-offset-white dark:focus:ring-offset-surface",
          error
            ? "border-red-400 dark:border-error focus:border-red-500 dark:focus:border-error focus:ring-red-400/40 dark:focus:ring-error/50"
            : "border-slate-300 dark:border-border focus:border-blue-400 dark:focus:border-primary focus:ring-blue-400/40 dark:focus:ring-primary/40",
          disabled
            ? "opacity-50 cursor-not-allowed bg-slate-100 dark:bg-surface-3"
            : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      />

      {/* Hata mesajı */}
      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-xs font-medium text-error flex items-center gap-1"
        >
          <svg
            aria-hidden="true"
            className="w-3.5 h-3.5 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}

      {/* Yardımcı metin */}
      {helpText && !error && (
        <p id={helpId} className="text-xs text-slate-500 dark:text-text-subtle">
          {helpText}
        </p>
      )}
    </div>
  );
}
