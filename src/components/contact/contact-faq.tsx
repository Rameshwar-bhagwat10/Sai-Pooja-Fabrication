"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { CONTACT_FAQS } from "@/data/contact";

export function ContactFaq() {
  const [openId, setOpenId] = React.useState<string | null>(CONTACT_FAQS[0]?.id || null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <Section surface="charcoal" spacing="default" hasGridPattern isDarkSurface>
      <Container size="narrow">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Common Questions"
          title="FREQUENTLY ASKED QUESTIONS."
          description="Direct answers regarding our agricultural equipment, fabrication process, customization, and orders."
          isDarkSurface
        />

        {/* Accordion List */}
        <div className="mt-12 flex flex-col gap-4">
          {CONTACT_FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-[16px] overflow-hidden border border-white/10 bg-[#10271D]/60 transition-colors"
              >
                <button
                  type="button"
                  id={`faq-btn-${faq.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-content-${faq.id}`}
                  onClick={() => toggleItem(faq.id)}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 focus-ring"
                >
                  <span className="font-display text-lg sm:text-xl font-bold text-[#F4F1E8] tracking-tight">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#C8913D] shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-[#C8913D] text-[#10271D]" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-content-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-btn-${faq.id}`}
                    className="px-6 sm:px-7 pb-6 sm:pb-7 pt-2 border-t border-white/10 text-small text-[#D8D9D3] leading-relaxed font-sans animate-fade-in"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
