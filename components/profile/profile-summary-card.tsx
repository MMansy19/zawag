"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProfileFormData } from "@/lib/types";
import { Edit } from "lucide-react";

interface ProfileSummaryCardProps {
  data: ProfileFormData;
  onEdit: (step: number) => void;
  className?: string;
}

export function ProfileSummaryCard({ data, onEdit }: ProfileSummaryCardProps) {
  const formatAgeRange = (min?: number, max?: number) => {
    if (!min && !max) return "غير محدد";
    if (min && max) return `${min} - ${max} سنة`;
    if (min) return `من ${min} سنة`;
    if (max) return `حتى ${max} سنة`;
    return "غير محدد";
  };

  const formatArrayPreferences = (arr?: string[]) => {
    if (!arr || arr.length === 0) return "غير محدد";
    return arr.join(", ");
  };

  return (
    <div className="space-y-4">
      {/* Basic Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <h4 className="text-lg font-semibold">المعلومات الأساسية</h4>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(1)}
            className="flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            تعديل
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">الاسم</label>
              <p className="text-sm font-medium">{data.name || "غير محدد"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">العمر</label>
              <p className="text-sm font-medium">
                {data.age || "غير محدد"} سنة
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">الجنس</label>
              <p className="text-sm font-medium">
                {data.gender === "male"
                  ? "ذكر"
                  : data.gender === "female"
                    ? "أنثى"
                    : "غير محدد"}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                الحالة الزوجية
              </label>
              <p className="text-sm font-medium">
                {data.maritalStatus === "single"
                  ? "أعزب/عزباء"
                  : data.maritalStatus === "divorced"
                    ? "مطلق/مطلقة"
                    : data.maritalStatus === "widowed"
                      ? "أرمل/أرملة"
                      : "غير محدد"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <h4 className="text-lg font-semibold">الموقع والجنسية</h4>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(2)}
            className="flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            تعديل
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">البلد</label>
              <p className="text-sm font-medium">
                {data.country || "غير محدد"}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                المدينة
              </label>
              <p className="text-sm font-medium">{data.city || "غير محدد"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                الجنسية
              </label>
              <p className="text-sm font-medium">
                {data.nationality || "غير محدد"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Education & Work */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <h4 className="text-lg font-semibold">التعليم والعمل</h4>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(3)}
            className="flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            تعديل
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">
                المستوى التعليمي
              </label>
              <p className="text-sm font-medium">
                {data.education || "غير محدد"}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                المهنة
              </label>
              <p className="text-sm font-medium">
                {data.occupation || "غير محدد"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Religious Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <h4 className="text-lg font-semibold">المعلومات الدينية</h4>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(4)}
            className="flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            تعديل
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-600">
              مستوى التدين
            </label>
            <p className="text-sm font-medium">
              {data.religiousLevel === "basic"
                ? "أساسي"
                : data.religiousLevel === "practicing"
                  ? "ملتزم"
                  : data.religiousLevel === "very-religious"
                    ? "متدين جداً"
                    : data.religiousLevel === "moderate"
                      ? "متوسط"
                      : "غير محدد"}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.prays && <Badge variant="outline">يصلي بانتظام</Badge>}
            {data.fasts && <Badge variant="outline">يصوم</Badge>}
            {data.hasHijab && <Badge variant="outline">ترتدي الحجاب</Badge>}
            {data.hasBeard && <Badge variant="outline">يربي لحية</Badge>}
          </div>
        </CardContent>
      </Card>

      {/* Bio */}
      {data.bio && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <h4 className="text-lg font-semibold">نبذة شخصية</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(5)}
              className="flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              تعديل
            </Button>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">{data.bio}</p>
          </CardContent>
        </Card>
      )}

      {/* Guardian Information */}
      {(data.guardianName || data.guardianPhone || data.guardianEmail) && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <h4 className="text-lg font-semibold">معلومات الولي</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(6)}
              className="flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              تعديل
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              {data.guardianName && (
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    اسم الولي
                  </label>
                  <p className="text-sm font-medium">{data.guardianName}</p>
                </div>
              )}
              {data.guardianPhone && (
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    رقم الهاتف
                  </label>
                  <p className="text-sm font-medium">{data.guardianPhone}</p>
                </div>
              )}
              {data.guardianEmail && (
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-600">
                    البريد الإلكتروني
                  </label>
                  <p className="text-sm font-medium">{data.guardianEmail}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Preferences */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <h4 className="text-lg font-semibold">تفضيلات الشريك</h4>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(7)}
            className="flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            تعديل
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">
                الفئة العمرية
              </label>
              <p className="text-sm font-medium">
                {formatAgeRange(
                  data.preferences?.ageRange?.min,
                  data.preferences?.ageRange?.max,
                )}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                البلد المفضل
              </label>
              <p className="text-sm font-medium">
                {data.preferences?.country || "أي بلد"}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                مستوى التدين
              </label>
              <p className="text-sm font-medium">
                {formatArrayPreferences(data.preferences?.religiousLevel)}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                المستوى التعليمي
              </label>
              <p className="text-sm font-medium">
                {formatArrayPreferences(data.preferences?.education)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
