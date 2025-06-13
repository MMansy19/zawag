"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, type ProfileFormData } from "@/lib/validation";
import { useAuth } from "@/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { showToast } from "@/components/ui/toaster";
import { ProfileSummaryCard } from "./profile-summary-card";
import { ImageUploader } from "./image-uploader";

export function ProfileWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const router = useRouter();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      prays: true,
      fasts: true,
      religiousLevel: "practicing",
    },
  });

  const watchedGender = watch("gender");
  const totalSteps = 9;

  const steps = [
    { id: 1, title: "المعلومات الأساسية", description: "الاسم والعمر والجنس" },
    { id: 2, title: "الموقع والجنسية", description: "البلد والمدينة والجنسية" },
    {
      id: 3,
      title: "الحالة الاجتماعية والتعليم",
      description: "الحالة الزوجية والتعليم والمهنة",
    },
    {
      id: 4,
      title: "المعلومات الدينية",
      description: "مستوى التدين والممارسات",
    },
    { id: 5, title: "نبذة شخصية", description: "معلومات إضافية ووصف شخصي" },
    { id: 6, title: "معلومات الولي", description: "بيانات الولي (اختياري)" },
    { id: 7, title: "تفضيلات الزواج", description: "المواصفات المرغوبة في شريك الحياة" },
    { id: 8, title: "الصورة الشخصية", description: "رفع صورة شخصية (اختياري)" },
    { id: 9, title: "مراجعة وإرسال", description: "مراجعة المعلومات وإنشاء الملف" },
  ];

  const onSubmit = async (data: ProfileFormData) => {
    if (!user) {
      showToast.error("يجب تسجيل الدخول أولاً");
      return;
    }

    setIsSubmitting(true);
    try {
      // Include profile picture in the data if it exists
      const formData = new FormData();
      
      // Add all form fields
      Object.entries(data).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          if (typeof value === 'object' && !Array.isArray(value)) {
            // Handle nested objects like preferences
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, String(value));
          }
        }
      });
      
      // Add profile picture if exists
      if (profilePicture) {
        formData.append('profilePicture', profilePicture);
      }

      // TODO: Implement profile creation API call
      console.log("Creating profile:", data);
      console.log("Profile picture:", profilePicture);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      showToast.success("تم إنشاء الملف الشخصي بنجاح!");
      router.push("/dashboard");
    } catch (error: any) {
      showToast.error(error.message || "حدث خطأ في إنشاء الملف الشخصي");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <Input
              label="الاسم الكامل"
              {...register("name")}
              error={errors.name?.message || ""}
              placeholder="أدخل اسمك الكامل"
            />
            <Input
              label="العمر"
              type="number"
              {...register("age", { valueAsNumber: true })}
              error={errors.age?.message || ""}
              placeholder="أدخل عمرك"
            />
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                الجنس
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="male"
                    {...register("gender")}
                    className="ml-2"
                  />
                  ذكر
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="female"
                    {...register("gender")}
                    className="ml-2"
                  />
                  أنثى
                </label>
              </div>
              {errors.gender && (
                <p className="text-sm text-red-600">{errors.gender.message}</p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <Input
              label="البلد"
              {...register("country")}
              error={errors.country?.message || ""}
              placeholder="أدخل بلدك"
            />
            <Input
              label="المدينة"
              {...register("city")}
              error={errors.city?.message || ""}
              placeholder="أدخل مدينتك"
            />
            <Input
              label="الجنسية"
              {...register("nationality")}
              error={errors.nationality?.message || ""}
              placeholder="أدخل جنسيتك"
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                الحالة الزوجية
              </label>
              <select
                {...register("maritalStatus")}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">اختر الحالة الزوجية</option>
                <option value="single">أعزب/عزباء</option>
                <option value="divorced">مطلق/مطلقة</option>
                <option value="widowed">أرمل/أرملة</option>
              </select>
              {errors.maritalStatus && (
                <p className="text-sm text-red-600">
                  {errors.maritalStatus.message}
                </p>
              )}
            </div>
            <Input
              label="المستوى التعليمي"
              {...register("education")}
              error={errors.education?.message}
              placeholder="مثال: بكالوريوس هندسة"
            />
            <Input
              label="المهنة"
              {...register("occupation")}
              error={errors.occupation?.message}
              placeholder="أدخل مهنتك"
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                مستوى التدين
              </label>
              <select
                {...register("religiousLevel")}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="basic">أساسي</option>
                <option value="practicing">ممارس</option>
                <option value="very-religious">متدين جداً</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register("prays")}
                  className="ml-2"
                />
                أصلي الصلوات الخمس
              </label>
            </div>

            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register("fasts")}
                  className="ml-2"
                />
                أصوم رمضان
              </label>
            </div>

            {watchedGender === "female" && (
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    {...register("hasHijab")}
                    className="ml-2"
                  />
                  ألبس الحجاب
                </label>
              </div>
            )}

            {watchedGender === "male" && (
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    {...register("hasBeard")}
                    className="ml-2"
                  />
                  لدي لحية
                </label>
              </div>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                نبذة شخصية (اختياري)
              </label>
              <textarea
                {...register("bio")}
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="اكتب نبذة عن نفسك..."
              />
              {errors.bio && (
                <p className="text-sm text-red-600">{errors.bio.message}</p>
              )}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <div className="mb-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                معلومات الولي اختيارية ولكنها مفيدة لتسهيل التواصل الرسمي
              </p>
            </div>
            <Input
              label="اسم الولي (اختياري)"
              {...register("guardianName")}
              error={errors.guardianName?.message}
              placeholder="أدخل اسم الولي"
            />
            <Input
              label="رقم هاتف الولي (اختياري)"
              {...register("guardianPhone")}
              error={errors.guardianPhone?.message}
              placeholder="أدخل رقم هاتف الولي"
            />
            <Input
              label="بريد الولي الإلكتروني (اختياري)"
              type="email"
              {...register("guardianEmail")}
              error={errors.guardianEmail?.message}
              placeholder="أدخل بريد الولي الإلكتروني"
            />
          </div>
        );

      case 7:
        return (
          <div className="space-y-4">
            <div className="mb-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                حدد المواصفات التي تفضلها في شريك الحياة
              </p>
            </div>
            
            {/* Age Range Preference */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                الفئة العمرية المفضلة
              </label>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="من"
                  type="number"
                  {...register("preferences.ageRange.min", { valueAsNumber: true })}
                  error={errors.preferences?.ageRange?.min?.message}
                  placeholder="18"
                  min="18"
                  max="80"
                />
                <Input
                  label="إلى"
                  type="number"
                  {...register("preferences.ageRange.max", { valueAsNumber: true })}
                  error={errors.preferences?.ageRange?.max?.message}
                  placeholder="40"
                  min="18"
                  max="80"
                />
              </div>
            </div>

            {/* Location Preference */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                البلد المفضل (اختياري)
              </label>
              <Input
                {...register("preferences.country")}
                error={errors.preferences?.country?.message}
                placeholder="أدخل البلد المفضل"
              />
            </div>

            {/* Religious Level Preference */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                مستوى التدين المفضل
              </label>
              <div className="space-y-2">
                {[
                  { value: "basic", label: "أساسي" },
                  { value: "practicing", label: "ممارس" },
                  { value: "very-religious", label: "متدين جداً" },
                ].map((level) => (
                  <label key={level.value} className="flex items-center">
                    <input
                      type="checkbox"
                      value={level.value}
                      {...register("preferences.religiousLevel")}
                      className="ml-2"
                    />
                    {level.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Education Preference */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                المستوى التعليمي المفضل (اختياري)
              </label>
              <div className="space-y-2">
                {[
                  "ثانوية عامة",
                  "دبلوم",
                  "بكالوريوس",
                  "ماجستير", 
                  "دكتوراه",
                ].map((edu) => (
                  <label key={edu} className="flex items-center">
                    <input
                      type="checkbox"
                      value={edu}
                      {...register("preferences.education")}
                      className="ml-2"
                    />
                    {edu}
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 8:

      case 8:
        return (
          <div className="space-y-4">
            <div className="mb-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                {watchedGender === "male" 
                  ? "الصورة الشخصية اختيارية للإخوة وستظهر فقط للمطابقات المقبولة"
                  : "الصورة الشخصية غير متاحة للأخوات حفاظاً على الخصوصية"}
              </p>
            </div>
            
            {watchedGender === "male" ? (
              <ImageUploader
                onImageSelect={(file) => setProfilePicture(file)}
                currentImage={profilePicture ? URL.createObjectURL(profilePicture) : null}
              />
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👤</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  الصورة الشخصية غير متاحة
                </h3>
                <p className="text-gray-600">
                  نحترم خصوصية الأخوات ولا نطلب صوراً شخصية
                </p>
              </div>
            )}
          </div>
        );

      case 9:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                مراجعة البيانات النهائية
              </h3>
              <p className="text-sm text-gray-600">
                تأكد من صحة جميع البيانات قبل إرسال الطلب
              </p>
            </div>
            
            <ProfileSummaryCard 
              data={watch()}
              onEdit={(section) => {
                // Navigate to specific step for editing
                const stepMap: Record<string, number> = {
                  basic: 1,
                  location: 2,
                  education: 3,
                  religious: 4,
                  bio: 5,
                  guardian: 6,
                  preferences: 7,
                  photo: 8
                };
                setCurrentStep(stepMap[section] || 1);
              }}
            />
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="mr-3">
                  <h3 className="text-sm font-medium text-green-800">
                    جاهز للإرسال
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>سيتم مراجعة ملفك الشخصي من قِبل الإدارة خلال 24-48 ساعة</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  step.id === currentStep
                    ? "bg-primary-600 text-white"
                    : step.id < currentStep
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                }`}
              >
                {step.id}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900">
              {steps[currentStep - 1]?.title}
            </h2>
            <p className="text-gray-600">
              {steps[currentStep - 1]?.description}
            </p>
          </div>
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>{renderStep()}</CardContent>

        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            السابق
          </Button>

          {currentStep < totalSteps ? (
            <Button type="button" onClick={nextStep}>
              التالي
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "جاري الإنشاء..." : "إنشاء الملف الشخصي"}
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
