import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, User, Shield } from "lucide-react";
import {
  RegisterRequest,
  GUARDIAN_RELATIONSHIPS,
} from "@/lib/types/auth.types";

interface Step8GuardianProps {
  data: Partial<RegisterRequest>;
  updateData: (data: Partial<RegisterRequest>) => void;
  error: string | null;
  clearError: () => void;
  isSubmitting: boolean;
}

const Step8Guardian: React.FC<Step8GuardianProps> = ({
  data,
  updateData,
  isSubmitting,
  error,
  clearError,
}) => {
  const handleInputChange = (field: string, value: any) => {
    clearError();
    updateData({ [field]: value });
  };

  const isFemale = data.gender === "female";

  // If not female, skip this step
  if (!isFemale) {
    return (
      <div className="text-center py-12">
        <Shield className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          هذه الخطوة خاصة بالأخوات فقط
        </h3>
        <p className="text-gray-600">
          معلومات ولي الأمر مطلوبة للأخوات فقط وفقاً للتعاليم الإسلامية
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          معلومات ولي الأمر
        </h3>
        <p className="text-sm text-gray-600">
          معلومات ولي الأمر مطلوبة وضرورية للأخوات وفقاً للتعاليم الإسلامية
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary-600" />
            معلومات ولي الأمر
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Guardian Name */}
            <div className="space-y-2">
              <Label htmlFor="guardianName" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                اسم ولي الأمر *
              </Label>
              <Input
                id="guardianName"
                type="text"
                value={data.guardianName || ""}
                onChange={(e) =>
                  handleInputChange("guardianName", e.target.value)
                }
                placeholder="الاسم الكامل لولي الأمر"
                disabled={isSubmitting}
                required
                className="text-right"
              />
            </div>

            {/* Guardian Relationship */}
            <div className="space-y-2">
              <Label htmlFor="guardianRelationship">صلة القرابة *</Label>
              <select
                id="guardianRelationship"
                value={data.guardianRelationship || ""}
                onChange={(e) =>
                  handleInputChange("guardianRelationship", e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                disabled={isSubmitting}
                required
              >
                <option value="">اختاري...</option>
                <option value={GUARDIAN_RELATIONSHIPS.FATHER}>الأب</option>
                <option value={GUARDIAN_RELATIONSHIPS.BROTHER}>الأخ</option>
                <option value={GUARDIAN_RELATIONSHIPS.UNCLE}>العم/الخال</option>
                <option value={GUARDIAN_RELATIONSHIPS.OTHER}>آخر</option>
              </select>
            </div>

            {/* Guardian Phone */}
            <div className="space-y-2">
              <Label
                htmlFor="guardianPhone"
                className="flex items-center gap-2"
              >
                <Phone className="h-4 w-4" />
                رقم الهاتف *
              </Label>
              <Input
                id="guardianPhone"
                type="tel"
                value={data.guardianPhone || ""}
                onChange={(e) =>
                  handleInputChange("guardianPhone", e.target.value)
                }
                placeholder="مثال: +966501234567"
                disabled={isSubmitting}
                required
                className="text-left"
                dir="ltr"
              />
            </div>

            {/* Guardian Email */}
            <div className="space-y-2">
              <Label
                htmlFor="guardianEmail"
                className="flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                البريد الإلكتروني (اختياري)
              </Label>
              <Input
                id="guardianEmail"
                type="email"
                value={data.guardianEmail || ""}
                onChange={(e) =>
                  handleInputChange("guardianEmail", e.target.value)
                }
                placeholder="guardian@example.com"
                disabled={isSubmitting}
                className="text-left"
                dir="ltr"
              />
            </div>
          </div>

          {/* Guardian Notes */}
          <div className="space-y-2">
            <Label htmlFor="guardianNotes">ملاحظات إضافية (اختياري)</Label>
            <Textarea
              id="guardianNotes"
              value={data.guardianNotes || ""}
              onChange={(e) =>
                handleInputChange("guardianNotes", e.target.value)
              }
              rows={3}
              maxLength={200}
              placeholder="أي معلومات إضافية عن ولي الأمر أو طريقة التواصل المفضلة..."
              disabled={isSubmitting}
              className="resize-none"
            />
            <p className="text-xs text-gray-500">
              {(data.guardianNotes || "").length}/200 حرف
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">
                  لماذا نطلب معلومات ولي الأمر؟
                </p>
                <ul className="space-y-1 text-blue-700">
                  <li>• احتراماً للتعاليم الإسلامية في أمور الزواج</li>
                  <li>• ضمان الجدية والموافقة الأسرية</li>
                  <li>• توفير مرجع موثوق للتواصل عند الحاجة</li>
                  <li>• حماية إضافية لسلامة الأخت المسلمة</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-green-800">
                <p className="font-medium mb-1">الخصوصية والأمان</p>
                <p className="text-green-700">
                  معلومات ولي الأمر محفوظة بسرية تامة ولن يتم مشاركتها إلا عند
                  الحاجة الضرورية وبموافقتك المسبقة. نحن نحترم خصوصيتك وخصوصية
                  أسرتك.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Step8Guardian;
