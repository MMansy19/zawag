import { Metadata } from "next";
import { AuthContainer } from "@/components/auth/auth-container";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "تسجيل الدخول",
  description: "سجل دخولك للوصول إلى حسابك في منصة الزواج المبارك",
};

export default function LoginPage() {
  // TODO: Add session check when NextAuth is properly configured

  return (
    <AuthContainer
      title="مرحباً بعودتك"
      subtitle="سجل دخولك للوصول إلى حسابك"
      linkText="ليس لديك حساب؟ انشئ حساباً جديداً"
      linkHref="/auth/register"
    >
      <LoginForm />
    </AuthContainer>
  );
}
