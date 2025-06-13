import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env["NEXT_PUBLIC_APP_URL"] || "http://localhost:3000";

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/auth/register",
          "/auth/login",
          "/how-we-work",
          "/terms-privacy",
        ],
        disallow: [
          "/dashboard/",
          "/admin/",
          "/api/",
          "/auth/forgot-password",
          "/auth/verify-otp",
          "/profile/builder",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: [
          "/",
          "/auth/register",
          "/auth/login",
          "/how-we-work",
          "/terms-privacy",
        ],
        disallow: [
          "/dashboard/",
          "/admin/",
          "/api/",
          "/auth/forgot-password",
          "/auth/verify-otp",
          "/profile/builder",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
