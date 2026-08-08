import { Metadata } from "next";

// Base URL for the application
export const BASE_URL = "https://firstimpresssion.netlify.app";

// Default SEO configuration
export const DEFAULT_SEO = {
  siteName: "First Impression",
  twitterHandle: "@FirstImpressionPaint",
  defaultImage: "https://res.cloudinary.com/dfydjfauz/image/upload/v1754548771/apple-touch-icon_mwod6q.png",
  businessName: "First Impression - Professional Painting Services",
  location: "Udaipur, Rajasthan",
  tagline: "Creating Lasting First Impressions",
  brandKeywords: [
    // Singular and plural variations
    "First Impression",
    "First Impressions",
    "First Impression Painting Services",
    "First Impressions Painting Services",
    "First Impression Paint Store",
    "First Impressions Paint Store",
    "First Impression Asian Paints Dealer",
    "First Impressions Asian Paints Dealer",
    "First Impression Color Studio",
    "First Impressions Color Studio",
    "First Impression Udaipur",
    "First Impressions Udaipur",
    "First Impression Rajasthan",
    "First Impressions Rajasthan",
  ],
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
      ...DEFAULT_SEO.brandKeywords,
      ...keywords,
      // Core services - both "painting" and "painter" variations
      "painting services Udaipur",
      "painter services Udaipur",
      "best painter service Udaipur",
      "best painting service Udaipur",
      "professional painters Udaipur",
      "professional painting Udaipur",
      "Asian Paints Udaipur",
      "JSW Paints Udaipur",
      "interior painting",
      "exterior painting",
      "interior painter",
      "exterior painter",
      "best paint shop Udaipur",
      "authorized Asian Paints dealer",
      "authorized JSW dealer",
      "color consultation Udaipur",
      // Competitor keywords
      "First Impression vs other paint dealers",
      "better than other paint shops Udaipur",
      "alternative to traditional paint stores",
      "Best Asian Paints Dealer Udaipur",
      "Best JSW Paints Dealer Udaipur",
      // Hardware store keywords
      "hardware shop Udaipur",
      "paint hardware store Udaipur",
      "hardware store Udaipur",
      "paint and hardware Udaipur",
      "hardware shop near me",
      "paint hardware near me",
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
  // First Impression brand keywords - both singular and plural
  const firstImpressionKeywords = [
    "First Impression",
    "First Impressions",
    `First Impression ${location}`,
    `First Impressions ${location}`,
    "First Impression Painting Services",
    "First Impressions Painting Services",
    "First Impression Paint Store",
    "First Impressions Paint Store",
    "First Impression Asian Paints Dealer",
    "First Impressions Asian Paints Dealer",
    "First Impression Color Studio",
    "First Impressions Color Studio",
    `First Impression ${location} painting services`,
    `First Impressions ${location} painting services`,
    `First Impression ${location} paint store`,
    `First Impressions ${location} paint store`,
    `First Impression ${location} Asian Paints dealer`,
    `First Impressions ${location} Asian Paints dealer`,
  ];

  const locationKeywords = [
    `${location}`,
    `painting services ${location}`,
    `painter services ${location}`,
    `professional painters ${location}`,
    `professional painting ${location}`,
    `Asian Paints ${location}`,
    `JSW Paints ${location}`,
    `interior painting ${location}`,
    `exterior painting ${location}`,
    `interior painter ${location}`,
    `exterior painter ${location}`,
    `paint store ${location}`,
    `color consultation ${location}`,
    `hardware shop ${location}`,
    `paint hardware ${location}`,
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
    `best JSW dealer ${location}`,
    `authorized JSW dealer ${location}`,
    `top JSW dealer ${location}`,
    `JSW authorized retailer ${location}`,
    `JSW showroom ${location}`,
    `best paint dealer ${location}`,
    `top paint dealer ${location}`,
    `leading paint dealer ${location}`,
    `premium paint dealer ${location}`,
    `paint dealer near me`,
    `best paint shop near me`,
    `Asian Paints dealer near me`,
    // Competitor keywords
    `First Impression vs other paint dealers ${location}`,
    `alternative to traditional paint stores ${location}`,
    `better than other paint shops ${location}`,
    `paint dealer competitor ${location}`,
    // Hardware store keywords
    `hardware shop ${location}`,
    `paint hardware store ${location}`,
    `hardware store ${location}`,
    `paint and hardware ${location}`,
    `hardware shop near me`,
    `paint hardware near me`,
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
    `better than other paint shops ${location}`,
    `alternative to traditional paint stores ${location}`,
    `paint shop vs traditional stores`,
    `best paint dealer compared to others`,
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
    ...firstImpressionKeywords,
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
  const title = `${service.name} - First Impression Professional Services in Udaipur`;
  const keywords = generateKeywords(service.keywords || [], "Udaipur");

  return generateMetadata({
    title,
    description: `First Impression offers ${service.description}. Professional painting services with expert consultation and premium Asian Paints products in Udaipur, Rajasthan.`,
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
  const title = `${product.name} ${
    product.brand ? `- ${product.brand}` : ""
  } | First Impression Premium Paint Products`;
  const keywords = generateKeywords([
    ...(product.keywords || []),
    product.brand || "Asian Paints",
    "paint products",
    "premium paint",
    "quality paint",
    "First Impression paint products",
    "First Impression authorized dealer",
  ]);

  return generateMetadata({
    title,
    description: `First Impression offers ${product.description}. Authorized Asian Paints dealer providing premium paint products with professional consultation in Udaipur, Rajasthan.`,
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
    alternateName: [
      "First Impression Painting Services",
      "First Impression Paint Store",
      "First Impression Asian Paints Dealer",
      "First Impression Color Studio",
    ],
    description:
      "First Impression is Udaipur's leading Asian Paints dealer and professional painting services provider. We offer expert color consultation, digital visualization tools, premium paint products, and certified painting professionals for residential and commercial projects.",
    url: BASE_URL,
    telephone: "+919653790999",
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
    priceRange: "$$",
    paymentAccepted: "Cash, Card, UPI, Bank Transfer",
    currenciesAccepted: "INR",
    slogan: DEFAULT_SEO.tagline,
    foundingDate: "2020",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "150",
      bestRating: "5",
    },
    award: [
      "Best Asian Paints Dealer Udaipur",
      "Top Paint Store Rajasthan",
      "Most Trusted Paint Dealer",
      "Digital Color Technology Leader",
    ],
    sameAs: ["https://www.instagram.com/hitu1682"],
  },

  brand: {
    "@context": "https://schema.org",
    "@type": "Brand",
    "@id": `${BASE_URL}/#brand`,
    name: "First Impression",
    alternateName: [
      "First Impression Painting Services",
      "First Impression Paint Store",
      "First Impression Asian Paints Dealer",
      "First Impression Color Studio",
    ],
    description:
      "First Impression is the premier Asian Paints dealer and professional painting services provider in Udaipur, Rajasthan. We specialize in color consultation, digital visualization, and expert painting services for residential and commercial projects.",
    url: BASE_URL,
    logo: DEFAULT_SEO.defaultImage,
    slogan: DEFAULT_SEO.tagline,
    founder: {
      "@type": "Organization",
      name: "First Impression Team",
    },
    foundingDate: "2020",
    knowsAbout: [
      "Professional Painting Services",
      "Color Consultation",
      "Digital Color Visualization",
      "Asian Paints Products",
      "Interior Design",
      "Exterior Painting",
      "Texture Painting",
      "Commercial Painting",
      "Residential Painting",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "150",
      bestRating: "5",
    },
    award: [
      "Best Asian Paints Dealer Udaipur",
      "Top Paint Store Rajasthan",
      "Certified Painting Professionals",
      "Digital Color Technology Leader",
      "Most Trusted Paint Dealer Udaipur",
    ],
  },

  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: DEFAULT_SEO.businessName,
    description:
      "First Impression - Professional painting and design services with digital color visualization tools, expert consultation, and premium Asian Paints products in Udaipur, Rajasthan.",
    publisher: { "@id": `${BASE_URL}/#business` },
    inLanguage: "en-US",
    potentialAction: [
      {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE_URL}/products?search={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    ],
    sameAs: ["https://www.instagram.com/hitu1682"],
  },
};
