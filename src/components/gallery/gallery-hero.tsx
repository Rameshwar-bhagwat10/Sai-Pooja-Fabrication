"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { FadeUp } from "@/components/animations/fade-up";
import { TextReveal } from "@/components/animations/text-reveal";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function GalleryHero() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden bg-[#10271D] text-[#F4F1E8] pt-32 pb-16 md:pt-40 md:pb-24 border-b border-white/10">
      {/* Background Media with Layered Overlays */}
      <motion.div
        initial={{ opacity: 0.4, scale: prefersReduced ? 1 : 1.05 }}
        animate={{ opacity: 0.8, scale: 1 }}
        transition={{ duration: 1.0, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="absolute inset-0 z-0 select-none pointer-events-none"
      >
        <Image
          src="/images/hero/hero-machinery.svg"
          alt="Sai Pooja Fabrication Machinery in Field"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090C0A]/95 via-[#10271D]/85 to-[#10271D]/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#10271D] via-transparent to-transparent z-10" />
        <div className="absolute inset-0 bg-industrial-grid-dark opacity-30 z-10" />
      </motion.div>

      <Container size="default" className="relative z-20">
        <div className="max-w-3xl">
          {/* Eyebrow / Technical Badge */}
          <FadeUp>
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="amber" size="lg" dot>
                VISUAL PROOF
              </Badge>
              <span className="text-[11px] font-mono tracking-widest text-[#D8D9D3]/70 uppercase">
                MACHINERY, PLANT & FIELD PORTFOLIO
              </span>
            </div>
          </FadeUp>

          {/* Main Space Grotesk Headline */}
          <TextReveal delay={0.1}>
            <h1 className="text-display font-display tracking-tight text-[#F4F1E8] mb-6">
              SEE THE REAL WORK. BUILT. FABRICATED. FIELD-READY.
            </h1>
          </TextReveal>

          {/* Subtitle */}
          <FadeUp delay={0.2}>
            <p className="text-body-lg text-[#D8D9D3] max-w-2xl leading-relaxed mb-8 font-sans">
              Explore authentic photography of our manufactured agricultural implements, structural
              steel welding processes, plant assembly jigs, and active field operations.
            </p>
          </FadeUp>

          {/* Technical Quality Chips */}
          <FadeUp delay={0.3}>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1.5 rounded-[6px] bg-white/5 border border-white/10 text-xs font-mono text-[#C8913D]">
                FINISHED IMPLEMENTS
              </span>
              <span className="px-3 py-1.5 rounded-[6px] bg-white/5 border border-white/10 text-xs font-mono text-[#D8D9D3]">
                WORKSHOP FABRICATION
              </span>
              <span className="px-3 py-1.5 rounded-[6px] bg-white/5 border border-white/10 text-xs font-mono text-[#D8D9D3]">
                FIELD TRIALS
              </span>
            </div>
          </FadeUp>
        </div>
      </Container>
    </section>
  );
}
