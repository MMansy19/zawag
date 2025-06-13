"use client";

import Link from "next/link";

export function LandingHero() {
  return (
    <section className="bg-gradient-to-br from-primary/5 to-secondary/5 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-text mb-10 flex flex-col gap-3 justify-center items-center">
            <span>ابحث عن شريك حياتك</span>
            <span className="text-primary">وفق الشريعة الإسلامية</span>
          </h1>

          <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
            منصة آمنة وموثوقة للزواج الإسلامي مع مراعاة الخصوصية والقيم
            الإسلامية. ابدأ رحلتك للعثور على شريك الحياة المناسب اليوم.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/auth/register"
              className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-primary-hover hover:text-white transition-colors w-full sm:w-auto"
            >
              ابدأ رحلتك الآن
            </Link>
            <Link
              href="#features"
              className="border border-primary text-primary px-8 py-3 rounded-lg text-lg font-medium hover:bg-primary hover:text-white transition-colors w-full sm:w-auto"
            >
              تعرف على المميزات
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">+1000</div>
              <div className="text-text-secondary">عضو مسجل</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary mb-2">+200</div>
              <div className="text-text-secondary">زواج ناجح</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">%95</div>
              <div className="text-text-secondary">رضا المستخدمين</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
