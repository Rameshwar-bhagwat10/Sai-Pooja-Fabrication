import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "relative rounded-[14px] transition-all duration-200 overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-white text-[#151A17] border border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.03)]",
        warm:
          "bg-[#F4F1E8] text-[#151A17] border border-black/[0.06]",
        dark:
          "bg-[#151A17] text-[#F4F1E8] border border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.2)]",
        forest:
          "bg-[#173B2C] text-[#F4F1E8] border border-white/[0.1] shadow-[0_4px_24px_rgba(16,39,29,0.3)]",
        outline:
          "bg-transparent border border-black/15 dark:border-white/15 text-inherit",
        feature:
          "bg-white text-[#151A17] border border-black/[0.08] hover:border-[#2F6B45]/40 hover:shadow-md transition-all",
        interactive:
          "bg-white text-[#151A17] border border-black/[0.08] hover:border-[#2F6B45] hover:-translate-y-1 hover:shadow-lg cursor-pointer group",
      },
      padding: {
        none: "p-0",
        sm: "p-4 sm:p-5",
        default: "p-6 sm:p-8",
        lg: "p-8 sm:p-10 md:p-12",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  as?: React.ElementType;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, as: Component = "div", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(cardVariants({ variant, padding, className }))}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-2 mb-4", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-display text-h3 font-semibold tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-small text-[#6E746F] dark:text-[#D8D9D3]/80 leading-relaxed", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-body", className)} {...props} />
));
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-3 mt-6 pt-4 border-t border-black/[0.06] dark:border-white/[0.08]", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { cardVariants };
