"use client";

import * as React from "react";
import { MessageSquare, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FadeUp } from "@/components/animations/fade-up";
import { TextReveal } from "@/components/animations/text-reveal";
import { COMPANY_INFO } from "@/data/company";

export function ContactCta() {
  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(
    "Hello Sai Pooja Fabrication, I would like to inquire about agricultural implements and fabrication services."
  )}`;

  return (
    <Section surface="forest-900" spacing="cinematic" hasGridPattern isDarkSurface>
      <Container size="narrow">
        <div className="text-center flex flex-col items-center">
          <FadeUp>
            <span className="text-micro font-mono text-[#C8913D] tracking-[0.25em] uppercase mb-4 block">
              FACTORY DIRECT COMMUNICATION
            </span>
          </FadeUp>

          <TextReveal delay={0.1}>
            <h2 className="text-display font-display text-[#F4F1E8] tracking-tight max-w-3xl mb-6">
              READY TO DISCUSS YOUR REQUIREMENT?
            </h2>
          </TextReveal>

          <FadeUp delay={0.2}>
            <p className="text-body-lg text-[#D8D9D3] max-w-xl mb-10 leading-relaxed font-sans">
              Our fabrication team is available to answer all technical questions, calculate horsepower
              matching, and prepare customized quotes.
            </p>
          </FadeUp>

          <FadeUp delay={0.3} className="flex flex-wrap items-center justify-center gap-4">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="amber" size="lg">
                <MessageSquare className="w-4 h-4 mr-2" />
                <span>CHAT ON WHATSAPP</span>
              </Button>
            </a>

            <a href={`tel:${COMPANY_INFO.phone.replace(/[^0-9+]/g, "")}`}>
              <Button variant="outline-light" size="lg">
                <Phone className="w-4 h-4 mr-2 text-[#C8913D]" />
                <span>CALL {COMPANY_INFO.phone}</span>
              </Button>
            </a>
          </FadeUp>
        </div>
      </Container>
    </Section>
  );
}
