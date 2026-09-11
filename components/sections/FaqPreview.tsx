import { getDictionary } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function FaqPreview() {
  const t = getDictionary();
  const previewItems = t.faq.items.slice(-3);

  return (
    <section className="border-b border-line py-16 sm:py-20">
      <Container className="max-w-3xl">
        <h2 className="font-display text-3xl font-semibold sm:text-4xl">{t.home.faqPreview.title}</h2>

        <div className="mt-8 flex flex-col divide-y divide-line border-y border-line">
          {previewItems.map((item) => (
            <details key={item.question} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                {item.question}
                <span className="text-muted transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm text-muted">{item.answer}</p>
            </details>
          ))}
        </div>

        <div className="mt-6">
          <Button href="/sss" variant="ghost">
            {t.home.faqPreview.cta} →
          </Button>
        </div>
      </Container>
    </section>
  );
}
