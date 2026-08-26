"use client";

import * as React from "react";
import { MessageSquare, Mail, Phone, RotateCcw, CheckCircle2 } from "lucide-react";
import { type InquiryFormData } from "@/types/contact";
import { COMPANY_INFO } from "@/data/company";
import { Button } from "@/components/ui/button";

export interface InquirySuccessProps {
  formData: InquiryFormData;
  onReset: () => void;
}

export function InquirySuccess({ formData, onReset }: InquirySuccessProps) {
  // Construct formatted WhatsApp message
  const whatsappText = `Hello Sai Pooja Fabrication,

I have prepared an inquiry:
• Type: ${formData.inquiryType.toUpperCase()}
${formData.selectedProduct ? `• Product: ${formData.selectedProduct}` : ""}
• Name: ${formData.name}
• Phone: ${formData.phone}
${formData.email ? `• Email: ${formData.email}` : ""}

Requirement:
${formData.requirement}`;

  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(whatsappText)}`;

  // Construct formatted mailto link
  const emailSubject = `Inquiry: ${formData.selectedProduct || formData.inquiryType.toUpperCase()} - ${formData.name}`;
  const emailBody = `Hello Sai Pooja Fabrication,

Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email || "Not provided"}
Inquiry Type: ${formData.inquiryType}
Product: ${formData.selectedProduct || "N/A"}

Requirement:
${formData.requirement}
`;

  const mailtoUrl = `mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  return (
    <div className="p-8 sm:p-10 rounded-[20px] bg-[#173B2C] border border-[#C8913D]/50 text-[#F4F1E8] shadow-2xl flex flex-col gap-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <CheckCircle2 className="w-8 h-8 text-[#C8913D] shrink-0" />
        <div>
          <span className="text-[10px] font-mono text-[#C8913D] uppercase tracking-widest block font-bold">
            DETAILS PREPARED
          </span>
          <h3 className="font-display text-2xl font-bold text-[#F4F1E8]">
            YOUR ENQUIRY IS READY TO SEND.
          </h3>
        </div>
      </div>

      <p className="text-small text-[#D8D9D3] leading-relaxed font-sans">
        We have structured your equipment requirements. Please select your preferred communication
        channel below to transmit your inquiry directly to our workshop team.
      </p>

      {/* Inquiry Summary Box */}
      <div className="p-5 rounded-[12px] bg-[#10271D]/90 border border-white/10 text-xs font-mono text-[#D8D9D3] space-y-1.5">
        <div className="flex justify-between border-b border-white/10 pb-1.5 mb-1.5">
          <span className="text-[#C8913D] font-bold">INQUIRY SUMMARY</span>
          <span className="uppercase">{formData.inquiryType}</span>
        </div>
        {formData.selectedProduct && (
          <div>
            <span className="text-[#6E746F]">Product: </span>
            <span className="text-white font-bold">{formData.selectedProduct}</span>
          </div>
        )}
        <div>
          <span className="text-[#6E746F]">Contact: </span>
          <span className="text-white">{formData.name} ({formData.phone})</span>
        </div>
        <div className="pt-1.5 text-[#D8D9D3]/80 line-clamp-3">
          <span className="text-[#6E746F]">Requirement: </span>
          {formData.requirement}
        </div>
      </div>

      {/* Action Triggers */}
      <div className="flex flex-col sm:flex-row gap-4 pt-2">
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
          <Button variant="amber" size="lg" className="w-full justify-center">
            <MessageSquare className="w-4 h-4 mr-2" />
            <span>CONTINUE ON WHATSAPP</span>
          </Button>
        </a>

        <a href={mailtoUrl} className="flex-1">
          <Button variant="outline-light" size="lg" className="w-full justify-center">
            <Mail className="w-4 h-4 mr-2 text-[#C8913D]" />
            <span>SEND VIA EMAIL</span>
          </Button>
        </a>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/10 flex-wrap gap-4 text-xs font-mono">
        <a
          href={`tel:${COMPANY_INFO.phone.replace(/[^0-9+]/g, "")}`}
          className="text-[#D8D9D3] hover:text-[#C8913D] flex items-center gap-1.5 transition-colors"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Or call directly: {COMPANY_INFO.phone}</span>
        </a>

        <button
          type="button"
          onClick={onReset}
          className="text-[#D8D9D3]/70 hover:text-white flex items-center gap-1.5 transition-colors focus-ring rounded"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Edit / Start Another Inquiry</span>
        </button>
      </div>
    </div>
  );
}
