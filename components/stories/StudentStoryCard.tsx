import type { StudentStory } from "@/lib/content/types";
import { Avatar } from "@/components/ui/Avatar";

const fields: { key: keyof StudentStory; label: string }[] = [
  { key: "startingPoint", label: "Nereden başladı?" },
  { key: "problem", label: "Karşılaştığı problem" },
  { key: "stepsTaken", label: "Birlikte hangi adımlardan geçildi?" },
  { key: "now", label: "Şimdi nerede?" },
];

export function StudentStoryCard({ story }: { story: StudentStory }) {
  return (
    <article className="rounded-[3px] border border-line bg-paper-raised p-6 sm:p-8">
      <div className="flex items-center gap-4">
        <Avatar name={story.name} src={story.photoSrc} size={56} />
        <h3 className="font-display text-xl font-semibold">{story.name}</h3>
      </div>

      <dl className="mt-6 flex flex-col gap-5">
        {fields.map(({ key, label }) => (
          <div key={key}>
            <dt className="font-mono text-xs uppercase tracking-[0.08em] text-muted">{label}</dt>
            <dd className="mt-1 text-ink">{story[key]}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
