import { Container } from "@/components/ui/Container";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export const metadata = { title: "Yönetici Girişi", robots: { index: false, follow: false } };

export default async function AdminLoginPage({ searchParams }: PageProps<"/admin/login">) {
  const params = await searchParams;
  const notConfigured = params.kurulmadi === "1";
  const unauthorized = params.yetkisiz === "1";

  return (
    <div className="py-20">
      <Container className="max-w-sm">
        <h1 className="font-display text-2xl font-semibold">Yönetici Girişi</h1>

        {notConfigured ? (
          <p className="mt-4 rounded-[3px] border border-line bg-paper-raised p-4 text-sm text-muted">
            Supabase henüz yapılandırılmadı. <code className="font-mono">.env.example</code> dosyasına
            bakarak bağlantıyı kurduktan sonra buradan giriş yapabilirsin.
          </p>
        ) : null}

        {unauthorized ? (
          <p role="alert" className="mt-4 rounded-[3px] border border-danger bg-paper-raised p-4 text-sm text-danger">
            Bu hesabın yönetici yetkisi yok.
          </p>
        ) : null}

        <AdminLoginForm />
      </Container>
    </div>
  );
}
