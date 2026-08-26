"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Tractor } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeUp } from "@/components/animations/fade-up";
import { TextReveal } from "@/components/animations/text-reveal";
import { type ProductItem } from "@/types/product";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { COMPANY_INFO } from "@/data/company";

export interface ProductHeroProps {
  product: ProductItem;
}

export function ProductHero({ product }: ProductHeroProps) {
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden bg-[#10271D] text-[#F4F1E8] pt-28 pb-16 md:pt-36 md:pb-24 border-b border-white/10">
      {/* Background Industrial Gradients & Grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#090C0A]/80 via-[#10271D]/90 to-[#10271D] z-0" />
      <div className="absolute inset-0 bg-industrial-grid-dark opacity-30 z-0" />

      <Container size="default" className="relative z-20">
        {/* Breadcrumb Navigation */}
        <FadeUp>
          <nav
            aria-label="Breadcrumbs"
            className="flex items-center gap-2 text-xs font-mono text-[#D8D9D3]/70 mb-8 overflow-x-auto no-scrollbar"
          >
            <Link href="/" className="hover:text-white transition-colors">
              HOME
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#C8913D]" />
            <Link href="/products" className="hover:text-white transition-colors">
              PRODUCTS
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#C8913D]" />
            <span className="text-[#C8913D] font-semibold truncate uppercase">
              {product.name}
            </span>
          </nav>
        </FadeUp>

        {/* 2-Column Detail Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Product Information & Actions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <FadeUp delay={0.1}>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge variant="amber" size="default" dot>
                  {product.categoryName.toUpperCase()}
                </Badge>
                {product.suitableForTractorHp && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-[#D8D9D3]">
                    <Tractor className="w-3.5 h-3.5 text-[#C8913D]" />
                    <span>{product.suitableForTractorHp}</span>
                  </span>
                )}
                {product.warranty && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-[#D8D9D3]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#2F6B45]" />
                    <span>{product.warranty}</span>
                  </span>
                )}
              </div>
            </FadeUp>

            <TextReveal delay={0.2}>
              <h1 className="text-display font-display text-[#F4F1E8] tracking-tight mb-4">
                {product.name.toUpperCase()}
              </h1>
            </TextReveal>

            {product.hindiName && (
              <FadeUp delay={0.25}>
                <span className="text-sm font-sans text-[#C8913D] font-medium mb-4 block">
                  {product.hindiName}
                </span>
              </FadeUp>
            )}

            <FadeUp delay={0.3}>
              <p className="text-body-lg text-[#D8D9D3] leading-relaxed mb-8 max-w-2xl font-sans">
                {product.tagline}
              </p>
            </FadeUp>

            <FadeUp delay={0.4} className="flex flex-wrap items-center gap-4">
              <Link href={`/contact?product=${encodeURIComponent(product.name)}`}>
                <Button variant="amber" size="lg" showArrow>
                  ENQUIRE ABOUT THIS EQUIPMENT
                </Button>
              </Link>
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(
                  `Hello Sai Pooja Fabrication, I am interested in specifications and details for ${product.name}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline-light" size="lg">
                  WHATSAPP INQUIRY
                </Button>
              </a>
            </FadeUp>
          </div>

          {/* Right Column: Hero Machinery Image (5 cols) */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="relative w-full aspect-[4/3] rounded-[16px] overflow-hidden bg-[#151A17] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              <Image
                src={product.heroImage}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090C0A]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-[#D8D9D3]/80 px-2 py-1 bg-black/60 backdrop-blur-sm rounded">
                <span>SPF // HEAVY FABRICATION</span>
                <span className="text-[#C8913D]">CAT-II COMPLIANT</span>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
