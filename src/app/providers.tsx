'use client';

import { AdminAuthProvider } from '@/hooks/use-admin-auth';
import { AuthProvider } from '@/context/auth-context';
import { CartProvider } from '@/context/cart-context';
import { OrderProvider } from '@/context/order-context';
import type { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AdminAuthProvider>
        <AuthProvider>
            <CartProvider>
                <OrderProvider>
                {children}
                </OrderProvider>
            </CartProvider>
        </AuthProvider>
    </AdminAuthProvider>
  );
}
