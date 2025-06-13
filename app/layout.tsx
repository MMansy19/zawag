import type { Metadata } from "next";
import { Noto_Kufi_Arabic, Amiri } from "next/font/google";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@/global.css";

const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-kufi-arabic",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "الزواج المبارك - منصة الزواج الإسلامية",
    template: "%s | الزواج المبارك",
  },
  description:
    "منصة الزواج الإسلامية الآمنة والموثوقة للبحث عن شريك الحياة وفق الشريعة الإسلامية",
  keywords: [
    "زواج إسلامي",
    "الزواج المبارك",
    "البحث عن شريك الحياة",
    "الزواج الحلال",
    "منصة الزواج",
    "Islamic marriage",
    "Muslim matrimony",
    "Halal marriage platform",
  ],
  authors: [{ name: "فريق الزواج المبارك" }],
  creator: "الزواج المبارك",
  publisher: "الزواج المبارك",
  metadataBase: new URL(
    process.env["NEXT_PUBLIC_APP_URL"] || "http://localhost:3000",
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "/",
    title: "الزواج المبارك - منصة الزواج الإسلامية",
    description:
      "منصة الزواج الإسلامية الآمنة والموثوقة للبحث عن شريك الحياة وفق الشريعة الإسلامية",
    siteName: "الزواج المبارك",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "الزواج المبارك - منصة الزواج الإسلامية",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "الزواج المبارك - منصة الزواج الإسلامية",
    description:
      "منصة الزواج الإسلامية الآمنة والموثوقة للبحث عن شريك الحياة وفق الشريعة الإسلامية",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  ...(process.env["GOOGLE_VERIFICATION_ID"] && {
    verification: {
      google: process.env["GOOGLE_VERIFICATION_ID"],
    },
  }),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${notoKufiArabic.variable} ${amiri.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-gradient-to-b from-primary-50 to-white font-arabic antialiased">
        <Providers>
          {children}
          <Toaster />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
