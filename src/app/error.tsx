"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error cleanly for client diagnostics
    console.error("Global Application Error:", error);
  }, [error]);

  return (
    <Section
      surface="forest-900"
      spacing="cinematic"
      hasGridPattern
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <Container size="narrow">
        <div className="text-center flex flex-col items-center max-w-xl mx-auto py-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#173B2C] border border-[#C8913D]/40 text-[#C8913D] text-xs font-mono font-bold tracking-widest uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
            APPLICATION ERROR
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#F4F1E8] tracking-tight leading-tight mb-4">
            Something Unexpected <span className="text-[#C8913D]">Occurred</span>
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-[#D8D9D3] leading-relaxed mb-10 max-w-md">
            We encountered a temporary interface error. You can try refreshing the view or navigating back to our home page.
          </p>

          {/* Action Grid */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
            <Button
              variant="amber"
              size="lg"
              onClick={() => reset()}
              className="w-full sm:w-auto"
            >
              TRY AGAIN
            </Button>
            <Link href="/" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-[#F4F1E8]/30 text-[#F4F1E8] hover:bg-[#173B2C]"
              >
                RETURN HOME
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
