import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | undefined;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || React.useId();

    return (
      <div className="space-y-3.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-label font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 arabic-optimized"
          >
            {label}
            {props.required && <span className="text-error mr-1">*</span>}
          </label>
        )}
        <input
          type={type}
          id={inputId}
          dir={type === "number" || type === "email" ? "ltr" : "rtl"}
          className={cn(
            "flex h-10 w-full rounded-md border border-border bg-background px-3 py-2",
            "text-input ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            "arabic-optimized font-body",
            error && "border-error focus-visible:ring-error",
            className,
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-error arabic-optimized">{error}</p>}
        {helperText && !error && (
          <p className="text-helper arabic-optimized">{helperText}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
