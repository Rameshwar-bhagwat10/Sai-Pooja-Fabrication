"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export interface ParallaxProps extends React.HTMLAttributes<HTMLDivElement> {
  speed?: number; // e.g. -50 to 50
  className?: string;
}

export function Parallax({
  speed = 30,
  children,
  className,
  ...props
}: ParallaxProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? [0, 0] : [-speed, speed]
  );

  return (
    <div ref={ref} className={className} {...props}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
