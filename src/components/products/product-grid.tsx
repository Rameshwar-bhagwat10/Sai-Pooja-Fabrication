"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type ProductItem } from "@/types/product";
import { ProductCard } from "./product-card";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export interface ProductGridProps {
  products: ProductItem[];
  onResetFilter?: () => void;
}

export function ProductGrid({ products, onResetFilter }: ProductGridProps) {
  const prefersReduced = useReducedMotion();

  if (products.length === 0) {
    return (
      <div className="w-full py-24 text-center flex flex-col items-center justify-center rounded-[16px] bg-white border border-black/10 p-8">
        <span className="text-xs font-mono tracking-widest text-[#C8913D] uppercase mb-2">
          CATALOGUE FILTER
        </span>
        <h3 className="text-2xl font-display font-bold text-[#151A17] mb-4">
          NO EQUIPMENT FOUND
        </h3>
        <p className="text-body text-[#6E746F] max-w-md mb-8">
          There are currently no products under this specific category filter.
        </p>
        {onResetFilter && (
          <Button variant="primary" onClick={onResetFilter}>
            VIEW ALL EQUIPMENT
          </Button>
        )}
      </div>
    );
  }

  return (
    <motion.div
      layout={!prefersReduced}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      <AnimatePresence mode="popLayout">
        {products.map((product) => (
          <motion.div
            key={product.id}
            layout={!prefersReduced}
            initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: prefersReduced ? 1 : 0.96 }}
            transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <ProductCard {...product} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
