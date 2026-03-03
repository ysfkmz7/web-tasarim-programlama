# CSS Tasarım Kararları

**Yazar:** Yusuf Kaymaz  
**Üniversite:** Fırat Üniversitesi — Yazılım Mühendisliği  
**Öğrenci No:** 230541084  
**Tarih:** Mart 2026  

---

## 1. Breakpoint Seçimi

Projemde iki adet `min-width` tabanlı breakpoint kullandım:

| Breakpoint | Değer | Hedef Ekran |
|---|---|---|
| Tablet | `640px` | Büyük telefon / küçük tablet |
| Masaüstü | `1024px` | Laptop ve masaüstü |

Bu değerleri tamamen keyfi seçmedim. `640px`, yaygın büyük akıllı telefon ekranlarının (örn. iPhone Plus / Samsung Galaxy serileri) yatay modunu ve küçük tabletleri kapsar. `1024px` ise standart bir laptop ekranının başlangıcına karşılık gelir; bu noktada kenar boşlukları, font boyutları ve düzen gerçek anlamda masaüstü deneyimine dönüşür.

**Mobile-First felsefesi:** Tüm temel stiller `@media` bloğu *dışında*, doğrudan seçicilerin altında yazıldı. Yani tarayıcı herhangi bir medya sorgusunu işlemeden önce mobil için optimize edilmiş bir düzen görüyor. Medya sorguları yalnızca daha geniş ekranlarda *üzerine* yazar — bu yaklaşım performans açısından da avantajlıdır çünkü mobil cihazlar gereksiz override hesaplamalarıyla uğraşmaz.

Eski projemde `@media (max-width: 600px)` kullanmıştım; bu masaüstü öncelikli (desktop-first) bir yaklaşımdı ve mobil cihazların CSS'i tersine ayıklamasını gerektiriyordu. Bu LAB'da bunu bilinçli olarak tersine çevirerek düzelttim.

---

## 2. Layout Tercihleri

### 2.1 Flexbox Kullandığım Alanlar

**Neden Flexbox?** Flexbox, tek boyutlu (satır *veya* sütun) içerik dizilimi için idealdir. Öğeler arasındaki boşluğu otomatik dağıtmak, ortalamak ya da hizalamak çok daha az kod gerektirir.

**Header ve Navigasyon (`header-inner`, `.nav-list`):**  
Mobilde header dikey (column) bir sütun olarak dizilir. `flex-direction: column` ile isim, alt başlık ve nav alt alta sıralanır. Tablet sonrasında `flex-direction: row` ve `justify-content: space-between` ile isim sola, menü sağa geçer. Bu geçiş tek bir satır değişikliğiyle yapılabildiğinden Flex burada Grid'den çok daha mantıklıydı.

Nav bağlantıları için `flex-wrap: wrap` kullandım; bu sayede küçük ekranlarda linkler alt satıra inerek taşma yaşanmıyor.

**Bilgi Etiketleri (`.info-list`) ve Yetenek Etiketleri (`.skill-tags`):**  
"Öğrenci No", "Bölüm", "Üniversite" gibi etiketler için Flexbox çok uygun; çünkü etiket sayısı değişebilir ve `flex-wrap: wrap` ile akıllıca alt satıra geçiş yapar. Her etiket kendi genişliğini içeriğe göre alır — Grid burada daha az esnek olurdu.

### 2.2 CSS Grid Kullandığım Alan

**Proje Kartları (`.projects-grid`):**  
```css
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
```
Grid, iki boyutlu (satır *ve* sütun) düzenin gerçek gücünün ortaya çıktığı yerdir. Proje kartları bir ızgara yapısı oluşturuyor ve tüm satırların yüksekliği otomatik hizalanıyor — bu Flexbox'ta çok daha zahmetli olurdu.

**`auto-fit` ve `minmax()` mantığı:**  
`repeat(auto-fit, minmax(280px, 1fr))` ifadesi şunu söyler: "Her sütun en az 280px olsun, kalan alanı eşit böl. Kaç sütun sığarsa o kadar yap." Bu sayede:
- Dar ekranlarda tek sütun,
- Orta ekranlarda iki sütun,
- Geniş ekranlarda üç veya daha fazla sütun otomatik oluşur.

Medya sorgusu *yazmadan* responsive ızgara elde etmek — bu özellik CSS Grid'in en güçlü taraflarından biri. `auto-fill` yerine `auto-fit` seçmemin nedeni: kart sayısı az olduğunda `auto-fit`, boş sütunlar oluşturmak yerine mevcut kartları genişletir.

---

## 3. Design Tokens

Design token'lar, `src/styles/tokens.css` dosyasında CSS Custom Properties (değişkenler) olarak tanımlandı. Bu yaklaşımı tercih etmemin başlıca nedenleri:

### 3.1 Tema Tutarlılığı

Renk, boşluk veya geçiş süresini değiştirmek istediğimde yalnızca `tokens.css` dosyasını açıp tek bir satırı güncellemem yeterli. Bu değişiklik tüm projede anında geçerli olur — tek tek her seçiciye gidip `#3b82f6` yazan 40 yeri aramam gerekmiyor.

### 3.2 Renk Paleti — Siber Güvenlik & Yapay Zeka Teması

Koyu lacivert/mor tonlarını iki nedenden ötürü seçtim: İlki, siber güvenlik ve yapay zeka alanlarındaki profesyonel araçların (terminal emülatörleri, IDE dark temaları, hacker filmlerinin estetik dili) bilinçsel çağrışımıyla uyum. İkincisi, koyu arka plan üzerinde mavi/mor vurgu renkleri hem görsel kontrast hem de modern estetik açısından güçlü bir ikili oluşturuyor.

```
--color-bg:        #080c18   (Derin gece mavisi — Ana zemin)
--color-primary:   #3b82f6   (Elektrik mavisi — Güven, teknoloji)
--color-accent:    #a855f7   (Siber mor — Yaratıcılık, AI çağrışımı)
--color-neon:      #00d4ff   (Terminal yeşili alternatifi olarak Cyan)
```

### 3.3 Spacing Sistemi

4px tabanlı bir spacing sistemi kullandım (`--space-1` = 4px, `--space-2` = 8px, ...). Bu sistem Material Design ve Tailwind CSS'in de benimsediği standarttır. Her iki değer arasındaki oran tutarlı olduğu için görsel ritim korunuyor.

### 3.4 Gradyan Değişkenleri

`--gradient-header`, `--gradient-accent`, `--gradient-card` gibi gradyan token'ları, tutarlı bir görsel dil sağlıyor. Header, buton ve kart kenarlıklarının aynı renk geçişini paylaşması projeye bütünleşik (cohesive) bir his veriyor.

---

## 4. Responsive Stratejiler

### 4.1 Fluid Typography — `clamp()` ile Akıcı Yazı Boyutu

```css
--text-base: clamp(1rem, 0.925rem + 0.375vw, 1.125rem);
--text-3xl:  clamp(2rem, 1.5rem + 2.5vw, 3rem);
```

`clamp(min, tercih, max)` üç parametre alır:
- **min:** Bu boyutun altına asla düşme.
- **tercih:** Görüntü genişliğine göre doğrusal olarak hesaplanan değer.
- **max:** Bu boyutun üstüne asla çıkma.

**Neden `clamp()` tercih ettim?**

Geleneksel yaklaşımda her breakpoint'te `font-size` ayrı ayrı tanımlanır: mobilde 16px, tablette 18px, masaüstünde 20px. Bu hem daha fazla kod hem de "sarp geçişler" anlamına gelir — 639px'de 16px, 640px'de birden 18px.

`clamp()` bu geçişi *sürekli ve pürüzsüz* kılar. Ekran genişledikçe font boyutu da kademeli olarak büyür. Büyük başlıklar (`--text-3xl`) küçük ekranlarda kompakt, büyük ekranlarda dramatik görünür — hiçbir medya sorgusu yazmadan.

Ayrıca bu tanımlar merkezi token sisteminde yaşadığından, tüm bileşenler aynı ölçek kurallarına otomatik olarak uyar.

### 4.2 `object-fit: cover` — Görsel Oranını Koru

```css
.project-card img {
  width: 100%;
  object-fit: cover;
  max-height: 180px;
}
```

Proje kartlarına ileride farklı boyutlarda görseller ekleneceğini düşünerek `object-fit: cover` kullandım. Bu özellik, görseli kırparak sabit bir yüksekliğe sığdırır — görüntü oranı ne olursa olsun kart düzeni bozulmaz. Alternatif olan `object-fit: contain` değeri boş alanlar bırakırdı; `cover` ise her zaman kartı tamamen dolduracak şekilde ölçekler.

### 4.3 Genel `max-width: 100%` — Taşmayı Engelle

Tüm görsellere uygulanan `max-width: 100%`, herhangi bir görselin kapsayıcısından dışarı taşmasını engeller. Bu CSS reset'in en temel ama en önemli kural larından biri; özellikle içerik dışarıdan (API, kullanıcı yüklemesi) geldiğinde kritik öneme sahip.

### 4.4 Scroll Davranışı ve Erişilebilirlik

`scroll-behavior: smooth` ile aynı sayfa navigasyonu (hash link'ler) pürüzsüz bir kaydırmayla çalışıyor. Skip link (`Ana içeriğe atla`) ve `:focus-visible` pseudo-sınıfı, klavye kullanıcıları ve ekran okuyucular için erişilebilirlik standartlarını karşılıyor.

---

> Bu belgeler LAB-3 kapsamında, mobil öncelikli CSS mimarisi ve modern layout tekniklerini bilinçli tercihler olarak uygulamak amacıyla hazırlanmıştır.
