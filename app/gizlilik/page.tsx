import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: `${siteConfig.name} gizlilik politikası.`,
};

export default function PrivacyPage() {
  return (
    <div className="py-16 sm:py-20">
      <Container className="max-w-2xl">
        <h1 className="font-display text-4xl font-semibold">Gizlilik Politikası</h1>
        <div className="prose mt-8 flex flex-col gap-5 text-ink">
          <p className="text-sm text-muted">
            Bu sayfa, {siteConfig.name} tarafından hazırlanan bir taslaktır ve yayına almadan önce bir hukuk
            danışmanı tarafından gözden geçirilmelidir.
          </p>
          <div>
            <h2 className="font-display text-lg font-semibold">Hangi bilgileri topluyoruz?</h2>
            <p className="mt-2 text-muted">
              &quot;Yolculuğunu Konuşalım&quot; formunu doldurduğunda ad, soyad, telefon/WhatsApp numarası, e-posta
              adresi ve paylaştığın eğitim durumu / hedef bilgilerini alıyoruz. İletişim sayfası üzerinden
              WhatsApp veya e-posta ile ulaştığında, ilgili platformun kendi gizlilik kuralları geçerlidir.
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold">Bu bilgileri ne için kullanıyoruz?</h2>
            <p className="mt-2 text-muted">
              Yalnızca seninle iletişime geçmek ve görüşmeye hazırlanmak için kullanıyoruz. Bilgilerini
              üçüncü taraflara satmıyor veya pazarlama amacıyla paylaşmıyoruz.
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold">Verilerin saklanması</h2>
            <p className="mt-2 text-muted">
              Bilgilerin, erişimi yalnızca yetkili ekip üyeleriyle sınırlı olan güvenli bir veritabanında
              saklanır. Bilgilerinin silinmesini istediğinde {siteConfig.contact.email} adresine yazabilirsin.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
