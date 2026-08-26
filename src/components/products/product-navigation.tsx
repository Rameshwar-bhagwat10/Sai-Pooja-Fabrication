"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { type ProductItem } from "@/types/product";

export interface ProductNavigationProps {
  prevProduct: ProductItem | null;
  nextProduct: ProductItem | null;
}

export function ProductNavigation({
  prevProduct,
  nextProduct,
}: ProductNavigationProps) {
  if (!prevProduct && !nextProduct) return null;

  return (
    <div className="w-full bg-[#151A17] border-t border-b border-white/10 py-8 text-[#F4F1E8]">
      <Container size="default">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Previous Product Link */}
          {prevProduct ? (
            <Link
              href={`/products/${prevProduct.slug}`}
              className="group flex flex-col items-start p-6 rounded-[12px] bg-white/5 border border-white/10 hover:border-[#C8913D]/50 hover:bg-white/[0.08] transition-all"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-[#C8913D] mb-1.5 font-bold uppercase tracking-wider">
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                <span>PREVIOUS IMPLEMENT</span>
              </div>
              <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#F4F1E8] group-hover:text-[#C8913D] transition-colors">
                {prevProduct.name}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {/* Next Product Link */}
          {nextProduct ? (
            <Link
              href={`/products/${nextProduct.slug}`}
              className="group flex flex-col items-end text-right p-6 rounded-[12px] bg-white/5 border border-white/10 hover:border-[#C8913D]/50 hover:bg-white/[0.08] transition-all"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-[#C8913D] mb-1.5 font-bold uppercase tracking-wider">
                <span>NEXT IMPLEMENT</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
              <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#F4F1E8] group-hover:text-[#C8913D] transition-colors">
                {nextProduct.name}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </Container>
    </div>
  );
}
