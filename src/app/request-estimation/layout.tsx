import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Free Paint Estimate - Get Your Project Quote",
  description: "Get a free, detailed estimate for your painting project. Professional assessment, transparent pricing, and custom quotes for interior and exterior painting services in Udaipur.",
  keywords: [
    "free paint estimate",
    "painting quote",
    "paint project cost",
    "painting estimate Udaipur",
    "paint cost calculator",
    "painting consultation",
    "interior painting estimate",
    "exterior painting estimate",
    "paint job quote",
    "painting contractor estimate",
    "professional painting quote",
    "custom paint estimate",
    "painting assessment",
    "paint project planning"
  ],
  openGraph: {
    title: "Free Paint Estimate - Get Your Project Quote | First Impression",
    description: "Get a free, detailed estimate for your painting project with transparent pricing and professional assessment.",
    images: [
      {
        url: "https://res.cloudinary.com/dfydjfauz/image/upload/v1754548771/apple-touch-icon_mwod6q.png",
        width: 1200,
        height: 630,
        alt: "First Impression Free Paint Estimate Service",
      },
    ],
  },
  twitter: {
    title: "Free Paint Estimate - Get Your Project Quote",
    description: "Get a free, detailed estimate for your painting project with transparent pricing.",
  },
};

export default function RequestEstimationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
