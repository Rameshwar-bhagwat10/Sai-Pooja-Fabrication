"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FadeUp } from "@/components/animations/fade-up";
import { TextReveal } from "@/components/animations/text-reveal";

export function FinalCta() {
  return (
    <Section surface="forest-900" spacing="cinematic" hasGridPattern isDarkSurface>
      <Container size="narrow">
        <div className="text-center flex flex-col items-center">
          <FadeUp>
            <span className="text-micro font-mono text-[#C8913D] tracking-[0.25em] uppercase mb-4 block">
              ENGINEERING ADVICE & CUSTOM BUILDS
            </span>
          </FadeUp>

          <TextReveal delay={0.1}>
            <h2 className="text-display font-display text-[#F4F1E8] tracking-tight max-w-3xl mb-6">
              NEED THE RIGHT EQUIPMENT FOR YOUR FIELD?
            </h2>
          </TextReveal>

          <FadeUp delay={0.2}>
            <p className="text-body-lg text-[#D8D9D3] max-w-xl mb-10 leading-relaxed">
              Talk directly with Sai Pooja Fabrication regarding equipment specifications, tractor
              horsepower matching, or custom implement design.
            </p>
          </FadeUp>

          <FadeUp delay={0.3} className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact">
              <Button variant="amber" size="lg" showArrow>
                CONTACT US
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="outline-light" size="lg">
                EXPLORE ALL EQUIPMENT
              </Button>
            </Link>
          </FadeUp>
        </div>
      </Container>
    </Section>
  );
}
