import { Metadata } from "next";
import { RegistrationWizard } from "@/components/auth/registration-wizard";

export const metadata: Metadata = {
  title: "إنشاء حساب جديد",
  description: "انشئ حساباً جديداً للانضمام إلى منصة الزواج السعيد",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            انضم إلى عائلة الزواج السعيد
          </h1>
          <p className="text-gray-600">
            انشئ حساباً جديداً للبدء في رحلة البحث عن شريك الحياة
          </p>
        </div>
        <RegistrationWizard />
      </div>
    </div>
  );
}
