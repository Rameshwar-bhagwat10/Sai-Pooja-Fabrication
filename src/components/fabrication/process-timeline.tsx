"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/animations/stagger";
import { FABRICATION_PROCESS } from "@/data/fabrication-process";

export function ProcessTimeline() {
  return (
    <Section surface="warm-white" spacing="default">
      <Container size="default">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Workflow & Quality"
          title="FABRICATION PROCESS."
          description="A structured 5-stage manufacturing workflow ensuring repeatable structural accuracy and field durability."
        />

        {/* Timeline Steps Layout */}
        <Stagger className="mt-14 grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {FABRICATION_PROCESS.map((step, index) => (
            <StaggerItem key={step.step} className="flex flex-col">
              <div className="h-full p-6 sm:p-7 rounded-[16px] bg-white border border-black/10 shadow-sm flex flex-col justify-between hover:border-[#2F6B45]/50 transition-colors">
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display text-3xl font-bold text-[#C8913D]">
                      {step.step}
                    </span>
                    <span className="text-[10px] font-mono tracking-widest text-[#2F6B45] font-semibold uppercase">
                      {step.tag}
                    </span>
                  </div>

                  <h3 className="font-display text-base sm:text-lg font-bold text-[#151A17] tracking-tight mb-2">
                    {step.title}
                  </h3>

                  <p className="text-small text-[#6E746F] leading-relaxed font-sans mb-4">
                    {step.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/5 text-[11px] font-mono text-[#151A17]/70">
                  <span>STAGE {index + 1} OF 5</span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
