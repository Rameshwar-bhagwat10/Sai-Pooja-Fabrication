"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/animations/stagger";
import { type ProductItem } from "@/types/product";

export interface ProductFeaturesProps {
  product: ProductItem;
}

export function ProductFeatures({ product }: ProductFeaturesProps) {
  if (!product.features || product.features.length === 0) return null;

  return (
    <Section surface="forest-900" spacing="default" hasGridPattern isDarkSurface>
      <Container size="default">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Key Engineering Features"
          title="BUILT FOR DEMANDING FIELD PERFORMANCE."
          description="Precision manufacturing features designed to maximize field efficiency, minimize draft resistance, and guarantee structural integrity."
          isDarkSurface
        />

        {/* Editorial Numbered Features List */}
        <Stagger className="mt-14 flex flex-col divide-y divide-white/10">
          {product.features.map((feature) => (
            <StaggerItem key={feature.number} className="group py-8 sm:py-10 transition-colors">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline">
                {/* Number & Tag (3 cols) */}
                <div className="md:col-span-3 flex items-baseline gap-4">
                  <span className="font-display text-4xl sm:text-5xl font-bold text-white/20 group-hover:text-[#C8913D] transition-colors duration-300">
                    {feature.number}
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-[#C8913D] font-semibold uppercase">
                    FEATURE // {feature.number}
                  </span>
                </div>

                {/* Title & Description (9 cols) */}
                <div className="md:col-span-9 flex flex-col gap-2.5">
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F4F1E8] tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-body text-[#D8D9D3] leading-relaxed max-w-3xl font-sans">
                    {feature.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
