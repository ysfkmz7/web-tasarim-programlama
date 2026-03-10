import { useState } from "react";
import type { ReactNode } from "react";
import { useEffect } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Card from "../components/Card";
import Alert from "../components/Alert";

/* Dark mode toggle hook */
function useDarkMode() {
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

/* ─────────────────────────────────────────────
   Bölüm Başlığı Yardımcı Bileşeni
   ───────────────────────────────────────────── */
function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-6">
      <div className="border-b border-slate-300 dark:border-border-subtle pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-text">{title}</h2>
        {description && (
          <p className="text-sm text-slate-500 dark:text-text-muted mt-1">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}

/* ─────────────────────────────────────────────
   Demo Kutusu — bileşeni net göstermek için
   ───────────────────────────────────────────── */
function DemoBox({
  label,
  children,
  row = false,
}: {
  label: string;
  children: React.ReactNode;
  row?: boolean;
}) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-border-subtle bg-white dark:bg-surface p-5 space-y-3">
      <p className="text-xs font-mono text-slate-400 dark:text-text-subtle uppercase tracking-widest">
        {label}
      </p>
      <div
        className={
          row
            ? "flex flex-wrap items-center gap-3"
            : "flex flex-col gap-3"
        }
      >
        {children}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   UI Kit Sayfası
   ═══════════════════════════════════════════════════════════════ */
export default function UIKit() {
  const { dark, toggleDark } = useDarkMode();
  const [inputValue, setInputValue] = useState("");
  const [emailValue, setEmailValue] = useState("");

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-gray-950 dark:text-gray-100 font-sans">

      {/* ── Dark Mode Toggle — sağ üst ── */}
      <div className="fixed top-4 right-4 z-50">
        <button
          type="button"
          onClick={toggleDark}
          aria-label={dark ? "Açık moda geç" : "Karanlık moda geç"}
          className="p-2.5 rounded-full border border-slate-300 dark:border-border
                     bg-white dark:bg-surface-2 shadow-md
                     text-slate-600 dark:text-text-muted hover:text-slate-900 dark:hover:text-text
                     transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          {dark ? (
            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 011.414-1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
      </div>

      {/* ── Sayfa Başlığı ── */}
      <div
        className="border-b border-border-subtle"
        style={{
          background:
            "linear-gradient(135deg, #0d1225 0%, #0f0c29 50%, #1a0533 100%)",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold
                           bg-primary/10 text-primary-light border border-primary/20 mb-4">
            Tailwind CSS v4
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight
                         bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            UI Kit
          </h1>
          <p className="text-text-muted mt-3 max-w-xl mx-auto text-sm sm:text-base">
            Projedeki tüm bileşenlerin dark-mode destekli, erişilebilir ve
            responsive sergileme sayfası.
          </p>
          <a
            href="/"
            className="mt-5 inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary-light
                       transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Portföye Dön
          </a>
        </div>
      </div>

      {/* ── İçerik ── */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-14 space-y-12 sm:space-y-16">

        {/* ════════════════════════════════
            1. BUTTON
            ════════════════════════════════ */}
        <Section
          title="Button"
          description="variant (primary, secondary, danger, ghost) ve size (sm, md, lg) proplarını destekler. Disabled state ve focus:ring erişilebilirliği içerir."
        >
          {/* Variant'lar — mobilde alt alta, sm'den itibaren yan yana */}
          <DemoBox label="Variants (primary / secondary / danger / ghost)" row>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="ghost">Ghost</Button>
          </DemoBox>

          {/* Sizes — sm:md:lg breakpoint demo */}
          <DemoBox label="Sizes (sm / md / lg)" row>
            <Button size="sm" className="sm:text-xs md:text-sm lg:text-base">sm — Küçük</Button>
            <Button size="md">md — Orta</Button>
            <Button size="lg">lg — Büyük</Button>
          </DemoBox>

          {/* Disabled — 2 sütun sm'den itibaren, lg'de 4 sütun */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Button variant="primary" disabled>Primary Disabled</Button>
            <Button variant="secondary" disabled>Secondary Disabled</Button>
            <Button variant="danger" disabled>Danger Disabled</Button>
            <Button variant="ghost" disabled>Ghost Disabled</Button>
          </div>

          {/* İkon ile */}
          <DemoBox label="With Icons" row>
            <Button variant="primary">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Yeni Ekle
            </Button>
            <Button variant="ghost">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Geri Dön
            </Button>
            <Button variant="danger">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Sil
            </Button>
          </DemoBox>
        </Section>

        {/* ════════════════════════════════
            2. INPUT
            ════════════════════════════════ */}
        <Section
          title="Input"
          description="error, helpText ve disabled proplarını destekler. aria-describedby ve role='alert' ile tam erişilebilirlik sağlar."
        >
          {/* 4 Input varyantı — mobilde tek sütun, md'de 2 sütun */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <DemoBox label="1 — Normal Input">
              <Input
                label="Ad Soyad"
                placeholder="Adınızı giriniz"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </DemoBox>

            <DemoBox label="2 — Error State">
              <Input
                label="E-posta Adresi"
                type="email"
                placeholder="ornek@mail.com"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                error="Geçerli bir e-posta adresi giriniz."
              />
            </DemoBox>

            <DemoBox label="3 — Help Text">
              <Input
                label="Şifre"
                type="password"
                placeholder="••••••••"
                helpText="En az 8 karakter, bir büyük harf ve bir rakam içermelidir."
              />
            </DemoBox>

            <DemoBox label="4 — Disabled State">
              <Input
                label="Kullanıcı Adı"
                placeholder="Kullanıcı adınız"
                defaultValue="yusuf.kaymaz"
                disabled
              />
            </DemoBox>
          </div>
        </Section>

        {/* ════════════════════════════════
            3. CARD
            ════════════════════════════════ */}
        <Section
          title="Card"
          description="elevated, outlined ve filled varyantlarını destekler. title, image, footer opsiyonel prop'lar içerir."
        >
          {/* 3 Card varyantı — mobilde 1, sm'de 2, md'de 3 sütun */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">

            {/* Elevated */}
            <Card
              variant="elevated"
              title="Elevated Kart"
              footer={
                <Button variant="primary" size="sm">
                  Detay
                </Button>
              }
            >
              Gölge ve yükseklik efekti ile öne çıkan varsayılan kart varyantı.
              Hover'da hafifçe yukarı kalkar.
            </Card>

            {/* Outlined */}
            <Card
              variant="outlined"
              title="Outlined Kart"
              footer={
                <Button variant="ghost" size="sm">
                  İncele
                </Button>
              }
            >
              Belirgin kenarlık ile dikkat çeken kart. Hover'da kenarlık rengi
              değişir.
            </Card>

            {/* Filled */}
            <Card
              variant="filled"
              title="Filled Kart"
              footer={
                <span className="text-xs text-text-subtle">Son güncelleme: bugün</span>
              }
            >
              Dolu arka plan ile sayfadan hafifçe ayrışan kart varyantı. İçerik
              gruplamak için idealdir.
            </Card>
          </div>

          {/* Görselli Kart */}
          <DemoBox label="Card with Image">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Card
                variant="elevated"
                title="Kripto Sinyal Botu"
                image="https://api.dicebear.com/9.x/bottts/svg?seed=crypto&backgroundColor=0d1225&size=200"
                imageAlt="Kripto bot görseli"
                footer={
                  <div className="flex gap-2">
                    <Button variant="primary" size="sm">GitHub</Button>
                    <Button variant="ghost"   size="sm">Demo</Button>
                  </div>
                }
              >
                Go dili ve çeşitli API'ler ile geliştirilmiş haber bazlı bot.
              </Card>

              <Card
                variant="outlined"
                title="Secret Knock Lock"
                image="https://api.dicebear.com/9.x/bottts/svg?seed=lock&backgroundColor=131a30&size=200"
                imageAlt="Arduino proje görseli"
                footer={
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm">Tinkercad</Button>
                    <Button variant="ghost"     size="sm">Detay</Button>
                  </div>
                }
              >
                Piezo sensörlü Arduino tabanlı akıllı kilit sistemi.
              </Card>
            </div>
          </DemoBox>
        </Section>

        {/* ════════════════════════════════
            4. ALERT
            ════════════════════════════════ */}
        <Section
          title="Alert"
          description="info, success, warning ve error varyantlarını destekler. Dismissible (kapatılabilir) prop ile aria-label='Kapat' butonu içerir."
        >
          {/* 4 Varyant */}
          <div className="flex flex-col gap-3">
            <Alert variant="info" title="Bilgi">
              Yeni bir özellik eklendi. Değişiklikleri keşfetmek için profilinizi
              güncelleyin.
            </Alert>

            <Alert variant="success" title="Başarılı">
              Profiliniz başarıyla güncellendi. Değişiklikler anında yansıtıldı.
            </Alert>

            <Alert variant="warning" title="Uyarı">
              Oturumunuzun süresi 5 dakika içinde dolacak. Kaydetmeyi unutmayın.
            </Alert>

            <Alert variant="error" title="Hata">
              Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edin.
            </Alert>
          </div>

          {/* Kapatılabilir (Dismissible) */}
          <DemoBox label="Dismissible Variants">
            <Alert variant="info" title="Kapatılabilir Bilgi" dismissible>
              Bu uyarı sağ üstteki X butonuna tıklanarak kapatılabilir.
            </Alert>
            <Alert variant="success" title="Kapatılabilir Başarı" dismissible>
              İşlem tamamlandı. Bu mesajı kapatmak için X butonunu kullanın.
            </Alert>
            <Alert variant="warning" dismissible>
              Başlıksız ve kapatılabilir uyarı örneği. Sadece{" "}
              <code className="font-mono text-xs bg-warning-bg px-1 rounded">children</code>{" "}
              içeriği gösterilen minimal kullanım.
            </Alert>
            <Alert variant="error" title="Kritik Hata" dismissible>
              Veritabanı bağlantısı kesildi. Sistem yöneticisine başvurun.
            </Alert>
          </DemoBox>
        </Section>

        {/* ════════════════════════════════
            5. DARK MODE SHOWCASE
            ════════════════════════════════ */}
        <Section
          title="Dark Mode"
          description="Tüm bileşenler dark: prefix Tailwind sınıflarıyla sistem temasına tam uyumluluk sağlar."
        >
          <Alert variant="info">
            Sayfanın sağ üst köşesindeki toggledan ya da portföy ana sayfasındaki
            <strong className="text-info font-semibold"> ay/güneş butonundan</strong> temayı
            değiştirebilirsiniz. Tüm bileşenler otomatik uyum sağlar.
          </Alert>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-2">
            <DemoBox label="Buttons — sm breakpoint" row>
              <Button variant="primary"   size="sm">Primary</Button>
              <Button variant="secondary" size="sm">Secondary</Button>
              <Button variant="ghost"     size="sm">Ghost</Button>
            </DemoBox>
            <DemoBox label="Input — md breakpoint">
              <Input label="Dark Mode Input" placeholder="Yazar gibi..." />
            </DemoBox>
            <DemoBox label="Card — lg breakpoint">
              <Card variant="filled" title="Responsive Card">
                lg breakpoint'te görünen üçüncü sütun. Mobile-first: önce tek sütun.
              </Card>
            </DemoBox>
          </div>
        </Section>

      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-300 dark:border-gray-800 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-text-subtle">
          <p className="text-slate-500 dark:text-text-subtle">
            UI Kit · Yusuf Kaymaz · Fırat Üniversitesi Yazılım Mühendisliği
          </p>
        </div>
      </footer>

    </div>
  );
}
