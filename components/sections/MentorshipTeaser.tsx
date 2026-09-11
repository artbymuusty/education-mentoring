import { getDictionary } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function MentorshipTeaser() {
  const t = getDictionary().home.mentorship;

  return (
    <section className="border-b border-line py-16 sm:py-20">
      <Container className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div>
          <h2 className="text-balance font-display text-3xl font-semibold sm:text-4xl">{t.title}</h2>
          <p className="mt-4 max-w-lg text-muted">{t.description}</p>
          <div className="mt-6">
            <Button href="/mentorluk" variant="secondary">
              {t.cta}
            </Button>
          </div>
        </div>
        <div className="rounded-[3px] border border-line bg-paper-raised p-8">
          <p className="font-display text-xl italic text-ink">
            &ldquo;Görevleri başvuru yapmak değil, doğru kararı vermeni kolaylaştırmak.&rdquo;
          </p>
        </div>
      </Container>
    </section>
  );
}
