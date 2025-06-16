import React from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Home, MapPin } from "lucide-react";
import {
  MaleRegisterRequest,
  FINANCIAL_SITUATIONS,
  HOUSING_TYPES,
  HOUSING_OWNERSHIP,
} from "@/lib/types/auth.types";

interface StepMaleFinancialProps {
  data: Partial<MaleRegisterRequest>;
  updateData: (data: Partial<MaleRegisterRequest>) => void;
  error: string | null;
  clearError: () => void;
  isSubmitting: boolean;
}

export default function StepMaleFinancial({
  data,
  updateData,
  error,
  clearError,
  isSubmitting,
}: StepMaleFinancialProps) {
  const handleInputChange = (field: keyof MaleRegisterRequest, value: any) => {
    clearError();
    updateData({ [field]: value });
  };

  // Skip this step if not male
  if (data.gender !== "male") {
    return (
      <div className="text-center py-12">
        <DollarSign className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          هذه الخطوة خاصة بالأخوة فقط
        </h3>
        <p className="text-gray-600">
          المعلومات المالية والسكنية مطلوبة للأخوة فقط
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          المعلومات المالية والسكنية
        </h3>
        <p className="text-sm text-gray-600">
          معلومات مهمة للأخ المتقدم للزواج، تساعد في إيجاد الشريكة المناسبة
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <div className="space-y-8">
        {/* Financial Information */}
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-blue-600" />
              المعلومات المالية
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Financial Situation */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                الوضع المادي الحالي *
              </label>
              <select
                value={data.financialSituation || ""}
                onChange={(e) =>
                  handleInputChange("financialSituation", e.target.value)
                }
                className="w-full p-4 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isSubmitting}
                required
              >
                <option value="">اختر الوضع المادي...</option>
                <option value={FINANCIAL_SITUATIONS.EXCELLENT}>
                  ممتاز - دخل مرتفع ومدخرات جيدة
                </option>
                <option value={FINANCIAL_SITUATIONS.GOOD}>
                  جيد - دخل مستقر ومدخرات متوسطة
                </option>
                <option value={FINANCIAL_SITUATIONS.AVERAGE}>
                  متوسط - دخل يكفي المعيشة
                </option>
                <option value={FINANCIAL_SITUATIONS.STRUGGLING}>
                  صعب - أواجه صعوبات مالية
                </option>
              </select>
            </div>

            {/* Monthly Income */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                الدخل الشهري (بالريال السعودي)
              </label>
              <Input
                type="number"
                value={data.monthlyIncome || ""}
                onChange={(e) =>
                  handleInputChange(
                    "monthlyIncome",
                    parseInt(e.target.value) || undefined,
                  )
                }
                placeholder="مثال: 8000"
                className="text-right"
                disabled={isSubmitting}
                min="0"
              />
              <p className="text-xs text-gray-500">
                هذه المعلومة اختيارية وستبقى سرية، تساعد في إيجاد شريكة مناسبة
                مالياً
              </p>
            </div>

            {/* Provider View */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                رؤيتك لدور الإنفاق في الأسرة
              </label>
              <select
                value={data.providerView || ""}
                onChange={(e) =>
                  handleInputChange("providerView", e.target.value)
                }
                className="w-full p-4 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isSubmitting}
              >
                <option value="">اختر...</option>
                <option value="sole provider">
                  المعيل الوحيد - أتحمل جميع نفقات الأسرة
                </option>
                <option value="shared responsibility">
                  مسؤولية مشتركة - مع مساهمة الزوجة إذا رغبت
                </option>
                <option value="flexible">
                  مرن - حسب الظروف والاتفاق المتبادل
                </option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Housing Information */}
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5 text-blue-600" />
              معلومات السكن
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Housing Location */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                موقع السكن الحالي *
              </label>
              <Input
                type="text"
                value={data.housingLocation || ""}
                onChange={(e) =>
                  handleInputChange("housingLocation", e.target.value)
                }
                placeholder="مثال: الرياض - حي الملز"
                className="text-right"
                disabled={isSubmitting}
                required
              />
            </div>

            {/* Housing Ownership */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                ملكية السكن *
              </label>
              <select
                value={data.housingOwnership || ""}
                onChange={(e) =>
                  handleInputChange("housingOwnership", e.target.value)
                }
                className="w-full p-4 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isSubmitting}
                required
              >
                <option value="">اختر نوع الملكية...</option>
                <option value={HOUSING_OWNERSHIP.OWNED}>
                  ملك - أملك المنزل/الشقة
                </option>
                <option value={HOUSING_OWNERSHIP.RENTED}>
                  إيجار - أستأجر المنزل/الشقة
                </option>
                <option value={HOUSING_OWNERSHIP.FAMILY_OWNED}>
                  ملك العائلة - أسكن في منزل الأهل
                </option>
              </select>
            </div>

            {/* Housing Type */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                نوع السكن *
              </label>
              <select
                value={data.housingType || ""}
                onChange={(e) =>
                  handleInputChange("housingType", e.target.value)
                }
                className="w-full p-4 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isSubmitting}
                required
              >
                <option value="">اختر نوع السكن...</option>
                <option value={HOUSING_TYPES.INDEPENDENT}>
                  مستقل - منزل أو شقة منفصلة
                </option>
                <option value={HOUSING_TYPES.WITH_FAMILY}>
                  مع العائلة - أسكن مع الأهل
                </option>
                <option value={HOUSING_TYPES.SHARED}>
                  مشترك - أسكن مع آخرين (أصدقاء/زملاء)
                </option>
              </select>
            </div>

            {/* Household Chores */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                المشاركة في الأعمال المنزلية
              </label>
              <select
                value={data.householdChores || ""}
                onChange={(e) =>
                  handleInputChange("householdChores", e.target.value)
                }
                className="w-full p-4 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isSubmitting}
              >
                <option value="">اختر...</option>
                <option value="willing">
                  مستعد للمشاركة في الأعمال المنزلية
                </option>
                <option value="not willing">
                  أفضل عدم المشاركة في الأعمال المنزلية
                </option>
                <option value="depends">حسب الظروف والاتفاق مع الزوجة</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Additional Notes */}
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="text-base">ملاحظات إضافية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800 leading-relaxed">
                💡 <strong>نصيحة:</strong> كن صادقاً في تقديم معلوماتك المالية
                والسكنية. هذه المعلومات تساعد في إيجاد شريكة حياة مناسبة لظروفك
                وتوقعاتها المالية. جميع المعلومات المالية الدقيقة ستبقى سرية ولن
                تظهر للآخرين إلا بعد الاتفاق المبدئي.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
