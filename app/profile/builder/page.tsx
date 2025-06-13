import { Metadata } from "next";
import { ProfileWizard } from "@/components/profile/profile-wizard";

export const metadata: Metadata = {
  title: "إنشاء الملف الشخصي",
  description: "أكمل ملفك الشخصي للبدء في البحث عن شريك الحياة",
};

export default function ProfileBuilderPage() {
  // TODO: Add session and profile checks when NextAuth is properly configured

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary-900 mb-2">
              إنشاء الملف الشخصي
            </h1>
            <p className="text-gray-600">
              أكمل ملفك الشخصي للبدء في البحث عن شريك الحياة المناسب
            </p>
          </div>

          <ProfileWizard />
        </div>
      </div>
    </div>
  );
}
