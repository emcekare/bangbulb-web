# BangBulb Web

BangBulb reklam ajansının tek sayfalık tanıtım sitesi. Next.js 16 (App Router), statik export, GitHub Pages.

Yol haritası ve açık işler: [PLAN.md](./PLAN.md)

## Kurulum

```bash
npm ci
cp .env.example .env.local   # değerleri doldurun, boş kalabilir
npm run dev                  # http://localhost:3000
```

Node 22 önerilir (CI aynı sürümü kullanıyor).

## Komutlar

| Komut | İş |
|---|---|
| `npm run dev` | Geliştirme sunucusu, kök yolda çalışır |
| `npm run build` | Statik export, çıktı `out/` klasörüne |
| `npm run lint` | ESLint |
| `node e2e/a11y-keyboard.mjs` | Klavye erişilebilirliği duman testi (önce build alıp `out/` klasörünü 4321 portunda sunun) |

## Ortam değişkenleri

`.env.example` dosyasında açıklamalarıyla duruyor. Hepsi `NEXT_PUBLIC_` önekli, build sırasında bundle'a gömülür.

- `NEXT_PUBLIC_WEB3FORMS_KEY`: iletişim formu. Boşsa form ziyaretçinin mail uygulamasını açar.
- `NEXT_PUBLIC_UMAMI_SRC`, `NEXT_PUBLIC_UMAMI_WEBSITE_ID`: analytics. İkisinden biri boşsa hiçbir şey yüklenmez.
- `NEXT_PUBLIC_SITE_URL`: canonical, OG ve sitemap için. Varsayılan `https://bangbulb.com`.
- `NEXT_PUBLIC_BASE_PATH`: yayın alt yolu. Tanımsızsa production'da `/bangbulb-web`. Alan adı kökü için boş değer verin.

## Yapı

```
src/app/            layout, sayfa, CSS (styles, styles-extra, mobile)
src/components/     masaüstü bölümleri (sections/), efektler, modallar
src/components/mobile/MobileHome.tsx   mobil ağaç (820 px ve altı)
src/content/        tüm içerik verisi (hizmetler, işler, ekip, müşteriler, süreç, iletişim, bağlantılar)
src/hooks/          useReveal, useModalA11y
public/assets/      logolar, ekip fotoğrafları, video
```

Masaüstü ve mobil iki ayrı bileşen ağacıdır. İkisi de veriyi `src/content/` altından okur. Yeni iş, ekip üyesi ya da müşteri eklemek için yalnızca oradaki dosyayı düzenleyin.

## Deploy

`master` dalına push, `.github/workflows/deploy.yml` ile GitHub Pages'e yayınlar. Production build varsayılan olarak `/bangbulb-web` alt yolunda çalışır. Alan adına geçişte `NEXT_PUBLIC_BASE_PATH` repo değişkenini boş değerle tanımlayın ve `public/CNAME` ekleyin (PLAN 2.1).

## Dikkat

- Bu Next.js sürümünde kırıcı değişiklikler var. Kod yazmadan önce `node_modules/next/dist/docs/` altındaki ilgili rehbere bakın.
- Dinamik görsel yollarında `getAssetPath()` kullanın, yoksa production'da 404 verir.
