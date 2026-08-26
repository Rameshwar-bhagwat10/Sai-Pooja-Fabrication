import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";

export default function ContactPage() {
  return (
    <Section surface="soft-white" spacing="default">
      <Container size="narrow">
        <SectionHeading
          eyebrow="Get in Touch"
          title="Contact Sai Pooja Fabrication"
          description="Inquire about pricing, specifications, or custom fabrication projects."
        />
      </Container>
    </Section>
  );
}
