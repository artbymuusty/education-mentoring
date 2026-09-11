import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { AssessmentFlow } from "@/components/assessment/AssessmentFlow";

export const metadata: Metadata = {
  title: "Seni Biraz Tanıyalım",
  description: "Birkaç kısa soruyla mevcut durumunu anlayalım, sana uygun bir görüşme hazırlayalım.",
};

export default async function AssessmentPage({ searchParams }: PageProps<"/basvuru">) {
  const params = await searchParams;
  const rawStage = params.asama;
  const initialStage = typeof rawStage === "string" ? rawStage : undefined;

  return (
    <div className="py-16 sm:py-20">
      <Container>
        <AssessmentFlow initialStage={initialStage} />
      </Container>
    </div>
  );
}
