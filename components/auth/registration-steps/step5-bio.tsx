import React from "react";
import { RegisterRequest } from "@/lib/types/auth.types";

interface Step5BioProps {
  data: Partial<RegisterRequest>;
  updateData: (data: Partial<RegisterRequest>) => void;
  error: string | null;
  clearError: () => void;
  isSubmitting: boolean;
}

export default function Step5Bio({
  data,
  updateData,
  error,
  clearError,
  isSubmitting,
}: Step5BioProps) {
  const handleInputChange = (field: keyof RegisterRequest, value: any) => {
    clearError();
    updateData({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-700">
          اكتب نبذة عن نفسك تساعد الآخرين على التعرف عليك بشكل أفضل. هذا القسم
          اختياري ولكنه يساعد في إنشاء ملف شخصي أكثر تفصيلاً.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            نبذة شخصية (اختياري)
          </label>
          <textarea
            value={data.bio || ""}
            onChange={(e) => handleInputChange("bio", e.target.value)}
            rows={6}
            maxLength={500}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            placeholder="اكتب نبذة عن نفسك، اهتماماتك، أهدافك، وما تبحث عنه في شريك الحياة...

أمثلة على ما يمكن كتابته:
• شخصيتك وطباعك
• اهتماماتك وهواياتك
• أهدافك في الحياة
• ما تقدره في العلاقات
• قيمك ومبادئك المهمة"
            disabled={isSubmitting}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>الحد الأقصى: 500 حرف</span>
            <span>{data.bio?.length || 0} / 500</span>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">
            نصائح لكتابة نبذة شخصية جيدة:
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• كن صادقاً وأصيلاً في التعبير عن نفسك</li>
            <li>• اذكر اهتماماتك وهواياتك الحقيقية</li>
            <li>• وضح ما تبحث عنه في شريك الحياة</li>
            <li>• تجنب المعلومات الشخصية الحساسة</li>
            <li>• استخدم لغة إيجابية ومحترمة</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
