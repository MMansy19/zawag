"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OTPInput } from "@/components/ui/otp-input";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { showToast } from "@/components/ui/toaster";
import { ImageUploader } from "@/components/profile/image-uploader";

// Registration schema that includes both auth and profile data
const registrationSchema = z.object({
  // Step 1: Auth
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
  otp: z.string().length(6, "رمز التحقق يجب أن يكون 6 أرقام"),

  // Step 2: Basic Info
  firstName: z.string().min(2, "الاسم الأول مطلوب"),
  lastName: z.string().min(2, "اسم العائلة مطلوب"),
  age: z.number().min(18, "العمر يجب أن يكون 18 سنة على الأقل"),
  gender: z.enum(["male", "female"], { required_error: "الجنس مطلوب" }),
  country: z.string().min(1, "البلد مطلوب"),
  maritalStatus: z.enum(["single", "divorced", "widowed"]),

  // Step 3: Religious Info
  prays: z.boolean(),
  fasts: z.boolean(),
  religiousLevel: z.enum(["basic", "practicing", "very-religious"]),
  wearsHijab: z.boolean().optional(),
  hasBeard: z.boolean().optional(),

  // Step 4: Education & Work
  education: z.string().min(1, "المستوى التعليمي مطلوب"),
  occupation: z.string().min(1, "المهنة مطلوبة"),
  city: z.string().min(1, "المدينة مطلوبة"),
  nationality: z.string().min(1, "الجنسية مطلوبة"),

  // Step 5: Preferences
  preferences: z.object({
    ageRange: z.object({
      min: z.number().min(18),
      max: z.number().max(80),
    }),
    country: z.string().optional(),
    religiousLevel: z.array(z.string()).optional(),
    education: z.array(z.string()).optional(),
  }),

  // Step 7: Guardian (optional)
  guardianName: z.string().optional(),
  guardianPhone: z.string().optional(),
  guardianEmail: z.string().email().optional().or(z.literal("")),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

export function RegistrationWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const router = useRouter();

  const totalSteps = 8;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      prays: true,
      fasts: true,
      religiousLevel: "practicing",
      preferences: {
        ageRange: { min: 18, max: 40 },
      },
    },
  });

  const watchedGender = watch("gender");

  const steps = [
    {
      id: 1,
      title: "إنشاء الحساب",
      description: "البريد الإلكتروني وكلمة المرور",
    },
    { id: 2, title: "المعلومات الأساسية", description: "الاسم والعمر والجنس" },
    {
      id: 3,
      title: "المعلومات الدينية",
      description: "مستوى التدين والممارسات",
    },
    { id: 4, title: "التعليم والعمل", description: "المؤهلات والمهنة والموقع" },
    { id: 5, title: "تفضيلات الزواج", description: "المواصفات المرغوبة" },
    { id: 6, title: "الصورة الشخصية", description: "رفع صورة (اختياري)" },
    { id: 7, title: "معلومات الولي", description: "بيانات الولي (اختياري)" },
    { id: 8, title: "مراجعة وإرسال", description: "تأكيد البيانات" },
  ];

  const sendOTP = async () => {
    const isEmailValid = await trigger("email");
    if (!isEmailValid) return;

    try {
      setIsSubmitting(true);
      // TODO: Implement OTP sending
      console.log("Sending OTP to:", watch("email"));
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setOtpSent(true);
      showToast.success("تم إرسال رمز التحقق");
    } catch (error) {
      showToast.error("فشل في إرسال رمز التحقق");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement full registration API call
      console.log("Registration data:", data);
      console.log("Profile picture:", profilePicture);

      await new Promise((resolve) => setTimeout(resolve, 2000));
      showToast.success("تم إنشاء الحساب بنجاح!");
      router.push("/dashboard");
    } catch (error: any) {
      showToast.error(error.message || "حدث خطأ في إنشاء الحساب");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = async () => {
    // Validate current step before proceeding
    let fieldsToValidate: (keyof RegistrationFormData)[] = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = ["email", "password", "otp"];
        break;
      case 2:
        fieldsToValidate = [
          "firstName",
          "lastName",
          "age",
          "gender",
          "country",
          "maritalStatus",
        ];
        break;
      case 3:
        fieldsToValidate = ["prays", "fasts", "religiousLevel"];
        break;
      case 4:
        fieldsToValidate = ["education", "occupation", "city", "nationality"];
        break;
      case 5:
        fieldsToValidate = ["preferences"];
        break;
    }

    if (fieldsToValidate.length > 0) {
      const isValid = await trigger(fieldsToValidate);
      if (!isValid) return;
    }

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
            <div className="mb-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                ستحتاج إلى تأكيد بريدك الإلكتروني عبر رمز التحقق
              </p>
            </div>

            <Input
              label="البريد الإلكتروني"
              type="email"
              {...register("email")}
              error={errors.email?.message}
              placeholder="أدخل بريدك الإلكتروني"
            />

            <Input
              label="كلمة المرور"
              type="password"
              {...register("password")}
              error={errors.password?.message}
              placeholder="اختر كلمة مرور قوية"
            />

            {!otpSent ? (
              <Button
                type="button"
                onClick={sendOTP}
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? "جارٍ الإرسال..." : "إرسال رمز التحقق"}
              </Button>
            ) : (
              <div className="space-y-4">
                <OTPInput
                  length={6}
                  onChange={(value) => setValue("otp", value)}
                  error={errors.otp?.message}
                />
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">لم تستلم الرمز؟</p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={sendOTP}
                    disabled={isSubmitting}
                  >
                    إعادة الإرسال
                  </Button>
                </div>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="الاسم الأول"
                {...register("firstName")}
                error={errors.firstName?.message}
                placeholder="أدخل اسمك الأول"
              />
              <Input
                label="اسم العائلة"
                {...register("lastName")}
                error={errors.lastName?.message}
                placeholder="أدخل اسم العائلة"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="العمر"
                type="number"
                {...register("age", { valueAsNumber: true })}
                error={errors.age?.message}
                placeholder="العمر"
                min="18"
                max="80"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  الجنس
                </label>
                <select
                  {...register("gender")}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">اختر الجنس</option>
                  <option value="male">ذكر</option>
                  <option value="female">أنثى</option>
                </select>
                {errors.gender && (
                  <p className="text-sm text-red-600">
                    {errors.gender.message}
                  </p>
                )}
              </div>
            </div>

            <Input
              label="البلد"
              {...register("country")}
              error={errors.country?.message}
              placeholder="أدخل بلد الإقامة"
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                الحالة الاجتماعية
              </label>
              <select
                {...register("maritalStatus")}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
              >
                <option value="">اختر الحالة</option>
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
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                مستوى التدين
              </label>
              <select
                {...register("religiousLevel")}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
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
                    {...register("wearsHijab")}
                    className="ml-2"
                  />
                  أرتدي الحجاب
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

      case 4:
        return (
          <div className="space-y-4">
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
            <Input
              label="المدينة"
              {...register("city")}
              error={errors.city?.message}
              placeholder="أدخل مدينة الإقامة"
            />
            <Input
              label="الجنسية"
              {...register("nationality")}
              error={errors.nationality?.message}
              placeholder="أدخل جنسيتك"
            />
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="mb-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                حدد المواصفات التي تفضلها في شريك الحياة
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                الفئة العمرية المفضلة
              </label>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="من"
                  type="number"
                  {...register("preferences.ageRange.min", {
                    valueAsNumber: true,
                  })}
                  error={errors.preferences?.ageRange?.min?.message}
                  placeholder="18"
                  min="18"
                  max="80"
                />
                <Input
                  label="إلى"
                  type="number"
                  {...register("preferences.ageRange.max", {
                    valueAsNumber: true,
                  })}
                  error={errors.preferences?.ageRange?.max?.message}
                  placeholder="40"
                  min="18"
                  max="80"
                />
              </div>
            </div>

            <Input
              label="البلد المفضل (اختياري)"
              {...register("preferences.country")}
              error={errors.preferences?.country?.message}
              placeholder="أدخل البلد المفضل"
            />
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <div className="mb-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                {watchedGender === "male"
                  ? "الصورة الشخصية اختيارية للإخوة وستظهر فقط للمطابقات المقبولة"
                  : "الصورة الشخصية غير متاحة للأخوات حفاظاً على الخصوصية"}
              </p>
            </div>{" "}
            {watchedGender === "male" ? (
              <ImageUploader
                onImageSelect={(file) => setProfilePicture(file)}
                currentImage={
                  profilePicture ? URL.createObjectURL(profilePicture) : null
                }
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

      case 7:
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

      case 8:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                مراجعة البيانات النهائية
              </h3>
              <p className="text-sm text-gray-600">
                تأكد من صحة جميع البيانات قبل إنشاء الحساب
              </p>
            </div>

            <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <strong>البريد الإلكتروني:</strong> {watch("email")}
              </div>
              <div>
                <strong>الاسم:</strong> {watch("firstName")} {watch("lastName")}
              </div>
              <div>
                <strong>العمر:</strong> {watch("age")} سنة
              </div>
              <div>
                <strong>الجنس:</strong>{" "}
                {watch("gender") === "male" ? "ذكر" : "أنثى"}
              </div>
              <div>
                <strong>البلد:</strong> {watch("country")}
              </div>
              <div>
                <strong>المهنة:</strong> {watch("occupation")}
              </div>
              {watch("guardianName") && (
                <div>
                  <strong>الولي:</strong> {watch("guardianName")}
                </div>
              )}
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-green-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="mr-3">
                  <h3 className="text-sm font-medium text-green-800">
                    جاهز لإنشاء الحساب
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>
                      سيتم مراجعة ملفك الشخصي من قِبل الإدارة خلال 24-48 ساعة
                    </p>
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
          {/* Progress indicators */}
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
            <Button
              type="button"
              onClick={nextStep}
              disabled={currentStep === 1 && !otpSent}
            >
              التالي
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
