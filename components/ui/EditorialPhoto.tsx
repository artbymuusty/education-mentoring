import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Real photo when `src` is provided. Otherwise a tasteful abstract
 * map-motif panel in brand tokens — never a stock photo, never a
 * "missing image" look. Ready to receive real photography (see
 * public/images/{hero,students,mentors,germany,cities}) without any
 * code change: just pass `src`.
 */
export function EditorialPhoto({
  src,
  alt,
  className,
  ratio = "4 / 5",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
}: {
  src?: string;
  alt: string;
  className?: string;
  ratio?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden rounded-[3px] border border-line", className)} style={{ aspectRatio: ratio }}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "relative overflow-hidden rounded-[3px] border border-line bg-paper-raised",
        className,
      )}
      style={{ aspectRatio: ratio }}
    >
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          color: "var(--color-gold)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-paper-raised" />
      <div className="absolute left-0 top-0 h-full w-[3px] bg-accent" />
    </div>
  );
}
