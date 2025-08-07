'use client';
        
import { usePathname } from 'next/navigation';
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useState, useEffect } from 'react';
import { SplashScreen } from '@/components/splash-screen';

export function AppContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isAppLoading, setIsAppLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAppLoading(false);
        }, 2000); // Show splash screen for 2 seconds

        return () => clearTimeout(timer);
    }, []);
    
    const isAdminRoute = pathname.startsWith('/admin');
    const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/signup');

    const showHeaderFooter = !isAdminRoute && !isAuthRoute;

    if (isAppLoading) {
        return <SplashScreen />;
    }

    if (showHeaderFooter) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
            </div>
        );
    }

    return <>{children}</>;
}
