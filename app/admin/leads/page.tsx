import Link from "next/link";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { Container } from "@/components/ui/Container";
import { updateLeadStatus, signOutAdmin } from "./actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Lead Yönetimi", robots: { index: false, follow: false } };

const statusLabels: Record<string, string> = {
  new: "Yeni",
  contacted: "İletişime Geçildi",
  meeting: "Görüşme Planlandı",
  in_progress: "Süreçte",
  converted: "Dönüştü",
  closed: "Kapandı",
};

const statusOrder = ["new", "contacted", "meeting", "in_progress", "converted", "closed"];

export default async function AdminLeadsPage() {
  const { supabase, profile } = await requireAdmin();

  const { data: leads, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="py-12">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
          <div>
            <h1 className="font-display text-2xl font-semibold">Lead Yönetimi</h1>
            <p className="mt-1 text-sm text-muted">Hoş geldin, {profile.full_name ?? "yönetici"}.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin/settings" className="text-sm text-accent hover:underline">
              Site Ayarları
            </Link>
            <form action={signOutAdmin}>
              <button type="submit" className="text-sm text-accent hover:underline">
                Çıkış yap
              </button>
            </form>
          </div>
        </div>

        {error ? (
          <p className="mt-8 text-sm text-danger">Lead&apos;ler yüklenemedi: {error.message}</p>
        ) : null}

        {!error && leads && leads.length === 0 ? (
          <p className="mt-8 text-sm text-muted">Henüz bir lead yok.</p>
        ) : null}

        {leads && leads.length > 0 ? (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-ink text-left font-mono text-xs uppercase tracking-wide text-muted">
                  <th className="py-2 pr-4">Tarih</th>
                  <th className="py-2 pr-4">Ad Soyad</th>
                  <th className="py-2 pr-4">İletişim</th>
                  <th className="py-2 pr-4">Aşama</th>
                  <th className="py-2 pr-4">Hedef</th>
                  <th className="py-2 pr-4">Not</th>
                  <th className="py-2 pr-4">Durum</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-line align-top">
                    <td className="py-3 pr-4 whitespace-nowrap font-mono text-xs text-muted">
                      {new Date(lead.created_at).toLocaleDateString("tr-TR")}
                    </td>
                    <td className="py-3 pr-4">
                      <p className="font-medium">
                        {lead.first_name} {lead.last_name}
                      </p>
                    </td>
                    <td className="py-3 pr-4 text-muted">
                      <p>{lead.phone}</p>
                      <p>{lead.email}</p>
                      <p className="text-xs">Tercih: {lead.preferred_contact ?? "—"}</p>
                    </td>
                    <td className="py-3 pr-4 text-muted">{lead.stage ?? "—"}</td>
                    <td className="py-3 pr-4 text-muted">{lead.target ?? "—"}</td>
                    <td className="py-3 pr-4 max-w-[220px] text-muted">{lead.message || lead.note || "—"}</td>
                    <td className="py-3 pr-4">
                      <form action={updateLeadStatus.bind(null, lead.id)} className="flex items-center gap-2">
                        <select
                          name="status"
                          defaultValue={lead.status}
                          className="rounded-[3px] border border-line bg-paper px-2 py-1.5 text-xs"
                        >
                          {statusOrder.map((s) => (
                            <option key={s} value={s}>
                              {statusLabels[s]}
                            </option>
                          ))}
                        </select>
                        <button type="submit" className="text-xs text-accent hover:underline">
                          Kaydet
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </Container>
    </div>
  );
}
