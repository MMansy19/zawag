import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { RegisterRequest } from "@/lib/types/auth.types";
import {
  Edit,
  CheckCircle,
  User,
  MapPin,
  Briefcase,
  Heart,
  UserCheck,
  Settings,
} from "lucide-react";

interface Step9ReviewProps {
  data: Partial<RegisterRequest>;
  updateData: (data: Partial<RegisterRequest>) => void;
  error: string | null;
  clearError: () => void;
  isSubmitting: boolean;
  profilePicture: File | null;
  onEdit: (step: number) => void;
  onSubmit: () => Promise<boolean>;
}

export default function Step9Review({
  data,
  profilePicture,
  onEdit,
  onSubmit,
  isSubmitting,
}: Step9ReviewProps) {
  const formatMaritalStatus = (status?: string): string => {
    switch (status) {
      case "single":
        return "أعزب/عزباء";
      case "divorced":
        return "مطلق/مطلقة";
      case "widowed":
        return "أرمل/أرملة";
      default:
        return "غير محدد";
    }
  };

  const formatReligiousLevel = (level?: string): string => {
    switch (level) {
      case "basic":
        return "أساسي";
      case "practicing":
        return "ممارس";
      case "very-religious":
        return "متدين جداً";
      default:
        return "غير محدد";
    }
  };

  const formatGender = (gender?: string): string => {
    return gender === "male"
      ? "ذكر"
      : gender === "female"
        ? "أنثى"
        : "غير محدد";
  };

  const formatAgeRange = () => {
    const { min, max } = data.preferences?.ageRange || {};
    if (!min && !max) return "غير محدد";
    if (min && max) return `${min} - ${max} سنة`;
    if (min) return `من ${min} سنة`;
    if (max) return `حتى ${max} سنة`;
    return "غير محدد";
  };

  const formatArrayPreferences = (arr?: string[]): string => {
    if (!arr || arr.length === 0) return "غير محدد";
    return arr.join(", ");
  };

  const reviewSections = [
    {
      id: "basic",
      title: "المعلومات الأساسية",
      icon: <User className="h-5 w-5" />,
      step: 2,
      items: [
        {
          label: "الاسم",
          value:
            `${data.firstName || ""} ${data.lastName || ""}`.trim() ||
            "غير محدد",
        },
        { label: "العمر", value: data.age ? `${data.age} سنة` : "غير محدد" },
        { label: "الجنس", value: formatGender(data.gender) },
        {
          label: "الحالة الزوجية",
          value: formatMaritalStatus(data.maritalStatus),
        },
      ],
    },
    {
      id: "location",
      title: "الموقع والجنسية",
      icon: <MapPin className="h-5 w-5" />,
      step: 4,
      items: [
        { label: "البلد", value: data.country || "غير محدد" },
        { label: "المدينة", value: data.city || "غير محدد" },
        { label: "الجنسية", value: data.nationality || "غير محدد" },
      ],
    },
    {
      id: "education",
      title: "التعليم والعمل",
      icon: <Briefcase className="h-5 w-5" />,
      step: 4,
      items: [
        { label: "التعليم", value: data.education || "غير محدد" },
        { label: "المهنة", value: data.occupation || "غير محدد" },
      ],
    },
    {
      id: "religious",
      title: "المعلومات الدينية",
      icon: <Heart className="h-5 w-5" />,
      step: 3,
      items: [
        {
          label: "مستوى التدين",
          value: formatReligiousLevel(data.religiousLevel),
        },
        { label: "الصلاة", value: data.prays ? "نعم" : "لا" },
        { label: "الصيام", value: data.fasts ? "نعم" : "لا" },
        ...(data.gender === "female" && data.hasHijab !== undefined
          ? [{ label: "الحجاب", value: data.hasHijab ? "نعم" : "لا" }]
          : []),
        ...(data.gender === "male" && data.hasBeard !== undefined
          ? [{ label: "اللحية", value: data.hasBeard ? "نعم" : "لا" }]
          : []),
      ],
    },
    {
      id: "preferences",
      title: "تفضيلات الزواج",
      icon: <Settings className="h-5 w-5" />,
      step: 6,
      items: [
        { label: "الفئة العمرية", value: formatAgeRange() },
        {
          label: "البلد المفضل",
          value: data.preferences?.country || "غير محدد",
        },
        {
          label: "مستوى التدين",
          value: formatArrayPreferences(data.preferences?.religiousLevel),
        },
        {
          label: "التعليم المفضل",
          value: formatArrayPreferences(data.preferences?.education),
        },
      ],
    },
  ];

  // Optional sections
  const optionalSections = [];

  if (data.bio) {
    optionalSections.push({
      id: "bio",
      title: "النبذة الشخصية",
      step: 5,
      content: data.bio,
    });
  }

  if (
    data.gender === "female" &&
    (data.guardianName || data.guardianPhone || data.guardianEmail)
  ) {
    optionalSections.push({
      id: "guardian",
      title: "معلومات الولي",
      icon: <UserCheck className="h-5 w-5" />,
      step: 8,
      items: [
        ...(data.guardianName
          ? [{ label: "الاسم", value: data.guardianName }]
          : []),
        ...(data.guardianPhone
          ? [{ label: "الهاتف", value: data.guardianPhone }]
          : []),
        ...(data.guardianEmail
          ? [{ label: "البريد الإلكتروني", value: data.guardianEmail }]
          : []),
      ],
    });
  }

  const handleSubmit = async () => {
    await onSubmit();
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">
          مراجعة البيانات النهائية
        </h3>
        <p className="text-sm text-gray-600">
          تأكد من صحة جميع البيانات قبل إنشاء الحساب
        </p>
      </div>

      {/* Account Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-primary" />
            <h4 className="text-lg font-semibold">معلومات الحساب</h4>
          </div>
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
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-600">
                البريد الإلكتروني:
              </span>
              <span className="text-sm font-medium">{data.email}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main sections */}
      {reviewSections.map((section) => (
        <Card key={section.id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              {section.icon && (
                <span className="text-primary">{section.icon}</span>
              )}
              <h4 className="text-lg font-semibold">{section.title}</h4>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(section.step)}
              className="flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              تعديل
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.items.map((item, index) => (
                <div key={index} className="space-y-1">
                  <span className="text-sm font-medium text-gray-600">
                    {item.label}
                  </span>
                  <p className="text-sm font-medium">{item.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Optional sections */}
      {optionalSections.map((section) => (
        <Card key={section.id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              {section.icon && (
                <span className="text-primary">{section.icon}</span>
              )}
              <h4 className="text-lg font-semibold">{section.title}</h4>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(section.step)}
              className="flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              تعديل
            </Button>
          </CardHeader>
          <CardContent>
            {section.content ? (
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {section.content}
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.items?.map((item, index) => (
                  <div key={index} className="space-y-1">
                    <span className="text-sm font-medium text-gray-600">
                      {item.label}
                    </span>
                    <p className="text-sm font-medium">{item.value}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {/* Profile Picture */}
      {profilePicture && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <h4 className="text-lg font-semibold">الصورة الشخصية</h4>
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
          <CardContent>
            <div className="flex items-center space-x-4">
              <img
                src={URL.createObjectURL(profilePicture)}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium">{profilePicture.name}</p>
                <p className="text-xs text-gray-600">
                  {(profilePicture.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Final confirmation */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-green-800">
              جاهز لإنشاء الحساب
            </h3>
            <div className="space-y-2 text-sm text-green-700">
              <p>• سيتم مراجعة ملفك الشخصي من قِبل الإدارة خلال 24-48 ساعة</p>
              <p>• ستتلقى إشعاراً عند اكتمال المراجعة</p>
              <p>• يمكنك تعديل معلوماتك في أي وقت من صفحة الملف الشخصي</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
