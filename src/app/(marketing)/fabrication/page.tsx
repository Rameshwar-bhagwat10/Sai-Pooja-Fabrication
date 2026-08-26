import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";

export default function FabricationPage() {
  return (
    <Section surface="charcoal" spacing="default" isDarkSurface>
      <Container>
        <SectionHeading
          eyebrow="Workshop Capabilities"
          title="Industrial Fabrication Engineering"
          description="Precision cutting, robotic welding, and custom agricultural implements fabrication."
          isDarkSurface
        />
      </Container>
    </Section>
  );
}
