"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CarouselProps {
  children: React.ReactNode[];
  className?: string;
  autoPlay?: boolean;
  interval?: number;
}

export function Carousel({
  children,
  className,
  autoPlay = false,
  interval = 5000,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const total = children.length;

  const prev = () => setCurrentIndex((curr) => (curr === 0 ? total - 1 : curr - 1));
  const next = React.useCallback(() => setCurrentIndex((curr) => (curr === total - 1 ? 0 : curr + 1)), [total]);

  React.useEffect(() => {
    if (!autoPlay || total <= 1) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, next, total]);

  if (total === 0) return null;

  return (
    <div className={cn("relative w-full overflow-hidden rounded-[16px] group", className)}>
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {children.map((child, index) => (
          <div key={index} className="w-full shrink-0">
            {child}
          </div>
        ))}
      </div>

      {total > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100 focus-ring"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100 focus-ring"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
            {children.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === currentIndex ? "w-6 bg-[#C8913D]" : "w-2 bg-white/50"
                )}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
