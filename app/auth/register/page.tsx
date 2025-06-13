import { Metadata } from "next";
import { AuthContainer } from "@/components/auth/auth-container";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "إنشاء حساب جديد",
  description: "انشئ حساباً جديداً للانضمام إلى منصة الزواج السعيد",
};

export default function RegisterPage() {
  // TODO: Add session check when NextAuth is properly configured

  return (
    <AuthContainer
      title="انضم إلى عائلة الزواج السعيد"
      subtitle="انشئ حساباً جديداً للبدء في رحلة البحث عن شريك الحياة"
      linkText="لديك حساب بالفعل؟ سجل دخولك"
      linkHref="/auth/login"
    >
      <RegisterForm />
    </AuthContainer>
  );
}
