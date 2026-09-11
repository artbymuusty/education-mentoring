/**
 * Central brand/site config. Change the brand name or contact channels here —
 * nothing else in the app should hard-code them.
 *
 * Contact fields and legal identity fields are intentionally optional with
 * NO fake fallback values: an unset field must make the dependent UI not
 * render, never fall back to a placeholder like "merhaba@example.com" or
 * "wa.me/". Use the `has*` / `whatsappLink()` helpers below rather than
 * reading `siteConfig.contact.*` directly, so that rule can't be bypassed.
 */
export const siteConfig = {
  name: "Education Mentoring",
  shortName: "EM",
  tagline: "Almanya eğitim yolculuğunda yol arkadaşın",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://education-mentoring.example.com",
  locale: "tr" as const,
  contact: {
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
  },
  /**
   * Legal/corporate identity for the footer and legal pages. All optional —
   * left blank until the real company details exist. Never fill these with
   * invented values.
   */
  legal: {
    companyName: process.env.NEXT_PUBLIC_LEGAL_COMPANY_NAME || "",
    companyAddress: process.env.NEXT_PUBLIC_LEGAL_COMPANY_ADDRESS || "",
    mersisNo: process.env.NEXT_PUBLIC_LEGAL_MERSIS_NO || "",
    taxOffice: process.env.NEXT_PUBLIC_LEGAL_TAX_OFFICE || "",
    taxNumber: process.env.NEXT_PUBLIC_LEGAL_TAX_NUMBER || "",
  },
} as const;

/** True only when a real WhatsApp number is configured. */
export const hasWhatsapp = siteConfig.contact.whatsappNumber.trim().length > 0;

/** True only when a real contact email is configured. */
export const hasEmail = siteConfig.contact.email.trim().length > 0;

/**
 * Returns a working wa.me link, or `null` when no number is configured —
 * callers must not render a WhatsApp CTA in that case rather than linking
 * to a bare, broken "https://wa.me/".
 */
export function whatsappLink(prefilledMessage?: string): string | null {
  const number = siteConfig.contact.whatsappNumber.replace(/[^\d]/g, "");
  if (!number) return null;
  const base = `https://wa.me/${number}`;
  return prefilledMessage ? `${base}?text=${encodeURIComponent(prefilledMessage)}` : base;
}
