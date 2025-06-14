import React from "react";
import { Input } from "@/components/ui/input";
import { RegisterRequest } from "@/lib/types/auth.types";
import {
  getOccupationsByCategory,
  getCitiesGroupedByCountry,
  getNationalitiesByGroup,
} from "@/lib/static-data";

interface Step4EducationProps {
  data: Partial<RegisterRequest>;
  updateData: (data: Partial<RegisterRequest>) => void;
  error: string | null;
  clearError: () => void;
  isSubmitting: boolean;
}

export default function Step4Education({
  data,
  updateData,
  error,
  clearError,
  isSubmitting,
}: Step4EducationProps) {
  const handleInputChange = (field: keyof RegisterRequest, value: any) => {
    clearError();
    updateData({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="المستوى التعليمي"
          value={data.education || ""}
          onChange={(e) => handleInputChange("education", e.target.value)}
          placeholder="مثال: بكالوريوس هندسة"
          disabled={isSubmitting}
          required
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            المهنة *
          </label>
          <select
            value={data.occupation || ""}
            onChange={(e) => handleInputChange("occupation", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
            disabled={isSubmitting}
            required
          >
            <option value="">اختر المهنة</option>
            {Object.entries(getOccupationsByCategory()).map(
              ([category, occupations]) => (
                <optgroup key={category} label={category}>
                  {occupations.map((occupation) => (
                    <option key={occupation.value} value={occupation.value}>
                      {occupation.label}
                    </option>
                  ))}
                </optgroup>
              ),
            )}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            المدينة *
          </label>
          <select
            value={data.city || ""}
            onChange={(e) => handleInputChange("city", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
            disabled={isSubmitting}
            required
          >
            <option value="">اختر المدينة</option>{" "}
            {data.country && getCitiesGroupedByCountry()[data.country] ? (
              getCitiesGroupedByCountry()[data.country]?.map((city) => (
                <option key={city.value} value={city.value}>
                  {city.label}
                </option>
              ))
            ) : (
              <option value="" disabled>
                اختر البلد أولاً
              </option>
            )}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            الجنسية *
          </label>
          <select
            value={data.nationality || ""}
            onChange={(e) => handleInputChange("nationality", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
            disabled={isSubmitting}
            required
          >
            <option value="">اختر الجنسية</option>
            {Object.entries(getNationalitiesByGroup()).map(
              ([group, nationalities]) => (
                <optgroup key={group} label={group}>
                  {nationalities.map((nationality) => (
                    <option key={nationality.value} value={nationality.value}>
                      {nationality.label}
                    </option>
                  ))}
                </optgroup>
              ),
            )}
          </select>
        </div>
      </div>
    </div>
  );
}
