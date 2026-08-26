import * as React from "react";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ALL_PRODUCTS,
  getProductBySlug,
  getRelatedProducts,
  getAdjacentProducts,
} from "@/data/products";
import { constructMetadata } from "@/lib/metadata";
import { ProductHero } from "@/components/products/product-hero";
import { ProductOverview } from "@/components/products/product-overview";
import { ProductFeatures } from "@/components/products/product-features";
import { ProductApplications } from "@/components/products/product-applications";
import { ProductSpecifications } from "@/components/products/product-specifications";
import { ProductGallery } from "@/components/products/product-gallery";
import { RelatedProducts } from "@/components/products/related-products";
import { ProductNavigation } from "@/components/products/product-navigation";
import { ProductCta } from "@/components/products/product-cta";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ALL_PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return constructMetadata({
      title: "Equipment Not Found | Sai Pooja Fabrication",
      description: "The requested agricultural implement could not be found.",
    });
  }

  return constructMetadata({
    title: `${product.name} | Sai Pooja Fabrication`,
    description: product.description,
    image: product.heroImage,
  });
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product);
  const { prev, next } = getAdjacentProducts(product.slug);

  // Structured Data Schema for Search Engines
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.heroImage,
    category: product.categoryName,
    brand: {
      "@type": "Brand",
      name: "Sai Pooja Fabrication",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Sai Pooja Fabrication",
    },
  };

  return (
    <>
      {/* Search Engine Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Cinematic Detail Hero — Forest 900 / Charcoal */}
      <ProductHero product={product} />

      {/* 2. Engineering Overview — Warm White */}
      <ProductOverview product={product} />

      {/* 3. Key Features — Forest 900 */}
      <ProductFeatures product={product} />

      {/* 4. Practical Field Applications — Warm White */}
      <ProductApplications product={product} />

      {/* 5. Industrial Specifications Matrix — Charcoal */}
      <ProductSpecifications product={product} />

      {/* 6. Interactive Visual Gallery & Lightbox — Soft White */}
      <ProductGallery product={product} />

      {/* 7. Related Equipment — Forest 900 */}
      <RelatedProducts relatedProducts={relatedProducts} />

      {/* 8. Previous / Next Implement Navigation — Charcoal */}
      <ProductNavigation prevProduct={prev} nextProduct={next} />

      {/* 9. Direct Factory Inquiry CTA — Forest 900 */}
      <ProductCta product={product} />
    </>
  );
}
