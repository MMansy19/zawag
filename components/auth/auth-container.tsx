"use client";

import { ReactNode } from "react";
import Link from "next/link";

interface AuthContainerProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  linkText?: string;
  linkHref?: string;
}

export function AuthContainer({
  children,
  title,
  subtitle,
  linkText,
  linkHref,
}: AuthContainerProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-text mb-2">{title}</h1>
            {subtitle && (
              <p className="text-text-secondary text-sm">{subtitle}</p>
            )}{" "}
          </div>
          {children}
          {linkText && linkHref && (
            <div className="text-center mt-6">
              <Link
                href={linkHref}
                className="text-sm text-primary hover:text-primary-hover"
              >
                {linkText}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
