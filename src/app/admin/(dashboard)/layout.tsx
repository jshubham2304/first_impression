'use client';
import { LayoutDashboard, LogOut, Package, ShoppingCart, MessageSquareText, Palette, Settings, Users, FileText } from 'lucide-react';
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
import { AdminAuthGuard, useAdminAuth } from '@/hooks/use-admin-auth';

const adminNavLinks = [
    { href: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard /> },
    { href: "/admin/products", label: "Products", icon: <Package /> },
    { href: "/admin/orders", label: "Orders", icon: <ShoppingCart /> },
    { href: "/admin/estimations", label: "Estimations", icon: <FileText /> },
    { href: "/admin/users", label: "Users", icon: <Users /> },
    { href: "/admin/testimonials", label: "Testimonials", icon: <MessageSquareText /> },
    { href: "/admin/visualizer-colors", label: "Visualizer Colors", icon: <Palette /> },
    { href: "/admin/configuration", label: "Configuration", icon: <Settings /> },
];

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { logout } = useAdminAuth();

    return (
        <SidebarProvider>
             <Sidebar>
                <SidebarHeader>
                    <div className="flex items-center justify-between p-2">
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="w-8 h-8" asChild>
                                <Link href="/">
                                    <PaintBucket />
                                </Link>
                            </Button>
                            <h2 className="font-bold text-lg group-data-[collapsible=icon]:hidden">
                                Admin Panel
                            </h2>
                        </div>
                        <Button variant="ghost" size="icon" className="w-8 h-8 group-data-[collapsible=icon]:hidden" onClick={logout}>
                            <LogOut />
                        </Button>
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


export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
   return (
       <AdminAuthGuard>
           <AdminLayoutContent>{children}</AdminLayoutContent>
       </AdminAuthGuard>
   )
}
