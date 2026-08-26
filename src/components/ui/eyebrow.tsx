import * as React from "react";
import { cn } from "@/lib/utils";

export interface EyebrowProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "amber" | "forest" | "neutral" | "muted";
  icon?: React.ReactNode;
}

export const Eyebrow = React.forwardRef<HTMLDivElement, EyebrowProps>(
  ({ className, variant = "amber", icon, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center gap-2 text-micro font-semibold tracking-[0.14em]",
          {
            "text-[#C8913D]": variant === "amber",
            "text-[#2F6B45]": variant === "forest",
            "text-[#151A17]": variant === "neutral",
            "text-[#6E746F]": variant === "muted",
          },
          className
        )}
        {...props}
      >
        {icon ? (
          <span className="shrink-0 text-current">{icon}</span>
        ) : (
          <span className="w-2 h-0.5 bg-current shrink-0 opacity-80" />
        )}
        <span>{children}</span>
      </div>
    );
  }
);

Eyebrow.displayName = "Eyebrow";
