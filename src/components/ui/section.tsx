import * as React from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./eyebrow";

export type SectionSurface =
  | "soft-white"
  | "warm-white"
  | "charcoal"
  | "forest-900"
  | "forest-800"
  | "transparent";

export type SectionSpacing = "default" | "compact" | "cinematic" | "hero" | "none";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  surface?: SectionSurface;
  spacing?: SectionSpacing;
  hasGridPattern?: boolean;
  isDarkSurface?: boolean;
}

/**
 * Reusable Section primitive supporting the alternating surface rhythm system.
 */
export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      as: Component = "section",
      surface = "soft-white",
      spacing = "default",
      hasGridPattern = false,
      isDarkSurface,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden transition-colors",
          {
            "surface-soft-white": surface === "soft-white",
            "surface-warm-white": surface === "warm-white",
            "surface-charcoal": surface === "charcoal",
            "surface-forest-900": surface === "forest-900",
            "surface-forest-800": surface === "forest-800",
            "bg-transparent": surface === "transparent",
          },
          {
            "py-16 sm:py-20 md:py-28 lg:py-36": spacing === "default",
            "py-10 sm:py-14 md:py-20": spacing === "compact",
            "py-24 sm:py-32 md:py-44 lg:py-52": spacing === "cinematic",
            "pt-28 pb-16 sm:pt-36 sm:pb-24 md:pt-44 md:pb-32": spacing === "hero",
            "py-0": spacing === "none",
          },
          hasGridPattern &&
            (surface === "charcoal" || surface === "forest-900" || surface === "forest-800" || isDarkSurface
              ? "bg-industrial-grid-dark"
              : "bg-industrial-grid"),
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Section.displayName = "Section";

export interface SectionHeadingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  eyebrow?: string;
  eyebrowIcon?: React.ReactNode;
  eyebrowVariant?: "amber" | "forest" | "neutral" | "muted";
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  align?: "left" | "center" | "right";
  isDarkSurface?: boolean;
  size?: "default" | "large" | "display";
}

/**
 * SectionHeading supporting eyebrow, title, description, and surface adaptations.
 */
export const SectionHeading = React.forwardRef<HTMLDivElement, SectionHeadingProps>(
  (
    {
      className,
      eyebrow,
      eyebrowIcon,
      eyebrowVariant,
      title,
      description,
      align = "left",
      isDarkSurface = false,
      size = "default",
      children,
      ...props
    },
    ref
  ) => {
    const defaultEyebrowVariant = eyebrowVariant ?? (isDarkSurface ? "amber" : "forest");

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-3 md:gap-4 max-w-3xl",
          {
            "items-start text-left": align === "left",
            "items-center text-center mx-auto": align === "center",
            "items-end text-right ml-auto": align === "right",
          },
          className
        )}
        {...props}
      >
        {eyebrow && (
          <Eyebrow
            variant={defaultEyebrowVariant}
            icon={eyebrowIcon}
            className="mb-1"
          >
            {eyebrow}
          </Eyebrow>
        )}

        <h2
          className={cn("tracking-tight font-display", {
            "text-h2": size === "default",
            "text-h1": size === "large",
            "text-display": size === "display",
            "text-[#F4F1E8]": isDarkSurface,
            "text-[#151A17]": !isDarkSurface,
          })}
        >
          {title}
        </h2>

        {description && (
          <p
            className={cn("text-body md:text-body-lg", {
              "text-[#D8D9D3]/90": isDarkSurface,
              "text-[#6E746F]": !isDarkSurface,
            })}
          >
            {description}
          </p>
        )}

        {children}
      </div>
    );
  }
);

SectionHeading.displayName = "SectionHeading";
