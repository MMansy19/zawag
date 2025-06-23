"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Profile,
  MaleProfile,
  FemaleProfile,
  isMaleProfile,
  isFemaleProfile,
} from "@/lib/types";
import { useAuth } from "@/providers/auth-provider";
import { showToast } from "@/components/ui/toaster";
import { ArrowLeft, Heart, MessageCircle, Flag } from "lucide-react";
import { RequestModal } from "@/components/search/request-modal";

// Mock user for development - replace with actual auth when ready
const user = {
  id: "mock-user-123",
  name: "محمود المنسي",
  email: "mahmoud@example.com",
  isVerified: true,
};
interface PublicProfileViewProps {
  userId: string;
}

export function PublicProfileView({ userId }: PublicProfileViewProps) {
  const router = useRouter();
  //   const { user } = useAuth();
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
      const foundProfile = allProfiles.find((p) => p.id === userId);

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
      await new Promise((resolve) => setTimeout(resolve, 1000));
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
            <Button onClick={() => router.back()}>العودة للخلف</Button>
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
      <Card
        className={`border-l-4 ${isMaleProfile(profile) ? "border-l-primary bg-gradient-to-r from-primary-subtle to-white" : "border-l-pink-500 bg-gradient-to-r from-pink-50 to-white"}`}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div
                className={`w-20 h-20 ${isMaleProfile(profile) ? "bg-gradient-to-br from-primary-light to-primary" : "bg-gradient-to-br from-pink-400 to-pink-600"} rounded-full flex items-center justify-center text-white text-2xl font-bold`}
              >
                {isMaleProfile(profile) ? "👨" : "👩"}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {profile.name}
                  </h1>
                  {profile.status === "approved" && (
                    <Badge className="bg-green-100 text-green-800">
                      ✓ موثق
                    </Badge>
                  )}
                  <Badge
                    variant={isMaleProfile(profile) ? "secondary" : "outline"}
                    className={
                      isMaleProfile(profile)
                        ? "bg-primary-subtle text-primary"
                        : "bg-pink-100 text-pink-800"
                    }
                  >
                    {isMaleProfile(profile) ? "أخ" : "أخت"}
                  </Badge>
                </div>
                <p className="text-lg text-gray-600 mb-1">{profile.age} سنة</p>
                <p className="text-gray-600">
                  {profile.city}, {profile.country}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge>
                    {profile.religiousLevel === "basic"
                      ? "أساسي"
                      : profile.religiousLevel === "practicing"
                        ? "ممارس"
                        : "متدين جداً"}
                  </Badge>
                  <Badge variant="outline">
                    {profile.maritalStatus === "single"
                      ? "أعزب"
                      : profile.maritalStatus === "divorced"
                        ? "مطلق"
                        : "أرمل"}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowRequestModal(true)}
                  className={`flex items-center gap-2 ${isMaleProfile(profile) ? "bg-primary hover:bg-primary-hover" : "bg-pink-600 hover:bg-pink-700"}`}
                  disabled={!user}
                >
                  <Heart className="h-4 w-4" />
                  طلب تعارف
                </Button>
              </div>
            </div>
          </div>

          {/* Bio */}
          {profile.bio && (
            <div className="border-t pt-4">
              <h3 className="font-medium text-gray-900 mb-2">نبذة شخصية</h3>
              <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
            </div>
          )}
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
              {profile.prays && <Badge variant="outline">يصلي بانتظام</Badge>}
              {profile.fasts && <Badge variant="outline">يصوم</Badge>}
              {isFemaleProfile(profile) &&
                (profile.wearHijab || profile.hasHijab || profile.hijab) && (
                  <Badge variant="outline">ترتدي الحجاب</Badge>
                )}
              {isMaleProfile(profile) &&
                (profile.hasBeard || profile.beard) && (
                  <Badge variant="outline">يربي لحية</Badge>
                )}
            </div>
          </CardContent>
        </Card>{" "}
        {/* Contact Information - Only show for female profiles */}
        {profile.gender === "female" && profile.guardianName && (
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
      {/* Gender-specific Information */}
      {isMaleProfile(profile) && (
        <Card className="border-primary-light bg-gradient-to-r from-primary-subtle to-primary-subtle/50">
          <CardHeader>
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-primary">👨</span>
              معلومات خاصة بالأخ
            </h3>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Religious Practices */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border">
                <span className="text-sm text-gray-600 block mb-1">اللحية</span>
                <Badge
                  variant={profile.hasBeard ? "success" : "secondary"}
                  className="text-sm"
                >
                  {profile.hasBeard ? "✓ لديه لحية" : "✗ ليس لديه لحية"}
                </Badge>
              </div>

              <div className="bg-white p-4 rounded-lg border">
                <span className="text-sm text-gray-600 block mb-1">
                  مكان الصلاة
                </span>
                <span className="text-sm font-medium">
                  {profile.prayingLocation === "mosque"
                    ? "🕌 في المسجد"
                    : profile.prayingLocation === "home"
                      ? "🏠 في البيت"
                      : "🕌🏠 في المسجد والبيت"}
                </span>
              </div>

              <div className="bg-white p-4 rounded-lg border">
                <span className="text-sm text-gray-600 block mb-1">
                  الانتظام في المسجد
                </span>
                <Badge
                  variant={profile.isRegularAtMosque ? "success" : "secondary"}
                  className="text-sm"
                >
                  {profile.isRegularAtMosque ? "✓ منتظم" : "أحياناً"}
                </Badge>
              </div>

              <div className="bg-white p-4 rounded-lg border">
                <span className="text-sm text-gray-600 block mb-1">
                  التدخين
                </span>
                <Badge
                  variant={profile.smokes ? "error" : "success"}
                  className="text-sm"
                >
                  {profile.smokes ? "🚬 يدخن" : "🚭 لا يدخن"}
                </Badge>
              </div>

              <div className="bg-white p-4 rounded-lg border">
                <span className="text-sm text-gray-600 block mb-1">
                  الوضع المادي
                </span>
                <Badge
                  variant={
                    profile.financialSituation === "excellent"
                      ? "success"
                      : profile.financialSituation === "good"
                        ? "secondary"
                        : profile.financialSituation === "average"
                          ? "outline"
                          : "error"
                  }
                  className="text-sm"
                >
                  {profile.financialSituation === "excellent"
                    ? "💰 ممتاز"
                    : profile.financialSituation === "good"
                      ? "💵 جيد"
                      : profile.financialSituation === "average"
                        ? "💳 متوسط"
                        : "⚠️ صعب"}
                </Badge>
              </div>

              <div className="bg-white p-4 rounded-lg border">
                <span className="text-sm text-gray-600 block mb-1">
                  نوع السكن
                </span>
                <span className="text-sm font-medium">
                  {profile.housingType === "family"
                    ? "🏡 مستقل"
                    : profile.housingType === "with-family"
                      ? "👨‍👩‍👧‍👦 مع العائلة"
                      : "👥 مشترك"}
                </span>
              </div>
            </div>

            {/* Housing Details */}
            {(profile.housingLocation ||
              profile.housingOwnership ||
              profile.monthlyIncome) && (
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-medium text-gray-800 mb-3">
                  تفاصيل السكن والدخل
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {profile.housingLocation && (
                    <div>
                      <span className="text-gray-600 block">موقع السكن</span>
                      <span className="font-medium">
                        {profile.housingLocation}
                      </span>
                    </div>
                  )}
                  {profile.housingOwnership && (
                    <div>
                      <span className="text-gray-600 block">ملكية السكن</span>
                      <span className="font-medium">
                        {profile.housingOwnership === "owned"
                          ? "🏠 ملك"
                          : profile.housingOwnership === "rented"
                            ? "🏠 إيجار"
                            : "👨‍👩‍👧‍👦 ملك العائلة"}
                      </span>
                    </div>
                  )}
                  {profile.monthlyIncome && (
                    <div>
                      <span className="text-gray-600 block">الدخل الشهري</span>
                      <span className="font-semibold">
                        {profile.monthlyIncome.toLocaleString()} ريال
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
      {isFemaleProfile(profile) && (
        <Card className="border-pink-200 bg-gradient-to-r from-pink-50 to-purple-50">
          <CardHeader>
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-pink-500">👩</span>
              معلومات خاصة بالأخت
            </h3>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Religious Practices */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border">
                <span className="text-sm text-gray-600 block mb-1">الحجاب</span>
                <Badge
                  variant={profile.wearHijab ? "success" : "secondary"}
                  className="text-sm"
                >
                  {profile.wearHijab ? "🧕 ترتدي الحجاب" : "لا ترتدي الحجاب"}
                </Badge>
              </div>

              <div className="bg-white p-4 rounded-lg border">
                <span className="text-sm text-gray-600 block mb-1">النقاب</span>
                <Badge
                  variant={profile.wearNiqab ? "success" : "secondary"}
                  className="text-sm"
                >
                  {profile.wearNiqab ? "👤 ترتدي النقاب" : "لا ترتدي النقاب"}
                </Badge>
              </div>

              <div className="bg-white p-4 rounded-lg border">
                <span className="text-sm text-gray-600 block mb-1">
                  أسلوب الملابس
                </span>
                <span className="text-sm font-medium">
                  {profile.clothingStyle === "niqab-full" ||
                  profile.clothingStyle === "niqab-hands"
                    ? "نقاب"
                    : profile.clothingStyle === "khimar"
                      ? "خمار"
                      : profile.clothingStyle === "hijab-conservative"
                        ? "حجاب محافظ"
                        : profile.clothingStyle === "hijab-modest"
                          ? "حجاب محتشم"
                          : profile.clothingStyle === "hijab-modern"
                            ? "حجاب عصري"
                            : profile.clothingStyle === "loose-covering"
                              ? "لباس فضفاض"
                              : "لباس محتشم"}
                </span>
              </div>

              <div className="bg-white p-4 rounded-lg border">
                <span className="text-sm text-gray-600 block mb-1">
                  مكان الصلاة
                </span>
                <span className="text-sm font-medium">
                  {profile.prayingLocation === "home"
                    ? "🏠 في البيت"
                    : "🕌 في المسجد عند الإمكان"}
                </span>
              </div>

              {profile.workAfterMarriage && (
                <div className="bg-white p-4 rounded-lg border">
                  <span className="text-sm text-gray-600 block mb-1">
                    العمل بعد الزواج
                  </span>
                  <Badge
                    variant={
                      profile.workAfterMarriage === "yes"
                        ? "secondary"
                        : profile.workAfterMarriage === "no"
                          ? "outline"
                          : "secondary"
                    }
                    className="text-sm"
                  >
                    {profile.workAfterMarriage === "yes"
                      ? "💼 تريد العمل"
                      : profile.workAfterMarriage === "no"
                        ? "🏠 تفضل البقاء في البيت"
                        : "🤔 لم تحدد بعد"}
                  </Badge>
                </div>
              )}

              {profile.mahramAvailable !== undefined && (
                <div className="bg-white p-4 rounded-lg border">
                  <span className="text-sm text-gray-600 block mb-1">
                    توفر المحرم
                  </span>
                  <Badge
                    variant={profile.mahramAvailable ? "success" : "secondary"}
                    className="text-sm"
                  >
                    {profile.mahramAvailable ? "✓ متوفر" : "غير متوفر"}
                  </Badge>
                </div>
              )}
            </div>

            {/* Guardian Information */}
            {(profile.guardianName || profile.guardianPhone) && (
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                  <span className="text-pink-600">🛡️</span>
                  معلومات ولي الأمر
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {profile.guardianName && (
                    <div>
                      <span className="text-gray-600 block">اسم ولي الأمر</span>
                      <span className="font-semibold">
                        {profile.guardianName}
                      </span>
                    </div>
                  )}
                  {profile.guardianRelationship && (
                    <div>
                      <span className="text-gray-600 block">صلة القرابة</span>
                      <span className="font-medium">
                        {profile.guardianRelationship === "father"
                          ? "👨 الأب"
                          : profile.guardianRelationship === "brother"
                            ? "👨‍👦 الأخ"
                            : profile.guardianRelationship === "uncle"
                              ? "👨‍👦‍👦 العم/الخال"
                              : "👤 آخر"}
                      </span>
                    </div>
                  )}
                  {profile.guardianPhone && (
                    <div>
                      <span className="text-gray-600 block">رقم الهاتف</span>
                      <span className="font-mono text-sm" dir="ltr">
                        {profile.guardianPhone}
                      </span>
                    </div>
                  )}
                  {profile.guardianEmail && (
                    <div>
                      <span className="text-gray-600 block">
                        البريد الإلكتروني
                      </span>
                      <span className="font-mono text-sm" dir="ltr">
                        {profile.guardianEmail}
                      </span>
                    </div>
                  )}
                </div>
                {profile.guardianNotes && (
                  <div className="mt-4">
                    <span className="text-gray-600 block mb-1">
                      ملاحظات إضافية
                    </span>
                    <p className="text-sm bg-gray-50 p-3 rounded">
                      {profile.guardianNotes}
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
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
              إرسال طلب تعارف
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="flex items-center gap-2"
              disabled={true}
              title="يجب قبول طلبات الزواج من الطرفين أولاً"
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
      </Card>{" "}
      {/* Request Modal */}
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
