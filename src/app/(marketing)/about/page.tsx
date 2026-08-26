import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";

export default function AboutPage() {
  return (
    <Section surface="soft-white" spacing="default">
      <Container>
        <SectionHeading
          eyebrow="Company Overview"
          title="About Sai Pooja Fabrication"
          description="Agricultural implements and precision fabrication engineering."
        />
      </Container>
    </Section>
  );
}
