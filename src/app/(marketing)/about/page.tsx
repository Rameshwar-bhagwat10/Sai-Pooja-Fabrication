import { constructMetadata } from "@/lib/metadata";
import { AboutHero } from "@/components/about/about-hero";
import { WhoWeAre } from "@/components/about/who-we-are";
import { CompanyStory } from "@/components/about/company-story";
import { AgricultureEngineering } from "@/components/about/agriculture-engineering";
import { WhatWeBuild } from "@/components/about/what-we-build";
import { OurApproach } from "@/components/about/our-approach";
import { AboutVisualStory } from "@/components/about/about-visual-story";
import { FabricationPreview } from "@/components/sections/fabrication-preview";
import { AboutCta } from "@/components/about/about-cta";

export const metadata = constructMetadata({
  title: "About Us | Sai Pooja Fabrication",
  description:
    "Learn about Sai Pooja Fabrication — manufacturing durable agricultural equipment, tractor-mounted implements, and precision structural steel fabrication built for demanding field conditions.",
});

export default function AboutPage() {
  return (
    <>
      {/* 1. About Hero */}
      <AboutHero />

      {/* 2. Who We Are */}
      <WhoWeAre />

      {/* 3. Company Story */}
      <CompanyStory />

      {/* 4. Agriculture + Engineering Split Statement */}
      <AgricultureEngineering />

      {/* 5. What We Build */}
      <WhatWeBuild />

      {/* 6. Our Manufacturing Approach */}
      <OurApproach />

      {/* 7. Visual Story: Workshop -> Machine -> Field */}
      <AboutVisualStory />

      {/* 8. Capability Preview */}
      <FabricationPreview />

      {/* 9. Final About CTA */}
      <AboutCta />
    </>
  );
}
