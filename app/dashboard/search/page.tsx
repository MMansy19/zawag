"use client";

import React, { Suspense, useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { FilterSidebar } from "@/components/search/filter-sidebar";
import { ProfileCard } from "@/components/search/profile-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Filter,
  Search,
  Users,
  Heart,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { Profile, MaleProfile, FemaleProfile } from "@/lib/types/auth.types";
import { Badge } from "@/components/ui/badge";

// Mock user data - in real app, get from auth context
const mockCurrentUser = {
  id: "current-user",
  gender: "male" as const,
};

const { staticMaleProfiles, staticFemaleProfiles } = await import(
  "@/lib/static-data/search-profiles"
);

interface FilterValues {
  country?: string;
  city?: string;
  minAge?: number;
  maxAge?: number;
  maritalStatus?: string;
  education?: string;
  occupation?: string;
  religiousLevel?: string;
  minHeight?: number;
  maxHeight?: number;
  appearance?: string;
  skinColor?: string;
  bodyType?: string;
  isPrayerRegular?: boolean;
  wantsChildren?: string;
  hasBeard?: boolean;
  smokes?: boolean;
  financialSituation?: string;
  housingType?: string;
  wearHijab?: boolean;
  wearNiqab?: boolean;
  clothingStyle?: string;
  workAfterMarriage?: string;
}

// Filter function
function filterProfiles(profiles: Profile[], filters: FilterValues): Profile[] {
  return profiles.filter((profile) => {
    // Basic filters
    if (filters.country && profile.country !== filters.country) return false;
    if (filters.city && profile.city !== filters.city) return false;
    if (filters.minAge && profile.age < filters.minAge) return false;
    if (filters.maxAge && profile.age > filters.maxAge) return false;
    if (
      filters.maritalStatus &&
      profile.maritalStatus !== filters.maritalStatus
    )
      return false;
    if (filters.education && profile.education !== filters.education)
      return false;
    if (filters.occupation && profile.occupation !== filters.occupation)
      return false;
    if (
      filters.religiousLevel &&
      profile.religiousLevel !== filters.religiousLevel
    )
      return false;

    // Physical appearance filters
    if (
      filters.minHeight &&
      profile.  height &&
      profile.height < filters.minHeight
    )
      return false;
    if (
      filters.maxHeight &&
      profile.height &&
      profile.height > filters.maxHeight
    )
      return false;
    if (filters.appearance && profile.appearance !== filters.appearance)
      return false;
    if (filters.skinColor && profile.skinColor !== filters.skinColor)
      return false;
    if (filters.bodyType && profile.bodyType !== filters.bodyType) return false;

    // Religious practice filters
    if (
      filters.isPrayerRegular !== undefined &&
      profile.isPrayerRegular !== filters.isPrayerRegular
    )
      return false;
    if (
      filters.wantsChildren &&
      profile.wantsChildren !== filters.wantsChildren
    )
      return false;

    // Gender-specific filters
    if (profile.gender === "male") {
      const maleProfile = profile as MaleProfile;
      if (
        filters.hasBeard !== undefined &&
        maleProfile.hasBeard !== filters.hasBeard
      )
        return false;
      if (filters.smokes !== undefined && maleProfile.smokes !== filters.smokes)
        return false;
      if (
        filters.financialSituation &&
        maleProfile.financialSituation !== filters.financialSituation
      )
        return false;
      if (
        filters.housingType &&
        maleProfile.housingType !== filters.housingType
      )
        return false;
    }

    if (profile.gender === "female") {
      const femaleProfile = profile as FemaleProfile;
      if (
        filters.wearHijab !== undefined &&
        femaleProfile.wearHijab !== filters.wearHijab
      )
        return false;
      if (
        filters.wearNiqab !== undefined &&
        femaleProfile.wearNiqab !== filters.wearNiqab
      )
        return false;
      if (
        filters.clothingStyle &&
        femaleProfile.clothingStyle !== filters.clothingStyle
      )
        return false;
      if (
        filters.workAfterMarriage &&
        femaleProfile.workAfterMarriage !== filters.workAfterMarriage
      )
        return false;
    }

    return true;
  });
}

// Loading skeleton component
function ProfileCardSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 space-y-2">
            <div className="h-6 bg-gray-200 rounded w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
          <div className="h-16 w-16 bg-gray-200 rounded-full flex-shrink-0"></div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex gap-2">
            <div className="h-6 bg-gray-200 rounded-full w-16"></div>
            <div className="h-6 bg-gray-200 rounded-full w-20"></div>
            <div className="h-6 bg-gray-200 rounded-full w-14"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-4/5"></div>
        </div>

        <div className="flex gap-2">
          <div className="h-10 bg-gray-200 rounded flex-1"></div>
          <div className="h-10 bg-gray-200 rounded w-10"></div>
        </div>
      </CardContent>
    </Card>
  );
}

function SearchPageContent() {
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Parse filters from URL
  const filters: FilterValues = useMemo(() => {
    const parsedFilters: Partial<FilterValues> = {};

    searchParams.forEach((value, key) => {
      if (
        key === "minAge" ||
        key === "maxAge" ||
        key === "minHeight" ||
        key === "maxHeight"
      ) {
        (parsedFilters as any)[key] = Number(value);
      } else if (
        key === "isPrayerRegular" ||
        key === "hasBeard" ||
        key === "smokes" ||
        key === "wearHijab" ||
        key === "wearNiqab"
      ) {
        (parsedFilters as any)[key] = value === "true";
      } else {
        (parsedFilters as any)[key] = value;
      }
    });

    return parsedFilters as FilterValues;
  }, [searchParams]);

  // Mock profile data - replace with API call
  const allProfiles: Profile[] = useMemo(
    () =>
      mockCurrentUser.gender === "male"
        ? staticFemaleProfiles.map((profile) => ({
            ...profile,
            isFavorite: false,
          }))
        : staticMaleProfiles.map((profile) => ({
            ...profile,
            isFavorite: false,
          })),
    [],
  );

  // Apply filters to profiles
  const filteredProfiles = useMemo(() => {
    return filterProfiles(allProfiles, filters);
  }, [allProfiles, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredProfiles.length / itemsPerPage);
  const paginatedProfiles = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProfiles.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProfiles, currentPage]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setProfiles(paginatedProfiles);
      setLoading(false);
    }, 500);
  }, [paginatedProfiles]);
  const handleSendRequest = async (
    profileId: string,
    message: string,
  ): Promise<void> => {
    // Mock API call
    console.log("Sending request to:", profileId, "Message:", message);
    // In real app, call API to send request
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            البحث عن شريك الحياة
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            استخدم الفلاتر للعثور على الشريك المناسب وفقاً لمعاييرك
          </p>
        </div>

        {/* Search Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
          <Card>
            <CardContent className="p-3 md:p-4 text-center">
              <Users className="h-6 w-6 md:h-8 md:w-8 text-primary-600 mx-auto mb-2" />
              <p className="text-xl md:text-2xl font-bold text-gray-900">
                {filteredProfiles.length}
              </p>
              <p className="text-xs md:text-sm text-gray-600">إجمالي النتائج</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 md:p-4 text-center">
              <Heart className="h-6 w-6 md:h-8 md:w-8 text-red-500 mx-auto mb-2" />
              <p className="text-xl md:text-2xl font-bold text-gray-900">12</p>
              <p className="text-xs md:text-sm text-gray-600">طلبات مرسلة</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 md:p-4 text-center">
              <Search className="h-6 w-6 md:h-8 md:w-8 text-green-500 mx-auto mb-2" />
              <p className="text-xl md:text-2xl font-bold text-gray-900">5</p>
              <p className="text-xs md:text-sm text-gray-600">مشاهدات اليوم</p>
            </CardContent>
          </Card>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4 md:mb-6">
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 py-3 text-base font-medium shadow-sm"
          >
            <Filter className="h-5 w-5" />
            {showFilters ? "إخفاء الفلاتر" : "إظهار الفلاتر"}
            {Object.keys(filters).length > 0 && (
              <Badge
                variant="secondary"
                className="ml-2 bg-primary-100 text-primary-800"
              >
                {Object.keys(filters).length}
              </Badge>
            )}
          </Button>
        </div>

        <div className="flex gap-4 md:gap-6">
          {/* Desktop Sidebar - Enhanced Sticky */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <FilterSidebar userGender={mockCurrentUser.gender} />
            </div>
          </div>

          {/* Mobile Filter Overlay - Full Screen */}
          {showFilters && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
              {/* Full screen overlay */}
              <div className="absolute inset-0 bg-white overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b bg-white shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-900">
                    تصفية النتائج
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFilters(false)}
                    className="h-10 w-10 p-0"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Filter Content - Scrollable */}
                <div className="flex-1 overflow-y-auto">
                  <div className="p-4">
                    <FilterSidebar
                      userGender={mockCurrentUser.gender}
                      onClose={() => setShowFilters(false)}
                      isMobile={true}
                    />
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="p-4 border-t bg-white shadow-lg">
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        // Clear filters logic
                        const url = new URL(window.location.href);
                        url.search = "";
                        window.history.pushState({}, "", url.toString());
                        window.location.reload();
                      }}
                      className="flex-1"
                    >
                      مسح الكل
                    </Button>
                    <Button
                      onClick={() => setShowFilters(false)}
                      className="flex-1"
                    >
                      عرض النتائج ({filteredProfiles.length})
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <ProfileCardSkeleton key={i} />
                  ))}
                </div>
              </div>
            ) : filteredProfiles.length > 0 ? (
              <div className="space-y-4 md:space-y-6">
                {/* Results Header - Mobile Optimized */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <p className="text-gray-600 text-sm md:text-base">
                      تم العثور على {filteredProfiles.length} نتيجة
                    </p>
                    {currentPage > 1 && (
                      <p className="text-gray-500 text-xs md:text-sm">
                        الصفحة {currentPage} من {totalPages}
                      </p>
                    )}
                  </div>
                  <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full sm:w-auto">
                    <option>ترتيب: الأحدث أولاً</option>
                    <option>ترتيب: الأقرب جغرافياً</option>
                    <option>ترتيب: التوافق</option>
                  </select>
                </div>

                {/* Profile Grid - Mobile Optimized */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                  {profiles.map((profile) => (
                    <ProfileCard
                      key={profile.id}
                      profile={profile}
                      onSendRequest={handleSendRequest}
                      currentUserGender={mockCurrentUser.gender}
                    />
                  ))}
                </div>

                {/* Pagination - Mobile Optimized */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6 md:mt-8">
                    {/* Mobile: Compact pagination */}
                    <div className="flex items-center gap-2 sm:hidden">
                      <Button
                        variant="outline"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <ChevronRight className="h-4 w-4" />
                        السابق
                      </Button>

                      <span className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded">
                        {currentPage} / {totalPages}
                      </span>

                      <Button
                        variant="outline"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        التالي
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Desktop: Full pagination */}
                    <div className="hidden sm:flex items-center gap-2">
                      <Button
                        variant="outline"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="flex items-center gap-2"
                      >
                        <ChevronRight className="h-4 w-4" />
                        السابق
                      </Button>

                      <div className="flex gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                          .filter((page) => {
                            const distance = Math.abs(page - currentPage);
                            return (
                              distance <= 2 || page === 1 || page === totalPages
                            );
                          })
                          .map((page, index, array) => {
                            const prevPage = array[index - 1];
                            const showEllipsis =
                              prevPage && page - prevPage > 1;

                            return (
                              <React.Fragment key={page}>
                                {showEllipsis && (
                                  <span className="px-3 py-2 text-gray-500">
                                    ...
                                  </span>
                                )}
                                <Button
                                  variant={
                                    currentPage === page ? "primary" : "outline"
                                  }
                                  onClick={() => handlePageChange(page)}
                                  className="w-10 h-10 p-0"
                                >
                                  {page}
                                </Button>
                              </React.Fragment>
                            );
                          })}
                      </div>

                      <Button
                        variant="outline"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="flex items-center gap-2"
                      >
                        التالي
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
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
                  <Button
                    variant="outline"
                    onClick={() => {
                      // Clear all filters
                      const url = new URL(window.location.href);
                      url.search = "";
                      window.history.pushState({}, "", url.toString());
                      window.location.reload();
                    }}
                  >
                    مسح معايير البحث
                  </Button>
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
