import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";

/* ───────── Tip Tanımları ───────── */
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

/* ───────── Sabitler ───────── */
const INITIAL_FORM: FormData = { name: "", email: "", subject: "", message: "" };
const INITIAL_ERRORS: FormErrors = { name: "", email: "", subject: "", message: "" };

const NAV_LINKS = [
  { href: "#about", label: "Hakkımda" },
  { href: "#projects", label: "Projeler" },
  { href: "#contact", label: "İletişim" },
];

const PROJECTS = [
  {
    title: "Kripto Sinyal Telegram Botu",
    desc: "Go dili ve çeşitli API'ler ile geliştirilmiş, haber bazlı otomasyon botu. Kripto piyasalarındaki anlık haberleri takip ederek Telegram üzerinden sinyal gönderir.",
  },
  {
    title: "Secret Knock Lock",
    desc: "Tinkercad üzerinde Piezo sensörlü Arduino projesi. Belirli bir ritimde kapıya vuruş yapıldığında kilidi açan akıllı kilit sistemi.",
  },
];

/* ───────── Doğrulama Fonksiyonu ───────── */
function validateField(name: keyof FormData, value: string): string {
  const trimmed = value.trim();

  switch (name) {
    case "name":
      if (!trimmed) return "Ad Soyad alanı zorunludur.";
      if (trimmed.length < 2) return "Ad Soyad en az 2 karakter olmalıdır.";
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
      if (!trimmed) return "Mesaj alanı zorunludur.";
      if (trimmed.length < 10) return "Mesaj en az 10 karakter olmalıdır.";
      return "";
    default:
      return "";
  }
}

/* ═══════════════════════════════════════════
   Ana Bileşen
   ═══════════════════════════════════════════ */
export default function App() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>(INITIAL_ERRORS);
  const [submitted, setSubmitted] = useState(false);

  /* ---- Alan değişimi ---- */
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const fieldName = name as keyof FormData;
    setErrors((prev) => ({
      ...prev,
      [fieldName]: validateField(fieldName, value),
    }));
  };

  /* ---- Form gönderimi ---- */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: FormErrors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      subject: validateField("subject", formData.subject),
      message: validateField("message", formData.message),
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((msg) => msg !== "");
    if (hasError) return;

    setSubmitted(true);
    setFormData(INITIAL_FORM);
    setErrors(INITIAL_ERRORS);

    setTimeout(() => setSubmitted(false), 4000);
  };

  /* ═══════ JSX ═══════ */
  return (
    <>
      {/* Erişilebilirlik: İçeriğe atla bağlantısı */}
      <a href="#main-content" className="skip-link">
        Ana içeriğe atla
      </a>

      {/* ══════════ HEADER ══════════ */}
      <header className="site-header">
        <div className="container header-inner">
          <h1>Yusuf Kaymaz</h1>
          <p className="subtitle">Yazılım Mühendisliği Öğrencisi</p>

          <nav aria-label="Ana navigasyon">
            <ul className="nav-list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* ══════════ MAIN ══════════ */}
      <main id="main-content" className="container">
        {/* ── Hakkımda ── */}
        <section id="about" className="section">
          <h2>Hakkımda</h2>

          <img
            src="https://api.dicebear.com/9.x/initials/svg?seed=YK&radius=50"
            alt="Yusuf Kaymaz profil görseli"
            width={120}
            height={120}
            className="avatar"
          />

          <p>
            Merhaba! Ben <strong>Yusuf Kaymaz</strong>. Fırat Üniversitesi
            Yazılım Mühendisliği öğrencisiyim.{" "}
            <strong>Yapay zeka (LLM, NLP)</strong>, <strong>Go dili</strong>,{" "}
            <strong>siber güvenlik</strong> ve kripto piyasaları için{" "}
            <strong>otomasyon botları</strong> geliştirmekle ilgileniyorum.
          </p>

          <ul className="info-list">
            <li>
              <strong>Öğrenci No:</strong> 230541084
            </li>
            <li>
              <strong>Bölüm:</strong> Yazılım Mühendisliği
            </li>
            <li>
              <strong>Üniversite:</strong> Fırat Üniversitesi
            </li>
          </ul>
        </section>

        {/* ── Projeler ── */}
        <section id="projects" className="section">
          <h2>Projelerim</h2>

          <div className="projects-grid">
            {PROJECTS.map((project, idx) => (
              <article key={idx} className="project-card">
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── İletişim Formu ── */}
        <section id="contact" className="section">
          <h2>İletişim</h2>

          {submitted && (
            <div className="success-msg" role="status">
              ✅ Mesajınız başarıyla gönderildi. Teşekkürler!
            </div>
          )}

          <form noValidate onSubmit={handleSubmit} className="contact-form">
            {/* Ad Soyad */}
            <div className="form-group">
              <label htmlFor="name">Ad Soyad</label>
              <input
                type="text"
                id="name"
                name="name"
                minLength={2}
                required
                placeholder="Adınız ve Soyadınız"
                value={formData.name}
                onChange={handleChange}
                aria-describedby="name-error"
              />
              <small id="name-error" className="error-msg" role="alert">
                {errors.name}
              </small>
            </div>

            {/* E-posta */}
            <div className="form-group">
              <label htmlFor="email">E-posta</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="ornek@mail.com"
                value={formData.email}
                onChange={handleChange}
                aria-describedby="email-error"
              />
              <small id="email-error" className="error-msg" role="alert">
                {errors.email}
              </small>
            </div>

            {/* Konu */}
            <div className="form-group">
              <label htmlFor="subject">Konu</label>
              <select
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                aria-describedby="subject-error"
              >
                <option value="">-- Konu Seçiniz --</option>
                <option value="genel">Genel Bilgi</option>
                <option value="proje">Proje İşbirliği</option>
                <option value="oneri">Öneri / Geri Bildirim</option>
                <option value="diger">Diğer</option>
              </select>
              <small id="subject-error" className="error-msg" role="alert">
                {errors.subject}
              </small>
            </div>

            {/* Mesaj */}
            <div className="form-group">
              <label htmlFor="message">Mesaj</label>
              <textarea
                id="message"
                name="message"
                minLength={10}
                required
                rows={5}
                placeholder="Mesajınızı buraya yazınız…"
                value={formData.message}
                onChange={handleChange}
                aria-describedby="message-error"
              />
              <small id="message-error" className="error-msg" role="alert">
                {errors.message}
              </small>
            </div>

            <button type="submit" className="btn-submit">
              Gönder
            </button>
          </form>
        </section>
      </main>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="site-footer">
        <div className="container">
          <p>
            © {new Date().getFullYear()} Yusuf Kaymaz — Fırat Üniversitesi
            Yazılım Mühendisliği
          </p>
        </div>
      </footer>
    </>
  );
}
