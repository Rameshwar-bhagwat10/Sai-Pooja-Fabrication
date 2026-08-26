"use client";

import * as React from "react";
import { type GalleryItem } from "@/types/gallery";
import { GalleryItemCard } from "./gallery-item";
import { Stagger, StaggerItem } from "@/components/animations/stagger";

export interface GalleryGridProps {
  items: GalleryItem[];
  onOpenLightbox: (item: GalleryItem) => void;
}

export function GalleryGrid({ items, onOpenLightbox }: GalleryGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-16 bg-white/50 rounded-[16px] border border-black/10">
        <p className="text-body text-[#6E746F] font-sans">
          No imagery found in this category.
        </p>
      </div>
    );
  }

  return (
    <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item) => (
        <StaggerItem key={item.id} className="h-full">
          <GalleryItemCard item={item} onOpenLightbox={onOpenLightbox} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
