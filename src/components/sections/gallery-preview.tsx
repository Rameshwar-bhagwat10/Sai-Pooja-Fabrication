"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ImageWrapper } from "@/components/ui/image-wrapper";
import { Stagger, StaggerItem } from "@/components/animations/stagger";
import { SAMPLE_GALLERY_ITEMS } from "@/data/gallery";

export function GalleryPreview() {
  return (
    <Section surface="soft-white" spacing="default">
      <Container size="default">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <SectionHeading
            eyebrow="Visual Portfolio"
            title="MACHINERY & WORKSHOP GALLERY"
            description="A visual look at our manufactured implements, precision welding stations, and equipment undergoing field trials."
          />

          <div className="shrink-0">
            <Link href="/gallery">
              <Button variant="outline" showArrow>
                VIEW FULL GALLERY
              </Button>
            </Link>
          </div>
        </div>

        {/* Asymmetrical Editorial Photo Composition */}
        <Stagger className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Item 1: Wide Aspect (7 cols) */}
          <StaggerItem className="md:col-span-7">
            <ImageWrapper
              src={SAMPLE_GALLERY_ITEMS[0]?.image || "/images/workshop/steel-fabrication.svg"}
              alt={SAMPLE_GALLERY_ITEMS[0]?.title || "Precision Welding"}
              aspectRatio="16/9"
              overlay="gradient-bottom"
              technicalLabel="ASSEMBLY // 01"
              caption={SAMPLE_GALLERY_ITEMS[0]?.title}
            />
          </StaggerItem>

          {/* Item 2: Standard Aspect (5 cols) */}
          <StaggerItem className="md:col-span-5">
            <ImageWrapper
              src={SAMPLE_GALLERY_ITEMS[1]?.image || "/images/products/plough/plough-main.svg"}
              alt={SAMPLE_GALLERY_ITEMS[1]?.title || "Frame Welding"}
              aspectRatio="4/3"
              overlay="gradient-bottom"
              technicalLabel="WELDING // 02"
              caption={SAMPLE_GALLERY_ITEMS[1]?.title}
            />
          </StaggerItem>

          {/* Item 3: Standard Aspect (5 cols) */}
          <StaggerItem className="md:col-span-5">
            <ImageWrapper
              src={SAMPLE_GALLERY_ITEMS[2]?.image || "/images/products/rotavator/rotavator-main.svg"}
              alt={SAMPLE_GALLERY_ITEMS[2]?.title || "Seed Drill Metering"}
              aspectRatio="4/3"
              overlay="gradient-bottom"
              technicalLabel="CALIBRATION // 03"
              caption={SAMPLE_GALLERY_ITEMS[2]?.title}
            />
          </StaggerItem>

          {/* Item 4: Wide Aspect (7 cols) */}
          <StaggerItem className="md:col-span-7">
            <ImageWrapper
              src={SAMPLE_GALLERY_ITEMS[3]?.image || "/images/products/farm-trailer/farm-trailer-main.svg"}
              alt={SAMPLE_GALLERY_ITEMS[3]?.title || "Trailer Chassis"}
              aspectRatio="16/9"
              overlay="gradient-bottom"
              technicalLabel="FINISHING // 04"
              caption={SAMPLE_GALLERY_ITEMS[3]?.title}
            />
          </StaggerItem>
        </Stagger>
      </Container>
    </Section>
  );
}
