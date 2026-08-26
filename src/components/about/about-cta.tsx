"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FadeUp } from "@/components/animations/fade-up";
import { TextReveal } from "@/components/animations/text-reveal";

export function AboutCta() {
  return (
    <Section surface="forest-900" spacing="cinematic" hasGridPattern isDarkSurface>
      <Container size="narrow">
        <div className="text-center flex flex-col items-center">
          <FadeUp>
            <span className="text-micro font-mono text-[#C8913D] tracking-[0.25em] uppercase mb-4 block">
              READY FOR THE FIELD
            </span>
          </FadeUp>

          <TextReveal delay={0.1}>
            <h2 className="text-display font-display text-[#F4F1E8] tracking-tight max-w-3xl mb-6">
              EXPLORE OUR EQUIPMENT.
            </h2>
          </TextReveal>

          <FadeUp delay={0.2}>
            <p className="text-body-lg text-[#D8D9D3] max-w-xl mb-10 leading-relaxed font-sans">
              Discover our full range of tractor-mounted agricultural implements or talk directly with
              our fabrication workshop about your specific farming requirements.
            </p>
          </FadeUp>

          <FadeUp delay={0.3} className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/products">
              <Button variant="amber" size="lg" showArrow>
                EXPLORE EQUIPMENT
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline-light" size="lg">
                DISCUSS YOUR REQUIREMENT
              </Button>
            </Link>
          </FadeUp>
        </div>
      </Container>
    </Section>
  );
}
