"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export interface ImageRevealProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
  initialScale?: number;
}

export function ImageReveal({
  children,
  delay = 0.1,
  duration = 0.8,
  initialScale = 1.06,
  className,
  ...props
}: ImageRevealProps) {
  const prefersReduced = useReducedMotion();

  return (
    <div className="overflow-hidden rounded-[14px]">
      <motion.div
        initial={{
          opacity: 0,
          scale: prefersReduced ? 1 : initialScale,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: prefersReduced ? 0.2 : duration,
          delay,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    </div>
  );
}
