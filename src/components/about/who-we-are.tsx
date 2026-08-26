"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ImageWrapper } from "@/components/ui/image-wrapper";
import { FadeUp } from "@/components/animations/fade-up";
import { ImageReveal } from "@/components/animations/image-reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { COMPANY_INFO } from "@/data/company";

export function WhoWeAre() {
  return (
    <Section surface="warm-white" spacing="default">
      <Container size="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Statement (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <FadeUp>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-display font-bold text-[#C8913D]">
                  01
                </span>
                <Eyebrow variant="forest">WHO WE ARE</Eyebrow>
              </div>
            </FadeUp>

            <TextReveal delay={0.1}>
              <h2 className="text-h1 font-display tracking-tight text-[#151A17] mb-6">
                WE BUILD EQUIPMENT AROUND THE REALITIES OF FARMING.
              </h2>
            </TextReveal>

            <FadeUp delay={0.2}>
              <p className="text-body-lg text-[#151A17] leading-relaxed mb-6 font-medium font-sans">
                {COMPANY_INFO.longDescription}
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <p className="text-body text-[#6E746F] leading-relaxed mb-8 font-sans">
                {COMPANY_INFO.philosophy}
              </p>
            </FadeUp>

            {/* Value Indicators */}
            <FadeUp delay={0.4} className="w-full">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-black/10">
                <div>
                  <span className="text-micro font-mono text-[#6E746F] uppercase block">
                    SECTOR
                  </span>
                  <span className="text-small font-bold text-[#151A17]">
                    Agricultural Engineering
                  </span>
                </div>
                <div>
                  <span className="text-micro font-mono text-[#6E746F] uppercase block">
                    CORE SPECIALTY
                  </span>
                  <span className="text-small font-bold text-[#151A17]">
                    Tractor Implements
                  </span>
                </div>
                <div>
                  <span className="text-micro font-mono text-[#6E746F] uppercase block">
                    MANUFACTURING
                  </span>
                  <span className="text-small font-bold text-[#2F6B45]">
                    In-House Fabrication
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
                alt="Sai Pooja Fabrication Structural Steel Assembly"
                aspectRatio="4/3"
                overlay="dark-subtle"
                technicalLabel="STRUCTURAL ASSEMBLY // PLANT"
                caption="In-house heavy structural steel fabrication and frame welding"
              />
            </ImageReveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
