"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export interface RevealProps extends HTMLMotionProps<"div"> {
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  distance?: number;
}

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  distance = 32,
  className,
  ...props
}: RevealProps) {
  const prefersReduced = useReducedMotion();

  const getInitialOffset = () => {
    if (prefersReduced) return { x: 0, y: 0 };
    switch (direction) {
      case "up":
        return { x: 0, y: distance };
      case "down":
        return { x: 0, y: -distance };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      default:
        return { x: 0, y: distance };
    }
  };

  const initial = {
    opacity: 0,
    ...getInitialOffset(),
  };

  return (
    <motion.div
      initial={initial}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
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
  );
}
