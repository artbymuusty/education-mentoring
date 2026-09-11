import type { StudentStory } from "@/lib/content/types";
import { Avatar } from "@/components/ui/Avatar";

const fields: { key: keyof StudentStory; label: string }[] = [
  { key: "startingPoint", label: "Nereden başladı?" },
  { key: "problem", label: "Karşılaştığı problem" },
  { key: "stepsTaken", label: "Birlikte hangi adımlardan geçildi?" },
  { key: "now", label: "Şimdi nerede?" },
];

export function StudentStoryCard({ story, isDemo = false }: { story: StudentStory; isDemo?: boolean }) {
  return (
    <article className="relative rounded-[3px] border border-line bg-paper-raised p-6 sm:p-8">
      {isDemo ? (
        <span className="absolute right-4 top-4 rounded-full border border-gold px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-gold">
          Örnek
        </span>
      ) : null}

      <div className="flex items-center gap-4">
        <Avatar name={story.name} src={story.photoSrc} size={56} />
        <div>
          <h3 className="font-display text-xl font-semibold">{story.name}</h3>
          <p className="text-sm text-muted">
            {story.city} · {story.university} · {story.field}
          </p>
        </div>
      </div>

      <p className="mt-5 font-display text-lg italic text-ink">&ldquo;{story.quote}&rdquo;</p>

      <dl className="mt-6 flex flex-col gap-5 border-t border-line pt-6">
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
