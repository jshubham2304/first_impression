import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { Providers } from "./providers";
import { AppContent } from "./app-content";
import { ParticlesBackground } from "@/components/particles-background";

export const metadata: Metadata = {
  title: {
    default: "First Impression - Professional Painting & Design Services",
    template: "%s | First Impression"
  },
  description: "Transform your space with First Impression's professional painting and design services. Expert color consultation, visualization tools, premium paint products, and exceptional craftsmanship for residential and commercial projects.",
  keywords: [
    "painting services",
    "paint store",
    "color consultation",
    "interior painting",
    "exterior painting",
    "home improvement",
    "paint visualization",
    "color picker",
    "Asian Paints",
    "professional painters",
    "residential painting",
    "commercial painting",
    "paint products",
    "color schemes",
    "wall painting",
    "house painting",
    "paint contractor",
    "design services",
    "color matching",
    "paint estimate"
  ],
  authors: [{ name: "First Impression Team" }],
  creator: "First Impression",
  publisher: "First Impression",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://first-impression.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "First Impression - Professional Painting & Design Services",
    description: "Transform your space with expert painting services, color consultation, and premium paint products. Visualize your perfect color scheme today!",
    url: "https://first-impression.com",
    siteName: "First Impression",
    images: [
      {
        url: "https://res.cloudinary.com/dfydjfauz/image/upload/v1754548771/apple-touch-icon_mwod6q.png",
        width: 1200,
        height: 630,
        alt: "First Impression - Professional Painting Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "First Impression - Professional Painting & Design Services",
    description: "Transform your space with expert painting services and color consultation. Visualize your perfect color scheme today!",
    images: ["https://res.cloudinary.com/dfydjfauz/image/upload/v1754548771/apple-touch-icon_mwod6q.png"],
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400;0,700;1,400;1,700&family=Alegreya+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "First Impression",
              "image": "https://res.cloudinary.com/dfydjfauz/image/upload/v1754548771/apple-touch-icon_mwod6q.png",
              "description": "Professional painting and design services in Udaipur. Expert color consultation, visualization tools, premium paint products, and exceptional craftsmanship for residential and commercial projects.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Udaipur",
                "addressLocality": "Udaipur",
                "addressRegion": "Rajasthan",
                "addressCountry": "IN"
              },
              "telephone": "+91-XXXXXXXXXX",
              "url": "https://first-impression.com",
              "priceRange": "$$",
              "serviceArea": {
                "@type": "City",
                "name": "Udaipur"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Painting Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Interior Painting",
                      "description": "Professional interior painting services"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Exterior Painting",
                      "description": "Professional exterior painting services"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Color Consultation",
                      "description": "Expert color consultation and design services"
                    }
                  }
                ]
              },
              "openingHours": "Mo-Sa 09:00-18:00",
              "sameAs": [
                "https://www.google.com/business/",
                "https://www.facebook.com/",
                "https://www.instagram.com/"
              ]
            })
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
