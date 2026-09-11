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
- `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_CONTACT_EMAIL`,
  `NEXT_PUBLIC_INSTAGRAM_URL` — `lib/site-config.ts` tarafından okunur,
  footer/iletişim/CTA'larda kullanılır. **Boş bırakılırsa o kanalın
  butonu/linki hiç render edilmez** — kırık `wa.me/` veya
  `merhaba@example.com` gibi bir placeholder asla gösterilmez.
- `NEXT_PUBLIC_LEGAL_COMPANY_NAME`, `NEXT_PUBLIC_LEGAL_COMPANY_ADDRESS`,
  `NEXT_PUBLIC_LEGAL_MERSIS_NO`, `NEXT_PUBLIC_LEGAL_TAX_OFFICE`,
  `NEXT_PUBLIC_LEGAL_TAX_NUMBER` — `/gizlilik`, `/kvkk`,
  `/kullanim-sartlari` sayfalarında kullanılır. Boşken sayfa `siteConfig.name`'i
  nötr bir veri sorumlusu adı olarak kullanır ve eksik alanı satıra hiç yazmaz
  — gerçek şirket bilgisi olmadan asla uydurma adres/unvan/vergi no
  üretilmez.

Supabase bağlanmadan da site çalışır (marketing sayfaları, tasarım) —
yalnızca lead formu ("Yolculuğunu Konuşalım") ve `/admin` paneli devre dışı
kalır ve kullanıcıya bunun yerine `/iletisim` sayfasına yönlendiren bir mesaj
gösterir.

## Supabase kurulumu

1. `supabase/migrations/0001_init.sql` dosyasını bağlı projeye uygulayın
   (Supabase Dashboard → SQL Editor, ya da `supabase db push`).
2. Bir admin hesabı oluşturun: Supabase Dashboard → Authentication →
   kullanıcı ekleyin (e-posta/şifre).
3. O kullanıcıya admin rolü verin:
   ```sql
   insert into public.profiles (id, role, full_name)
   values ('<auth-user-uuid>', 'admin', 'Ad Soyad');
   ```
4. `/admin/login` üzerinden giriş yapıp `/admin/leads` panelini kullanın.

Şema değiştiğinde `lib/supabase/types.ts` dosyasını güncelleyin (bkz. dosya
başındaki yorum) — hâlihazırda migration'a göre elle yazılmıştır.

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
