import * as React from "react";
import { cn } from "@/lib/utils";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "text-small font-medium text-[#151A17] dark:text-[#F4F1E8] select-none flex items-center gap-1",
          className
        )}
        {...props}
      >
        <span>{children}</span>
        {required && <span className="text-[#B84A45] text-xs">*</span>}
      </label>
    );
  }
);

Label.displayName = "Label";
