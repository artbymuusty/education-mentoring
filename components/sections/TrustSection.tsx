import { getDictionary } from "@/lib/content";
import { Container } from "@/components/ui/Container";

export function TrustSection() {
  const t = getDictionary().home.trust;

  return (
    <section className="border-b border-line bg-paper-raised py-16 sm:py-20">
      <Container className="max-w-3xl">
        <h2 className="text-balance font-display text-3xl font-semibold sm:text-4xl">{t.title}</h2>
        <div className="mt-6 flex flex-col gap-4">
          {t.body.map((paragraph) => (
            <p key={paragraph} className="text-muted">
              {paragraph}
            </p>
          ))}
        </div>
      </Container>
    </section>
  );
}
