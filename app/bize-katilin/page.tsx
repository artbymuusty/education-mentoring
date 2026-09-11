import type { Metadata } from "next";
import { getDictionary } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { MentorApplicationForm } from "@/components/recruitment/MentorApplicationForm";

export function generateMetadata(): Metadata {
  const t = getDictionary().bizeKatilin;
  return { title: t.title, description: t.intro, alternates: { canonical: "/bize-katilin" } };
}

export default function JoinUsPage() {
  const t = getDictionary().bizeKatilin;

  return (
    <div className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <h1 className="text-balance font-display text-4xl font-semibold sm:text-5xl">{t.title}</h1>
        <p className="mt-4 text-lg text-muted">{t.intro}</p>
      </Container>

      <Container className="mt-14 max-w-3xl">
        <div className="flex flex-col gap-10">
          {t.sections.map((section) => (
            <div key={section.heading} className="border-t border-line pt-8 first:border-t-0 first:pt-0">
              <h2 className="font-display text-xl font-semibold">{section.heading}</h2>
              <p className="mt-3 text-muted">{section.body}</p>
            </div>
          ))}
        </div>
      </Container>

      <Container className="mt-16 max-w-2xl">
        <MentorApplicationForm />
      </Container>
    </div>
  );
}
