"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, type ProfileFormData } from "@/lib/validation";
import { useAuth } from "@/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { showToast } from "@/components/ui/toaster";

export function ProfileWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
  const totalSteps = 6;

  const steps = [
    { id: 1, title: "المعلومات الأساسية", description: "الاسم والعمر والجنس" },
    { id: 2, title: "الموقع والجنسية", description: "البلد والمدينة والجنسية" },
    { id: 3, title: "الحالة الاجتماعية", description: "الحالة الزوجية والتعليم" },
    { id: 4, title: "المعلومات الدينية", description: "مستوى التدين والممارسات" },
    { id: 5, title: "نبذة شخصية", description: "معلومات إضافية ووصف شخصي" },
    { id: 6, title: "معلومات الولي", description: "بيانات الولي (اختياري)" },
  ];

  const onSubmit = async (data: ProfileFormData) => {
    if (!user) {
      showToast.error("يجب تسجيل الدخول أولاً");
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: Implement profile creation API call
      console.log("Creating profile:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
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
                <p className="text-sm text-red-600">{errors.maritalStatus.message}</p>
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
        <CardContent>
          {renderStep()}
        </CardContent>

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
