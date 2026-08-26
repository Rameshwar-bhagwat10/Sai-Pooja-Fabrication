import * as React from "react";
import { constructMetadata } from "@/lib/metadata";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactMethods } from "@/components/contact/contact-methods";
import { InquirySection } from "@/components/contact/inquiry-section";
import { ContactLocation } from "@/components/contact/contact-location";
import { ContactFaq } from "@/components/contact/contact-faq";
import { ContactCta } from "@/components/contact/contact-cta";

export const metadata = constructMetadata({
  title: "Contact & Factory Inquiries | Sai Pooja Fabrication",
  description:
    "Get in touch with Sai Pooja Fabrication. Request quotes for agricultural implements, tractor attachments, or custom fabrication engineering via WhatsApp, phone, or direct inquiry.",
});

export default function ContactPage() {
  return (
    <>
      {/* 1. Contact Hero */}
      <ContactHero />

      {/* 2. Direct Contact Channels */}
      <ContactMethods />

      {/* 3. Interactive Query-Aware Inquiry Form (wrapped in Suspense for useSearchParams) */}
      <React.Suspense
        fallback={
          <div className="py-24 text-center bg-[#10271D] text-[#F4F1E8] font-mono text-sm">
            Loading inquiry interface...
          </div>
        }
      >
        <InquirySection />
      </React.Suspense>

      {/* 4. Plant Location & Visitor Desk */}
      <ContactLocation />

      {/* 5. Frequently Asked Questions (Accordion) */}
      <ContactFaq />

      {/* 6. Final Contact CTA */}
      <ContactCta />
    </>
  );
}
