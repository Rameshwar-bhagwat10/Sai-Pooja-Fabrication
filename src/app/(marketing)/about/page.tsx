import { constructMetadata } from "@/lib/metadata";
import { seoKeywordMap } from "@/config/seo";
import { BreadcrumbsJsonLd } from "@/components/seo/structured-data";
import { AboutHero } from "@/components/about/about-hero";
import { WhoWeAre } from "@/components/about/who-we-are";
import { CompanyStory } from "@/components/about/company-story";
import { AgricultureEngineering } from "@/components/about/agriculture-engineering";
import { WhatWeBuild } from "@/components/about/what-we-build";
import { OurApproach } from "@/components/about/our-approach";
import { AboutVisualStory } from "@/components/about/about-visual-story";
import { FabricationPreview } from "@/components/sections/fabrication-preview";
import { AboutCta } from "@/components/about/about-cta";

import { getAllCompanyApproachPillars, getSiteSettings } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata = constructMetadata({
  title: seoKeywordMap.about.title,
  description: seoKeywordMap.about.description,
  canonical: "/about",
  keywords: seoKeywordMap.about.keywords,
});

export default async function AboutPage() {
  const [pillars, settings] = await Promise.all([
    getAllCompanyApproachPillars(),
    getSiteSettings(),
  ]);

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about" },
  ];

  return (
    <>
      <BreadcrumbsJsonLd items={breadcrumbItems} />

      {/* 1. About Hero */}
      <AboutHero />

      {/* 2. Who We Are */}
      <WhoWeAre company={settings.company} />

      {/* 3. Company Story */}
      <CompanyStory />

      {/* 4. Agriculture + Engineering Split Statement */}
      <AgricultureEngineering />

      {/* 5. What We Build */}
      <WhatWeBuild />

      {/* 6. Our Manufacturing Approach */}
      <OurApproach initialPillars={pillars} />

      {/* 7. Visual Story: Workshop -> Machine -> Field */}
      <AboutVisualStory />

      {/* 8. Capability Preview */}
      <FabricationPreview />

      {/* 9. Final About CTA */}
      <AboutCta />
    </>
  );
}
