'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useOrders } from '@/context/order-context';
import type { Order } from '@/lib/types';
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ClipboardCopy, User, ShoppingCart, Truck } from 'lucide-react';

function OrderDetailsDialog({ order, isOpen, onOpenChange, onStatusChange }: { order: Order | null; isOpen: boolean; onOpenChange: (open: boolean) => void; onStatusChange: (orderId: string, status: Order['status']) => void; }) {
    if (!order) return null;

    const { toast } = useToast();

    const handleCopyToClipboard = () => {
        if (order?.id) {
            navigator.clipboard.writeText(order.id);
            toast({ title: 'Copied!', description: 'Order ID copied to clipboard.' });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center">
                        Order Details
                        <Badge variant="secondary" className="ml-3">#{order.id.slice(0, 8)}</Badge>
                        <Button variant="ghost" size="icon" className="ml-2 h-7 w-7" onClick={handleCopyToClipboard}>
                            <ClipboardCopy className="h-4 w-4" />
                        </Button>
                    </DialogTitle>
                    <DialogDescription>
                        Placed on {new Date(order.date).toLocaleDateString()}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid md:grid-cols-2 gap-6 py-4">
                    <div className="space-y-4">
                        <Card>
                             <CardHeader className="flex flex-row items-center space-x-3 space-y-0 pb-2">
                                <User className="h-5 w-5 text-muted-foreground" />
                                <CardTitle className="text-lg">Customer</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="font-medium capitalize">{order.shippingAddress?.name || order.userEmail.split('@')[0]}</p>
                                <p className="text-sm text-muted-foreground">{order.userEmail}</p>
                            </CardContent>
                        </Card>
                        {order.shippingAddress && (
                            <Card>
                                <CardHeader className="flex flex-row items-center space-x-3 space-y-0 pb-2">
                                    <Truck className="h-5 w-5 text-muted-foreground" />
                                    <CardTitle className="text-lg">Shipping Address</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="font-medium">{order.shippingAddress.name}</p>
                                    <p className="text-sm text-muted-foreground">{order.shippingAddress.address}</p>
                                    <p className="text-sm text-muted-foreground">{order.shippingAddress.city}, {order.shippingAddress.zip}</p>
                                    <p className="text-sm text-muted-foreground mt-2">{order.shippingAddress.email}</p>
                                    {order.shippingAddress.phone && <p className="text-sm text-muted-foreground">{order.shippingAddress.phone}</p>}
                                </CardContent>
                            </Card>
                        )}
                         <Card>
                             <CardHeader className="flex flex-row items-center space-x-3 space-y-0 pb-2">
                                <ShoppingCart className="h-5 w-5 text-muted-foreground" />
                                <CardTitle className="text-lg">Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                 <div className="flex justify-between">
                                    <span className="text-muted-foreground">Status</span>
                                    <Badge variant={order.status === 'Pending' ? 'secondary' : 'default'}
                                        className={order.status === 'Delivered' ? 'bg-green-600 text-white hover:bg-green-700' : ''}
                                    >{order.status}</Badge>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span className="text-muted-foreground">Total</span>
                                    <span className="font-semibold">${order.total.toFixed(2)}</span>
                                </div>
                            </CardContent>
                        </Card>
                        <div>
                             <h4 className="font-medium mb-2">Update Status</h4>
                             <Select
                                defaultValue={order.status}
                                onValueChange={(newStatus: Order['status']) => onStatusChange(order.id, newStatus)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Change status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="Shipped">Shipped</SelectItem>
                                    <SelectItem value="Delivered">Delivered</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Items ({order.items.length})</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {order.items.map(item => (
                                <div key={item.id}>
                                    <div className="flex items-center space-x-4">
                                        <Image src={item.imageUrl} alt={item.name} data-ai-hint={item.imageHint} width={64} height={64} className="rounded-md aspect-square object-cover border" />
                                        <div>
                                            <p className="font-semibold">{item.name}</p>
                                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                            <p className="text-sm text-muted-foreground">Color: {item.variant.name}</p>
                                        </div>
                                        <p className="ml-auto font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                    <Separator className="mt-4"/>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </DialogContent>
        </Dialog>
    );
}


export default function AdminOrdersPage() {
    const { orders, updateOrderStatus } = useOrders();
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const { toast } = useToast();

    const sortedOrders = [...orders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    const handleStatusChange = (orderId: string, status: Order['status']) => {
        updateOrderStatus(orderId, status);
        setSelectedOrder(prev => prev ? { ...prev, status } : null);
        toast({
            title: "Status Updated",
            description: `Order #${orderId.slice(0, 8)} marked as ${status}.`
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                 <h1 className="text-3xl font-bold">All Orders</h1>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Customer Orders</CardTitle>
                    <CardDescription>A list of all orders placed by customers. Click a row to see details.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sortedOrders.length > 0 ? sortedOrders.map(order => (
                                <TableRow key={order.id} onClick={() => setSelectedOrder(order)} className="cursor-pointer">
                                    <TableCell className="font-medium">#{order.id.slice(0, 8)}</TableCell>
                                    <TableCell>{order.shippingAddress?.name || order.userEmail}</TableCell>
                                    <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Badge 
                                            variant={order.status === 'Pending' ? 'secondary' : 'default'}
                                            className={order.status === 'Delivered' ? 'bg-green-600 text-white hover:bg-green-700' : ''}
                                        >
                                            {order.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center h-24">No orders found.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <OrderDetailsDialog
                isOpen={!!selectedOrder}
                onOpenChange={(isOpen) => !isOpen && setSelectedOrder(null)}
                order={selectedOrder}
                onStatusChange={handleStatusChange}
            />
        </div>
    );
}
