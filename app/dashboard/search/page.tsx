"use client";

import { Suspense } from "react";
import { FilterSidebar } from "@/components/search/filter-sidebar";
import { SearchResults } from "@/components/search/search-results";

function SearchPageContent() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            البحث عن شريك الحياة
          </h1>
          <p className="text-gray-600">
            استخدم الفلاتر للعثور على الشريك المناسب وفقاً لمعاييرك
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-8">
              <FilterSidebar />
            </div>
          </div>

          {/* Search Results */}
          <SearchResults />
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">جاري تحميل صفحة البحث...</p>
          </div>
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
