'use client';
import { LayoutDashboard, Package, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from '@/components/ui/button';
import { PaintBucket } from 'lucide-react';

const adminNavLinks = [
    { href: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard /> },
    { href: "/admin/products", label: "Products", icon: <Package /> },
    { href: "/admin/orders", label: "Orders", icon: <ShoppingCart /> },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname();

    return (
        <SidebarProvider>
             <Sidebar>
                <SidebarHeader>
                    <div className="flex items-center gap-2 p-2">
                        <Button variant="ghost" size="icon" className="w-8 h-8" asChild>
                            <Link href="/">
                                <PaintBucket />
                            </Link>
                        </Button>
                        <h2 className="font-bold text-lg group-data-[collapsible=icon]:hidden">
                            Admin Panel
                        </h2>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarMenu>
                        {adminNavLinks.map(link => (
                            <SidebarMenuItem key={link.href}>
                                <SidebarMenuButton asChild isActive={pathname.startsWith(link.href)}>
                                    <Link href={link.href}>
                                        {link.icon}
                                        <span>{link.label}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarContent>
            </Sidebar>
            <main className="flex-1 bg-muted/40 p-4 md:p-6 lg:p-8">
                 <div className="md:hidden mb-4 flex items-center gap-4">
                    <SidebarTrigger />
                    <h1 className="font-semibold text-lg">Admin Menu</h1>
                </div>
                {children}
            </main>
        </SidebarProvider>
    )
}
