"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function HeroScrollIndicator() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="flex flex-col items-center gap-2 select-none pointer-events-none">
      <span className="text-[10px] font-mono tracking-[0.25em] text-[#D8D9D3]/70 uppercase">
        SCROLL
      </span>
      <div className="w-px h-10 bg-white/20 relative overflow-hidden rounded-full">
        {!prefersReduced && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "100%" }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-full h-1/2 bg-[#C8913D]"
          />
        )}
      </div>
    </div>
  );
}
