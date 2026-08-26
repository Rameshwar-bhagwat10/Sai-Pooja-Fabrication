"use client";

import * as React from "react";
import { type GalleryItem } from "@/types/gallery";
import { Dialog } from "@/components/ui/dialog";
import { ImageWrapper } from "@/components/ui/image-wrapper";

export interface GalleryLightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export function GalleryLightbox({ item, onClose }: GalleryLightboxProps) {
  if (!item) return null;

  return (
    <Dialog
      isOpen={Boolean(item)}
      onClose={onClose}
      title={item.title}
      description={item.description}
      className="max-w-3xl"
    >
      <div className="mt-4">
        <ImageWrapper
          src={item.image}
          alt={item.title}
          aspectRatio="16/9"
          overlay="none"
        />
      </div>
    </Dialog>
  );
}
