import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean | string;
  options?: { value: string; label: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, options, children, disabled, ...props }, ref) => {
    const hasError = Boolean(error);

    return (
      <div className="relative w-full">
        <select
          ref={ref}
          disabled={disabled}
          className={cn(
            "w-full h-11 pl-3.5 pr-10 py-2.5 rounded-[10px] text-small font-sans bg-white border border-black/15 text-[#151A17] appearance-none transition-all duration-200 focus-ring disabled:opacity-50 disabled:bg-black/5 disabled:cursor-not-allowed cursor-pointer",
            hasError
              ? "border-[#B84A45] focus-visible:ring-[#B84A45]"
              : "hover:border-black/30 focus:border-[#173B2C]",
            className
          )}
          {...props}
        >
          {options
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6E746F] pointer-events-none">
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
    );
  }
);

Select.displayName = "Select";
