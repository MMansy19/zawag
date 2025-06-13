"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const otpSchema = z.object({
  otp: z.string().length(6, "رمز التحقق يجب أن يكون 6 أرقام"),
});

type OTPFormData = z.infer<typeof otpSchema>;

export function OTPVerificationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
  });
  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [timeLeft]);

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleOTPChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Take only the last digit
    setOtp(newOtp);

    // Update form value
    setValue("otp", newOtp.join(""));

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData
      .split("")
      .concat(Array(6 - pastedData.length).fill(""));
    setOtp(newOtp.slice(0, 6));
    setValue("otp", newOtp.join(""));

    // Focus on the next empty input or the last one
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const onSubmit = async (data: OTPFormData) => {
    setIsLoading(true);
    try {
      // TODO: Implement OTP verification logic
      console.log("OTP verification:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
    } catch (error) {
      console.error("OTP verification error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = async () => {
    try {
      // TODO: Implement resend OTP logic
      console.log("Resending OTP...");
      setTimeLeft(300); // Reset timer
      setOtp(["", "", "", "", "", ""]); // Clear current OTP
      setValue("otp", "");
    } catch (error) {
      console.error("Resend OTP error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="text-center text-text-secondary text-sm mb-6">
        تم إرسال رمز التحقق إلى بريدك الإلكتروني. أدخل الرمز المكون من 6 أرقام.
      </div>

      <div>
        <label className="block text-sm font-medium text-text mb-4 text-center">
          رمز التحقق
        </label>
        <div className="flex justify-center gap-2 mb-4" dir="ltr">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOTPChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={index === 0 ? handlePaste : undefined}
              className="w-12 h-12 text-center text-lg font-semibold border border-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          ))}
        </div>
        {errors.otp && (
          <p className="text-sm text-error text-center">{errors.otp.message}</p>
        )}
      </div>

      <div className="text-center">
        {timeLeft > 0 ? (
          <p className="text-sm text-text-secondary">
            انتهاء صلاحية الرمز خلال:{" "}
            <span className="font-mono">{formatTime(timeLeft)}</span>
          </p>
        ) : (
          <button
            type="button"
            onClick={resendOTP}
            className="text-sm text-primary hover:text-primary-hover font-medium"
          >
            إعادة إرسال الرمز
          </button>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading || otp.join("").length !== 6}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "جارٍ التحقق..." : "تأكيد الرمز"}
      </button>
    </form>
  );
}
