import { Metadata } from "next";
import { LandingHero } from "@/components/landing/hero";
import { LandingFeatures } from "@/components/landing/features";
import { LandingTestimonials } from "@/components/landing/testimonials";
import { LandingStats } from "@/components/landing/stats";
import { LandingCTA } from "@/components/landing/cta";
import { LandingFooter } from "@/components/landing/footer";
import { LandingNavigation } from "@/components/landing/navigation";

export const metadata: Metadata = {
  title: "الصفحة الرئيسية",
  description:
    "منصة الزواج الإسلامية الآمنة والموثوقة للبحث عن شريك الحياة وفق الشريعة الإسلامية",
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <LandingNavigation />
      <LandingHero />
      <LandingFeatures />
      <LandingStats />
      <LandingTestimonials />
      <LandingCTA />
      <LandingFooter />
    </main>
  );
}
