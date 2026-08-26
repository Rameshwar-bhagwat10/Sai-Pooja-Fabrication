"use client";

import * as React from "react";
import { type GalleryCategory } from "@/types/gallery";
import { GALLERY_CATEGORIES, GALLERY_ITEMS } from "@/data/gallery";

export interface GalleryFilterProps {
  activeCategory: GalleryCategory;
  onSelectCategory: (category: GalleryCategory) => void;
}

export function GalleryFilter({ activeCategory, onSelectCategory }: GalleryFilterProps) {
  const getCount = (cat: GalleryCategory) => {
    if (cat === "all") return GALLERY_ITEMS.length;
    return GALLERY_ITEMS.filter((item) => item.category === cat).length;
  };

  return (
    <div className="w-full flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-black/10">
      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {GALLERY_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count = getCount(cat.id);
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 rounded-[8px] text-xs font-mono tracking-wider font-semibold uppercase transition-all duration-300 shrink-0 focus-ring ${
                isActive
                  ? "bg-[#173B2C] text-[#F4F1E8] shadow-sm"
                  : "bg-black/5 text-[#151A17]/70 hover:bg-black/10 hover:text-[#151A17]"
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`ml-2 text-[10px] px-1.5 py-0.5 rounded ${
                  isActive ? "bg-[#C8913D] text-[#10271D]" : "bg-black/10 text-[#6E746F]"
                }`}
              >
                {count < 10 ? `0${count}` : count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Visual Status Tag */}
      <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#6E746F]">
        <span className="w-2 h-2 rounded-full bg-[#2F6B45]" />
        <span>SHOWING {getCount(activeCategory)} VERIFIED VISUALS</span>
      </div>
    </div>
  );
}
