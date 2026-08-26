"use client";

import * as React from "react";
import { MessageSquare, Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/animations/stagger";
import { COMPANY_INFO } from "@/data/company";

export function ContactMethods() {
  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(
    "Hello Sai Pooja Fabrication, I would like to inquire about your agricultural implements and fabrication capabilities."
  )}`;

  const METHODS = [
    {
      id: "whatsapp",
      title: "WHATSAPP CONSULTATION",
      subtitle: "Instant response for pricing, photos, and quick quotes",
      actionText: "Chat on WhatsApp",
      detail: `+91 ${COMPANY_INFO.whatsapp.slice(-10, -5)} ${COMPANY_INFO.whatsapp.slice(-5)}`,
      href: whatsappUrl,
      isExternal: true,
      icon: MessageSquare,
      accentColor: "text-[#2F6B45]",
    },
    {
      id: "phone",
      title: "DIRECT WORKSHOP CALL",
      subtitle: "Speak directly with our technical fabrication engineers",
      actionText: "Call Now",
      detail: COMPANY_INFO.phone,
      href: `tel:${COMPANY_INFO.phone.replace(/[^0-9+]/g, "")}`,
      isExternal: false,
      icon: Phone,
      accentColor: "text-[#C8913D]",
    },
    {
      id: "email",
      title: "EMAIL INQUIRY",
      subtitle: "Send formal tender specs, implement drawings, or bulk orders",
      actionText: "Send Email",
      detail: COMPANY_INFO.email,
      href: `mailto:${COMPANY_INFO.email}`,
      isExternal: false,
      icon: Mail,
      accentColor: "text-[#151A17]",
    },
    {
      id: "location",
      title: "WORKSHOP & MANUFACTURING PLANT",
      subtitle: "Visit our fabrication plant during working hours",
      actionText: "Visit Guidelines",
      detail: `${COMPANY_INFO.address.line1}, ${COMPANY_INFO.address.city}, ${COMPANY_INFO.address.country}`,
      href: "#workshop-location",
      isExternal: false,
      icon: MapPin,
      accentColor: "text-[#151A17]",
    },
  ];

  return (
    <Section surface="warm-white" spacing="default">
      <Container size="default">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Direct Channels"
          title="HOW TO REACH US."
          description="Connect with us directly through your preferred channel for immediate technical assistance."
        />

        {/* Editorial Rows */}
        <Stagger className="mt-12 flex flex-col divide-y divide-black/10">
          {METHODS.map((method) => {
            const Icon = method.icon;
            return (
              <StaggerItem key={method.id}>
                <a
                  href={method.href}
                  target={method.isExternal ? "_blank" : undefined}
                  rel={method.isExternal ? "noopener noreferrer" : undefined}
                  className="group py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center hover:bg-black/[0.02] transition-colors rounded-[12px] px-4"
                >
                  {/* Icon & Title (5 cols) */}
                  <div className="md:col-span-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-[12px] bg-white border border-black/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                      <Icon className={`w-5 h-5 ${method.accentColor}`} />
                    </div>
                    <div>
                      <h3 className="font-display text-lg sm:text-xl font-bold text-[#151A17] tracking-tight group-hover:text-[#173B2C] transition-colors">
                        {method.title}
                      </h3>
                      <p className="text-xs font-mono text-[#6E746F] mt-0.5">
                        {method.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Detail Text (5 cols) */}
                  <div className="md:col-span-5">
                    <span className="font-mono text-small sm:text-base font-bold text-[#151A17]">
                      {method.detail}
                    </span>
                  </div>

                  {/* Action Link (2 cols) */}
                  <div className="md:col-span-2 flex items-center justify-end gap-2">
                    <span className="text-xs font-mono font-bold text-[#2F6B45] group-hover:text-[#173B2C] hidden sm:inline">
                      {method.actionText}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-black/5 flex items-center justify-center text-[#151A17] group-hover:bg-[#173B2C] group-hover:text-[#F4F1E8] transition-all duration-300">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </a>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </Section>
  );
}
