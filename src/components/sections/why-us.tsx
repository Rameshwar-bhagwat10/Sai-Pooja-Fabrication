"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/animations/stagger";

const PRINCIPLES = [
  {
    num: "01",
    title: "HEAVY-DUTY CONSTRUCTION",
    description:
      "Engineered with thick-gauge ISMB structural steel channels, seamless box frames, and wear-resistant boron points designed to absorb high torsional resistance in rocky or compacted soil.",
    tag: "ISMB STRUCTURAL CHANNELS",
  },
  {
    num: "02",
    title: "PRECISION INDUSTRIAL FABRICATION",
    description:
      "Dual-pass MIG robotic welding, precision CNC plasma profile cutting, and stress-relieved joint geometry eliminate weak points and prevent seam cracking during heavy pulling.",
    tag: "MIG WELDED SEAMS",
  },
  {
    num: "03",
    title: "PRACTICAL AGRICULTURAL FOCUS",
    description:
      "Every implement geometry—from tine entry angles to mouldboard curves—is calibrated for clean soil inversion, optimal residue burial, and fuel-efficient tractor drawbar pull.",
    tag: "OPTIMAL FUEL ECONOMY",
  },
  {
    num: "04",
    title: "CUSTOM TRACTOR HP MATCHING",
    description:
      "We fabricate tractor-mounted implements tailored specifically for 35 HP to 90+ HP tractor models with CAT-II standard 3-point linkages and customizable widths.",
    tag: "35 HP - 90+ HP TAILORED",
  },
];

export function WhyUs() {
  return (
    <Section surface="warm-white" spacing="default">
      <Container size="default">
        {/* Section Header */}
        <SectionHeading
          eyebrow="Engineering Philosophy"
          title="BUILT WITH PURPOSE."
          description="Four manufacturing standards that ensure every Sai Pooja implement delivers uncompromising durability and field productivity."
        />

        {/* Editorial Numbered List */}
        <Stagger className="mt-14 flex flex-col divide-y divide-black/10">
          {PRINCIPLES.map((item) => (
            <StaggerItem key={item.num} className="group py-8 sm:py-10 transition-colors">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline">
                {/* Number & Tag (3 cols) */}
                <div className="md:col-span-3 flex items-baseline gap-4">
                  <span className="font-display text-4xl sm:text-5xl font-bold text-black/30 group-hover:text-[#C8913D] transition-colors duration-300">
                    {item.num}
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-[#2F6B45] font-semibold uppercase">
                    {item.tag}
                  </span>
                </div>

                {/* Title & Description (9 cols) */}
                <div className="md:col-span-9 flex flex-col gap-2.5">
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#151A17] tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                    {item.title}
                  </h3>
                  <p className="text-body text-[#6E746F] leading-relaxed max-w-3xl">
                    {item.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
