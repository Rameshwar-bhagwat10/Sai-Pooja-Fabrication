"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FadeUp } from "@/components/animations/fade-up";
import { ImageReveal } from "@/components/animations/image-reveal";

export function FeaturedGallery() {
  return (
    <Section surface="charcoal" spacing="default" hasGridPattern isDarkSurface>
      <Container size="default">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Spotlight Showcase"
          title="FEATURED MACHINERY IN ACTION."
          description="High-strength structural fabrication tested across demanding black cotton soil terrain."
          isDarkSurface
        />

        {/* Highlight Showcase Grid */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Main Large Visual (8 cols) */}
          <div className="lg:col-span-8">
            <ImageReveal>
              <div className="relative w-full aspect-[16/10] rounded-[20px] overflow-hidden bg-[#090C0A] border border-white/10 shadow-2xl">
                <Image
                  src="/images/hero/hero-machinery.svg"
                  alt="Featured Tractor Mounted Agricultural Implements"
                  fill
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090C0A]/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-[#D8D9D3] px-4 py-2.5 bg-black/75 backdrop-blur-sm rounded-[10px]">
                  <span className="text-[#C8913D] font-bold">DEEP TILLAGE & PULVERIZATION</span>
                  <span>CAT-II CALIBRATED</span>
                </div>
              </div>
            </ImageReveal>
          </div>

          {/* Feature Narrative & Action (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-start gap-6">
            <FadeUp>
              <div className="p-6 sm:p-8 rounded-[16px] bg-[#10271D]/90 border border-white/10 flex flex-col gap-4">
                <span className="text-micro font-mono text-[#C8913D] uppercase tracking-wider block font-bold">
                  RIGOROUS FIELD VALIDATION
                </span>
                <h3 className="font-display text-2xl font-bold text-[#F4F1E8] tracking-tight">
                  Zero Compromise on Steel Strength
                </h3>
                <p className="text-small text-[#D8D9D3] leading-relaxed font-sans">
                  Every plough turnover cylinder, rotary tiller flange, and cultivator tine clamp is
                  tested under sustained horsepower drawbar pull to guarantee structural resilience.
                </p>
                <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                  <Link href="/products">
                    <Button variant="amber" size="default" showArrow className="w-full justify-between">
                      <span>VIEW CATALOGUE</span>
                    </Button>
                  </Link>
                  <Link href="/fabrication">
                    <Button variant="outline-light" size="default" className="w-full justify-between">
                      <span>EXPLORE FABRICATION</span>
                      <ArrowUpRight className="w-4 h-4 text-[#C8913D]" />
                    </Button>
                  </Link>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </Container>
    </Section>
  );
}
