import type { Metadata } from "next";
import { getDictionary } from "@/lib/content";
import { Container } from "@/components/ui/Container";

export function generateMetadata(): Metadata {
  const t = getDictionary().faq;
  return { title: t.title, description: t.intro };
}

export default function FaqPage() {
  const t = getDictionary().faq;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <div className="py-16 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container className="max-w-3xl">
        <h1 className="text-balance font-display text-4xl font-semibold sm:text-5xl">{t.title}</h1>
        <p className="mt-4 text-lg text-muted">{t.intro}</p>

        <div className="mt-10 flex flex-col divide-y divide-line border-y border-line">
          {t.items.map((item) => (
            <details key={item.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-medium">
                {item.question}
                <span className="shrink-0 text-muted transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </div>
  );
}
