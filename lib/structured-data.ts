import { siteConfig } from "@/lib/site-config";
import type { SiteSettings, SocialLinks } from "@/lib/site-settings";

/**
 * Organization JSON-LD for the homepage. Only includes fields that are
 * actually configured — never fabricates a logo, phone number, or social
 * profile that doesn't exist yet.
 */
export function getOrganizationJsonLd(settings: SiteSettings, social: SocialLinks, resolvedUrl: string) {
  const sameAs = [social.linkedinUrl, social.instagramUrl, social.xUrl].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: resolvedUrl,
    description: siteConfig.tagline,
    ...(settings.contactEmail ? { email: settings.contactEmail } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}
