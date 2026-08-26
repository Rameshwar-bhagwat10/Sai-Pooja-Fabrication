import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ImageWrapper } from "@/components/ui/image-wrapper";
import { Badge } from "@/components/ui/badge";

export interface ProductCardProps {
  id: string;
  slug: string;
  name: string;
  category: string;
  categoryName?: string;
  tagline: string;
  heroImage: string;
  suitableForTractorHp?: string;
  className?: string;
}

export function ProductCard({
  slug,
  name,
  category,
  categoryName,
  tagline,
  heroImage,
  suitableForTractorHp,
  className,
}: ProductCardProps) {
  return (
    <Link
      href={`/products/${slug}`}
      className={cn(
        "group relative flex flex-col rounded-[16px] bg-white border border-black/[0.08] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_36px_rgba(23,59,44,0.12)] hover:border-[#2F6B45]/40",
        className
      )}
    >
      {/* Product Image Area */}
      <div className="relative w-full overflow-hidden bg-[#151A17]/5 aspect-[4/3]">
        <ImageWrapper
          src={heroImage}
          alt={name}
          aspectRatio="custom"
          className="w-full h-full rounded-none"
          imageClassName="group-hover:scale-108 transition-transform duration-500 ease-out"
          overlay="dark-subtle"
        />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 z-20">
          <Badge variant="amber" size="sm">
            {categoryName || category}
          </Badge>
        </div>

        {/* Tractor Compatibility Chip if available */}
        {suitableForTractorHp && (
          <div className="absolute bottom-3 left-3 z-20 px-2 py-1 rounded bg-[#090C0A]/85 backdrop-blur-sm text-[10px] font-mono text-[#F4F1E8] border border-white/10">
            {suitableForTractorHp}
          </div>
        )}
      </div>

      {/* Product Meta Content */}
      <div className="flex flex-col flex-1 p-6 justify-between bg-white">
        <div>
          <h3 className="font-display text-xl font-bold text-[#151A17] tracking-tight group-hover:text-[#173B2C] transition-colors">
            {name}
          </h3>
          <p className="mt-2 text-small text-[#6E746F] line-clamp-2 leading-relaxed">
            {tagline}
          </p>
        </div>

        {/* Bottom CTA Row */}
        <div className="mt-6 pt-4 border-t border-black/[0.06] flex items-center justify-between text-small font-medium text-[#173B2C]">
          <span className="text-micro font-semibold tracking-wider text-[#C8913D]">
            VIEW SPECIFICATIONS
          </span>
          <div className="w-8 h-8 rounded-full bg-[#173B2C]/5 flex items-center justify-center text-[#173B2C] group-hover:bg-[#173B2C] group-hover:text-[#F4F1E8] transition-all duration-200">
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
