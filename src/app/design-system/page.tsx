"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TextLink } from "@/components/ui/text-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ProductCard } from "@/components/products/product-card";
import { ImageWrapper } from "@/components/ui/image-wrapper";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { FormField, SubmitButton } from "@/components/ui/form-field";
import { FadeUp } from "@/components/animations/fade-up";
import { Stagger, StaggerItem } from "@/components/animations/stagger";
import { ImageReveal } from "@/components/animations/image-reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SAMPLE_PRODUCTS } from "@/data/products";

export default function DesignSystemShowcasePage() {
  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    product: "rotavator",
    message: "",
  });

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#151A17] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-24 pb-32">
        {/* =================================================================
            HERO / OVERVIEW
            ================================================================= */}
        <Section surface="forest-900" spacing="cinematic" hasGridPattern>
          <Container>
            <div className="max-w-4xl">
              <FadeUp>
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="amber" size="lg" dot>
                    Phase 1 UI Foundation
                  </Badge>
                  <span className="text-micro text-[#D8D9D3]">
                    Sai Pooja Fabrication
                  </span>
                </div>
              </FadeUp>

              <TextReveal delay={0.1}>
                <h1 className="text-display text-[#F4F1E8] mb-6">
                  Design System & UI Primitives
                </h1>
              </TextReveal>

              <FadeUp delay={0.2}>
                <p className="text-body-lg text-[#D8D9D3] leading-relaxed max-w-2xl">
                  A high-performance, token-driven UI framework built for heavy-duty
                  agricultural engineering and precision fabrication.
                </p>
              </FadeUp>

              <FadeUp delay={0.3} className="mt-8 flex flex-wrap gap-4 items-center">
                <Button variant="amber" size="lg" showArrow>
                  EXPLORE TOKENS
                </Button>
                <Button variant="outline-light" size="lg">
                  VIEW DOCUMENTATION
                </Button>
              </FadeUp>
            </div>
          </Container>
        </Section>

        {/* =================================================================
            1. BRAND COLORS & NEUTRALS
            ================================================================= */}
        <Section surface="soft-white" spacing="default">
          <Container>
            <SectionHeading
              eyebrow="Color Architecture"
              title="Semantic Color Palette & Tokens"
              description="A calibrated system of agricultural forest greens, industrial neutrals, and Forge Amber accents."
            />

            {/* Primary Brand Greens */}
            <div className="mt-12">
              <h3 className="text-small font-semibold text-[#6E746F] uppercase tracking-wider mb-4">
                Primary Brand Colors
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 rounded-[14px] bg-[#10271D] text-[#F4F1E8] shadow-md">
                  <div className="text-xs font-mono text-[#C8913D] uppercase tracking-widest">
                    Forest 900
                  </div>
                  <div className="text-2xl font-bold font-display mt-2">#10271D</div>
                  <p className="text-xs text-[#D8D9D3]/80 mt-2">
                    Darkest brand background, footer, deep industrial surfaces.
                  </p>
                </div>

                <div className="p-6 rounded-[14px] bg-[#173B2C] text-[#F4F1E8] shadow-md">
                  <div className="text-xs font-mono text-[#C8913D] uppercase tracking-widest">
                    Forest 800
                  </div>
                  <div className="text-2xl font-bold font-display mt-2">#173B2C</div>
                  <p className="text-xs text-[#D8D9D3]/80 mt-2">
                    Primary brand green, hero badges, major brand elements.
                  </p>
                </div>

                <div className="p-6 rounded-[14px] bg-[#2F6B45] text-[#F4F1E8] shadow-md">
                  <div className="text-xs font-mono text-[#F4F1E8]/70 uppercase tracking-widest">
                    Forest 600
                  </div>
                  <div className="text-2xl font-bold font-display mt-2">#2F6B45</div>
                  <p className="text-xs text-[#D8D9D3]/80 mt-2">
                    Action green, primary button hover, links, active indicators.
                  </p>
                </div>
              </div>
            </div>

            {/* Neutrals & Forge Amber */}
            <div className="mt-10">
              <h3 className="text-small font-semibold text-[#6E746F] uppercase tracking-wider mb-4">
                Industrial Neutrals & Forge Amber
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="p-4 rounded-[12px] bg-[#090C0A] text-[#F4F1E8] border border-black">
                  <div className="text-[10px] font-mono text-[#6E746F]">PURE BLACK</div>
                  <div className="font-bold text-sm mt-1">#090C0A</div>
                </div>

                <div className="p-4 rounded-[12px] bg-[#151A17] text-[#F4F1E8] border border-black">
                  <div className="text-[10px] font-mono text-[#6E746F]">CHARCOAL</div>
                  <div className="font-bold text-sm mt-1">#151A17</div>
                </div>

                <div className="p-4 rounded-[12px] bg-[#252C28] text-[#F4F1E8]">
                  <div className="text-[10px] font-mono text-[#D8D9D3]">SLATE</div>
                  <div className="font-bold text-sm mt-1">#252C28</div>
                </div>

                <div className="p-4 rounded-[12px] bg-[#6E746F] text-white">
                  <div className="text-[10px] font-mono text-white/70">WARM GRAY</div>
                  <div className="font-bold text-sm mt-1">#6E746F</div>
                </div>

                <div className="p-4 rounded-[12px] bg-[#F4F1E8] text-[#151A17] border border-black/10">
                  <div className="text-[10px] font-mono text-[#6E746F]">WARM WHITE</div>
                  <div className="font-bold text-sm mt-1">#F4F1E8</div>
                </div>

                <div className="p-4 rounded-[12px] bg-[#C8913D] text-[#090C0A] font-semibold">
                  <div className="text-[10px] font-mono text-[#090C0A]/70">FORGE AMBER</div>
                  <div className="font-bold text-sm mt-1">#C8913D</div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* =================================================================
            2. TYPOGRAPHY SYSTEM
            ================================================================= */}
        <Section surface="warm-white" spacing="default">
          <Container>
            <SectionHeading
              eyebrow="Typography Scale"
              title="Space Grotesk & Inter Hierarchy"
              description="Engineered for clear technical communication and impactful editorial statements."
            />

            <div className="mt-12 flex flex-col gap-8">
              <div className="p-6 bg-white rounded-[14px] border border-black/[0.08]">
                <span className="text-micro text-[#C8913D]">Display — clamp(3.5rem, 7vw, 7.5rem)</span>
                <div className="text-display text-[#151A17] mt-2">
                  ENGINEERED STRENGTH
                </div>
              </div>

              <div className="p-6 bg-white rounded-[14px] border border-black/[0.08]">
                <span className="text-micro text-[#C8913D]">H1 — clamp(2.75rem, 5vw, 5rem)</span>
                <div className="text-h1 text-[#151A17] mt-2">
                  Agricultural Implements Built to Last
                </div>
              </div>

              <div className="p-6 bg-white rounded-[14px] border border-black/[0.08]">
                <span className="text-micro text-[#C8913D]">H2 — clamp(2rem, 3.5vw, 3.25rem)</span>
                <div className="text-h2 text-[#151A17] mt-2">
                  High-Precision Fabrication & Assembly
                </div>
              </div>

              <div className="p-6 bg-white rounded-[14px] border border-black/[0.08]">
                <span className="text-micro text-[#C8913D]">H3 — clamp(1.35rem, 2vw, 2rem)</span>
                <div className="text-h3 text-[#151A17] mt-2">
                  Heavy-Duty Hydraulic Reversible Plough
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white rounded-[14px] border border-black/[0.08]">
                  <span className="text-micro text-[#C8913D]">Body Large — 1.25rem</span>
                  <p className="text-body-lg text-[#151A17] mt-2">
                    Engineered to handle severe soil resistance with seamless boxed steel construction.
                  </p>
                </div>

                <div className="p-6 bg-white rounded-[14px] border border-black/[0.08]">
                  <span className="text-micro text-[#C8913D]">Body Regular — 1.0rem</span>
                  <p className="text-body text-[#6E746F] mt-2">
                    Standard descriptive paragraphs for equipment capabilities, maintenance guides, and farm operations.
                  </p>
                </div>

                <div className="p-6 bg-white rounded-[14px] border border-black/[0.08]">
                  <span className="text-micro text-[#C8913D]">Small & Micro — 0.875rem / 0.75rem</span>
                  <p className="text-small text-[#6E746F] mt-2">
                    Technical specifications, weight tolerances, and torque ratings.
                  </p>
                  <p className="text-micro text-[#173B2C] mt-3">
                    CAT-II 3-POINT LINKAGE COMPATIBLE
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* =================================================================
            3. BUTTONS, BADGES & INTERACTIVE LINKS
            ================================================================= */}
        <Section surface="charcoal" spacing="default">
          <Container>
            <SectionHeading
              eyebrow="Interactive Primitives"
              title="Buttons, Badges & Action Links"
              description="Tactile, accessible interactive components designed with purposeful micro-motion."
              isDarkSurface
            />

            {/* Button Variants */}
            <div className="mt-12">
              <h3 className="text-small font-semibold text-[#D8D9D3] uppercase tracking-wider mb-6">
                Button States & Variants
              </h3>
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="primary" showArrow>
                  PRIMARY BUTTON
                </Button>
                <Button variant="secondary" showArrow>
                  SECONDARY BUTTON
                </Button>
                <Button variant="amber" showArrow>
                  AMBER ACTION
                </Button>
                <Button variant="outline-light">
                  OUTLINE LIGHT
                </Button>
                <Button variant="ghost-light">
                  GHOST BUTTON
                </Button>
                <Button variant="primary" isLoading>
                  LOADING
                </Button>
                <Button variant="primary" disabled>
                  DISABLED
                </Button>
              </div>
            </div>

            {/* Badges */}
            <div className="mt-10">
              <h3 className="text-small font-semibold text-[#D8D9D3] uppercase tracking-wider mb-6">
                Badge Variants
              </h3>
              <div className="flex flex-wrap gap-3 items-center">
                <Badge variant="forest">FOREST BADGE</Badge>
                <Badge variant="amber" dot>AMBER ACCENT</Badge>
                <Badge variant="charcoal">CHARCOAL</Badge>
                <Badge variant="neutral">NEUTRAL</Badge>
                <Badge variant="outline-light">OUTLINE</Badge>
                <Badge variant="success">FABRICATED</Badge>
                <Badge variant="warning">UNDER LOAD</Badge>
                <Badge variant="error">MAINTENANCE</Badge>
              </div>
            </div>

            {/* Links */}
            <div className="mt-10">
              <h3 className="text-small font-semibold text-[#D8D9D3] uppercase tracking-wider mb-6">
                Animated Text Links
              </h3>
              <div className="flex flex-wrap gap-8 items-center">
                <TextLink href="#products" variant="amber">
                  VIEW EQUIPMENT CATALOG
                </TextLink>
                <TextLink href="#fabrication" variant="light">
                  WORKSHOP CAPABILITIES
                </TextLink>
                <TextLink href="https://google.com" variant="amber" isExternal>
                  DOWNLOAD SPEC SHEET (PDF)
                </TextLink>
              </div>
            </div>
          </Container>
        </Section>

        {/* =================================================================
            4. CARDS & PRODUCT CARD PRIMITIVE
            ================================================================= */}
        <Section surface="soft-white" spacing="default">
          <Container>
            <SectionHeading
              eyebrow="Card System"
              title="Structural & Product Cards"
              description="Modular cards engineered for agricultural implements, technical specs, and engineering previews."
            />

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {SAMPLE_PRODUCTS.map((prod) => (
                <ProductCard key={prod.id} {...prod} />
              ))}
            </div>

            {/* Feature Cards Grid */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card variant="default">
                <CardHeader>
                  <Eyebrow variant="forest">ENGINEERING</Eyebrow>
                  <CardTitle className="mt-2">High-Tensile Steel</CardTitle>
                  <CardDescription>
                    Fabricated with ISMB structural channels and boron wear points.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-small text-[#6E746F]">
                    Engineered to absorb severe impact in stony soil conditions without structural distortion.
                  </p>
                </CardContent>
                <CardFooter>
                  <TextLink href="/fabrication" variant="brand">
                    EXPLORE METALLURGY
                  </TextLink>
                </CardFooter>
              </Card>

              <Card variant="forest">
                <CardHeader>
                  <Eyebrow variant="amber">PRECISION</Eyebrow>
                  <CardTitle className="mt-2 text-[#F4F1E8]">MIG Robotic Welding</CardTitle>
                  <CardDescription className="text-[#D8D9D3]/80">
                    Uniform seam penetration and stress-relieved joints.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-small text-[#D8D9D3]/90">
                    Dual pass structural welding ensures high fatigue resistance under heavy tractor pulling loads.
                  </p>
                </CardContent>
                <CardFooter>
                  <TextLink href="/fabrication" variant="amber">
                    VIEW WORKSHOP
                  </TextLink>
                </CardFooter>
              </Card>

              <Card variant="dark">
                <CardHeader>
                  <Eyebrow variant="amber">CUSTOMIZATION</Eyebrow>
                  <CardTitle className="mt-2 text-[#F4F1E8]">Tractor HP Matching</CardTitle>
                  <CardDescription className="text-[#D8D9D3]/80">
                    Custom implements calibrated for 35 HP to 90+ HP tractors.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-small text-[#D8D9D3]/90">
                    Hitch geometry and tine angles calibrated for specific horsepower classes.
                  </p>
                </CardContent>
                <CardFooter>
                  <TextLink href="/contact" variant="amber">
                    INQUIRE CUSTOM BUILD
                  </TextLink>
                </CardFooter>
              </Card>
            </div>
          </Container>
        </Section>

        {/* =================================================================
            5. FORM PRIMITIVES
            ================================================================= */}
        <Section surface="warm-white" spacing="default">
          <Container size="narrow">
            <SectionHeading
              eyebrow="Form Components"
              title="Accessible Form Primitives"
              description="Input controls styled with accessible focus-visible indicators, error validation, and clean layout wrappers."
              align="center"
            />

            <div className="mt-12 p-8 sm:p-10 bg-white rounded-[16px] border border-black/[0.08] shadow-sm">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col gap-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField label="Your Full Name" htmlFor="name" required>
                    <Input
                      id="name"
                      placeholder="e.g. Rameshwar Patil"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </FormField>

                  <FormField
                    label="Mobile Number"
                    htmlFor="phone"
                    required
                    hint="We will contact you via phone or WhatsApp"
                  >
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </FormField>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField label="Select Equipment" htmlFor="product" required>
                    <Select
                      id="product"
                      value={formData.product}
                      onChange={(e) =>
                        setFormData({ ...formData, product: e.target.value })
                      }
                      options={[
                        { value: "plough", label: "Hydraulic Reversible Plough" },
                        { value: "cultivator", label: "Rigid Cultivator" },
                        { value: "rotavator", label: "Multi-Speed Rotavator" },
                        { value: "farm-trailer", label: "Tipping Farm Trailer" },
                        { value: "custom", label: "Custom Fabricated Equipment" },
                      ]}
                    />
                  </FormField>

                  <FormField
                    label="Demonstration Error Field"
                    htmlFor="error-demo"
                    error="Please specify required tractor HP class"
                  >
                    <Input
                      id="error-demo"
                      placeholder="e.g. 50 HP"
                      error
                    />
                  </FormField>
                </div>

                <FormField
                  label="Inquiry / Requirement Details"
                  htmlFor="message"
                >
                  <Textarea
                    id="message"
                    rows={4}
                    placeholder="Provide details such as tractor model, soil type, or custom dimensions required..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />
                </FormField>

                <div className="pt-2">
                  <SubmitButton>SUBMIT INQUIRY</SubmitButton>
                </div>
              </form>
            </div>
          </Container>
        </Section>

        {/* =================================================================
            6. IMAGE WRAPPER & MOTION DEMO
            ================================================================= */}
        <Section surface="forest-800" spacing="default" hasGridPattern>
          <Container>
            <SectionHeading
              eyebrow="Motion & Media"
              title="Animation Primitives & Image Foundation"
              description="Demonstrating FadeUp, Stagger, ImageReveal, and responsive Next.js Image wrapper overlays."
              isDarkSurface
            />

            <Stagger className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <StaggerItem>
                <ImageReveal delay={0.1}>
                  <ImageWrapper
                    src="/images/products/plough/hydraulic-plough.jpg"
                    alt="Hydraulic Reversible Plough"
                    aspectRatio="16/9"
                    overlay="amber-industrial"
                    technicalLabel="BORON-STEEL // 01"
                    caption="Hydraulic Plough with precision turnover"
                  />
                </ImageReveal>
              </StaggerItem>

              <StaggerItem>
                <ImageReveal delay={0.2}>
                  <ImageWrapper
                    src="/images/products/rotavator/rotavator-main.jpg"
                    alt="Multi-Speed Rotavator"
                    aspectRatio="16/9"
                    overlay="gradient-forest"
                    technicalLabel="HEAVY-GEAR // 02"
                    caption="Multi-speed gear drive rotor"
                  />
                </ImageReveal>
              </StaggerItem>

              <StaggerItem>
                <ImageReveal delay={0.3}>
                  <ImageWrapper
                    src="/images/products/farm-trailer/farm-trailer-main.jpg"
                    alt="Farm Trailer"
                    aspectRatio="16/9"
                    overlay="gradient-bottom"
                    technicalLabel="STRUCTURAL-STEEL // 03"
                    caption="High capacity tipping trailer"
                  />
                </ImageReveal>
              </StaggerItem>
            </Stagger>
          </Container>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
