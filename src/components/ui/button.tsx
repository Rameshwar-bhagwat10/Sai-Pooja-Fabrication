import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-small font-medium transition-all duration-200 focus-ring disabled:pointer-events-none disabled:opacity-50 select-none group cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-[#173B2C] text-[#F4F1E8] hover:bg-[#2F6B45] hover:-translate-y-0.5 active:scale-[0.98] shadow-sm hover:shadow-md",
        secondary:
          "bg-[#F4F1E8] text-[#151A17] hover:bg-[#D8D9D3] border border-black/10 hover:-translate-y-0.5 active:scale-[0.98]",
        amber:
          "bg-[#C8913D] text-[#090C0A] font-semibold hover:bg-[#d69f4b] hover:-translate-y-0.5 active:scale-[0.98] shadow-sm hover:shadow-md",
        outline:
          "border border-[#173B2C] text-[#173B2C] hover:bg-[#173B2C] hover:text-[#F4F1E8] hover:-translate-y-0.5 active:scale-[0.98]",
        "outline-light":
          "border border-[#F4F1E8]/30 text-[#F4F1E8] hover:bg-[#F4F1E8] hover:text-[#10271D] hover:-translate-y-0.5 active:scale-[0.98]",
        ghost:
          "text-[#151A17] hover:bg-black/5 hover:text-[#173B2C]",
        "ghost-light":
          "text-[#F4F1E8] hover:bg-white/10 hover:text-white",
        link:
          "text-[#2F6B45] underline-offset-4 hover:underline p-0 h-auto font-medium",
        destructive:
          "bg-[#B84A45] text-white hover:bg-[#a33f3a] hover:-translate-y-0.5 active:scale-[0.98]",
      },
      size: {
        default: "h-11 px-5 py-2.5 rounded-[10px]",
        sm: "h-9 px-3.5 py-2 rounded-[8px] text-xs",
        lg: "h-13 px-7 py-3.5 rounded-[12px] text-base font-semibold tracking-wide",
        icon: "h-10 w-10 rounded-[10px] p-0 flex items-center justify-center",
        "icon-sm": "h-8 w-8 rounded-[8px] p-0 flex items-center justify-center",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  showArrow?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading = false,
      showArrow = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-current shrink-0" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}

        {children && <span>{children}</span>}

        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}

        {!isLoading && showArrow && (
          <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { buttonVariants };
