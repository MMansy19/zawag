"use client";

import { Suspense, useState } from "react";
import { FilterSidebar } from "@/components/search/filter-sidebar";
import { SearchResults } from "@/components/search/search-results";

function SearchPageContent() {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center sm:text-right">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            البحث عن شريك الحياة 💕
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            استخدم الفلاتر للعثور على الشريك المناسب وفقاً لمعاييرك
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-right flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <span className="text-gray-700 font-medium">فلترة النتائج</span>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${
                showFilters ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Mobile Filters Overlay */}
          {showFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div 
                className="fixed inset-0 bg-black bg-opacity-25" 
                onClick={() => setShowFilters(false)}
              ></div>
              <div className="fixed top-0 right-0 bottom-0 w-80 bg-white shadow-xl overflow-y-auto">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">فلاتر البحث</h2>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="p-2 rounded-md text-gray-400 hover:text-gray-500"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <FilterSidebar />
                </div>
              </div>
            </div>
          )}

          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block lg:w-80 flex-shrink-0">
            <div className="sticky top-6">
              <FilterSidebar />
            </div>
          </div>

          {/* Search Results */}
          <div className="flex-1 min-w-0">
            <SearchResults />
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
        <div className="min-h-screen flex items-center justify-center">
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
