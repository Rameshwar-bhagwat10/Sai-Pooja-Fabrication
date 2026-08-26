import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean | string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, disabled, rows = 4, ...props }, ref) => {
    const hasError = Boolean(error);

    return (
      <textarea
        ref={ref}
        rows={rows}
        disabled={disabled}
        className={cn(
          "w-full px-3.5 py-3 rounded-[10px] text-small font-sans bg-white border border-black/15 text-[#151A17] placeholder:text-[#6E746F]/70 transition-all duration-200 focus-ring resize-y disabled:opacity-50 disabled:bg-black/5 disabled:cursor-not-allowed",
          hasError
            ? "border-[#B84A45] focus-visible:ring-[#B84A45]"
            : "hover:border-black/30 focus:border-[#173B2C]",
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
