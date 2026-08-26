"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/animations/stagger";

const PROOF_CARDS = [
  {
    title: "STRUCTURAL FABRICATION",
    tag: "WORKSHOP PLANT",
    description: "ISMB channels, MIG welding, and strict dimensional verification in assembly jigs.",
    image: "/images/workshop/steel-fabrication.svg",
  },
  {
    title: "IMPLEMENT ASSEMBLY",
    tag: "FINISHED EQUIPMENT",
    description: "CAT-II linkages, hydraulic cylinders, and boron wear parts mounted and tested.",
    image: "/images/hero/hero-machinery.svg",
  },
  {
    title: "FIELD-READY DEPLOYMENT",
    tag: "FIELD OPERATIONS",
    description: "Proven performance in heavy soil inversion, seedbed tilth, and bulk farm transport.",
    image: "/images/workshop/field-operations.svg",
  },
];

export function VisualProof() {
  return (
    <Section surface="forest-900" spacing="cinematic" hasGridPattern isDarkSurface>
      <Container size="default">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Credibility & Validation"
          title="ENGINEERING PROOF IN EVERY STAGE."
          description="A visual look at our complete manufacturing chain—from raw steel cutting to active fieldwork."
          isDarkSurface
        />

        {/* 3-Column Proof Cards */}
        <Stagger className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROOF_CARDS.map((card, idx) => (
            <StaggerItem key={idx}>
              <div className="h-full rounded-[16px] overflow-hidden bg-[#151A17] border border-white/10 flex flex-col justify-between shadow-xl">
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#090C0A]">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151A17] via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/75 backdrop-blur-sm text-[10px] font-mono text-[#C8913D] border border-white/10 font-bold">
                    {card.tag}
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#F4F1E8] tracking-tight mb-2">
                      {card.title}
                    </h3>
                    <p className="text-small text-[#D8D9D3] leading-relaxed font-sans">
                      {card.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#D8D9D3]/60">
                    <span>STAGE 0{idx + 1}</span>
                    <span className="text-[#C8913D]">VERIFIED BUILD</span>
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
