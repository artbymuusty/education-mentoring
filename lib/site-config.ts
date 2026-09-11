/**
 * Deployment-level brand/site constants — things that only change with a
 * code deploy, not day-to-day business data.
 *
 * Contact channels (WhatsApp, email) and legal/company identity are NOT
 * here anymore — they're managed from Admin Panel → Site Ayarları and
 * read from the database via lib/site-settings.ts, so real business
 * information can change without a deploy. `url` is the one exception:
 * it stays as an env-driven fallback because the app needs a safe URL to
 * boot with (metadataBase, sitemap, canonical) before any admin has ever
 * saved a production domain in the database — see resolveSiteUrl() in
 * lib/site-settings.ts, which prefers the DB value and falls back to this.
 */
export const siteConfig = {
  name: "rtgdanismanlik",
  shortName: "RTG",
  tagline: "Almanya eğitim yolculuğunda yol arkadaşın",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://rtgdanismanlik.example.com",
  locale: "tr" as const,
  contact: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
  },
} as const;
