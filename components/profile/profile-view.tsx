"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Profile } from "@/lib/types";
import { useAuth } from "@/providers/auth-provider";
import { profileApi } from "@/lib/api";
import { showToast } from "@/components/ui/toaster";
import {
  basicInfoSchema,
  religiousInfoSchema,
  educationWorkSchema,
  bioSchema,
  guardianInfoSchema,
} from "@/lib/validation";
import {
  getCountriesByGroup,
  getOccupationsByCategory,
  getCitiesGroupedByCountry,
  getNationalitiesByGroup,
} from "@/lib/static-data";

// Mock user data
const user = {
  id: "mock-user-123",
  name: "محمود المنسي",
  email: "mahmoud@example.com",
  isVerified: true
};

export function ProfileView() {
  // const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});
  const [canEdit, setCanEdit] = useState(true);
  const [lastEditDate, setLastEditDate] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadProfile();
    checkEditPermission();
  }, []);

  const loadProfile = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Use mocked data until server is ready
      const mockProfile: Profile = {
        id: user.id || "mock-user-id",
        userId: user.id || "mock-user-id",
        name: "محمود المنسي",
        age: 23,
        birthDate: "2003-05-15",
        gender: "male",
        city: "القاهرة",
        country: "مصر",
        nationality: "مصري",
        maritalStatus: "single",
        religiousLevel: "practicing",
        prays: true,
        fasts: true,
        hasBeard: true,
        hasHijab: false,
        education: "بكالوريوس هندسة حاسوب",
        occupation: "مطور برمجيات",
        bio: "أبحث عن شريكة حياة ملتزمة وتتشارك معي نفس القيم والأهداف في الحياة. أحب القراءة والرياضة والسفر. أسعى لبناء أسرة سعيدة ومترابطة.",
        guardianName: "محمد علي أحمد",
        guardianPhone: "+966509876543",
        guardianEmail: "guardian@example.com",
        isVerified: true,
        isComplete: true,
        isApproved: true,
        privacySettings: {
          showProfilePicture: "everyone",
          showAge: true,
          showLocation: true,
          showOccupation: true,
          allowMessagesFrom: "everyone"
        },
        createdAt: "2024-01-15T10:00:00.000Z",
        updatedAt: "2024-06-01T14:30:00.000Z"
      };
      console.log("Mock profile loaded:", mockProfile);
      
      setProfile(mockProfile);
      // Check last edit date from localStorage
      const lastEdit = localStorage.getItem(`profile_last_edit_${user.id}`);
      setLastEditDate(lastEdit);
    } catch (error: any) {
      showToast.error(error.message || "خطأ في تحميل الملف الشخصي");
    } finally {
      setLoading(false);
    }
  };

  const checkEditPermission = () => {
    const lastEditStr = localStorage.getItem(`profile_last_edit_${user?.id}`);
    if (!lastEditStr) {
      setCanEdit(true);
      return;
    }

    const lastEditDate = new Date(lastEditStr);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    setCanEdit(lastEditDate <= oneWeekAgo);
  };

  const handleEditStart = (section: string) => {
    if (!canEdit) {
      showToast.error("يمكنك تعديل الملف الشخصي مرة واحدة كل أسبوع");
      return;
    }

    setEditMode(section);

    // Initialize edit data based on section
    switch (section) {
      case "basic":
        setEditData({
          name: profile?.name || "",
          age: profile?.age || 18,
          city: profile?.city || "",
          nationality: profile?.nationality || "",
          maritalStatus: profile?.maritalStatus || "single",
        });
        break;
      case "religious":
        setEditData({
          religiousLevel: profile?.religiousLevel || "practicing",
          prays: profile?.prays ?? true,
          fasts: profile?.fasts ?? true,
          hasHijab: profile?.hasHijab || profile?.hijab || false,
          hasBeard: profile?.hasBeard || profile?.beard || false,
        });
        break;
      case "education":
        setEditData({
          education: profile?.education || "",
          occupation: profile?.occupation || "",
        });
        break;
      case "bio":
        setEditData({
          bio: profile?.bio || "",
        });
        break;
      case "guardian":
        setEditData({
          guardianName: profile?.guardianName || "",
          guardianPhone: profile?.guardianPhone || "",
          guardianEmail: profile?.guardianEmail || "",
        });
        break;
    }
  };

  const handleEditCancel = () => {
    setEditMode(null);
    setEditData({});
  };

  const handleEditSave = async () => {
    if (!editMode || !profile) return;

    setSubmitting(true);
    try {
      // Mock update - simulate API response by updating local state
      const updatedProfile = { ...profile };

      switch (editMode) {
        case "basic":
          const basicData = basicInfoSchema.parse({
            ...editData,
            gender: profile.gender, // Keep original gender
            country: profile.country, // Keep original country
          });
          Object.assign(updatedProfile, basicData);
          break;
        case "religious":
          const religiousData = religiousInfoSchema.parse(editData);
          Object.assign(updatedProfile, religiousData);
          break;
        case "education":
          const educationData = educationWorkSchema.parse(editData);
          Object.assign(updatedProfile, educationData);
          break;
        case "bio":
          const bioData = bioSchema.parse(editData);
          Object.assign(updatedProfile, bioData);
          break;
        case "guardian":
          const guardianData = guardianInfoSchema.parse(editData);
          Object.assign(updatedProfile, guardianData);
          break;
        default:
          throw new Error("نوع التعديل غير صالح");
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Update the profile state
      updatedProfile.updatedAt = new Date().toISOString();
      setProfile(updatedProfile);
      setEditMode(null);
      setEditData({});

      // Update last edit date
      const now = new Date().toISOString();
      localStorage.setItem(`profile_last_edit_${user?.id}`, now);
      setLastEditDate(now);
      setCanEdit(false);

      showToast.success("تم تحديث الملف الشخصي بنجاح");
    } catch (error: any) {
      showToast.error(error.message || "خطأ في تحديث الملف الشخصي");
    } finally {
      setSubmitting(false);
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

  const getTimeUntilNextEdit = () => {
    if (!lastEditDate) return null;

    const lastEdit = new Date(lastEditDate);
    const nextEdit = new Date(lastEdit);
    nextEdit.setDate(nextEdit.getDate() + 7);

    const now = new Date();
    const diff = nextEdit.getTime() - now.getTime();

    if (diff <= 0) return null;

    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  const renderBasicInfoEdit = () => (
    <div className="space-y-4">
      <Input
        label="الاسم الكامل"
        value={editData.name || ""}
        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
        placeholder="أدخل اسمك الكامل"
        disabled={submitting}
        required
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="العمر"
          type="number"
          value={editData.age || ""}
          onChange={(e) =>
            setEditData({ ...editData, age: parseInt(e.target.value) })
          }
          placeholder="أدخل عمرك"
          min="18"
          max="80"
          disabled={submitting}
          required
        />
        <Input
          label="المدينة"
          value={editData.city || ""}
          onChange={(e) => setEditData({ ...editData, city: e.target.value })}
          placeholder="أدخل مدينتك"
          disabled={submitting}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            الجنسية *
          </label>
          <select
            value={editData.nationality || ""}
            onChange={(e) =>
              setEditData({ ...editData, nationality: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
            disabled={submitting}
            required
          >
            <option value="">اختر الجنسية</option>
            {Object.entries(getNationalitiesByGroup()).map(
              ([group, nationalities]) => (
                <optgroup key={group} label={group}>
                  {nationalities.map((nationality) => (
                    <option key={nationality.value} value={nationality.value}>
                      {nationality.label}
                    </option>
                  ))}
                </optgroup>
              ),
            )}
          </select>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            الحالة الزوجية *
          </label>
          <select
            value={editData.maritalStatus || ""}
            onChange={(e) =>
              setEditData({ ...editData, maritalStatus: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
            disabled={submitting}
            required
          >
            <option value="">اختر الحالة الزوجية</option>
            <option value="single">أعزب/عزباء</option>
            <option value="divorced">مطلق/مطلقة</option>
            <option value="widowed">أرمل/أرملة</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderReligiousInfoEdit = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          مستوى التدين *
        </label>
        <select
          value={editData.religiousLevel || "practicing"}
          onChange={(e) =>
            setEditData({ ...editData, religiousLevel: e.target.value })
          }
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
          disabled={submitting}
          required
        >
          <option value="basic">أساسي</option>
          <option value="practicing">ممارس</option>
          <option value="very-religious">متدين جداً</option>
        </select>
      </div>
      <div className="space-y-3">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="prays"
            checked={editData.prays ?? true}
            onChange={(e) =>
              setEditData({ ...editData, prays: e.target.checked })
            }
            className="ml-2"
            disabled={submitting}
          />
          <label htmlFor="prays" className="text-sm font-medium text-gray-700">
            أصلي الصلوات الخمس
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="fasts"
            checked={editData.fasts ?? true}
            onChange={(e) =>
              setEditData({ ...editData, fasts: e.target.checked })
            }
            className="ml-2"
            disabled={submitting}
          />
          <label htmlFor="fasts" className="text-sm font-medium text-gray-700">
            أصوم رمضان
          </label>
        </div>
        {profile?.gender === "female" && (
          <div className="flex items-center">
            <input
              type="checkbox"
              id="hasHijab"
              checked={editData.hasHijab ?? false}
              onChange={(e) =>
                setEditData({ ...editData, hasHijab: e.target.checked })
              }
              className="ml-2"
              disabled={submitting}
            />
            <label
              htmlFor="hasHijab"
              className="text-sm font-medium text-gray-700"
            >
              أرتدي الحجاب
            </label>
          </div>
        )}
        {profile?.gender === "male" && (
          <div className="flex items-center">
            <input
              type="checkbox"
              id="hasBeard"
              checked={editData.hasBeard ?? false}
              onChange={(e) =>
                setEditData({ ...editData, hasBeard: e.target.checked })
              }
              className="ml-2"
              disabled={submitting}
            />
            <label
              htmlFor="hasBeard"
              className="text-sm font-medium text-gray-700"
            >
              أربي لحية
            </label>
          </div>
        )}
      </div>
    </div>
  );

  const renderEducationEdit = () => (
    <div className="space-y-4">
      <Input
        label="المستوى التعليمي"
        value={editData.education || ""}
        onChange={(e) =>
          setEditData({ ...editData, education: e.target.value })
        }
        placeholder="مثال: بكالوريوس هندسة"
        disabled={submitting}
        required
      />
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          المهنة *
        </label>
        <select
          value={editData.occupation || ""}
          onChange={(e) =>
            setEditData({ ...editData, occupation: e.target.value })
          }
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
          disabled={submitting}
          required
        >
          <option value="">اختر المهنة</option>
          {Object.entries(getOccupationsByCategory()).map(
            ([category, occupations]) => (
              <optgroup key={category} label={category}>
                {occupations.map((occupation) => (
                  <option key={occupation.value} value={occupation.value}>
                    {occupation.label}
                  </option>
                ))}
              </optgroup>
            ),
          )}
        </select>
      </div>
    </div>
  );

  const renderBioEdit = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          نبذة شخصية
        </label>
        <textarea
          value={editData.bio || ""}
          onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
          rows={6}
          maxLength={500}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          placeholder="اكتب نبذة عن نفسك، اهتماماتك، أهدافك، وما تبحث عنه في شريك الحياة..."
          disabled={submitting}
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>الحد الأقصى: 500 حرف</span>
          <span>{editData.bio?.length || 0} / 500</span>
        </div>
      </div>
    </div>
  );

  const renderGuardianEdit = () => (
    <div className="space-y-4">
      <Input
        label="اسم الولي"
        value={editData.guardianName || ""}
        onChange={(e) =>
          setEditData({ ...editData, guardianName: e.target.value })
        }
        placeholder="أدخل اسم الولي"
        disabled={submitting}
      />
      <Input
        label="هاتف الولي"
        value={editData.guardianPhone || ""}
        onChange={(e) =>
          setEditData({ ...editData, guardianPhone: e.target.value })
        }
        placeholder="أدخل رقم هاتف الولي"
        disabled={submitting}
      />
      <Input
        label="بريد الولي الإلكتروني"
        type="email"
        value={editData.guardianEmail || ""}
        onChange={(e) =>
          setEditData({ ...editData, guardianEmail: e.target.value })
        }
        placeholder="أدخل بريد الولي الإلكتروني"
        disabled={submitting}
      />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">الملف الشخصي</h1>
        <div className="flex items-center justify-between">
          <p className="text-gray-600">معلوماتك الشخصية وحالة الملف الشخصي</p>
          {!canEdit && (
            <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
              {getTimeUntilNextEdit() && (
                <>يمكنك التعديل بعد {getTimeUntilNextEdit()} أيام</>
              )}
            </div>
          )}
        </div>
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
                <p className="text-xs text-gray-500 mt-1">
                  الجنس والبلد غير قابلان للتعديل
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
              <div className="text-xs text-gray-500">
                {canEdit ? "يمكنك التعديل" : "تم التعديل مؤخراً"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">المعلومات الشخصية</h3>
              {editMode === "basic" ? (
                <div className="space-x-2 space-x-reverse">
                  <Button
                    size="sm"
                    onClick={handleEditSave}
                    disabled={submitting}
                    className="ml-2"
                  >
                    {submitting ? "جاري الحفظ..." : "حفظ"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleEditCancel}
                    disabled={submitting}
                  >
                    إلغاء
                  </Button>
                </div>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEditStart("basic")}
                  disabled={!canEdit}
                >
                  تعديل
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {editMode === "basic" ? (
              renderBasicInfoEdit()
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    الاسم الكامل
                  </label>
                  <p className="mt-1 text-sm text-gray-900">{profile.name}</p>
                </div>
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
                    <span className="text-xs text-gray-500 mr-2">
                      (غير قابل للتعديل)
                    </span>
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    البلد
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {profile.country}
                    <span className="text-xs text-gray-500 mr-2">
                      (غير قابل للتعديل)
                    </span>
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    المدينة
                  </label>
                  <p className="mt-1 text-sm text-gray-900">{profile.city}</p>
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
              </>
            )}
          </CardContent>
        </Card>

        {/* Education & Work */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">التعليم والعمل</h3>
              {editMode === "education" ? (
                <div className="space-x-2 space-x-reverse">
                  <Button
                    size="sm"
                    onClick={handleEditSave}
                    disabled={submitting}
                    className="ml-2"
                  >
                    {submitting ? "جاري الحفظ..." : "حفظ"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleEditCancel}
                    disabled={submitting}
                  >
                    إلغاء
                  </Button>
                </div>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEditStart("education")}
                  disabled={!canEdit}
                >
                  تعديل
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {editMode === "education" ? (
              renderEducationEdit()
            ) : (
              <>
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
              </>
            )}
          </CardContent>
        </Card>

        {/* Religious Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">المعلومات الدينية</h3>
              {editMode === "religious" ? (
                <div className="space-x-2 space-x-reverse">
                  <Button
                    size="sm"
                    onClick={handleEditSave}
                    disabled={submitting}
                    className="ml-2"
                  >
                    {submitting ? "جاري الحفظ..." : "حفظ"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleEditCancel}
                    disabled={submitting}
                  >
                    إلغاء
                  </Button>
                </div>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEditStart("religious")}
                  disabled={!canEdit}
                >
                  تعديل
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {editMode === "religious" ? (
              renderReligiousInfoEdit()
            ) : (
              <>
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
              </>
            )}
          </CardContent>
        </Card>

        {/* Guardian Information */}
        {(profile.guardianName ||
          profile.guardianPhone ||
          editMode === "guardian") && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">معلومات الولي</h3>
                {editMode === "guardian" ? (
                  <div className="space-x-2 space-x-reverse">
                    <Button
                      size="sm"
                      onClick={handleEditSave}
                      disabled={submitting}
                      className="ml-2"
                    >
                      {submitting ? "جاري الحفظ..." : "حفظ"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleEditCancel}
                      disabled={submitting}
                    >
                      إلغاء
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditStart("guardian")}
                    disabled={!canEdit}
                  >
                    {profile.guardianName || profile.guardianPhone
                      ? "تعديل"
                      : "إضافة"}
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {editMode === "guardian" ? (
                renderGuardianEdit()
              ) : (
                <>
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
                  {!profile.guardianName && !profile.guardianPhone && (
                    <p className="text-sm text-gray-500 italic">
                      لم يتم إضافة معلومات الولي بعد
                    </p>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Bio */}
      {(profile.bio || editMode === "bio") && (
        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">نبذة شخصية</h3>
              {editMode === "bio" ? (
                <div className="space-x-2 space-x-reverse">
                  <Button
                    size="sm"
                    onClick={handleEditSave}
                    disabled={submitting}
                    className="ml-2"
                  >
                    {submitting ? "جاري الحفظ..." : "حفظ"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleEditCancel}
                    disabled={submitting}
                  >
                    إلغاء
                  </Button>
                </div>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEditStart("bio")}
                  disabled={!canEdit}
                >
                  {profile.bio ? "تعديل" : "إضافة"}
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {editMode === "bio" ? (
              renderBioEdit()
            ) : (
              <>
                {profile.bio ? (
                  <p className="text-gray-800 whitespace-pre-wrap">
                    {profile.bio}
                  </p>
                ) : (
                  <p className="text-sm text-gray-500 italic">
                    لم يتم إضافة نبذة شخصية بعد
                  </p>
                )}
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Guardian Information - Show as separate card for better organization */}
      {!(
        profile.guardianName ||
        profile.guardianPhone ||
        editMode === "guardian"
      ) &&
        canEdit && (
          <Card className="mt-6">
            <CardContent className="text-center py-8">
              <div className="text-4xl mb-3">👨‍👩‍👧‍👦</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                معلومات الولي
              </h3>
              <p className="text-gray-600 mb-4">
                يمكنك إضافة معلومات الولي للتواصل معه عند الحاجة
              </p>
              <Button
                onClick={() => handleEditStart("guardian")}
                disabled={!canEdit}
              >
                إضافة معلومات الولي
              </Button>
            </CardContent>
          </Card>
        )}

      {/* Bio placeholder for adding */}
      {!profile.bio && editMode !== "bio" && canEdit && (
        <Card className="mt-6">
          <CardContent className="text-center py-8">
            <div className="text-4xl mb-3">📝</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              نبذة شخصية
            </h3>
            <p className="text-gray-600 mb-4">
              أضف نبذة عن نفسك لتساعد الآخرين على التعرف عليك بشكل أفضل
            </p>
            <Button onClick={() => handleEditStart("bio")} disabled={!canEdit}>
              إضافة نبذة شخصية
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
