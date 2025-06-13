"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Profile } from "@/lib/types";
import { useAuth } from "@/providers/auth-provider";
import { profileApi } from "@/lib/api";
import { showToast } from "@/components/ui/toaster";

export function ProfileView() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const response = await profileApi.getProfile();
      if (response.success && response.data) {
        setProfile(response.data);
      }
    } catch (error: any) {
      showToast.error(error.message || "خطأ في تحميل الملف الشخصي");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse space-y-6">
          <div className="bg-gray-200 rounded-lg h-32"></div>
          <div className="bg-gray-200 rounded-lg h-64"></div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardContent className="text-center py-16">
            <div className="text-6xl mb-4">👤</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              لم يتم إنشاء الملف الشخصي بعد
            </h3>
            <p className="text-gray-600 mb-6">
              يرجى إكمال إنشاء ملفك الشخصي أولاً
            </p>
            <Button onClick={() => (window.location.href = "/profile/builder")}>
              إنشاء الملف الشخصي
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">الملف الشخصي</h1>
        <p className="text-gray-600">معلوماتك الشخصية وحالة الملف الشخصي</p>
      </div>

      {/* Profile Header */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
              <div>
                {" "}
                <h2 className="text-2xl font-bold text-gray-900">
                  {profile.name}
                </h2>
                <p className="text-gray-600">
                  {profile.birthDate
                    ? calculateAge(profile.birthDate)
                    : profile.age}{" "}
                  سنة
                </p>
                <p className="text-gray-600">
                  {profile.city}, {profile.country}
                </p>
              </div>
            </div>
            <div className="text-right">
              <Badge
                variant={profile.isVerified ? "success" : "outline"}
                className="mb-2"
              >
                {profile.isVerified ? "موثق ✓" : "غير موثق"}
              </Badge>
              <br />
              <Button size="sm" variant="outline">
                تعديل الملف الشخصي
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">المعلومات الشخصية</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                الاسم الكامل
              </label>
              <p className="mt-1 text-sm text-gray-900">{profile.name}</p>
            </div>{" "}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                العمر
              </label>
              <p className="mt-1 text-sm text-gray-900">
                {profile.birthDate
                  ? calculateAge(profile.birthDate)
                  : profile.age}{" "}
                سنة
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                الجنس
              </label>
              <p className="mt-1 text-sm text-gray-900">
                {profile.gender === "male" ? "ذكر" : "أنثى"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                الحالة الزوجية
              </label>
              <p className="mt-1 text-sm text-gray-900">
                {profile.maritalStatus}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                الجنسية
              </label>
              <p className="mt-1 text-sm text-gray-900">
                {profile.nationality}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Education & Work */}
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">التعليم والعمل</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                المستوى التعليمي
              </label>
              <p className="mt-1 text-sm text-gray-900">
                {profile.education || "غير محدد"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                المهنة
              </label>
              <p className="mt-1 text-sm text-gray-900">
                {profile.occupation || "غير محدد"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Religious Information */}
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">المعلومات الدينية</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                مستوى التدين
              </label>{" "}
              <p className="mt-1 text-sm text-gray-900">
                {profile.religiousLevel === "practicing"
                  ? "ملتزم"
                  : profile.religiousLevel === "moderate"
                    ? "متوسط"
                    : profile.religiousLevel === "very-religious"
                      ? "متدين جداً"
                      : "يتعلم"}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.prays && <Badge variant="outline">يصلي بانتظام</Badge>}
              {profile.fasts && <Badge variant="outline">يصوم</Badge>}
              {(profile.hijab || profile.hasHijab) && (
                <Badge variant="outline">ترتدي الحجاب</Badge>
              )}
              {(profile.beard || profile.hasBeard) && (
                <Badge variant="outline">يربي لحية</Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Guardian Information */}
        {(profile.guardianName || profile.guardianPhone) && (
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold">معلومات الولي</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile.guardianName && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    اسم الولي
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {profile.guardianName}
                  </p>
                </div>
              )}
              {profile.guardianPhone && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    هاتف الولي
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {profile.guardianPhone}
                  </p>
                </div>
              )}
              {profile.guardianEmail && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    بريد الولي
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {profile.guardianEmail}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Bio */}
      {profile.bio && (
        <Card className="mt-6">
          <CardHeader>
            <h3 className="text-xl font-semibold">نبذة شخصية</h3>
          </CardHeader>
          <CardContent>
            <p className="text-gray-800 whitespace-pre-wrap">{profile.bio}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
