import type { Metadata } from "next";
import Image from "next/image";
import { getDictionary } from "@/lib/content";
import { Container } from "@/components/ui/Container";

export function generateMetadata(): Metadata {
  const t = getDictionary().about;
  return { title: t.title, description: t.intro, alternates: { canonical: "/hakkimizda" } };
}

export default function AboutPage() {
  const t = getDictionary().about;

  return (
    <div className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <h1 className="text-balance font-display text-4xl font-semibold sm:text-5xl">{t.title}</h1>
        <p className="mt-4 font-display text-xl italic text-muted">{t.intro}</p>
      </Container>

      {t.imageSrc ? (
        <Container className="mt-10 max-w-3xl">
          <div className="overflow-hidden rounded-[3px] border border-line">
            <Image
              src={t.imageSrc}
              alt={t.imageAlt ?? ""}
              width={1200}
              height={720}
              className="h-auto w-full object-cover"
            />
          </div>
        </Container>
      ) : null}

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
    </div>
  );
}
