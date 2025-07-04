"use client";

import * as React from "react";

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked, onCheckedChange, disabled, className, id, ...props }, ref) => {
    return (
      <button
        ref={ref}
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onCheckedChange(!checked)}
        className={`
          relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent 
          transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
          disabled:cursor-not-allowed disabled:opacity-50
          ${checked ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"}
          ${className || ""}
        `}
        {...props}
      >
        <span
          className={`
            pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow 
            transition-transform duration-200 ease-in-out
            ${checked ? "translate-x-5" : "translate-x-0"}
          `}
        />
      </button>
    );
  },
);

Switch.displayName = "Switch";

export { Switch };
