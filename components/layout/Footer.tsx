import Link from "next/link";
import { getDictionary } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";
import { getSiteSettings, getSocialLinks, whatsappLinkFor } from "@/lib/site-settings";
import { Container } from "@/components/ui/Container";
import { SocialIcon } from "@/components/ui/SocialIcon";

export async function Footer() {
  const t = getDictionary();
  const [settings, social] = await Promise.all([getSiteSettings(), getSocialLinks()]);
  const whatsapp = whatsappLinkFor(settings);

  const navLinks = [
    { href: "/nasil-yardimci-oluyoruz", label: t.nav.services },
    { href: "/mentorluk", label: t.nav.mentorship },
    { href: "/ogrenci-hikayeleri", label: t.nav.studentStories },
    { href: "/hakkimizda", label: t.nav.about },
    { href: "/fiyatlar", label: t.nav.pricing },
    { href: "/sss", label: t.nav.faq },
    { href: "/iletisim", label: t.nav.contact },
    { href: "/bize-katilin", label: t.nav.joinUs },
  ];

  const socialLinks = [
    social.linkedinUrl ? { platform: "linkedin" as const, href: social.linkedinUrl, label: "LinkedIn" } : null,
    social.instagramUrl ? { platform: "instagram" as const, href: social.instagramUrl, label: "Instagram" } : null,
    social.xUrl ? { platform: "x" as const, href: social.xUrl, label: "X" } : null,
  ].filter((s): s is NonNullable<typeof s> => s !== null);

  return (
    <footer className="border-t border-line bg-paper-raised">
      <Container className="grid gap-10 py-14 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg font-semibold">{siteConfig.name}</p>
          <p className="mt-3 max-w-xs text-sm text-muted">{t.footer.description}</p>
          <div className="mt-4 flex flex-col gap-1 text-sm">
            {whatsapp ? (
              <a href={whatsapp} className="text-accent hover:underline">
                WhatsApp
              </a>
            ) : null}
            {settings.contactEmail ? (
              <a href={`mailto:${settings.contactEmail}`} className="text-accent hover:underline">
                {settings.contactEmail}
              </a>
            ) : null}
          </div>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.1em] text-muted">{t.footer.navTitle}</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-ink/80 hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.1em] text-muted">{t.footer.legalTitle}</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            {t.footer.legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-ink/80 hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <div className="border-t border-line py-5">
        <Container className="flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-xs text-muted">{t.footer.rights}</p>
          {socialLinks.length > 0 ? (
            <div className="-mr-3 flex items-center" aria-label="Sosyal medya bağlantıları">
              {socialLinks.map((s) => (
                <a
                  key={s.platform}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center text-muted transition-all duration-200 hover:-translate-y-0.5 hover:text-accent motion-reduce:hover:translate-y-0"
                >
                  <SocialIcon platform={s.platform} className="h-4 w-4" />
                </a>
              ))}
            </div>
          ) : null}
        </Container>
      </div>
    </footer>
  );
}
