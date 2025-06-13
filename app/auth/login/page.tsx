import { Metadata } from "next";
import { AuthContainer } from "@/components/auth/auth-container";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "تسجيل الدخول - الزواج السعيد",
  description:
    "سجل دخولك لحسابك في منصة الزواج السعيد واستكمل رحلة البحث عن شريك الحياة. دخول آمن ومحمي.",
  keywords: [
    "تسجيل الدخول",
    "دخول الزواج السعيد",
    "تسجيل دخول آمن",
    "حساب الزواج",
    "الدخول للحساب",
  ],
  openGraph: {
    title: "تسجيل الدخول - الزواج السعيد",
    description: "سجل دخولك لحسابك واستكمل رحلة البحث عن شريك الحياة.",
    type: "website",
  },
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/auth/login",
  },
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
