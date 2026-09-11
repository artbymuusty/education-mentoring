import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site-config";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description: `${siteConfig.name} KVKK aydınlatma metni.`,
  alternates: { canonical: "/kvkk" },
};

export default async function KvkkPage() {
  const settings = await getSiteSettings();
  const { companyName, companyAddress, mersisNo, taxOffice, taxNumber } = settings;
  const controllerName = companyName || siteConfig.name;

  return (
    <div className="py-16 sm:py-20">
      <Container className="max-w-2xl">
        <h1 className="font-display text-4xl font-semibold">KVKK Aydınlatma Metni</h1>
        <p className="mt-3 font-mono text-xs uppercase tracking-[0.08em] text-muted">
          6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında
        </p>
        <div className="mt-8 flex flex-col gap-5 text-ink">
          <div>
            <h2 className="font-display text-lg font-semibold">Veri sorumlusu</h2>
            <p className="mt-2 text-muted">
              {controllerName}
              {companyAddress ? `, ${companyAddress}` : ""}
              {mersisNo ? ` — MERSİS: ${mersisNo}` : ""}
              {taxOffice && taxNumber ? ` — ${taxOffice} V.D. ${taxNumber}` : ""}.
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold">İşlenen kişisel veriler</h2>
            <p className="mt-2 text-muted">
              Ad, soyad, telefon numarası, e-posta adresi, eğitim durumu ve hedeflerine dair paylaştığın
              bilgiler.
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold">İşleme amacı</h2>
            <p className="mt-2 text-muted">
              Seninle iletişime geçmek, mentorluk görüşmesi hazırlamak ve talep ettiğin bilgilendirmeyi
              yapmak.
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold">Haklarınız</h2>
            <p className="mt-2 text-muted">
              KVKK madde 11 kapsamındaki haklarını kullanmak için{" "}
              {settings.contactEmail ? (
                <>{settings.contactEmail} adresine yazabilirsin.</>
              ) : (
                <>
                  <Link href="/iletisim" className="text-accent hover:underline">
                    iletişim sayfasındaki
                  </Link>{" "}
                  kanallardan bize ulaşabilirsin.
                </>
              )}
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
