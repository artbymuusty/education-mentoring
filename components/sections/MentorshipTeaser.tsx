import { getDictionary } from "@/lib/content";
import { mentors } from "@/lib/content/mentors";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function MentorshipTeaser() {
  const t = getDictionary().home.mentorship;
  const featured = mentors[0];

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

        {featured?.quote ? (
          <div className="rounded-[3px] border border-line bg-paper-raised p-8">
            <p className="font-display text-xl italic text-ink">&ldquo;{featured.quote}&rdquo;</p>
            <div className="mt-5 flex items-center gap-3">
              <Avatar name={featured.name} src={featured.photoSrc} size={40} />
              <div>
                <p className="text-sm font-medium text-ink">{featured.name}</p>
                <p className="text-xs text-muted">{featured.role}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-[3px] border border-line bg-paper-raised p-8">
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-gold">Yaklaşımımız</p>
            <p className="mt-3 font-display text-xl italic text-ink">
              Görevleri başvuru yapmak değil, doğru kararı vermeni kolaylaştırmak.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
