import { Metadata } from "next";
import { AuthContainer } from "@/components/auth/auth-container";
import { OTPVerificationForm } from "@/components/auth/otp-verification-form";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "تأكيد رمز التحقق",
  description: "أدخل رمز التحقق المرسل إلى هاتفك لتأكيد حسابك",
};

export default function VerifyOTPPage() {
  return (
    <AuthContainer
      title="تأكيد رمز التحقق"
      subtitle="أدخل رمز التحقق المكون من 6 أرقام المرسل إلى هاتفك"
      linkText="العودة إلى تسجيل الدخول"
      linkHref="/auth/login"
    >
      <Suspense fallback={<div className="animate-pulse">جاري التحميل...</div>}>
        <OTPVerificationForm email="" />
      </Suspense>
    </AuthContainer>
  );
}
