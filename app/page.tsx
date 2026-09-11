import { Hero } from "@/components/sections/Hero";
import { StageSelector } from "@/components/sections/StageSelector";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { VisualStorytelling } from "@/components/sections/VisualStorytelling";
import { MentorshipTeaser } from "@/components/sections/MentorshipTeaser";
import { TrustSection } from "@/components/sections/TrustSection";
import { StudentStories } from "@/components/sections/StudentStories";
import { FaqPreview } from "@/components/sections/FaqPreview";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <StageSelector />
      <ServicesOverview />
      <HowWeWork />
      <VisualStorytelling />
      <MentorshipTeaser />
      <TrustSection />
      <StudentStories />
      <FaqPreview />
      <FinalCta />
    </>
  );
}
