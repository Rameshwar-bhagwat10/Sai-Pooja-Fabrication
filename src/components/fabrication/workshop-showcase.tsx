import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";

export function WorkshopShowcase() {
  return (
    <Section surface="charcoal" spacing="default" hasGridPattern isDarkSurface>
      <Container>
        <SectionHeading
          eyebrow="Precision Infrastructure"
          title="Heavy Fabrication & Assembly Plant"
          description="High-capacity hydraulic presses, CNC shearing, and MIG welding stations."
          isDarkSurface
        />
      </Container>
    </Section>
  );
}
