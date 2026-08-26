import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean | string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, leftIcon, rightIcon, disabled, ...props }, ref) => {
    const hasError = Boolean(error);

    return (
      <div className="relative w-full">
        {leftIcon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6E746F] pointer-events-none">
            {leftIcon}
          </div>
        )}

        <input
          type={type}
          ref={ref}
          disabled={disabled}
          className={cn(
            "w-full h-11 px-3.5 py-2.5 rounded-[10px] text-small font-sans bg-white border border-black/15 text-[#151A17] placeholder:text-[#6E746F]/70 transition-all duration-200 focus-ring disabled:opacity-50 disabled:bg-black/5 disabled:cursor-not-allowed",
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            hasError
              ? "border-[#B84A45] focus-visible:ring-[#B84A45]"
              : "hover:border-black/30 focus:border-[#173B2C]",
            className
          )}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6E746F] pointer-events-none">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
