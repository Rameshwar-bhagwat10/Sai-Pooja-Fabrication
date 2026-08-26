import { constructMetadata } from "@/lib/metadata";
import { seoKeywordMap } from "@/config/seo";
import { BreadcrumbsJsonLd } from "@/components/seo/structured-data";
import { GalleryHero } from "@/components/gallery/gallery-hero";
import { GalleryView } from "@/components/gallery/gallery-view";
import { FeaturedGallery } from "@/components/gallery/featured-gallery";
import { GalleryCta } from "@/components/gallery/gallery-cta";

export const metadata = constructMetadata({
  title: seoKeywordMap.gallery.title,
  description: seoKeywordMap.gallery.description,
  canonical: "/gallery",
  keywords: seoKeywordMap.gallery.keywords,
});

export default function GalleryPage() {
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Gallery", url: "/gallery" },
  ];

  return (
    <>
      <BreadcrumbsJsonLd items={breadcrumbItems} />

      {/* 1. Gallery Hero */}
      <GalleryHero />

      {/* 2. Interactive Category Filter, Dynamic Editorial Grid & Lightbox */}
      <GalleryView />

      {/* 3. Featured Showcase */}
      <FeaturedGallery />

      {/* 4. Final Gallery Conversion CTA */}
      <GalleryCta />
    </>
  );
}
