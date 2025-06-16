"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  User,
  Edit3,
  Save,
  X,
  MapPin,
  Calendar,
  Heart,
  Users,
  Shield,
  Home,
  Briefcase,
} from "lucide-react";
import {
  Profile,
  MaleProfile,
  FemaleProfile,
  isMaleProfile,
  isFemaleProfile,
  RELIGIOUS_LEVELS,
  APPEARANCE_LEVELS,
  SKIN_COLORS,
  BODY_TYPES,
  FINANCIAL_SITUATIONS,
  HOUSING_TYPES,
  CLOTHING_STYLES,
  GUARDIAN_RELATIONSHIPS,
} from "@/lib/types/auth.types";

// Mock user data
const mockUser = {
  id: "mock-user-123",
  gender: "male" as const,
};

export function ProfileView() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    try {
      // Mock profile data based on gender
      const mockProfile: MaleProfile = {
        id: mockUser.id,
        userId: mockUser.id,
        name: "أحمد محمد الشاذلي",
        age: 28,
        gender: "male",
        city: "القاهرة",
        country: "مصر",
        nationality: "مصري",
        maritalStatus: "single",
        education: "بكالوريوس هندسة حاسوب",
        occupation: "مطور برمجيات",
        religiousLevel: "practicing",
        bio: "أبحث عن شريكة حياة ملتزمة وتتشارك معي نفس القيم والأهداف في الحياة.",
        profilePicture: "/placeholder-male.jpg",
        preferences: {
          ageRange: { min: 22, max: 30 },
          country: "مصر",
          cities: ["القاهرة", "الجيزة"],
          religiousLevel: ["practicing", "very-religious"],
        },
        status: "approved",
        createdAt: "2024-01-15T10:00:00.000Z",
        updatedAt: "2024-06-01T14:30:00.000Z",

        // Common fields
        isPrayerRegular: true,
        areParentsAlive: "both",
        parentRelationship: "excellent",
        wantsChildren: "yes",
        height: 175,
        weight: 75,
        appearance: "attractive",
        skinColor: "medium",
        bodyType: "average",
        interests: ["القراءة", "الرياضة", "التكنولوجيا", "السفر"],
        marriageGoals: "تكوين أسرة مسلمة متماسكة وتربية أطفال صالحين",
        personalityDescription: "شخص هادئ ومحب للخير، أحب التعلم والتطوير",
        familyPlans: "أريد 2-3 أطفال، أهتم بالتربية الإسلامية",
        relocationPlans: "مستعد للانتقال للسعودية للعمل",
        marriageTimeline: "أريد الزواج في غضون سنة",

        // Male-specific fields
        hasBeard: true,
        prayingLocation: "mosque",
        isRegularAtMosque: true,
        smokes: false,
        financialSituation: "good",
        housingLocation: "القاهرة - مدينة نصر",
        housingOwnership: "owned",
        housingType: "independent",
        monthlyIncome: 8000,
      };

      setProfile(mockProfile);
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (section: string) => {
    setEditMode(section);
    setEditData({ ...profile });
  };

  const handleSave = async (section: string) => {
    setSubmitting(true);
    try {
      // Mock save - in real app, send to API
      setProfile({ ...editData });
      setEditMode(null);
      console.log("Profile updated:", editData);
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    setEditMode(null);
    setEditData({});
  };

  const renderBasicInfo = () => {
    const isEditing = editMode === "basic";

    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <User className="h-5 w-5" />
            المعلومات الأساسية
          </h3>
          {!isEditing ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleEdit("basic")}
            >
              <Edit3 className="h-4 w-4 ml-2" />
              تعديل
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => handleSave("basic")}
                disabled={submitting}
              >
                <Save className="h-4 w-4 ml-2" />
                حفظ
              </Button>
              <Button variant="outline" size="sm" onClick={handleCancel}>
                <X className="h-4 w-4 ml-2" />
                إلغاء
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent>
          {!isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    الاسم
                  </label>
                  <p className="text-lg font-medium">{profile?.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    العمر
                  </label>
                  <p className="text-lg">{profile?.age} سنة</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    الجنسية
                  </label>
                  <p className="text-lg">{profile?.nationality}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    الحالة الاجتماعية
                  </label>
                  <Badge variant="secondary">
                    {profile?.maritalStatus === "single"
                      ? "أعزب"
                      : profile?.maritalStatus === "divorced"
                        ? "مطلق"
                        : "أرمل"}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    المكان
                  </label>
                  <p className="text-lg flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {profile?.city}, {profile?.country}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    المهنة
                  </label>
                  <p className="text-lg">{profile?.occupation}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    الاسم
                  </label>
                  <Input
                    value={editData.name || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    العمر
                  </label>
                  <Input
                    type="number"
                    value={editData.age || ""}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        age: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    المدينة
                  </label>
                  <Input
                    value={editData.city || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, city: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    المهنة
                  </label>
                  <Input
                    value={editData.occupation || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, occupation: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderPhysicalInfo = () => {
    const isEditing = editMode === "physical";

    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <h3 className="text-lg font-semibold">المظهر الجسدي</h3>
          {!isEditing ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleEdit("physical")}
            >
              <Edit3 className="h-4 w-4 ml-2" />
              تعديل
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => handleSave("physical")}
                disabled={submitting}
              >
                <Save className="h-4 w-4 ml-2" />
                حفظ
              </Button>
              <Button variant="outline" size="sm" onClick={handleCancel}>
                <X className="h-4 w-4 ml-2" />
                إلغاء
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">الطول</label>
              {!isEditing ? (
                <p className="text-lg">{profile?.height} سم</p>
              ) : (
                <Input
                  type="number"
                  value={editData.height || ""}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      height: parseInt(e.target.value),
                    })
                  }
                />
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">الوزن</label>
              {!isEditing ? (
                <p className="text-lg">{profile?.weight} كجم</p>
              ) : (
                <Input
                  type="number"
                  value={editData.weight || ""}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      weight: parseInt(e.target.value),
                    })
                  }
                />
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                لون البشرة
              </label>
              {!isEditing ? (
                <p className="text-lg">
                  {profile?.skinColor === "fair"
                    ? "فاتح"
                    : profile?.skinColor === "medium"
                      ? "متوسط"
                      : profile?.skinColor === "olive"
                        ? "زيتوني"
                        : "داكن"}
                </p>
              ) : (
                <select
                  value={editData.skinColor || ""}
                  onChange={(e) =>
                    setEditData({ ...editData, skinColor: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value={SKIN_COLORS.FAIR}>فاتح</option>
                  <option value={SKIN_COLORS.MEDIUM}>متوسط</option>
                  <option value={SKIN_COLORS.OLIVE}>زيتوني</option>
                  <option value={SKIN_COLORS.DARK}>داكن</option>
                </select>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                بنية الجسم
              </label>
              {!isEditing ? (
                <p className="text-lg">
                  {profile?.bodyType === "slim"
                    ? "نحيف"
                    : profile?.bodyType === "average"
                      ? "متوسط"
                      : profile?.bodyType === "athletic"
                        ? "رياضي"
                        : "ممتلئ"}
                </p>
              ) : (
                <select
                  value={editData.bodyType || ""}
                  onChange={(e) =>
                    setEditData({ ...editData, bodyType: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value={BODY_TYPES.SLIM}>نحيف</option>
                  <option value={BODY_TYPES.AVERAGE}>متوسط</option>
                  <option value={BODY_TYPES.ATHLETIC}>رياضي</option>
                  <option value={BODY_TYPES.HEAVY}>ممتلئ</option>
                </select>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderReligiousInfo = () => {
    const isEditing = editMode === "religious";

    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Shield className="h-5 w-5" />
            المعلومات الدينية
          </h3>
          {!isEditing ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleEdit("religious")}
            >
              <Edit3 className="h-4 w-4 ml-2" />
              تعديل
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => handleSave("religious")}
                disabled={submitting}
              >
                <Save className="h-4 w-4 ml-2" />
                حفظ
              </Button>
              <Button variant="outline" size="sm" onClick={handleCancel}>
                <X className="h-4 w-4 ml-2" />
                إلغاء
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">
                  مستوى التدين
                </label>
                <Badge className="block w-fit">
                  {profile?.religiousLevel === "basic"
                    ? "أساسي"
                    : profile?.religiousLevel === "practicing"
                      ? "ممارس"
                      : "متدين جداً"}
                </Badge>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  انتظام الصلاة
                </label>
                <p className="text-lg">
                  {profile?.isPrayerRegular ? "منتظم" : "أحياناً"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  حالة الوالدين
                </label>
                <p className="text-lg">
                  {profile?.areParentsAlive === "both"
                    ? "كلاهما على قيد الحياة"
                    : profile?.areParentsAlive === "father"
                      ? "الأب فقط"
                      : profile?.areParentsAlive === "mother"
                        ? "الأم فقط"
                        : "كلاهما متوفي"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  رغبة في الأطفال
                </label>
                <Badge variant="outline">
                  {profile?.wantsChildren === "yes"
                    ? "نعم"
                    : profile?.wantsChildren === "no"
                      ? "لا"
                      : "ربما"}
                </Badge>
              </div>
            </div>

            {/* Gender-specific religious info */}
            {profile && isMaleProfile(profile) && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-6 bg-blue-500 rounded"></div>
                  <h4 className="font-semibold text-gray-800 text-lg">
                    معلومات خاصة بالأخ
                  </h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white p-4 rounded-lg border">
                    <label className="text-sm font-medium text-gray-600 block mb-2">
                      اللحية
                    </label>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={profile.hasBeard ? "success" : "secondary"}
                        className="text-sm"
                      >
                        {profile.hasBeard ? "✓ لديه لحية" : "✗ ليس لديه لحية"}
                      </Badge>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border">
                    <label className="text-sm font-medium text-gray-600 block mb-2">
                      مكان الصلاة المعتاد
                    </label>
                    <p className="text-sm font-medium">
                      {profile.prayingLocation === "mosque"
                        ? "🕌 في المسجد"
                        : profile.prayingLocation === "home"
                          ? "🏠 في البيت"
                          : "🕌🏠 في المسجد والبيت"}
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border">
                    <label className="text-sm font-medium text-gray-600 block mb-2">
                      الانتظام في المسجد
                    </label>
                    <Badge
                      variant={
                        profile.isRegularAtMosque ? "success" : "secondary"
                      }
                      className="text-sm"
                    >
                      {profile.isRegularAtMosque ? "✓ منتظم" : "أحياناً"}
                    </Badge>
                  </div>

                  <div className="bg-white p-4 rounded-lg border">
                    <label className="text-sm font-medium text-gray-600 block mb-2">
                      التدخين
                    </label>
                    <Badge
                      variant={profile.smokes ? "error" : "success"}
                      className="text-sm"
                    >
                      {profile.smokes ? "🚬 يدخن" : "🚭 لا يدخن"}
                    </Badge>
                  </div>

                  <div className="bg-white p-4 rounded-lg border">
                    <label className="text-sm font-medium text-gray-600 block mb-2">
                      الوضع المادي
                    </label>
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
                    <label className="text-sm font-medium text-gray-600 block mb-2">
                      نوع السكن
                    </label>
                    <p className="text-sm font-medium">
                      {profile.housingType === "independent"
                        ? "🏡 مستقل"
                        : profile.housingType === "with-family"
                          ? "👨‍👩‍👧‍👦 مع العائلة"
                          : "👥 مشترك"}
                    </p>
                  </div>
                </div>

                {/* Housing Details */}
                <div className="mt-6 p-4 bg-white rounded-lg border">
                  <h5 className="font-medium text-gray-800 mb-3">
                    تفاصيل السكن
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600 block mb-1">
                        موقع السكن
                      </label>
                      <p className="text-sm">{profile.housingLocation}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 block mb-1">
                        ملكية السكن
                      </label>
                      <p className="text-sm">
                        {profile.housingOwnership === "owned"
                          ? "🏠 ملك"
                          : profile.housingOwnership === "rented"
                            ? "🏠 إيجار"
                            : "👨‍👩‍👧‍👦 ملك العائلة"}
                      </p>
                    </div>
                    {profile.monthlyIncome && (
                      <div>
                        <label className="text-sm font-medium text-gray-600 block mb-1">
                          الدخل الشهري
                        </label>
                        <p className="text-sm font-semibold">
                          {profile.monthlyIncome.toLocaleString()} ريال
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {profile && isFemaleProfile(profile) && (
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-xl border border-pink-200">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-6 bg-pink-500 rounded"></div>
                  <h4 className="font-semibold text-gray-800 text-lg">
                    معلومات خاصة بالأخت
                  </h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white p-4 rounded-lg border">
                    <label className="text-sm font-medium text-gray-600 block mb-2">
                      الحجاب
                    </label>
                    <Badge
                      variant={profile.wearHijab ? "success" : "secondary"}
                      className="text-sm"
                    >
                      {profile.wearHijab
                        ? "🧕 ترتدي الحجاب"
                        : "لا ترتدي الحجاب"}
                    </Badge>
                  </div>

                  <div className="bg-white p-4 rounded-lg border">
                    <label className="text-sm font-medium text-gray-600 block mb-2">
                      النقاب
                    </label>
                    <Badge
                      variant={profile.wearNiqab ? "success" : "secondary"}
                      className="text-sm"
                    >
                      {profile.wearNiqab
                        ? "👤 ترتدي النقاب"
                        : "لا ترتدي النقاب"}
                    </Badge>
                  </div>

                  <div className="bg-white p-4 rounded-lg border">
                    <label className="text-sm font-medium text-gray-600 block mb-2">
                      أسلوب الملابس
                    </label>
                    <p className="text-sm font-medium">
                      {profile.clothingStyle === "conservative"
                        ? "👗 محافظ"
                        : profile.clothingStyle === "modest"
                          ? "👘 محتشم"
                          : "🥻 تقليدي"}
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border">
                    <label className="text-sm font-medium text-gray-600 block mb-2">
                      مكان الصلاة المعتاد
                    </label>
                    <p className="text-sm font-medium">
                      {profile.prayingLocation === "home"
                        ? "🏠 في البيت"
                        : "🕌 في المسجد عند الإمكان"}
                    </p>
                  </div>

                  {profile.workAfterMarriage && (
                    <div className="bg-white p-4 rounded-lg border">
                      <label className="text-sm font-medium text-gray-600 block mb-2">
                        العمل بعد الزواج
                      </label>
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
                      <label className="text-sm font-medium text-gray-600 block mb-2">
                        توفر المحرم
                      </label>
                      <Badge
                        variant={
                          profile.mahramAvailable ? "success" : "secondary"
                        }
                        className="text-sm"
                      >
                        {profile.mahramAvailable ? "✓ متوفر" : "غير متوفر"}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Guardian Information */}
                <div className="mt-6 p-4 bg-white rounded-lg border">
                  <h5 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-pink-600" />
                    معلومات ولي الأمر
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600 block mb-1">
                        اسم ولي الأمر
                      </label>
                      <p className="text-sm font-semibold">
                        {profile.guardianName}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 block mb-1">
                        صلة القرابة
                      </label>
                      <p className="text-sm">
                        {profile.guardianRelationship === "father"
                          ? "👨 الأب"
                          : profile.guardianRelationship === "brother"
                            ? "👨‍👦 الأخ"
                            : profile.guardianRelationship === "uncle"
                              ? "👨‍👦‍👦 العم/الخال"
                              : "👤 آخر"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 block mb-1">
                        رقم الهاتف
                      </label>
                      <p className="text-sm font-mono" dir="ltr">
                        {profile.guardianPhone}
                      </p>
                    </div>
                    {profile.guardianEmail && (
                      <div>
                        <label className="text-sm font-medium text-gray-600 block mb-1">
                          البريد الإلكتروني
                        </label>
                        <p className="text-sm font-mono" dir="ltr">
                          {profile.guardianEmail}
                        </p>
                      </div>
                    )}
                  </div>
                  {profile.guardianNotes && (
                    <div className="mt-4">
                      <label className="text-sm font-medium text-gray-600 block mb-1">
                        ملاحظات إضافية
                      </label>
                      <p className="text-sm bg-gray-50 p-3 rounded">
                        {profile.guardianNotes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderPersonalInfo = () => {
    const isEditing = editMode === "personal";

    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Heart className="h-5 w-5" />
            المعلومات الشخصية
          </h3>
          {!isEditing ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleEdit("personal")}
            >
              <Edit3 className="h-4 w-4 ml-2" />
              تعديل
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => handleSave("personal")}
                disabled={submitting}
              >
                <Save className="h-4 w-4 ml-2" />
                حفظ
              </Button>
              <Button variant="outline" size="sm" onClick={handleCancel}>
                <X className="h-4 w-4 ml-2" />
                إلغاء
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Interests */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                الاهتمامات
              </label>
              {!isEditing ? (
                <div className="flex flex-wrap gap-2 mt-2">
                  {profile?.interests?.map((interest, index) => (
                    <Badge key={index} variant="outline">
                      {interest}
                    </Badge>
                  ))}
                </div>
              ) : (
                <Input
                  value={editData.interests?.join(", ") || ""}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      interests: e.target.value
                        .split(",")
                        .map((i) => i.trim())
                        .filter(Boolean),
                    })
                  }
                  placeholder="اكتب الاهتمامات مفصولة بالفاصلة"
                />
              )}
            </div>

            {/* Marriage Goals */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                أهداف الزواج
              </label>
              {!isEditing ? (
                <p className="text-gray-800 mt-1">{profile?.marriageGoals}</p>
              ) : (
                <Textarea
                  value={editData.marriageGoals || ""}
                  onChange={(e) =>
                    setEditData({ ...editData, marriageGoals: e.target.value })
                  }
                  rows={3}
                />
              )}
            </div>

            {/* Personality Description */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                وصف الشخصية
              </label>
              {!isEditing ? (
                <p className="text-gray-800 mt-1">
                  {profile?.personalityDescription}
                </p>
              ) : (
                <Textarea
                  value={editData.personalityDescription || ""}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      personalityDescription: e.target.value,
                    })
                  }
                  rows={3}
                />
              )}
            </div>

            {/* Bio */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                نبذة شخصية
              </label>
              {!isEditing ? (
                <p className="text-gray-800 mt-1">{profile?.bio}</p>
              ) : (
                <Textarea
                  value={editData.bio || ""}
                  onChange={(e) =>
                    setEditData({ ...editData, bio: e.target.value })
                  }
                  rows={4}
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل الملف الشخصي...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <User className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          لم يتم العثور على الملف الشخصي
        </h3>
        <p className="text-gray-600">حدث خطأ في تحميل بياناتك الشخصية</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="h-20 w-20 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
              <User className="h-10 w-10 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">
                {profile.name}
              </h1>
              <div className="flex items-center gap-4 text-gray-600 mt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {profile.age} سنة
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {profile.city}, {profile.country}
                </span>
                {profile.status === "approved" && (
                  <Badge className="bg-green-100 text-green-800">✓ موثق</Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Sections */}
      {renderBasicInfo()}
      {renderPhysicalInfo()}
      {renderReligiousInfo()}
      {renderPersonalInfo()}

      {/* Male-specific Housing Info */}
      {profile && isMaleProfile(profile) && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Home className="h-5 w-5" />
              معلومات السكن والمعيشة
            </h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">
                  مكان السكن
                </label>
                <p className="text-lg">{profile.housingLocation}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  ملكية السكن
                </label>
                <Badge>
                  {profile.housingOwnership === "owned"
                    ? "تمليك"
                    : profile.housingOwnership === "rented"
                      ? "إيجار"
                      : "ملك الأسرة"}
                </Badge>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  نوع السكن
                </label>
                <p className="text-lg">
                  {profile.housingType === "independent"
                    ? "مستقل"
                    : profile.housingType === "with-family"
                      ? "مع الأسرة"
                      : "مشترك"}
                </p>
              </div>
              {profile.monthlyIncome && (
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    الدخل الشهري
                  </label>
                  <p className="text-lg">
                    {profile.monthlyIncome.toLocaleString()} جنيه
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
