import type { Mentor } from "@/lib/content/types";
import { Avatar } from "@/components/ui/Avatar";

export function MentorProfile({ mentor }: { mentor: Mentor }) {
  return (
    <article className="rounded-[3px] border border-line bg-paper-raised p-6 sm:p-8">
      <div className="flex items-center gap-4">
        <Avatar name={mentor.name} src={mentor.photoSrc} size={72} />
        <div>
          <h3 className="font-display text-xl font-semibold">{mentor.name}</h3>
          <p className="text-sm text-muted">{mentor.role}</p>
        </div>
      </div>

      <p className="mt-5 text-ink">{mentor.bio}</p>

      <dl className="mt-6 grid grid-cols-1 gap-4 border-t border-line pt-5 sm:grid-cols-3">
        <div>
          <dt className="font-mono text-xs uppercase tracking-[0.08em] text-muted">Almanya deneyimi</dt>
          <dd className="mt-1 text-sm text-ink">{mentor.germanyExperience}</dd>
        </div>
        <div>
          <dt className="font-mono text-xs uppercase tracking-[0.08em] text-muted">Eğitim geçmişi</dt>
          <dd className="mt-1 text-sm text-ink">{mentor.education}</dd>
        </div>
        <div>
          <dt className="font-mono text-xs uppercase tracking-[0.08em] text-muted">Uzmanlık alanı</dt>
          <dd className="mt-1 text-sm text-ink">{mentor.specialty}</dd>
        </div>
      </dl>
    </article>
  );
}
