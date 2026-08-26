"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { FadeUp } from "@/components/animations/fade-up";
import { TextReveal } from "@/components/animations/text-reveal";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function AboutHero() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden bg-[#10271D] text-[#F4F1E8] pt-32 pb-16 md:pt-40 md:pb-24 border-b border-white/10">
      {/* Background Machinery Media with Layered Overlays */}
      <motion.div
        initial={{ opacity: 0.4, scale: prefersReduced ? 1 : 1.05 }}
        animate={{ opacity: 0.8, scale: 1 }}
        transition={{ duration: 1.0, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="absolute inset-0 z-0 select-none pointer-events-none"
      >
        <Image
          src="/images/workshop/steel-fabrication.svg"
          alt="Sai Pooja Fabrication Workshop Infrastructure"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090C0A]/95 via-[#10271D]/80 to-[#10271D]/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#10271D] via-transparent to-transparent z-10" />
        <div className="absolute inset-0 bg-industrial-grid-dark opacity-30 z-10" />
      </motion.div>

      <Container size="default" className="relative z-20">
        <div className="max-w-3xl">
          {/* Eyebrow & Technical Stamp */}
          <FadeUp>
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="amber" size="lg" dot>
                ABOUT THE COMPANY
              </Badge>
              <span className="text-[11px] font-mono tracking-widest text-[#D8D9D3]/70 uppercase">
                AGRICULTURAL ENGINEERING & FABRICATION
              </span>
            </div>
          </FadeUp>

          {/* Main Display Headline */}
          <TextReveal delay={0.1}>
            <h1 className="text-display font-display tracking-tight text-[#F4F1E8] mb-6">
              WHERE AGRICULTURE MEETS ENGINEERING.
            </h1>
          </TextReveal>

          {/* Subtitle */}
          <FadeUp delay={0.2}>
            <p className="text-body-lg text-[#D8D9D3] max-w-2xl leading-relaxed mb-8 font-sans">
              Specialists in heavy-duty agricultural implements, tractor-mounted machinery,
              and precision structural steel fabrication built around demanding field realities.
            </p>
          </FadeUp>

          {/* Technical Quality Chips */}
          <FadeUp delay={0.3}>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1.5 rounded-[6px] bg-white/5 border border-white/10 text-xs font-mono text-[#C8913D]">
                HEAVY ISMB STRUCTURAL STEEL
              </span>
              <span className="px-3 py-1.5 rounded-[6px] bg-white/5 border border-white/10 text-xs font-mono text-[#D8D9D3]">
                MULTI-PASS MIG WELDED
              </span>
              <span className="px-3 py-1.5 rounded-[6px] bg-white/5 border border-white/10 text-xs font-mono text-[#D8D9D3]">
                FIELD-TESTED RESILIENCE
              </span>
            </div>
          </FadeUp>
        </div>
      </Container>
    </section>
  );
}
