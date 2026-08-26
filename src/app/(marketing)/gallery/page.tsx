import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";

export default function GalleryPage() {
  return (
    <Section surface="soft-white" spacing="default">
      <Container>
        <SectionHeading
          eyebrow="Visual Portfolio"
          title="Machinery & Workshop Gallery"
          description="High-resolution photography of fabricated agricultural equipment."
        />
      </Container>
    </Section>
  );
}
