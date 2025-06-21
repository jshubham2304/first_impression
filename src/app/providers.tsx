'use client';

import { AdminAuthProvider } from '@/hooks/use-admin-auth';
import { AuthProvider } from '@/context/auth-context';
import { CartProvider } from '@/context/cart-context';
import { OrderProvider } from '@/context/order-context';
import type { ReactNode } from 'react';
import { SiteSettingsProvider } from '@/context/settings-context';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AdminAuthProvider>
        <AuthProvider>
            <SiteSettingsProvider>
                <CartProvider>
                    <OrderProvider>
                    {children}
                    </OrderProvider>
                </CartProvider>
            </SiteSettingsProvider>
        </AuthProvider>
    </AdminAuthProvider>
  );
}
