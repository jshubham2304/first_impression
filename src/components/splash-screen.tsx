'use client';

import Image from 'next/image';

export function SplashScreen() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background absolute inset-0 z-50">
      <div className="animate-spin-slow">
        <Image
          src="https://res.cloudinary.com/dfydjfauz/image/upload/v1754548809/android-chrome-512x512_tuzxdw.png"
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
