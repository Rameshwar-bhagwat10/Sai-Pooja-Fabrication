"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { Stagger, StaggerItem } from "@/components/animations/stagger";
import { getFeaturedProducts } from "@/data/products";

export function FeaturedProducts() {
  const featuredProducts = getFeaturedProducts();

  return (
    <Section surface="forest-900" spacing="default" hasGridPattern isDarkSurface>
      <Container size="default">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <SectionHeading
            eyebrow="Agricultural Implements"
            title="EQUIPMENT FOR THE FIELD."
            description="High-durability agricultural implements engineered for severe soil conditions and optimal tractor horsepower transfer."
            isDarkSurface
          />

          <div className="shrink-0">
            <Link href="/products">
              <Button variant="amber" showArrow>
                VIEW FULL CATALOG
              </Button>
            </Link>
          </div>
        </div>

        {/* Staggered Product Cards Grid */}
        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 4).map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard {...product} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
