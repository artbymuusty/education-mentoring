import type { Metadata } from "next";
import { getDictionary } from "@/lib/content";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";

export function generateMetadata(): Metadata {
  const t = getDictionary().contact;
  return { title: t.title, description: t.intro };
}

export default function ContactPage() {
  const t = getDictionary().contact;

  return (
    <div className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <h1 className="text-balance font-display text-4xl font-semibold sm:text-5xl">{t.title}</h1>
        <p className="mt-4 text-lg text-muted">{t.intro}</p>
      </Container>

      <Container className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card>
          <h2 className="font-display text-lg font-semibold">{t.whatsapp.title}</h2>
          <p className="mt-2 text-sm text-muted">{t.whatsapp.description}</p>
          <Button href={whatsappLink()} variant="secondary" className="mt-5 !px-4 !py-2.5 text-sm">
            {t.whatsapp.cta}
          </Button>
        </Card>
        <Card>
          <h2 className="font-display text-lg font-semibold">{t.email.title}</h2>
          <p className="mt-2 text-sm text-muted">{t.email.description}</p>
          <Button
            href={`mailto:${siteConfig.contact.email}`}
            variant="secondary"
            className="mt-5 !px-4 !py-2.5 text-sm"
          >
            {t.email.cta}
          </Button>
        </Card>
      </Container>

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
