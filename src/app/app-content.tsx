'use client';
        
import { usePathname } from 'next/navigation';
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export function AppContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminRoute = pathname.startsWith('/admin');
    const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/signup');

    const showHeaderFooter = !isAdminRoute && !isAuthRoute;

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
