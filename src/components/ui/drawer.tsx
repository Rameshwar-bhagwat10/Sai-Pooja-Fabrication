"use client";

import * as React from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  side?: "left" | "right";
  children: React.ReactNode;
  className?: string;
}

export function Drawer({
  isOpen,
  onClose,
  title,
  side = "right",
  children,
  className,
}: DrawerProps) {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const slideDirection = side === "right" ? { x: "100%" } : { x: "-100%" };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={slideDirection}
            animate={{ x: 0 }}
            exit={slideDirection}
            transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={cn(
              "fixed top-0 bottom-0 z-10 w-full max-w-md bg-white p-6 shadow-2xl overflow-y-auto",
              side === "right" ? "right-0" : "left-0",
              className
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-black/[0.08] mb-6">
              {title && (
                <h3 className="font-display text-lg font-bold text-[#151A17]">
                  {title}
                </h3>
              )}
              <button
                onClick={onClose}
                className="rounded-[8px] p-2 text-[#6E746F] hover:bg-black/5 hover:text-[#151A17] focus-ring ml-auto"
                aria-label="Close drawer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
