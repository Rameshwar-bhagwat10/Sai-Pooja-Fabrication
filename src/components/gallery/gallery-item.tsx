import * as React from "react";
import { type GalleryItem } from "@/types/gallery";
import { ImageWrapper } from "@/components/ui/image-wrapper";
import { Badge } from "@/components/ui/badge";

export interface GalleryItemCardProps {
  item: GalleryItem;
  onClick?: () => void;
}

export function GalleryItemCard({ item, onClick }: GalleryItemCardProps) {
  return (
    <div
      onClick={onClick}
      className="group relative rounded-[14px] overflow-hidden bg-white border border-black/10 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <ImageWrapper
        src={item.image}
        alt={item.title}
        aspectRatio="4/3"
        overlay="gradient-bottom"
        caption={item.title}
      />
      <div className="absolute top-3 left-3 z-20">
        <Badge variant="amber" size="sm">
          {item.categoryLabel}
        </Badge>
      </div>
    </div>
  );
}
