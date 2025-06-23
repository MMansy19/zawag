import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

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
      <header className="flex md:flex-row flex-col justify-between items-center p-6 bg-white">
        {showLogo && (
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
      <main className="flex-1 flex items-center justify-center sm:px-4 px-0 py-8">
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
                © 2024 الزواج السعيد - منصة الزواج الإسلامية
              </p>
            </div>

            <div className="flex gap-6 text-sm">
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
