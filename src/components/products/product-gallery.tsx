"use client";

import * as React from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { ProductLightbox } from "./product-lightbox";
import { type ProductItem } from "@/types/product";

export interface ProductGalleryProps {
  product: ProductItem;
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const images = product.galleryImages && product.galleryImages.length > 0
    ? product.galleryImages
    : [product.heroImage];

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = React.useState(false);

  return (
    <Section surface="soft-white" spacing="default">
      <Container size="default">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Visual Portfolio"
          title="EQUIPMENT GALLERY."
          description={`High-resolution imagery of ${product.name} components, structural welds, and field setup.`}
        />

        {/* Gallery Interface */}
        <div className="mt-12 max-w-4xl mx-auto flex flex-col gap-4">
          {/* Main Large Active Image Frame */}
          <div
            onClick={() => setIsLightboxOpen(true)}
            className="group relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-[16px] overflow-hidden bg-[#151A17] border border-black/10 shadow-lg cursor-pointer select-none"
          >
            <Image
              src={images[currentIndex]}
              alt={`${product.name} Active View`}
              fill
              sizes="(max-width: 1024px) 100vw, 80vw"
              className="object-cover object-center group-hover:scale-103 transition-transform duration-500"
            />

            {/* Click to expand overlay trigger */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="px-4 py-2 rounded-full bg-black/75 backdrop-blur-sm text-xs font-mono text-white flex items-center gap-2 border border-white/20">
                <Maximize2 className="w-3.5 h-3.5 text-[#C8913D]" />
                <span>CLICK TO EXPAND FULLSCREEN</span>
              </span>
            </div>

            {/* Bottom Caption Stamp */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-[#D8D9D3] px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-[8px]">
              <span className="text-[#C8913D] font-bold uppercase">{product.name}</span>
              <span>
                VIEW {String(currentIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex items-center justify-center gap-4 overflow-x-auto py-2">
              {images.map((img, idx) => {
                const isSelected = idx === currentIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Show ${product.name} Image ${idx + 1}`}
                    className={`relative w-24 h-16 rounded-[10px] overflow-hidden border-2 transition-all shrink-0 focus-ring ${
                      isSelected
                        ? "border-[#C8913D] shadow-md scale-105"
                        : "border-black/10 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      sizes="96px"
                      className="object-cover object-center"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Fullscreen Lightbox */}
        <ProductLightbox
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          images={images}
          currentIndex={currentIndex}
          onSelectIndex={setCurrentIndex}
          productName={product.name}
        />
      </Container>
    </Section>
  );
}
