"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export interface ProductLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
  productName: string;
}

export function ProductLightbox({
  isOpen,
  onClose,
  images,
  currentIndex,
  onSelectIndex,
  productName,
}: ProductLightboxProps) {
  const prefersReduced = useReducedMotion();
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);

  // Keyboard navigation & Escape handling
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        onSelectIndex((currentIndex + 1) % images.length);
      } else if (e.key === "ArrowLeft") {
        onSelectIndex((currentIndex - 1 + images.length) % images.length);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, currentIndex, images.length, onClose, onSelectIndex]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${productName} Image Gallery Lightbox`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-[#090C0A]/95 backdrop-blur-md flex flex-col justify-between p-4 md:p-8 select-none"
        onClick={onClose}
      >
        {/* Top Header Bar */}
        <div
          className="flex items-center justify-between z-10 w-full max-w-6xl mx-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3 text-xs font-mono text-[#D8D9D3]">
            <span className="text-[#C8913D] font-bold uppercase">{productName}</span>
            <span>•</span>
            <span>
              IMAGE {String(currentIndex + 1).padStart(2, "0")} OF{" "}
              {String(images.length).padStart(2, "0")}
            </span>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close Lightbox"
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus-ring"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Center Image with Previous / Next Controls */}
        <div
          className="relative flex-1 flex items-center justify-center max-w-5xl w-full mx-auto my-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Previous Button */}
          {images.length > 1 && (
            <button
              type="button"
              aria-label="Previous Image"
              onClick={() => onSelectIndex((currentIndex - 1 + images.length) % images.length)}
              className="absolute left-2 md:left-4 z-20 p-3 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors focus-ring border border-white/10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Active Image */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: prefersReduced ? 1 : 0.96 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative w-full h-[60vh] md:h-[70vh] rounded-[12px] overflow-hidden"
          >
            <Image
              src={images[currentIndex]}
              alt={`${productName} Gallery Image ${currentIndex + 1}`}
              fill
              priority
              sizes="90vw"
              className="object-contain object-center"
            />
          </motion.div>

          {/* Next Button */}
          {images.length > 1 && (
            <button
              type="button"
              aria-label="Next Image"
              onClick={() => onSelectIndex((currentIndex + 1) % images.length)}
              className="absolute right-2 md:right-4 z-20 p-3 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors focus-ring border border-white/10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Bottom Thumbnail Strip */}
        {images.length > 1 && (
          <div
            className="flex items-center justify-center gap-3 z-10 overflow-x-auto py-2"
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((img, index) => {
              const isSelected = index === currentIndex;
              return (
                <button
                  key={index}
                  type="button"
                  aria-label={`Select Image ${index + 1}`}
                  onClick={() => onSelectIndex(index)}
                  className={`relative w-16 h-12 rounded-[6px] overflow-hidden border-2 transition-all shrink-0 focus-ring ${
                    isSelected
                      ? "border-[#C8913D] scale-105"
                      : "border-transparent opacity-50 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    sizes="64px"
                    className="object-cover object-center"
                  />
                </button>
              );
            })}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
