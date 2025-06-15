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
          <div className="bg-pink-50 p-4 rounded-lg space-y-4">
            <h4 className="font-medium text-gray-800">معلومات خاصة بالأخت</h4>

            {/* Hijab */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="wearHijab"
                checked={data.wearHijab ?? false}
                onChange={(e) =>
                  handleInputChange("wearHijab", e.target.checked)
                }
                className="ml-2 text-primary-600"
                disabled={isSubmitting}
              />
              <label
                htmlFor="wearHijab"
                className="text-sm font-medium text-gray-700"
              >
                ألبس الحجاب
              </label>
            </div>

            {/* Niqab */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="wearNiqab"
                checked={data.wearNiqab ?? false}
                onChange={(e) =>
                  handleInputChange("wearNiqab", e.target.checked)
                }
                className="ml-2 text-primary-600"
                disabled={isSubmitting}
              />
              <label
                htmlFor="wearNiqab"
                className="text-sm font-medium text-gray-700"
              >
                ألبس النقاب
              </label>
            </div>

            {/* Clothing Style */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                نوع اللبس المفضل *
              </label>
              <select
                value={data.clothingStyle || ""}
                onChange={(e) =>
                  handleInputChange("clothingStyle", e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                disabled={isSubmitting}
                required
              >
                <option value="">اختاري...</option>
                <option value={CLOTHING_STYLES.CONSERVATIVE}>محافظ</option>
                <option value={CLOTHING_STYLES.MODEST}>محتشم</option>
                <option value={CLOTHING_STYLES.TRADITIONAL}>تقليدي</option>
              </select>
            </div>
          </div>
        )}

        {isMale && (
          <div className="bg-blue-50 p-4 rounded-lg space-y-4">
            <h4 className="font-medium text-gray-800">معلومات خاصة بالأخ</h4>

            {/* Beard */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="hasBeard"
                checked={data.hasBeard ?? false}
                onChange={(e) =>
                  handleInputChange("hasBeard", e.target.checked)
                }
                className="ml-2 text-primary-600"
                disabled={isSubmitting}
              />
              <label
                htmlFor="hasBeard"
                className="text-sm font-medium text-gray-700"
              >
                لدي لحية
              </label>
            </div>

            {/* Smoking */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                هل تدخن؟ *
              </label>
              <div className="flex items-center space-x-4 space-x-reverse">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="smokes"
                    value="false"
                    checked={data.smokes === false}
                    onChange={(e) => handleInputChange("smokes", false)}
                    className="ml-2 text-primary-600"
                    disabled={isSubmitting}
                  />
                  <span className="text-sm text-gray-700">لا</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="smokes"
                    value="true"
                    checked={data.smokes === true}
                    onChange={(e) => handleInputChange("smokes", true)}
                    className="ml-2 text-primary-600"
                    disabled={isSubmitting}
                  />
                  <span className="text-sm text-gray-700">نعم</span>
                </label>
              </div>
            </div>

            {/* Financial Situation */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                الوضع المادي *
              </label>
              <select
                value={data.financialSituation || ""}
                onChange={(e) =>
                  handleInputChange("financialSituation", e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                disabled={isSubmitting}
                required
              >
                <option value="">اختر...</option>
                <option value={FINANCIAL_SITUATIONS.EXCELLENT}>ممتاز</option>
                <option value={FINANCIAL_SITUATIONS.GOOD}>جيد</option>
                <option value={FINANCIAL_SITUATIONS.AVERAGE}>متوسط</option>
                <option value={FINANCIAL_SITUATIONS.STRUGGLING}>صعب</option>
              </select>
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
