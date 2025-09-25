import { Metadata } from "next";

// Base URL for the application
export const BASE_URL = "https://first-impression.com";

// Default SEO configuration
export const DEFAULT_SEO = {
  siteName: "First Impression",
  twitterHandle: "@FirstImpressionPaint",
  defaultImage: "https://res.cloudinary.com/dfydjfauz/image/upload/v1754548771/apple-touch-icon_mwod6q.png",
  businessName: "First Impression - Professional Painting Services",
  location: "Udaipur, Rajasthan",
};

// Generate metadata for pages
export function generateMetadata({
  title,
  description,
  keywords = [],
  path = "",
  image,
  noIndex = false,
  alternates,
}: {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
  image?: string;
  noIndex?: boolean;
  alternates?: {
    canonical?: string;
    languages?: Record<string, string>;
  };
}): Metadata {
  const url = `${BASE_URL}${path}`;
  const ogImage = image || DEFAULT_SEO.defaultImage;

  return {
    title: `${title} | ${DEFAULT_SEO.siteName}`,
    description,
    keywords: [
      ...keywords,
      "painting services Udaipur",
      "Asian Paints Udaipur",
      "professional painters",
      "interior painting",
      "exterior painting",
    ],
    alternates: {
      canonical: alternates?.canonical || url,
      languages: alternates?.languages,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      nocache: true,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: `${title} | ${DEFAULT_SEO.siteName}`,
      description,
      url,
      siteName: DEFAULT_SEO.siteName,
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} - ${DEFAULT_SEO.businessName}`,
        },
      ],
      locale: "en_US",
      countryName: "India",
    },
    twitter: {
      card: "summary_large_image",
      site: DEFAULT_SEO.twitterHandle,
      creator: DEFAULT_SEO.twitterHandle,
      title: `${title} | ${DEFAULT_SEO.siteName}`,
      description,
      images: [ogImage],
    },
  };
}

// Generate page-specific keywords for better SEO
export function generateKeywords(baseKeywords: string[], location = "Udaipur"): string[] {
  const locationKeywords = [
    `${location}`,
    `painting services ${location}`,
    `professional painters ${location}`,
    `Asian Paints ${location}`,
    `interior painting ${location}`,
    `exterior painting ${location}`,
    `paint store ${location}`,
    `color consultation ${location}`,
  ];

  const serviceKeywords = [
    "house painting",
    "wall painting",
    "commercial painting",
    "residential painting",
    "texture painting",
    "decorative painting",
    "paint contractor",
    "painting company",
    "premium paint products",
    "color visualization",
    "paint estimation",
    "free painting quote",
  ];

  return [...baseKeywords, ...locationKeywords, ...serviceKeywords];
}

// Generate service-specific metadata
export function generateServiceMetadata(service: {
  name: string;
  description: string;
  keywords?: string[];
  path?: string;
}): Metadata {
  const title = `${service.name} - Professional Services in Udaipur`;
  const keywords = generateKeywords(service.keywords || [], "Udaipur");

  return generateMetadata({
    title,
    description: service.description,
    keywords,
    path: service.path,
  });
}

// Generate product-specific metadata
export function generateProductMetadata(product: {
  name: string;
  description: string;
  brand?: string;
  keywords?: string[];
  path?: string;
}): Metadata {
  const title = `${product.name} ${product.brand ? `- ${product.brand}` : ""} | Premium Paint Products`;
  const keywords = generateKeywords([
    ...(product.keywords || []),
    product.brand || "Asian Paints",
    "paint products",
    "premium paint",
    "quality paint",
  ]);

  return generateMetadata({
    title,
    description: product.description,
    keywords,
    path: product.path,
  });
}

// SEO-friendly URL slug generator
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .trim();
}

// Generate breadcrumb data for structured markup
export function generateBreadcrumbs(paths: Array<{ name: string; href: string }>) {
  return paths.map((path, index) => ({
    name: path.name,
    url: `${BASE_URL}${path.href}`,
    position: index + 1,
  }));
}

// Common structured data generators
export const STRUCTURED_DATA = {
  organization: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}/#business`,
    name: DEFAULT_SEO.businessName,
    alternateName: "First Impression Painting Services",
    description: "Professional painting and design services in Udaipur, Rajasthan.",
    url: BASE_URL,
    telephone: "+91-XXXXXXXXXX",
    email: "contact@first-impression.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Udaipur",
      addressLocality: "Udaipur",
      addressRegion: "Rajasthan",
      postalCode: "313001",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "24.5712",
      longitude: "73.6915",
    },
    openingHours: ["Mo-Sa 09:00-18:00"],
    sameAs: [
      "https://www.facebook.com/FirstImpressionPaints",
      "https://www.instagram.com/first_impression_paints",
      "https://www.youtube.com/@FirstImpressionPaints",
    ],
  },

  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: DEFAULT_SEO.businessName,
    publisher: { "@id": `${BASE_URL}/#business` },
    inLanguage: "en-US",
  },
};
