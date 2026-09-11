import { requireAdmin } from "@/lib/supabase/require-admin";
import { Container } from "@/components/ui/Container";
import { AdminNav } from "@/components/admin/AdminNav";
import { updateMentorApplicationStatus } from "./actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Mentor Başvuruları", robots: { index: false, follow: false } };

const statusLabels: Record<string, string> = {
  new: "Yeni",
  reviewing: "İnceleniyor",
  contacted: "İletişime Geçildi",
  accepted: "Kabul Edildi",
  declined: "Reddedildi",
};

const statusOrder = ["new", "reviewing", "contacted", "accepted", "declined"];

export default async function AdminMentorApplicationsPage() {
  const { supabase, profile } = await requireAdmin();

  const { data: applications, error } = await supabase
    .from("mentor_applications")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="py-12">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
          <div>
            <h1 className="font-display text-2xl font-semibold">Mentor Başvuruları</h1>
            <p className="mt-1 text-sm text-muted">Hoş geldin, {profile.full_name ?? "yönetici"}.</p>
          </div>
          <AdminNav current="/admin/mentor-applications" />
        </div>

        {error ? (
          <p className="mt-8 text-sm text-danger">Başvurular yüklenemedi: {error.message}</p>
        ) : null}

        {!error && applications && applications.length === 0 ? (
          <p className="mt-8 text-sm text-muted">Henüz bir mentor başvurusu yok.</p>
        ) : null}

        {applications && applications.length > 0 ? (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-ink text-left font-mono text-xs uppercase tracking-wide text-muted">
                  <th className="py-2 pr-4">Tarih</th>
                  <th className="py-2 pr-4">Ad Soyad</th>
                  <th className="py-2 pr-4">İletişim</th>
                  <th className="py-2 pr-4">Almanya deneyimi</th>
                  <th className="py-2 pr-4">Motivasyon</th>
                  <th className="py-2 pr-4">Durum</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application) => (
                  <tr key={application.id} className="border-b border-line align-top">
                    <td className="py-3 pr-4 whitespace-nowrap font-mono text-xs text-muted">
                      {new Date(application.created_at).toLocaleDateString("tr-TR")}
                    </td>
                    <td className="py-3 pr-4">
                      <p className="font-medium">
                        {application.first_name} {application.last_name}
                      </p>
                    </td>
                    <td className="py-3 pr-4 text-muted">
                      <p>{application.phone}</p>
                      <p>{application.email}</p>
                    </td>
                    <td className="py-3 pr-4 max-w-[220px] text-muted">{application.germany_experience}</td>
                    <td className="py-3 pr-4 max-w-[220px] text-muted">{application.motivation}</td>
                    <td className="py-3 pr-4">
                      <form
                        action={updateMentorApplicationStatus.bind(null, application.id)}
                        className="flex items-center gap-2"
                      >
                        <select
                          name="status"
                          defaultValue={application.status}
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
