"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { FadeUp } from "@/components/animations/fade-up";
import { type ProductItem } from "@/types/product";

export interface ProductSpecificationsProps {
  product: ProductItem;
}

export function ProductSpecifications({ product }: ProductSpecificationsProps) {
  if (!product.specifications || product.specifications.length === 0) return null;

  return (
    <Section surface="charcoal" spacing="default" hasGridPattern isDarkSurface>
      <Container size="default">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Build Specifications"
          title="MANUFACTURING MATRIX."
          description={`Verified technical tolerances and structural specifications for ${product.name}.`}
          isDarkSurface
        />

        {/* Specifications Matrix Grid */}
        <FadeUp delay={0.2} className="mt-14 max-w-4xl mx-auto">
          <div className="rounded-[16px] bg-[#10271D]/60 border border-white/10 overflow-hidden shadow-2xl">
            {/* Header Stamp */}
            <div className="px-6 py-4 bg-white/5 border-b border-white/10 flex items-center justify-between text-xs font-mono text-[#D8D9D3]">
              <span className="text-[#C8913D] font-bold tracking-wider">
                SAI POOJA FABRICATION // BUILD SHEET
              </span>
              <span>CAT-II STANDARD</span>
            </div>

            {/* Spec Rows */}
            <div className="divide-y divide-white/5 font-mono text-sm">
              {product.specifications.map((spec, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-12 px-6 py-4 hover:bg-white/5 transition-colors gap-2 items-center"
                >
                  <span className="md:col-span-5 text-xs text-[#D8D9D3]/70 uppercase tracking-wider font-semibold">
                    {spec.label}
                  </span>
                  <span className="md:col-span-7 text-[#F4F1E8] font-bold text-sm">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </Container>
    </Section>
  );
}
