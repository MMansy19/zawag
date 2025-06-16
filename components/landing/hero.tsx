"use client";

import Link from "next/link";

export function LandingHero() {
  return (
    <section className="bg-gradient-to-br from-primary/5 to-secondary/5 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-hero font-display text-text mb-10 flex flex-col gap-3 justify-center items-center text-balance">
            <span className="arabic-optimized">ابحث عن شريك حياتك</span>
            <span className="text-primary arabic-optimized">
              وفق الشريعة الإسلامية
            </span>
          </h1>

          <p className="text-body-large text-text-secondary mb-8 max-w-3xl mx-auto arabic-optimized text-pretty">
            منصة آمنة وموثوقة للزواج الإسلامي مع مراعاة الخصوصية والقيم
            الإسلامية. ابدأ رحلتك للعثور على شريك الحياة المناسب اليوم.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/auth/register"
              className="bg-primary text-white px-8 py-3 rounded-lg text-button-primary font-medium hover:bg-primary-hover hover:text-white transition-colors w-full sm:w-auto arabic-optimized"
            >
              ابدأ رحلتك الآن
            </Link>
            <Link
              href="#features"
              className="border border-primary text-primary px-8 py-3 rounded-lg text-button-primary font-medium hover:bg-primary hover:text-white transition-colors w-full sm:w-auto arabic-optimized"
            >
              تعرف على المميزات
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2 font-display">
                +1000
              </div>
              <div className="text-body text-text-secondary arabic-optimized">
                عضو مسجل
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary mb-2 font-display">
                +200
              </div>
              <div className="text-body text-text-secondary arabic-optimized">
                زواج ناجح
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2 font-display">
                %95
              </div>
              <div className="text-body text-text-secondary arabic-optimized">
                رضا المستخدمين
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
