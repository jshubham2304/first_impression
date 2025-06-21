'use client';
import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from 'react';
import { remoteConfig } from '@/lib/firebase';
import { fetchAndActivate, getString } from 'firebase/remote-config';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

const ADMIN_AUTH_KEY = 'admin_authed';

type AdminAuthContextType = {
    isAuthenticated: boolean;
    isLoading: boolean;
    checkPin: (pin: string) => Promise<boolean>;
    logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        try {
            const storedAuth = sessionStorage.getItem(ADMIN_AUTH_KEY);
            if (storedAuth === 'true') {
                setIsAuthenticated(true);
            }
        } catch (e) {
            console.error('Could not read from session storage', e);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const checkPin = useCallback(async (pin: string) => {
        const defaultPin = '230498'; // The default PIN from firebase.ts

        try {
            await fetchAndActivate(remoteConfig);
            const correctPin = getString(remoteConfig, 'admin_pin');
            
            // The correctPin will be the remote value, or the default '230498' if not set remotely.
            // An empty string can be returned if the default is not configured correctly or the remote value is empty.
            if (pin === correctPin && correctPin) {
                sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
                setIsAuthenticated(true);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error fetching remote config. Falling back to default PIN check.", error);
            // If remote config fails (e.g. no internet, misconfigured keys),
            // allow login with the hardcoded default PIN. This improves local dev experience.
            if (pin === defaultPin) {
                sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
                setIsAuthenticated(true);
                return true;
            }
            return false;
        }
    }, []);

    const logout = () => {
        try {
            sessionStorage.removeItem(ADMIN_AUTH_KEY);
        } catch (e) {
            console.error('Could not write to session storage', e);
        }
        setIsAuthenticated(false);
        router.push('/admin');
    }

    return (
        <AdminAuthContext.Provider value={{ isAuthenticated, isLoading, checkPin, logout }}>
            {children}
        </AdminAuthContext.Provider>
    );
};


export const useAdminAuth = () => {
    const context = useContext(AdminAuthContext);
    if (context === undefined) {
        throw new Error('useAdminAuth must be used within an AdminAuthProvider');
    }
    return context;
};

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading } = useAdminAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.replace('/admin');
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading || !isAuthenticated) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return <>{children}</>;
}
