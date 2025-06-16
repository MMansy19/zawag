"use client";

import React, { Suspense, useState, useEffect } from "react";
import { FilterSidebar } from "@/components/search/filter-sidebar";
import { ProfileCard } from "@/components/search/profile-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Filter, Search, Users, Heart } from "lucide-react";
import { Profile, MaleProfile, FemaleProfile } from "@/lib/types/auth.types";

// Mock user data - in real app, get from auth context
const mockCurrentUser = {
  id: "current-user",
  gender: "male" as const,
};

const { staticMaleProfiles, staticFemaleProfiles } = await import(
  "@/lib/static-data/search-profiles"
);

function SearchPageContent() {
  const [showFilters, setShowFilters] = useState(false);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);

  // Mock profile data - replace with API call
  const mockProfiles: Profile[] = [
    ...staticMaleProfiles,
    ...staticFemaleProfiles,
  ];
  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      // Filter profiles based on current user's gender (show opposite gender)
      const filteredProfiles = mockProfiles.filter(
        (profile) => profile.gender === mockCurrentUser.gender,
      );
      setProfiles(filteredProfiles);
      setTotalResults(filteredProfiles.length);
      setLoading(false);
    }, 1000);
  }, []);
  const handleSendRequest = async (
    profileId: string,
    message: string,
  ): Promise<void> => {
    // Mock API call
    console.log("Sending request to:", profileId, "Message:", message);
    // In real app, call API to send request
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            البحث عن شريك الحياة
          </h1>
          <p className="text-gray-600">
            استخدم الفلاتر للعثور على الشريك المناسب وفقاً لمعاييرك
          </p>
        </div>

        {/* Search Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-primary-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{totalResults}</p>
              <p className="text-sm text-gray-600">إجمالي النتائج</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-600">طلبات مرسلة</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Search className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">5</p>
              <p className="text-sm text-gray-600">مشاهدات اليوم</p>
            </CardContent>
          </Card>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-6">
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="w-full"
          >
            <Filter className="h-4 w-4 ml-2" />
            {showFilters ? "إخفاء الفلاتر" : "إظهار الفلاتر"}
          </Button>
        </div>

        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-6">
              <FilterSidebar userGender={mockCurrentUser.gender} />
            </div>
          </div>

          {/* Mobile Filter Overlay */}
          {showFilters && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
              <div className="bg-white h-full w-80 overflow-y-auto p-6">
                <FilterSidebar
                  userGender={mockCurrentUser.gender}
                  onClose={() => setShowFilters(false)}
                />
              </div>
            </div>
          )}

          {/* Results */}
          <div className="flex-1">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>
                        <div className="h-16 w-16 bg-gray-200 rounded-full"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : profiles.length > 0 ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-gray-600">
                    تم العثور على {totalResults} نتيجة
                  </p>
                  <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                    <option>ترتيب: الأحدث أولاً</option>
                    <option>ترتيب: الأقرب جغرافياً</option>
                    <option>ترتيب: التوافق</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {profiles.map((profile) => (
                    <ProfileCard
                      key={profile.id}
                      profile={profile}
                      onSendRequest={handleSendRequest}
                      currentUserGender={mockCurrentUser.gender}
                    />
                  ))}
                </div>

              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    لا توجد نتائج
                  </h3>
                  <p className="text-gray-600 mb-4">
                    لم نجد أي ملفات شخصية تطابق معايير البحث الخاصة بك
                  </p>
                  <Button variant="outline">تعديل معايير البحث</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
