"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RegisterRequest } from "@/lib/types/auth.types";
import { RegistrationData } from "@/lib/types";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Edit, User, MapPin, Heart, Settings, Info } from "lucide-react";

interface NewStep3ReviewProps {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
  error: string | null;
  clearError: () => void;
  isSubmitting: boolean;
  profilePicture: File | null;
  onEdit: (step: number) => void;
  onSubmit: () => Promise<boolean>;
}

export default function NewStep3Review({
  data,
  error,
  isSubmitting,
  profilePicture,
  onEdit,
  onSubmit,
}: NewStep3ReviewProps) {
  const isMale = data.gender === "m";
  const isFemale = data.gender === "f";

  const handleSubmit = async () => {
    const success = await onSubmit();
    if (success) {
      // Navigation will be handled by parent component
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          مراجعة البيانات النهائية
        </h3>
        <p className="text-sm text-gray-600">
          يرجى مراجعة جميع المعلومات قبل إنشاء الحساب
        </p>
      </div>

      {/* Basic Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary mb-1" />
            <h4 className="text-lg font-medium">المعلومات الأساسية</h4>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(2)}
            disabled={isSubmitting}
          >
            <Edit className="w-4 h-4 ml-1" />
            تعديل
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">
                الاسم الكامل
              </label>
              <p className="text-gray-900">
                {data.firstname} {data.lastname}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">العمر</label>
              <p className="text-gray-900">{data.age} سنة</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">الجنس</label>
              <p className="text-gray-900">{isMale ? "ذكر" : "أنثى"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                الحالة الاجتماعية
              </label>
              <p className="text-gray-900">
                {data.maritalStatus === "single" && "أعزب/عزباء"}
                {data.maritalStatus === "divorced" && "مطلق/مطلقة"}
                {data.maritalStatus === "widowed" && "أرمل/أرملة"}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">البلد</label>
              <p className="text-gray-900">{data.country}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                المدينة
              </label>
              <p className="text-gray-900">{data.city}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                التعليم
              </label>
              <p className="text-gray-900">{data.education || "غير محدد"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                المهنة
              </label>
              <p className="text-gray-900">{data.occupation || "غير محدد"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary mb-1" />
            <h4 className="text-lg font-medium">معلومات التواصل</h4>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(1)}
            disabled={isSubmitting}
          >
            <Edit className="w-4 h-4 ml-1" />
            تعديل
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">
                البريد الإلكتروني
              </label>
              <p className="text-gray-900">{data.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                رقم الهاتف
              </label>
              <p className="text-gray-900">
                {(data as any).phone || "غير محدد"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Religious Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary mb-1" />
            <h4 className="text-lg font-medium">المعلومات الدينية</h4>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(2)}
            disabled={isSubmitting}
          >
            <Edit className="w-4 h-4 ml-1" />
            تعديل
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">
                مستوى التدين
              </label>
              <p className="text-gray-900">
                {data.religiousLevel === "basic" && "أساسي"}
                {data.religiousLevel === "practicing" && "ممارس"}
                {data.religiousLevel === "very-religious" && "متدين جداً"}
                {data.religiousLevel === "moderate" && "معتدل"}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                انتظام الصلاة
              </label>
              <p className="text-gray-900">
                {data.isPrayerRegular ? "منتظم" : "غير منتظم"}
              </p>
            </div>
            {isMale && (
              <>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    اللحية
                  </label>
                  <p className="text-gray-900">
                    {(data as any).hasBeard
                      ? "يحتفظ باللحية"
                      : "لا يحتفظ باللحية"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    التدخين
                  </label>
                  <p className="text-gray-900">
                    {(data as any).smokes ? "يدخن" : "لا يدخن"}
                  </p>
                </div>
              </>
            )}
            {isFemale && (
              <>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    الحجاب
                  </label>
                  <p className="text-gray-900">
                    {(data as any).wearHijab ? "تلبس الحجاب" : "لا تلبس الحجاب"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    النقاب
                  </label>
                  <p className="text-gray-900">
                    {(data as any).wearNiqab ? "تلبس النقاب" : "لا تلبس النقاب"}
                  </p>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Physical Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-primary mb-1" />
            <h4 className="text-lg font-medium">المعلومات الجسدية</h4>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(2)}
            disabled={isSubmitting}
          >
            <Edit className="w-4 h-4 ml-1" />
            تعديل
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">الطول</label>
              <p className="text-gray-900">{data.height} سم</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">الوزن</label>
              <p className="text-gray-900">{data.weight} كيلو</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                لون البشرة
              </label>
              <p className="text-gray-900">
                {data.skinColor === "fair" && "فاتح"}
                {data.skinColor === "medium" && "متوسط"}
                {data.skinColor === "olive" && "زيتوني"}
                {data.skinColor === "dark" && "داكن"}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                نوع الجسم
              </label>
              <p className="text-gray-900">
                {data.bodyType === "slim" && "نحيف"}
                {data.bodyType === "average" && "متوسط"}
                {data.bodyType === "athletic" && "رياضي"}
                {data.bodyType === "heavy" && "ممتلئ"}
              </p>
            </div>
          </div>
          {profilePicture && isMale && (
            <div>
              <label className="text-sm font-medium text-gray-500">
                الصورة الشخصية
              </label>
              <p className="text-green-600">تم رفع الصورة ✓</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary mb-1" />
            <h4 className="text-lg font-medium">المعلومات الشخصية</h4>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(2)}
            disabled={isSubmitting}
          >
            <Edit className="w-4 h-4 ml-1" />
            تعديل
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">
                أهداف الزواج
              </label>
              <p className="text-gray-900">{data.marriageGoals}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                وصف الشخصية
              </label>
              <p className="text-gray-900">{data.personalityDescription}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                الاهتمامات
              </label>
              <p className="text-gray-900">
                {Array.isArray(data.interests)
                  ? data.interests.join(", ")
                  : data.interests || ""}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                الرغبة في الأطفال
              </label>
              <p className="text-gray-900">
                {data.wantsChildren === "yes" && "نعم، أريد أطفال"}
                {data.wantsChildren === "no" && "لا، لا أريد أطفال"}
                {data.wantsChildren === "maybe" && "ربما، أفكر في الأمر"}
              </p>
            </div>
          </div>

          {/* Gender-specific information */}
          {isMale && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  الوضع المالي
                </label>
                <p className="text-gray-900">
                  {(data as any).financialSituation === "excellent" && "ممتاز"}
                  {(data as any).financialSituation === "good" && "جيد"}
                  {(data as any).financialSituation === "average" && "متوسط"}
                  {(data as any).financialSituation === "poor" && "ضعيف"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  ملكية السكن
                </label>
                <p className="text-gray-900">
                  {(data as any).housingOwnership === "owned" && "مملوك"}
                  {(data as any).housingOwnership === "rented" && "مستأجر"}
                  {(data as any).housingOwnership === "family" && "مع الأهل"}
                </p>
              </div>
            </div>
          )}

          {isFemale && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  اسم الولي
                </label>
                <p className="text-gray-900">{(data as any).guardianName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  رقم هاتف الولي
                </label>
                <p className="text-gray-900">{(data as any).guardianPhone}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary mb-1" />
            <h4 className="text-lg font-medium">تفضيلات شريك الحياة</h4>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(2)}
            disabled={isSubmitting}
          >
            <Edit className="w-4 h-4 ml-1" />
            تعديل
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">
                المدى العمري المفضل
              </label>
              <p className="text-gray-900">
                من {data.preferences?.ageRange?.min} إلى{" "}
                {data.preferences?.ageRange?.max} سنة
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">
                خطط العائلة
              </label>
              <p className="text-gray-900">{data.familyPlans}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                التوقيت المفضل للزواج
              </label>
              <p className="text-gray-900">{data.marriageTimeline}</p>
            </div>
            {data.relocationPlans && (
              <div>
                <label className="text-sm font-medium text-gray-500">
                  خطط الانتقال
                </label>
                <p className="text-gray-900">{data.relocationPlans}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Submit Section */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto">
              <User className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-900">
                جاهز لإنشاء الحساب
              </h3>
              <p className="text-sm text-green-700">
                بالضغط على "إنشاء الحساب"، أنت توافق على شروط الخدمة وسياسة
                الخصوصية
              </p>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
