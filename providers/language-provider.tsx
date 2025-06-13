"use client";

import React, { createContext, useContext, useState } from "react";

interface LanguageContextType {
  language: "ar";
  setLanguage: (lang: "ar") => void;
  isRTL: boolean;
  t: (key: string) => string;
}

// Currently Arabic-only as per requirements
// This structure allows for future expansion
const translations = {
  ar: {
    // Common
    "common.save": "حفظ",
    "common.cancel": "إلغاء",
    "common.submit": "إرسال",
    "common.loading": "جاري التحميل...",
    "common.error": "خطأ",
    "common.success": "نجح",
    "common.warning": "تحذير",
    "common.info": "معلومات",
    "common.yes": "نعم",
    "common.no": "لا",
    "common.next": "التالي",
    "common.previous": "السابق",
    "common.continue": "متابعة",
    "common.finish": "إنهاء",
    "common.edit": "تعديل",
    "common.delete": "حذف",
    "common.view": "عرض",
    "common.search": "بحث",
    "common.filter": "تصفية",
    "common.reset": "إعادة تعيين",
    "common.close": "إغلاق",
    "common.open": "فتح",

    // Navigation
    "nav.home": "الرئيسية",
    "nav.profile": "الملف الشخصي",
    "nav.search": "البحث",
    "nav.messages": "الرسائل",
    "nav.requests": "الطلبات",
    "nav.settings": "الإعدادات",
    "nav.logout": "تسجيل الخروج",

    // Auth
    "auth.login": "تسجيل الدخول",
    "auth.register": "إنشاء حساب",
    "auth.logout": "تسجيل الخروج",
    "auth.email": "البريد الإلكتروني",
    "auth.password": "كلمة المرور",
    "auth.confirmPassword": "تأكيد كلمة المرور",
    "auth.rememberMe": "تذكرني",
    "auth.forgotPassword": "نسيت كلمة المرور؟",
    "auth.verifyOTP": "تحقق من الرمز",
    "auth.resendOTP": "إعادة إرسال الرمز",

    // Profile
    "profile.basicInfo": "المعلومات الأساسية",
    "profile.religiousInfo": "المعلومات الدينية",
    "profile.education": "التعليم والعمل",
    "profile.preferences": "التفضيلات",
    "profile.picture": "الصورة الشخصية",
    "profile.guardian": "معلومات الولي",
    "profile.bio": "النبذة الشخصية",
    "profile.privacy": "إعدادات الخصوصية",

    // Search
    "search.filters": "المرشحات",
    "search.results": "النتائج",
    "search.noResults": "لا توجد نتائج",
    "search.ageRange": "الفئة العمرية",
    "search.country": "البلد",
    "search.city": "المدينة",
    "search.maritalStatus": "الحالة الاجتماعية",
    "search.education": "المستوى التعليمي",
    "search.occupation": "المهنة",

    // Messages
    "messages.send": "إرسال",
    "messages.type": "اكتب رسالة...",
    "messages.empty": "لا توجد رسائل",
    "messages.limit": "تم الوصول للحد الأقصى من الرسائل",

    // Requests
    "requests.send": "إرسال طلب",
    "requests.accept": "قبول",
    "requests.reject": "رفض",
    "requests.pending": "في الانتظار",
    "requests.accepted": "مقبول",
    "requests.rejected": "مرفوض",
    "requests.expired": "منتهي الصلاحية",

    // Validation
    "validation.required": "هذا الحقل مطلوب",
    "validation.email": "البريد الإلكتروني غير صحيح",
    "validation.minLength": "الحد الأدنى {min} أحرف",
    "validation.maxLength": "الحد الأقصى {max} حرف",
    "validation.passwordMatch": "كلمتا المرور غير متطابقتان",
    "validation.phoneNumber": "رقم الهاتف غير صحيح",

    // Error Messages
    "error.generic": "حدث خطأ غير متوقع",
    "error.network": "خطأ في الشبكة",
    "error.unauthorized": "غير مخول للوصول",
    "error.forbidden": "غير مسموح",
    "error.notFound": "غير موجود",
    "error.serverError": "خطأ في الخادم",

    // Success Messages
    "success.profileUpdated": "تم تحديث الملف الشخصي",
    "success.requestSent": "تم إرسال الطلب",
    "success.messageSent": "تم إرسال الرسالة",
    "success.settingsSaved": "تم حفظ الإعدادات",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language] = useState<"ar">("ar"); // Arabic only as per requirements

  const t = (key: string, params?: Record<string, string | number>): string => {
    let translation =
      translations[language][key as keyof typeof translations.ar] || key;

    // Replace parameters in translation
    if (params) {
      Object.entries(params).forEach(([paramKey, value]) => {
        translation = translation.replace(`{${paramKey}}`, String(value));
      });
    }

    return translation;
  };

  const setLanguage = (lang: "ar") => {
    // Currently only Arabic is supported
    // This function is kept for future expansion
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    isRTL: true, // Arabic is always RTL
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

// Shorthand hook for translations
export function useTranslation() {
  const { t } = useLanguage();
  return { t };
}
