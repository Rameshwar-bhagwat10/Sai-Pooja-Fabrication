"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/container";
import { FadeUp } from "@/components/animations/fade-up";
import { TextReveal } from "@/components/animations/text-reveal";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function FieldShowcase() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], prefersReduced ? [0, 0] : [-30, 30]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[520px] md:min-h-[620px] w-full flex items-center overflow-hidden bg-[#10271D] text-[#F4F1E8] py-24 md:py-36"
    >
      {/* Full-width Parallax Background Image */}
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-0 z-0 select-none pointer-events-none scale-105"
      >
        <Image
          src="/images/workshop/field-operations.svg"
          alt="Agricultural Machinery Working in Field"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090C0A] via-[#10271D]/70 to-[#090C0A]/90 z-10" />
      </motion.div>

      {/* Content Container */}
      <Container size="default" className="relative z-20 w-full text-center flex flex-col items-center">
        <FadeUp>
          <span className="text-micro font-mono text-[#C8913D] tracking-[0.25em] uppercase mb-4 block">
            PRACTICAL FIELD VALIDATION
          </span>
        </FadeUp>

        <TextReveal delay={0.1}>
          <h2 className="text-display font-display text-[#F4F1E8] tracking-tight max-w-4xl mb-6">
            ENGINEERING THAT MEETS THE FIELD.
          </h2>
        </TextReveal>

        <FadeUp delay={0.2}>
          <p className="text-body-lg text-[#D8D9D3] max-w-2xl leading-relaxed mx-auto">
            Tested across abrasive soil textures, heavy black cotton soil, and tough crop residue
            to guarantee reliable field operation season after season.
          </p>
        </FadeUp>
      </Container>
    </section>
  );
}
