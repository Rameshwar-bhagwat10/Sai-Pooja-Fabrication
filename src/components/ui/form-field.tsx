import * as React from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "./label";
import { Button, type ButtonProps } from "./button";

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  htmlFor?: string;
  required?: boolean;
  error?: string;
  hint?: string;
}

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ className, label, htmlFor, required, error, hint, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex flex-col gap-1.5 w-full", className)} {...props}>
        {label && (
          <Label htmlFor={htmlFor} required={required}>
            {label}
          </Label>
        )}
        {children}
        {hint && !error && (
          <span className="text-xs text-[#6E746F] leading-tight">{hint}</span>
        )}
        {error && (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-[#B84A45] leading-tight mt-0.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            {error}
          </span>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";

export function SubmitButton({
  children = "SUBMIT INQUIRY",
  variant = "primary",
  showArrow = true,
  ...props
}: ButtonProps) {
  return (
    <Button
      type="submit"
      variant={variant}
      showArrow={showArrow}
      className="w-full sm:w-auto"
      {...props}
    >
      {children}
    </Button>
  );
}
