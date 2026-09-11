import { hasEmail, siteConfig } from "@/lib/site-config";

/**
 * Organization JSON-LD for the homepage. Only includes fields that are
 * actually configured — never fabricates a logo, phone number, or social
 * profile that doesn't exist yet.
 */
export function getOrganizationJsonLd() {
  const sameAs = [siteConfig.contact.instagram].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.tagline,
    ...(hasEmail ? { email: siteConfig.contact.email } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}
