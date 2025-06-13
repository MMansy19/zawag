"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ProfileCard } from "./profile-card";
import { Profile } from "@/lib/types";
import { searchApi, requestsApi } from "@/lib/api";
import { showToast } from "@/components/ui/toaster";

interface SearchResultsProps {
  onSendRequest?: (profileId: string, message: string) => Promise<void>;
}

export function SearchResults({ onSendRequest }: SearchResultsProps) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    fetchProfiles(1);
  }, [searchParams]);

  const fetchProfiles = async (page: number) => {
    setLoading(true);
    try {
      // Using mock search API for development/testing
      const { mockSearchApi } = await import(
        "@/lib/static-data/search-profiles"
      );

      const filters = Object.fromEntries(searchParams.entries());

      // Convert URL params to SearchFilters format
      const searchFilters: any = {};

      // Handle age range
      if (filters["minAge"] || filters["maxAge"]) {
        searchFilters.ageRange = {
          min: parseInt(filters["minAge"] || "18") || 18,
          max: parseInt(filters["maxAge"] || "50") || 50,
        };
      }

      // Handle other filters
      if (filters["country"]) searchFilters.country = filters["country"];
      if (filters["city"]) searchFilters.city = filters["city"];
      if (filters["maritalStatus"]) {
        searchFilters.maritalStatus = filters["maritalStatus"].split(",");
      }
      if (filters["religiousLevel"]) {
        searchFilters.religiousLevel = filters["religiousLevel"].split(",");
      }
      if (filters["education"]) {
        searchFilters.education = filters["education"].split(",");
      }
      if (filters["occupation"]) {
        searchFilters.occupation = filters["occupation"].split(",");
      }

      const response = await mockSearchApi.searchProfiles(
        searchFilters,
        page,
        12,
      );

      if (response.success && response.data) {
        if (page === 1) {
          setProfiles(response.data?.profiles || []);
        } else {
          setProfiles((prev) => [...prev, ...(response.data?.profiles || [])]);
        }

        setCurrentPage(page);
        setTotalPages(response.data?.pagination?.totalPages || 1);
        setHasMore(page < (response.data?.pagination?.totalPages || 1));
      }

      // TODO: Replace with actual API call when backend is ready
      // const response = await searchApi.searchProfiles(
      //   {
      //     ...filters,
      //   } as any,
      //   page,
      //   12,
      // );
    } catch (error: any) {
      showToast.error(error.message || "خطأ في تحميل النتائج");
    } finally {
      setLoading(false);
    }
  };

  const handleSendRequest = async (profileId: string, message: string) => {
    try {
      // Using mock API for development/testing
      const { mockRequestsApi } = await import(
        "@/lib/static-data/marriage-requests"
      );

      // Simulate sending a request
      await mockRequestsApi.respondToRequest({
        requestId: `new_${Date.now()}`,
        response: "accepted", // Simulate successful send
      });

      showToast.success("تم إرسال طلب الزواج بنجاح!");

      // TODO: Replace with actual API call when backend is ready
      // const response = await requestsApi.sendRequest({
      //   receiverId: profileId,
      //   message,
      // });

      // if (response.success) {
      //   showToast.success("تم إرسال طلب الزواج بنجاح!");
      // }
    } catch (error: any) {
      showToast.error(error.message || "خطأ في إرسال الطلب");
      throw error;
    }
  };

  const loadMore = () => {
    if (hasMore && !loading) {
      fetchProfiles(currentPage + 1);
    }
  };

  if (loading && profiles.length === 0) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="bg-gray-200 rounded-lg h-8 w-32 mb-4"></div>
          <div className="bg-gray-200 rounded-lg h-4 w-48 mb-6"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg h-48 sm:h-56 lg:h-64"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!loading && profiles.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <div className="text-4xl sm:text-6xl mb-4">🔍</div>
        <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">
          لا توجد نتائج
        </h3>
        <p className="text-sm sm:text-base text-gray-600 mb-6 max-w-md mx-auto">
          لم نجد أي ملفات شخصية تتطابق مع معايير البحث الخاصة بك. جرب تعديل
          الفلاتر أو البحث بمعايير أوسع.
        </p>
        <Button
          onClick={() => window.location.reload()}
          className="w-full sm:w-auto"
        >
          إعادة المحاولة
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            نتائج البحث
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            تم العثور على {profiles.length} نتيجة
            {totalPages > 1 && ` (صفحة ${currentPage} من ${totalPages})`}
          </p>
        </div>

        {/* Sort/Filter Options for Mobile */}
        <div className="flex gap-2 sm:hidden">
          <Button variant="outline" size="sm" className="flex-1">
            ترتيب
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            فلترة
          </Button>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {profiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            onSendRequest={onSendRequest || handleSendRequest}
          />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center pt-4">
          <Button
            onClick={loadMore}
            disabled={loading}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto min-w-32"
          >
            {loading ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                جاري التحميل...
              </div>
            ) : (
              "تحميل المزيد"
            )}
          </Button>
        </div>
      )}

      {/* Loading indicator for additional results */}
      {loading && profiles.length > 0 && (
        <div className="text-center py-6">
          <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-gray-500 bg-gray-100">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            جاري التحميل...
          </div>
        </div>
      )}
    </div>
  );
}
