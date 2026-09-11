import type { Metadata } from "next";
import { getDictionary } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function generateMetadata(): Metadata {
  const t = getDictionary().services;
  return { title: t.title, description: t.intro };
}

export default function ServicesPage() {
  const t = getDictionary().services;

  return (
    <div className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <h1 className="text-balance font-display text-4xl font-semibold sm:text-5xl">{t.title}</h1>
        <p className="mt-4 text-lg text-muted">{t.intro}</p>
      </Container>

      <Container className="mt-14 flex flex-col gap-14">
        {t.items.map((service, index) => (
          <article key={service.slug} id={service.slug} className="border-t border-line pt-10 first:border-t-0 first:pt-0">
            <span className="font-mono text-sm text-gold">{String(index + 1).padStart(2, "0")}</span>
            <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">{service.title}</h2>

            <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="flex flex-col gap-5">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.1em] text-muted">Problem</p>
                  <p className="mt-1 text-ink">{service.problem}</p>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.1em] text-muted">Nasıl yardımcı oluyoruz</p>
                  <p className="mt-1 text-ink">{service.help}</p>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.1em] text-muted">Kimler için</p>
                  <p className="mt-1 text-ink">{service.forWhom}</p>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.1em] text-muted">Süreç</p>
                  <ol className="mt-2 flex flex-col gap-2">
                    {service.process.map((step, stepIndex) => (
                      <li key={step} className="flex gap-3 text-sm text-ink">
                        <span className="font-mono text-muted">{stepIndex + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.1em] text-muted">Kapsam</p>
                  <p className="mt-1 text-sm text-muted">{service.scope}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <Button href="/basvuru" variant="secondary" className="!px-4 !py-2.5 text-sm">
                {service.nextStep}
              </Button>
            </div>
          </article>
        ))}
      </Container>
    </div>
  );
}
