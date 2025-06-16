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
  // Basic demographic filters
  country?: string;
  city?: string;
  minAge?: number;
  maxAge?: number;
  maritalStatus?: "single" | "divorced" | "widowed";
  nationality?: string;

  // Education and career
  education?: string;
  educationLevel?:
    | "high school"
    | "associate"
    | "bachelor"
    | "master"
    | "doctorate"
    | "other";
  occupation?: string;
  fieldOfStudy?: string;

  // Physical appearance
  minHeight?: number;
  maxHeight?: number;
  appearance?: "very_handsome" | "handsome" | "average" | "below_average";
  skinColor?: "very_fair" | "fair" | "medium" | "olive" | "dark";
  bodyType?: "slim" | "athletic" | "average" | "heavy" | "muscular";

  // Religious practice (common)
  religiousLevel?: "basic" | "practicing" | "very-religious" | "moderate";
  isPrayerRegular?: boolean;

  // Family and children
  wantsChildren?: "yes" | "no" | "undecided";
  childrenDesired?: "2-3" | "4-5" | "many" | "allah-will";

  // Male-specific filters (when searching for males)
  hasBeard?: boolean;
  prayingLocation?: "mosque" | "home" | "both";
  isRegularAtMosque?: boolean;
  smokes?: boolean;
  financialSituation?: "excellent" | "good" | "average" | "struggling";
  housingOwnership?: "owned" | "rented" | "family-owned";
  housingType?: "independent" | "with-family" | "shared";
  providerView?: "sole provider" | "shared responsibility" | "flexible";
  householdChores?: "willing" | "not willing" | "depends";
  monthlyIncomeMin?: number;
  monthlyIncomeMax?: number;

  // Female-specific filters (when searching for females)
  wearHijab?: boolean;
  wearNiqab?: boolean;
  clothingStyle?:
    | "niqab-full"
    | "niqab-hands"
    | "khimar"
    | "tarha-loose"
    | "tarha-fitted"
    | "hijab-conservative"
    | "hijab-modest"
    | "hijab-modern"
    | "loose-covering"
    | "modest-covering";
  mahramAvailable?: boolean;
  workAfterMarriage?: "yes" | "no" | "undecided";
  childcarePreference?: "self" | "family" | "nanny" | "daycare";
  guardianRelationship?: "father" | "brother" | "uncle" | "other";
}

interface FilterSidebarProps {
  userGender?: "male" | "female";
  onClose?: () => void;
  isMobile?: boolean;
}

export function FilterSidebar({
  userGender = "male",
  onClose,
  isMobile = false,
}: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<FilterValues>({});
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  // Determine which gender we're searching for (opposite of user's gender)
  const searchingForGender = userGender === "male" ? "female" : "male";

  // Initialize filters from URL params
  useEffect(() => {
    const initFilters: FilterValues = {};

    searchParams.forEach((value, key) => {
      if (
        key === "minAge" ||
        key === "maxAge" ||
        key === "minHeight" ||
        key === "maxHeight" ||
        key === "monthlyIncomeMin" ||
        key === "monthlyIncomeMax"
      ) {
        (initFilters as any)[key] = Number(value);
      } else if (
        key === "isPrayerRegular" ||
        key === "hasBeard" ||
        key === "smokes" ||
        key === "wearHijab" ||
        key === "wearNiqab" ||
        key === "isRegularAtMosque" ||
        key === "mahramAvailable"
      ) {
        (initFilters as any)[key] = value === "true";
      } else {
        (initFilters as any)[key] = value;
      }
    });

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

  // Mobile-first responsive wrapper
  const wrapperClass = isMobile
    ? "fixed inset-0 z-50 bg-white overflow-y-auto"
    : "bg-white rounded-lg shadow-sm border sticky top-6";

  return (
    <div className={wrapperClass}>
      {/* Mobile Header */}
      {isMobile && (
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Filter className="h-5 w-5 text-primary-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                تصفية النتائج
              </h3>
              {activeFiltersCount > 0 && (
                <Badge
                  variant="secondary"
                  className="bg-primary-100 text-primary-800"
                >
                  {activeFiltersCount}
                </Badge>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <div className={`space-y-6 ${isMobile ? "p-4 pt-0" : "p-6"}`}>
        {/* Desktop Header */}
        {!isMobile && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Filter className="h-5 w-5 text-primary-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                تصفية النتائج
              </h3>
              {activeFiltersCount > 0 && (
                <Badge
                  variant="secondary"
                  className="bg-primary-100 text-primary-800"
                >
                  {activeFiltersCount}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700">الفلاتر النشطة:</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(filters).map(([key, value]) => {
                if (value === undefined || value === "" || value === null)
                  return null;

                const displayValue =
                  typeof value === "boolean"
                    ? value
                      ? "نعم"
                      : "لا"
                    : value.toString();
                const displayKey = getFilterDisplayName(key);

                return (
                  <Badge
                    key={key}
                    variant="outline"
                    className="flex items-center gap-1 cursor-pointer hover:bg-red-50"
                    onClick={() =>
                      clearIndividualFilter(key as keyof FilterValues)
                    }
                  >
                    {displayKey}: {displayValue}
                    <X className="h-3 w-3" />
                  </Badge>
                );
              })}
            </div>
          </div>
        )}

        {/* Basic Demographics */}
        <Card className="border-2 border-blue-100">
          <CardHeader className="pb-3">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              المعلومات الأساسية
            </h4>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Age Range */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  العمر من
                </label>
                <Input
                  type="number"
                  placeholder="18"
                  value={filters.minAge || ""}
                  onChange={(e) =>
                    handleFilterChange(
                      "minAge",
                      Number(e.target.value) || undefined,
                    )
                  }
                  className="text-center"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  إلى
                </label>
                <Input
                  type="number"
                  placeholder="50"
                  value={filters.maxAge || ""}
                  onChange={(e) =>
                    handleFilterChange(
                      "maxAge",
                      Number(e.target.value) || undefined,
                    )
                  }
                  className="text-center"
                />
              </div>
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                البلد
              </label>
              <select
                value={filters.country || ""}
                onChange={(e) => handleFilterChange("country", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">جميع البلدان</option>
                {COUNTRIES.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                المدينة
              </label>
              <Input
                placeholder="أدخل المدينة"
                value={filters.city || ""}
                onChange={(e) => handleFilterChange("city", e.target.value)}
              />
            </div>

            {/* Marital Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الحالة الزوجية
              </label>
              <select
                value={filters.maritalStatus || ""}
                onChange={(e) =>
                  handleFilterChange("maritalStatus", e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">جميع الحالات</option>
                <option value="single">أعزب/عزباء</option>
                <option value="divorced">مطلق/مطلقة</option>
                <option value="widowed">أرمل/أرملة</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Education & Career */}
        <Card className="border-2 border-green-100">
          <CardHeader className="pb-3">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              التعليم والمهنة
            </h4>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Education Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                المستوى التعليمي
              </label>
              <select
                value={filters.educationLevel || ""}
                onChange={(e) =>
                  handleFilterChange("educationLevel", e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">جميع المستويات</option>
                <option value="high school">ثانوية عامة</option>
                <option value="associate">دبلوم</option>
                <option value="bachelor">بكالوريوس</option>
                <option value="master">ماجستير</option>
                <option value="doctorate">دكتوراه</option>
                <option value="other">أخرى</option>
              </select>
            </div>

            {/* Occupation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                المهنة
              </label>
              <Input
                placeholder="أدخل المهنة"
                value={filters.occupation || ""}
                onChange={(e) =>
                  handleFilterChange("occupation", e.target.value)
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Physical Appearance */}
        <Card className="border-2 border-purple-100">
          <CardHeader className="pb-3">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              المظهر الجسدي
            </h4>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Height Range */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الطول من (سم)
                </label>
                <Input
                  type="number"
                  placeholder="150"
                  value={filters.minHeight || ""}
                  onChange={(e) =>
                    handleFilterChange(
                      "minHeight",
                      Number(e.target.value) || undefined,
                    )
                  }
                  className="text-center"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  إلى (سم)
                </label>
                <Input
                  type="number"
                  placeholder="190"
                  value={filters.maxHeight || ""}
                  onChange={(e) =>
                    handleFilterChange(
                      "maxHeight",
                      Number(e.target.value) || undefined,
                    )
                  }
                  className="text-center"
                />
              </div>
            </div>

            {/* Skin Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                لون البشرة
              </label>
              <select
                value={filters.skinColor || ""}
                onChange={(e) =>
                  handleFilterChange("skinColor", e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="">جميع الألوان</option>
                <option value="very_fair">فاتح جداً</option>
                <option value="fair">فاتح</option>
                <option value="medium">متوسط</option>
                <option value="olive">حنطي</option>
                <option value="dark">داكن</option>
              </select>
            </div>

            {/* Body Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                البنية الجسدية
              </label>
              <select
                value={filters.bodyType || ""}
                onChange={(e) => handleFilterChange("bodyType", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="">جميع الأنواع</option>
                <option value="slim">نحيف</option>
                <option value="athletic">رياضي</option>
                <option value="average">متوسط</option>
                <option value="heavy">ثقيل</option>
                <option value="muscular">عضلي</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Religious Practice */}
        <Card className="border-2 border-yellow-100">
          <CardHeader className="pb-3">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              الممارسة الدينية
            </h4>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Religious Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                مستوى التدين
              </label>
              <select
                value={filters.religiousLevel || ""}
                onChange={(e) =>
                  handleFilterChange("religiousLevel", e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              >
                <option value="">جميع المستويات</option>
                <option value="basic">أساسي</option>
                <option value="practicing">ممارس</option>
                <option value="very-religious">متدين جداً</option>
                <option value="moderate">معتدل</option>
              </select>
            </div>

            {/* Prayer Regularity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                انتظام الصلاة
              </label>
              <div className="flex gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="isPrayerRegular"
                    checked={filters.isPrayerRegular === true}
                    onChange={() => handleFilterChange("isPrayerRegular", true)}
                    className="text-yellow-500"
                  />
                  <span className="text-sm">منتظم</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="isPrayerRegular"
                    checked={filters.isPrayerRegular === false}
                    onChange={() =>
                      handleFilterChange("isPrayerRegular", false)
                    }
                    className="text-yellow-500"
                  />
                  <span className="text-sm">غير منتظم</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="isPrayerRegular"
                    checked={filters.isPrayerRegular === undefined}
                    onChange={() =>
                      handleFilterChange("isPrayerRegular", undefined)
                    }
                    className="text-yellow-500"
                  />
                  <span className="text-sm">غير محدد</span>
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gender-Specific Filters for Males */}
        {searchingForGender === "male" && (
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardHeader className="pb-3">
              <h4 className="font-semibold text-blue-900 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                معايير خاصة بالأخوة
              </h4>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Beard */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  اللحية
                </label>
                <div className="flex gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="hasBeard"
                      checked={filters.hasBeard === true}
                      onChange={() => handleFilterChange("hasBeard", true)}
                      className="text-blue-500"
                    />
                    <span className="text-sm">يرتدي لحية</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="hasBeard"
                      checked={filters.hasBeard === false}
                      onChange={() => handleFilterChange("hasBeard", false)}
                      className="text-blue-500"
                    />
                    <span className="text-sm">بدون لحية</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="hasBeard"
                      checked={filters.hasBeard === undefined}
                      onChange={() => handleFilterChange("hasBeard", undefined)}
                      className="text-blue-500"
                    />
                    <span className="text-sm">غير محدد</span>
                  </label>
                </div>
              </div>

              {/* Smoking */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  التدخين
                </label>
                <div className="flex gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="smokes"
                      checked={filters.smokes === false}
                      onChange={() => handleFilterChange("smokes", false)}
                      className="text-blue-500"
                    />
                    <span className="text-sm">لا يدخن</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="smokes"
                      checked={filters.smokes === true}
                      onChange={() => handleFilterChange("smokes", true)}
                      className="text-blue-500"
                    />
                    <span className="text-sm">يدخن</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="smokes"
                      checked={filters.smokes === undefined}
                      onChange={() => handleFilterChange("smokes", undefined)}
                      className="text-blue-500"
                    />
                    <span className="text-sm">غير محدد</span>
                  </label>
                </div>
              </div>

              {/* Financial Situation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الوضع المادي
                </label>
                <select
                  value={filters.financialSituation || ""}
                  onChange={(e) =>
                    handleFilterChange("financialSituation", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">جميع الأوضاع</option>
                  <option value="excellent">ممتاز</option>
                  <option value="good">جيد</option>
                  <option value="average">متوسط</option>
                  <option value="struggling">صعب</option>
                </select>
              </div>

              {/* Housing Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  نوع السكن
                </label>
                <select
                  value={filters.housingType || ""}
                  onChange={(e) =>
                    handleFilterChange("housingType", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">جميع الأنواع</option>
                  <option value="independent">مستقل</option>
                  <option value="with-family">مع العائلة</option>
                  <option value="shared">مشترك</option>
                </select>
              </div>

              {/* Monthly Income Range */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الدخل من (ريال)
                  </label>
                  <Input
                    type="number"
                    placeholder="3000"
                    value={filters.monthlyIncomeMin || ""}
                    onChange={(e) =>
                      handleFilterChange(
                        "monthlyIncomeMin",
                        Number(e.target.value) || undefined,
                      )
                    }
                    className="text-center"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    إلى (ريال)
                  </label>
                  <Input
                    type="number"
                    placeholder="15000"
                    value={filters.monthlyIncomeMax || ""}
                    onChange={(e) =>
                      handleFilterChange(
                        "monthlyIncomeMax",
                        Number(e.target.value) || undefined,
                      )
                    }
                    className="text-center"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Gender-Specific Filters for Females */}
        {searchingForGender === "female" && (
          <Card className="border-2 border-pink-200 bg-pink-50">
            <CardHeader className="pb-3">
              <h4 className="font-semibold text-pink-900 flex items-center gap-2">
                <span className="w-2 h-2 bg-pink-600 rounded-full"></span>
                معايير خاصة بالأخوات
              </h4>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Hijab */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  الحجاب
                </label>
                <div className="flex gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="wearHijab"
                      checked={filters.wearHijab === true}
                      onChange={() => handleFilterChange("wearHijab", true)}
                      className="text-pink-500"
                    />
                    <span className="text-sm">ترتدي حجاب</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="wearHijab"
                      checked={filters.wearHijab === false}
                      onChange={() => handleFilterChange("wearHijab", false)}
                      className="text-pink-500"
                    />
                    <span className="text-sm">بدون حجاب</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="wearHijab"
                      checked={filters.wearHijab === undefined}
                      onChange={() =>
                        handleFilterChange("wearHijab", undefined)
                      }
                      className="text-pink-500"
                    />
                    <span className="text-sm">غير محدد</span>
                  </label>
                </div>
              </div>

              {/* Niqab */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  النقاب
                </label>
                <div className="flex gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="wearNiqab"
                      checked={filters.wearNiqab === true}
                      onChange={() => handleFilterChange("wearNiqab", true)}
                      className="text-pink-500"
                    />
                    <span className="text-sm">ترتدي نقاب</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="wearNiqab"
                      checked={filters.wearNiqab === false}
                      onChange={() => handleFilterChange("wearNiqab", false)}
                      className="text-pink-500"
                    />
                    <span className="text-sm">بدون نقاب</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="wearNiqab"
                      checked={filters.wearNiqab === undefined}
                      onChange={() =>
                        handleFilterChange("wearNiqab", undefined)
                      }
                      className="text-pink-500"
                    />
                    <span className="text-sm">غير محدد</span>
                  </label>
                </div>
              </div>

              {/* Clothing Style */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  نمط اللباس
                </label>
                <select
                  value={filters.clothingStyle || ""}
                  onChange={(e) =>
                    handleFilterChange("clothingStyle", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="">جميع الأنماط</option>
                  <option value={CLOTHING_STYLES.NIQAB_FULL}>
                    نقاب كامل - تغطية الوجه والكفين
                  </option>
                  <option value={CLOTHING_STYLES.NIQAB_HANDS}>
                    نقاب مع كشف الكفين فقط
                  </option>
                  <option value={CLOTHING_STYLES.KHIMAR}>
                    خمار - غطاء رأس طويل يغطي الصدر مع ملابس واسعة
                  </option>
                  <option value={CLOTHING_STYLES.TARHA_LOOSE}>
                    غطاء رأس مع ملابس واسعة وطويلة
                  </option>
                  <option value={CLOTHING_STYLES.HIJAB_CONSERVATIVE}>
                    حجاب مع ملابس واسعة لا تُظهر تفاصيل الجسم
                  </option>
                  <option value={CLOTHING_STYLES.HIJAB_MODEST}>
                    حجاب مع ملابس مناسبة الحجم وليست ضيقة
                  </option>
                  <option value={CLOTHING_STYLES.TARHA_FITTED}>
                    غطاء رأس مع ملابس مناسبة الحجم
                  </option>
                  <option value={CLOTHING_STYLES.HIJAB_MODERN}>
                    حجاب مع ملابس عصرية قد تُظهر شكل الجسم
                  </option>
                  <option value={CLOTHING_STYLES.LOOSE_COVERING}>
                    ملابس واسعة وطويلة بدون غطاء رأس
                  </option>
                  <option value={CLOTHING_STYLES.MODEST_COVERING}>
                    ملابس عادية تُظهر الذراعين أو جزء من الساقين
                  </option>
                </select>
              </div>

              {/* Work After Marriage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  العمل بعد الزواج
                </label>
                <select
                  value={filters.workAfterMarriage || ""}
                  onChange={(e) =>
                    handleFilterChange("workAfterMarriage", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="">جميع الخيارات</option>
                  <option value="yes">ترغب في العمل</option>
                  <option value="no">لا ترغب في العمل</option>
                  <option value="undecided">غير محددة</option>
                </select>
              </div>

              {/* Mahram Availability */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  توفر المحرم
                </label>
                <div className="flex gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="mahramAvailable"
                      checked={filters.mahramAvailable === true}
                      onChange={() =>
                        handleFilterChange("mahramAvailable", true)
                      }
                      className="text-pink-500"
                    />
                    <span className="text-sm">متوفر</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="mahramAvailable"
                      checked={filters.mahramAvailable === false}
                      onChange={() =>
                        handleFilterChange("mahramAvailable", false)
                      }
                      className="text-pink-500"
                    />
                    <span className="text-sm">غير متوفر</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="mahramAvailable"
                      checked={filters.mahramAvailable === undefined}
                      onChange={() =>
                        handleFilterChange("mahramAvailable", undefined)
                      }
                      className="text-pink-500"
                    />
                    <span className="text-sm">غير محدد</span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div
          className={`flex gap-3 ${isMobile ? "sticky bottom-0 bg-white p-4 border-t border-gray-200 -mx-4" : ""}`}
        >
          <Button onClick={clearFilters} variant="outline" className="flex-1">
            مسح الكل
          </Button>
          <Button onClick={applyFilters} className="flex-1">
            تطبيق الفلاتر ({activeFiltersCount})
          </Button>
        </div>
      </div>
    </div>
  );
}

// Helper function to get display names for filters
function getFilterDisplayName(key: string): string {
  const displayNames: Record<string, string> = {
    country: "البلد",
    city: "المدينة",
    minAge: "العمر الأدنى",
    maxAge: "العمر الأقصى",
    maritalStatus: "الحالة الزوجية",
    education: "التعليم",
    occupation: "المهنة",
    religiousLevel: "مستوى التدين",
    isPrayerRegular: "انتظام الصلاة",
    hasBeard: "اللحية",
    smokes: "التدخين",
    financialSituation: "الوضع المادي",
    housingType: "نوع السكن",
    wearHijab: "الحجاب",
    wearNiqab: "النقاب",
    clothingStyle: "نمط اللباس",
    workAfterMarriage: "العمل بعد الزواج",
    mahramAvailable: "توفر المحرم",
    skinColor: "لون البشرة",
    bodyType: "البنية الجسدية",
    minHeight: "الطول الأدنى",
    maxHeight: "الطول الأقصى",
  };

  return displayNames[key] || key;
}
