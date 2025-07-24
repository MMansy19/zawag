"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { TERMS_DATA } from "@/lib/constants/terms-data";
import { TermsSection } from "@/lib/types";

interface TermsDialogProps {
  isOpen: boolean;
  onAccept: () => void;
  onClose: () => void;
}

export function TermsDialog({ isOpen, onAccept, onClose }: TermsDialogProps) {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [hasAccepted, setHasAccepted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      setHasScrolledToBottom(true);
    }
  };

  const handleAccept = () => {
    if (hasAccepted && hasScrolledToBottom) {
      onAccept();
    }
  };

  const renderTermsSection = (section: TermsSection) => (
    <div key={section.title}>
      <h3 className="text-sm sm:text-base font-bold text-primary-700 mb-2 sm:mb-3">
        {section.title}
      </h3>
      <ul className="space-y-1 sm:space-y-2 pr-2 sm:pr-4">
        {section.items.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className="text-primary-500 ml-1 sm:ml-2 text-xs sm:text-sm">
              •
            </span>
            <span className="text-xs sm:text-sm leading-relaxed">
              <strong>{item.label}:</strong> {item.description}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-right">
              شروط التسجيل
            </h2>
            <div className="text-xs sm:text-sm text-gray-600 text-right">
              يرجى القراءة والموافقة على الشروط
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden p-0">
          <div
            className="md:h-96 h-[55vh] overflow-y-auto sm:p-6 p-3 text-right"
            onScroll={handleScroll}
            dir="rtl"
          >
            <div className="space-y-4 sm:space-y-6 text-gray-800 leading-relaxed">
              {/* Introduction */}
              <div className="bg-primary-50 p-3 sm:p-4 rounded-lg border-r-4 border-primary-500">
                <p className="text-xs sm:text-sm leading-relaxed">
                  {TERMS_DATA.introduction}
                </p>
              </div>

              {/* Terms Sections */}
              {TERMS_DATA.sections.map(renderTermsSection)}

              {/* Notice */}
              <div className="bg-accent-50 p-3 sm:p-4 rounded-lg border-r-4 border-accent-500">
                <p className="text-xs sm:text-sm font-medium">
                  <strong>ملاحظة هامة:</strong> {TERMS_DATA.notice}
                </p>
              </div>

              {/* Conclusion */}
              <div className="bg-secondary-50 p-3 sm:p-4 rounded-lg border-r-4 border-secondary-500">
                <p className="text-xs sm:text-sm font-medium text-secondary-700 leading-relaxed">
                  {TERMS_DATA.conclusion}
                </p>
              </div>

              {/* Scroll indicator */}
              {!hasScrolledToBottom && (
                <div className="text-center py-2 sm:py-4">
                  <p className="text-xs text-gray-500 animate-pulse">
                    يرجى التمرير لأسفل لقراءة جميع الشروط
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="border-t bg-gray-50 p-2 sm:p-4">
          <div className="w-full sm:space-y-4 space-y-2">
            <div className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                id="accept-terms"
                checked={hasAccepted}
                onChange={(e) => setHasAccepted(e.target.checked)}
                disabled={!hasScrolledToBottom}
                className="h-4 w-4 accent-primary-600 focus:ring-primary-500 border-gray-300 rounded disabled:opacity-50"
                style={{
                  accentColor: "var(--primary-color, #5d1a78)",
                }}
                required
              />
              <label
                htmlFor="accept-terms"
                className={`text-xs sm:text-sm font-medium leading-none transition-colors mt-2 ${
                  !hasScrolledToBottom
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 cursor-pointer"
                }`}
              >
                أُقرّ بأنني قرأت الشروط وأوافق عليها
                <span className="text-red-500 mr-1">*</span>
              </label>
            </div>

            <div className="flex sm:flex-row flex-col justify-between gap-2 sm:gap-4">
              <Button
                onClick={handleAccept}
                disabled={!hasAccepted || !hasScrolledToBottom}
                className="flex-1 text-xs sm:text-sm bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                موافق ومتابعة التسجيل
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 text-xs sm:text-sm sm:block hidden"
              >
                إغلاق
              </Button>
            </div>

            {!hasScrolledToBottom && (
              <p className="text-xs text-gray-500 text-center">
                يجب قراءة جميع الشروط قبل الموافقة
              </p>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
