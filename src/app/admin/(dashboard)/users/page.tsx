'use client';

import { useMemo } from 'react';
import { useOrders } from '@/context/order-context';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users as UsersIcon } from 'lucide-react';

type DisplayUser = {
    email: string;
    name: string;
    orderCount: number;
}

export default function AdminUsersPage() {
    const { orders } = useOrders();

    const users = useMemo(() => {
        if (!orders || orders.length === 0) {
            return [];
        }

        const userMap = new Map<string, DisplayUser>();

        orders.forEach(order => {
            const email = order.userEmail;
            if (userMap.has(email)) {
                const existingUser = userMap.get(email)!;
                existingUser.orderCount += 1;
            } else {
                // Attempt to find a name from the order items, fallback to email part
                const name = order.items[0]?.name || email.split('@')[0];
                userMap.set(email, {
                    email,
                    name: name, // Placeholder, as we don't have a central user name store
                    orderCount: 1,
                });
            }
        });

        return Array.from(userMap.values()).sort((a,b) => b.orderCount - a.orderCount);
    }, [orders]);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Customers</h1>
            <Card>
                <CardHeader>
                    <CardTitle>All Customers</CardTitle>
                    <CardDescription>A list of all customers who have placed an order.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead className="text-center">Total Orders</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.length > 0 ? (
                                users.map(user => (
                                    <TableRow key={user.email}>
                                        <TableCell className="font-medium flex items-center gap-3">
                                             <Avatar>
                                                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
                                                <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            <span className="capitalize">{user.name}</span>
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant="secondary">{user.orderCount}</Badge>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} className="h-24 text-center">
                                        <UsersIcon className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                                        No customers found yet.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
