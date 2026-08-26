"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/animations/stagger";

const STORY_STEPS = [
  {
    step: "01",
    title: "WORKSHOP FABRICATION",
    subtitle: "HEAVY STEEL CHANNELS & CNC CUTTING",
    description: "Raw structural steel sections are cut, beveled, and aligned in rigid jigs for multi-pass MIG structural welding.",
    image: "/images/workshop/steel-fabrication.svg",
  },
  {
    step: "02",
    title: "FINISHED MACHINERY",
    subtitle: "CAT-II LINKAGE & HYDRAULIC SYSTEMS",
    description: "Hardened boron wear points, dual-acting turnover rams, and precision gearboxes are assembled and calibrated.",
    image: "/images/hero/hero-machinery.svg",
  },
  {
    step: "03",
    title: "FIELD PERFORMANCE",
    subtitle: "PROVEN SOIL INVERSION & PULVERIZATION",
    description: "Implements undergo rigorous field trials across demanding soil conditions to ensure reliable season-long operation.",
    image: "/images/workshop/field-operations.svg",
  },
];

export function AboutVisualStory() {
  return (
    <Section surface="forest-900" spacing="cinematic" hasGridPattern isDarkSurface>
      <Container size="default">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Visual Continuity"
          title="FROM THE WORKSHOP TO THE FIELD."
          description="How raw industrial steel is transformed into field-ready agricultural machinery that performs under severe loads."
          isDarkSurface
        />

        {/* 3-Step Visual Story Cards */}
        <Stagger className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {STORY_STEPS.map((item) => (
            <StaggerItem key={item.step}>
              <div className="h-full rounded-[16px] overflow-hidden bg-[#151A17] border border-white/10 flex flex-col justify-between shadow-xl">
                {/* Image Frame */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#090C0A]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151A17] via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/70 backdrop-blur-sm text-[10px] font-mono text-[#C8913D] border border-white/10 font-bold">
                    STEP {item.step}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-micro font-mono text-[#C8913D] uppercase tracking-wider block mb-2">
                      {item.subtitle}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F4F1E8] tracking-tight mb-3">
                      {item.title}
                    </h3>
                    <p className="text-small text-[#D8D9D3] leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#D8D9D3]/60">
                    <span>SPF // VERIFIED</span>
                    <span className="text-[#C8913D]">PHASE {item.step}</span>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
