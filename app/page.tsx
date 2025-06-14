import { Metadata } from "next";
import { LandingHero } from "@/components/landing/hero";
import { LandingFeatures } from "@/components/landing/features";
import { LandingTestimonials } from "@/components/landing/testimonials";
import { LandingStats } from "@/components/landing/stats";
import { LandingCTA } from "@/components/landing/cta";
import { LandingContact } from "@/components/landing/contact";
import { LandingSocial } from "@/components/landing/social";
import { PublicLayout } from "@/components/layouts/public-layout";
import { CommonFAQ } from "@/components/common/faq";
import { landingPageFAQs } from "@/lib/constants/faq-data";
import { Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "الصفحة الرئيسية - ابحث عن شريك حياتك",
  description:
    "انضم إلى أكثر من 100,000 عضو في منصة الزواج الإسلامية الرائدة. ابحث عن شريك الحياة المناسب وفق الشريعة الإسلامية مع ضمان الأمان والخصوصية التامة. تسجيل مجاني.",
  keywords: [
    "زواج إسلامي مجاني",
    "البحث عن زوج",
    "البحث عن زوجة",
    "تطبيق الزواج المجاني",
    "موقع الزواج الإسلامي",
    "الزواج الحلال",
    "خطبة إسلامية",
  ],
  openGraph: {
    title: "الزواج السعيد - ابحث عن شريك حياتك وفق الشريعة الإسلامية",
    description: "أكثر من 100,000 عضو نشط. تسجيل مجاني. أمان وخصوصية تامة.",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "الزواج السعيد - منصة الزواج الإسلامية",
      },
    ],
  },
  twitter: {
    title: "الزواج السعيد - ابحث عن شريك حياتك",
    description: "أكثر من 100,000 عضو نشط. تسجيل مجاني. أمان وخصوصية تامة.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <PublicLayout>
      <main className="min-h-screen">
        <LandingHero />
        <LandingFeatures />
        <section id="stats">
          <LandingStats />
        </section>
        <LandingTestimonials />
        <section id="faq">
          <CommonFAQ
            faqs={landingPageFAQs}
            title="الأسئلة الشائعة"
            subtitle="هنا، نقدم لكم إجاباتٍ على الأسئلة التي قد تكون لديكم حول خدماتنا وكيفية استخدامها"
            helperText="يرجى النقر على السؤال لتظهر لك الإجابة."
            initialDisplayCount={5}
            showToggle={true}
            showContactButton={true}
            contactButtonText="تواصل معنا"
            contactButtonHref="#contact"
            contactButtonIcon={<Phone className="w-5 h-5" />}
            className=""
          />
        </section>
        <section id="contact">
          <LandingContact />
        </section>
        <section id="social">
          <LandingSocial />
        </section>
        <LandingCTA />
      </main>
    </PublicLayout>
  );
}
