"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Maximize2 } from "lucide-react";
import { type GalleryItem } from "@/types/gallery";
import { Badge } from "@/components/ui/badge";

export interface GalleryItemProps {
  item: GalleryItem;
  onOpenLightbox: (item: GalleryItem) => void;
}

export function GalleryItemCard({ item, onOpenLightbox }: GalleryItemProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpenLightbox(item);
    }
  };

  return (
    <div
      tabIndex={0}
      role="button"
      aria-label={`View full image of ${item.title}`}
      onClick={() => onOpenLightbox(item)}
      onKeyDown={handleKeyDown}
      className="group relative rounded-[16px] overflow-hidden bg-[#151A17] border border-black/10 focus-ring cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 h-full"
    >
      {/* Image Container with Zoom */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#090C0A]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090C0A]/90 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 z-10">
          <Badge variant="amber" size="sm">
            {item.categoryLabel}
          </Badge>
        </div>

        <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm text-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Maximize2 className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Caption Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between bg-white">
        <div>
          <h3 className="font-display text-lg font-bold text-[#151A17] tracking-tight group-hover:text-[#173B2C] transition-colors mb-1.5">
            {item.title}
          </h3>
          <p className="text-small text-[#6E746F] leading-relaxed font-sans line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Action Link Footer */}
        <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between">
          <span className="text-micro font-mono text-[#6E746F] uppercase">
            CLICK TO EXPAND
          </span>

          {item.productSlug && (
            <Link
              href={`/products/${item.productSlug}`}
              onClick={(e) => e.stopPropagation()}
              className="text-xs font-mono font-bold text-[#2F6B45] hover:text-[#173B2C] flex items-center gap-1 group/link"
            >
              <span>VIEW PRODUCT</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
