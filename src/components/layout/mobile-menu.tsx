"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { type NavItem } from "./navbar";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  currentPath: string;
}

export function MobileMenu({
  isOpen,
  onClose,
  navItems,
  currentPath,
}: MobileMenuProps) {
  const router = useRouter();
  const prefersReduced = useReducedMotion();

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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.08,
        delayChildren: prefersReduced ? 0 : 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] as const },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 top-[65px] z-40 bg-black/80 backdrop-blur-md lg:hidden flex flex-col"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] as const }}
            className="w-full bg-[#10271D] border-b border-white/10 px-6 py-8 shadow-2xl flex-1 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Staggered Navigation Items */}
            <motion.nav
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-3"
            >
              {navItems.map((item) => {
                const isActive = currentPath === item.href;
                return (
                  <motion.div key={item.href} variants={itemVariants}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center justify-between text-2xl font-display font-bold py-3 px-4 rounded-[10px] transition-all tracking-tight",
                        isActive
                          ? "bg-[#173B2C] text-[#F4F1E8] border border-[#C8913D]/40"
                          : "text-[#D8D9D3] hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <span>{item.label.toUpperCase()}</span>
                      <ArrowRight
                        className={cn(
                          "w-5 h-5 transition-transform",
                          isActive ? "text-[#C8913D] translate-x-1" : "text-white/30"
                        )}
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>

            {/* Bottom Actions */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-4">
              <Button
                variant="amber"
                size="lg"
                showArrow
                className="w-full justify-center text-base"
                onClick={() => {
                  onClose();
                  router.push("/contact");
                }}
              >
                REQUEST EQUIPMENT QUOTE
              </Button>

              <div className="flex items-center justify-between text-xs font-mono text-[#D8D9D3]/70 pt-2">
                <span>SAI POOJA FABRICATION</span>
                <span className="text-[#C8913D]">ESTABLISHED EXCELLENCE</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
