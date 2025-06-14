import React from "react";
import { Input } from "@/components/ui/input";
import { RegisterRequest } from "@/lib/types/auth.types";
import { getCountriesByGroup } from "@/lib/static-data";

interface Step2BasicInfoProps {
  data: Partial<RegisterRequest>;
  updateData: (data: Partial<RegisterRequest>) => void;
  error: string | null;
  clearError: () => void;
  isSubmitting: boolean;
}

export default function Step2BasicInfo({
  data,
  updateData,
  error,
  clearError,
  isSubmitting,
}: Step2BasicInfoProps) {
  const handleInputChange = (field: keyof RegisterRequest, value: any) => {
    clearError();
    updateData({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="الاسم الأول"
          value={data.firstName || ""}
          onChange={(e) => handleInputChange("firstName", e.target.value)}
          placeholder="أدخل اسمك الأول"
          disabled={isSubmitting}
          required
        />

        <Input
          label="اسم العائلة"
          value={data.lastName || ""}
          onChange={(e) => handleInputChange("lastName", e.target.value)}
          placeholder="أدخل اسم العائلة"
          disabled={isSubmitting}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="العمر"
          type="number"
          value={data.age || ""}
          onChange={(e) => handleInputChange("age", parseInt(e.target.value))}
          placeholder="أدخل عمرك"
          min="18"
          max="80"
          disabled={isSubmitting}
          required
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            الجنس *
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="male"
                checked={data.gender === "male"}
                onChange={(e) => handleInputChange("gender", e.target.value)}
                className="ml-2"
                disabled={isSubmitting}
              />
              ذكر
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="female"
                checked={data.gender === "female"}
                onChange={(e) => handleInputChange("gender", e.target.value)}
                className="ml-2"
                disabled={isSubmitting}
              />
              أنثى
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            البلد *
          </label>
          <select
            value={data.country || ""}
            onChange={(e) => handleInputChange("country", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
            disabled={isSubmitting}
            required
          >
            <option value="">اختر البلد</option>
            {Object.entries(getCountriesByGroup()).map(([group, countries]) => (
              <optgroup key={group} label={group}>
                {countries.map((country) => (
                  <option key={country.value} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            الحالة الزوجية *
          </label>
          <select
            value={data.maritalStatus || ""}
            onChange={(e) => handleInputChange("maritalStatus", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
            disabled={isSubmitting}
            required
          >
            <option value="">اختر الحالة الزوجية</option>
            <option value="single">أعزب/عزباء</option>
            <option value="divorced">مطلق/مطلقة</option>
            <option value="widowed">أرمل/أرملة</option>
          </select>
        </div>
      </div>
    </div>
  );
}
