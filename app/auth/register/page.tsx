import { Metadata } from "next";
import { AuthLayout } from "@/components/auth/auth-layout";
import { RegistrationWizard } from "@/components/auth/registration-wizard";

export const metadata: Metadata = {
  title: "إنشاء حساب جديد مجاني - الزواج السعيد",
  description:
    "انشئ حساباً مجانياً في منصة الزواج السعيد وابدأ رحلة البحث عن شريك الحياة. تسجيل آمن وسهل في خطوات بسيطة.",
  keywords: [
    "إنشاء حساب مجاني",
    "تسجيل جديد",
    "الانضمام للزواج السعيد",
    "حساب زواج جديد",
    "تسجيل مجاني",
    "انشاء حساب زواج",
  ],
  openGraph: {
    title: "انضم مجاناً إلى الزواج السعيد - أكثر من 100,000 عضو",
    description: "انشئ حساباً مجانياً وابدأ رحلة البحث عن شريك الحياة المناسب.",
    type: "website",
  },
  alternates: {
    canonical: "/auth/register",
  },
};

export default function RegisterPage() {
  return (
    <AuthLayout
      title="انضم إلى عائلة الزواج السعيد"
      subtitle="أكمل المعلومات التالية لإنشاء ملفك الشخصي"
      showBackLink
      backLinkText="لديك حساب بالفعل؟ سجل دخولك"
      backLinkHref="/auth/login"
    >
      <RegistrationWizard />
    </AuthLayout>
  );
}
