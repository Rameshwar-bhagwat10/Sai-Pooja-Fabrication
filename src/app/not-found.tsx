import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Section surface="forest-900" spacing="cinematic" hasGridPattern className="min-h-screen flex items-center">
      <Container size="narrow">
        <div className="text-center flex flex-col items-center">
          <span className="text-micro font-mono text-[#C8913D] tracking-widest uppercase">
            ERROR 404
          </span>
          <h1 className="text-display text-[#F4F1E8] mt-4 mb-4">
            Page Not Found
          </h1>
          <p className="text-body text-[#D8D9D3] max-w-md mb-8">
            The page or equipment record you are looking for has been moved or does not exist.
          </p>
          <Link href="/">
            <Button variant="amber" size="lg" showArrow>
              RETURN TO HOME
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
