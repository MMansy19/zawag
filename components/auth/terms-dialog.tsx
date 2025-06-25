"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
      <h3 className="text-lg font-bold text-primary-700 mb-3">{section.title}</h3>
      <ul className="space-y-2 pr-4">
        {section.items.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className="text-primary-500 ml-2">•</span>
            <span>
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
            <h2 className="text-xl font-bold text-right">شروط التسجيل</h2>
            <p className="text-sm text-gray-600 text-right mt-1">
              يرجى القراءة والموافقة على الشروط
            </p>
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
            className="h-96 overflow-y-auto sm:p-6 p-3 text-right"
            onScroll={handleScroll}
            dir="rtl"
          >
            <div className="space-y-6 text-gray-800 leading-relaxed">
              {/* Introduction */}
              <div className="bg-primary-50 p-4 rounded-lg border-r-4 border-primary-500">
                <p className="text-base">{TERMS_DATA.introduction}</p>
              </div>

              {/* Terms Sections */}
              {TERMS_DATA.sections.map(renderTermsSection)}

              {/* Notice */}
              <div className="bg-accent-50 p-4 rounded-lg border-r-4 border-accent-500">
                <p className="text-sm font-medium">
                  <strong>ملاحظة هامة:</strong> {TERMS_DATA.notice}
                </p>
              </div>

              {/* Conclusion */}
              <div className="bg-secondary-50 p-4 rounded-lg border-r-4 border-secondary-500">
                <p className="text-base font-medium text-secondary-700">
                  {TERMS_DATA.conclusion}
                </p>
              </div>

              {/* Scroll indicator */}
              {!hasScrolledToBottom && (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500 animate-pulse">
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
              <Checkbox
                id="accept-terms"
                checked={hasAccepted}
                onCheckedChange={(checked) =>
                  setHasAccepted(checked as boolean)
                }
                disabled={!hasScrolledToBottom}
                className="data-[state=checked]:bg-primary-600 data-[state=checked]:border-primary-600"
              />
              <label
                htmlFor="accept-terms"
                className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed transition-colors mt-2 ${
                  !hasScrolledToBottom
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-900 cursor-pointer"
                }`}
              >
                أُقرّ بأنني قرأت الشروط وأوافق عليها
              </label>
            </div>

            <div className="flex sm:flex-row flex-col justify-between gap-4">
              <Button
                onClick={handleAccept}
                disabled={!hasAccepted || !hasScrolledToBottom}
                className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300"
              >
                موافق ومتابعة التسجيل
              </Button>
              <Button variant="outline" onClick={onClose} className="flex-1">
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
