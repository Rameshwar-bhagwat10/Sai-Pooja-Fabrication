"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/animations/stagger";
import { type ProductItem } from "@/types/product";

export interface ProductApplicationsProps {
  product: ProductItem;
}

export function ProductApplications({ product }: ProductApplicationsProps) {
  if (!product.applications || product.applications.length === 0) return null;

  return (
    <Section surface="warm-white" spacing="default">
      <Container size="default">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Agricultural Applications"
          title="PRACTICAL FIELD USE CASES."
          description={`Tested operations where ${product.name} provides superior tillage results and agronomic benefits.`}
        />

        {/* Application Cards Grid */}
        <Stagger className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {product.applications.map((app, index) => (
            <StaggerItem key={index}>
              <div className="h-full flex flex-col p-8 rounded-[16px] bg-white border border-black/10 shadow-sm hover:border-[#2F6B45]/50 transition-colors">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono tracking-widest text-[#C8913D] font-bold uppercase">
                    USE CASE 0{index + 1}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2F6B45]" />
                </div>

                <h3 className="font-display text-xl font-bold text-[#151A17] mb-3 tracking-tight">
                  {app.title}
                </h3>

                <p className="text-body text-[#6E746F] leading-relaxed font-sans">
                  {app.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
