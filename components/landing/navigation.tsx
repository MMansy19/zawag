"use client";

import { LogIn, UserPlus } from "lucide-react";
import Link from "next/link";

export function LandingNavigation() {
  return (
    <nav className="bg-white shadow-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-primary">
              الزواج السعيد
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-text-secondary hover:text-text"
            >
              المميزات
            </Link>
            <Link href="#stats" className="text-text-secondary hover:text-text">
              الإحصائيات
            </Link>
            <Link href="#faq" className="text-text-secondary hover:text-text">
              الأسئلة الشائعة
            </Link>
            <Link
              href="#contact"
              className="text-text-secondary hover:text-text"
            >
              اتصل بنا
            </Link>
            <Link
              href="#social"
              className="text-text-secondary hover:text-text"
            >
              تابعنا
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {/* Desktop links */}
            <div className="hidden sm:flex md:hidden xl:flex items-center gap-4">
              <Link
                href="/auth/login"
                className="text-primary hover:text-primary-hover font-medium"
              >
                تسجيل الدخول
              </Link>
              <Link
                href="/auth/register"
                className="bg-primary hover:text-white text-white px-4 py-2 rounded-md hover:bg-primary-hover font-medium"
              >
                إنشاء حساب
              </Link>
            </div>

            {/* Mobile icons */}
            <div className="flex sm:hidden md:flex xl:hidden items-center gap-3">
              <Link
                href="/auth/login"
                className="text-primary hover:text-primary-hover p-2"
              >
                <LogIn className="h-5 w-5" />
              </Link>
              <Link
                href="/auth/register"
                className="bg-primary hover:bg-primary-hover text-white p-2 rounded-md"
              >
                <UserPlus className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
