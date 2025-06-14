import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
  showBackLink?: boolean;
  backLinkText?: string;
  backLinkHref?: string;
}

export function AuthLayout({
  children,
  title,
  subtitle,
  showLogo = true,
  showBackLink = false,
  backLinkText = "العودة للرئيسية",
  backLinkHref = "/",
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        {showLogo && (
          <Link
            href="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="bg-primary rounded-lg p-2">
              <span className="text-white font-bold text-xl">ز</span>
            </div>
            <span className="text-xl font-bold text-primary">زواج</span>
          </Link>
        )}

        {showBackLink && (
          <Link
            href={backLinkHref}
            className="text-primary hover:text-primary-hover transition-colors"
          >
            {backLinkText}
          </Link>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-6xl mx-auto">
          {(title || subtitle) && (
            <div className="text-center mb-8">
              {title && (
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {title}
                </h1>
              )}
              {subtitle && <p className="text-gray-600 text-lg">{subtitle}</p>}
            </div>
          )}

          <div className="flex justify-center">{children}</div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-600">
                © 2024 زواج - منصة الزواج الإسلامي
              </p>
            </div>

            <div className="flex space-x-6 text-sm">
              <Link
                href="/terms-privacy"
                className="text-gray-600 hover:text-primary"
              >
                الشروط والأحكام
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-primary">
                من نحن
              </Link>
              <Link
                href="/how-we-work"
                className="text-gray-600 hover:text-primary"
              >
                كيف نعمل
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Specialized auth card wrapper
interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

export function AuthCard({ children, className = "" }: AuthCardProps) {
  return (
    <Card className={`w-full max-w-md shadow-lg border-0 ${className}`}>
      <CardContent className="p-0">{children}</CardContent>
    </Card>
  );
}
