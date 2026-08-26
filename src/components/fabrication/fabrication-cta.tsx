"use client";

import * as React from "react";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FadeUp } from "@/components/animations/fade-up";
import { TextReveal } from "@/components/animations/text-reveal";
import { COMPANY_INFO } from "@/data/company";

export function FabricationCta() {
  const whatsappMessage = encodeURIComponent(
    "Hello Sai Pooja Fabrication, I would like to inquire about your workshop fabrication capabilities and custom implement manufacturing."
  );

  return (
    <Section surface="forest-900" spacing="cinematic" hasGridPattern isDarkSurface>
      <Container size="narrow">
        <div className="text-center flex flex-col items-center">
          <FadeUp>
            <span className="text-micro font-mono text-[#C8913D] tracking-[0.25em] uppercase mb-4 block">
              WORKSHOP CONSULTATION
            </span>
          </FadeUp>

          <TextReveal delay={0.1}>
            <h2 className="text-display font-display text-[#F4F1E8] tracking-tight max-w-3xl mb-6">
              READY TO DISCUSS YOUR REQUIREMENT?
            </h2>
          </TextReveal>

          <FadeUp delay={0.2}>
            <p className="text-body-lg text-[#D8D9D3] max-w-xl mb-10 leading-relaxed font-sans">
              Talk directly with our fabrication engineers regarding implement dimensions, tractor mounting
              brackets, or custom farm attachments.
            </p>
          </FadeUp>

          <FadeUp delay={0.3} className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact">
              <Button variant="amber" size="lg" showArrow>
                CONTACT US
              </Button>
            </Link>

            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline-light" size="lg">
                <MessageSquare className="w-4 h-4 mr-2 text-[#2F6B45]" />
                <span>CHAT ON WHATSAPP</span>
              </Button>
            </a>
          </FadeUp>

          <FadeUp delay={0.4} className="mt-8 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-[#D8D9D3]/60">
            <span>IN-HOUSE FABRICATION</span>
            <span>•</span>
            <span>CUSTOM IMPLEMENT DESIGN</span>
            <span>•</span>
            <span>DIRECT FACTORY SUPPORT</span>
          </FadeUp>
        </div>
      </Container>
    </Section>
  );
}
