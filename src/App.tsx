import { useState, useEffect } from "react";
import type { FormEvent, ChangeEvent } from "react";
import Button from "./components/Button";
import Input from "./components/Input";
import Card from "./components/Card";
import Alert from "./components/Alert";

/* ─────────────────────────────────────────────
   Tip Tanımları
   ───────────────────────────────────────────── */
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/* ─────────────────────────────────────────────
   Sabitler
   ───────────────────────────────────────────── */
const INITIAL_FORM: FormData  = { name: "", email: "", subject: "", message: "" };
const INITIAL_ERRORS: FormErrors = { name: "", email: "", subject: "", message: "" };

const NAV_LINKS = [
  { href: "#about",    label: "Hakkımda" },
  { href: "#projects", label: "Projeler"  },
  { href: "#contact",  label: "İletişim"  },
  { href: "/ui-kit",   label: "UI Kit"    },
];

const PROJECTS = [
  {
    title: "Kripto Sinyal Telegram Botu",
    desc:  "Go dili ve çeşitli API'ler ile geliştirilmiş haber bazlı otomasyon botu. Kripto piyasalarındaki anlık haberleri takip ederek Telegram üzerinden sinyal gönderir.",
    tags:  ["Go", "API", "Telegram"],
    image: "https://api.dicebear.com/9.x/bottts/svg?seed=crypto&backgroundColor=0d1225",
  },
  {
    title: "Secret Knock Lock",
    desc:  "Tinkercad üzerinde Piezo sensörlü Arduino projesi. Belirli bir ritimde kapıya vuruş yapıldığında kilidi açan akıllı kilit sistemi.",
    tags:  ["Arduino", "C++", "IoT"],
    image: "https://api.dicebear.com/9.x/bottts/svg?seed=lock&backgroundColor=131a30",
  },
];

/* ─────────────────────────────────────────────
   Doğrulama Fonksiyonu
   ───────────────────────────────────────────── */
function validateField(name: keyof FormData, value: string): string {
  const trimmed = value.trim();
  switch (name) {
    case "name":
      if (!trimmed)         return "Ad Soyad alanı zorunludur.";
      if (trimmed.length < 2) return "En az 2 karakter olmalıdır.";
      return "";
    case "email":
      if (!trimmed) return "E-posta alanı zorunludur.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed))
        return "Geçerli bir e-posta adresi giriniz.";
      return "";
    case "subject":
      if (!trimmed) return "Lütfen bir konu seçiniz.";
      return "";
    case "message":
      if (!trimmed)          return "Mesaj alanı zorunludur.";
      if (trimmed.length < 10) return "En az 10 karakter olmalıdır.";
      return "";
    default:
      return "";
  }
}

/* ═══════════════════════════════════════════════════════════════
   Dark Mode Hook
   İlk değer: dark (siber güvenlik teması koyu önce açılır).
   index.html'deki inline script sayesinde React mount öncesi
   .dark sınıfı zaten uygulanmış olur — flash yok.
   ═══════════════════════════════════════════════════════════════ */
function useDarkMode() {
  // Tercih yoksa dark varsayılan; 'light' olarak kayıtlıysa light
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") !== "light"
  );

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return { dark, toggleDark: () => setDark((d) => !d) };
}

/* ═══════════════════════════════════════════════════════════════
   Ana Bileşen
   ═══════════════════════════════════════════════════════════════ */
export default function App() {
  const { dark, toggleDark } = useDarkMode();

  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [errors,   setErrors]   = useState<FormErrors>(INITIAL_ERRORS);
  const [submitted, setSubmitted] = useState(false);

  /* Alan değişimi */
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const key = name as keyof FormData;
    setErrors((prev) => ({ ...prev, [key]: validateField(key, value) }));
  };

  /* Form gönderimi */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: FormErrors = {
      name:    validateField("name",    formData.name),
      email:   validateField("email",   formData.email),
      subject: validateField("subject", formData.subject),
      message: validateField("message", formData.message),
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some((m) => m !== "")) return;
    setSubmitted(true);
    setFormData(INITIAL_FORM);
    setErrors(INITIAL_ERRORS);
    setTimeout(() => setSubmitted(false), 4000);
  };

  /* ════ JSX ════ */
  return (
<div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-gray-950 dark:text-gray-100 font-sans transition-colors duration-300">

      {/* Skip Link — Erişilebilirlik */}
      <a href="#main-content" className="skip-link">Ana içeriğe atla</a>

      {/* ══════════════════════════════════════
          HEADER
          ══════════════════════════════════════ */}
      <header className="relative border-b border-border-subtle"
        style={{ background: "linear-gradient(135deg, #0d1225 0%, #0f0c29 50%, #1a0533 100%)" }}>

        {/* Dark Mode Toggle — sağ üst köşe */}
        <div className="absolute top-4 right-4 sm:top-5 sm:right-6">
          <button
            type="button"
            onClick={toggleDark}
            aria-label={dark ? "Açık moda geç" : "Karanlık moda geç"}
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

          {/* Navigasyon */}
          <nav aria-label="Ana navigasyon" className="mt-2">
            <ul className="flex flex-wrap justify-center gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="px-4 py-1.5 rounded-full text-sm font-medium text-white/70
                               hover:text-white hover:border-white/30 hover:bg-white/10
                               border border-transparent
                               transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/40"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* ══════════════════════════════════════
          MAIN
          ══════════════════════════════════════ */}
      <main id="main-content" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">

        {/* ── Hakkımda ── */}
        <section id="about" className="scroll-mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-text mb-6
                         border-b border-slate-300 dark:border-border-subtle pb-3">
            Hakkımda
          </h2>

          <Card variant="elevated" className="max-w-3xl">
              <p className="text-slate-600 dark:text-text-muted text-sm sm:text-base leading-relaxed mb-4">
              Merhaba! Ben <span className="font-semibold text-text">Yusuf Kaymaz</span>.
              Fırat Üniversitesi Yazılım Mühendisliği öğrencisiyim.{" "}
              <span className="text-primary-light font-medium">Yapay zeka (LLM, NLP)</span>,{" "}
              <span className="text-secondary-light font-medium">Go dili</span>,{" "}
              <span className="text-neon font-medium">siber güvenlik</span> ve kripto piyasaları için{" "}
              <span className="text-primary-light font-medium">otomasyon botları</span> geliştirmekle
              ilgileniyorum.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: "Öğrenci No",  value: "230541084" },
                { label: "Bölüm",       value: "Yazılım Mühendisliği" },
                { label: "Üniversite",  value: "Fırat Üniversitesi" },
              ].map((item) => (
                <li
                  key={item.label}
                  className="bg-slate-200 dark:bg-surface-2 rounded-lg px-4 py-3 border border-slate-300 dark:border-border-subtle"
                >
                  <span className="block text-xs text-slate-500 dark:text-text-subtle uppercase tracking-wider mb-1">
                    {item.label}
                  </span>
                  <span className="text-sm font-semibold text-slate-800 dark:text-text">{item.value}</span>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        {/* ── Projeler ── */}
        <section id="projects" className="scroll-mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-text mb-6
                         border-b border-slate-300 dark:border-border-subtle pb-3">
            Projelerim
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.map((project, idx) => (
              <Card
                key={idx}
                variant="elevated"
                title={project.title}
                footer={
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full text-xs font-medium
                                   bg-primary/10 text-primary-light border border-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                }
              >
                {project.desc}
              </Card>
            ))}
          </div>
        </section>

        {/* ── İletişim ── */}
        <section id="contact" className="scroll-mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-text mb-6
                         border-b border-slate-300 dark:border-border-subtle pb-3">
            İletişim
          </h2>

          {/* Başarı Mesajı */}
          {submitted && (
            <Alert variant="success" className="mb-6">
              Mesajınız başarıyla gönderildi. En kısa sürede dönüş yapacağım, teşekkürler!
            </Alert>
          )}

          {/* Form Kartı */}
          <Card variant="elevated" className="max-w-2xl">
            <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* Ad Soyad */}
              <Input
                label="Ad Soyad"
                name="name"
                type="text"
                minLength={2}
                required
                placeholder="Adınız ve Soyadınız"
                value={formData.name}
                onChange={handleChange}
                error={errors.name || undefined}
                helpText="En az 2 karakter giriniz."
              />

              {/* E-posta */}
              <Input
                label="E-posta"
                name="email"
                type="email"
                required
                placeholder="ornek@mail.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email || undefined}
              />

              {/* Konu — native select */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="subject"
                  className="text-sm font-medium text-slate-700 dark:text-text-muted"
                >
                  Konu
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                  aria-invalid={!!errors.subject}
                  className="w-full rounded-lg px-4 py-2.5 text-sm
                             bg-white dark:bg-surface-2 text-slate-800 dark:text-text
                             border border-slate-300 dark:border-border
                             focus:border-blue-400 dark:focus:border-primary
                             focus:ring-2 focus:ring-blue-400/40 dark:focus:ring-primary/40
                             focus:ring-offset-1 focus:ring-offset-white dark:focus:ring-offset-surface
                             focus:outline-none transition-all duration-200"
                >
                  <option value="">-- Konu Seçiniz --</option>
                  <option value="genel">Genel Bilgi</option>
                  <option value="proje">Proje İşbirliği</option>
                  <option value="oneri">Öneri / Geri Bildirim</option>
                  <option value="diger">Diğer</option>
                </select>
                {errors.subject && (
                  <p id="subject-error" role="alert"
                     className="text-xs font-medium text-error flex items-center gap-1">
                    <svg aria-hidden="true" className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Mesaj — native textarea */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-sm font-medium text-slate-700 dark:text-text-muted">
                  Mesaj
                </label>
                <textarea
                  id="message"
                  name="message"
                  minLength={10}
                  required
                  rows={5}
                  placeholder="Mesajınızı buraya yazınız…"
                  value={formData.message}
                  onChange={handleChange}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  aria-invalid={!!errors.message}
                  className="w-full rounded-lg px-4 py-2.5 text-sm
                             bg-white dark:bg-surface-2 text-slate-800 dark:text-text
                             placeholder:text-slate-400 dark:placeholder:text-text-subtle
                             border border-slate-300 dark:border-border resize-y
                             transition-all duration-200 focus:outline-none focus:ring-2
                             focus:ring-offset-1 focus:ring-offset-white dark:focus:ring-offset-surface
                             focus:border-blue-400 dark:focus:border-primary
                             focus:ring-blue-400/40 dark:focus:ring-primary/40"
                />
                {errors.message && (
                  <p id="message-error" role="alert"
                     className="text-xs font-medium text-error flex items-center gap-1">
                    <svg aria-hidden="true" className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Gönder Butonu */}
              <Button type="submit" variant="primary" size="lg" className="self-start">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Mesajı Gönder
              </Button>

            </form>
          </Card>
        </section>
      </main>

      {/* ══════════════════════════════════════
          FOOTER
          ══════════════════════════════════════ */}
      <footer className="border-t border-slate-300 dark:border-gray-800 mt-20 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row
                        items-center justify-between gap-3 text-sm text-text-subtle">
          <p className="text-slate-500 dark:text-text-subtle">
            © {new Date().getFullYear()}{" "}
            <span className="text-slate-700 dark:text-text-muted font-medium">Yusuf Kaymaz</span> — Fırat
            Üniversitesi Yazılım Mühendisliği
          </p>
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-success animate-pulse" />
            <span>Tailwind CSS v4</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
