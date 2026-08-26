"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { Stagger, StaggerItem } from "@/components/animations/stagger";
import { getFeaturedProducts } from "@/data/products";

export function RelatedEquipment() {
  const products = getFeaturedProducts().slice(0, 3);

  return (
    <Section surface="warm-white" spacing="default">
      <Container size="default">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <SectionHeading
            eyebrow="Manufactured Equipment"
            title="FEATURED FABRICATED IMPLEMENTS."
            description="Explore our primary line of agricultural machinery manufactured with precision structural fabrication."
          />

          <div className="shrink-0">
            <Link href="/products">
              <Button variant="amber" showArrow>
                VIEW FULL CATALOGUE
              </Button>
            </Link>
          </div>
        </div>

        {/* 3-Column Product Grid */}
        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard {...product} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
