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
import { ProfileSummaryCard } from "@/components/profile/profile-summary-card";
import { useSelectorData } from "@/lib/hooks/useSelectorData";
import {
  getCountriesByGroup,
  getOccupationsByCategory,
  getCitiesGroupedByCountry,
  getNationalitiesByGroup,
} from "@/lib/static-data";

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

  // Step 5: Personal Bio
  bio: z
    .string()
    .max(500, "النبذة الشخصية يجب أن تكون أقل من 500 حرف")
    .optional(),

  // Step 6: Preferences
  preferences: z.object({
    ageRange: z.object({
      min: z.number().min(18),
      max: z.number().max(80),
    }),
    country: z.string().optional(),
    religiousLevel: z.array(z.string()).optional(),
    education: z.array(z.string()).optional(),
  }),

  // Step 8: Guardian (optional)
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

  // Load selector data from static files (simulating backend)
  const {
    countries,
    educationLevels,
    occupations,
    cities,
    nationalities,
    loading: dataLoading,
    error: dataError,
  } = useSelectorData();

  const totalSteps = 9;

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
    { id: 5, title: "نبذة شخصية", description: "معلومات إضافية ووصف شخصي" },
    { id: 6, title: "تفضيلات الزواج", description: "المواصفات المرغوبة في شريك الحياة" },
    { id: 7, title: "الصورة الشخصية", description: "رفع صورة (اختياري)" },
    { id: 8, title: "معلومات الولي", description: "بيانات الولي (اختياري)" },
    { id: 9, title: "مراجعة وإرسال", description: "مراجعة المعلومات وإنشاء الملف" },
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
        // Bio is optional, no validation needed
        break;
      case 6:
        fieldsToValidate = ["preferences"];
        break;
      case 7:
        // Profile picture is optional
        break;
      case 8:
        // Guardian info is optional
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

  // Show loading state while data is being fetched
  if (dataLoading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-4"></div>
              <p className="text-gray-600">جاري تحميل البيانات...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show error state if data failed to load
  if (dataError) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-6">
          <div className="text-center py-12">
            <div className="text-red-500 mb-4">⚠️</div>
            <p className="text-red-600 mb-4">{dataError}</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              إعادة المحاولة
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

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

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                البلد
              </label>
              <select
                {...register("country")}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
              >
                <option value="">اختر البلد</option>
                {Object.entries(getCountriesByGroup()).map(
                  ([group, groupCountries]) => (
                    <optgroup key={group} label={group}>
                      {groupCountries.map((country) => (
                        <option key={country.value} value={country.value}>
                          {country.label}
                        </option>
                      ))}
                    </optgroup>
                  ),
                )}
              </select>
              {errors.country && (
                <p className="text-sm text-red-600">{errors.country.message}</p>
              )}
            </div>

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
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                المستوى التعليمي
              </label>
              <select
                {...register("education")}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
              >
                <option value="">اختر المستوى التعليمي</option>
                {educationLevels.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
              {errors.education && (
                <p className="text-sm text-red-600">
                  {errors.education.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                المهنة
              </label>
              <select
                {...register("occupation")}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
              >
                <option value="">اختر المهنة</option>
                {Object.entries(getOccupationsByCategory()).map(
                  ([category, categoryOccupations]) => (
                    <optgroup key={category} label={category}>
                      {categoryOccupations.map((occupation) => (
                        <option key={occupation.value} value={occupation.value}>
                          {occupation.label}
                        </option>
                      ))}
                    </optgroup>
                  ),
                )}
              </select>
              {errors.occupation && (
                <p className="text-sm text-red-600">
                  {errors.occupation.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                المدينة
              </label>
              <select
                {...register("city")}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
              >
                <option value="">اختر المدينة</option>
                {Object.entries(getCitiesGroupedByCountry()).map(
                  ([country, countryCities]) => (
                    <optgroup key={country} label={country}>
                      {countryCities.map((city) => (
                        <option key={city.value} value={city.value}>
                          {city.label}
                        </option>
                      ))}
                    </optgroup>
                  ),
                )}
              </select>
              {errors.city && (
                <p className="text-sm text-red-600">{errors.city.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                الجنسية
              </label>
              <select
                {...register("nationality")}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
              >
                <option value="">اختر الجنسية</option>
                {Object.entries(getNationalitiesByGroup()).map(
                  ([group, groupNationalities]) => (
                    <optgroup key={group} label={group}>
                      {groupNationalities.map((nationality) => (
                        <option
                          key={nationality.value}
                          value={nationality.value}
                        >
                          {nationality.label}
                        </option>
                      ))}
                    </optgroup>
                  ),
                )}
              </select>
              {errors.nationality && (
                <p className="text-sm text-red-600">
                  {errors.nationality.message}
                </p>
              )}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="mb-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                اكتب نبذة عن نفسك تساعد الآخرين على التعرف عليك بشكل أفضل
              </p>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                نبذة شخصية (اختياري)
              </label>
              <textarea
                {...register("bio")}
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="اكتب نبذة عن نفسك، اهتماماتك، أهدافك، وما تبحث عنه في شريك الحياة..."
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

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                البلد المفضل (اختياري)
              </label>
              <select
                {...register("preferences.country")}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
              >
                <option value="">اختر البلد المفضل</option>
                {Object.entries(getCountriesByGroup()).map(
                  ([group, groupCountries]) => (
                    <optgroup key={group} label={group}>
                      {groupCountries.map((country) => (
                        <option key={country.value} value={country.value}>
                          {country.label}
                        </option>
                      ))}
                    </optgroup>
                  ),
                )}
                <option value="لا يهم">لا يهم</option>
              </select>
              {errors.preferences?.country && (
                <p className="text-sm text-red-600">
                  {errors.preferences.country.message}
                </p>
              )}
            </div>
          </div>
        );

      case 7:
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

      case 8:
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

      case 9:
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

            <ProfileSummaryCard
              data={{
                name: `${watch("firstName")} ${watch("lastName")}`,
                age: watch("age"),
                gender: watch("gender"),
                country: watch("country"),
                city: watch("city"),
                nationality: watch("nationality"),
                maritalStatus: watch("maritalStatus"),
                education: watch("education"),
                occupation: watch("occupation"),
                religiousLevel: watch("religiousLevel"),
                prays: watch("prays"),
                fasts: watch("fasts"),
                hasHijab: watch("wearsHijab"),
                hasBeard: watch("hasBeard"),
                bio: watch("bio"),
                guardianName: watch("guardianName"),
                guardianPhone: watch("guardianPhone"),
                guardianEmail: watch("guardianEmail"),
                preferences: watch("preferences"),
              }}
              onEdit={(step) => {
                // Navigate to specific step for editing
                const stepMap: Record<string, number> = {
                  basic: 2,
                  location: 4,
                  education: 4,
                  religious: 3,
                  bio: 5,
                  guardian: 8,
                  preferences: 6,
                  photo: 7,
                };
                setCurrentStep(stepMap[step] || 2);
              }}
            />

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
