'use client';

import Image from 'next/image';

export function SplashScreen() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background absolute inset-0 z-50 overflow-hidden">
      <div className="animate-splash">
        <Image
          src="https://res.cloudinary.com/dfydjfauz/image/upload/v1754548771/apple-touch-icon_mwod6q.png"
          alt="First Impression Logo"
          data-ai-hint="logo"
          width={128}
          height={128}
          priority
        />
      </div>
    </div>
  );
}
