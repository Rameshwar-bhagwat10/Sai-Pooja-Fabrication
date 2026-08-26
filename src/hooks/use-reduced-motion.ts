"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * Custom hook to detect if user has requested reduced motion.
 * Integrates React 19 useSyncExternalStore and Framer Motion context.
 */
export function useReducedMotion(): boolean {
  const framerPreference = useFramerReducedMotion();
  const systemPreference = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  return Boolean(framerPreference || systemPreference);
}
