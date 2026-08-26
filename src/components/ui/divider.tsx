import * as React from "react";
import { cn } from "@/lib/utils";

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  variant?: "subtle" | "brand" | "amber" | "dark";
  orientation?: "horizontal" | "vertical";
}

export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  ({ className, variant = "subtle", orientation = "horizontal", ...props }, ref) => {
    return (
      <hr
        ref={ref}
        className={cn(
          "border-none shrink-0",
          orientation === "horizontal"
            ? "w-full h-px"
            : "h-full w-px self-stretch inline-block",
          {
            "bg-black/[0.08] dark:bg-white/[0.08]": variant === "subtle",
            "bg-[#2F6B45]/30": variant === "brand",
            "bg-[#C8913D]/40": variant === "amber",
            "bg-[#151A17]/20": variant === "dark",
          },
          className
        )}
        {...props}
      />
    );
  }
);

Divider.displayName = "Divider";
