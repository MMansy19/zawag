"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { OTPInput } from "@/components/ui/otp-input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { RegisterRequest } from "@/lib/types/auth.types";

interface Step1AuthProps {
  data: Partial<RegisterRequest>;
  updateData: (data: Partial<RegisterRequest>) => void;
  error: string | null;
  clearError: () => void;
  isSubmitting: boolean;
  onSendOTP: () => Promise<boolean>;
  otpSent: boolean;
}

export default function Step1Auth({
  data,
  updateData,
  error,
  clearError,
  isSubmitting,
  onSendOTP,
  otpSent,
}: Step1AuthProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleInputChange = (field: keyof RegisterRequest, value: any) => {
    clearError();
    updateData({ [field]: value });
  };

  const handleConfirmPasswordChange = (value: string) => {
    clearError();
    setConfirmPassword(value);
  };

  const handleSendOTP = async () => {
    if (!data.email) {
      return;
    }
    await onSendOTP();
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-700">
          ستحتاج إلى تأكيد بريدك الإلكتروني عبر رمز التحقق قبل المتابعة
        </p>
      </div>

      <div className="space-y-4">
        <Input
          label="البريد الإلكتروني"
          type="email"
          value={data.email || ""}
          onChange={(e) => handleInputChange("email", e.target.value)}
          placeholder="أدخل بريدك الإلكتروني"
          disabled={isSubmitting || otpSent}
          required
        />

        <div className="relative">
          <Input
            label="كلمة المرور"
            type={showPassword ? "text" : "password"}
            value={data.password || ""}
            onChange={(e) => handleInputChange("password", e.target.value)}
            placeholder="اختر كلمة مرور قوية"
            disabled={isSubmitting}
            required
          />
          <button
            type="button"
            className="absolute left-3 top-6 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        <div className="relative">
          <Input
            label="تأكيد كلمة المرور"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => handleConfirmPasswordChange(e.target.value)}
            placeholder="أعد إدخال كلمة المرور"
            disabled={isSubmitting}
            required
          />
          <button
            type="button"
            className="absolute left-3 top-6 text-gray-400 hover:text-gray-600"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        {confirmPassword &&
          data.password &&
          confirmPassword !== data.password && (
            <Alert variant="destructive">
              <AlertDescription>كلمة المرور غير متطابقة</AlertDescription>
            </Alert>
          )}
      </div>

      {/* OTP Section */}
      <div className="border-t pt-6">
        {!otpSent ? (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">إرسال رمز التحقق</h3>
              <p className="text-sm text-gray-600 mb-4">
                سنرسل رمز التحقق إلى بريدك الإلكتروني
              </p>
              <Button
                onClick={handleSendOTP}
                disabled={!data.email || isSubmitting}
                className="min-w-32"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    جارٍ الإرسال...
                  </>
                ) : (
                  "إرسال رمز التحقق"
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">أدخل رمز التحقق</h3>
              <p className="text-sm text-gray-600 mb-4">
                تم إرسال رمز التحقق إلى:{" "}
                <span className="font-medium">{data.email}</span>
              </p>
            </div>

            <OTPInput
              length={6}
              onChange={(value) =>
                handleInputChange("otp" as keyof RegisterRequest, value)
              }
              error={error || undefined}
            />

            <div className="text-center">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSendOTP}
                disabled={isSubmitting}
              >
                إعادة الإرسال
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
