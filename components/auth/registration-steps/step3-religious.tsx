import React from "react";
import { RegisterRequest } from "@/lib/types/auth.types";

interface Step3ReligiousProps {
  data: Partial<RegisterRequest>;
  updateData: (data: Partial<RegisterRequest>) => void;
  error: string | null;
  clearError: () => void;
  isSubmitting: boolean;
}

export default function Step3Religious({
  data,
  updateData,
  error,
  clearError,
  isSubmitting,
}: Step3ReligiousProps) {
  const handleInputChange = (field: keyof RegisterRequest, value: any) => {
    clearError();
    updateData({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            مستوى التدين *
          </label>
          <select
            value={data.religiousLevel || "practicing"}
            onChange={(e) =>
              handleInputChange("religiousLevel", e.target.value)
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
            disabled={isSubmitting}
            required
          >
            <option value="basic">أساسي</option>
            <option value="practicing">ممارس</option>
            <option value="very-religious">متدين جداً</option>
          </select>
        </div>

        <div className="space-y-3">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="prays"
              checked={data.prays ?? true}
              onChange={(e) => handleInputChange("prays", e.target.checked)}
              className="ml-2"
              disabled={isSubmitting}
            />
            <label
              htmlFor="prays"
              className="text-sm font-medium text-gray-700"
            >
              أصلي الصلوات الخمس
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="fasts"
              checked={data.fasts ?? true}
              onChange={(e) => handleInputChange("fasts", e.target.checked)}
              className="ml-2"
              disabled={isSubmitting}
            />
            <label
              htmlFor="fasts"
              className="text-sm font-medium text-gray-700"
            >
              أصوم رمضان
            </label>
          </div>

          {data.gender === "female" && (
            <div className="flex items-center">
              <input
                type="checkbox"
                id="hasHijab"
                checked={data.hasHijab ?? false}
                onChange={(e) =>
                  handleInputChange("hasHijab", e.target.checked)
                }
                className="ml-2"
                disabled={isSubmitting}
              />
              <label
                htmlFor="hasHijab"
                className="text-sm font-medium text-gray-700"
              >
                ألبس الحجاب
              </label>
            </div>
          )}

          {data.gender === "male" && (
            <div className="flex items-center">
              <input
                type="checkbox"
                id="hasBeard"
                checked={data.hasBeard ?? false}
                onChange={(e) =>
                  handleInputChange("hasBeard", e.target.checked)
                }
                className="ml-2"
                disabled={isSubmitting}
              />
              <label
                htmlFor="hasBeard"
                className="text-sm font-medium text-gray-700"
              >
                لدي لحية
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
