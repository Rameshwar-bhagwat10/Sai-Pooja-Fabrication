import * as React from "react";
import { constructMetadata } from "@/lib/metadata";
import { ALL_PRODUCTS } from "@/data/products";
import { ProductsHero } from "@/components/products/products-hero";
import { ProductsCatalogueView } from "@/components/products/products-catalogue-view";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata = constructMetadata({
  title: "Agricultural Equipment & Machinery | Sai Pooja Fabrication",
  description:
    "Explore our complete range of tractor-mounted agricultural implements: Hydraulic Reversible Ploughs, Rotary Tillers, Cultivators, Disc Harrows, Seed Drills, Farm Trailers, and Custom Implements.",
});

export default function ProductsPage() {
  return (
    <>
      {/* 1. Products Hero */}
      <ProductsHero />

      {/* 2. Interactive Category Filter & Animated Grid */}
      <React.Suspense fallback={<div className="min-h-[400px] bg-[#FAFAF7]" />}>
        <ProductsCatalogueView initialProducts={ALL_PRODUCTS} />
      </React.Suspense>

      {/* 3. Bottom Conversion CTA */}
      <FinalCta />
    </>
  );
}
