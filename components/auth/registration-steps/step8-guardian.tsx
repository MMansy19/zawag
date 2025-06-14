import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Phone, Mail, User } from "lucide-react";
import { RegistrationStepProps, RegisterRequest } from "@/lib/types/auth.types";

const Step8Guardian: React.FC<RegistrationStepProps> = ({
  data,
  updateData,
  isSubmitting,
  error,
  clearError,
}) => {
  const handleInputChange = (field: string, value: any) => {
    clearError();
    const fieldMap: Record<string, keyof RegisterRequest> = {
      hasGuardian: "hasGuardian",
      name: "guardianName",
      relationship: "guardianRelationship",
      phone: "guardianPhone",
      email: "guardianEmail",
      notes: "guardianNotes",
    };
    const actualField = fieldMap[field];
    if (actualField) {
      updateData({
        [actualField]: value,
      } as Partial<RegisterRequest>);
    }
  };
  const hasGuardian = data.hasGuardian || false;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          معلومات ولي الأمر
        </h2>
        <p className="text-gray-600">
          معلومات ولي الأمر أو الشخص المرجعي (اختيارية)
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-6 h-6 mt-2" />
            <span>معلومات ولي الأمر</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Has Guardian Checkbox */}
          <div className="flex items-center gap-2">
            {" "}
            <Checkbox
              id="has-guardian"
              checked={hasGuardian}
              onCheckedChange={(checked: boolean) =>
                handleInputChange("hasGuardian", checked)
              }
              className="border border-primary ring-blue-500 ring-offset-0 ring-2"
            />
            <Label htmlFor="has-guardian" className="mt-1">
              أريد إضافة معلومات ولي أمر أو شخص مرجعي
            </Label>
          </div>

          {hasGuardian && (
            <>
              {/* Guardian Name */}
              <div className="space-y-2">
                <Label htmlFor="guardian-name">
                  الاسم الكامل <span className="text-red-500">*</span>
                </Label>{" "}
                <Input
                  id="guardian-name"
                  placeholder="اسم ولي الأمر"
                  value={data.guardianName || ""}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>

              {/* Relationship */}
              <div className="space-y-2">
                <Label htmlFor="guardian-relationship">
                  صلة القرابة <span className="text-red-500">*</span>
                </Label>{" "}
                <Input
                  id="guardian-relationship"
                  placeholder="مثل: والد، والدة، أخ، عم، خال"
                  value={data.guardianRelationship || ""}
                  onChange={(e) =>
                    handleInputChange("relationship", e.target.value)
                  }
                  required
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="guardian-phone">
                  رقم الهاتف <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />{" "}
                  <Input
                    id="guardian-phone"
                    type="tel"
                    placeholder="+966 50 123 4567"
                    value={data.guardianPhone || ""}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Email (Optional) */}
              <div className="space-y-2">
                <Label htmlFor="guardian-email">
                  البريد الإلكتروني (اختياري)
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />{" "}
                  <Input
                    id="guardian-email"
                    type="email"
                    placeholder="guardian@example.com"
                    value={data.guardianEmail || ""}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="guardian-notes">ملاحظات إضافية (اختياري)</Label>{" "}
                <Textarea
                  id="guardian-notes"
                  placeholder="أي معلومات إضافية عن ولي الأمر أو تفضيلات التواصل"
                  value={data.guardianNotes || ""}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    handleInputChange("notes", e.target.value)
                  }
                  rows={3}
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {hasGuardian && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-2">ملاحظة:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>معلومات ولي الأمر ستستخدم للتواصل في الحالات المهمة فقط</li>
                <li>
                  هذه المعلومات ستبقى سرية ولن تُشارك مع المستخدمين الآخرين
                </li>
                <li>يمكن تعديل أو حذف هذه المعلومات لاحقاً من الإعدادات</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Step8Guardian;
