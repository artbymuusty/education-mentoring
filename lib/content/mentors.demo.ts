import type { Mentor } from "./types";

/**
 * DEMO / PLACEHOLDER content — not a real mentor, never shown to real
 * visitors by default. Only renders when NEXT_PUBLIC_SHOW_DEMO_CONTENT=true,
 * and always with a visible "Örnek" label when it does (see
 * MentorProfile usage in app/mentorluk/page.tsx). Used to preview the
 * design before real mentor data exists in lib/content/mentors.ts.
 * Delete this file once real content makes it redundant.
 */
export const demoMentors: Mentor[] = [
  {
    id: "demo-mentor-1",
    name: "Örnek Mentor",
    role: "Eğitim Danışmanı",
    bio: "Almanya'da yüksek lisansını tamamladı ve bugün öğrencilerin başvuru ve vize sürecinde yanında oluyor.",
    germanyExperience: "6 yıl, Berlin",
    education: "TU Berlin — Yüksek Lisans",
    specialty: "Başvuru süreci ve vize hazırlığı",
    quote: "Görevimiz başvuru yapmak değil, doğru kararı vermeni kolaylaştırmak.",
  },
];
