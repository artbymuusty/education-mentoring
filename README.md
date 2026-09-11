# Education Mentoring

Almanya eğitim & mentorluk platformu — Faz 1 (Next.js + Supabase).

Ürün stratejisi, bilgi mimarisi ve tasarım yönü için proje kanalındaki
strateji dokümanına bakın.

## Geliştirme

```bash
npm install
npm run dev
```

http://localhost:3000 üzerinden açılır.

## Ortam değişkenleri

`.env.example` dosyasını `.env.local` olarak kopyalayıp doldurun:

```bash
cp .env.example .env.local
```

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase
  proje ayarları → API sekmesinden.
- `NEXT_PUBLIC_SITE_URL` — deployment-level fallback domain, yalnızca bir
  admin `/admin/settings`'te gerçek bir production domain kaydedene kadar
  kullanılır (bkz. aşağıdaki "Site ayarları" bölümü).
- `NEXT_PUBLIC_INSTAGRAM_URL` — opsiyonel, footer'da kullanılır.

WhatsApp numarası, iletişim e-postası, şirket/hukuki bilgiler ve production
domain artık **environment variable değil** — bunlar `/admin/settings`
üzerinden veritabanına kaydedilir (bkz. aşağıdaki bölüm). Boş bırakılan bir
alan public sitede hiç gösterilmez; kırık `wa.me/` veya
`merhaba@example.com` gibi bir placeholder asla gösterilmez.

Supabase bağlanmadan da site çalışır (marketing sayfaları, tasarım) —
yalnızca lead formu ("Yolculuğunu Konuşalım"), site ayarları ve `/admin`
paneli devre dışı kalır ve kullanıcıya bunun yerine `/iletisim` sayfasına
yönlendiren bir mesaj gösterir.

## Supabase kurulumu

1. `supabase/migrations/` altındaki dosyaları sırayla (0001, 0002, ...)
   bağlı projeye uygulayın (Supabase Dashboard → SQL Editor, ya da
   `supabase db push`). `0002_site_settings.sql`, aşağıdaki "Site
   ayarları" bölümünün kullandığı `site_settings` tablosunu ve tek satırlık
   seed kaydını oluşturur.
2. Bir admin hesabı oluşturun: Supabase Dashboard → Authentication →
   kullanıcı ekleyin (e-posta/şifre).
3. O kullanıcıya admin rolü verin:
   ```sql
   insert into public.profiles (id, role, full_name)
   values ('<auth-user-uuid>', 'admin', 'Ad Soyad');
   ```
4. `/admin/login` üzerinden giriş yapıp `/admin/leads` ve
   `/admin/settings` panellerini kullanın.

Şema değiştiğinde `lib/supabase/types.ts` dosyasını güncelleyin (bkz. dosya
başındaki yorum) — hâlihazırda migration'lara göre elle yazılmıştır.

## Site ayarları (WhatsApp, e-posta, şirket bilgileri, domain)

`/admin/settings` sayfasından girilen değerler `site_settings` tablosundaki
tek satıra yazılır ve public site bunları buradan okur — kod değişikliği ya
da yeniden deploy gerekmez:

- **İletişim**: WhatsApp numarası, iletişim e-postası. Footer, final CTA,
  iletişim sayfası ve assessment success ekranı bu değerleri kullanır; boş
  olan kanal hiç render edilmez.
- **Şirket bilgileri**: unvan, adres, vergi dairesi/numarası, MERSİS no.
  `/gizlilik`, `/kvkk`, `/kullanim-sartlari` sayfalarında kullanılır; boş
  alan satıra hiç yazılmaz, uydurma bilgi asla üretilmez.
- **Website**: production domain. Canonical URL'lerde, sitemap.xml'de,
  robots.txt'te ve Organization JSON-LD'de kullanılır. Boşken
  `NEXT_PUBLIC_SITE_URL` (yoksa kod içindeki sabit fallback) kullanılır —
  uygulama hiçbir zaman URL'siz kalmaz.

Bir admin kaydettiğinde `revalidateTag` ile public sayfalar tetiklenir;
değişiklik kısa süre içinde (yeni bir sayfa isteğinde) görünür olur.

## Komutlar

```bash
npm run dev      # geliştirme sunucusu
npm run build    # production build (typecheck dahil)
npm run lint     # eslint
```

## İçerik / metinler

Tüm site metinleri `lib/content/tr.ts` içinde, `lib/content/types.ts`
tipine göre. Yeni bir dil eklemek için aynı tipte bir `lib/content/en.ts`
(veya `de.ts`) oluşturup `lib/content/index.ts` içine kaydetmek yeterli —
component'lerde değişiklik gerekmez.

## Gerçek mentor / öğrenci içeriği ekleme

Bu iki dosya bilinçli olarak **boş** başlıyor — sahte kişi/testimonial
üretilmedi, sadece altyapı hazır:

- `lib/content/mentors.ts` — `mentors` dizisine gerçek bir mentor eklemek
  için `Mentor` tipine uygun bir obje ekleyin (isim, rol, bio, Almanya
  deneyimi, eğitim geçmişi, uzmanlık; `photoSrc` opsiyonel — verilmezse
  baş harflerden oluşan bir avatar gösterilir, sahte fotoğraf değil).
  Eklenince otomatik olarak `/mentorluk` sayfasında bir profil kartı ve
  (mentor'un `quote` alanı doluysa) homepage'deki isimli alıntı olarak
  görünür.
- `lib/content/stories.ts` — `studentStories` dizisine gerçek bir öğrenci
  hikâyesi eklemek için `StudentStory` tipine uygun bir obje ekleyin
  (öğrencinin izniyle). Eklenince otomatik olarak homepage'de bir bölüm
  olarak görünür; boşken bölüm hiç render edilmez.
- Gerçek fotoğraflar `public/` altına konup `photoSrc: "/mentors/isim.jpg"`
  gibi referans verilebilir.
