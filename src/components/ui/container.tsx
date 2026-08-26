import * as React from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  size?: "default" | "narrow" | "wide" | "full";
}

/**
 * Reusable Container component.
 * Maximum width: 1440px
 * Responsive horizontal padding: Desktop (32-48px), Tablet (24-32px), Mobile (20px)
 */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, as: Component = "div", size = "default", children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "w-full mx-auto px-5 sm:px-6 md:px-8 lg:px-12",
          {
            "max-w-[1440px]": size === "default",
            "max-w-[1100px]": size === "narrow",
            "max-w-[1600px]": size === "wide",
            "max-w-none px-0 sm:px-0 md:px-0 lg:px-0": size === "full",
          },
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = "Container";
