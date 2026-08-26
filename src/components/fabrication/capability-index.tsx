"use client";

import * as React from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { FABRICATION_CAPABILITIES, type FabricationCapability } from "@/data/capabilities";

export function CapabilityIndex() {
  const [activeCapability, setActiveCapability] = React.useState<FabricationCapability>(
    FABRICATION_CAPABILITIES[0]
  );

  return (
    <Section surface="forest-900" spacing="default" hasGridPattern isDarkSurface>
      <Container size="default">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Core Competencies"
          title="FABRICATION CAPABILITIES."
          description="Explore our specialized manufacturing processes, custom tooling, and tractor implement fabrication services."
          isDarkSurface
        />

        {/* Interactive Capability Layout */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Interactive Capability List (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {FABRICATION_CAPABILITIES.map((cap) => {
              const isActive = activeCapability.id === cap.id;
              return (
                <button
                  key={cap.id}
                  type="button"
                  onClick={() => setActiveCapability(cap)}
                  onMouseEnter={() => setActiveCapability(cap)}
                  onFocus={() => setActiveCapability(cap)}
                  className={`text-left w-full p-6 sm:p-8 rounded-[16px] border transition-all duration-300 focus-ring ${
                    isActive
                      ? "bg-[#173B2C] border-[#C8913D]/60 shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
                      : "bg-white/5 border-white/10 hover:bg-white/[0.08] hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`font-display text-2xl sm:text-3xl font-bold transition-colors ${
                        isActive ? "text-[#C8913D]" : "text-white/30"
                      }`}
                    >
                      {cap.number}
                    </span>
                    <span className="text-[10px] font-mono tracking-widest text-[#D8D9D3]/70 uppercase font-semibold">
                      {cap.categoryTag}
                    </span>
                  </div>

                  <h3 className="font-display text-lg sm:text-xl font-bold text-[#F4F1E8] tracking-tight mb-2">
                    {cap.title}
                  </h3>

                  <p className="text-small text-[#D8D9D3] leading-relaxed font-sans mb-4">
                    {cap.shortDescription}
                  </p>

                  {/* Expanded Highlights on Active State */}
                  {isActive && (
                    <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-[#D8D9D3]">
                      {cap.keyHighlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C8913D] shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Preview Frame (5 cols) */}
          <div className="lg:col-span-5 sticky top-28 hidden lg:block">
            <div className="rounded-[16px] overflow-hidden bg-[#151A17] border border-white/10 shadow-2xl">
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#090C0A]">
                <Image
                  src={activeCapability.image}
                  alt={activeCapability.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151A17] via-transparent to-transparent" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/75 backdrop-blur-sm text-[10px] font-mono text-[#C8913D] border border-white/10 font-bold">
                  {activeCapability.number} // PREVIEW
                </div>
              </div>

              <div className="p-6 bg-[#151A17]">
                <span className="text-[10px] font-mono text-[#C8913D] uppercase tracking-wider block mb-1">
                  DETAILED CAPABILITY SPECIFICATION
                </span>
                <h4 className="font-display text-lg font-bold text-[#F4F1E8] mb-2">
                  {activeCapability.title}
                </h4>
                <p className="text-small text-[#D8D9D3] leading-relaxed font-sans">
                  {activeCapability.detailedDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
