"use client";

import { useSyncExternalStore } from "react";

function subscribe(query: string) {
  return (callback: () => void) => {
    if (typeof window === "undefined") return () => {};
    const media = window.matchMedia(query);
    media.addEventListener("change", callback);
    return () => media.removeEventListener("change", callback);
  };
}

function getSnapshot(query: string) {
  return () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  };
}

function getServerSnapshot() {
  return false;
}

/**
 * Custom hook to match CSS media queries using React 19 recommended useSyncExternalStore.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    subscribe(query),
    getSnapshot(query),
    getServerSnapshot
  );
}
