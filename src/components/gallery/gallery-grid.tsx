import * as React from "react";
import { type GalleryItem } from "@/types/gallery";
import { GalleryItemCard } from "./gallery-item";
import { cn } from "@/lib/utils";

export interface GalleryGridProps {
  items: GalleryItem[];
  onSelectItem?: (item: GalleryItem) => void;
  className?: string;
}

export function GalleryGrid({ items, onSelectItem, className }: GalleryGridProps) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {items.map((item) => (
        <GalleryItemCard key={item.id} item={item} onClick={() => onSelectItem?.(item)} />
      ))}
    </div>
  );
}
