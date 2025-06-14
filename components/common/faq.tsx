"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CommonFAQProps {
  /** Array of FAQ items with question and answer */
  faqs: FAQItem[];
  /** Title for the FAQ section */
  title?: string;
  /** Subtitle/description for the FAQ section */
  subtitle?: string;
  /** Helper text shown below the subtitle */
  helperText?: string;
  /** Number of FAQs to show initially (default: 5) */
  initialDisplayCount?: number;
  /** Whether to show the "Show More/Less" functionality */
  showToggle?: boolean;
  /** Custom CSS class for the container */
  className?: string;
  /** Whether to show contact button at the bottom */
  showContactButton?: boolean;
  /** Contact button text */
  contactButtonText?: string;
  /** Contact button href */
  contactButtonHref?: string;
  /** Contact button icon */
  contactButtonIcon?: React.ReactNode;
}

export function CommonFAQ({
  faqs,
  title = "الأسئلة الشائعة",
  subtitle = "هنا، نقدم لكم إجاباتٍ على الأسئلة التي قد تكون لديكم",
  helperText = "يرجى النقر على السؤال لتظهر لك الإجابة.",
  initialDisplayCount = 5,
  showToggle = true,
  className = "",
  showContactButton = false,
  contactButtonText = "تواصل معنا",
  contactButtonHref = "#contact",
  contactButtonIcon,
}: CommonFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAllFAQs, setShowAllFAQs] = useState(false);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Show only initial count of FAQs, unless "Show More" is clicked
  const displayedFAQs = showAllFAQs ? faqs : faqs.slice(0, initialDisplayCount);

  const handleShowMore = () => {
    setShowAllFAQs(true);
  };

  const handleShowLess = () => {
    setShowAllFAQs(false);
    setOpenIndex(null); // Close any open FAQ when showing less
  };

  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <section className={`py-20 bg-gray-50 ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          {subtitle && <p className="text-xl text-gray-600">{subtitle}</p>}
          {helperText && (
            <p className="text-lg text-gray-500 mt-4">{helperText}</p>
          )}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {displayedFAQs.map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-right p-6 hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-gray-900 flex-1">
                      {faq.question}
                    </span>
                    <div
                      className={`text-2xl transition-transform duration-200 ${
                        openIndex === index ? "transform rotate-180" : ""
                      }`}
                    >
                      <span className="text-primary">⌄</span>
                    </div>
                  </div>
                </button>

                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-gray-200 pt-4">
                      <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Show More/Less Button */}
        {showToggle && !showAllFAQs && faqs.length > initialDisplayCount && (
          <div className="text-center mt-8">
            <button
              onClick={handleShowMore}
              className="inline-flex items-center px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <span className="text-lg font-medium">
                عرض المزيد ({faqs.length - initialDisplayCount} أسئلة أخرى)
              </span>
              <svg
                className="w-5 h-5 mr-2 transform rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        )}
        {/* Contact Button */}
        {showContactButton && (
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">لم تجد إجابة لسؤالك؟</p>
            <a
              href={contactButtonHref}
              className="inline-flex items-center px-6 py-3 button-primary text-white hover:text-white rounded-lg transition-colors duration-200"
            >
              {contactButtonIcon && (
                <span className="ml-2">{contactButtonIcon}</span>
              )}
              {contactButtonText}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
