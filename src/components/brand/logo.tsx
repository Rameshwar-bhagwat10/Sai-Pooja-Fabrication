import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface LogoProps extends React.HTMLAttributes<HTMLAnchorElement> {
  variant?: "light" | "dark" | "mark-only" | "mark-light";
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
}

export function Logo({
  variant = "dark",
  size = "md",
  showWordmark = true,
  className,
  ...props
}: LogoProps) {
  const isDarkSurface = variant === "light" || variant === "mark-light";
  const isMarkOnly = variant === "mark-only" || variant === "mark-light" || !showWordmark;

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-3 select-none group focus-ring rounded-[8px]",
        className
      )}
      {...props}
    >
      {/* Brand Geometric Mark */}
      <div
        className={cn(
          "relative flex items-center justify-center rounded-[10px] transition-transform duration-300 group-hover:scale-105 shrink-0",
          {
            "w-9 h-9": size === "sm",
            "w-11 h-11": size === "md",
            "w-14 h-14": size === "lg",
            "bg-[#173B2C] text-[#F4F1E8] shadow-sm": isDarkSurface,
            "bg-[#10271D] text-[#F4F1E8] shadow-sm": !isDarkSurface,
          }
        )}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-3/5 h-3/5"
        >
          <path
            d="M7 24L16 7L25 24H19L16 17L13 24H7Z"
            fill="#F4F1E8"
          />
          <path
            d="M11 21L16 11L21 21"
            stroke={isDarkSurface ? "#173B2C" : "#10271D"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="16" cy="18" r="2.2" fill="#C8913D" />
        </svg>
      </div>

      {/* Brand Wordmark */}
      {!isMarkOnly && (
        <div className="flex flex-col">
          <span
            className={cn(
              "font-display font-bold tracking-tight leading-none transition-colors",
              {
                "text-base": size === "sm",
                "text-lg": size === "md",
                "text-2xl": size === "lg",
                "text-[#F4F1E8] group-hover:text-white": isDarkSurface,
                "text-[#151A17] group-hover:text-[#173B2C]": !isDarkSurface,
              }
            )}
          >
            SAI POOJA
          </span>
          <span
            className={cn(
              "font-mono uppercase tracking-[0.24em] font-bold leading-tight mt-0.5",
              {
                "text-[9px]": size === "sm",
                "text-[10px]": size === "md" || size === "lg",
                "text-[#C8913D]": isDarkSurface,
                "text-[#2F6B45]": !isDarkSurface,
              }
            )}
          >
            FABRICATION
          </span>
        </div>
      )}
    </Link>
  );
}
