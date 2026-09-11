import type { StudentStory } from "./types";

/**
 * DEMO / PLACEHOLDER content — not real students, never shown to real
 * visitors by default. Only renders when NEXT_PUBLIC_SHOW_DEMO_CONTENT=true,
 * and always with a visible "Örnek" label when it does (see
 * StudentStoryCard). Used to preview the design before real, consented
 * stories exist in lib/content/stories.ts. Delete this file once real
 * content makes it redundant.
 */
export const demoStudentStories: StudentStory[] = [
  {
    id: "demo-1",
    name: "Örnek Öğrenci",
    city: "Münih",
    university: "TU München",
    field: "Makine Mühendisliği",
    year: "2025",
    quote: "Nereden başlayacağımı bilmiyordum, birlikte adım adım netleştirdik.",
    startingPoint: "Lise son sınıftaydı, Almanya'da okumak istiyordu ama hangi şehir ve bölümün uygun olduğundan emin değildi.",
    problem: "Almanca seviyesi yeterli değildi ve başvuru takviminin nasıl işlediğini bilmiyordu.",
    stepsTaken: "Önce dil hedefini netleştirdik, sonra başvuru takvimini birlikte çıkardık ve belgeleri adım adım hazırladık.",
    now: "Şu anda Münih'te okuyor ve ilk yılını tamamlamak üzere.",
  },
  {
    id: "demo-2",
    name: "Örnek Öğrenci",
    city: "Berlin",
    university: "TU Berlin",
    field: "Bilgisayar Bilimi",
    year: "2024",
    quote: "Vize sürecinde tek başıma olmamak büyük fark yarattı.",
    startingPoint: "Üniversite mezunuydu, yüksek lisans için Almanya'yı düşünüyordu.",
    problem: "Kabul aldıktan sonra vize belgelerinde nelerin eksik olduğunu bilmiyordu.",
    stepsTaken: "Belge listesini birlikte çıkardık, blocked account sürecini ve randevu takibini adım adım yürüttük.",
    now: "Berlin'de yüksek lisansına devam ediyor.",
  },
];
