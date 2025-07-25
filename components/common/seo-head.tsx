import Head from "next/head";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  twitterTitle?: string;
  twitterDescription?: string;
  noindex?: boolean;
  keywords?: string[];
  structuredData?: object;
}

export function SEOHead({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage = "/og-image.svg",
  ogType = "website",
  twitterTitle,
  twitterDescription,
  noindex = false,
  keywords = [],
  structuredData,
}: SEOProps) {
  const baseUrl = process.env["NEXT_PUBLIC_APP_URL"];
  const fullTitle = title
    ? `${title} | الزواج السعيد`
    : "الزواج السعيد - منصة الزواج الإسلامية";
  const fullCanonical = canonical ? `${baseUrl}${canonical}` : baseUrl;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}

      <link rel="canonical" href={fullCanonical} />

      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={ogTitle || fullTitle} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={`${baseUrl}${ogImage}`} />
      <meta property="og:site_name" content="الزواج السعيد" />
      <meta property="og:locale" content="ar_SA" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content={twitterTitle || ogTitle || fullTitle}
      />
      <meta
        name="twitter:description"
        content={twitterDescription || ogDescription || description}
      />
      <meta name="twitter:image" content={`${baseUrl}${ogImage}`} />
      <meta name="twitter:site" content="@zawaj_platform" />

      {/* Additional Meta Tags */}
      <meta name="author" content="فريق الزواج السعيد" />
      <meta name="publisher" content="الزواج السعيد" />
      <meta name="application-name" content="الزواج السعيد" />
      <meta name="apple-mobile-web-app-title" content="الزواج السعيد" />

      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}
    </Head>
  );
}
