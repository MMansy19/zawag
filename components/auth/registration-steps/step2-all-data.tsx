"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Phone from "@/components/ui/phone-number";
import { RegisterRequest } from "@/lib/types/auth.types";
import { RegistrationData } from "@/lib/types";
import { getCountriesByGroup } from "@/lib/static-data";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Upload, X } from "lucide-react";

interface NewStep2AllDataProps {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
  error: string | null;
  clearError: () => void;
  isSubmitting: boolean;
}

export default function NewStep2AllData({
  data,
  updateData,
  error,
  clearError,
  isSubmitting,
}: NewStep2AllDataProps) {
  const [profilePicturePreview, setProfilePicturePreview] = useState<
    string | null
  >(null);

  const handleInputChange = (field: keyof RegisterRequest, value: any) => {
    clearError();
    updateData({ [field]: value });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      // profilePicture is not part of RegistrationData, handle separately if needed
    }
  };
  const countries = getCountriesByGroup();
  const allCountries = Object.values(countries).flat();

  const isGenderSelected = data.gender;
  const isMale = data.gender === "m";
  const isFemale = data.gender === "f";

  if (!isGenderSelected) {
    return (
      <div className="text-center py-12">
        <Alert>
          <AlertDescription>
            يرجى اختيار الجنس في الخطوة الأولى لإكمال المعلومات.
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      {/* Declaration Section */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">
            إقرار وتعهد - {isMale ? "استمارة الرجال" : "استمارة النساء"}
          </h3>
        </CardHeader>
        <CardContent>
          <div className="bg-amber-50 border border-amber-200 rounded-lg sm:p-4 p-2 mb-4">
            <p className="text-sm text-amber-800">
              {isMale
                ? "أقسم بالله العظيم أنني رجل مسلم من أهل السنة والجماعة، مخلص في تقديمي على هذا الموقع، وأسعى للزواج الحلال فقط. أتعهد بأن جميع المعلومات التي أقدمها صحيحة، خالية من أي غش أو تدليس، وملتزم بالصدق التام مع نفسي ومع من يقدره الله لي شريكا في الحياة. كما أتعهد بالحفاظ على سرية أي معلومات تصلني، فلا أطلع عليها إلا من أثق به من أهلي ومعارفي. والله على ما أقول شهيد"
                : "أقسم بالله العظيم أنني امرأة مسلمة من أهل السنة والجماعة، مخلصة في تقديمي على هذا الموقع، وأسعى للزواج الحلال فقط. أتعهد بأن جميع المعلومات التي أقدمها صحيحة، خالية من أي غش أو تدليس، وملتزمة بالصدق التام مع نفسي ومع من يقدره الله لي شريكا في الحياة. كما أتعهد بالحفاظ على سرية أي معلومات تصلني، فلا أطلع عليها إلا من أثق به من أهلي ومعارفي. والله على ما أقول شهيد"}
            </p>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <input
              type="checkbox"
              id="acceptDeclaration"
              // acceptDeclaration is not part of RegistrationData, remove or handle separately
              className="h-4 w-4 accent-primary-600 focus:ring-primary-500 border-gray-300 rounded disabled:opacity-50"
              style={{
                accentColor: "var(--primary-color, #5d1a78)",
              }}
              required
            />
            <label
              htmlFor="acceptDeclaration"
              className="text-xs sm:text-sm font-medium leading-none transition-colors mt-2"
            >
              أوافق على الإقرار والتعهد أعلاه{" "}
              <span className="text-red-500 mr-1">*</span>
            </label>
          </div>
        </CardContent>
      </Card>

      <div className="text-center mb-6">
        <h4 className="text-lg font-medium text-gray-900">
          إكمال البيانات الشخصية - {isMale ? "زوج" : "زوجة"}
        </h4>
        <p className="text-sm text-gray-600">
          يرجى ملء جميع المعلومات المطلوبة في كل قسم
        </p>
      </div>

      <div className="space-y-6">
        {/* Basic Information Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h4 className="text-lg font-medium">المعلومات الأساسية</h4>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="الاسم الأول"
                  value={data.firstname || ""}
                  onChange={(e) =>
                    handleInputChange("firstname", e.target.value)
                  }
                  placeholder="أدخل اسمك الأول"
                  disabled={isSubmitting}
                  required
                />
                <Input
                  label="اسم العائلة"
                  value={data.lastname || ""}
                  onChange={(e) =>
                    handleInputChange("lastname", e.target.value)
                  }
                  placeholder="أدخل اسم العائلة"
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="العمر"
                  type="number"
                  value={data.age || ""}
                  onChange={(e) =>
                    handleInputChange("age", parseInt(e.target.value))
                  }
                  placeholder="أدخل عمرك"
                  disabled={isSubmitting}
                  required
                  min="18"
                  max="60"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    الجنسية <span className="text-red-500">*</span>
                  </label>{" "}
                  <select
                    value={data.nationality || ""}
                    onChange={(e) =>
                      handleInputChange("nationality", e.target.value)
                    }
                    disabled={isSubmitting}
                    className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">اختر الجنسية</option>
                    {allCountries.map((country) => (
                      <option key={country.value} value={country.label}>
                        {country.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    الحالة الاجتماعية <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={data.maritalStatus || ""}
                    onChange={(e) =>
                      handleInputChange("maritalStatus", e.target.value as any)
                    }
                    disabled={isSubmitting}
                    className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">اختر الحالة</option>
                    <option value="single">أعزب/عزباء</option>
                    <option value="divorced">مطلق/مطلقة</option>
                    <option value="widowed">أرمل/أرملة</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    البلد <span className="text-red-500">*</span>
                  </label>{" "}
                  <select
                    value={data.country || ""}
                    onChange={(e) =>
                      handleInputChange("country", e.target.value)
                    }
                    disabled={isSubmitting}
                    className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">اختر البلد</option>
                    {allCountries.map((country) => (
                      <option key={country.value} value={country.label}>
                        {country.label}
                      </option>
                    ))}
                  </select>
                </div>
                <Input
                  label="المدينة"
                  value={data.city || ""}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="أدخل مدينتك"
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="التعليم"
                  value={data.education || ""}
                  onChange={(e) =>
                    handleInputChange("education", e.target.value)
                  }
                  placeholder="مثل: بكالوريوس في الهندسة"
                  disabled={isSubmitting}
                />
                <Input
                  label="المهنة"
                  value={data.occupation || ""}
                  onChange={(e) =>
                    handleInputChange("occupation", e.target.value)
                  }
                  placeholder="مثل: مهندس برمجيات"
                  disabled={isSubmitting}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Religious Information Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h4 className="text-lg font-medium">المعلومات الدينية</h4>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    مستوى التدين <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={data.religiousLevel || ""}
                    onChange={(e) =>
                      handleInputChange("religiousLevel", e.target.value as any)
                    }
                    disabled={isSubmitting}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">اختر مستوى التدين</option>
                    <option value="basic">غير متدين/ة</option>
                    <option value="practicing">متدين/ة قليلا</option>
                    <option value="religious">متدين/ة</option>
                    <option value="very-religious">متدين/ة كثيرا</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الصلاة<span className="text-red-500">*</span>
                  </label>
                  <select
                    value={data.isPrayerRegular ? "true" : "false"}
                    onChange={(e) =>
                      handleInputChange(
                        "isPrayerRegular",
                        e.target.value as any
                      )
                    }
                    disabled={isSubmitting}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">اختر</option>
                    <option value="always">أصلي دائما</option>
                    <option value="mostly">لأصلي أغلب الأوقات</option>
                    <option value="sometimes">أصلي أحيانا</option>
                    <option value="never">لا أصلي</option>
                  </select>
                </div>
              </div>

              {/* Gender-specific religious fields */}
              {isMale && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      اللحية <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={(data as any).hasBeard ? "true" : "false"}
                      onChange={(e) =>
                        updateData({
                          ...(data as any),
                          hasBeard: e.target.value === "true",
                        })
                      }
                      disabled={isSubmitting}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="">اختر</option>
                      <option value="true">يحتفظ باللحية</option>
                      <option value="false">لا يحتفظ باللحية</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      التدخين <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={(data as any).smokes ? "true" : "false"}
                      onChange={(e) =>
                        updateData({
                          ...(data as any),
                          smokes: e.target.value === "true",
                        })
                      }
                      disabled={isSubmitting}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="">اختر</option>
                      <option value="false">لا يدخن</option>
                      <option value="true">يدخن</option>
                    </select>
                  </div>
                </div>
              )}

              {isFemale && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الحجاب <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={(data as any).wearHijab ? "true" : "false"}
                      onChange={(e) =>
                        updateData({
                          ...(data as any),
                          wearHijab: e.target.value === "true",
                        })
                      }
                      disabled={isSubmitting}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="">اختر</option>
                      <option value="false">غير محجبة</option>
                      <option value="hijab">محجبة (كشف الوجه)</option>
                      <option value="niqab">محجبة (النقاب)</option>
                    </select>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Physical Information Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h4 className="text-lg font-medium">المعلومات الجسدية</h4>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="الطول (سم)"
                  type="number"
                  value={data.height || ""}
                  onChange={(e) =>
                    handleInputChange("height", parseInt(e.target.value))
                  }
                  placeholder="مثل: 170"
                  disabled={isSubmitting}
                  required
                  min="140"
                  max="220"
                />
                <Input
                  label="الوزن (كيلو)"
                  type="number"
                  value={data.weight || ""}
                  onChange={(e) =>
                    handleInputChange("weight", parseInt(e.target.value))
                  }
                  placeholder="مثل: 70"
                  disabled={isSubmitting}
                  required
                  min="40"
                  max="200"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    لون البشرة <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={data.skinColor || ""}
                    onChange={(e) =>
                      handleInputChange("skinColor", e.target.value as any)
                    }
                    disabled={isSubmitting}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">اختر لون البشرة</option>
                    <option value="fair">فاتح</option>
                    <option value="medium">متوسط</option>
                    <option value="olive">زيتوني</option>
                    <option value="dark">داكن</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    نوع الجسم <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={data.bodyType || ""}
                    onChange={(e) =>
                      handleInputChange("bodyType", e.target.value as any)
                    }
                    disabled={isSubmitting}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">اختر نوع الجسم</option>
                    <option value="slim">نحيف</option>
                    <option value="average">متوسط</option>
                    <option value="athletic">رياضي</option>
                    <option value="heavy">ممتلئ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    المظهر العام <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={data.appearance || ""}
                    onChange={(e) =>
                      handleInputChange("appearance", e.target.value as any)
                    }
                    disabled={isSubmitting}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">اختر المظهر</option>
                    <option value="very-attractive">جذاب جداً</option>
                    <option value="attractive">جذاب</option>
                    <option value="average">متوسط</option>
                    <option value="simple">بسيط</option>
                  </select>
                </div>
              </div>

              {/* Profile Picture Upload - Only for Males */}
              {isMale && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الصورة الشخصية (اختياري)
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <input
                        type="file"
                        id="profilePicture"
                        accept="image/*"
                        onChange={handleFileUpload}
                        disabled={isSubmitting}
                        className="hidden"
                      />
                      <label
                        htmlFor="profilePicture"
                        className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        اختر صورة
                      </label>
                    </div>
                    {profilePicturePreview && (
                      <div className="relative">
                        <img
                          src={profilePicturePreview}
                          alt="معاينة الصورة"
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setProfilePicturePreview(null);
                            const newData = { ...data };
                            // profilePicture is not part of RegistrationData, no need to updateData
                          }}
                          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Personal Information Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h4 className="text-lg font-medium">المعلومات الشخصية</h4>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    حالة الوالدين <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={data.areParentsAlive || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "areParentsAlive",
                        e.target.value as any,
                      )
                    }
                    disabled={isSubmitting}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">اختر</option>
                    <option value="both">كلاهما على قيد الحياة</option>
                    <option value="father">الأب فقط</option>
                    <option value="mother">الأم فقط</option>
                    <option value="none">كلاهما متوفى</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    العلاقة بالوالدين <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={data.parentRelationship || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "parentRelationship",
                        e.target.value as any,
                      )
                    }
                    disabled={isSubmitting}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">اختر</option>
                    <option value="excellent">ممتازة</option>
                    <option value="good">جيدة</option>
                    <option value="average">متوسطة</option>
                    <option value="poor">ضعيفة</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الرغبة في الأطفال <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={data.wantsChildren || ""}
                    onChange={(e) =>
                      handleInputChange("wantsChildren", e.target.value as any)
                    }
                    disabled={isSubmitting}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">اختر</option>
                    <option value="yes">نعم، أريد أطفال</option>
                    <option value="no">لا، لا أريد أطفال</option>
                    <option value="maybe">ربما، أفكر في الأمر</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الاهتمامات <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={data.interests || ""}
                    onChange={(e) =>
                      handleInputChange("interests", e.target.value)
                    }
                    placeholder="مثل: القراءة, الرياضة, الطبخ, السفر"
                    disabled={isSubmitting}
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    اكتب الاهتمامات مفصولة بفاصلة
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    أهداف الزواج <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={data.marriageGoals || ""}
                    onChange={(e) =>
                      handleInputChange("marriageGoals", e.target.value)
                    }
                    placeholder="اكتب أهدافك من الزواج وما تتطلع إليه في الحياة الزوجية"
                    disabled={isSubmitting}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    وصف الشخصية <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={data.personalityDescription || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "personalityDescription",
                        e.target.value,
                      )
                    }
                    placeholder="اكتب وصفاً موجزاً عن شخصيتك وطباعك"
                    disabled={isSubmitting}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Gender-specific sections */}
              {isMale && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الوضع المالي <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={(data as any).financialSituation || ""}
                      onChange={(e) =>
                        updateData({
                          ...(data as any),
                          financialSituation: e.target.value,
                        })
                      }
                      disabled={isSubmitting}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="">اختر الوضع المالي</option>
                      <option value="excellent">ممتاز</option>
                      <option value="good">جيد</option>
                      <option value="average">متوسط</option>
                      <option value="poor">ضعيف</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ملكية السكن <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={(data as any).housingOwnership || ""}
                      onChange={(e) =>
                        updateData({
                          ...(data as any),
                          housingOwnership: e.target.value,
                        })
                      }
                      disabled={isSubmitting}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="">اختر</option>
                      <option value="owned">مملوك</option>
                      <option value="rented">مستأجر</option>
                      <option value="family">مع الأهل</option>
                    </select>
                  </div>
                </div>
              )}

              {isFemale && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    معلومات الولي <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="اسم الولي"
                      value={(data as any).guardianName || ""}
                      onChange={(e) =>
                        updateData({
                          ...(data as any),
                          guardianName: e.target.value,
                        })
                      }
                      placeholder="أدخل اسم الولي"
                      disabled={isSubmitting}
                      required
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3.5">
                        رقم هاتف الولي <span className="text-red-500">*</span>
                      </label>
                      <Phone
                        value={(data as any).guardianPhone || ""}
                        onChange={(phone: string) => {
                          updateData({
                            ...(data as any),
                            guardianPhone: phone,
                          });
                        }}
                        defaultCountry="SA"
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Work Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h4 className="text-lg font-medium">معلومات العمل</h4>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    مجال العمل
                  </label>
                  <select
                    value={(data as any).workField || ""}
                    onChange={(e) =>
                      updateData({
                        ...data,
                        workField: e.target.value,
                      } as any)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">اختر مجال العمل</option>
                    <option value="healthcare">الرعاية الصحية</option>
                    <option value="education">التعليم</option>
                    <option value="engineering">الهندسة</option>
                    <option value="technology">التكنولوجيا</option>
                    <option value="business">الأعمال</option>
                    <option value="government">الحكومة</option>
                    <option value="finance">المالية</option>
                    <option value="legal">القانون</option>
                    <option value="media">الإعلام</option>
                    <option value="arts">الفنون</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>
                <Input
                  label="المسمى الوظيفي"
                  value={(data as any).jobTitle || ""}
                  onChange={(e) =>
                    updateData({
                      ...data,
                      jobTitle: e.target.value,
                    } as any)
                  }
                  placeholder="أدخل مسماك الوظيفي"
                  disabled={isSubmitting}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="مكان العمل"
                  value={(data as any).workplace || ""}
                  onChange={(e) =>
                    updateData({
                      ...data,
                      workplace: e.target.value,
                    } as any)
                  }
                  placeholder="أدخل مكان عملك"
                  disabled={isSubmitting}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    سنوات الخبرة
                  </label>
                  <select
                    value={(data as any).experienceYears || ""}
                    onChange={(e) =>
                      updateData({
                        ...data,
                        experienceYears: e.target.value,
                      } as any)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">اختر سنوات الخبرة</option>
                    <option value="0-1">أقل من سنة</option>
                    <option value="1-3">1-3 سنوات</option>
                    <option value="3-5">3-5 سنوات</option>
                    <option value="5-10">5-10 سنوات</option>
                    <option value="10+">أكثر من 10 سنوات</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    نوع العمل
                  </label>
                  <select
                    value={(data as any).workType || ""}
                    onChange={(e) =>
                      updateData({
                        ...data,
                        workType: e.target.value,
                      } as any)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">اختر نوع العمل</option>
                    <option value="full-time">دوام كامل</option>
                    <option value="part-time">دوام جزئي</option>
                    <option value="freelance">عمل حر</option>
                    <option value="business-owner">صاحب عمل</option>
                    <option value="student">طالب</option>
                    <option value="unemployed">غير موظف</option>
                  </select>
                </div>
                {isFemale && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      العمل بعد الزواج
                    </label>
                    <select
                      value={(data as any).workAfterMarriage || ""}
                      onChange={(e) =>
                        updateData({
                          ...data,
                          workAfterMarriage: e.target.value,
                        } as any)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">اختر موقفك من العمل بعد الزواج</option>
                      <option value="yes">نعم، أريد الاستمرار في العمل</option>
                      <option value="no">لا، أفضل التفرغ للمنزل</option>
                      <option value="maybe">حسب الظروف</option>
                      <option value="discuss">سأناقش مع زوجي</option>
                    </select>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  وصف العمل والمسؤوليات
                </label>
                <textarea
                  value={(data as any).workDescription || ""}
                  onChange={(e) =>
                    updateData({
                      ...data,
                      workDescription: e.target.value,
                    } as any)
                  }
                  placeholder="اكتب وصفاً موجزاً عن طبيعة عملك ومسؤولياتك..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preferences Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h4 className="text-lg font-medium">تفضيلات شريك الحياة</h4>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="الحد الأدنى للعمر"
                  type="number"
                  value={data.preferences?.ageRange?.min || ""}
                  onChange={(e) =>
                    updateData({
                      preferences: {
                        ...data.preferences,
                        ageRange: {
                          min: parseInt(e.target.value),
                          max: data.preferences?.ageRange?.max || 35,
                        },
                      },
                    })
                  }
                  placeholder="18"
                  disabled={isSubmitting}
                  required
                  min="18"
                  max="60"
                />
                <Input
                  label="الحد الأقصى للعمر"
                  type="number"
                  value={data.preferences?.ageRange?.max || ""}
                  onChange={(e) =>
                    updateData({
                      preferences: {
                        ...data.preferences,
                        ageRange: {
                          min: data.preferences?.ageRange?.min || 18,
                          max: parseInt(e.target.value),
                        },
                      },
                    })
                  }
                  placeholder="35"
                  disabled={isSubmitting}
                  required
                  min="18"
                  max="60"
                />
              </div>
              {isFemale && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    بيت الزوجية
                  </label>
                  <select
                    value={(data as any).housingPreference || ""}
                    onChange={(e) =>
                      updateData({
                        ...data,
                        housingPreference: e.target.value,
                      } as any)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">اختر بيت الزوجية</option>
                    <option value="apartment">تمليك</option>
                    <option value="independent">إيجار</option>
                    <option value="with_family">بيت العائلة</option>
                    <option value="flexible">حسب الظروف</option>
                  </select>
                </div>
              )}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    خطط العائلة <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={data.familyPlans || ""}
                    onChange={(e) =>
                      handleInputChange("familyPlans", e.target.value)
                    }
                    placeholder="اكتب خططك للأسرة والمستقبل"
                    disabled={isSubmitting}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    التوقيت المفضل للزواج{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={data.marriageTimeline || ""}
                    onChange={(e) =>
                      handleInputChange("marriageTimeline", e.target.value)
                    }
                    placeholder="اكتب التوقيت المفضل لك للزواج"
                    disabled={isSubmitting}
                    required
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    خطط الانتقال
                  </label>
                  <textarea
                    value={data.relocationPlans || ""}
                    onChange={(e) =>
                      handleInputChange("relocationPlans", e.target.value)
                    }
                    placeholder="هل تتطلع للانتقال إلى بلد أو مدينة أخرى؟"
                    disabled={isSubmitting}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Goals Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h4 className="text-lg font-medium">الأهداف من الزواج</h4>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الهدف الأساسي من الزواج
                  </label>
                  <select
                    value={(data as any).marriageGoal || ""}
                    onChange={(e) =>
                      updateData({
                        ...data,
                        marriageGoal: e.target.value,
                      } as any)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">اختر الهدف الأساسي</option>
                    <option value="family">تكوين عائلة مسلمة</option>
                    <option value="companionship">الرفقة والاستقرار</option>
                    <option value="religious_growth">
                      النمو الديني المشترك
                    </option>
                    <option value="complete_deen">إكمال نصف الدين</option>
                    <option value="children">إنجاب الأطفال</option>
                    <option value="support">الدعم المتبادل</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الخطط المستقبلية
                  </label>
                  <select
                    value={(data as any).futurePlans || ""}
                    onChange={(e) =>
                      updateData({
                        ...data,
                        futurePlans: e.target.value,
                      } as any)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">اختر خططك المستقبلية</option>
                    <option value="career_focus">التركيز على المهنة</option>
                    <option value="family_focus">التركيز على الأسرة</option>
                    <option value="balanced">التوازن بين العمل والأسرة</option>
                    <option value="travel">السفر والاستكشاف</option>
                    <option value="education">متابعة التعليم</option>
                    <option value="business">بدء عمل تجاري</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  رؤيتك للحياة الزوجية
                </label>
                <textarea
                  value={(data as any).marriageVision || ""}
                  onChange={(e) =>
                    updateData({
                      ...data,
                      marriageVision: e.target.value,
                    } as any)
                  }
                  placeholder="شارك رؤيتك وتطلعاتك للحياة الزوجية..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Validation Summary */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Progress Indicator */}
      <div className="bg-primary-subtle p-4 rounded-lg">
        <h4 className="font-medium text-primary mb-2">إكمال البيانات:</h4>
        <p className="text-sm text-primary-safe">
          يرجى ملء جميع الحقول المطلوبة في كل قسم قبل المتابعة إلى المراجعة
          النهائية.
        </p>
      </div>
    </div>
  );
}
