"use client";

import * as React from "react";
import { type GalleryCategory, type GalleryItem } from "@/types/gallery";
import { GALLERY_ITEMS } from "@/data/gallery";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { GalleryFilter } from "./gallery-filter";
import { GalleryGrid } from "./gallery-grid";
import { GalleryLightbox } from "./gallery-lightbox";

interface GalleryViewProps {
  initialItems?: GalleryItem[];
}

export function GalleryView({ initialItems }: GalleryViewProps = {}) {
  const [activeCategory, setActiveCategory] = React.useState<GalleryCategory>("all");
  const [lightboxItem, setLightboxItem] = React.useState<GalleryItem | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = React.useState(false);

  const baseItems = initialItems && initialItems.length > 0 ? initialItems : GALLERY_ITEMS;

  const filteredItems = React.useMemo(() => {
    if (activeCategory === "all") return baseItems;
    return baseItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, baseItems]);

  const handleOpenLightbox = (item: GalleryItem) => {
    setLightboxItem(item);
    setIsLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
    setLightboxItem(null);
  };

  return (
    <Section surface="warm-white" spacing="default">
      <Container size="default">
        {/* Category Filter Bar */}
        <GalleryFilter
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          items={baseItems}
        />

        {/* Dynamic Image Grid */}
        <div className="mt-10">
          <GalleryGrid
            items={filteredItems}
            onOpenLightbox={handleOpenLightbox}
          />
        </div>

        {/* Accessible Lightbox Modal */}
        <GalleryLightbox
          isOpen={isLightboxOpen}
          currentItem={lightboxItem}
          items={filteredItems}
          onClose={handleCloseLightbox}
          onNavigate={(newItem) => setLightboxItem(newItem)}
        />
      </Container>
    </Section>
  );
}
