"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export interface FadeUpProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
  distance?: number;
}

export function FadeUp({
  children,
  delay = 0,
  duration = 0.65,
  distance = 24,
  className,
  ...props
}: FadeUpProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: prefersReduced ? 0 : distance,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true, margin: "-60px" }}
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
  );
}
