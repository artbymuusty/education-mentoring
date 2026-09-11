import Link from "next/link";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SettingsField } from "@/components/admin/SettingsField";
import { updateSiteSettings } from "./actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Site Ayarları", robots: { index: false, follow: false } };

const errorMessages: Record<string, string> = {
  email: "Geçerli bir e-posta adresi gir.",
  whatsapp: "WhatsApp numarasında en az 7 rakam olmalı.",
  "1": "Kaydedilemedi, tekrar dene.",
};

export default async function AdminSettingsPage({ searchParams }: PageProps<"/admin/settings">) {
  const { supabase } = await requireAdmin();
  const params = await searchParams;
  const saved = params.saved === "1";
  const errorKey = typeof params.error === "string" ? params.error : null;

  const { data: settings, error: loadError } = await supabase
    .from("site_settings")
    .select("*")
    .eq("singleton", true)
    .maybeSingle();

  return (
    <div className="py-12">
      <Container className="max-w-2xl">
        <div className="border-b border-line pb-6">
          <Link href="/admin/leads" className="text-sm text-accent hover:underline">
            ← Lead Yönetimi
          </Link>
          <h1 className="mt-2 font-display text-2xl font-semibold">Site Ayarları</h1>
          <p className="mt-1 text-sm text-muted">
            Buradaki bilgiler public sitede (footer, iletişim, yasal sayfalar) otomatik olarak görünür.
            Boş bıraktığın alanlar public sitede hiç gösterilmez.
          </p>
        </div>

        {saved ? (
          <p role="status" className="mt-6 rounded-[3px] border border-accent bg-paper-raised p-4 text-sm text-ink">
            Kaydedildi. Public sitede kısa süre içinde görünür.
          </p>
        ) : null}
        {errorKey ? (
          <p role="alert" className="mt-6 rounded-[3px] border border-danger bg-paper-raised p-4 text-sm text-danger">
            {errorMessages[errorKey] ?? errorMessages["1"]}
          </p>
        ) : null}
        {loadError ? (
          <p role="alert" className="mt-6 text-sm text-danger">
            Ayarlar yüklenemedi: {loadError.message}
          </p>
        ) : null}

        <form action={updateSiteSettings} className="mt-8 flex flex-col gap-8">
          <fieldset className="flex flex-col gap-4">
            <legend className="font-mono text-xs uppercase tracking-[0.08em] text-muted">İletişim</legend>
            <SettingsField
              id="whatsapp_number"
              label="WhatsApp numarası"
              defaultValue={settings?.whatsapp_number}
              placeholder="+49 151 000 00 00"
              helper="Ülke koduyla birlikte gir, wa.me linki otomatik oluşturulur."
            />
            <SettingsField
              id="contact_email"
              label="İletişim e-postası"
              type="email"
              defaultValue={settings?.contact_email}
              placeholder="merhaba@marka-adin.com"
            />
          </fieldset>

          <fieldset className="flex flex-col gap-4 border-t border-line pt-6">
            <legend className="font-mono text-xs uppercase tracking-[0.08em] text-muted">Şirket Bilgileri</legend>
            <SettingsField id="company_name" label="Şirket unvanı" defaultValue={settings?.company_name} />
            <SettingsField
              id="company_address"
              label="Adres"
              defaultValue={settings?.company_address}
              textarea
            />
            <SettingsField id="tax_office" label="Vergi dairesi" defaultValue={settings?.tax_office} />
            <SettingsField id="tax_number" label="Vergi numarası" defaultValue={settings?.tax_number} />
            <SettingsField id="mersis_no" label="MERSİS numarası" defaultValue={settings?.mersis_no} />
          </fieldset>

          <fieldset className="flex flex-col gap-4 border-t border-line pt-6">
            <legend className="font-mono text-xs uppercase tracking-[0.08em] text-muted">Website</legend>
            <SettingsField
              id="production_domain"
              label="Production domain"
              defaultValue={settings?.production_domain}
              placeholder="egitimmentoring.com"
              helper="https:// olmadan yaz, otomatik eklenir. Boşken deployment fallback'i kullanılır."
            />
          </fieldset>

          <div>
            <Button type="submit">Kaydet</Button>
          </div>
        </form>
      </Container>
    </div>
  );
}
