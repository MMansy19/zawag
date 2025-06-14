"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Profile } from "@/lib/types";
import { useAuth } from "@/providers/auth-provider";
import { showToast } from "@/components/ui/toaster";
import { ArrowLeft, Heart, MessageCircle, Flag } from "lucide-react";
import { RequestModal } from "@/components/search/request-modal";

interface PublicProfileViewProps {
  userId: string;
}

export function PublicProfileView({ userId }: PublicProfileViewProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showRequestModal, setShowRequestModal] = useState(false);

  useEffect(() => {
    loadProfile();
  }, [userId]);
  const loadProfile = async () => {
    setLoading(true);
    try {
      // Get mock profile data from search profiles
      const { staticMaleProfiles, staticFemaleProfiles } = await import(
        "@/lib/static-data/search-profiles"
      );
      
      const allProfiles = [...staticMaleProfiles, ...staticFemaleProfiles];
      const foundProfile = allProfiles.find(p => p.id === userId);
      
      if (foundProfile) {
        setProfile(foundProfile);
      } else {
        // Fallback for non-existing IDs
        setProfile(null);
      }
    } catch (error: any) {
      showToast.error("خطأ في تحميل الملف الشخصي");
    } finally {
      setLoading(false);
    }
  };

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

  const handleSendRequest = async (message: string) => {
    try {
      // Mock API call - replace with actual API when backend is ready
      await new Promise(resolve => setTimeout(resolve, 1000));
      showToast.success("تم إرسال طلب الزواج بنجاح!");
      setShowRequestModal(false);
    } catch (error: any) {
      showToast.error("خطأ في إرسال الطلب");
    }
  };

  const handleReport = () => {
    showToast.info("تم تسجيل البلاغ. سيتم مراجعته من قبل الإدارة.");
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse space-y-6">
          <div className="bg-gray-200 rounded-lg h-32"></div>
          <div className="bg-gray-200 rounded-lg h-64"></div>
          <div className="bg-gray-200 rounded-lg h-48"></div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardContent className="text-center py-16">
            <div className="text-6xl mb-4">❌</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              لم يتم العثور على الملف الشخصي
            </h3>
            <p className="text-gray-600 mb-6">
              الملف الشخصي المطلوب غير موجود أو تم حذفه
            </p>
            <Button onClick={() => router.back()}>
              العودة للخلف
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header with navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          العودة
        </Button>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReport}
            className="flex items-center gap-2 text-red-600 hover:text-red-700"
          >
            <Flag className="h-4 w-4" />
            إبلاغ
          </Button>
        </div>
      </div>

      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {profile.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {profile.name}
                </h1>
                <p className="text-lg text-gray-600 mb-1">
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
            <div className="flex flex-col items-end gap-2">
              <Badge
                variant={profile.isVerified ? "success" : "outline"}
                className="text-sm"
              >
                {profile.isVerified ? "موثق ✓" : "غير موثق"}
              </Badge>
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowRequestModal(true)}
                  className="flex items-center gap-2"
                  disabled={!user}
                >
                  <Heart className="h-4 w-4" />
                  طلب زواج
                </Button>
              </div>
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
                {profile.maritalStatus === "single"
                  ? "أعزب/عزباء"
                  : profile.maritalStatus === "divorced"
                    ? "مطلق/مطلقة"
                    : "أرمل/أرملة"}
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
              </label>
              <p className="mt-1 text-sm text-gray-900">
                {profile.religiousLevel === "practicing"
                  ? "ملتزم"
                  : profile.religiousLevel === "moderate"
                    ? "متوسط"
                    : profile.religiousLevel === "very-religious"
                      ? "متدين جداً"
                      : "أساسي"}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.prays && (
                <Badge variant="outline">يصلي بانتظام</Badge>
              )}
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

        {/* Contact Information */}
        {profile.guardianName && (
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
            </CardContent>
          </Card>
        )}
      </div>

      {/* Bio */}
      {profile.bio && (
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">نبذة شخصية</h3>
          </CardHeader>
          <CardContent>
            <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
              {profile.bio}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setShowRequestModal(true)}
              size="lg"
              className="flex items-center gap-2"
              disabled={!user}
            >
              <Heart className="h-5 w-5" />
              إرسال طلب زواج
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="flex items-center gap-2"
              disabled={!user}
            >
              <MessageCircle className="h-5 w-5" />
              إرسال رسالة
            </Button>
          </div>
          {!user && (
            <p className="text-center text-sm text-gray-500 mt-4">
              يجب تسجيل الدخول لإرسال طلبات الزواج والرسائل
            </p>
          )}
        </CardContent>
      </Card>      {/* Request Modal */}
      {showRequestModal && (
        <RequestModal
          profileName={profile.name}
          onSend={handleSendRequest}
          onClose={() => setShowRequestModal(false)}
        />
      )}
    </div>
  );
}
