"use client";

import * as React from "react";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FadeUp } from "@/components/animations/fade-up";
import { TextReveal } from "@/components/animations/text-reveal";
import { type ProductItem } from "@/types/product";
import { COMPANY_INFO } from "@/data/company";

export interface ProductCtaProps {
  product: ProductItem;
}

export function ProductCta({ product }: ProductCtaProps) {
  const whatsappMessage = encodeURIComponent(
    `Hello Sai Pooja Fabrication, I would like to inquire about specifications and pricing for ${product.name} (Tractor HP: ${product.suitableForTractorHp || "Standard"}).`
  );

  return (
    <Section surface="forest-900" spacing="cinematic" hasGridPattern isDarkSurface>
      <Container size="narrow">
        <div className="text-center flex flex-col items-center">
          <FadeUp>
            <span className="text-micro font-mono text-[#C8913D] tracking-[0.25em] uppercase mb-4 block">
              DIRECT FACTORY INQUIRY
            </span>
          </FadeUp>

          <TextReveal delay={0.1}>
            <h2 className="text-display font-display text-[#F4F1E8] tracking-tight max-w-3xl mb-6">
              INTERESTED IN THE {product.name.toUpperCase()}?
            </h2>
          </TextReveal>

          <FadeUp delay={0.2}>
            <p className="text-body-lg text-[#D8D9D3] max-w-xl mb-10 leading-relaxed font-sans">
              Talk directly with our fabrication engineers regarding horsepower matching, custom hitch options,
              or delivery timelines for your farm.
            </p>
          </FadeUp>

          <FadeUp delay={0.3} className="flex flex-wrap items-center justify-center gap-4">
            <Link href={`/contact?product=${encodeURIComponent(product.name)}`}>
              <Button variant="amber" size="lg" showArrow>
                REQUEST EQUIPMENT QUOTE
              </Button>
            </Link>

            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline-light" size="lg">
                <MessageSquare className="w-4 h-4 mr-2 text-[#2F6B45]" />
                <span>CHAT ON WHATSAPP</span>
              </Button>
            </a>
          </FadeUp>

          <FadeUp delay={0.4} className="mt-8 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-[#D8D9D3]/60">
            <span>DIRECT WORKSHOP PRICING</span>
            <span>•</span>
            <span>CUSTOM FABRICATION OPTIONS</span>
            <span>•</span>
            <span>ALL INDIA DELIVERY</span>
          </FadeUp>
        </div>
      </Container>
    </Section>
  );
}
