"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { TextLink } from "@/components/ui/text-link";
import { ImageWrapper } from "@/components/ui/image-wrapper";
import { FadeUp } from "@/components/animations/fade-up";
import { ImageReveal } from "@/components/animations/image-reveal";
import { TextReveal } from "@/components/animations/text-reveal";

export function CompanyIntro() {
  return (
    <Section surface="warm-white" spacing="default">
      <Container size="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Narrative (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <FadeUp>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-display font-bold text-[#C8913D]">
                  01
                </span>
                <Eyebrow variant="forest">ENGINEERING PURPOSE</Eyebrow>
              </div>
            </FadeUp>

            <TextReveal delay={0.1}>
              <h2 className="text-h1 font-display tracking-tight text-[#151A17] mb-6">
                BUILT AROUND THE NEEDS OF MODERN FARMING.
              </h2>
            </TextReveal>

            <FadeUp delay={0.2}>
              <p className="text-body-lg text-[#151A17] leading-relaxed mb-6 font-medium">
                At Sai Pooja Fabrication, we combine industrial structural engineering with practical
                agricultural experience to manufacture heavy implements that withstand hard soil,
                heavy shock loads, and years of demanding fieldwork.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <p className="text-body text-[#6E746F] leading-relaxed mb-8">
                From hydraulic reversible ploughs and gear-driven multi-speed rotavators to heavy-duty
                tipping farm trailers, our equipment is built with high-tensile structural steel,
                reinforced box sections, and wear-resistant boron points designed to maximize tractor
                efficiency and field turnaround.
              </p>
            </FadeUp>

            <FadeUp delay={0.4}>
              <div className="flex flex-wrap gap-8 items-center pt-2">
                <TextLink href="/about" variant="brand">
                  LEARN ABOUT OUR WORKSHOP
                </TextLink>
                <TextLink href="/fabrication" variant="neutral">
                  VIEW FABRICATION CAPABILITIES
                </TextLink>
              </div>
            </FadeUp>
          </div>

          {/* Right Column: High-End Workshop Visual (5 cols) */}
          <div className="lg:col-span-5">
            <ImageReveal delay={0.2}>
              <ImageWrapper
                src="/images/workshop/steel-fabrication.svg"
                alt="Sai Pooja Fabrication Workshop Assembly"
                aspectRatio="4/3"
                overlay="dark-subtle"
                technicalLabel="ISMB STEEL // MIG WELDED"
                caption="Precision structural welding and implement frame assembly"
              />
            </ImageReveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
