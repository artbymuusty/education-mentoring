import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description: `${siteConfig.name} KVKK aydınlatma metni.`,
};

export default function KvkkPage() {
  return (
    <div className="py-16 sm:py-20">
      <Container className="max-w-2xl">
        <h1 className="font-display text-4xl font-semibold">KVKK Aydınlatma Metni</h1>
        <div className="mt-8 flex flex-col gap-5 text-ink">
          <p className="text-sm text-muted">
            Bu sayfa, 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında hazırlanmış bir taslaktır;
            veri sorumlusuna ilişkin tescil bilgileri netleştikten ve bir hukuk danışmanı tarafından
            onaylandıktan sonra yayına alınmalıdır.
          </p>
          <div>
            <h2 className="font-display text-lg font-semibold">Veri sorumlusu</h2>
            <p className="mt-2 text-muted">{siteConfig.name} (şirket unvanı ve adresi eklenecek).</p>
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
              KVKK madde 11 kapsamındaki haklarını kullanmak için {siteConfig.contact.email} adresine
              yazabilirsin.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
