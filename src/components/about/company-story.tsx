"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { ImageWrapper } from "@/components/ui/image-wrapper";
import { FadeUp } from "@/components/animations/fade-up";
import { ImageReveal } from "@/components/animations/image-reveal";

export function CompanyStory() {
  return (
    <Section surface="soft-white" spacing="default">
      <Container size="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Machinery Frame (5 cols) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <ImageReveal>
              <ImageWrapper
                src="/images/workshop/field-operations.svg"
                alt="Practical Field Testing of Agricultural Implements"
                aspectRatio="4/3"
                overlay="dark-subtle"
                technicalLabel="FIELD CALIBRATION"
                caption="Testing implement draft load and soil inversion dynamics"
              />
            </ImageReveal>
          </div>

          {/* Right Column: Narrative (7 cols) */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col items-start">
            <SectionHeading
              eyebrow="Our Story"
              title="FOUNDED ON FIELD RESILIENCE."
              description="How practical farming challenges shaped our manufacturing philosophy."
            />

            <FadeUp delay={0.2} className="mt-8">
              <p className="text-body-lg text-[#151A17] leading-relaxed mb-6 font-sans">
                In agriculture, downtime during peak sowing and land preparation windows translates
                directly into lost yield. We recognized that off-the-shelf lightweight implements often
                fail under harsh black cotton soil conditions, rocky terrain, and continuous high-horsepower pulling.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <p className="text-body text-[#6E746F] leading-relaxed mb-6 font-sans">
                Sai Pooja Fabrication was established with a singular focus: build agricultural implements
                with industrial-grade structural integrity. We source heavy ISMB channels, precision laser-profiled
                plates, and heat-treated boron steel components to fabricate machinery that farmers can rely on season after season.
              </p>
            </FadeUp>

            <FadeUp delay={0.4}>
              <div className="p-6 rounded-[12px] bg-white border border-black/10 shadow-sm w-full">
                <span className="text-xs font-mono text-[#C8913D] font-bold uppercase tracking-wider block mb-2">
                  OUR CORE COMMITMENT
                </span>
                <p className="text-small text-[#151A17] font-medium leading-relaxed">
                  No lightweight compromises. Every implement is fabricated with heavy structural sections,
                  reinforced CAT-II hitches, and anti-wear protection designed to withstand extreme draft resistance.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </Container>
    </Section>
  );
}
