"use client";

import { useState, useEffect, useRef } from "react";
import {
  LogIn,
  UserPlus,
  Menu,
  X,
  ChevronDown,
  Star,
  Cog,
  Phone,
  Info,
  HelpCircle,
  Shield,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function LandingNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle scrolling to anchor on page load
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const targetId = hash.substring(1); // Remove the # symbol
        const element = document.getElementById(targetId);
        if (element) {
          // Small delay to ensure page is fully loaded
          setTimeout(() => {
            const isMobile = window.innerWidth < 768;
            const headerOffset = isMobile ? 100 : 60;

            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition =
              elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }, 100);
        }
      }
    };

    // Handle initial load
    handleHashScroll();

    // Handle browser back/forward navigation
    window.addEventListener("hashchange", handleHashScroll);

    return () => {
      window.removeEventListener("hashchange", handleHashScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    e.preventDefault();
    closeMobileMenu(); // Close mobile menu if open

    // Check if we're on the home page
    const isHomePage = window.location.pathname === "/";

    if (!isHomePage) {
      // If not on home page, navigate to home page with anchor
      window.location.href = `/#${targetId}`;
      return;
    }

    // If on home page, scroll to element with offset
    const element = document.getElementById(targetId);
    if (element) {
      // Use larger offset on mobile screens
      const isMobile = window.innerWidth < 768; // md breakpoint
      const headerOffset = isMobile ? 380 : 60; // 380px for mobile, 60px for desktop

      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };
  return (
    <nav className="bg-white shadow-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-1 sm:px-3 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12 md:h-16">
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
                className="h-16 xl:h-24 md:h-20 w-auto"
                priority
                quality={100}
                sizes="(max-width: 768px) 64px, (max-width: 1280px) 80px, 96px"
              />
              <span className="inline md:mt-1">الزواج السعيد</span>
            </Link>
          </div>

          <div className="flex items-center justify-end md:gap-6 sm:gap-4 gap-2">
            {/* Desktop navigation links */}
            <div className="hidden md:flex items-center lg:gap-4 gap-2">
              <Link
                href="/#features"
                onClick={(e) => handleAnchorClick(e, "features")}
                className="flex items-center gap-1 text-text-secondary hover:text-text hidden md:inline-flex"
              >
                <Star className="h-4 w-4" />
                المميزات
              </Link>

              <Link
                href="/#faq"
                onClick={(e) => handleAnchorClick(e, "faq")}
                className="flex items-center gap-1 text-text-secondary hover:text-text hidden lg:inline-flex"
              >
                <HelpCircle className="h-4 w-4" />
                الأسئلة الشائعة
              </Link>
              <Link
                href="/#contact"
                onClick={(e) => handleAnchorClick(e, "contact")}
                className="flex items-center gap-1 text-text-secondary hover:text-text"
              >
                <Phone className="h-4 w-4" />
                تواصل معنا
              </Link>

              {/* Dropdown Menu for Info Pages */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  className="flex items-center gap-1 text-text-secondary hover:text-text transition-colors focus:outline-none"
                >
                  <Info className="h-4 w-4" />
                  معلومات
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div
                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <Link
                      href="/about"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-text hover:bg-gray-50 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <Info className="h-4 w-4" />
                      حولنا
                    </Link>
                    <Link
                      href="/how-we-work"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-text hover:bg-gray-50 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <Cog className="h-4 w-4" />
                      كيف نعمل
                    </Link>
                    <Link
                      href="/terms-privacy"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-text hover:bg-gray-50 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <Shield className="h-4 w-4" />
                      الشروط والخصوصية
                    </Link>
                    <Link
                      href="/tips-guidance"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-text hover:bg-gray-50 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <Lightbulb className="h-4 w-4" />
                      نصائح وإرشادات
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center lg:gap-4 gap-2">
              {/* Desktop links */}
              <div className="xl:flex hidden items-center lg:gap-4 gap-2">
                <Link
                  href="/auth/login"
                  className="flex items-center gap-1 text-primary hover:text-primary-hover font-lg"
                >
                  <LogIn className="h-4 w-4" />
                  تسجيل الدخول
                </Link>
                <Link
                  href="/auth/register"
                  className="flex items-center gap-1 bg-primary hover:text-white text-white px-4 py-2 rounded-md hover:bg-primary-hover font-lg"
                >
                  <UserPlus className="h-4 w-4" />
                  إنشاء حساب
                </Link>
              </div>

              {/* Mobile icons - only show when menu is closed */}
              <div
                className={`flex xl:hidden items-center gap-1 ${isMobileMenuOpen ? "hidden" : "flex"}`}
              >
                <Link
                  href="/auth/login"
                  className="text-primary hover:text-primary-hover p-2 sm:inline-block hidden"
                >
                  <LogIn className="h-5 w-5" />
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-primary hover:bg-primary-hover text-white hover:text-white p-2 rounded-md"
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

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
            onClick={closeMobileMenu}
          ></div>

          {/* Sidebar */}
          <div className="fixed top-0 right-0 h-full w-full max-w-[450px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 badge-primary">
              <div className="flex items-center gap-3">
                <Image
                  src="/logo-footer.png"
                  className="h-16 w-auto"
                  alt="الزواج السعيد - شعار منصة الزواج الإسلامية"
                  width={32}
                  height={32}
                  priority
                  quality={100}
                  sizes="(max-width: 768px) 64px, (max-width: 1280px) 80px, 96px"
                />
                <h3 className="text-xl font-bold text-white mt-3">
                  الزواج السعيد
                </h3>
              </div>
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-full text-white hover:bg-white/20 transition-colors"
                aria-label="إغلاق القائمة"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Sidebar Content */}
            <div className="flex flex-col h-full">
              {/* Navigation Links */}
              <div className="flex-1 px-4 py-6">
                <div className="space-y-1">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    التنقل الرئيسي
                  </h4>
                  <Link
                    href="/#features"
                    onClick={(e) => handleAnchorClick(e, "features")}
                    className="flex items-center gap-4 p-4 text-base font-lg text-gray-700 hover:text-primary hover:bg-blue-50 rounded-lg transition-all duration-200 hover:translate-x-1"
                  >
                    <Star className="h-6 w-6 text-yellow-500" />
                    <span>المميزات</span>
                  </Link>
                  <Link
                    href="/about"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-4 p-4 text-base font-lg text-gray-700 hover:text-primary hover:bg-blue-50 rounded-lg transition-all duration-200 hover:translate-x-1"
                  >
                    <Info className="h-6 w-6 text-blue-500" />
                    <span>حولنا</span>
                  </Link>
                  <Link
                    href="/how-we-work"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-4 p-4 text-base font-lg text-gray-700 hover:text-primary hover:bg-blue-50 rounded-lg transition-all duration-200 hover:translate-x-1"
                  >
                    <Cog className="h-6 w-6 text-gray-500" />
                    <span>كيف نعمل</span>
                  </Link>
                  <Link
                    href="/terms-privacy"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-4 p-4 text-base font-lg text-gray-700 hover:text-primary hover:bg-blue-50 rounded-lg transition-all duration-200 hover:translate-x-1"
                  >
                    <Shield className="h-6 w-6 text-green-500" />
                    <span>الشروط والخصوصية</span>
                  </Link>
                  <Link
                    href="/tips-guidance"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-4 p-4 text-base font-lg text-gray-700 hover:text-primary hover:bg-blue-50 rounded-lg transition-all duration-200 hover:translate-x-1"
                  >
                    <Lightbulb className="h-6 w-6 text-amber-500" />
                    <span>نصائح وإرشادات</span>
                  </Link>
                  <Link
                    href="/#faq"
                    onClick={(e) => handleAnchorClick(e, "faq")}
                    className="flex items-center gap-4 p-4 text-base font-lg text-gray-700 hover:text-primary hover:bg-blue-50 rounded-lg transition-all duration-200 hover:translate-x-1"
                  >
                    <HelpCircle className="h-6 w-6 text-purple-500" />
                    <span>الأسئلة الشائعة</span>
                  </Link>
                  <Link
                    href="/#contact"
                    onClick={(e) => handleAnchorClick(e, "contact")}
                    className="flex items-center gap-4 p-4 text-base font-lg text-gray-700 hover:text-primary hover:bg-blue-50 rounded-lg transition-all duration-200 hover:translate-x-1"
                  >
                    <Phone className="h-6 w-6 text-emerald-500" />
                    <span>تواصل معنا</span>
                  </Link>
                </div>
              </div>

              {/* Sidebar Footer - Auth Links */}
              <div className="h-full border-t border-gray-200 p-4 bg-gray-50">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  الحساب
                </h4>
                <div className="space-y-2">
                  <Link
                    href="/auth/login"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-4 p-4 text-base font-lg text-primary hover:text-primary-hover hover:bg-white rounded-lg transition-all duration-200 hover:translate-x-1"
                  >
                    <LogIn className="h-6 w-6" />
                    <span>تسجيل الدخول</span>
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-4 p-4 text-base font-lg bg-primary text-white hover:text-white hover:bg-primary-hover rounded-lg transition-all duration-200 hover:translate-x-1 hover:shadow-lg"
                  >
                    <UserPlus className="h-6 w-6" />
                    <span>إنشاء حساب</span>
                  </Link>
                </div>

                {/* Sidebar Footer */}
                <div className="mt-3 pt-3 border-t border-gray-300 text-center">
                  <div className="text-xs text-gray-500 mb-2 leading-relaxed">
                    © {new Date().getFullYear()} -{" "}
                    {new Intl.DateTimeFormat("ar-SA-u-ca-islamic", {
                      year: "numeric",
                      month: "long",
                    }).format(new Date())}{" "}
                    <a
                      href="https://alzawajalsaeid.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-primary transition-colors font-medium"
                    >
                      الزواج السعيد
                    </a>
                    . جميع الحقوق محفوظة.
                  </div>
                  <div className="text-xs text-gray-500 mb-2 leading-relaxed">
                    <a
                      href="https://mahmoud-mansy.vercel.app/ar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-primary transition-colors"
                    >
                      مطور الموقع
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
