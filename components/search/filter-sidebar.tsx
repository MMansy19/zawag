"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Filter, X, Search } from "lucide-react";
import { COUNTRIES, MARITAL_STATUS_OPTIONS } from "@/lib/constants";
import {
  RELIGIOUS_LEVELS,
  APPEARANCE_LEVELS,
  SKIN_COLORS,
  BODY_TYPES,
  FINANCIAL_SITUATIONS,
  HOUSING_TYPES,
  CLOTHING_STYLES,
} from "@/lib/types/auth.types";

interface FilterValues {
  // Basic filters
  country?: string;
  city?: string;
  minAge?: number;
  maxAge?: number;
  maritalStatus?: string;
  education?: string;
  occupation?: string;
  religiousLevel?: string;

  // Physical appearance
  minHeight?: number;
  maxHeight?: number;
  appearance?: string;
  skinColor?: string;
  bodyType?: string;

  // Religious practice
  isPrayerRegular?: boolean;
  wantsChildren?: string;

  // Male-specific filters
  hasBeard?: boolean;
  smokes?: boolean;
  financialSituation?: string;
  housingType?: string;

  // Female-specific filters
  wearHijab?: boolean;
  wearNiqab?: boolean;
  clothingStyle?: string;
  workAfterMarriage?: string;
}

interface FilterSidebarProps {
  userGender?: "male" | "female";
  onClose?: () => void;
}

export function FilterSidebar({
  userGender = "male",
  onClose,
}: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<FilterValues>({});
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  // Initialize filters from URL params
  useEffect(() => {
    const initFilters: FilterValues = {};

    const country = searchParams.get("country");
    const city = searchParams.get("city");
    const minAge = searchParams.get("minAge");
    const maxAge = searchParams.get("maxAge");

    if (country) initFilters.country = country;
    if (city) initFilters.city = city;
    if (minAge) initFilters.minAge = Number(minAge);
    if (maxAge) initFilters.maxAge = Number(maxAge);

    const maritalStatus = searchParams.get("maritalStatus");
    if (maritalStatus) initFilters.maritalStatus = maritalStatus;

    const religiousLevel = searchParams.get("religiousLevel");
    if (religiousLevel) initFilters.religiousLevel = religiousLevel;

    const isPrayerRegular = searchParams.get("isPrayerRegular");
    if (isPrayerRegular === "true") initFilters.isPrayerRegular = true;

    setFilters(initFilters);
  }, [searchParams]);

  const handleFilterChange = (key: keyof FilterValues, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "" ? undefined : value,
    }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== "" && value !== null) {
        params.append(key, value.toString());
      }
    });

    router.push(`/dashboard/search?${params.toString()}`);
    onClose?.();
  };

  const clearFilters = () => {
    setFilters({});
    router.push("/dashboard/search");
    onClose?.();
  };

  const clearIndividualFilter = (key: keyof FilterValues) => {
    setFilters((prev) => ({ ...prev, [key]: undefined }));
  };

  // Calculate active filters count
  useEffect(() => {
    const count = Object.values(filters).filter(
      (value) => value !== undefined && value !== "" && value !== null,
    ).length;
    setActiveFiltersCount(count);
  }, [filters]);

  // Determine which gender we're searching for (opposite of user's gender)
  const searchingForGender = userGender === "male" ? "female" : "male";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary-600" />
          <h3 className="text-lg mt-2 font-semibold text-gray-900">تصفية النتائج</h3>
          {activeFiltersCount > 0 && (
            <Badge
              variant="secondary"
              className="bg-primary-100 text-primary-800"
            >
              {activeFiltersCount}
            </Badge>
          )}
        </div>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">الفلاتر النشطة:</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters).map(([key, value]) => {
              if (value === undefined || value === "" || value === null)
                return null;

              return (
                <Badge
                  key={key}
                  variant="secondary"
                  className="flex items-center gap-1 bg-primary-50 text-primary-700"
                >
                  <span className="text-xs">{getFilterLabel(key, value)}</span>
                  <button
                    onClick={() =>
                      clearIndividualFilter(key as keyof FilterValues)
                    }
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              );
            })}
          </div>
        </div>
      )}

      <div className="space-y-4 max-h-[600px] overflow-y-auto">
        {/* Basic Information */}
        <Card>
          <CardHeader className="pb-3">
            <h4 className="font-medium text-gray-900">معلومات أساسية</h4>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Age Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">العمر</label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  placeholder="من"
                  value={filters.minAge || ""}
                  onChange={(e) =>
                    handleFilterChange(
                      "minAge",
                      e.target.value ? parseInt(e.target.value) : undefined,
                    )
                  }
                  min={18}
                  max={80}
                />
                <Input
                  type="number"
                  placeholder="إلى"
                  value={filters.maxAge || ""}
                  onChange={(e) =>
                    handleFilterChange(
                      "maxAge",
                      e.target.value ? parseInt(e.target.value) : undefined,
                    )
                  }
                  min={18}
                  max={80}
                />
              </div>
            </div>

            {/* Country */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">البلد</label>
              <select
                value={filters.country || ""}
                onChange={(e) => handleFilterChange("country", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
              >
                <option value="">جميع البلدان</option>
                {COUNTRIES.map((country) => (
                  <option key={country.code} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            {/* City */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                المدينة
              </label>
              <Input
                value={filters.city || ""}
                onChange={(e) => handleFilterChange("city", e.target.value)}
                placeholder="اكتب اسم المدينة"
              />
            </div>

            {/* Marital Status */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                الحالة الاجتماعية
              </label>
              <select
                value={filters.maritalStatus || ""}
                onChange={(e) =>
                  handleFilterChange("maritalStatus", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
              >
                <option value="">جميع الحالات</option>
                {MARITAL_STATUS_OPTIONS.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Religious Information */}
        <Card>
          <CardHeader className="pb-3">
            <h4 className="font-medium text-gray-900">المعلومات الدينية</h4>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Religious Level */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                مستوى التدين
              </label>
              <select
                value={filters.religiousLevel || ""}
                onChange={(e) =>
                  handleFilterChange("religiousLevel", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
              >
                <option value="">جميع المستويات</option>
                <option value={RELIGIOUS_LEVELS.BASIC}>أساسي</option>
                <option value={RELIGIOUS_LEVELS.PRACTICING}>ممارس</option>
                <option value={RELIGIOUS_LEVELS.VERY_RELIGIOUS}>
                  متدين جداً
                </option>
              </select>
            </div>

            {/* Prayer Regularity */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                انتظام الصلاة
              </label>
              <div className="flex items-center space-x-4 space-x-reverse">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.isPrayerRegular || false}
                    onChange={(e) =>
                      handleFilterChange(
                        "isPrayerRegular",
                        e.target.checked || undefined,
                      )
                    }
                    className="ml-2"
                  />
                  <span className="text-sm">منتظم في الصلاة</span>
                </label>
              </div>
            </div>

            {/* Children Preference */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                رغبة في الأطفال
              </label>
              <select
                value={filters.wantsChildren || ""}
                onChange={(e) =>
                  handleFilterChange("wantsChildren", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
              >
                <option value="">لا يهم</option>
                <option value="yes">نعم</option>
                <option value="no">لا</option>
                <option value="maybe">ربما</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Physical Appearance */}
        <Card>
          <CardHeader className="pb-3">
            <h4 className="font-medium text-gray-900">المظهر الجسدي</h4>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Height Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                الطول (سم)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  placeholder="من"
                  value={filters.minHeight || ""}
                  onChange={(e) =>
                    handleFilterChange(
                      "minHeight",
                      e.target.value ? parseInt(e.target.value) : undefined,
                    )
                  }
                  min={140}
                  max={220}
                />
                <Input
                  type="number"
                  placeholder="إلى"
                  value={filters.maxHeight || ""}
                  onChange={(e) =>
                    handleFilterChange(
                      "maxHeight",
                      e.target.value ? parseInt(e.target.value) : undefined,
                    )
                  }
                  min={140}
                  max={220}
                />
              </div>
            </div>

            {/* Appearance */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                المظهر
              </label>
              <select
                value={filters.appearance || ""}
                onChange={(e) =>
                  handleFilterChange("appearance", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
              >
                <option value="">جميع المستويات</option>
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
              <label className="text-sm font-medium text-gray-700">
                لون البشرة
              </label>
              <select
                value={filters.skinColor || ""}
                onChange={(e) =>
                  handleFilterChange("skinColor", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
              >
                <option value="">جميع الألوان</option>
                <option value={SKIN_COLORS.FAIR}>فاتح</option>
                <option value={SKIN_COLORS.MEDIUM}>متوسط</option>
                <option value={SKIN_COLORS.OLIVE}>زيتوني</option>
                <option value={SKIN_COLORS.DARK}>داكن</option>
              </select>
            </div>

            {/* Body Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                بنية الجسم
              </label>
              <select
                value={filters.bodyType || ""}
                onChange={(e) => handleFilterChange("bodyType", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
              >
                <option value="">جميع الأنواع</option>
                <option value={BODY_TYPES.SLIM}>نحيف</option>
                <option value={BODY_TYPES.AVERAGE}>متوسط</option>
                <option value={BODY_TYPES.ATHLETIC}>رياضي</option>
                <option value={BODY_TYPES.HEAVY}>ممتلئ</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Gender-specific Filters */}
        {searchingForGender === "male" && (
          <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardHeader className="pb-3">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <span className="text-blue-500">👨</span>
                معلومات خاصة بالأخ
              </h4>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Beard */}
              <div className="bg-white p-4 rounded-lg border space-y-3">
                <label className="text-sm font-medium text-gray-700 block">
                  اللحية
                </label>
                <div className="flex flex-col space-y-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="beardPreference"
                      checked={filters.hasBeard === true}
                      onChange={(e) => handleFilterChange("hasBeard", true)}
                      className="ml-3 text-blue-600"
                    />
                    <span className="text-sm">لديه لحية</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="beardPreference"
                      checked={filters.hasBeard === undefined}
                      onChange={(e) =>
                        handleFilterChange("hasBeard", undefined)
                      }
                      className="ml-3 text-blue-600"
                    />
                    <span className="text-sm">لا يهم</span>
                  </label>
                </div>
              </div>

              {/* Smoking */}
              <div className="bg-white p-4 rounded-lg border space-y-3">
                <label className="text-sm font-medium text-gray-700 block">
                  التدخين
                </label>
                <div className="flex flex-col space-y-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="smokingPreference"
                      checked={filters.smokes === false}
                      onChange={(e) => handleFilterChange("smokes", false)}
                      className="ml-3 text-blue-600"
                    />
                    <span className="text-sm">🚭 لا يدخن</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="smokingPreference"
                      checked={filters.smokes === undefined}
                      onChange={(e) => handleFilterChange("smokes", undefined)}
                      className="ml-3 text-blue-600"
                    />
                    <span className="text-sm">لا يهم</span>
                  </label>
                </div>
              </div>

              {/* Financial Situation */}
              <div className="bg-white p-4 rounded-lg border space-y-3">
                <label className="text-sm font-medium text-gray-700 block">
                  الوضع المادي
                </label>
                <select
                  value={filters.financialSituation || ""}
                  onChange={(e) =>
                    handleFilterChange("financialSituation", e.target.value)
                  }
                  className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="">جميع المستويات</option>
                  <option value={FINANCIAL_SITUATIONS.EXCELLENT}>
                    💰 ممتاز
                  </option>
                  <option value={FINANCIAL_SITUATIONS.GOOD}>💵 جيد</option>
                  <option value={FINANCIAL_SITUATIONS.AVERAGE}>💳 متوسط</option>
                  <option value={FINANCIAL_SITUATIONS.STRUGGLING}>
                    ⚠️ صعب
                  </option>
                </select>
              </div>

              {/* Housing Type */}
              <div className="bg-white p-4 rounded-lg border space-y-3">
                <label className="text-sm font-medium text-gray-700 block">
                  نوع السكن
                </label>
                <select
                  value={filters.housingType || ""}
                  onChange={(e) =>
                    handleFilterChange("housingType", e.target.value)
                  }
                  className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="">جميع الأنواع</option>
                  <option value={HOUSING_TYPES.INDEPENDENT}>🏡 مستقل</option>
                  <option value={HOUSING_TYPES.WITH_FAMILY}>
                    👨‍👩‍👧‍👦 مع الأسرة
                  </option>
                  <option value={HOUSING_TYPES.SHARED}>👥 مشترك</option>
                </select>
              </div>
            </CardContent>
          </Card>
        )}

        {searchingForGender === "female" && (
          <Card className="border-pink-200 bg-gradient-to-r from-pink-50 to-purple-50">
            <CardHeader className="pb-3">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <span className="text-pink-500">👩</span>
                معلومات خاصة بالأخت
              </h4>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Hijab */}
              <div className="bg-white p-4 rounded-lg border space-y-3">
                <label className="text-sm font-medium text-gray-700 block">
                  الحجاب
                </label>
                <div className="flex flex-col space-y-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="hijabPreference"
                      checked={filters.wearHijab === true}
                      onChange={(e) => handleFilterChange("wearHijab", true)}
                      className="ml-3 text-pink-600"
                    />
                    <span className="text-sm">🧕 ترتدي الحجاب</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="hijabPreference"
                      checked={filters.wearHijab === undefined}
                      onChange={(e) =>
                        handleFilterChange("wearHijab", undefined)
                      }
                      className="ml-3 text-pink-600"
                    />
                    <span className="text-sm">لا يهم</span>
                  </label>
                </div>
              </div>

              {/* Niqab */}
              <div className="bg-white p-4 rounded-lg border space-y-3">
                <label className="text-sm font-medium text-gray-700 block">
                  النقاب
                </label>
                <div className="flex flex-col space-y-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="niqabPreference"
                      checked={filters.wearNiqab === true}
                      onChange={(e) => handleFilterChange("wearNiqab", true)}
                      className="ml-3 text-pink-600"
                    />
                    <span className="text-sm">👤 ترتدي النقاب</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="niqabPreference"
                      checked={filters.wearNiqab === undefined}
                      onChange={(e) =>
                        handleFilterChange("wearNiqab", undefined)
                      }
                      className="ml-3 text-pink-600"
                    />
                    <span className="text-sm">لا يهم</span>
                  </label>
                </div>
              </div>

              {/* Clothing Style */}
              <div className="bg-white p-4 rounded-lg border space-y-3">
                <label className="text-sm font-medium text-gray-700 block">
                  أسلوب الملابس
                </label>
                <select
                  value={filters.clothingStyle || ""}
                  onChange={(e) =>
                    handleFilterChange("clothingStyle", e.target.value)
                  }
                  className="w-full p-3 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white"
                >
                  <option value="">جميع الأنواع</option>
                  <option value={CLOTHING_STYLES.CONSERVATIVE}>👗 محافظ</option>
                  <option value={CLOTHING_STYLES.MODEST}>👘 محتشم</option>
                  <option value={CLOTHING_STYLES.TRADITIONAL}>🥻 تقليدي</option>
                </select>
              </div>

              {/* Work after marriage */}
              <div className="bg-white p-4 rounded-lg border space-y-3">
                <label className="text-sm font-medium text-gray-700 block">
                  العمل بعد الزواج
                </label>
                <select
                  value={filters.workAfterMarriage || ""}
                  onChange={(e) =>
                    handleFilterChange("workAfterMarriage", e.target.value)
                  }
                  className="w-full p-3 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white"
                >
                  <option value="">لا يهم</option>
                  <option value="yes">💼 تريد العمل</option>
                  <option value="no">🏠 تفضل البقاء في البيت</option>
                  <option value="undecided">🤔 لم تحدد بعد</option>
                </select>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-4">
        <Button onClick={applyFilters} className="flex-1">
          <Search className="h-4 w-4 ml-2" />
          تطبيق الفلاتر
        </Button>
        <Button
          variant="outline"
          onClick={clearFilters}
          disabled={activeFiltersCount === 0}
        >
          مسح الكل
        </Button>
      </div>
    </div>
  );
}

// Helper function to get filter label
function getFilterLabel(key: string, value: any): string {
  const labels: Record<string, string> = {
    country: `البلد: ${value}`,
    city: `المدينة: ${value}`,
    minAge: `العمر من: ${value}`,
    maxAge: `العمر إلى: ${value}`,
    maritalStatus: `الحالة: ${value}`,
    religiousLevel: `التدين: ${value}`,
    minHeight: `الطول من: ${value}`,
    maxHeight: `الطول إلى: ${value}`,
    appearance: `المظهر: ${value}`,
    skinColor: `البشرة: ${value}`,
    bodyType: `البنية: ${value}`,
    isPrayerRegular: "منتظم في الصلاة",
    wantsChildren: `يريد أطفال: ${value}`,
    hasBeard: "لديه لحية",
    smokes: value ? "يدخن" : "لا يدخن",
    financialSituation: `الوضع المادي: ${value}`,
    housingType: `السكن: ${value}`,
    wearHijab: "تلبس الحجاب",
    wearNiqab: "تلبس النقاب",
    clothingStyle: `اللبس: ${value}`,
  };

  return labels[key] || `${key}: ${value}`;
}
