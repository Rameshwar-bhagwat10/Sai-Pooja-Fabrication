"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FadeUp } from "@/components/animations/fade-up";
import { TextReveal } from "@/components/animations/text-reveal";

export function AgricultureEngineering() {
  return (
    <Section surface="forest-900" spacing="cinematic" hasGridPattern isDarkSurface>
      <Container size="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Typographic Signature Statement (6 cols) */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <FadeUp>
              <span className="text-micro font-mono text-[#C8913D] tracking-[0.25em] uppercase mb-4 block">
                CORE PHILOSOPHY
              </span>
            </FadeUp>

            <TextReveal delay={0.1}>
              <div className="flex flex-col gap-2 font-display text-4xl sm:text-6xl font-bold tracking-tight text-[#F4F1E8] mb-6">
                <span>AGRICULTURE</span>
                <span className="text-[#C8913D]">+</span>
                <span>ENGINEERING</span>
                <span className="text-[#C8913D]">+</span>
                <span>FABRICATION</span>
              </div>
            </TextReveal>

            <FadeUp delay={0.3}>
              <p className="text-body-lg text-[#D8D9D3] leading-relaxed mb-6 font-sans">
                True agricultural machinery must bridge the gap between heavy structural engineering
                and biological field realities.
              </p>
            </FadeUp>

            <FadeUp delay={0.4}>
              <p className="text-body text-[#D8D9D3]/80 leading-relaxed font-sans">
                Every angle of soil entry, every hydraulic reversal speed, and every weld seam thickness
                is calibrated to ensure smooth tractor draft, minimal fuel burn, and zero frame deflection.
              </p>
            </FadeUp>
          </div>

          {/* Right Column: Visual Connection (6 cols) */}
          <div className="lg:col-span-6">
            <div className="relative w-full aspect-[4/3] rounded-[16px] overflow-hidden bg-[#151A17] border border-white/10 shadow-2xl">
              <Image
                src="/images/workshop/field-operations.svg"
                alt="Agriculture and Engineering Connection in Field Operations"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090C0A]/90 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-[#D8D9D3] px-3 py-2 bg-black/70 backdrop-blur-sm rounded-[8px]">
                <span className="text-[#C8913D] font-bold">FIELD PERFORMANCE CALIBRATION</span>
                <span>CAT-II HITCH</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
