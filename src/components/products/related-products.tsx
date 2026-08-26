"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { ProductCard } from "./product-card";
import { Stagger, StaggerItem } from "@/components/animations/stagger";
import { type ProductItem } from "@/types/product";

export interface RelatedProductsProps {
  relatedProducts: ProductItem[];
}

export function RelatedProducts({ relatedProducts }: RelatedProductsProps) {
  if (!relatedProducts || relatedProducts.length === 0) return null;

  return (
    <Section surface="forest-900" spacing="default" hasGridPattern isDarkSurface>
      <Container size="default">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Complementary Equipment"
          title="RELATED MACHINERY."
          description="Explore complementary agricultural implements designed for seamless crop rotation and soil preparation."
          isDarkSurface
        />

        {/* 3-Column Related Products Grid */}
        <Stagger className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedProducts.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard {...product} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
