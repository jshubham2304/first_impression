import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://first-impression.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "/login", "/signup", "/account", "/_next/", "/favicon.ico"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
