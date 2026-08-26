import React from "react";
import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#10271D] flex flex-col items-center justify-center relative overflow-hidden">
      <Container size="narrow">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Branded Vector Skeleton Spinner */}
          <div className="relative w-16 h-16 rounded-[14px] bg-[#173B2C] border border-[#C8913D]/40 flex items-center justify-center mb-6 animate-pulse">
            <svg
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-[#F4F1E8]"
            >
              <path
                d="M7 24L16 7L25 24H19L16 17L13 24H7Z"
                fill="#F4F1E8"
              />
              <circle cx="16" cy="18" r="2.2" fill="#C8913D" />
            </svg>
          </div>

          {/* Text and Skeleton Indicator */}
          <div className="space-y-2">
            <div className="text-sm font-mono font-bold uppercase tracking-[0.24em] text-[#C8913D]">
              SAI POOJA FABRICATION
            </div>
            <div className="text-xs text-[#D8D9D3] font-mono tracking-widest uppercase">
              Loading Equipment Catalogue...
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
