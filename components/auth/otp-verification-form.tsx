import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { OTPInput } from "@/components/ui/otp-input";
import { useAuthActions } from "@/lib/hooks/useAuthActions";
import {
  otpVerificationSchema,
  type OTPVerificationData,
} from "@/lib/validation/auth.schemas";
import { Loader2, RefreshCw } from "lucide-react";

interface OTPVerificationFormProps {
  email: string;
  onSuccess?: () => void;
  onBack?: () => void;
  title?: string;
  description?: string;
  className?: string;
}

export function OTPVerificationForm({
  email,
  onSuccess,
  onBack,
  title = "تأكيد رمز التحقق",
  description = "أدخل رمز التحقق المرسل إلى بريدك الإلكتروني",
  className = "",
}: OTPVerificationFormProps) {
  const { verifyOTP, resendOTP, isLoading, error, clearError } =
    useAuthActions();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<OTPVerificationData>({
    resolver: zodResolver(otpVerificationSchema),
    defaultValues: {
      email,
      otp: "",
    },
  });

  const otpValue = watch("otp");

  const onSubmit = async (data: OTPVerificationData) => {
    clearError();

    const success = await verifyOTP(data);

    if (success) {
      reset();
      onSuccess?.();
    }
  };

  const handleResendOTP = async () => {
    clearError();
    await resendOTP(email);
  };

  const handleOTPChange = (value: string) => {
    setValue("otp", value);
    clearError();
  };

  return (
    <Card className={`w-full max-w-md mx-auto ${className}`}>
      <CardHeader className="space-y-1">
        <h2 className="text-2xl font-bold text-center">{title}</h2>
        <p className="text-sm text-gray-600 text-center">{description}</p>
        <div className="text-center">
          <span className="text-sm font-medium text-primary">{email}</span>
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 text-center">
              رمز التحقق
            </label>
            <OTPInput
              length={6}
              onChange={handleOTPChange}
              {...(!isSubmitting && {
                onComplete: (otp: string) => {
                  setValue("otp", otp);
                  handleSubmit(onSubmit)();
                },
              })}
              error={errors.otp?.message}
            />
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-3">لم تستلم الرمز؟</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleResendOTP}
              disabled={isLoading}
              className="text-primary"
            >
              {isLoading ? (
                <>
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  جارٍ الإرسال...
                </>
              ) : (
                <>
                  <RefreshCw className="ml-2 h-4 w-4" />
                  إعادة الإرسال
                </>
              )}
            </Button>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-3">
          <Button
            type="submit"
            className="w-full"
            disabled={
              isLoading || isSubmitting || !otpValue || otpValue.length !== 6
            }
          >
            {isLoading ? (
              <>
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                جارٍ التحقق...
              </>
            ) : (
              "تأكيد الرمز"
            )}
          </Button>

          {onBack && (
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={onBack}
              disabled={isLoading}
            >
              العودة
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
