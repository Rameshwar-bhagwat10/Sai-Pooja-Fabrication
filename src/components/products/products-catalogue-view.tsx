"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ProductFilter } from "./product-filter";
import { ProductGrid } from "./product-grid";
import { type ProductItem, type ProductCategoryGroup } from "@/types/product";
import { CATEGORY_GROUPS } from "@/data/navigation";

export interface ProductsCatalogueViewProps {
  initialProducts: ProductItem[];
}

export function ProductsCatalogueView({
  initialProducts,
}: ProductsCatalogueViewProps) {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category") as ProductCategoryGroup | null;

  const validUrlCategory: ProductCategoryGroup =
    urlCategory && CATEGORY_GROUPS.some((c) => c.id === urlCategory)
      ? urlCategory
      : "all";

  const [selectedCategory, setSelectedCategory] =
    React.useState<ProductCategoryGroup | null>(null);

  // If user interacted locally, prioritize selectedCategory; otherwise use URL param
  const activeCategory = selectedCategory !== null ? selectedCategory : validUrlCategory;

  const filteredProducts = React.useMemo(() => {
    if (activeCategory === "all") return initialProducts;
    return initialProducts.filter(
      (product) => product.categoryGroup === activeCategory
    );
  }, [activeCategory, initialProducts]);

  return (
    <>
      <ProductFilter
        activeCategory={activeCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        productCount={filteredProducts.length}
      />

      <Section surface="soft-white" spacing="default">
        <Container size="default">
          <ProductGrid
            products={filteredProducts}
            onResetFilter={() => setSelectedCategory("all")}
          />
        </Container>
      </Section>
    </>
  );
}
