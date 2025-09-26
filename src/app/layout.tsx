import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { Providers } from "./providers";
import { AppContent } from "./app-content";
import { ParticlesBackground } from "@/components/particles-background";
import { generateBrandSchema, generateFirstImpressionBusinessSchema } from "@/components/seo-head";

export const metadata: Metadata = {
  title: {
    default: "First Impression / First Impressions - Best Asian Paints & JSW Dealer in Udaipur | #1 Paint Store",
    template: "%s | First Impression / First Impressions - Best Asian Paints & JSW Dealer Udaipur"
  },
  description: "Transform your space with First Impression (formerly Badala Paints) - the premier Asian Paints and JSW dealer and professional painting services provider in Udaipur. 10+ years experience, advanced digital color visualizer, expert consultation, premium paint products, and certified professionals. Better than other competitors with modern technology and guaranteed quality. Get free estimates today!",
  keywords: [
    // First Impression brand keywords - both singular and plural
    "First Impression",
    "First Impressions",
    "First Impression Udaipur",
    "First Impressions Udaipur",
    "First Impression Painting Services",
    "First Impressions Painting Services",
    "First Impression Paint Store",
    "First Impressions Paint Store",
    "First Impression Asian Paints Dealer",
    "First Impressions Asian Paints Dealer",
    "First Impression Color Studio",
    "First Impressions Color Studio",
    "First Impression Rajasthan",
    "First Impressions Rajasthan",
    
    // Core services - both "painting" and "painter" variations
    "painting services Udaipur",
    "painter services Udaipur",
    "best painter service Udaipur",
    "best painting service Udaipur",
    "professional painters Udaipur",
    "professional painting Udaipur",
    "paint store Udaipur",
    "color consultation Udaipur",
    "interior painting Udaipur", 
    "exterior painting Udaipur",
    "interior painter Udaipur",
    "exterior painter Udaipur",
    "house painting Udaipur",
    "wall painting Udaipur",
    "paint contractor Udaipur",
    "painting company Udaipur",
    
    // Best shop and dealer keywords
    "best paint shop Udaipur",
    "best paint store Udaipur",
    "top paint shop Udaipur",
    "best Asian Paints dealer Udaipur",
    "authorized Asian Paints dealer Udaipur",
    "official Asian Paints dealer Udaipur",
    "trusted Asian Paints dealer Udaipur",
    "certified Asian Paints dealer Udaipur",
    "Asian Paints authorized retailer Udaipur",
    "Asian Paints showroom Udaipur",
    "best JSW dealer Udaipur",
    "authorized JSW dealer Udaipur",
    "JSW authorized retailer Udaipur",
    "JSW showroom Udaipur",
    "best paint dealer Udaipur",
    "top paint dealer Udaipur",
    "premium paint dealer Udaipur",
    "paint dealer near me",
    "best paint shop near me",
    "Asian Paints dealer near me",
    
    // Competitor keywords
    "First Impression vs other paint dealers",
    "better than other paint shops Udaipur",
    "alternative to traditional paint stores",
    
    // Hardware store keywords
    "hardware shop Udaipur",
    "paint hardware store Udaipur",
    "hardware store Udaipur",
    "paint and hardware Udaipur",
    "hardware shop near me",
    "paint hardware near me",
    
    // Paint brands & products
    "Asian Paints Udaipur",
    "premium paint products",
    "paint visualization",
    "color picker tool",
    "color matching services",
    "paint calculator",
    "color schemes",
    "genuine Asian Paints",
    "original paint products",
    "emulsion paints",
    "enamel paints",
    "weather shield paints",
    "apex paints",
    "royale paints",
    "tractor emulsion",
    
    // Quality and reputation
    "best quality paints",
    "premium paint brands",
    "trusted paint shop",
    "reliable paint dealer",
    "experienced paint store",
    "authentic paint dealer",
    "certified paint dealer",
    "established paint shop",
    "reputed paint dealer",
    
    // Home improvement
    "home improvement Udaipur",
    "residential painting",
    "commercial painting", 
    "office painting",
    "apartment painting",
    "villa painting",
    "bungalow painting",
    "farmhouse painting",
    
    // Local SEO & Competition
    "painters near me",
    "painting services near me",
    "Rajasthan painting services",
    "Udaipur home renovation",
    "Udaipur interior design",
    "top 10 paint shops Udaipur",
    "best paint stores Udaipur",
    "most trusted paint shop Udaipur",
    "5 star paint shop Udaipur",
    
    // Service types
    "design services",
    "paint estimate",
    "free painting quote",
    "professional painting consultation",
    "texture painting",
    "decorative painting",
    "expert color consultation",
    "custom color mixing",
    "paint technical support",
    "interior design consultation"
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
    google: "ADD_YOUR_GOOGLE_VERIFICATION_CODE_HERE",
    yandex: "ADD_YOUR_YANDEX_VERIFICATION_CODE_HERE", 
    yahoo: "ADD_YOUR_YAHOO_VERIFICATION_CODE_HERE",
  },
  openGraph: {
    title: "First Impression / First Impressions - Professional Painting & Design Services in Udaipur",
    description: "Transform your space with First Impression (First Impressions) - the premier Asian Paints dealer and professional painting services provider in Udaipur. Expert color consultation, digital visualization, and premium paint products. Better than Badala Paints with certified professionals who create lasting impressions.",
    url: "https://first-impression.com",
    siteName: "First Impression",
    images: [
      {
        url: "https://res.cloudinary.com/dfydjfauz/image/upload/v1754548771/apple-touch-icon_mwod6q.png",
        width: 1200,
        height: 630,
        alt: "First Impression - Premier Asian Paints Dealer and Professional Painting Services in Udaipur, Rajasthan",
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
    title: "First Impression / First Impressions - Professional Painting Services Udaipur",
    description: "🎨 Transform your space with First Impression (First Impressions) - premier Asian Paints dealer in Udaipur! ✨ Digital color visualization | Expert consultation | Premium paints | Professional painters | Better than Badala Paints | Creating lasting impressions",
    images: {
      url: "https://res.cloudinary.com/dfydjfauz/image/upload/v1754548771/apple-touch-icon_mwod6q.png",
      alt: "First Impression - Premier Asian Paints Dealer and Professional Painting Services in Udaipur",
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
              generateFirstImpressionBusinessSchema(),
              generateBrandSchema(),
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
