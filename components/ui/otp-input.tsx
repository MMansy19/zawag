"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface OTPInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
  onChange?: (otp: string) => void;
  error?: string | undefined;
  className?: string;
}

export function OTPInput({
  length = 6,
  onComplete,
  onChange,
  error,
  className,
}: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const otpValue = otp.join("");
    onChange?.(otpValue);

    if (otpValue.length === length) {
      onComplete?.(otpValue);
    }
  }, [otp, length, onChange, onComplete]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value;

    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Take only the last digit
    setOtp(newOtp);

    // Move to next input
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    // Handle backspace
    if (e.key === "Backspace") {
      const newOtp = [...otp];

      if (otp[index]) {
        // Clear current field
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // Move to previous field and clear it
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }

    // Handle arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain");
    const digits = pastedData.replace(/\D/g, "").slice(0, length);
    if (digits.length > 0) {
      const newOtp = [...otp];
      for (let i = 0; i < digits.length && i < length; i++) {
        const digit = digits[i];
        if (digit !== undefined) {
          newOtp[i] = digit;
        }
      }
      setOtp(newOtp);

      // Focus on the next empty field or the last field
      const nextIndex = Math.min(digits.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex gap-2 justify-center" dir="ltr">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            value={digit}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            className={cn(
              "w-12 h-12 text-center text-lg font-semibold border-2 rounded-lg",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
              "transition-all duration-200",
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-primary",
              digit && "border-primary bg-primary/5",
            )}
            maxLength={1}
            autoComplete="off"
          />
        ))}
      </div>
      {error && <p className="text-sm text-red-600 text-center">{error}</p>}
    </div>
  );
}
