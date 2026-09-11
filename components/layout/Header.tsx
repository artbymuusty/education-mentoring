import Link from "next/link";
import { getDictionary } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Header() {
  const t = getDictionary();

  const links = [
    { href: "/nasil-yardimci-oluyoruz", label: t.nav.services },
    { href: "/mentorluk", label: t.nav.mentorship },
    { href: "/hakkimizda", label: t.nav.about },
    { href: "/fiyatlar", label: t.nav.pricing },
    { href: "/sss", label: t.nav.faq },
    { href: "/iletisim", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="font-display text-lg font-semibold tracking-tight">
          {siteConfig.name}
        </Link>

        <nav aria-label="Ana menü" className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-ink/80 transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="/basvuru" className="!px-4 !py-2.5 text-sm">
            {t.nav.ctaPrimary}
          </Button>
        </div>

        <details className="group relative lg:hidden">
          <summary
            className="flex cursor-pointer list-none items-center rounded-[3px] border border-line px-3 py-2 text-sm"
            aria-label="Menüyü aç"
          >
            Menü
          </summary>
          <div className="absolute right-0 top-full mt-2 w-64 rounded-[3px] border border-line bg-paper p-4 shadow-lg">
            <nav aria-label="Mobil menü" className="flex flex-col gap-3">
              {links.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm text-ink/80 hover:text-accent">
                  {link.label}
                </Link>
              ))}
            </nav>
            <Button href="/basvuru" className="mt-4 w-full !py-2.5 text-sm">
              {t.nav.ctaPrimary}
            </Button>
          </div>
        </details>
      </Container>
    </header>
  );
}
