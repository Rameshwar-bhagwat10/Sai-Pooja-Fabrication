/**
 * Sai Pooja Fabrication — Design System Constants & Tokens
 *
 * Centralized design tokens for colors, typography, spacing,
 * surfaces, motion timing, and responsive breakpoints.
 */

export const BRAND_COLORS = {
  forest900: "#10271D",
  forest800: "#173B2C",
  forest600: "#2F6B45",
  black: "#090C0A",
  charcoal: "#151A17",
  slate: "#252C28",
  warmGray: "#6E746F",
  lightGray: "#D8D9D3",
  warmWhite: "#F4F1E8",
  softWhite: "#FAFAF7",
  amberForge: "#C8913D",
  semantic: {
    success: "#3D8B5A",
    warning: "#C8913D",
    error: "#B84A45",
    info: "#557A91",
  },
} as const;

export const MOTION_DURATIONS = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.4,
  slow: 0.7,
  cinematic: 1.0,
} as const;

export const MOTION_EASINGS = {
  easeOut: [0.21, 0.47, 0.32, 0.98] as const,
  easeInOut: [0.65, 0, 0.35, 1] as const,
  spring: { type: "spring", stiffness: 300, damping: 25 } as const,
} as const;

export const BREAKPOINTS = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1440px",
} as const;

export const CONTAINER_MAX_WIDTH = "1440px";

export const SPACING_SCALE = {
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  6: "24px",
  8: "32px",
  12: "48px",
  16: "64px",
  20: "80px",
  24: "96px",
  32: "128px",
  40: "160px",
} as const;

export type SurfaceVariant =
  | "soft-white"
  | "warm-white"
  | "charcoal"
  | "forest-900"
  | "forest-800"
  | "transparent";
