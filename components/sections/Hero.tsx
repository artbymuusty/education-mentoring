import { getDictionary } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { WorldMap } from "@/components/ui/WorldMap";

export function Hero() {
  const t = getDictionary().home.hero;

  return (
    <section className="border-b border-line py-16 sm:py-24">
      <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-gold">{t.eyebrow}</p>
          <h1 className="max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.1] sm:text-5xl md:text-6xl">
            {t.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">{t.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/basvuru">{t.ctaPrimary}</Button>
            <Button href="/nasil-yardimci-oluyoruz" variant="secondary">
              {t.ctaSecondary}
            </Button>
          </div>
        </div>

        <WorldMap />
      </Container>
    </section>
  );
}
