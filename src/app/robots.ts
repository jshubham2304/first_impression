import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://first-impression.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/services", "/products", "/visualizer", "/about", "/gallery", "/request-estimation"],
        disallow: [
          "/admin/",
          "/api/",
          "/login",
          "/signup",
          "/account",
          "/_next/",
          "/favicon.ico",
          "/private/",
          "*.json",
          "/admin",
          "/checkout",
          "/cart",
        ],
        crawlDelay: 1,
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin/", "/api/", "/private/"],
        crawlDelay: 0,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/admin/", "/api/", "/private/"],
        crawlDelay: 1,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
