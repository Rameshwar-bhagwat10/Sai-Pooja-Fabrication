"use client";

import * as React from "react";
import { MapPin, Clock, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { FadeUp } from "@/components/animations/fade-up";
import { COMPANY_INFO } from "@/data/company";

export function ContactLocation() {
  return (
    <Section surface="warm-white" spacing="default" id="workshop-location">
      <Container size="default">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Plant Location"
          title="VISIT OUR FABRICATION PLANT."
          description="Farmers, dealers, and agricultural operators are welcome to inspect machinery and discuss custom fabrications."
        />

        {/* Location Info Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Address Card */}
          <FadeUp>
            <div className="h-full p-8 rounded-[16px] bg-white border border-black/10 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-[10px] bg-[#173B2C]/10 flex items-center justify-center mb-6 text-[#173B2C]">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="font-display text-xl font-bold text-[#151A17] mb-2">
                  Plant Address
                </h3>
                <p className="text-small text-[#6E746F] leading-relaxed font-sans">
                  {COMPANY_INFO.name}
                  <br />
                  {COMPANY_INFO.address.line1}
                  <br />
                  {COMPANY_INFO.address.city}, {COMPANY_INFO.address.country}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-black/5 text-xs font-mono text-[#2F6B45] font-bold">
                MANUFACTURING FACILITY
              </div>
            </div>
          </FadeUp>

          {/* Operating Hours Card */}
          <FadeUp delay={0.1}>
            <div className="h-full p-8 rounded-[16px] bg-white border border-black/10 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-[10px] bg-[#C8913D]/15 flex items-center justify-center mb-6 text-[#C8913D]">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-display text-xl font-bold text-[#151A17] mb-2">
                  Working Hours
                </h3>
                <p className="text-small text-[#6E746F] leading-relaxed font-sans">
                  {COMPANY_INFO.operatingHours}
                  <br />
                  Sunday: Closed for maintenance
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-black/5 text-xs font-mono text-[#C8913D] font-bold">
                DIRECT VISITOR DESK OPEN
              </div>
            </div>
          </FadeUp>

          {/* Plant Visit Guidelines */}
          <FadeUp delay={0.2}>
            <div className="h-full p-8 rounded-[16px] bg-white border border-black/10 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-[10px] bg-[#173B2C]/10 flex items-center justify-center mb-6 text-[#173B2C]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-display text-xl font-bold text-[#151A17] mb-2">
                  Visit Guidance
                </h3>
                <p className="text-small text-[#6E746F] leading-relaxed font-sans">
                  Prior appointment is recommended if you wish to inspect specific implement models
                  or review custom CAD layout profiles with our technical engineers.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-black/5 text-xs font-mono text-[#2F6B45] font-bold">
                FACTORY DEMONSTRATIONS
              </div>
            </div>
          </FadeUp>
        </div>
      </Container>
    </Section>
  );
}
