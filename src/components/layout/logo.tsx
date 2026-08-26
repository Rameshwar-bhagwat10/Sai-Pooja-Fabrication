import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface LogoProps extends React.HTMLAttributes<HTMLAnchorElement> {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
}

export function Logo({
  variant = "dark",
  size = "md",
  className,
  ...props
}: LogoProps) {
  const isDark = variant === "dark";

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-3 select-none group focus-ring rounded-[8px]",
        className
      )}
      {...props}
    >
      {/* Precision Engineering & Agricultural Blade Mark */}
      <div
        className={cn(
          "relative flex items-center justify-center rounded-[8px] transition-transform duration-300 group-hover:scale-105",
          {
            "w-9 h-9": size === "sm",
            "w-11 h-11": size === "md",
            "w-14 h-14": size === "lg",
            "bg-[#173B2C] text-[#F4F1E8] shadow-sm": isDark,
            "bg-[#F4F1E8] text-[#10271D] shadow-sm": !isDark,
          }
        )}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-3/5 h-3/5"
        >
          {/* Heavy Duty Plough Blade & Precision Geometry */}
          <path
            d="M6 24L26 8L20 26L6 24Z"
            fill="currentColor"
            fillOpacity="0.2"
          />
          <path
            d="M6 24L26 8M26 8L16 26M26 8L12 18"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="26" cy="8" r="2.5" fill="#C8913D" />
          <circle cx="6" cy="24" r="2" fill="#C8913D" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <span
          className={cn(
            "font-display font-bold tracking-tight leading-none transition-colors",
            {
              "text-base": size === "sm",
              "text-lg": size === "md",
              "text-2xl": size === "lg",
              "text-[#151A17] group-hover:text-[#173B2C]": isDark,
              "text-[#F4F1E8] group-hover:text-white": !isDark,
            }
          )}
        >
          SAI POOJA
        </span>
        <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.22em] font-semibold leading-tight mt-0.5 text-[#C8913D]">
          FABRICATION
        </span>
      </div>
    </Link>
  );
}
