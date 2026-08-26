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

export function FabricationPreview() {
  return (
    <Section surface="forest-800" spacing="cinematic" hasGridPattern isDarkSurface>
      <Container size="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Content (6 cols) */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <FadeUp>
              <Eyebrow variant="amber" className="mb-4">
                WORKSHOP CAPABILITIES
              </Eyebrow>
            </FadeUp>

            <TextReveal delay={0.1}>
              <h2 className="text-h1 font-display text-[#F4F1E8] tracking-tight mb-6">
                FROM RAW STEEL TO FIELD-READY EQUIPMENT.
              </h2>
            </TextReveal>

            <FadeUp delay={0.2}>
              <p className="text-body-lg text-[#D8D9D3] leading-relaxed mb-6 font-medium">
                Our manufacturing plant integrates heavy hydraulic plate bending, precision CNC
                profile cutting, and multi-pass structural welding to produce implements that
                exceed standard market tolerances.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <p className="text-body text-[#D8D9D3]/80 leading-relaxed mb-8">
                Every frame undergoes rigorous alignment verification, stress relieving, and anti-corrosive
                industrial priming before final field testing.
              </p>
            </FadeUp>

            <FadeUp delay={0.4}>
              <Link href="/fabrication">
                <Button variant="amber" size="lg" showArrow>
                  EXPLORE FABRICATION CAPABILITIES
                </Button>
              </Link>
            </FadeUp>
          </div>

          {/* Right Workshop Visual (6 cols) */}
          <div className="lg:col-span-6">
            <ImageReveal delay={0.2}>
              <ImageWrapper
                src="/images/workshop/steel-fabrication.svg"
                alt="Sai Pooja Fabrication Structural Welding"
                aspectRatio="16/9"
                overlay="amber-industrial"
                technicalLabel="HEAVY FABRICATION // PLANT"
                caption="Structural frame welding and hydraulic cylinder mounting"
              />
            </ImageReveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
