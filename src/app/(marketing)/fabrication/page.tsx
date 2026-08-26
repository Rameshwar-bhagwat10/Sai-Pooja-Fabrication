import { constructMetadata } from "@/lib/metadata";
import { seoKeywordMap } from "@/config/seo";
import { BreadcrumbsJsonLd } from "@/components/seo/structured-data";
import { FabricationHero } from "@/components/fabrication/fabrication-hero";
import { FabricationOverview } from "@/components/fabrication/fabrication-overview";
import { CapabilityIndex } from "@/components/fabrication/capability-index";
import { ProcessTimeline } from "@/components/fabrication/process-timeline";
import { WorkshopShowcase } from "@/components/fabrication/workshop-showcase";
import { CustomFabrication } from "@/components/fabrication/custom-fabrication";
import { VisualProof } from "@/components/fabrication/visual-proof";
import { RelatedEquipment } from "@/components/fabrication/related-equipment";
import { FabricationCta } from "@/components/fabrication/fabrication-cta";

export const metadata = constructMetadata({
  title: seoKeywordMap.fabrication.title,
  description: seoKeywordMap.fabrication.description,
  canonical: "/fabrication",
  keywords: seoKeywordMap.fabrication.keywords,
});

export default function FabricationPage() {
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Fabrication Capabilities", url: "/fabrication" },
  ];

  return (
    <>
      <BreadcrumbsJsonLd items={breadcrumbItems} />

      {/* 1. Fabrication Hero */}
      <FabricationHero />

      {/* 2. Fabrication Overview */}
      <FabricationOverview />

      {/* 3. Interactive Capability Index */}
      <CapabilityIndex />

      {/* 4. 5-Stage Fabrication Process Timeline */}
      <ProcessTimeline />

      {/* 5. Workshop Infrastructure & Plant Tooling */}
      <WorkshopShowcase />

      {/* 6. Custom Fabrication Section */}
      <CustomFabrication />

      {/* 7. Visual Proof: Workshop -> Machine -> Field */}
      <VisualProof />

      {/* 8. Manufactured Equipment Showcase */}
      <RelatedEquipment />

      {/* 9. Final Fabrication Consultation CTA */}
      <FabricationCta />
    </>
  );
}
