"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { OTPInput } from "@/components/ui/otp-input";
import Phone from "@/components/ui/phone-number";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { RegisterRequest } from "@/lib/types/auth.types";
import { getCountriesByGroup } from "@/lib/static-data";

interface NewStep1AuthProps {
  data: Partial<RegisterRequest>;
  updateData: (data: Partial<RegisterRequest>) => void;
  error: string | null;
  clearError: () => void;
  isSubmitting: boolean;
  onSendOTP: () => Promise<boolean>;
  otpSent: boolean;
}

export default function NewStep1Auth({
  data,
  updateData,
  error,
  clearError,
  isSubmitting,
  onSendOTP,
  otpSent,
}: NewStep1AuthProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");

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
  const handleOTPChange = (value: string) => {
    setOtp(value);
    clearError();
    // Store OTP in a temporary field for validation (we'll extend the type later)
    updateData({ email: data.email, otpCode: value } as any);
  };

  const countries = getCountriesByGroup();
  const arabCountries = countries["arab"] || [];

  return (
    <div className="space-y-6">
      {/* Email and Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Input
            label="البريد الإلكتروني"
            type="email"
            value={data.email || ""}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="أدخل بريدك الإلكتروني"
            disabled={isSubmitting || otpSent}
            required
          />
          {data.email && !otpSent && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleSendOTP}
              disabled={isSubmitting}
              className="mt-2 w-full"
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
          )}
        </div>{" "}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3.5">
            رقم الهاتف <span className="text-red-500">*</span>
          </label>
          <Phone
            value={(data as any).phone || ""}
            onChange={(phone: string) => {
              updateData({ ...(data as any), phone });
            }}
            defaultCountry="SA"
          />
          <p className="text-sm text-gray-500 mt-1">
            اختر البلد وأدخل رقم هاتفك
          </p>
        </div>
      </div>

      {/* OTP Verification */}
      {otpSent && (
        <div className="border rounded-lg p-4 bg-primary-subtle">
          <Alert className="mb-4">
            <AlertDescription>
              تم إرسال رمز التحقق إلى بريدك الإلكتروني. يرجى إدخال الرمز أدناه.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              رمز التحقق
            </label>{" "}
            <OTPInput onChange={handleOTPChange} length={6} />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleSendOTP}
              disabled={isSubmitting}
              className="w-full"
            >
              إعادة إرسال الرمز
            </Button>
          </div>
        </div>
      )}

      {/* Password Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="relative">
            <Input
              label="كلمة المرور"
              type={showPassword ? "text" : "password"}
              value={data.password || ""}
              onChange={(e) => handleInputChange("password", e.target.value)}
              placeholder="أدخل كلمة مرور قوية"
              disabled={isSubmitting}
              required
            />
            <button
              type="button"
              className="absolute left-3 top-14 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            يجب أن تحتوي على 8 أحرف على الأقل
          </p>
        </div>

        <div>
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
              className="absolute left-3 top-14 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
              <p className="text-sm text-red-500 mt-1">
                كلمات المرور غير متطابقة
              </p>
            )}
        </div>
      </div>

      {/* Gender Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          الجنس <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="relative flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={data.gender === "male"}
              onChange={(e) => handleInputChange("gender", e.target.value)}
              disabled={isSubmitting}
              className="sr-only"
            />
            <div className="flex items-center">
              <div
                className={`w-4 h-4 rounded-full border-2 ml-3 ${
                  data.gender === "male"
                    ? "border-primary bg-primary"
                    : "border-gray-300"
                }`}
              >
                {data.gender === "male" && (
                  <div className="w-2 h-2 rounded-full bg-white mx-auto mt-0.5"></div>
                )}
              </div>
              <div>
                <div className="font-medium">ذكر</div>
                <div className="text-sm text-gray-500">
                  سيتم عرض نموذج البيانات الخاص بالرجال
                </div>
              </div>
            </div>
          </label>

          <label className="relative flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={data.gender === "female"}
              onChange={(e) => handleInputChange("gender", e.target.value)}
              disabled={isSubmitting}
              className="sr-only"
            />
            <div className="flex items-center">
              <div
                className={`w-4 h-4 rounded-full border-2 ml-3 ${
                  data.gender === "female"
                    ? "border-primary bg-primary"
                    : "border-gray-300"
                }`}
              >
                {data.gender === "female" && (
                  <div className="w-2 h-2 rounded-full bg-white mx-auto mt-0.5"></div>
                )}
              </div>
              <div>
                <div className="font-medium">أنثى</div>
                <div className="text-sm text-gray-500">
                  سيتم عرض نموذج البيانات الخاص بالنساء
                </div>
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* Validation Summary */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
