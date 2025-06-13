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
      const filters = Object.fromEntries(searchParams.entries());
      const response = await searchApi.searchProfiles(
        {
          ...filters,
          // Add pagination separately since it's not part of SearchFilters
        } as any,
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
    } catch (error: any) {
      showToast.error(error.message || "خطأ في تحميل النتائج");
    } finally {
      setLoading(false);
    }
  };

  const handleSendRequest = async (profileId: string, message: string) => {
    try {
      const response = await requestsApi.sendRequest({
        receiverId: profileId,
        message,
      });

      if (response.success) {
        showToast.success("تم إرسال طلب الزواج بنجاح!");
      }
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
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg h-64"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!loading && profiles.length === 0) {
    return (
      <div className="flex-1 p-6">
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            لا توجد نتائج
          </h3>
          <p className="text-gray-600 mb-6">
            لم نجد أي ملفات شخصية تتطابق مع معايير البحث الخاصة بك
          </p>
          <Button onClick={() => window.location.reload()}>
            إعادة المحاولة
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6">
      {/* Results Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          نتائج البحث
        </h2>
        <p className="text-gray-600">
          تم العثور على {profiles.length} نتيجة
          {totalPages > 1 && ` (صفحة ${currentPage} من ${totalPages})`}
        </p>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
        <div className="text-center">
          <Button
            onClick={loadMore}
            disabled={loading}
            variant="outline"
            size="lg"
          >
            {loading ? "جاري التحميل..." : "تحميل المزيد"}
          </Button>
        </div>
      )}

      {/* Loading indicator for additional results */}
      {loading && profiles.length > 0 && (
        <div className="text-center py-8">
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
