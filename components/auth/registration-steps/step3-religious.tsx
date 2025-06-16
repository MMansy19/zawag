import React from "react";
import {
  RegisterRequest,
  RELIGIOUS_LEVELS,
  PARENT_STATUS,
  PARENT_RELATIONSHIP,
  CHILDREN_PREFERENCE,
  MALE_PRAYER_LOCATIONS,
  FEMALE_PRAYER_LOCATIONS,
  CLOTHING_STYLES,
  FINANCIAL_SITUATIONS,
  isFemaleRegisterRequest,
  isMaleRegisterRequest,
} from "@/lib/types/auth.types";

interface Step3ReligiousProps {
  data: Partial<RegisterRequest>;
  updateData: (data: Partial<RegisterRequest>) => void;
  error: string | null;
  clearError: () => void;
  isSubmitting: boolean;
}

export default function Step3Religious({
  data,
  updateData,
  error,
  clearError,
  isSubmitting,
}: Step3ReligiousProps) {
  const handleInputChange = (field: string, value: any) => {
    clearError();
    updateData({ [field]: value });
  };

  const isFemale = data.gender === "female";
  const isMale = data.gender === "male";

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          المعلومات الدينية
        </h3>
        <p className="text-sm text-gray-600">
          {isFemale
            ? "معلومات التدين والممارسة الدينية للأخت"
            : "معلومات التدين والممارسة الدينية للأخ"}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <div className="space-y-6">
        {/* Religious Level */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            مستوى التدين *
          </label>
          <select
            value={data.religiousLevel || "practicing"}
            onChange={(e) =>
              handleInputChange("religiousLevel", e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            disabled={isSubmitting}
            required
          >
            <option value={RELIGIOUS_LEVELS.BASIC}>أساسي</option>
            <option value={RELIGIOUS_LEVELS.PRACTICING}>ممارس</option>
            <option value={RELIGIOUS_LEVELS.VERY_RELIGIOUS}>متدين جداً</option>
          </select>
        </div>

        {/* Prayer Regularity */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            هل أنت منتظم في الصلاة؟ *
          </label>
          <div className="flex items-center space-x-4 space-x-reverse">
            <label className="flex items-center">
              <input
                type="radio"
                name="isPrayerRegular"
                value="true"
                checked={data.isPrayerRegular === true}
                onChange={(e) => handleInputChange("isPrayerRegular", true)}
                className="ml-2 text-primary-600"
                disabled={isSubmitting}
              />
              <span className="text-sm text-gray-700">نعم، منتظم</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="isPrayerRegular"
                value="false"
                checked={data.isPrayerRegular === false}
                onChange={(e) => handleInputChange("isPrayerRegular", false)}
                className="ml-2 text-primary-600"
                disabled={isSubmitting}
              />
              <span className="text-sm text-gray-700">أحياناً</span>
            </label>
          </div>
        </div>

        {/* Prayer Location */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {isMale ? "أين تصلي عادة؟ *" : "أين تصلين عادة؟ *"}
          </label>
          <select
            value={data.prayingLocation || ""}
            onChange={(e) =>
              handleInputChange("prayingLocation", e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            disabled={isSubmitting}
            required
          >
            <option value="">اختر...</option>
            {isMale ? (
              <>
                <option value={MALE_PRAYER_LOCATIONS.MOSQUE}>في المسجد</option>
                <option value={MALE_PRAYER_LOCATIONS.HOME}>في البيت</option>
                <option value={MALE_PRAYER_LOCATIONS.BOTH}>
                  في المسجد والبيت
                </option>
              </>
            ) : (
              <>
                <option value={FEMALE_PRAYER_LOCATIONS.HOME}>في البيت</option>
                <option value={FEMALE_PRAYER_LOCATIONS.MOSQUE_WHEN_POSSIBLE}>
                  في المسجد عند الإمكان
                </option>
              </>
            )}
          </select>
        </div>

        {/* Male-specific: Regular at Mosque */}
        {isMale && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              هل تحرص على الانتظام في المسجد؟
            </label>
            <div className="flex items-center space-x-4 space-x-reverse">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="isRegularAtMosque"
                  value="true"
                  checked={data.isRegularAtMosque === true}
                  onChange={(e) => handleInputChange("isRegularAtMosque", true)}
                  className="ml-2 text-primary-600"
                  disabled={isSubmitting}
                />
                <span className="text-sm text-gray-700">نعم</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="isRegularAtMosque"
                  value="false"
                  checked={data.isRegularAtMosque === false}
                  onChange={(e) =>
                    handleInputChange("isRegularAtMosque", false)
                  }
                  className="ml-2 text-primary-600"
                  disabled={isSubmitting}
                />
                <span className="text-sm text-gray-700">لا</span>
              </label>
            </div>
          </div>
        )}

        {/* Parents Status */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            حالة الوالدين *
          </label>
          <select
            value={data.areParentsAlive || ""}
            onChange={(e) =>
              handleInputChange("areParentsAlive", e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            disabled={isSubmitting}
            required
          >
            <option value="">اختر...</option>
            <option value={PARENT_STATUS.BOTH}>كلاهما على قيد الحياة</option>
            <option value={PARENT_STATUS.FATHER}>الأب فقط</option>
            <option value={PARENT_STATUS.MOTHER}>الأم فقط</option>
            <option value={PARENT_STATUS.NONE}>كلاهما متوفي</option>
          </select>
        </div>

        {/* Parent Relationship */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            علاقتك بالوالدين (بر الوالدين) *
          </label>
          <select
            value={data.parentRelationship || ""}
            onChange={(e) =>
              handleInputChange("parentRelationship", e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            disabled={isSubmitting}
            required
          >
            <option value="">اختر...</option>
            <option value={PARENT_RELATIONSHIP.EXCELLENT}>ممتازة</option>
            <option value={PARENT_RELATIONSHIP.GOOD}>جيدة</option>
            <option value={PARENT_RELATIONSHIP.AVERAGE}>متوسطة</option>
            <option value={PARENT_RELATIONSHIP.POOR}>ضعيفة</option>
          </select>
        </div>

        {/* Gender-specific sections */}
        {isFemale && (
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-xl border border-pink-200 space-y-6">
            <div className="flex items-center gap-2 border-b border-pink-200 pb-3">
              <div className="w-2 h-6 bg-pink-500 rounded"></div>
              <h4 className="font-semibold text-gray-800 text-lg">
                معلومات خاصة بالأخت
              </h4>
            </div>

            {/* Hijab */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                الحجاب *
              </label>
              <div className="flex items-center space-x-4 space-x-reverse">
                <label className="flex items-center bg-white p-3 rounded-lg border cursor-pointer hover:bg-pink-50 transition-colors">
                  <input
                    type="radio"
                    name="wearHijab"
                    value="true"
                    checked={data.wearHijab === true}
                    onChange={(e) => handleInputChange("wearHijab", true)}
                    className="ml-3 text-pink-600"
                    disabled={isSubmitting}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    نعم، ألبس الحجاب
                  </span>
                </label>
                <label className="flex items-center bg-white p-3 rounded-lg border cursor-pointer hover:bg-pink-50 transition-colors">
                  <input
                    type="radio"
                    name="wearHijab"
                    value="false"
                    checked={data.wearHijab === false}
                    onChange={(e) => handleInputChange("wearHijab", false)}
                    className="ml-3 text-pink-600"
                    disabled={isSubmitting}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    لا ألبس الحجاب
                  </span>
                </label>
              </div>
            </div>

            {/* Niqab */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                النقاب
              </label>
              <div className="flex items-center space-x-4 space-x-reverse">
                <label className="flex items-center bg-white p-3 rounded-lg border cursor-pointer hover:bg-pink-50 transition-colors">
                  <input
                    type="radio"
                    name="wearNiqab"
                    value="true"
                    checked={data.wearNiqab === true}
                    onChange={(e) => handleInputChange("wearNiqab", true)}
                    className="ml-3 text-pink-600"
                    disabled={isSubmitting}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    نعم، ألبس النقاب
                  </span>
                </label>
                <label className="flex items-center bg-white p-3 rounded-lg border cursor-pointer hover:bg-pink-50 transition-colors">
                  <input
                    type="radio"
                    name="wearNiqab"
                    value="false"
                    checked={data.wearNiqab === false}
                    onChange={(e) => handleInputChange("wearNiqab", false)}
                    className="ml-3 text-pink-600"
                    disabled={isSubmitting}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    لا ألبس النقاب
                  </span>
                </label>
              </div>
            </div>

            {/* Clothing Style */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                نوع اللبس المفضل *
              </label>
              <select
                value={data.clothingStyle || ""}
                onChange={(e) =>
                  handleInputChange("clothingStyle", e.target.value)
                }
                className="w-full p-4 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white"
                disabled={isSubmitting}
                required
              >
                <option value="">اختاري...</option>
                <option value={CLOTHING_STYLES.CONSERVATIVE}>
                  محافظ - ملابس فضفاضة ومحتشمة
                </option>
                <option value={CLOTHING_STYLES.MODEST}>
                  محتشم - ملابس مناسبة وأنيقة
                </option>
                <option value={CLOTHING_STYLES.TRADITIONAL}>
                  تقليدي - ملابس تراثية إسلامية
                </option>
              </select>
            </div>

            {/* Additional Female-specific fields */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                العمل بعد الزواج
              </label>
              <select
                value={data.workAfterMarriage || ""}
                onChange={(e) =>
                  handleInputChange("workAfterMarriage", e.target.value)
                }
                className="w-full p-4 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white"
                disabled={isSubmitting}
              >
                <option value="">اختاري...</option>
                <option value="yes">نعم، أريد العمل</option>
                <option value="no">لا، أفضل البقاء في البيت</option>
                <option value="undecided">لم أقرر بعد</option>
              </select>
            </div>
          </div>
        )}

        {isMale && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 space-y-6">
            <div className="flex items-center gap-2 border-b border-blue-200 pb-3">
              <div className="w-2 h-6 bg-blue-500 rounded"></div>
              <h4 className="font-semibold text-gray-800 text-lg">
                معلومات خاصة بالأخ
              </h4>
            </div>

            {/* Beard */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                اللحية *
              </label>
              <div className="flex items-center space-x-4 space-x-reverse">
                <label className="flex items-center bg-white p-3 rounded-lg border cursor-pointer hover:bg-blue-50 transition-colors">
                  <input
                    type="radio"
                    name="hasBeard"
                    value="true"
                    checked={data.hasBeard === true}
                    onChange={(e) => handleInputChange("hasBeard", true)}
                    className="ml-3 text-blue-600"
                    disabled={isSubmitting}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    نعم، لدي لحية
                  </span>
                </label>
                <label className="flex items-center bg-white p-3 rounded-lg border cursor-pointer hover:bg-blue-50 transition-colors">
                  <input
                    type="radio"
                    name="hasBeard"
                    value="false"
                    checked={data.hasBeard === false}
                    onChange={(e) => handleInputChange("hasBeard", false)}
                    className="ml-3 text-blue-600"
                    disabled={isSubmitting}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    لا، ليس لدي لحية
                  </span>
                </label>
              </div>
            </div>

            {/* Smoking */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                التدخين *
              </label>
              <div className="flex items-center space-x-4 space-x-reverse">
                <label className="flex items-center bg-white p-3 rounded-lg border cursor-pointer hover:bg-blue-50 transition-colors">
                  <input
                    type="radio"
                    name="smokes"
                    value="false"
                    checked={data.smokes === false}
                    onChange={(e) => handleInputChange("smokes", false)}
                    className="ml-3 text-blue-600"
                    disabled={isSubmitting}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    لا أدخن
                  </span>
                </label>
                <label className="flex items-center bg-white p-3 rounded-lg border cursor-pointer hover:bg-blue-50 transition-colors">
                  <input
                    type="radio"
                    name="smokes"
                    value="true"
                    checked={data.smokes === true}
                    onChange={(e) => handleInputChange("smokes", true)}
                    className="ml-3 text-blue-600"
                    disabled={isSubmitting}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    أدخن
                  </span>
                </label>
              </div>
            </div>

            {/* Financial Situation */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                الوضع المادي *
              </label>
              <select
                value={data.financialSituation || ""}
                onChange={(e) =>
                  handleInputChange("financialSituation", e.target.value)
                }
                className="w-full p-4 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                disabled={isSubmitting}
                required
              >
                <option value="">اختر...</option>
                <option value={FINANCIAL_SITUATIONS.EXCELLENT}>
                  ممتاز - دخل عالي ومستقر
                </option>
                <option value={FINANCIAL_SITUATIONS.GOOD}>
                  جيد - دخل مستقر
                </option>
                <option value={FINANCIAL_SITUATIONS.AVERAGE}>
                  متوسط - يكفي المعيشة
                </option>
                <option value={FINANCIAL_SITUATIONS.STRUGGLING}>
                  صعب - أواجه صعوبات مالية
                </option>
              </select>
            </div>

            {/* Housing Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  موقع السكن *
                </label>
                <input
                  type="text"
                  value={data.housingLocation || ""}
                  onChange={(e) =>
                    handleInputChange("housingLocation", e.target.value)
                  }
                  placeholder="مثال: الرياض - حي الملز"
                  className="w-full p-4 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  نوع السكن *
                </label>
                <select
                  value={data.housingType || ""}
                  onChange={(e) =>
                    handleInputChange("housingType", e.target.value)
                  }
                  className="w-full p-4 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  disabled={isSubmitting}
                  required
                >
                  <option value="">اختر...</option>
                  <option value="independent">
                    مستقل - منزل أو شقة منفصلة
                  </option>
                  <option value="with-family">مع العائلة</option>
                  <option value="shared">مشترك مع الآخرين</option>
                </select>
              </div>
            </div>

            {/* Monthly Income */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                الدخل الشهري (بالريال السعودي)
              </label>
              <input
                type="number"
                value={data.monthlyIncome || ""}
                onChange={(e) =>
                  handleInputChange(
                    "monthlyIncome",
                    parseInt(e.target.value) || undefined,
                  )
                }
                placeholder="مثال: 8000"
                className="w-full p-4 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isSubmitting}
                min="0"
              />
              <p className="text-xs text-gray-500">
                هذه المعلومة اختيارية وستبقى سرية
              </p>
            </div>
          </div>
        )}

        {/* Children Preference */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            هل تريد أطفال؟ *
          </label>
          <select
            value={data.wantsChildren || ""}
            onChange={(e) => handleInputChange("wantsChildren", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            disabled={isSubmitting}
            required
          >
            <option value="">اختر...</option>
            <option value={CHILDREN_PREFERENCE.YES}>نعم</option>
            <option value={CHILDREN_PREFERENCE.NO}>لا</option>
            <option value={CHILDREN_PREFERENCE.MAYBE}>ربما</option>
          </select>
        </div>
      </div>
    </div>
  );
}
