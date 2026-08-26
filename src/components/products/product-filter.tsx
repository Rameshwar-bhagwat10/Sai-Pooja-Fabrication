"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { CATEGORY_GROUPS } from "@/data/navigation";
import { type ProductCategoryGroup } from "@/types/product";

export interface ProductFilterProps {
  activeCategory: ProductCategoryGroup;
  onSelectCategory: (category: ProductCategoryGroup) => void;
  productCount: number;
}

export function ProductFilter({
  activeCategory,
  onSelectCategory,
  productCount,
}: ProductFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryClick = (category: ProductCategoryGroup) => {
    onSelectCategory(category);
    const params = new URLSearchParams(searchParams.toString());
    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    const query = params.toString();
    router.replace(query ? `/products?${query}` : "/products", { scroll: false });
  };

  const getCountLabel = () => {
    const formattedCount = String(productCount).padStart(2, "0");
    if (activeCategory === "all") {
      return `${formattedCount} EQUIPMENT TOTAL`;
    }
    const cat = CATEGORY_GROUPS.find((c) => c.id === activeCategory);
    return `${formattedCount} ${cat ? cat.label : "EQUIPMENT"}`;
  };

  return (
    <div className="sticky top-[60px] lg:top-[68px] z-30 w-full bg-[#10271D]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-md transition-all">
      <Container size="default">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Horizontal Scrollable Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {CATEGORY_GROUPS.map((item) => {
              const isActive = activeCategory === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleCategoryClick(item.id as ProductCategoryGroup)}
                  className={cn(
                    "relative px-4 py-2 rounded-[8px] text-xs font-mono tracking-wider uppercase transition-all duration-200 shrink-0 select-none focus-ring",
                    isActive
                      ? "bg-[#173B2C] text-[#F4F1E8] font-bold border border-[#C8913D]/50 shadow-sm"
                      : "text-[#D8D9D3]/70 hover:text-white hover:bg-white/5 border border-transparent"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#C8913D] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Dynamic Product Count Indicator */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#D8D9D3]/80 shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#C8913D] animate-pulse" />
            <span className="tracking-widest font-semibold">{getCountLabel()}</span>
          </div>
        </div>
      </Container>
    </div>
  );
}
