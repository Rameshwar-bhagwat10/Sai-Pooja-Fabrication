"use client";

import * as React from "react";
import { type InquiryType } from "@/types/contact";
import { INQUIRY_TYPE_OPTIONS } from "@/data/contact";

export interface InquiryTypeSelectorProps {
  selectedType: InquiryType;
  onSelectType: (type: InquiryType) => void;
}

export function InquiryTypeSelector({
  selectedType,
  onSelectType,
}: InquiryTypeSelectorProps) {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-xs font-mono text-[#D8D9D3] uppercase tracking-wider block font-bold mb-1">
        01 // SELECT INQUIRY TYPE
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {INQUIRY_TYPE_OPTIONS.map((option) => {
          const isSelected = selectedType === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelectType(option.id)}
              className={`text-left p-5 rounded-[14px] border transition-all duration-300 focus-ring ${
                isSelected
                  ? "bg-[#173B2C] border-[#C8913D] shadow-md text-[#F4F1E8]"
                  : "bg-white/5 border-white/10 hover:bg-white/[0.08] hover:border-white/20 text-[#D8D9D3]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-[#C8913D] uppercase tracking-wider font-bold">
                  {option.subtitle}
                </span>
                <div
                  className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                    isSelected
                      ? "border-[#C8913D] bg-[#C8913D]"
                      : "border-white/30 bg-transparent"
                  }`}
                >
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#10271D]" />}
                </div>
              </div>

              <h4 className="font-display text-base font-bold tracking-tight mb-1 text-[#F4F1E8]">
                {option.title}
              </h4>

              <p className="text-xs text-[#D8D9D3]/80 leading-relaxed font-sans">
                {option.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
