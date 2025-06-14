"use client";

import Link from "next/link";

export function LandingCTA() {
  return (
    <section className="py-20 badge-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          ابدأ رحلتك اليوم
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          انضم إلى آلاف الأعضاء الذين وثقوا بنا للعثور على شريك الحياة المناسب
          وفق الشريعة الإسلامية
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/auth/register"
            className="bg-white text-primary px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors w-full sm:w-auto"
          >
            إنشاء حساب مجاني
          </Link>
          <Link
            href="/auth/login"
            className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-white hover:text-primary transition-colors w-full sm:w-auto"
          >
            تسجيل الدخول
          </Link>
        </div>

        <div className="mt-8 text-white/80 text-sm">
          <p>✓ مجاني تماماً</p>
          <p>✓ آمن ومحمي</p>
          <p>✓ وفق الشريعة الإسلامية</p>
        </div>
      </div>
    </section>
  );
}
