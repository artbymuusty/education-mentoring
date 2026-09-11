import Link from "next/link";
import { getDictionary } from "@/lib/content";
import { siteConfig, hasEmail, whatsappLink } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const t = getDictionary();
  const whatsapp = whatsappLink();

  const navLinks = [
    { href: "/nasil-yardimci-oluyoruz", label: t.nav.services },
    { href: "/mentorluk", label: t.nav.mentorship },
    { href: "/hakkimizda", label: t.nav.about },
    { href: "/sss", label: t.nav.faq },
    { href: "/iletisim", label: t.nav.contact },
  ];

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
            {hasEmail ? (
              <a href={`mailto:${siteConfig.contact.email}`} className="text-accent hover:underline">
                {siteConfig.contact.email}
              </a>
            ) : null}
            {siteConfig.contact.instagram ? (
              <a href={siteConfig.contact.instagram} className="text-accent hover:underline">
                Instagram
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
        <Container>
          <p className="font-mono text-xs text-muted">{t.footer.rights}</p>
        </Container>
      </div>
    </footer>
  );
}
