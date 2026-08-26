import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-[6px] px-2.5 py-1 text-[11px] font-medium tracking-wide uppercase transition-colors select-none",
  {
    variants: {
      variant: {
        default: "bg-[#173B2C]/10 text-[#173B2C] border border-[#173B2C]/20",
        forest: "bg-[#173B2C] text-[#F4F1E8]",
        amber: "bg-[#C8913D]/15 text-[#C8913D] border border-[#C8913D]/30 font-semibold",
        charcoal: "bg-[#151A17] text-[#F4F1E8]",
        neutral: "bg-[#D8D9D3]/40 text-[#151A17] border border-black/5",
        outline: "border border-[#173B2C]/30 text-[#173B2C] bg-transparent",
        "outline-light": "border border-white/20 text-[#F4F1E8] bg-transparent",
        success: "bg-[#3D8B5A]/15 text-[#3D8B5A] border border-[#3D8B5A]/30",
        warning: "bg-[#C8913D]/15 text-[#C8913D] border border-[#C8913D]/30",
        error: "bg-[#B84A45]/15 text-[#B84A45] border border-[#B84A45]/30",
      },
      size: {
        default: "px-2.5 py-1 text-[11px]",
        sm: "px-2 py-0.5 text-[10px]",
        lg: "px-3 py-1.5 text-xs font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

export function Badge({
  className,
  variant,
  size,
  dot = false,
  children,
  ...props
}: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size, className }))} {...props}>
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0 animate-pulse" />
      )}
      <span>{children}</span>
    </div>
  );
}

export { badgeVariants };
