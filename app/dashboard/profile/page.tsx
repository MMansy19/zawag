import { ProfileView } from "@/components/profile/profile-view";

export default function ProfilePage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center sm:text-right">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
          الملف الشخصي 👤
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          عرض وتحديث معلوماتك الشخصية
        </p>
      </div>

      <ProfileView />
    </div>
  );
}
