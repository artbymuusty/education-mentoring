import type { Metadata } from "next";
import { getDictionary } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { EditorialPhoto } from "@/components/ui/EditorialPhoto";

export function generateMetadata(): Metadata {
  const t = getDictionary().about;
  return { title: t.title, description: t.intro, alternates: { canonical: "/hakkimizda" } };
}

export default function AboutPage() {
  const t = getDictionary().about;

  return (
    <div className="py-16 sm:py-20">
      <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <h1 className="text-balance font-display text-4xl font-semibold sm:text-5xl">{t.title}</h1>
          <p className="mt-4 font-display text-xl italic text-muted">{t.intro}</p>
        </div>
        <EditorialPhoto
          src={t.imageSrc ?? "/images/cities/cologne.jpg"}
          alt={t.imageAlt ?? "Köln, Almanya"}
          ratio="4 / 5"
          sizes="(min-width: 1024px) 40vw, 100vw"
          priority
        />
      </Container>

      <Container className="mt-16 max-w-3xl">
        <div className="flex flex-col gap-10">
          {t.sections.map((section, index) => (
            <div key={section.heading} className="border-t border-line pt-8 first:border-t-0 first:pt-0">
              <span className="font-mono text-xs text-gold">{String(index + 1).padStart(2, "0")}</span>
              <h2 className="mt-2 font-display text-xl font-semibold">{section.heading}</h2>
              <p className="mt-3 text-muted">{section.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
