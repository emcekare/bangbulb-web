# BangBulb Web: Proje Planı

Son güncelleme: 11 Kasım 2026
Kaynak: 11 Kasım 2026 kod ve ekran incelemesi (masaüstü 1440, tablet 834/1024, mobil 390/360)

> Not: Depoda, Project'te ve Drive'da yazılı bir plan bulunamadı. Eski plandan kalan tek iz `e2e/a11y-keyboard.mjs` içindeki "#15" atfı. Bu belge, kodun bugünkü durumundan yeniden kurulmuş güncel plandır. Eski numaralar elinizdeyse karşılıkları son bölümdeki tabloya işlenmeli.

## 1. Mevcut durum

Tek sayfalık Next.js 16 statik export. Masaüstü ve mobil iki ayrı bileşen ağacı (`DesktopHome`, `MobileHome`), 820 px kırılımı. GitHub Pages'e `/bangbulb-web` alt yolunda deploy.

Biten işler:

- Görsel dil: koyu yeşil zemin, krem ve amber vurgu, Bricolage Grotesque başlıklar, pervane logosu
- Masaüstü bölümleri: Hero, Marquee, Hizmetler, Süreç, İşler (yatay galeri), Manifesto, Ekip, Referanslar, Blog, İletişim, Footer
- Mobil bölümleri: Hero, İşler, Hizmetler, Süreç, Referanslar, Ekip, İletişim
- İletişim formu (Web3Forms, anahtar yoksa mailto'ya düşüyor), bal kavanozu, hata durumları
- Modal erişilebilirliği (`useModalA11y`): Escape, focus tuzağı, scroll kilidi
- 23 müşteri logosu, 3 ekip fotoğrafı, 1 gerçek iş (La Liberté, Behance)
- Build temiz, lint 1 uyarı, konsol hatası yok, hiçbir genişlikte yatay taşma yok

Açık riskler:

- Yerel `master`, `origin/master`'ın 1 commit önünde. Üstüne 48 dosyalık commit edilmemiş değişiklik var. Mobil sürümün tamamı (`src/components/mobile/`, `mobile.css`) git'te hiç yok. Yayındaki site 8 Mayıs sürümü.
- Depo OneDrive klasöründe. `node_modules` ve `.git` senkronu dosya bozulması riski taşıyor.

## 2. Yayın kararı

Bugünkü haliyle yayına uygun değil. Engel tasarım değil, içerik: 7 işten 6'sı, 5 blog yazısının 5'i, 8 ekip üyesinden 5'i ve 4 sosyal medya bağlantısının 4'ü yer tutucu. Faz 0 ve Faz 1 bitmeden alan adına bağlanmamalı.

## 3. Fazlar

Öncelik: P0 yayın engeli, P1 yayından önce beklenen, P2 yayından sonra.

### Faz 0: Emniyet (yarım gün)

| No | İş | Öncelik | Bitti sayılır |
|---|---|---|---|
| 0.1 | Bekleyen tüm değişiklikleri anlamlı commit'lere böl, push et | P0 | `git status` temiz, origin güncel |
| 0.2 | Depoyu OneDrive dışına taşı (ör. `C:\dev\bangbulb-web`) | P0 | Klasör OneDrive senkronunda değil |
| 0.3 | `PLAN.md` depoda izleniyor, `README.md` yeniden yazıldı (kurulum, env, deploy) | P1 | Yeni gelen biri 10 dakikada `npm run dev` çalıştırıyor |

### Faz 1: Gerçek içerik (ajanstan bekleniyor, en uzun kalem)

Bu fazın tamamı ajansın teslim edeceği malzemeye bağlı. Kod işi küçük.

| No | İş | Öncelik | Bitti sayılır |
|---|---|---|---|
| 1.1 | En az 6 gerçek iş: kapak görseli, müşteri, yıl, kategori, 2 cümle brif, sonuç. Uydurma işler (Quasar Lansman, Saatçi Co., Lale Sokağı, Mira Skincare, Kahve & Co.) siliniyor | P0 | Çizgili yer tutucu kart kalmadı |
| 1.2 | İş verisi `src/content/works.ts` dosyasına taşınıyor, görseller `public/assets/works/` altında | P0 | Yeni iş eklemek tek dosya düzenlemesi |
| 1.3 | Ekip: 5 eksik fotoğraf ve gerçek isimler. Gelmiyorsa bölüm 3 kişiye iniyor, "sekiz kişi" söylemi korunuyor | P0 | Baş harfli boş daire yok. "Anıl Birsin." sonundaki nokta düzeltildi |
| 1.4 | Blog bölümü kaldırılıyor. Gerçek yazı çıkınca geri gelir | P0 | Tıklanmayan başlık yok |
| 1.5 | Sosyal medya adresleri `links.ts`'e giriliyor, `archiveUrl` dolduruluyor | P0 | Footer'da soluk, tıklanmayan etiket yok |
| 1.6 | Doğrulanacak iddialar: "iki ülkede", "on iki sektörde", "24 saat içinde geri döneriz", ® işareti (tescil var mı) | P0 | Her biri ajans tarafından yazılı onaylı ya da metinden çıkarıldı |
| 1.7 | Logo kullanım izni: özellikle A101 ve TurkNet | P0 | İzin teyidi ya da logo yerine düz isim |
| 1.8 | Birincil e-posta `info@bangbulb.com` oluyor, gmail ikincil ya da hiç | P1 | Sitede öne çıkan adres kurumsal alan adlı |
| 1.9 | Süreç bölümü yalnızca sosyal medya retainer'ını anlatıyor. Başlık "Sosyal medyada aylık döngü" oluyor ya da proje bazlı işler için ikinci akış ekleniyor | P1 | 360° iddiasıyla süreç anlatımı çelişmiyor |

### Faz 2: Yayın altyapısı (1 gün)

| No | İş | Öncelik | Bitti sayılır |
|---|---|---|---|
| 2.1 | `bangbulb.com` alan adı: `basePath` ve `assetPrefix` kaldırılıyor, `getAssetPath` siliniyor, `public/CNAME` ekleniyor | P0 | Site kök yolda açılıyor |
| 2.2 | Web3Forms anahtarı GitHub Secrets'a giriliyor, form uçtan uca test ediliyor | P0 | Test mesajı ajans kutusuna düştü |
| 2.3 | KVKK: aydınlatma metni sayfası, formda bağlantı ve onay satırı, Web3Forms için yurt dışı aktarım değerlendirmesi. Footer'daki "kvkk · tescil" gerçek bağlantı oluyor | P0 | Form, aydınlatma metni görülmeden gönderilemiyor |
| 2.4 | SEO temeli: `metadataBase`, canonical, Open Graph ve Twitter kartı, 1200x630 paylaşım görseli, `sitemap.ts`, `robots.ts`, `LocalBusiness` JSON-LD | P0 | WhatsApp'ta link önizlemesi görselli çıkıyor |
| 2.5 | Umami: `.env.example`'da tanımlı, kodda hiç kullanılmıyor. Script ekleniyor, form gönderimi ve telefon tıklaması olay olarak izleniyor | P1 | Panelde ziyaret ve dönüşüm görünüyor |
| 2.6 | 404 sayfası marka diliyle | P2 | `/olmayan-sayfa` markalı sayfa gösteriyor |

### Faz 3: Masaüstü düzeltmeleri (2 gün)

| No | İş | Öncelik | Bitti sayılır |
|---|---|---|---|
| 3.1 | Loader: her ziyarette 3,9 sn içerik gizleniyor. Süre en çok 1,2 sn, oturumda bir kez (`sessionStorage`), JS kapalıyken hiç görünmüyor | P0 | JS kapalı tarayıcıda içerik okunuyor (bugün %000'da kilitli kalıyor) |
| 3.2 | Hero: 1440x900'de ilk ekranda yalnızca slogan var. Ne yaptığını söyleyen cümle ve CTA 600 px aşağıda. Hero yüksekliği 100vh'ye iniyor, lede ve "Proje konuşalım" ilk ekrana çıkıyor | P0 | İlk ekranda slogan, tek cümle açıklama, bir buton |
| 3.3 | Hizmet satırları: ↗ oku ve "görüntüle" imleci var, tıklayınca hiçbir şey olmuyor. Yazılmış açıklamalar (`desc`) masaüstünde hiç gösterilmiyor. Satır tıklanınca açıklama ve "bu hizmet için yaz" açılıyor | P0 | Her satır klavyeyle de açılıyor |
| 3.4 | Hizmet hover önizlemesi boş degrade ve "/ preview" yazısı gösteriyor. Gerçek iş görseli bağlanıyor ya da kaldırılıyor | P1 | Yer tutucu önizleme yok |
| 3.5 | Referanslar: logolar yalnızca hover'da görünüyor, varsayılan düz yazı. Logolar varsayılan oluyor (tek renk), hover'da renkleniyor | P1 | Dokunmatik ekranda da logolar görünüyor |
| 3.6 | 12 hizmet, 4'lü 3 gruba ayrılıyor: Kreatif, Prodüksiyon ve Mecra, Dijital Performans | P1 | Liste taranabilir, 1900 px'lik bölüm kısalıyor |
| 3.7 | `prefers-reduced-motion` desteği hiç yok. Loader, pervane imleci, parallax, marquee, yatay galeri için indirgenmiş sürüm | P1 | Ayar açıkken hareket yok, içerik tam |
| 3.8 | `:focus-visible` stilleri yok, üstüne `cursor: none`. Tüm etkileşimli öğelere görünür odak halkası, "içeriğe atla" bağlantısı, masaüstüne `<main>` | P1 | Tab ile gezerken odak her an görünüyor |
| 3.9 | Sürekli çalışan 4 `requestAnimationFrame` döngüsü (Hero, ScrollBgMorph, Works, imleç) scroll olayına ve IntersectionObserver'a bağlanıyor | P1 | Sayfa dururken CPU boşta |
| 3.10 | Nav'a "Referanslar" ekleniyor. Marka yazısındaki "2026" ve hero'daki "v.07 / cilt 2026", "41.0686°N" gibi süs etiketleri azaltılıyor | P2 | Üst bantta en çok iki mono etiket |
| 3.11 | Yatay galeri 3240 px dikey scroll tüketiyor. İş sayısı kesinleşince mesafe yeniden ayarlanıyor, La Liberté videosunun üstüne binen etiket kaldırılıyor | P2 | Kart başına en çok 300 px scroll |

### Faz 4: Mobil düzeltmeleri (1,5 gün)

| No | İş | Öncelik | Bitti sayılır |
|---|---|---|---|
| 4.1 | İş kartları: 7 karttan 6'sı boş degrade üstünde isim. Faz 1.1 görselleri bağlanıyor, her kart dokununca açılıyor | P0 | Açılmayan kart yok |
| 4.2 | Mobilde eksik içerik: manifesto, rakamlar, partner ajanslar, çalışma saatleri, ikinci telefon. "Niye biz?" kısa bir blok olarak ekleniyor (3 rakam, tek cümle) | P1 | Masaüstündeki güven unsurları mobilde de var |
| 4.3 | Dokunma hedefleri 44 px altında: üst bar "İletişim" (34), menü düğmesi (38), çekmece kapat (36), "İncele" (29), çekmecedeki Ara ve E-posta (37) | P1 | Hepsi en az 44x44 |
| 4.4 | Hizmetler 12 eşit kutu. Dokununca modal açıldığı belli değil. 3 gruba ayrılıyor (3.6 ile aynı veri), açıklama akordeon içinde | P1 | İlk bakışta 3 başlık, altında 4'er kalem |
| 4.5 | Hero'da güven satırı: "2019'dan beri · 8 kişi · 23 marka" | P1 | CTA'nın altında tek satır |
| 4.6 | Ekip kaydırıcısında kaydırılabildiğine dair ipucu yok (nokta ya da yarım kart) | P2 | İkinci kartın bir kısmı görünüyor |
| 4.7 | E-posta kartı "bangbulb@gmail.c / om" diye bölünüyor | P2 | Adres tek satır |
| 4.8 | Sabit alt bar: "Ara" ve "WhatsApp" (reklam ajansı müşterisinin en kısa yolu) | P2 | Scroll sırasında her an erişilebilir |

### Faz 5: Mimari borç (1,5 gün)

| No | İş | Öncelik | Bitti sayılır |
|---|---|---|---|
| 5.1 | Statik HTML'de masaüstü ve mobil ağaç birlikte basılıyor: çift H1, çift içerik. Tek ağaç ve CSS ile uyarlama hedefi. En azından içerik bölümleri ortak bileşene iniyor | P1 | Kaynakta tek H1 |
| 5.2 | Tablet (821 ile 1100 px arası) dokunmatik cihazda masaüstü kabuğunu alıyor: hover'a bağlı her şey ölü. Kırılım `(hover: none)` ile birlikte değerlendiriliyor | P1 | iPad'de logolar ve hizmet detayı erişilebilir |
| 5.3 | Tüm sayfa `"use client"`. Statik bölümler sunucu bileşeni oluyor, yalnızca etkileşimli parçalar istemcide kalıyor | P2 | İlk yük JS'i 560 KB'den 300 KB altına |
| 5.4 | Fontlar `next/font` ile kendi alan adından, render engelleyen Google CSS bağlantısı kalkıyor | P1 | Lint uyarısı kapandı, üçüncü tarafa istek yok |
| 5.5 | `styles.css` içindeki 760 ve 540 px medya sorguları ölü kod (masaüstü kabuğu 820 altında gizli). Temizleniyor. Works ve MobileHome'daki satır içi stiller CSS'e taşınıyor | P2 | Ölü sorgu yok |
| 5.6 | İçerik `src/content/` altında toplanıyor: services, works, team, clients, process, contact | P1 | Bileşen dosyalarında veri dizisi yok |
| 5.7 | Erişilebilirlik testi `@playwright/test` formatına taşınıyor, mobil senaryolar ekleniyor, CI'da çalışıyor (eski #15) | P2 | PR'da test otomatik koşuyor |

### Faz 6: Yayın sonrası büyüme

| No | İş | Öncelik |
|---|---|---|
| 6.1 | Her iş için ayrı vaka sayfası (`/isler/[slug]`): brif, yaklaşım, çıktı, sonuç rakamı | P1 |
| 6.2 | Müşteri alıntıları (isim ve unvanla, 2 ya da 3 adet) | P1 |
| 6.3 | Hizmet grubu sayfaları (SEO için: "sosyal medya ajansı İstanbul" gibi aramalar) | P2 |
| 6.4 | Gerçek yazılarla blog (MDX) | P2 |
| 6.5 | İngilizce sürüm ("iki ülke" iddiası doğruysa) | P2 |
| 6.6 | 2026 ajans sunumu PDF'i indirilebilir (eski `public/uploads/bangbulb-2026.pdf` silinmiş) | P2 |

## 4. Çıkarılacaklar

- Blog bölümü (gerçek yazı gelene kadar)
- Uydurma işler ve uydurma ekip isimleri
- Hizmet hover önizlemesindeki yer tutucu kart
- Hero'daki süs etiketleri: koordinat, "v.07 / cilt 2026"
- 3,3 saniyelik zorunlu loader bekleyişi
- Ekip kartlarındaki esprili alıntılar (gerçek kişilere ait değilse)
- "scroll ↓ horizontal", "aşağı in / scroll" gibi kullanım talimatları

## 5. Sıra ve süre

1. Faz 0 hemen (yarım gün)
2. Faz 1 için ajansa içerik talep listesi gönderilir. Beklerken Faz 2, 3, 4 paralel yürür
3. Faz 1 içeriği gelince bağlanır, yayın
4. Faz 5 yayından hemen sonra, Faz 6 içerik geldikçe

Kod işi toplamı yaklaşık 6,5 iş günü. Takvimi belirleyen kalem Faz 1'dir.

## 6. Yayın öncesi kontrol listesi

- [ ] Yer tutucu içerik sıfır (iş, ekip, blog, sosyal bağlantı)
- [ ] Form gerçek kutuya mesaj düşürüyor
- [ ] KVKK aydınlatma metni yayında ve formdan bağlı
- [ ] Paylaşım önizlemesi görselli
- [ ] JS kapalıyken içerik okunuyor
- [ ] Loader 1,2 sn altında, tekrar ziyarette yok
- [ ] iPhone SE (375), iPhone 13 (390), iPad (834), 1440 ve 1920'de gözle kontrol
- [ ] Lighthouse mobil: Performans 85 üstü, Erişilebilirlik 95 üstü
- [ ] Analytics ziyaret kaydediyor

## 7. Eski plan numaraları

| Eski no | Konu | Yeni no |
|---|---|---|
| #15 | a11y testinin `@playwright/test`'e taşınması | 5.7 |
| diğerleri | Eski plan bulunamadı | eşlenecek |
