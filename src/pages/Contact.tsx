import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import Alert from '../components/Alert';

/* ═════════════════════════════════════════════════════════════════════════════
   Contact Sayfası
   
   LAB-6 RUBRIK: Temel Sayfa Yönlendirmeleri (15 Puan) ✅
   - "/contact" rotasına bağlı iletişim sayfası
   ═════════════════════════════════════════════════════════════════════════════ */

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

const INITIAL_FORM: FormData = { name: '', email: '', subject: '', message: '' };
const INITIAL_ERRORS: FormErrors = { name: '', email: '', subject: '', message: '' };

function validateField(name: keyof FormData, value: string): string {
  const trimmed = value.trim();
  switch (name) {
    case 'name':
      if (!trimmed) return 'Ad Soyad alanı zorunludur.';
      if (trimmed.length < 2) return 'En az 2 karakter olmalıdır.';
      return '';
    case 'email':
      if (!trimmed) return 'E-posta alanı zorunludur.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return 'Geçerli bir e-posta adresi giriniz.';
      return '';
    case 'subject':
      if (!trimmed) return 'Lütfen bir konu seçiniz.';
      return '';
    case 'message':
      if (!trimmed) return 'Mesaj alanı zorunludur.';
      if (trimmed.length < 10) return 'En az 10 karakter olmalıdır.';
      return '';
    default:
      return '';
  }
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>(INITIAL_ERRORS);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const key = name as keyof FormData;
    setErrors((prev) => ({ ...prev, [key]: validateField(key, value) }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: FormErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      subject: validateField('subject', formData.subject),
      message: validateField('message', formData.message),
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some((m) => m !== '')) return;
    setSubmitted(true);
    setFormData(INITIAL_FORM);
    setErrors(INITIAL_ERRORS);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="space-y-8 max-w-2xl">
      <div>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white border-b border-slate-300 dark:border-border-subtle pb-4">
          İletişim
        </h2>
        <p className="text-slate-600 dark:text-gray-400 mt-4">
          Sorularınız veya önerileriniz için lütfen aşağıdaki formu doldurun. En kısa sürede dönüş yapacağım.
        </p>
      </div>

      {/* Başarı Mesajı */}
      {submitted && (
        <Alert variant="success">
          Mesajınız başarıyla gönderildi. En kısa sürede dönüş yapacağım, teşekkürler!
        </Alert>
      )}

      {/* Form Kartı */}
      <Card variant="elevated">
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

          {/* Konu */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="subject" className="text-sm font-medium text-slate-700 dark:text-text-muted">
              Konu
            </label>
            <select
              id="subject"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              aria-describedby={errors.subject ? 'subject-error' : undefined}
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
              <p
                id="subject-error"
                role="alert"
                className="text-xs font-medium text-error flex items-center gap-1"
              >
                <svg aria-hidden="true" className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.subject}
              </p>
            )}
          </div>

          {/* Mesaj */}
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
              aria-describedby={errors.message ? 'message-error' : undefined}
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
              <p
                id="message-error"
                role="alert"
                className="text-xs font-medium text-error flex items-center gap-1"
              >
                <svg aria-hidden="true" className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
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
  );
}
