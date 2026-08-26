"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { type GalleryItem } from "@/types/gallery";
import { Badge } from "@/components/ui/badge";

export interface GalleryLightboxProps {
  isOpen: boolean;
  currentItem: GalleryItem | null;
  items: GalleryItem[];
  onClose: () => void;
  onNavigate: (item: GalleryItem) => void;
}

export function GalleryLightbox({
  isOpen,
  currentItem,
  items,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const currentIndex = items.findIndex((it) => it.id === currentItem?.id);
  const totalCount = items.length;

  const handlePrev = React.useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(items[currentIndex - 1]);
    } else {
      onNavigate(items[items.length - 1]);
    }
  }, [currentIndex, items, onNavigate]);

  const handleNext = React.useCallback(() => {
    if (currentIndex < items.length - 1) {
      onNavigate(items[currentIndex + 1]);
    } else {
      onNavigate(items[0]);
    }
  }, [currentIndex, items, onNavigate]);

  // Keyboard navigation
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  // Body scroll lock
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !currentItem) return null;

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={currentItem.title}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#090C0A]/95 backdrop-blur-md z-0"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative z-10 w-full max-w-5xl bg-[#151A17] border border-white/10 rounded-[20px] overflow-hidden shadow-2xl flex flex-col"
        >
          {/* Top Bar: Counter & Close */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#10271D]">
            <div className="flex items-center gap-3">
              <Badge variant="amber" size="sm">
                {currentItem.categoryLabel}
              </Badge>
              <span className="text-xs font-mono text-[#D8D9D3]">
                {currentIndex + 1 < 10 ? `0${currentIndex + 1}` : currentIndex + 1} /{" "}
                {totalCount < 10 ? `0${totalCount}` : totalCount}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close image viewer"
              className="p-2 rounded-full text-[#D8D9D3] hover:text-[#F4F1E8] hover:bg-white/10 transition-colors focus-ring"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Large Image Frame */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-[#090C0A] flex items-center justify-center overflow-hidden">
            <Image
              src={currentItem.image}
              alt={currentItem.title}
              fill
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-contain object-center"
              priority
            />

            {/* Navigation Arrows */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white/80 hover:text-white backdrop-blur-sm border border-white/10 transition-colors focus-ring"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white/80 hover:text-white backdrop-blur-sm border border-white/10 transition-colors focus-ring"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Bar: Title, Description & Action */}
          <div className="p-6 bg-[#151A17] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-xl font-bold text-[#F4F1E8] mb-1">
                {currentItem.title}
              </h3>
              <p className="text-small text-[#D8D9D3] font-sans">
                {currentItem.description}
              </p>
            </div>

            {currentItem.productSlug && (
              <div className="shrink-0">
                <Link
                  href={`/products/${currentItem.productSlug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[8px] bg-[#173B2C] border border-white/10 text-xs font-mono font-bold text-[#F4F1E8] hover:bg-[#2F6B45] transition-colors"
                >
                  <span>VIEW PRODUCT DETAILS</span>
                  <ArrowUpRight className="w-4 h-4 text-[#C8913D]" />
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
