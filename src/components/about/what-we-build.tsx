"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/animations/stagger";

const PRODUCT_SECTORS = [
  {
    num: "01",
    title: "PRIMARY & SECONDARY TILLAGE",
    description: "Hydraulic reversible ploughs, heavy rigid cultivators, rotary tillers (rotavators), and disc harrows.",
    categorySlug: "tillage",
    tag: "TILLAGE EQUIPMENT",
  },
  {
    num: "02",
    title: "LAND PREPARATION & LEVELING",
    description: "Adjustable 3-row furrow ridgers and heavy-duty tractor land levelers for uniform irrigation grading.",
    categorySlug: "land-preparation",
    tag: "LAND FORMING",
  },
  {
    num: "03",
    title: "SEEDING & FERTILIZATION",
    description: "Automatic seed cum fertilizer drills with precision fluted metering for accurate multi-crop sowing.",
    categorySlug: "seeding",
    tag: "SEEDING IMPLEMENTS",
  },
  {
    num: "04",
    title: "AGRICULTURAL TRANSPORT",
    description: "Heavy-duty hydraulic tipping farm trailers with ISMB steel chassis and multi-stage telescopic rams.",
    categorySlug: "transport",
    tag: "FARM LOGISTICS",
  },
  {
    num: "05",
    title: "CUSTOM FABRICATED ATTACHMENTS",
    description: "Tailor-made agricultural attachments and custom hitch dimensions fabricated to exact field specifications.",
    categorySlug: "custom",
    tag: "CUSTOM ENGINEERING",
  },
];

export function WhatWeBuild() {
  return (
    <Section surface="warm-white" spacing="default">
      <Container size="default">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Equipment Scope"
          title="WHAT WE MANUFACTURE."
          description="Explore our primary categories of agricultural implements and heavy tractor-mounted machinery."
        />

        {/* Editorial Category Rows */}
        <Stagger className="mt-14 flex flex-col divide-y divide-black/10">
          {PRODUCT_SECTORS.map((sector) => (
            <StaggerItem key={sector.num}>
              <Link
                href={`/products?category=${sector.categorySlug}`}
                className="group py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center hover:bg-black/[0.02] transition-colors rounded-[8px] px-4"
              >
                {/* Number & Tag (3 cols) */}
                <div className="md:col-span-3 flex items-baseline gap-4">
                  <span className="font-display text-3xl sm:text-4xl font-bold text-black/25 group-hover:text-[#C8913D] transition-colors duration-300">
                    {sector.num}
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-[#2F6B45] font-semibold uppercase">
                    {sector.tag}
                  </span>
                </div>

                {/* Title & Description (8 cols) */}
                <div className="md:col-span-8 flex flex-col gap-1.5">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#151A17] tracking-tight group-hover:text-[#173B2C] group-hover:translate-x-1 transition-all duration-300">
                    {sector.title}
                  </h3>
                  <p className="text-body text-[#6E746F] leading-relaxed max-w-2xl font-sans">
                    {sector.description}
                  </p>
                </div>

                {/* Arrow Action (1 col) */}
                <div className="md:col-span-1 flex justify-end">
                  <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-[#151A17] group-hover:bg-[#173B2C] group-hover:text-[#F4F1E8] transition-all duration-300">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
