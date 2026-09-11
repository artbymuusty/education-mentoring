import { studentStories } from "@/lib/content/stories";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StudentStoryCard } from "@/components/stories/StudentStoryCard";

export function StudentStories() {
  if (studentStories.length === 0) return null;

  return (
    <section className="border-b border-line py-16 sm:py-20">
      <Container>
        <SectionHeading title="Öğrenci hikâyeleri" subtitle="Bu yolculuktan gerçekten geçmiş olanlar." />
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {studentStories.map((story) => (
            <StudentStoryCard key={story.id} story={story} />
          ))}
        </div>
      </Container>
    </section>
  );
}
