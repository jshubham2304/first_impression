import { VisualizerClient } from './client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Asian Paints Color Visualizer - Virtual Room Painting Tool | Udaipur",
  description: "Experience the most advanced Asian Paints color visualizer in Udaipur. Upload your room photo or try sample rooms to see thousands of colors in real-time. Perfect paint color selection tool for interior design.",
  keywords: [
    "Asian Paints color visualizer",
    "color visualizer Udaipur",
    "paint color tool Udaipur",
    "room color preview",
    "virtual room painting",
    "color picker tool",
    "paint colors online",
    "color schemes Udaipur",
    "interior design tool",
    "wall color simulator",
    "color matching Udaipur",
    "paint visualization tool",
    "color consultation online",
    "room design Udaipur",
    "paint preview tool",
    "digital color matching",
    "home color planning",
    "paint color simulator",
    "color selection tool",
    "interior color preview",
    "paint color app",
    "color design tool",
    "room makeover tool",
    "paint color checker"
  ],
  alternates: {
    canonical: "/visualizer",
  },
  openGraph: {
    title: "Asian Paints Color Visualizer - Virtual Room Painting Tool | First Impression",
    description: "Try thousands of Asian Paints colors in real-time with our advanced visualizer in Udaipur. Upload your room photo or use sample rooms to find perfect paint colors for your home.",
    url: "https://firstimpresssion.netlify.app/visualizer",
    type: "website", 
    images: [
      {
        url: "https://res.cloudinary.com/dfydjfauz/image/upload/v1754548771/apple-touch-icon_mwod6q.png",
        width: 1200,
        height: 630,
        alt: "First Impression Asian Paints Color Visualizer Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Asian Paints Color Visualizer - Virtual Room Painting | First Impression",
    description: "🎨 Try thousands of colors virtually | 📱 Upload your room photo | 🏠 See before you paint | 💡 Free color consultation",
    images: ["https://res.cloudinary.com/dfydjfauz/image/upload/v1754548771/apple-touch-icon_mwod6q.png"],
  },
};

export default function VisualizerPage() {
  return (
    <div className="container py-8 max-w-screen-2xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-headline font-bold">Color Visualizer</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Bring your vision to life. Select from thousands of Asian Paints colors to see them in a room.
        </p>
      </div>
      <VisualizerClient initialColors={[]} />
    </div>
  );
}
