'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DollarSign, Package, Users, ShoppingCart, Loader2 } from 'lucide-react';
import { useOrders } from '@/context/order-context';
import { getProducts } from '@/services/product-service';
import type { Order } from '@/lib/types';

type Stats = {
    totalRevenue: number;
    totalOrders: number;
    totalProducts: number;
    totalUsers: number;
}

export default function DashboardPage() {
    const { orders } = useOrders();
    const [stats, setStats] = useState<Stats>({ totalRevenue: 0, totalOrders: 0, totalProducts: 0, totalUsers: 0 });
    const [recentOrders, setRecentOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            if (!orders) {
                setIsLoading(false);
                return;
            };

            setIsLoading(true);
            try {
                const products = await getProducts();
                
                const totalRevenue = orders
                    .filter(order => order.status === 'Delivered')
                    .reduce((sum, order) => sum + order.total, 0);

                const totalOrders = orders.length;

                const totalProducts = products.length;

                const uniqueUsers = new Set(orders.map(order => order.userEmail));
                const totalUsers = uniqueUsers.size;

                setStats({
                    totalRevenue,
                    totalOrders,
                    totalProducts,
                    totalUsers
                });

                const sortedOrders = [...orders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setRecentOrders(sortedOrders.slice(0, 5));

            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [orders]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <p className="text-xs text-muted-foreground">From delivered orders</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Orders</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalOrders}</div>
                        <p className="text-xs text-muted-foreground">Total orders placed</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Products</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalProducts}</div>
                        <p className="text-xs text-muted-foreground">Total products available</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Customers</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalUsers}</div>
                        <p className="text-xs text-muted-foreground">Total unique customers</p>
                    </CardContent>
                </Card>
            </div>
             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-8">
                <Card className="lg:col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Orders</CardTitle>
                         <CardDescription>A list of the 5 most recent orders.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead className="hidden sm:table-cell">Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentOrders.map(order => (
                                <TableRow key={order.id}>
                                    <TableCell>
                                        <div className="font-medium">{order.shippingAddress.name}</div>
                                        <div className="hidden text-sm text-muted-foreground md:inline">{order.userEmail}</div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">{new Date(order.date).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Badge variant={order.status === 'Pending' ? 'secondary' : 'default'}
                                            className={order.status === 'Delivered' ? 'bg-green-600 text-white hover:bg-green-700' : ''}
                                        >{order.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                       </Table>
                    </CardContent>
                </Card>
                 <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Customers</CardTitle>
                        <CardDescription>Newest customers who placed an order.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <div className="space-y-4">
                        {recentOrders.map(order => (
                            <div key={order.id} className="flex items-center">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${order.shippingAddress.name}`} alt="Avatar" />
                                    <AvatarFallback>{order.shippingAddress.name.charAt(0).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">{order.shippingAddress.name}</p>
                                    <p className="text-sm text-muted-foreground">{order.userEmail}</p>
                                </div>
                                <div className="ml-auto font-medium">${order.total.toFixed(2)}</div>
                            </div>
                        ))}
                       </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
