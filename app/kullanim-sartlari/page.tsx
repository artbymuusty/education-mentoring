import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Kullanım Şartları",
  description: `${siteConfig.name} kullanım şartları.`,
};

export default function TermsPage() {
  return (
    <div className="py-16 sm:py-20">
      <Container className="max-w-2xl">
        <h1 className="font-display text-4xl font-semibold">Kullanım Şartları</h1>
        <div className="mt-8 flex flex-col gap-5 text-ink">
          <p className="text-sm text-muted">
            Bu sayfa bir taslaktır ve yayına almadan önce bir hukuk danışmanı tarafından gözden geçirilmelidir.
          </p>
          <div>
            <h2 className="font-display text-lg font-semibold">Hizmetin kapsamı</h2>
            <p className="mt-2 text-muted">
              {siteConfig.name}, Almanya&apos;da eğitim süreci konusunda yönlendirme ve mentorluk desteği sunar.
              Üniversite kabulü, vize onayı veya başka bir resmi kararın garantisini vermez; bu kararlar
              ilgili üniversite, konsolosluk ve resmi kurumların yetkisindedir.
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold">Sorumluluk</h2>
            <p className="mt-2 text-muted">
              Paylaştığımız bilgi ve yönlendirmeler, görüşme anındaki bilgilere dayanır; resmi kurumların
              güncel gereksinimlerini teyit etmek kullanıcının sorumluluğundadır.
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold">İletişim</h2>
            <p className="mt-2 text-muted">
              Sorularınız için {siteConfig.contact.email} adresinden bize ulaşabilirsiniz.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
