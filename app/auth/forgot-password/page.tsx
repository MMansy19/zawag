import { Metadata } from "next";
import { AuthContainer } from "@/components/auth/auth-container";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata: Metadata = {
  title: "نسيت كلمة المرور",
  description: "أعد تعيين كلمة المرور الخاصة بك",
};

export default function ForgotPasswordPage() {
  return (
    <AuthContainer
      title="نسيت كلمة المرور؟"
      subtitle="أدخل رقم هاتفك لإرسال رمز إعادة تعيين كلمة المرور"
      linkText="العودة إلى تسجيل الدخول"
      linkHref="/auth/login"
    >
      <ForgotPasswordForm />
    </AuthContainer>
  );
}
