"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ImageWrapper } from "@/components/ui/image-wrapper";
import { FadeUp } from "@/components/animations/fade-up";
import { ImageReveal } from "@/components/animations/image-reveal";
import { TextReveal } from "@/components/animations/text-reveal";

export function FabricationOverview() {
  return (
    <Section surface="warm-white" spacing="default">
      <Container size="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Overview (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <FadeUp>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-display font-bold text-[#C8913D]">
                  01
                </span>
                <Eyebrow variant="forest">FABRICATION SCOPE</Eyebrow>
              </div>
            </FadeUp>

            <TextReveal delay={0.1}>
              <h2 className="text-h1 font-display tracking-tight text-[#151A17] mb-6">
                PRECISION STRUCTURAL STEEL ENGINEERING.
              </h2>
            </TextReveal>

            <FadeUp delay={0.2}>
              <p className="text-body-lg text-[#151A17] leading-relaxed mb-6 font-medium font-sans">
                Our workshop is equipped with heavy industrial equipment designed specifically for
                forming and assembling structural steel into high-strength tractor implements.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <p className="text-body text-[#6E746F] leading-relaxed mb-8 font-sans">
                From rolling heavy plate mouldboards and plasma-profiling tine clamps to fabricating
                hydraulic tipping trailer chassis, we oversee every stage of metal cutting, fixture alignment,
                multi-pass MIG welding, and anti-corrosive priming under strict quality control.
              </p>
            </FadeUp>

            {/* Metrics Matrix */}
            <FadeUp delay={0.4} className="w-full">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-black/10">
                <div>
                  <span className="text-micro font-mono text-[#6E746F] uppercase block">
                    STEEL GRADES
                  </span>
                  <span className="text-small font-bold text-[#151A17]">
                    ISMB & Boron Steel
                  </span>
                </div>
                <div>
                  <span className="text-micro font-mono text-[#6E746F] uppercase block">
                    WELD PROCESS
                  </span>
                  <span className="text-small font-bold text-[#151A17]">
                    Multi-Pass MIG
                  </span>
                </div>
                <div>
                  <span className="text-micro font-mono text-[#6E746F] uppercase block">
                    LINKAGE
                  </span>
                  <span className="text-small font-bold text-[#2F6B45]">
                    Standard CAT-II Hitch
                  </span>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Right Column: Workshop Visual (5 cols) */}
          <div className="lg:col-span-5">
            <ImageReveal delay={0.2}>
              <ImageWrapper
                src="/images/workshop/steel-fabrication.svg"
                alt="Sai Pooja Heavy Steel Fabrication and Welding"
                aspectRatio="4/3"
                overlay="dark-subtle"
                technicalLabel="PLANT // ASSEMBLY JIGS"
                caption="Structural frame welding in rigid assembly fixtures"
              />
            </ImageReveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
