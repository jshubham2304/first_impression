import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Free Paint Estimate in Udaipur - Professional Painting Quote | First Impression",
  description: "Get a free, detailed painting estimate in Udaipur. Professional assessment, transparent pricing, and custom quotes for interior/exterior painting with Asian Paints. Request your quote today!",
  keywords: [
    "free paint estimate Udaipur",
    "painting quote Udaipur",
    "paint project cost Udaipur",
    "painting estimate Rajasthan",
    "paint cost calculator",
    "painting consultation Udaipur",
    "interior painting estimate",
    "exterior painting estimate", 
    "house painting quote",
    "commercial painting estimate",
    "paint job quote Udaipur",
    "painting contractor estimate",
    "professional painting quote",
    "custom paint estimate",
    "painting assessment Udaipur",
    "paint project planning",
    "Asian Paints estimate",
    "home painting cost",
    "office painting quote",
    "wall painting estimate",
    "free painting consultation",
    "paint price estimation",
    "residential painting quote"
  ],
  alternates: {
    canonical: "/request-estimation",
  },
  openGraph: {
    title: "Free Paint Estimate in Udaipur - Professional Painting Quote | First Impression",
    description: "Get a free, detailed painting estimate with transparent pricing and professional assessment. Custom quotes for interior/exterior painting using premium Asian Paints in Udaipur.",
    url: "https://first-impression.com/request-estimation",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dfydjfauz/image/upload/v1754548771/apple-touch-icon_mwod6q.png",
        width: 1200,
        height: 630,
        alt: "First Impression Free Paint Estimate Service in Udaipur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Paint Estimate in Udaipur | First Impression",
    description: "💰 Free detailed painting estimate | 📋 Transparent pricing | 🎨 Professional assessment | 📞 Get quote today",
    images: ["https://res.cloudinary.com/dfydjfauz/image/upload/v1754548771/apple-touch-icon_mwod6q.png"],
  },
};

export default function RequestEstimationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
