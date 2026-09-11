import Link from "next/link";
import { signOutAdmin } from "@/app/admin/actions";

const links = [
  { href: "/admin/leads", label: "Lead Yönetimi" },
  { href: "/admin/mentor-applications", label: "Mentor Başvuruları" },
  { href: "/admin/settings", label: "Site Ayarları" },
];

export function AdminNav({ current }: { current: string }) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {links.map((link) =>
        link.href === current ? (
          <span key={link.href} className="text-sm font-medium text-ink">
            {link.label}
          </span>
        ) : (
          <Link key={link.href} href={link.href} className="text-sm text-accent hover:underline">
            {link.label}
          </Link>
        ),
      )}
      <form action={signOutAdmin}>
        <button type="submit" className="text-sm text-accent hover:underline">
          Çıkış yap
        </button>
      </form>
    </div>
  );
}
