/**
 * Central brand/site config. Change the brand name or contact channels here —
 * nothing else in the app should hard-code them.
 */
export const siteConfig = {
  name: "Education Mentoring",
  shortName: "EM",
  tagline: "Almanya eğitim yolculuğunda yol arkadaşın",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://education-mentoring.example.com",
  locale: "tr" as const,
  contact: {
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "merhaba@example.com",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
  },
} as const;

export function whatsappLink(prefilledMessage?: string) {
  const number = siteConfig.contact.whatsappNumber.replace(/[^\d]/g, "");
  const base = number ? `https://wa.me/${number}` : "https://wa.me/";
  return prefilledMessage ? `${base}?text=${encodeURIComponent(prefilledMessage)}` : base;
}
