"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HeroScrollIndicator } from "./hero-scroll-indicator";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function Hero() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], prefersReduced ? [0, 0] : [0, 80]);
  const imageScale = useTransform(scrollYProgress, [0, 1], prefersReduced ? [1, 1] : [1, 1.05]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] sm:min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#10271D] text-[#F4F1E8] pt-28 pb-8 md:pt-36 md:pb-12"
    >
      {/* Background Machinery Media with Layered Industrial Gradients */}
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        initial={{ opacity: 0.7, scale: prefersReduced ? 1 : 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="absolute inset-0 z-0 select-none pointer-events-none"
      >
        <Image
          src="/images/hero/hero-machinery.jpg"
          alt="Sai Pooja Fabrication Heavy Tractor and Agricultural Tillage Machinery at Golden Sunset"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[72%_center] sm:object-[68%_center] md:object-[60%_center] lg:object-center transition-all duration-700"
        />

        {/* Multi-layered Cinematic Gradient Overlays for High Legibility & Golden Glow */}
        {/* Desktop Left-to-Right Scrim */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#090C0A]/95 via-[#10271D]/80 to-transparent hidden sm:block z-10" />
        
        {/* Mobile Top-to-Bottom Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090C0A]/95 via-[#10271D]/75 to-[#10271D]/50 sm:hidden z-10" />
        
        {/* Bottom Fade to Next Section */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#090C0A] via-[#10271D]/70 to-transparent z-10" />
        
        {/* Subtle Ambient Warmth on Right */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#C8913D]/10 rounded-full blur-3xl pointer-events-none z-10" />
      </motion.div>

      {/* Main Content Area */}
      <Container size="default" className="relative z-20 my-auto w-full">
        <motion.div style={{ opacity: contentOpacity }} className="max-w-3xl">
          {/* Mobile Backplate Container for Crystal Clear Typography */}
          <div className="bg-[#090C0A]/40 sm:bg-transparent backdrop-blur-[2px] sm:backdrop-blur-none p-5 sm:p-0 rounded-[20px] border border-white/10 sm:border-transparent">
            {/* Eyebrow & Technical Metadata Stamp */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6"
            >
              <Badge variant="amber" size="lg" dot>
                AGRICULTURAL EQUIPMENT
              </Badge>
              <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#D8D9D3]/80 uppercase">
                01 // HEAVY-DUTY ENGINEERING
              </span>
            </motion.div>

            {/* Main Headline Split Line Reveal */}
            <div className="overflow-hidden mb-1 sm:mb-2">
              <motion.h1
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.75, delay: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight text-[#F4F1E8]"
              >
                ENGINEERED
              </motion.h1>
            </div>

            <div className="overflow-hidden mb-4 sm:mb-6">
              <motion.h1
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.75, delay: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight text-[#C8913D]"
              >
                FOR THE FIELD.
              </motion.h1>
            </div>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="text-sm sm:text-base md:text-lg text-[#D8D9D3] max-w-2xl leading-relaxed mb-6 sm:mb-10 font-sans"
            >
              Reliable agricultural implements and precision fabrication engineering built for
              demanding field performance, high impact strength, and tractor compatibility.
            </motion.p>

            {/* Primary & Secondary Call to Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.95, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <Link href="/products" className="w-full sm:w-auto">
                <Button variant="amber" size="lg" showArrow className="w-full sm:w-auto">
                  EXPLORE EQUIPMENT
                </Button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <Button variant="outline-light" size="lg" className="w-full sm:w-auto">
                  CONTACT US
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </Container>

      {/* Bottom Technical Bar & Scroll Indicator */}
      <Container size="default" className="relative z-20 w-full mt-auto pt-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex items-end justify-between border-t border-white/10 pt-4"
        >
          <div className="hidden sm:flex flex-col text-xs font-mono text-[#D8D9D3]/60">
            <span className="text-[#C8913D]">SAI POOJA FABRICATION</span>
            <span>HIGH-TENSILE WELDED IMPLEMENTS</span>
          </div>

          <div className="mx-auto sm:mx-0">
            <HeroScrollIndicator />
          </div>

          <div className="hidden sm:flex flex-col text-right text-xs font-mono text-[#D8D9D3]/60">
            <span>TRACTOR-MOUNTED IMPLEMENTS</span>
            <span className="text-[#C8913D]">35 HP - 90+ HP COMPATIBLE</span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
