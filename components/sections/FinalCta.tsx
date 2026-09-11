import { getDictionary } from "@/lib/content";
import { whatsappLink } from "@/lib/site-config";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function FinalCta() {
  const t = getDictionary().home.finalCta;
  const whatsapp = whatsappLink();

  return (
    <section className="bg-ink py-16 text-paper sm:py-20">
      <Container className="max-w-2xl text-center">
        <h2 className="text-balance font-display text-3xl font-semibold sm:text-4xl">{t.title}</h2>
        <p className="mt-4 text-paper/75">{t.description}</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button href="/basvuru">{t.ctaPrimary}</Button>
          {whatsapp ? (
            <Button href={whatsapp} variant="secondary" className="!border-paper !text-paper hover:!bg-paper hover:!text-ink">
              {t.ctaSecondary}
            </Button>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
