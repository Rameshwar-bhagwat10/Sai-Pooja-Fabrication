import * as React from "react";
import { constructMetadata } from "@/lib/metadata";
import { seoKeywordMap } from "@/config/seo";
import { BreadcrumbsJsonLd } from "@/components/seo/structured-data";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactMethods } from "@/components/contact/contact-methods";
import { InquirySection } from "@/components/contact/inquiry-section";
import { ContactLocation } from "@/components/contact/contact-location";
import { ContactFaq } from "@/components/contact/contact-faq";
import { ContactCta } from "@/components/contact/contact-cta";

export const metadata = constructMetadata({
  title: seoKeywordMap.contact.title,
  description: seoKeywordMap.contact.description,
  canonical: "/contact",
  keywords: seoKeywordMap.contact.keywords,
});

export default function ContactPage() {
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Contact & Factory Inquiries", url: "/contact" },
  ];

  return (
    <>
      <BreadcrumbsJsonLd items={breadcrumbItems} />

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
