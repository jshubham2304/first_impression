import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Professional Painting & Design Services in Udaipur - Expert Interior & Exterior Solutions",
  description: "Comprehensive painting and design services in Udaipur, Rajasthan. Expert interior/exterior painting, wall treatments, color consultation, and home renovation with premium Asian Paints products. Free estimates available.",
  keywords: [
    "painting services Udaipur",
    "interior painting Udaipur",
    "exterior painting Udaipur",
    "professional painters Udaipur",
    "paint contractor Udaipur",
    "painting company Udaipur",
    "wall painting Udaipur",
    "house painting Udaipur",
    "home renovation Udaipur",
    "color consultation Udaipur",
    "Asian Paints Udaipur",
    "residential painting Udaipur",
    "commercial painting Udaipur",
    "office painting Udaipur",
    "texture painting Udaipur",
    "decorative painting Udaipur",
    "architectural services Udaipur",
    "interior design Udaipur",
    "wall treatments Udaipur",
    "paint estimation Udaipur",
    "painting cost Udaipur",
    "best painters Udaipur",
    "professional painting services",
    "Rajasthan painting services"
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Professional Painting & Design Services in Udaipur | First Impression",
    description: "Expert interior & exterior painting services in Udaipur with premium Asian Paints products. Free color consultation, professional wall treatments, and exceptional craftsmanship for homes and offices.",
    url: "https://firstimpresssion.netlify.app/services",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dfydjfauz/image/upload/v1754548771/apple-touch-icon_mwod6q.png",
        width: 1200,
        height: 630,
        alt: "First Impression Professional Painting Services in Udaipur, Rajasthan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Painting Services in Udaipur | First Impression",
    description: "Expert interior & exterior painting in Udaipur | Free consultation | Premium Asian Paints | Call for free estimate",
    images: ["https://res.cloudinary.com/dfydjfauz/image/upload/v1754548771/apple-touch-icon_mwod6q.png"],
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
