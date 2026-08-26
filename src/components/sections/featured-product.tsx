"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImageWrapper } from "@/components/ui/image-wrapper";
import { FadeUp } from "@/components/animations/fade-up";
import { ImageReveal } from "@/components/animations/image-reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { ALL_PRODUCTS } from "@/data/products";

export function FeaturedProduct() {
  const featured = ALL_PRODUCTS.find((p) => p.slug === "heavy-duty-rotavator") || ALL_PRODUCTS[0];

  return (
    <Section surface="charcoal" spacing="cinematic" hasGridPattern isDarkSurface>
      <Container size="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Machinery Visual with Parallax / Scale (7 cols) */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <ImageReveal>
              <ImageWrapper
                src={featured.heroImage}
                alt={featured.name}
                aspectRatio="16/9"
                overlay="gradient-forest"
                technicalLabel="SPOTLIGHT // MULTI-SPEED GEAR"
                caption="Multi-Speed Heavy Duty Gear Drive Rotary Tiller"
              />
            </ImageReveal>
          </div>

          {/* Right Column: Engineering Highlights & Specs (5 cols) */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col items-start">
            <FadeUp>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="amber" dot>
                  FEATURED MACHINERY
                </Badge>
                <span className="text-xs font-mono text-[#D8D9D3]">
                  {featured.suitableForTractorHp}
                </span>
              </div>
            </FadeUp>

            <TextReveal delay={0.1}>
              <h2 className="text-h2 font-display text-[#F4F1E8] tracking-tight mb-4">
                {featured.name}
              </h2>
            </TextReveal>

            <FadeUp delay={0.2}>
              <p className="text-body text-[#D8D9D3] leading-relaxed mb-6">
                {featured.description}
              </p>
            </FadeUp>

            {/* Specifications Matrix */}
            <FadeUp delay={0.3} className="w-full mb-8">
              <div className="grid grid-cols-2 gap-3 p-4 rounded-[12px] bg-white/5 border border-white/10 text-xs font-mono">
                {featured.specifications.slice(0, 4).map((spec, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-[#6E746F]">{spec.label}</span>
                    <span className="text-[#F4F1E8] font-semibold mt-0.5">{spec.value}</span>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.4}>
              <Link href={`/products/${featured.slug}`}>
                <Button variant="amber" size="lg" showArrow>
                  VIEW PRODUCT SPECIFICATIONS
                </Button>
              </Link>
            </FadeUp>
          </div>
        </div>
      </Container>
    </Section>
  );
}
