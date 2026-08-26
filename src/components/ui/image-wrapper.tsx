"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type AspectRatio = "16/9" | "4/3" | "1/1" | "21/9" | "3/4" | "custom" | "auto";

export type OverlayVariant =
  | "none"
  | "dark-subtle"
  | "dark-strong"
  | "gradient-bottom"
  | "gradient-forest"
  | "amber-industrial";

export interface ImageWrapperProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  src: string;
  alt: string;
  aspectRatio?: AspectRatio;
  overlay?: OverlayVariant;
  hoverScale?: boolean;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  imageClassName?: string;
  caption?: string;
  technicalLabel?: string;
}

/**
 * Reusable Image wrapper with responsive aspect ratios, hover zoom, overlays, and fallback handling.
 */
export function ImageWrapper({
  src,
  alt,
  aspectRatio = "16/9",
  overlay = "none",
  hoverScale = true,
  priority = false,
  fill = true,
  width,
  height,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  className,
  imageClassName,
  caption,
  technicalLabel,
  ...props
}: ImageWrapperProps) {
  const [hasError, setHasError] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);

  const aspectRatioClass = {
    "16/9": "aspect-[16/9]",
    "4/3": "aspect-[4/3]",
    "1/1": "aspect-square",
    "21/9": "aspect-[21/9]",
    "3/4": "aspect-[3/4]",
    custom: "",
    auto: "aspect-auto",
  }[aspectRatio];

  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-[14px] bg-[#151A17]/10 group select-none",
        aspectRatioClass,
        className
      )}
      {...props}
    >
      {/* Technical Machinery Stamp / Label */}
      {technicalLabel && (
        <div className="absolute top-3 left-3 z-20 px-2 py-1 rounded bg-[#090C0A]/80 backdrop-blur-sm border border-white/10 text-[10px] uppercase font-mono tracking-widest text-[#C8913D]">
          {technicalLabel}
        </div>
      )}

      {/* Fallback Graphic when image is placeholder/error */}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#151A17] text-[#D8D9D3] p-4 text-center">
          <div className="w-12 h-12 rounded-full border border-[#C8913D]/40 flex items-center justify-center text-[#C8913D] mb-2 font-mono text-xs">
            SPF
          </div>
          <span className="text-small font-medium">{alt}</span>
          <span className="text-micro text-[#6E746F] mt-1">Sai Pooja Fabrication</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill={fill}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          priority={priority}
          sizes={sizes}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={cn(
            "object-cover transition-transform duration-700 ease-out",
            hoverScale && "group-hover:scale-105",
            !isLoaded && "blur-sm grayscale opacity-80",
            isLoaded && "blur-0 grayscale-0 opacity-100",
            imageClassName
          )}
        />
      )}

      {/* Overlays */}
      {overlay !== "none" && (
        <div
          className={cn("absolute inset-0 pointer-events-none z-10 transition-opacity duration-300", {
            "bg-black/25": overlay === "dark-subtle",
            "bg-black/60": overlay === "dark-strong",
            "bg-gradient-to-t from-[#090C0A]/90 via-[#090C0A]/30 to-transparent":
              overlay === "gradient-bottom",
            "bg-gradient-to-t from-[#10271D]/95 via-[#10271D]/40 to-transparent":
              overlay === "gradient-forest",
            "bg-gradient-to-t from-[#090C0A]/90 via-transparent to-[#C8913D]/10":
              overlay === "amber-industrial",
          })}
        />
      )}

      {/* Optional Caption */}
      {caption && (
        <figcaption className="absolute bottom-3 left-3 right-3 z-20 text-xs text-white/90 font-sans backdrop-blur-sm bg-black/40 px-3 py-1.5 rounded-[6px]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
