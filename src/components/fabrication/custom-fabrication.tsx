"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ImageWrapper } from "@/components/ui/image-wrapper";
import { FadeUp } from "@/components/animations/fade-up";
import { ImageReveal } from "@/components/animations/image-reveal";
import { TextReveal } from "@/components/animations/text-reveal";

export function CustomFabrication() {
  return (
    <Section surface="warm-white" spacing="default">
      <Container size="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Narrative & Action (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <FadeUp>
              <Eyebrow variant="forest" className="mb-4">
                TAILORED SOLUTIONS
              </Eyebrow>
            </FadeUp>

            <TextReveal delay={0.1}>
              <h2 className="text-h1 font-display tracking-tight text-[#151A17] mb-6">
                HAVE A SPECIFIC FABRICATION REQUIREMENT?
              </h2>
            </TextReveal>

            <FadeUp delay={0.2}>
              <p className="text-body-lg text-[#151A17] leading-relaxed mb-6 font-medium font-sans">
                When standard off-the-shelf machinery does not suit your tractor model, crop row spacing,
                or regional soil density, our workshop provides custom design and fabrication services.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <p className="text-body text-[#6E746F] leading-relaxed mb-8 font-sans">
                We work directly from your specifications to fabricate reinforced toolbars, customized
                furrowers, sugarcane crop attachments, and heavy farm trailer chassis.
              </p>
            </FadeUp>

            <FadeUp delay={0.4}>
              <Link href="/contact?type=custom-fabrication">
                <Button variant="amber" size="lg" showArrow>
                  DISCUSS YOUR REQUIREMENT
                </Button>
              </Link>
            </FadeUp>
          </div>

          {/* Right Column: Custom Visual (5 cols) */}
          <div className="lg:col-span-5">
            <ImageReveal delay={0.2}>
              <ImageWrapper
                src="/images/products/custom-implements/custom-implements-main.svg"
                alt="Custom Fabricated Agricultural Equipment"
                aspectRatio="4/3"
                overlay="dark-subtle"
                technicalLabel="CUSTOM FABRICATION // ATTACHMENTS"
                caption="Custom engineered tractor implements and heavy steel toolbars"
              />
            </ImageReveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
