import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { Providers } from "./providers";
import { AppContent } from "./app-content";

export const metadata: Metadata = {
  title: "First Impression",
  description: "Professional painting and design services to make a lasting impression.",
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
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-body antialiased"
        )}
      >
        <div className="fixed top-0 left-0 w-full h-full -z-20">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            src="https://res.cloudinary.com/dfydjfauz/video/upload/v1758109969/file00001_qfxbkg.mp4"
          />
        </div>
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 -z-10" />
        <Providers>
          <AppContent>{children}</AppContent>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
