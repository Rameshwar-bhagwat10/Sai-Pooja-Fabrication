"use client";

import * as React from "react";
import { type InquiryFormData, type InquiryFormErrors, type InquiryType } from "@/types/contact";
import { ALL_PRODUCTS } from "@/data/products";
import { Button } from "@/components/ui/button";

export interface InquiryFormProps {
  inquiryType: InquiryType;
  formData: InquiryFormData;
  errors: InquiryFormErrors;
  onChange: (field: keyof InquiryFormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function InquiryForm({
  inquiryType,
  formData,
  errors,
  onChange,
  onSubmit,
}: InquiryFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6" noValidate>
      {/* 02 // REQUIREMENT DETAILS */}
      <div className="flex flex-col gap-4">
        <label className="text-xs font-mono text-[#D8D9D3] uppercase tracking-wider block font-bold">
          02 // REQUIREMENT DETAILS
        </label>

        {/* Product selector if Product Enquiry */}
        {inquiryType === "product" && (
          <div className="flex flex-col gap-1.5">
            <label htmlFor="product-select" className="text-small font-bold text-[#F4F1E8]">
              Select Agricultural Implement <span className="text-[#C8913D]">*</span>
            </label>
            <select
              id="product-select"
              value={formData.selectedProduct}
              onChange={(e) => onChange("selectedProduct", e.target.value)}
              className="w-full px-4 py-3 rounded-[10px] bg-white/5 border border-white/15 text-[#F4F1E8] focus:border-[#C8913D] focus:outline-none focus:ring-1 focus:ring-[#C8913D] font-sans text-small"
            >
              <option value="" className="bg-[#151A17] text-[#D8D9D3]">
                -- Select an Implement --
              </option>
              {ALL_PRODUCTS.map((prod) => (
                <option key={prod.id} value={prod.name} className="bg-[#151A17] text-[#F4F1E8]">
                  {prod.name} ({prod.categoryGroup})
                </option>
              ))}
            </select>
            {errors.selectedProduct && (
              <span className="text-xs text-red-400 font-mono mt-1">
                {errors.selectedProduct}
              </span>
            )}
          </div>
        )}

        {/* Custom Requirement specifics if Custom Fabrication */}
        {inquiryType === "custom-fabrication" && (
          <div className="p-4 rounded-[10px] bg-[#173B2C]/60 border border-white/10 text-xs text-[#D8D9D3] font-mono leading-relaxed">
            <span className="text-[#C8913D] font-bold block mb-1">
              CUSTOM FABRICATION SPECIFICATION:
            </span>
            Please describe your tractor HP, hitch linkage type, crop row spacing, or attach any dimensions.
          </div>
        )}

        {/* Requirement textarea */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="requirement-text" className="text-small font-bold text-[#F4F1E8]">
            Describe Your Farm / Equipment Requirement <span className="text-[#C8913D]">*</span>
          </label>
          <textarea
            id="requirement-text"
            rows={4}
            value={formData.requirement}
            onChange={(e) => onChange("requirement", e.target.value)}
            placeholder="E.g., I am looking for a 2-bottom reversible plough for my 55 HP tractor in black cotton soil..."
            className={`w-full px-4 py-3 rounded-[10px] bg-white/5 border text-[#F4F1E8] placeholder:text-[#D8D9D3]/40 focus:outline-none focus:ring-1 font-sans text-small ${
              errors.requirement
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-white/15 focus:border-[#C8913D] focus:ring-[#C8913D]"
            }`}
          />
          {errors.requirement && (
            <span className="text-xs text-red-400 font-mono mt-1">
              {errors.requirement}
            </span>
          )}
        </div>
      </div>

      {/* 03 // CONTACT DETAILS */}
      <div className="flex flex-col gap-4 pt-4 border-t border-white/10">
        <label className="text-xs font-mono text-[#D8D9D3] uppercase tracking-wider block font-bold">
          03 // YOUR CONTACT DETAILS
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="user-name" className="text-small font-bold text-[#F4F1E8]">
              Your Name <span className="text-[#C8913D]">*</span>
            </label>
            <input
              id="user-name"
              type="text"
              value={formData.name}
              onChange={(e) => onChange("name", e.target.value)}
              placeholder="Full Name"
              className={`w-full px-4 py-3 rounded-[10px] bg-white/5 border text-[#F4F1E8] placeholder:text-[#D8D9D3]/40 focus:outline-none focus:ring-1 font-sans text-small ${
                errors.name
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-white/15 focus:border-[#C8913D] focus:ring-[#C8913D]"
              }`}
            />
            {errors.name && (
              <span className="text-xs text-red-400 font-mono mt-1">
                {errors.name}
              </span>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="user-phone" className="text-small font-bold text-[#F4F1E8]">
              Phone / Mobile Number <span className="text-[#C8913D]">*</span>
            </label>
            <input
              id="user-phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              placeholder="+91 98765 43210"
              className={`w-full px-4 py-3 rounded-[10px] bg-white/5 border text-[#F4F1E8] placeholder:text-[#D8D9D3]/40 focus:outline-none focus:ring-1 font-sans text-small ${
                errors.phone
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-white/15 focus:border-[#C8913D] focus:ring-[#C8913D]"
              }`}
            />
            {errors.phone && (
              <span className="text-xs text-red-400 font-mono mt-1">
                {errors.phone}
              </span>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="user-email" className="text-small font-bold text-[#F4F1E8]">
            Email Address <span className="text-xs text-[#D8D9D3]/60">(Optional)</span>
          </label>
          <input
            id="user-email"
            type="email"
            value={formData.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="name@example.com"
            className={`w-full px-4 py-3 rounded-[10px] bg-white/5 border text-[#F4F1E8] placeholder:text-[#D8D9D3]/40 focus:outline-none focus:ring-1 font-sans text-small ${
              errors.email
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-white/15 focus:border-[#C8913D] focus:ring-[#C8913D]"
            }`}
          />
          {errors.email && (
            <span className="text-xs text-red-400 font-mono mt-1">
              {errors.email}
            </span>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <Button variant="amber" size="lg" type="submit" showArrow className="w-full sm:w-auto">
          PREPARE ENQUIRY
        </Button>
        <span className="text-[11px] font-mono text-[#D8D9D3]/60 block mt-2">
          Your inquiry details will be prepared for instant WhatsApp or Email transmission.
        </span>
      </div>
    </form>
  );
}
