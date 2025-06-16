import React from "react";
import {
  RegisterRequest,
  APPEARANCE_LEVELS,
  SKIN_COLORS,
  BODY_TYPES,
  HOUSING_OWNERSHIP,
  HOUSING_TYPES,
} from "@/lib/types/auth.types";

interface Step45PhysicalPersonalProps {
  data: Partial<RegisterRequest>;
  updateData: (data: Partial<RegisterRequest>) => void;
  error: string | null;
  clearError: () => void;
  isSubmitting: boolean;
}

export default function Step45PhysicalPersonal({
  data,
  updateData,
  error,
  clearError,
  isSubmitting,
}: Step45PhysicalPersonalProps) {
  const handleInputChange = (field: string, value: any) => {
    clearError();
    updateData({ [field]: value });
  };

  const handleInterestsChange = (value: string) => {
    const interests = value
      .split(",")
      .map((interest) => interest.trim())
      .filter(Boolean);
    handleInputChange("interests", interests);
  };

  const isMale = data.gender === "male";
  const interestsString = Array.isArray(data.interests)
    ? data.interests.join(", ")
    : "";

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          المعلومات الشخصية والجسدية
        </h3>
        <p className="text-sm text-gray-600">
          معلومات مهمة لمساعدة الآخرين في التعرف عليك بشكل أفضل
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <div className="space-y-6">
        {/* Physical Appearance Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-4">المظهر الجسدي</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Height */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                الطول (سم) *
              </label>
              <input
                type="number"
                min="140"
                max="220"
                value={data.height || ""}
                onChange={(e) =>
                  handleInputChange("height", parseInt(e.target.value))
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="مثال: 170"
                disabled={isSubmitting}
                required
              />
            </div>

            {/* Weight */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                الوزن (كجم) *
              </label>
              <input
                type="number"
                min="40"
                max="200"
                value={data.weight || ""}
                onChange={(e) =>
                  handleInputChange("weight", parseInt(e.target.value))
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="مثال: 70"
                disabled={isSubmitting}
                required
              />
            </div>

            {/* Appearance */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                المظهر العام *
              </label>
              <select
                value={data.appearance || ""}
                onChange={(e) =>
                  handleInputChange("appearance", e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                disabled={isSubmitting}
                required
              >
                <option value="">اختر...</option>
                <option value={APPEARANCE_LEVELS.VERY_ATTRACTIVE}>
                  جذاب جداً
                </option>
                <option value={APPEARANCE_LEVELS.ATTRACTIVE}>جذاب</option>
                <option value={APPEARANCE_LEVELS.AVERAGE}>متوسط</option>
                <option value={APPEARANCE_LEVELS.SIMPLE}>بسيط</option>
              </select>
            </div>

            {/* Skin Color */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                لون البشرة *
              </label>
              <select
                value={data.skinColor || ""}
                onChange={(e) => handleInputChange("skinColor", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                disabled={isSubmitting}
                required
              >
                <option value="">اختر...</option>
                <option value={SKIN_COLORS.FAIR}>فاتح</option>
                <option value={SKIN_COLORS.MEDIUM}>متوسط</option>
                <option value={SKIN_COLORS.OLIVE}>زيتوني</option>
                <option value={SKIN_COLORS.DARK}>داكن</option>
              </select>
            </div>

            {/* Body Type */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                بنية الجسم *
              </label>
              <select
                value={data.bodyType || ""}
                onChange={(e) => handleInputChange("bodyType", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                disabled={isSubmitting}
                required
              >
                <option value="">اختر...</option>
                <option value={BODY_TYPES.SLIM}>نحيف</option>
                <option value={BODY_TYPES.AVERAGE}>متوسط</option>
                <option value={BODY_TYPES.ATHLETIC}>رياضي</option>
                <option value={BODY_TYPES.HEAVY}>ممتلئ</option>
              </select>
            </div>
          </div>
        </div>

        {/* Male-specific Housing Information */}
        {isMale && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-4">
              معلومات السكن والمعيشة
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Housing Location */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  مكان بيت الزوجية *
                </label>
                <input
                  type="text"
                  value={data.housingLocation || ""}
                  onChange={(e) =>
                    handleInputChange("housingLocation", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="مثال: القاهرة - مدينة نصر"
                  disabled={isSubmitting}
                  required
                />
              </div>

              {/* Housing Ownership */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  ملكية السكن *
                </label>
                <select
                  value={data.housingOwnership || ""}
                  onChange={(e) =>
                    handleInputChange("housingOwnership", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  disabled={isSubmitting}
                  required
                >
                  <option value="">اختر...</option>
                  <option value={HOUSING_OWNERSHIP.OWNED}>تمليك</option>
                  <option value={HOUSING_OWNERSHIP.RENTED}>إيجار</option>
                  <option value={HOUSING_OWNERSHIP.FAMILY_OWNED}>
                    ملك الأسرة
                  </option>
                </select>
              </div>

              {/* Housing Type */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  نوع السكن *
                </label>
                <select
                  value={data.housingType || ""}
                  onChange={(e) =>
                    handleInputChange("housingType", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  disabled={isSubmitting}
                  required
                >
                  <option value="">اختر...</option>
                  <option value={HOUSING_TYPES.INDEPENDENT}>مستقل</option>
                  <option value={HOUSING_TYPES.WITH_FAMILY}>مع الأسرة</option>
                  <option value={HOUSING_TYPES.SHARED}>مشترك</option>
                </select>
              </div>

              {/* Monthly Income */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  الدخل الشهري (اختياري)
                </label>
                <input
                  type="number"
                  min="0"
                  step="500"
                  value={data.monthlyIncome || ""}
                  onChange={(e) =>
                    handleInputChange("monthlyIncome", parseInt(e.target.value))
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="مثال: 5000"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>
        )}

        {/* Personal Information */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-4">المعلومات الشخصية</h4>

          <div className="space-y-4">
            {/* Interests */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                الاهتمامات *
              </label>
              <input
                type="text"
                value={interestsString}
                onChange={(e) => handleInterestsChange(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="مثال: القراءة، الرياضة، الطبخ، السفر (افصل بالفاصلة)"
                disabled={isSubmitting}
                required
              />
              <p className="text-xs text-gray-500">
                اكتب اهتماماتك مفصولة بالفاصلة
              </p>
            </div>

            {/* Marriage Goals */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                أهدافك من الزواج *
              </label>
              <textarea
                value={data.marriageGoals || ""}
                onChange={(e) =>
                  handleInputChange("marriageGoals", e.target.value)
                }
                rows={3}
                maxLength={300}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                placeholder="مثال: تكوين أسرة مسلمة متماسكة، تربية أطفال صالحين، الدعم المتبادل في الدين والدنيا..."
                disabled={isSubmitting}
                required
              />
              <p className="text-xs text-gray-500">
                {(data.marriageGoals || "").length}/300 حرف
              </p>
            </div>

            {/* Personality Description */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                تحدث عن شخصيتك *
              </label>
              <textarea
                value={data.personalityDescription || ""}
                onChange={(e) =>
                  handleInputChange("personalityDescription", e.target.value)
                }
                rows={3}
                maxLength={300}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                placeholder="مثال: شخص هادئ ومحب للخير، أحب التعلم والقراءة، أقدر الصراحة والوضوح..."
                disabled={isSubmitting}
                required
              />
              <p className="text-xs text-gray-500">
                {(data.personalityDescription || "").length}/300 حرف
              </p>
            </div>

            {/* Family Plans */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                خطط الأسرة *
              </label>
              <textarea
                value={data.familyPlans || ""}
                onChange={(e) =>
                  handleInputChange("familyPlans", e.target.value)
                }
                rows={2}
                maxLength={200}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                placeholder="مثال: أريد 2-3 أطفال، أهتم بالتربية الإسلامية، أؤمن بأهمية التعليم..."
                disabled={isSubmitting}
                required
              />
              <p className="text-xs text-gray-500">
                {(data.familyPlans || "").length}/200 حرف
              </p>
            </div>

            {/* Relocation Plans */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                خطط الانتقال والسفر *
              </label>
              <textarea
                value={data.relocationPlans || ""}
                onChange={(e) =>
                  handleInputChange("relocationPlans", e.target.value)
                }
                rows={2}
                maxLength={200}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                placeholder="مثال: مستعد للانتقال للسعودية للعمل، أو مفتوح للعيش في بلد آخر، أو أفضل البقاء في بلدي..."
                disabled={isSubmitting}
                required
              />
              <p className="text-xs text-gray-500">
                {(data.relocationPlans || "").length}/200 حرف
              </p>
            </div>

            {/* Marriage Timeline */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                خطط الزواج والتوقيت *
              </label>
              <textarea
                value={data.marriageTimeline || ""}
                onChange={(e) =>
                  handleInputChange("marriageTimeline", e.target.value)
                }
                rows={2}
                maxLength={200}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                placeholder="مثال: أريد الزواج في غضون 6 أشهر، أحتاج وقت للتعارف والتأكد من التوافق، مستعد للزواج قريباً..."
                disabled={isSubmitting}
                required
              />
              <p className="text-xs text-gray-500">
                {(data.marriageTimeline || "").length}/200 حرف
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
