"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { FadeUp } from "@/components/animations/fade-up";

export function WorkshopShowcase() {
  return (
    <Section surface="charcoal" spacing="default" hasGridPattern isDarkSurface>
      <Container size="default">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Plant & Tooling"
          title="WORKSHOP INFRASTRUCTURE."
          description="Heavy structural steel assembly stations, hydraulic presses, and precision welding fixtures."
          isDarkSurface
        />

        {/* Asymmetrical Workshop Composition */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Large Image (8 cols) */}
          <div className="lg:col-span-8">
            <div className="relative w-full aspect-[16/9] rounded-[16px] overflow-hidden bg-[#10271D] border border-white/10 shadow-2xl">
              <Image
                src="/images/workshop/steel-fabrication.svg"
                alt="Sai Pooja Heavy Fabrication Plant"
                fill
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090C0A]/90 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-[#D8D9D3] px-3 py-2 bg-black/70 backdrop-blur-sm rounded-[8px]">
                <span className="text-[#C8913D] font-bold">STRUCTURAL WELDING STATION</span>
                <span>MIG DUAL-PASS</span>
              </div>
            </div>
          </div>

          {/* Supporting Technical Sidebar (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <FadeUp>
              <div className="p-6 rounded-[14px] bg-[#10271D]/80 border border-white/10">
                <span className="text-micro font-mono text-[#C8913D] uppercase tracking-wider block mb-2 font-bold">
                  TOOLING & FIXTURES
                </span>
                <h4 className="font-display text-lg font-bold text-[#F4F1E8] mb-2">
                  Rigid Alignment Jigs
                </h4>
                <p className="text-small text-[#D8D9D3] leading-relaxed font-sans">
                  Implements are clamped in heavy steel jigs before welding to prevent thermal warping
                  and guarantee true tractor hitch alignment.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="p-6 rounded-[14px] bg-[#10271D]/80 border border-white/10">
                <span className="text-micro font-mono text-[#C8913D] uppercase tracking-wider block mb-2 font-bold">
                  SURFACE PROTECTION
                </span>
                <h4 className="font-display text-lg font-bold text-[#F4F1E8] mb-2">
                  Anti-Corrosion Priming
                </h4>
                <p className="text-small text-[#D8D9D3] leading-relaxed font-sans">
                  Every structural frame is treated with high-build zinc chromate primer and industrial
                  enamel for maximum weather resilience.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </Container>
    </Section>
  );
}
