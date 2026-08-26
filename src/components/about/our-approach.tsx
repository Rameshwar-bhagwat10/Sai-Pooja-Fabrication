"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/animations/stagger";
import { COMPANY_APPROACH } from "@/data/company";

export function OurApproach() {
  return (
    <Section surface="charcoal" spacing="default" hasGridPattern isDarkSurface>
      <Container size="default">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Manufacturing Philosophy"
          title="HOW WE APPROACH FABRICATION."
          description="Four manufacturing tenets that guide our implement frame design, material selection, and structural welding."
          isDarkSurface
        />

        {/* Numbered Approach Grid */}
        <Stagger className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
          {COMPANY_APPROACH.map((item) => (
            <StaggerItem key={item.number}>
              <div className="group h-full p-8 sm:p-10 rounded-[16px] bg-[#10271D]/60 border border-white/10 hover:border-[#C8913D]/50 hover:bg-[#10271D]/90 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display text-4xl sm:text-5xl font-bold text-white/20 group-hover:text-[#C8913D] transition-colors duration-300">
                      {item.number}
                    </span>
                    <span className="px-3 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-[#C8913D] uppercase tracking-wider">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F4F1E8] tracking-tight mb-4 group-hover:translate-x-1 transition-transform duration-300">
                    {item.title}
                  </h3>

                  <p className="text-body text-[#D8D9D3] leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#D8D9D3]/60">
                  <span>SAI POOJA FABRICATION</span>
                  <span className="text-[#C8913D]">ZERO DEFLECTION</span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
