import * as React from "react";
import { constructMetadata } from "@/lib/metadata";
import { seoKeywordMap } from "@/config/seo";
import { ALL_PRODUCTS } from "@/data/products";
import { CollectionPageJsonLd } from "@/components/seo/structured-data";
import { ProductsHero } from "@/components/products/products-hero";
import { ProductsCatalogueView } from "@/components/products/products-catalogue-view";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata = constructMetadata({
  title: seoKeywordMap.products.title,
  description: seoKeywordMap.products.description,
  canonical: "/products",
  keywords: seoKeywordMap.products.keywords,
});

export default function ProductsPage() {
  const collectionItems = ALL_PRODUCTS.map((prod) => ({
    name: prod.name,
    url: `/products/${prod.slug}`,
  }));

  return (
    <>
      {/* Search Engine Structured Data */}
      <CollectionPageJsonLd
        name="Agricultural Implements & Machinery"
        description={seoKeywordMap.products.description}
        items={collectionItems}
      />

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
