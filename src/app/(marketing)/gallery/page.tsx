import { constructMetadata } from "@/lib/metadata";
import { GalleryHero } from "@/components/gallery/gallery-hero";
import { GalleryView } from "@/components/gallery/gallery-view";
import { FeaturedGallery } from "@/components/gallery/featured-gallery";
import { GalleryCta } from "@/components/gallery/gallery-cta";

export const metadata = constructMetadata({
  title: "Visual Gallery & Machinery Portfolio | Sai Pooja Fabrication",
  description:
    "Explore authentic photography of manufactured agricultural implements, heavy structural steel fabrication, workshop assembly fixtures, and active field operations by Sai Pooja Fabrication.",
});

export default function GalleryPage() {
  return (
    <>
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
