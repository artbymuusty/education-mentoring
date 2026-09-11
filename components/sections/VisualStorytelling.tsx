import { EditorialPhoto } from "@/components/ui/EditorialPhoto";
import { Container } from "@/components/ui/Container";

/**
 * One strong visual moment rather than a photo in every section — per the
 * "bir section'a fotoğraf koymak zorunda değilsin" brief. Panels render a
 * real photo once one exists at the given path; until then the tasteful
 * map-motif fallback keeps the section from looking empty or unfinished.
 */
export function VisualStorytelling() {
  return (
    <section className="border-b border-line py-16 sm:py-20">
      <Container className="grid grid-cols-1 gap-4 sm:grid-cols-5">
        <EditorialPhoto
          alt="Almanya'da bir üniversite kampüsü"
          ratio="3 / 4"
          className="sm:col-span-3"
          src={undefined}
        />
        <div className="flex flex-col gap-4 sm:col-span-2">
          <EditorialPhoto alt="Almanya'da günlük öğrenci hayatı" ratio="1 / 1" src={undefined} />
          <EditorialPhoto alt="Bir mentor görüşmesi" ratio="16 / 10" src={undefined} />
        </div>
      </Container>
    </section>
  );
}
