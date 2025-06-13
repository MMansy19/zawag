"use client";

import { useState } from "react";
import { LogIn, UserPlus, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function LandingNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  return (
    <nav className="bg-white shadow-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-1 sm:px-3 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center justify-start">
            <Link
              href="/"
              className="flex items-center md:gap-4 gap-3 text-xl font-bold text-primary hover:text-primary-hover transition-colors"
            >
              <Image
                src="/logo.png"
                alt="الزواج السعيد - شعار منصة الزواج الإسلامية"
                width={40}
                height={48}
                className="h-16 xl:h-24 md::h-20 w-auto"
                priority
              />
              <span className="inline md:mt-1">الزواج السعيد</span>
            </Link>
          </div>

          <div className="flex items-center justify-end md:gap-6 sm:gap-4 gap-2">
            {/* Desktop navigation links */}
            <div className="hidden md:flex items-center lg:gap-4 gap-2">
              <Link
                href="/#features"
                className="text-text-secondary hover:text-text hidden xl:inline-block"
              >
                المميزات
              </Link>
              
              <Link
                href="/#faq"
                className="text-text-secondary hover:text-text hidden xl:inline-block"
              >
                الأسئلة الشائعة
              </Link>                   
              <Link
                href="/how-we-work"
                className="text-text-secondary hover:text-text"
              >
                كيف نعمل
              </Link>
              <Link
                href="/terms-privacy"
                className="text-text-secondary hover:text-text"
              >
                الشروط والخصوصية
              </Link>
              <Link
                href="/#contact"
                className="text-text-secondary hover:text-text"
              >
                اتصل بنا
              </Link>
            </div>

            <div className="flex items-center lg:gap-4 gap-2">
              {/* Desktop links */}
              <div className="lg:flex hidden items-center lg:gap-4 gap-2">
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

              {/* Mobile icons - only show when menu is closed */}
              <div
                className={`sm:flex lg:hidden hidden items-center gap-1 ${isMobileMenuOpen ? "hidden" : "flex"}`}
              >
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

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-1 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="فتح القائمة"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-3 space-y-3">
            {/* Navigation Links */}
            <div className="space-y-2">
              <Link
                href="/#features"
                onClick={closeMobileMenu}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
              >
                المميزات
              </Link>
              <Link
                href="/how-we-work"
                onClick={closeMobileMenu}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
              >
                كيف نعمل
              </Link>
              <Link
                href="/terms-privacy"
                onClick={closeMobileMenu}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
              >
                الشروط والخصوصية
              </Link>
              <Link
                href="/#faq"
                onClick={closeMobileMenu}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
              >
                الأسئلة الشائعة
              </Link>
              <Link
                href="/#contact"
                onClick={closeMobileMenu}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
              >
                اتصل بنا
              </Link>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-3"></div>

            {/* Auth Links */}
            <div className="space-y-2">
              <Link
                href="/auth/login"
                onClick={closeMobileMenu}
                className="block px-3 py-2 text-base font-medium text-primary hover:text-primary-hover hover:bg-primary/5 rounded-md transition-colors"
              >
                تسجيل الدخول
              </Link>
              <Link
                href="/auth/register"
                onClick={closeMobileMenu}
                className="block px-3 py-2 text-base font-medium bg-primary text-white hover:bg-primary-hover rounded-md transition-colors text-center"
              >
                إنشاء حساب
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
