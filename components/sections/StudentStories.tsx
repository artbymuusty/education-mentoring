import { studentStories } from "@/lib/content/stories";
import { demoStudentStories } from "@/lib/content/stories.demo";
import { demoContentEnabled } from "@/lib/content/demo";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StudentStoryCard } from "@/components/stories/StudentStoryCard";

export function StudentStories() {
  const isDemo = studentStories.length === 0 && demoContentEnabled;
  const stories = isDemo ? demoStudentStories : studentStories;

  if (stories.length === 0) return null;

  return (
    <section id="ogrenci-hikayeleri" className="border-b border-line py-16 sm:py-20 scroll-mt-20">
      <Container>
        <SectionHeading title="Bu yolculukta yalnız değildiler." subtitle="Bu yolculuktan gerçekten geçmiş olanlar." />
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {stories.map((story) => (
            <StudentStoryCard key={story.id} story={story} isDemo={isDemo} />
          ))}
        </div>
      </Container>
    </section>
  );
}
