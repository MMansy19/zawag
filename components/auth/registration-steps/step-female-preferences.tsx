import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Baby, Briefcase, Home } from "lucide-react";
import { FemaleRegisterRequest } from "@/lib/types/auth.types";

interface StepFemalePreferencesProps {
  data: Partial<FemaleRegisterRequest>;
  updateData: (data: Partial<FemaleRegisterRequest>) => void;
  error: string | null;
  clearError: () => void;
  isSubmitting: boolean;
}

export default function StepFemalePreferences({
  data,
  updateData,
  error,
  clearError,
  isSubmitting,
}: StepFemalePreferencesProps) {
  const handleInputChange = (
    field: keyof FemaleRegisterRequest,
    value: any,
  ) => {
    clearError();
    updateData({ [field]: value });
  };

  // Skip this step if not female
  if (data.gender !== "female") {
    return (
      <div className="text-center py-12">
        <Heart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          هذه الخطوة خاصة بالأخوات فقط
        </h3>
        <p className="text-gray-600">تفضيلات العمل والأسرة خاصة بالأخوات</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          تفضيلات العمل والأسرة
        </h3>
        <p className="text-sm text-gray-600">
          معلومات مهمة تساعد في إيجاد شريك حياة مناسب لتطلعاتك وأهدافك
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <div className="space-y-8">
        {/* Work Preferences */}
        <Card className="border-pink-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-pink-600" />
              تفضيلات العمل
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Work After Marriage */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                العمل بعد الزواج
              </label>
              <div className="space-y-3">
                <label className="flex items-center p-4 border border-pink-200 rounded-lg cursor-pointer hover:bg-pink-50 transition-colors">
                  <input
                    type="radio"
                    name="workAfterMarriage"
                    value="yes"
                    checked={data.workAfterMarriage === "yes"}
                    onChange={(e) =>
                      handleInputChange("workAfterMarriage", e.target.value)
                    }
                    className="ml-3 text-pink-600"
                    disabled={isSubmitting}
                  />
                  <div className="flex items-center gap-3">
                    <Briefcase className="h-5 w-5 text-pink-600" />
                    <div>
                      <span className="font-medium text-gray-900 block">
                        نعم، أريد العمل
                      </span>
                      <span className="text-sm text-gray-600">
                        أرغب في الاستمرار في مسيرتي المهنية
                      </span>
                    </div>
                  </div>
                </label>
                <label className="flex items-center p-4 border border-pink-200 rounded-lg cursor-pointer hover:bg-pink-50 transition-colors">
                  <input
                    type="radio"
                    name="workAfterMarriage"
                    value="no"
                    checked={data.workAfterMarriage === "no"}
                    onChange={(e) =>
                      handleInputChange("workAfterMarriage", e.target.value)
                    }
                    className="ml-3 text-pink-600"
                    disabled={isSubmitting}
                  />
                  <div className="flex items-center gap-3">
                    <Home className="h-5 w-5 text-pink-600" />
                    <div>
                      <span className="font-medium text-gray-900 block">
                        لا، أفضل البقاء في البيت
                      </span>
                      <span className="text-sm text-gray-600">
                        أريد التفرغ للأسرة والمنزل
                      </span>
                    </div>
                  </div>
                </label>
                <label className="flex items-center p-4 border border-pink-200 rounded-lg cursor-pointer hover:bg-pink-50 transition-colors">
                  <input
                    type="radio"
                    name="workAfterMarriage"
                    value="undecided"
                    checked={data.workAfterMarriage === "undecided"}
                    onChange={(e) =>
                      handleInputChange("workAfterMarriage", e.target.value)
                    }
                    className="ml-3 text-pink-600"
                    disabled={isSubmitting}
                  />
                  <div className="flex items-center gap-3">
                    <Heart className="h-5 w-5 text-pink-600" />
                    <div>
                      <span className="font-medium text-gray-900 block">
                        لم أقرر بعد
                      </span>
                      <span className="text-sm text-gray-600">
                        سأقرر حسب الظروف والاتفاق مع الزوج
                      </span>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Childcare Preference */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                تفضيلات رعاية الأطفال
              </label>
              <select
                value={data.childcarePreference || ""}
                onChange={(e) =>
                  handleInputChange("childcarePreference", e.target.value)
                }
                className="w-full p-4 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                disabled={isSubmitting}
              >
                <option value="">اختاري...</option>
                <option value="self">أفضل رعايتهم بنفسي</option>
                <option value="family">بمساعدة الأهل والعائلة</option>
                <option value="nanny">بمساعدة مربية</option>
                <option value="daycare">حضانة أو روضة أطفال</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Family and Social Preferences */}
        <Card className="border-pink-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Baby className="h-5 w-5 text-pink-600" />
              التفضيلات الأسرية والاجتماعية
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Mahram Availability */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                توفر المحرم للسفر والخروج
              </label>
              <div className="flex items-center space-x-4 space-x-reverse">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="mahramAvailable"
                    value="true"
                    checked={data.mahramAvailable === true}
                    onChange={(e) => handleInputChange("mahramAvailable", true)}
                    className="ml-3 text-pink-600"
                    disabled={isSubmitting}
                  />
                  <span className="text-sm">متوفر</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="mahramAvailable"
                    value="false"
                    checked={data.mahramAvailable === false}
                    onChange={(e) =>
                      handleInputChange("mahramAvailable", false)
                    }
                    className="ml-3 text-pink-600"
                    disabled={isSubmitting}
                  />
                  <span className="text-sm">غير متوفر</span>
                </label>
              </div>
              <p className="text-xs text-gray-500">
                وجود محرم يساعد في السفر وبعض الأنشطة الاجتماعية
              </p>
            </div>

            {/* Family and Marriage Vision */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                رؤيتك للحياة الزوجية والأسرية
              </label>
              <Textarea
                value={data.familyAndMarriage?.marriageVision || ""}
                onChange={(e) =>
                  handleInputChange("familyAndMarriage", {
                    ...data.familyAndMarriage,
                    marriageVision: e.target.value,
                  })
                }
                placeholder="اكتبي رؤيتك للحياة الزوجية والأسرية المثالية..."
                className="text-right resize-none"
                rows={4}
                disabled={isSubmitting}
                maxLength={500}
              />
              <p className="text-xs text-gray-500 text-left">
                {(data.familyAndMarriage?.marriageVision || "").length}/500 حرف
              </p>
            </div>

            {/* Living with In-laws */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                السكن مع أهل الزوج
              </label>
              <select
                value={data.familyAndMarriage?.livingWithInLaws || ""}
                onChange={(e) =>
                  handleInputChange("familyAndMarriage", {
                    ...data.familyAndMarriage,
                    livingWithInLaws: e.target.value,
                  })
                }
                className="w-full p-4 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                disabled={isSubmitting}
              >
                <option value="">اختاري...</option>
                <option value="prefer">أفضل السكن مع أهل الزوج</option>
                <option value="neutral">لا مانع لدي</option>
                <option value="avoid">أفضل السكن المستقل</option>
              </select>
            </div>

            {/* Children Education Preference */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                تفضيلات تعليم الأطفال
              </label>
              <select
                value={data.familyAndMarriage?.childrenEducation || ""}
                onChange={(e) =>
                  handleInputChange("familyAndMarriage", {
                    ...data.familyAndMarriage,
                    childrenEducation: e.target.value,
                  })
                }
                className="w-full p-4 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                disabled={isSubmitting}
              >
                <option value="">اختاري...</option>
                <option value="religious">تعليم ديني إسلامي</option>
                <option value="secular">تعليم عام حديث</option>
                <option value="mixed">مزيج من التعليم الديني والعام</option>
                <option value="undecided">لم أحدد بعد</option>
              </select>
            </div>

            {/* Decision Making Style */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                أسلوب اتخاذ القرارات في الأسرة
              </label>
              <select
                value={data.familyAndMarriage?.decisionMaking || ""}
                onChange={(e) =>
                  handleInputChange("familyAndMarriage", {
                    ...data.familyAndMarriage,
                    decisionMaking: e.target.value,
                  })
                }
                className="w-full p-4 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                disabled={isSubmitting}
              >
                <option value="">اختاري...</option>
                <option value="shared">قرارات مشتركة ومتفق عليها</option>
                <option value="husband-led">الزوج يقود اتخاذ القرارات</option>
                <option value="wife-led">
                  أفضل المشاركة الفعالة في القرارات
                </option>
                <option value="flexible">مرن حسب نوع القرار</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Additional Guidance */}
        <Card className="border-pink-200">
          <CardHeader>
            <CardTitle className="text-base">نصائح مهمة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-pink-50 p-4 rounded-lg space-y-3">
              <p className="text-sm text-pink-800 leading-relaxed">
                💖 <strong>للأخت الكريمة:</strong>
              </p>
              <ul className="text-sm text-pink-800 space-y-2 list-disc list-inside">
                <li>كوني صادقة في تفضيلاتك لإيجاد شريك حياة متفهم لطموحاتك</li>
                <li>
                  ناقشي هذه المواضيع مع وليك (الأب/الأخ) للحصول على مشورته
                </li>
                <li>
                  تذكري أن الحياة الزوجية تقوم على التفاهم والتنازل المتبادل
                </li>
                <li>
                  جميع هذه التفضيلات قابلة للنقاش والتعديل مع الشريك المناسب
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
