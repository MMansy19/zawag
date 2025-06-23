import type { Metadata } from "next";
import { Noto_Kufi_Arabic, Amiri } from "next/font/google";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@/global.css";

// Optimized font loading for Arabic text
const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic", "latin"],
  variable: "--font-noto-kufi-arabic",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "sans-serif"],
});

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
  preload: true,
  style: ["normal", "italic"],
  fallback: ["Times New Roman", "serif"],
});

export const metadata: Metadata = {
  title: {
    default:
      "الزواج السعيد - منصة الزواج الإسلامية الآمنة | البحث عن شريك الحياة",
    template: "%s | الزواج السعيد - منصة الزواج الإسلامية",
  },
  description:
    "منصة الزواج الإسلامية الرائدة في المنطقة العربية. ابحث عن شريك الحياة المناسب وفق الشريعة الإسلامية مع ضمان الأمان والخصوصية التامة. أكثر من 100,000 عضو نشط.",
  keywords: [
    "زواج إسلامي",
    "الزواج السعيد",
    "البحث عن شريك الحياة",
    "الزواج الحلال",
    "منصة الزواج الإسلامية",
    "زواج مسلم",
    "تطبيق الزواج",
    "موقع الزواج",
    "الزواج الشرعي",
    "Islamic marriage",
    "Muslim matrimony",
    "Halal marriage platform",
    "Muslim dating",
    "Islamic wedding",
    "Zawaj",
    "نكاح",
    "خطبة",
    "الخطوبة",
    "الزفاف الإسلامي",
  ],
  authors: [{ name: "فريق الزواج السعيد", url: "https://zawaj.com" }],
  creator: "الزواج السعيد",
  publisher: "الزواج السعيد",
  applicationName: "الزواج السعيد",
  category: "Social",
  classification: "Islamic Marriage Platform",
  metadataBase: new URL(
    process.env["NEXT_PUBLIC_APP_URL"] || "http://localhost:3000",
  ),
  alternates: {
    canonical: "/",
    languages: {
      "ar-SA": "/",
      ar: "/",
      en: "/en",
    },
  },
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png", sizes: "120x120" },
      { url: "/favicon.svg", type: "image/svg+xml", sizes: "120x120" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#5d1a78" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "/",
    title: "الزواج السعيد - منصة الزواج الإسلامية الآمنة والموثوقة",
    description:
      "انضم إلى أكثر من 100,000 عضو في منصة الزواج الإسلامية الرائدة. ابحث عن شريك الحياة المناسب وفق الشريعة الإسلامية مع ضمان الأمان والخصوصية التامة.",
    siteName: "الزواج السعيد",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "الزواج السعيد - منصة الزواج الإسلامية الآمنة والموثوقة",
        type: "image/svg+xml",
      },
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "الزواج السعيد - منصة الزواج الإسلامية",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Al_Zawaj_",
    creator: "@Al_Zawaj_",
    title: "الزواج السعيد - منصة الزواج الإسلامية الآمنة",
    description:
      "ابحث عن شريك الحياة المناسب وفق الشريعة الإسلامية. أكثر من 100,000 عضو نشط. آمان وخصوصية تامة.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "الزواج السعيد",
    "application-name": "الزواج السعيد",
    "msapplication-TileColor": "#5d1a78",
    "theme-color": "#5d1a78",
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
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["WebSite", "ReligiousOrganization"],
    name: "الزواج السعيد",
    alternateName: "Zawaj Platform",
    description:
      "منصة الزواج الإسلامية الآمنة والموثوقة للبحث عن شريك الحياة وفق الشريعة الإسلامية",
    url: process.env["NEXT_PUBLIC_APP_URL"] || "http://localhost:3000",
    logo: {
      "@type": "ImageObject",
      url: `${process.env["NEXT_PUBLIC_APP_URL"] || "http://localhost:3000"}/logo.png`,
      width: "100",
      height: "120",
    },
    sameAs: [
      "https://www.facebook.com/Al.Zawaj2",
      "https://www.youtube.com/@Al-Zawaj",
      "https://www.tiktok.com/@alzawaj.alsaeid",
      "https://x.com/Al_Zawaj_",
      "https://alzawajalsaeid.com/",
    ],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${process.env["NEXT_PUBLIC_APP_URL"] || "http://localhost:3000"}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "الزواج السعيد",
      logo: {
        "@type": "ImageObject",
        url: `${process.env["NEXT_PUBLIC_APP_URL"] || "http://localhost:3000"}/logo.png`,
      },
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+21695765691",
      contactType: "customer service",
      availableLanguage: ["Arabic", "العربية"],
    },
    founder: {
      "@type": "Organization",
      name: "فريق الزواج السعيد",
    },
    foundingDate: "2024",
    knowsAbout: [
      "Islamic Marriage",
      "Muslim Matrimony",
      "Halal Relationships",
      "Islamic Values",
      "Marriage in Islam",
    ],
    audience: {
      "@type": "Audience",
      audienceType: "Muslim Singles",
      geographicArea: "Middle East, North Africa",
    },
    offers: {
      "@type": "Offer",
      name: "Islamic Marriage Platform Membership",
      description: "عضوية مجانية في منصة الزواج الإسلامية",
      price: "0",
      priceCurrency: "USD",
      availability: "InStock",
    },
  };

  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${notoKufiArabic.variable} ${amiri.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Font Preloading for Better Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Preload Critical Local Fonts */}
        <link
          rel="preload"
          href="/fonts/Noto_Kufi_Arabic/static/NotoKufiArabic-Regular.ttf"
          as="font"
          type="font/truetype"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Noto_Kufi_Arabic/static/NotoKufiArabic-Medium.ttf"
          as="font"
          type="font/truetype"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Amiri/Amiri-Regular.ttf"
          as="font"
          type="font/truetype"
          crossOrigin="anonymous"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className="min-h-screen bg-background font-arabic arabic-optimized antialiased">
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
