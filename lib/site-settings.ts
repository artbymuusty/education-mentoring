import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { demoContentEnabled } from "@/lib/content/demo";
import { siteConfig } from "@/lib/site-config";
import type { Database } from "@/lib/supabase/types";

/**
 * The single source of truth for real business data that changes without a
 * code deploy: contact channels, legal/company identity, production domain.
 * Backed by the `site_settings` singleton row, editable from
 * /admin/settings. Every field here is meant to be shown publicly
 * somewhere on the site — there is nothing confidential in this table.
 *
 * Empty string means "not configured yet" everywhere in this app (never
 * `null` past this module) — callers check truthiness and skip rendering
 * the dependent UI rather than falling back to a placeholder.
 */
export interface SiteSettings {
  whatsappNumber: string;
  contactEmail: string;
  companyName: string;
  companyAddress: string;
  taxOffice: string;
  taxNumber: string;
  mersisNo: string;
  productionDomain: string;
}

const EMPTY_SETTINGS: SiteSettings = {
  whatsappNumber: "",
  contactEmail: "",
  companyName: "",
  companyAddress: "",
  taxOffice: "",
  taxNumber: "",
  mersisNo: "",
  productionDomain: "",
};

export const SITE_SETTINGS_TAG = "site-settings";

async function fetchSiteSettings(): Promise<SiteSettings> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return EMPTY_SETTINGS;

  // Plain anon client, no cookies: this runs inside unstable_cache, which
  // cannot access request-scoped APIs like cookies()/headers(). RLS already
  // allows anon reads on this table (see 0002_site_settings.sql).
  const supabase = createClient<Database>(url, anonKey);
  const { data } = await supabase.from("site_settings").select("*").eq("singleton", true).maybeSingle();

  if (!data) return EMPTY_SETTINGS;

  return {
    whatsappNumber: data.whatsapp_number ?? "",
    contactEmail: data.contact_email ?? "",
    companyName: data.company_name ?? "",
    companyAddress: data.company_address ?? "",
    taxOffice: data.tax_office ?? "",
    taxNumber: data.tax_number ?? "",
    mersisNo: data.mersis_no ?? "",
    productionDomain: data.production_domain ?? "",
  };
}

/**
 * Cached read of site_settings, tagged so an admin save can invalidate it
 * on demand via `revalidateTag(SITE_SETTINGS_TAG)` (see
 * app/admin/settings/actions.ts) instead of waiting for a rebuild.
 */
export const getSiteSettings = unstable_cache(fetchSiteSettings, ["site-settings-v1"], {
  tags: [SITE_SETTINGS_TAG],
});

/**
 * A working wa.me link from a settings object, or `null` when no number is
 * configured — callers must skip rendering the CTA in that case, never
 * fall back to a bare "https://wa.me/".
 */
export function whatsappLinkFor(settings: Pick<SiteSettings, "whatsappNumber">, prefilledMessage?: string): string | null {
  const number = settings.whatsappNumber.replace(/[^\d]/g, "");
  if (!number) return null;
  const base = `https://wa.me/${number}`;
  return prefilledMessage ? `${base}?text=${encodeURIComponent(prefilledMessage)}` : base;
}

/**
 * The domain to use for canonical/sitemap/OG URLs: the admin-configured
 * production domain when set, otherwise the NEXT_PUBLIC_SITE_URL /
 * hardcoded fallback in siteConfig.url — so the app always has a safe URL
 * to boot with, even before any admin has saved a domain.
 */
export function resolveSiteUrl(settings: Pick<SiteSettings, "productionDomain">): string {
  const domain = settings.productionDomain.trim();
  if (!domain) return siteConfig.url;
  return domain.startsWith("http://") || domain.startsWith("https://") ? domain : `https://${domain}`;
}

/**
 * Social links (LinkedIn/Instagram/X), backed by the social_links
 * singleton (0004_social_links.sql) and editable from /admin/settings.
 * Same empty-string-means-unset convention as SiteSettings — a missing
 * real URL must never become a fabricated RTG link in the footer.
 *
 * `demo` marks which fields, if any, are the demo fallback below rather
 * than a real admin-entered URL — callers use it to disclose that in the
 * accessible name (see Footer), never to hide the distinction.
 */
export interface SocialLinks {
  linkedinUrl: string;
  instagramUrl: string;
  xUrl: string;
  demo: { linkedin: boolean; instagram: boolean; x: boolean };
}

const NO_DEMO = { linkedin: false, instagram: false, x: false };

const EMPTY_SOCIAL_LINKS: SocialLinks = {
  linkedinUrl: "",
  instagramUrl: "",
  xUrl: "",
  demo: NO_DEMO,
};

/**
 * Real platform homepages — NOT RTG's accounts — shown only when
 * demoContentEnabled is on and only for whichever fields the admin hasn't
 * filled in yet, so the footer feature can be seen and clicked before real
 * accounts exist. Never used when demoContentEnabled is off: a real
 * deployment with no admin-entered URL shows no icon at all, per the
 * "never fabricate an RTG account" rule.
 */
const DEMO_SOCIAL_LINKS = {
  linkedinUrl: "https://linkedin.com",
  instagramUrl: "https://instagram.com",
  xUrl: "https://x.com",
};

export const SOCIAL_LINKS_TAG = "social-links";

async function fetchSocialLinks(): Promise<SocialLinks> {
  const real = await fetchRealSocialLinks();
  if (!demoContentEnabled) return real;

  return {
    linkedinUrl: real.linkedinUrl || DEMO_SOCIAL_LINKS.linkedinUrl,
    instagramUrl: real.instagramUrl || DEMO_SOCIAL_LINKS.instagramUrl,
    xUrl: real.xUrl || DEMO_SOCIAL_LINKS.xUrl,
    demo: {
      linkedin: !real.linkedinUrl,
      instagram: !real.instagramUrl,
      x: !real.xUrl,
    },
  };
}

async function fetchRealSocialLinks(): Promise<SocialLinks> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return EMPTY_SOCIAL_LINKS;

  const supabase = createClient<Database>(url, anonKey);
  const { data } = await supabase.from("social_links").select("*").eq("singleton", true).maybeSingle();

  if (!data) return EMPTY_SOCIAL_LINKS;

  return {
    linkedinUrl: data.linkedin_url ?? "",
    instagramUrl: data.instagram_url ?? "",
    xUrl: data.x_url ?? "",
    demo: NO_DEMO,
  };
}

export const getSocialLinks = unstable_cache(fetchSocialLinks, ["social-links-v2"], {
  tags: [SOCIAL_LINKS_TAG],
});
