"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export interface TextRevealProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
}

export function TextReveal({
  children,
  delay = 0,
  duration = 0.7,
  className,
  ...props
}: TextRevealProps) {
  const prefersReduced = useReducedMotion();

  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{
          opacity: 0,
          y: prefersReduced ? 0 : "100%",
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{ once: true, margin: "-40px" }}
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
