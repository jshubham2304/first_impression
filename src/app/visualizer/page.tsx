import { VisualizerClient } from './client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Color Visualizer - See Your Perfect Paint Color",
  description: "Try thousands of Asian Paints colors in real-time with our advanced color visualizer. Upload your room photo or use our sample rooms to find your perfect paint color scheme.",
  keywords: [
    "color visualizer",
    "paint color tool",
    "room color preview",
    "Asian Paints colors",
    "color picker",
    "paint colors online",
    "color schemes",
    "interior design tool",
    "wall color simulator",
    "color matching",
    "paint visualization",
    "color consultation",
    "room design",
    "paint preview"
  ],
  openGraph: {
    title: "Color Visualizer - See Your Perfect Paint Color | First Impression",
    description: "Try thousands of Asian Paints colors in real-time. Upload your room photo or use our sample rooms to find your perfect paint color scheme.",
    images: [
      {
        url: "https://res.cloudinary.com/dfydjfauz/image/upload/v1754548771/apple-touch-icon_mwod6q.png",
        width: 1200,
        height: 630,
        alt: "First Impression Color Visualizer Tool",
      },
    ],
  },
  twitter: {
    title: "Color Visualizer - See Your Perfect Paint Color",
    description: "Try thousands of Asian Paints colors in real-time with our advanced color visualizer tool.",
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
