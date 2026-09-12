import Image from "next/image";
import { getDictionary } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

export function TrustSection() {
  const t = getDictionary().home.trust;

  return (
    <section className="border-b border-line bg-paper-raised py-16 sm:py-20">
      <Container
        className={cn("max-w-3xl", t.imageSrc && "grid max-w-none gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center")}
      >
        <Reveal>
          <h2 className="text-balance font-display text-3xl font-semibold sm:text-4xl">{t.title}</h2>
          <div className="mt-6 flex flex-col gap-4">
            {t.body.map((paragraph) => (
              <p key={paragraph} className="text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
        {t.imageSrc ? (
          <div className="overflow-hidden rounded-[3px] border border-line">
            <Image
              src={t.imageSrc}
              alt={t.imageAlt ?? ""}
              width={900}
              height={700}
              className="h-auto w-full object-cover"
            />
          </div>
        ) : null}
      </Container>
    </section>
  );
}
