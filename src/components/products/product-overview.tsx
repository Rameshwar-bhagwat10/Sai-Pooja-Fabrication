"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ImageWrapper } from "@/components/ui/image-wrapper";
import { FadeUp } from "@/components/animations/fade-up";
import { ImageReveal } from "@/components/animations/image-reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { type ProductItem } from "@/types/product";

export interface ProductOverviewProps {
  product: ProductItem;
}

export function ProductOverview({ product }: ProductOverviewProps) {
  return (
    <Section surface="warm-white" spacing="default">
      <Container size="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Overview Narrative (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <FadeUp>
              <Eyebrow variant="forest" className="mb-4">
                ENGINEERING OVERVIEW
              </Eyebrow>
            </FadeUp>

            <TextReveal delay={0.1}>
              <h2 className="text-h1 font-display tracking-tight text-[#151A17] mb-6">
                ABOUT THE {product.name.toUpperCase()}
              </h2>
            </TextReveal>

            <FadeUp delay={0.2}>
              <p className="text-body-lg text-[#151A17] leading-relaxed mb-6 font-medium">
                {product.description}
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <p className="text-body text-[#6E746F] leading-relaxed mb-8">
                {product.fullDescription}
              </p>
            </FadeUp>

            {/* Quick Metrics Bar */}
            <FadeUp delay={0.4} className="w-full">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-black/10">
                <div>
                  <span className="text-micro font-mono text-[#6E746F] uppercase block">
                    CATEGORY
                  </span>
                  <span className="text-small font-bold text-[#151A17]">
                    {product.categoryName}
                  </span>
                </div>
                {product.suitableForTractorHp && (
                  <div>
                    <span className="text-micro font-mono text-[#6E746F] uppercase block">
                      TRACTOR HP
                    </span>
                    <span className="text-small font-bold text-[#151A17]">
                      {product.suitableForTractorHp}
                    </span>
                  </div>
                )}
                <div>
                  <span className="text-micro font-mono text-[#6E746F] uppercase block">
                    FABRICATION
                  </span>
                  <span className="text-small font-bold text-[#2F6B45]">
                    HIGH-TENSILE STEEL
                  </span>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Right Column: Workshop Image (5 cols) */}
          <div className="lg:col-span-5">
            <ImageReveal delay={0.2}>
              <ImageWrapper
                src="/images/workshop/steel-fabrication.svg"
                alt={`${product.name} Workshop Fabrication`}
                aspectRatio="4/3"
                overlay="dark-subtle"
                technicalLabel="STRUCTURAL FABRICATION"
                caption={`Precision frame welding and assembly of ${product.name}`}
              />
            </ImageReveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
