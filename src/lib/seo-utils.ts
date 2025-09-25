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

  // Best shop and dealer keywords
  const bestShopKeywords = [
    `best paint shop ${location}`,
    `best paint store ${location}`,
    `top paint shop ${location}`,
    `leading paint store ${location}`,
    `premium paint shop ${location}`,
    `best Asian Paints dealer ${location}`,
    `authorized Asian Paints dealer ${location}`,
    `top Asian Paints dealer ${location}`,
    `best Asian Paints store ${location}`,
    `official Asian Paints dealer ${location}`,
    `trusted Asian Paints dealer ${location}`,
    `certified Asian Paints dealer ${location}`,
    `Asian Paints authorized retailer ${location}`,
    `Asian Paints exclusive dealer ${location}`,
    `Asian Paints showroom ${location}`,
    `Asian Paints gallery ${location}`,
    `best paint dealer ${location}`,
    `top paint dealer ${location}`,
    `leading paint dealer ${location}`,
    `premium paint dealer ${location}`,
    `paint dealer near me`,
    `best paint shop near me`,
    `Asian Paints dealer near me`,
  ];

  // Quality and reputation keywords
  const qualityKeywords = [
    "best quality paints",
    "premium paint brands",
    "high quality paint store",
    "trusted paint shop",
    "reliable paint dealer",
    "experienced paint store",
    "professional paint supplier",
    "quality paint products",
    "authentic paint dealer",
    "genuine Asian Paints",
    "original paint products",
    "certified paint dealer",
    "licensed paint store",
    "established paint shop",
    "reputed paint dealer",
  ];

  // Service excellence keywords (USPs vs competitors)
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

    // Digital advantage over competitors
    "color visualization",
    "digital color picker",
    "virtual room painting",
    "color visualizer tool",
    "online color selection",
    "3D color preview",
    "augmented reality painting",
    "digital paint consultation",
    "virtual paint advisor",
    "AI color matching",
    "smart paint technology",
    "advanced color tools",

    // Professional services advantage
    "paint estimation",
    "free painting quote",
    "expert color consultation",
    "professional painting advice",
    "paint color matching",
    "custom color mixing",
    "paint technical support",
    "painting project consultation",
    "interior design consultation",
    "home makeover services",
    "office painting services",
    "villa painting services",
    "apartment painting services",
    "bungalow painting services",
    "farmhouse painting services",

    // Quality and experience advantage
    "10 years painting experience",
    "certified painting professionals",
    "skilled paint technicians",
    "expert paint applicators",
    "trained color consultants",
    "professional paint crew",
    "experienced paint contractors",
    "licensed painting company",
    "insured painting services",
    "guaranteed paint quality",
    "warranty painting work",
    "quality assured painting",
    "premium painting standards",
    "professional painting equipment",
    "modern painting techniques",
  ];

  // Product-specific keywords
  const productKeywords = [
    "emulsion paints",
    "enamel paints",
    "distemper paints",
    "primer paints",
    "wood finish paints",
    "metal paints",
    "waterproofing paints",
    "exterior wall paints",
    "interior wall paints",
    "ceiling paints",
    "bathroom paints",
    "kitchen paints",
    "living room paints",
    "bedroom paints",
    "office paints",
    "industrial paints",
    "weather shield paints",
    "apex paints",
    "royale paints",
    "tractor emulsion",
    "ace exterior",
    "apcolite premium",
  ];

  // Local competition keywords
  const competitiveKeywords = [
    `top 10 paint shops ${location}`,
    `best paint stores ${location}`,
    `paint shop ratings ${location}`,
    `paint dealer reviews ${location}`,
    `most trusted paint shop ${location}`,
    `popular paint store ${location}`,
    `recommended paint dealer ${location}`,
    `5 star paint shop ${location}`,
    `award winning paint store ${location}`,
    `customer favorite paint shop ${location}`,
    `better than Badala Paints ${location}`,
    `alternative to Badala Paints ${location}`,
    `paint shop vs Badala Paints`,
    `best paint dealer compared to Badala`,
    `professional paint service ${location}`,
    `premium paint dealer ${location}`,
    `expert color consultation ${location}`,
    `digital color visualizer ${location}`,
    `modern paint technology ${location}`,
    `advanced paint solutions ${location}`,
  ];

  // Business type keywords
  const businessKeywords = [
    "paint retail store",
    "paint wholesale dealer",
    "paint distribution center",
    "paint supply chain",
    "paint stockist",
    "paint merchant",
    "paint vendor",
    "paint supplier",
    "paint outlet",
    "paint emporium",
    "paint bazaar",
    "paint mart",
    "paint center",
    "paint hub",
    "paint world",
    "paint palace",
    "paint kingdom",
    "paint empire",
  ];

  return [
    ...baseKeywords,
    ...locationKeywords,
    ...bestShopKeywords,
    ...qualityKeywords,
    ...serviceKeywords,
    ...productKeywords,
    ...competitiveKeywords,
    ...businessKeywords,
  ];
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
