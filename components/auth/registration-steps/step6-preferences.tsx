import React from "react";
import { Input } from "@/components/ui/input";
import { RegisterRequest } from "@/lib/types/auth.types";
import { getCountriesByGroup } from "@/lib/static-data";

interface Step6PreferencesProps {
  data: Partial<RegisterRequest>;
  updateData: (data: Partial<RegisterRequest>) => void;
  error: string | null;
  clearError: () => void;
  isSubmitting: boolean;
}

export default function Step6Preferences({
  data,
  updateData,
  error,
  clearError,
  isSubmitting,
}: Step6PreferencesProps) {
  const handleInputChange = (field: keyof RegisterRequest, value: any) => {
    clearError();
    updateData({ [field]: value });
  };
  const handlePreferenceChange = (field: string, value: any) => {
    clearError();
    const newPreferences = {
      ageRange: { min: 18, max: 35 },
      ...data.preferences,
      [field]: value,
    };
    updateData({ preferences: newPreferences });
  };
  const handleAgeRangeChange = (field: "min" | "max", value: number) => {
    clearError();
    const currentAgeRange = data.preferences?.ageRange || { min: 18, max: 35 };
    const newPreferences = {
      ...data.preferences,
      ageRange: {
        ...currentAgeRange,
        [field]: value,
      },
    };
    updateData({ preferences: newPreferences });
  };

  const handleReligiousLevelChange = (level: string, checked: boolean) => {
    clearError();
    const currentLevels = data.preferences?.religiousLevel || [];
    const newLevels = checked
      ? [...currentLevels, level]
      : currentLevels.filter((l) => l !== level);

    handlePreferenceChange("religiousLevel", newLevels);
  };

  const handleEducationChange = (education: string, checked: boolean) => {
    clearError();
    const currentEducation = data.preferences?.education || [];
    const newEducation = checked
      ? [...currentEducation, education]
      : currentEducation.filter((e) => e !== education);

    handlePreferenceChange("education", newEducation);
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-700">
          حدد المواصفات التي تفضلها في شريك الحياة. هذه المعلومات تساعد في
          العثور على مطابقات أفضل.
        </p>
      </div>

      <div className="space-y-6">
        {/* Age Range */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            الفئة العمرية المفضلة *
          </label>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="من"
              type="number"
              value={data.preferences?.ageRange?.min || 18}
              onChange={(e) =>
                handleAgeRangeChange("min", parseInt(e.target.value))
              }
              placeholder="18"
              min="18"
              max="80"
              disabled={isSubmitting}
              required
            />
            <Input
              label="إلى"
              type="number"
              value={data.preferences?.ageRange?.max || 35}
              onChange={(e) =>
                handleAgeRangeChange("max", parseInt(e.target.value))
              }
              placeholder="35"
              min="18"
              max="80"
              disabled={isSubmitting}
              required
            />
          </div>
        </div>

        {/* Preferred Country */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            البلد المفضل (اختياري)
          </label>
          <select
            value={data.preferences?.country || ""}
            onChange={(e) => handlePreferenceChange("country", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
            disabled={isSubmitting}
          >
            <option value="">أي بلد</option>
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

        {/* Religious Level Preferences */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            مستوى التدين المفضل
          </label>
          <div className="space-y-2">
            {[
              { value: "basic", label: "أساسي" },
              { value: "practicing", label: "ممارس" },
              { value: "very-religious", label: "متدين جداً" },
            ].map((level) => (
              <label key={level.value} className="flex items-center">
                <input
                  type="checkbox"
                  checked={(data.preferences?.religiousLevel || []).includes(
                    level.value,
                  )}
                  onChange={(e) =>
                    handleReligiousLevelChange(level.value, e.target.checked)
                  }
                  className="ml-2"
                  disabled={isSubmitting}
                />
                {level.label}
              </label>
            ))}
          </div>
        </div>

        {/* Education Preferences */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            المستوى التعليمي المفضل (اختياري)
          </label>
          <div className="space-y-2">
            {["ثانوية عامة", "دبلوم", "بكالوريوس", "ماجستير", "دكتوراه"].map(
              (edu) => (
                <label key={edu} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={(data.preferences?.education || []).includes(edu)}
                    onChange={(e) =>
                      handleEducationChange(edu, e.target.checked)
                    }
                    className="ml-2"
                    disabled={isSubmitting}
                  />
                  {edu}
                </label>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
