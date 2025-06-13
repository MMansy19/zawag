"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { COUNTRIES, MARITAL_STATUS } from "@/lib/constants";

interface FilterValues {
  country?: string;
  city?: string;
  minAge?: number;
  maxAge?: number;
  maritalStatus?: string;
  education?: string;
  occupation?: string;
  religiousLevel?: string;
  prays?: boolean;
  fasts?: boolean;
  hijab?: boolean;
  beard?: boolean;
}

export function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [filters, setFilters] = useState<FilterValues>({
    country: searchParams.get("country") || "",
    city: searchParams.get("city") || "",
    minAge: Number(searchParams.get("minAge")) || undefined,
    maxAge: Number(searchParams.get("maxAge")) || undefined,
    maritalStatus: searchParams.get("maritalStatus") || "",
    education: searchParams.get("education") || "",
    occupation: searchParams.get("occupation") || "",
    religiousLevel: searchParams.get("religiousLevel") || "",
    prays: searchParams.get("prays") === "true" || undefined,
    fasts: searchParams.get("fasts") === "true" || undefined,
    hijab: searchParams.get("hijab") === "true" || undefined,
    beard: searchParams.get("beard") === "true" || undefined,
  });

  const handleFilterChange = (key: keyof FilterValues, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    const query = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== "" && value !== null) {
        query.set(key, String(value));
      }
    });
    
    router.push(`/dashboard/search?${query.toString()}`);
  };

  const clearFilters = () => {
    setFilters({});
    router.push("/dashboard/search");
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <h3 className="text-lg font-semibold">فلاتر البحث</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Location Filters */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">الموقع</h4>
          
          <div>
            <label className="block text-sm font-medium mb-1">البلد</label>
            <select
              value={filters.country || ""}
              onChange={(e) => handleFilterChange("country", e.target.value)}
              className="w-full border border-border rounded-md px-3 py-2 text-sm"
            >
              <option value="">جميع البلدان</option>
              {COUNTRIES.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="المدينة"
            value={filters.city || ""}
            onChange={(e) => handleFilterChange("city", e.target.value)}
            placeholder="أدخل المدينة"
          />
        </div>

        {/* Age Range */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">العمر</h4>
          <div className="grid grid-cols-2 gap-2">
            <Input
              label="من"
              type="number"
              value={filters.minAge || ""}
              onChange={(e) => handleFilterChange("minAge", e.target.value ? Number(e.target.value) : undefined)}
              placeholder="18"
              min="18"
              max="80"
            />
            <Input
              label="إلى"
              type="number"
              value={filters.maxAge || ""}
              onChange={(e) => handleFilterChange("maxAge", e.target.value ? Number(e.target.value) : undefined)}
              placeholder="80"
              min="18"
              max="80"
            />
          </div>
        </div>

        {/* Marital Status */}
        <div>
          <label className="block text-sm font-medium mb-1">الحالة الزوجية</label>
          <select
            value={filters.maritalStatus || ""}
            onChange={(e) => handleFilterChange("maritalStatus", e.target.value)}
            className="w-full border border-border rounded-md px-3 py-2 text-sm"
          >
            <option value="">جميع الحالات</option>
            {MARITAL_STATUS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Education & Work */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">التعليم والعمل</h4>
          
          <Input
            label="التعليم"
            value={filters.education || ""}
            onChange={(e) => handleFilterChange("education", e.target.value)}
            placeholder="مثل: بكالوريوس، ماجستير"
          />
          
          <Input
            label="المهنة"
            value={filters.occupation || ""}
            onChange={(e) => handleFilterChange("occupation", e.target.value)}
            placeholder="مثل: طبيب، مهندس"
          />
        </div>

        {/* Religious Filters */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">المعلومات الدينية</h4>
          
          <div>
            <label className="block text-sm font-medium mb-1">مستوى التدين</label>
            <select
              value={filters.religiousLevel || ""}
              onChange={(e) => handleFilterChange("religiousLevel", e.target.value)}
              className="w-full border border-border rounded-md px-3 py-2 text-sm"
            >
              <option value="">جميع المستويات</option>
              <option value="practicing">ملتزم</option>
              <option value="moderate">متوسط</option>
              <option value="learning">يتعلم</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.prays || false}
                onChange={(e) => handleFilterChange("prays", e.target.checked || undefined)}
                className="ml-2"
              />
              <span className="text-sm">يصلي بانتظام</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.fasts || false}
                onChange={(e) => handleFilterChange("fasts", e.target.checked || undefined)}
                className="ml-2"
              />
              <span className="text-sm">يصوم</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.hijab || false}
                onChange={(e) => handleFilterChange("hijab", e.target.checked || undefined)}
                className="ml-2"
              />
              <span className="text-sm">ترتدي الحجاب</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.beard || false}
                onChange={(e) => handleFilterChange("beard", e.target.checked || undefined)}
                className="ml-2"
              />
              <span className="text-sm">يربي لحية</span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-4">
          <Button onClick={applyFilters} className="w-full">
            تطبيق الفلاتر
          </Button>
          <Button onClick={clearFilters} variant="outline" className="w-full">
            مسح الفلاتر
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
