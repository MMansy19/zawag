"use client";

import Link from "next/link";

export function LandingNavigation() {
  return (
    <nav className="bg-white shadow-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-primary">
              الزواج المبارك
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-text-secondary hover:text-text"
            >
              المميزات
            </Link>
            <Link href="#about" className="text-text-secondary hover:text-text">
              عن المنصة
            </Link>
            <Link
              href="#testimonials"
              className="text-text-secondary hover:text-text"
            >
              آراء المستخدمين
            </Link>
            <Link
              href="#contact"
              className="text-text-secondary hover:text-text"
            >
              اتصل بنا
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/auth/login"
              className="text-primary hover:text-primary-hover font-medium"
            >
              تسجيل الدخول
            </Link>
            <Link
              href="/auth/register"
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-hover font-medium"
            >
              إنشاء حساب
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
