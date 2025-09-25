import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { Providers } from "./providers";
import { AppContent } from "./app-content";
import { ParticlesBackground } from "@/components/particles-background";

export const metadata: Metadata = {
  title: {
    default: "First Impression - Professional Painting & Design Services in Udaipur",
    template: "%s | First Impression - Expert Painting Services"
  },
  description: "Transform your space with First Impression's professional painting and design services in Udaipur. Expert color consultation, visualization tools, premium Asian Paints products, and exceptional craftsmanship for residential and commercial projects. Get free estimates today!",
  keywords: [
    // Core services
    "painting services Udaipur",
    "professional painters Udaipur",
    "paint store Udaipur",
    "color consultation Udaipur",
    "interior painting Udaipur", 
    "exterior painting Udaipur",
    "house painting Udaipur",
    "wall painting Udaipur",
    "paint contractor Udaipur",
    "painting company Udaipur",
    
    // Paint brands & products
    "Asian Paints Udaipur",
    "premium paint products",
    "paint visualization",
    "color picker tool",
    "color matching services",
    "paint calculator",
    "color schemes",
    
    // Home improvement
    "home improvement Udaipur",
    "residential painting",
    "commercial painting", 
    "office painting",
    "apartment painting",
    "villa painting",
    
    // Local SEO
    "painters near me",
    "painting services near me",
    "Rajasthan painting services",
    "Udaipur home renovation",
    "Udaipur interior design",
    
    // Service types
    "design services",
    "paint estimate",
    "free painting quote",
    "professional painting consultation",
    "texture painting",
    "decorative painting"
  ],
  authors: [{ name: "First Impression Team" }],
  creator: "First Impression - Professional Painting Services",
  publisher: "First Impression",
  classification: "Business Services",
  category: "Professional Painting Services",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://first-impression.com"),
  alternates: {
    canonical: "/",
    languages: {
      'en-US': '/en-US',
      'hi-IN': '/hi-IN',
    },
  },
  verification: {
    google: "your-google-site-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-site-verification-code",
  },
  openGraph: {
    title: "First Impression - Professional Painting & Design Services in Udaipur",
    description: "Transform your space with expert painting services, color consultation, and premium Asian Paints products in Udaipur. Get free estimates, visualize colors, and work with professional painters who deliver exceptional results.",
    url: "https://first-impression.com",
    siteName: "First Impression",
    images: [
      {
        url: "https://res.cloudinary.com/dfydjfauz/image/upload/v1754548771/apple-touch-icon_mwod6q.png",
        width: 1200,
        height: 630,
        alt: "First Impression - Professional Painting Services in Udaipur, Rajasthan",
      },
      {
        url: "https://res.cloudinary.com/dfydjfauz/video/upload/v1758109969/file00001_qfxbkg.mp4",
        width: 1200,
        height: 630,
        alt: "Professional Interior Painting Services - Room Transformation",
        type: "video/mp4",
      },
    ],
    locale: "en_US",
    type: "website",
    countryName: "India",
    emails: ["contact@first-impression.com"],
    phoneNumbers: ["+91-XXXXXXXXXX"],
    faxNumbers: [],
    alternateLocale: ["hi_IN"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@FirstImpressionPaint",
    creator: "@FirstImpressionPaint", 
    title: "First Impression - Professional Painting Services Udaipur",
    description: "🎨 Transform your space with expert painting services in Udaipur! ✨ Color consultation | Premium paints | Free estimates | Professional painters",
    images: {
      url: "https://res.cloudinary.com/dfydjfauz/image/upload/v1754548771/apple-touch-icon_mwod6q.png",
      alt: "First Impression - Professional Painting Services in Udaipur",
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "https://res.cloudinary.com/dfydjfauz/image/upload/v1754548771/apple-touch-icon_mwod6q.png",
    shortcut: "https://res.cloudinary.com/dfydjfauz/image/upload/v1754548771/apple-touch-icon_mwod6q.png",
    apple: "https://res.cloudinary.com/dfydjfauz/image/upload/v1754548771/apple-touch-icon_mwod6q.png",
  },
  manifest: "/manifest.json",
  category: "business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Performance and SEO Meta Tags */}
        <meta name="theme-color" content="#8B5CF6" />
        <meta name="msapplication-TileColor" content="#8B5CF6" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="First Impression" />
        <meta name="application-name" content="First Impression" />
        
        {/* DNS Prefetch for Performance */}
        <link rel="dns-prefetch" href="//res.cloudinary.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        
        {/* Preconnect for Critical Resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        
        {/* Font Loading with Display Swap */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400;0,700;1,400;1,700&family=Alegreya+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap" 
          rel="stylesheet" 
        />
        
        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "@id": "https://first-impression.com/#business",
                "name": "First Impression",
                "alternateName": "First Impression Painting Services",
                "logo": "https://res.cloudinary.com/dfydjfauz/image/upload/v1754548771/apple-touch-icon_mwod6q.png",
                "image": [
                  "https://res.cloudinary.com/dfydjfauz/image/upload/v1754548771/apple-touch-icon_mwod6q.png",
                  "https://res.cloudinary.com/dfydjfauz/video/upload/v1758109969/file00001_qfxbkg.mp4"
                ],
                "description": "Professional painting and design services in Udaipur, Rajasthan. Expert color consultation, visualization tools, premium Asian Paints products, and exceptional craftsmanship for residential and commercial projects.",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Udaipur",
                  "addressLocality": "Udaipur",
                  "addressRegion": "Rajasthan",
                  "postalCode": "313001",
                  "addressCountry": "IN"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": "24.5712",
                  "longitude": "73.6915"
                },
                "telephone": "+91-XXXXXXXXXX",
                "email": "contact@first-impression.com",
                "url": "https://first-impression.com",
                "foundingDate": "2020",
                "founder": {
                  "@type": "Organization",
                  "name": "First Impression Team"
                },
                "numberOfEmployees": "10-25",
                "priceRange": "$$",
                "currenciesAccepted": "INR",
                "paymentAccepted": "Cash, Card, UPI, Bank Transfer",
                "areaServed": [
                  {
                    "@type": "City",
                    "name": "Udaipur",
                    "containedInPlace": {
                      "@type": "State",
                      "name": "Rajasthan"
                    }
                  }
                ],
                "serviceArea": {
                  "@type": "GeoCircle",
                  "geoMidpoint": {
                    "@type": "GeoCoordinates",
                    "latitude": "24.5712",
                    "longitude": "73.6915"
                  },
                  "geoRadius": "50000"
                },
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Professional Painting Services",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "serviceType": "Interior Painting",
                        "name": "Interior Painting Services",
                        "description": "Professional interior painting services for homes, offices, and commercial spaces using premium paints and modern techniques.",
                        "provider": {
                          "@id": "https://first-impression.com/#business"
                        }
                      },
                      "priceRange": "₹15-50 per sq ft",
                      "availability": "InStock"
                    },
                    {
                      "@type": "Offer", 
                      "itemOffered": {
                        "@type": "Service",
                        "serviceType": "Exterior Painting",
                        "name": "Exterior Painting Services",
                        "description": "Weather-resistant exterior painting services for buildings, houses, and commercial properties with long-lasting finishes.",
                        "provider": {
                          "@id": "https://first-impression.com/#business"
                        }
                      },
                      "priceRange": "₹20-60 per sq ft",
                      "availability": "InStock"
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "serviceType": "Color Consultation",
                        "name": "Expert Color Consultation",
                        "description": "Professional color consultation and design services with digital visualization tools and expert advice.",
                        "provider": {
                          "@id": "https://first-impression.com/#business"
                        }
                      },
                      "priceRange": "₹500-2000",
                      "availability": "InStock"
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "serviceType": "Texture Painting",
                        "name": "Decorative Texture Painting",
                        "description": "Artistic texture and decorative painting services for unique wall finishes and aesthetic appeal.",
                        "provider": {
                          "@id": "https://first-impression.com/#business"
                        }
                      },
                      "priceRange": "₹25-80 per sq ft", 
                      "availability": "InStock"
                    }
                  ]
                },
                "openingHours": ["Mo-Sa 09:00-18:00"],
                "openingHoursSpecification": [
                  {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    "opens": "09:00",
                    "closes": "18:00"
                  }
                ],
                "sameAs": [
                  "https://www.google.com/maps/place/First+Impression",
                  "https://www.facebook.com/FirstImpressionPaints",
                  "https://www.instagram.com/first_impression_paints",
                  "https://www.youtube.com/@FirstImpressionPaints"
                ],
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.8",
                  "reviewCount": "150",
                  "bestRating": "5",
                  "worstRating": "1"
                },
                "slogan": "Creating Lasting First Impressions",
                "keywords": "painting services, interior painting, exterior painting, color consultation, Asian Paints, Udaipur painters, home painting, commercial painting"
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": "https://first-impression.com/#website",
                "url": "https://first-impression.com",
                "name": "First Impression - Professional Painting Services",
                "description": "Professional painting and design services in Udaipur with color visualization tools, expert consultation, and premium paint products.",
                "publisher": {
                  "@id": "https://first-impression.com/#business"
                },
                "potentialAction": [
                  {
                    "@type": "SearchAction",
                    "target": {
                      "@type": "EntryPoint",
                      "urlTemplate": "https://first-impression.com/products?search={search_term_string}"
                    },
                    "query-input": "required name=search_term_string"
                  }
                ],
                "inLanguage": "en-US"
              },
              {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://first-impression.com"
                  },
                  {
                    "@type": "ListItem", 
                    "position": 2,
                    "name": "Services",
                    "item": "https://first-impression.com/services"
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "Products",
                    "item": "https://first-impression.com/products"
                  },
                  {
                    "@type": "ListItem",
                    "position": 4,
                    "name": "Visualizer",
                    "item": "https://first-impression.com/visualizer"
                  }
                ]
              }
            ])
          }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-body antialiased"
        )}
      >
        <Providers>
          <AppContent>{children}</AppContent>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
