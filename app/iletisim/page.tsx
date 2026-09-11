import type { Metadata } from "next";
import { getDictionary } from "@/lib/content";
import { siteConfig, hasEmail, whatsappLink } from "@/lib/site-config";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

export function generateMetadata(): Metadata {
  const t = getDictionary().contact;
  return { title: t.title, description: t.intro, alternates: { canonical: "/iletisim" } };
}

export default function ContactPage() {
  const t = getDictionary().contact;
  const whatsapp = whatsappLink();

  const channels = [
    whatsapp
      ? { key: "whatsapp", title: t.whatsapp.title, description: t.whatsapp.description, cta: t.whatsapp.cta, href: whatsapp }
      : null,
    hasEmail
      ? { key: "email", title: t.email.title, description: t.email.description, cta: t.email.cta, href: `mailto:${siteConfig.contact.email}` }
      : null,
  ].filter((c): c is NonNullable<typeof c> => c !== null);

  return (
    <div className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <h1 className="text-balance font-display text-4xl font-semibold sm:text-5xl">{t.title}</h1>
        <p className="mt-4 text-lg text-muted">{t.intro}</p>
      </Container>

      {channels.length > 0 ? (
        <Container
          className={cn("mt-12 grid grid-cols-1 gap-4", channels.length > 1 && "sm:grid-cols-2")}
        >
          {channels.map((channel) => (
            <Card key={channel.key}>
              <h2 className="font-display text-lg font-semibold">{channel.title}</h2>
              <p className="mt-2 text-sm text-muted">{channel.description}</p>
              <Button href={channel.href} variant="secondary" className="mt-5 !px-4 !py-2.5 text-sm">
                {channel.cta}
              </Button>
            </Card>
          ))}
        </Container>
      ) : null}

      <Container className="mt-8 max-w-3xl rounded-[3px] border border-accent bg-paper-raised p-8">
        <h2 className="font-display text-xl font-semibold">{t.formCta.title}</h2>
        <p className="mt-2 text-muted">{t.formCta.description}</p>
        <Button href="/basvuru" className="mt-5">
          {t.formCta.cta}
        </Button>
      </Container>
    </div>
  );
}
