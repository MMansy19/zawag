"use client";

import { useState, useEffect, useRef } from "react";
import { LogIn, UserPlus, Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function LandingNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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
            const headerOffset = isMobile ? 380 : 60;

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
      <div className="max-w-8xl mx-auto px-1 sm:px-3 md:px-6 lg:px-8">
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
                onClick={(e) => handleAnchorClick(e, "features")}
                className="text-text-secondary hover:text-text hidden xl:inline-block"
              >
                المميزات
              </Link>

              <Link
                href="/#faq"
                onClick={(e) => handleAnchorClick(e, "faq")}
                className="text-text-secondary hover:text-text hidden xl:inline-block"
              >
                الأسئلة الشائعة
              </Link>
              <Link
                href="/#contact"
                onClick={(e) => handleAnchorClick(e, "contact")}
                className="text-text-secondary hover:text-text"
              >
                تواصل معنا
              </Link>
              
              {/* Dropdown Menu for Info Pages */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  className="flex items-center gap-1 text-text-secondary hover:text-text transition-colors focus:outline-none"
                >
                  معلومات
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
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
                      className="block px-4 py-2 text-sm text-text-secondary hover:text-text hover:bg-gray-50 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      حولنا
                    </Link>
                    <Link
                      href="/how-we-work"
                      className="block px-4 py-2 text-sm text-text-secondary hover:text-text hover:bg-gray-50 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      كيف نعمل
                    </Link>
                    <Link
                      href="/terms-privacy"
                      className="block px-4 py-2 text-sm text-text-secondary hover:text-text hover:bg-gray-50 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      الشروط والخصوصية
                    </Link>
                    <Link
                      href="/tips-guidance"
                      className="block px-4 py-2 text-sm text-text-secondary hover:text-text hover:bg-gray-50 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      نصائح وإرشادات
                    </Link>
                  </div>
                )}
              </div>
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
                onClick={(e) => handleAnchorClick(e, "features")}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
              >
                المميزات
              </Link>
              <Link
                href="/about"
                onClick={closeMobileMenu}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
              >
                حولنا
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
                href="/tips-guidance"
                onClick={closeMobileMenu}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
              >
                نصائح وإرشادات
              </Link>
              <Link
                href="/#faq"
                onClick={(e) => handleAnchorClick(e, "faq")}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
              >
                الأسئلة الشائعة
              </Link>
              <Link
                href="/#contact"
                onClick={(e) => handleAnchorClick(e, "contact")}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
              >
                تواصل معنا
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
