import { constructMetadata } from "@/lib/metadata";
import { seoKeywordMap } from "@/config/seo";
import { OrganizationSchema, LocalBusinessSchema } from "@/components/seo/structured-data";
import { Hero } from "@/components/hero/hero";
import { CompanyIntro } from "@/components/sections/company-intro";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { FeaturedProduct } from "@/components/sections/featured-product";
import { WhyUs } from "@/components/sections/why-us";
import { FabricationPreview } from "@/components/sections/fabrication-preview";
import { FieldShowcase } from "@/components/sections/field-showcase";
import { GalleryPreview } from "@/components/sections/gallery-preview";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata = constructMetadata({
  title: seoKeywordMap.home.title,
  description: seoKeywordMap.home.description,
  canonical: "/",
  keywords: seoKeywordMap.home.keywords,
});

export default function HomePage() {
  return (
    <>
      {/* Search Engine Structured Data */}
      <OrganizationSchema />
      <LocalBusinessSchema />

      {/* 1. Hero — Dark / High-Contrast Image */}
      <Hero />

      {/* 2. Company Introduction — Warm White */}
      <CompanyIntro />

      {/* 3. Product Categories — Forest 900 */}
      <FeaturedProducts />

      {/* 4. Featured Product Spotlight — Dark / Image */}
      <FeaturedProduct />

      {/* 5. Why Sai Pooja — Warm White */}
      <WhyUs />

      {/* 6. Fabrication Preview — Forest 800 / Charcoal */}
      <FabricationPreview />

      {/* 7. Field Visual — Full-Width Parallax Image */}
      <FieldShowcase />

      {/* 8. Gallery Preview — Soft White */}
      <GalleryPreview />

      {/* 9. Final Conversion CTA — Forest 900 */}
      <FinalCta />
    </>
  );
}
