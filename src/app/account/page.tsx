'use client';

import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, Package, Truck, User as UserIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useOrders } from '@/context/order-context';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

function AccountDetails() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!user) return null;

  return (
     <CardContent className="space-y-6 pt-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
            <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <Button onClick={handleLogout} variant="destructive">
          <LogOut className="mr-2 h-4 w-4" />
          Log Out
        </Button>
    </CardContent>
  )
}

function OrderHistory() {
    const { user } = useAuth();
    const { getOrdersForUser } = useOrders();

    const userOrders = useMemo(() => {
        if (!user) return [];
        return getOrdersForUser(user.email).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [user, getOrdersForUser]);

    if (!user) return null;

    if (userOrders.length === 0) {
        return (
            <CardContent className="text-center py-16">
                <Package className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No orders found</h3>
                <p className="mt-1 text-sm text-muted-foreground">You haven't placed any orders yet.</p>
            </CardContent>
        )
    }

    return (
        <CardContent className="space-y-4 pt-6">
            {userOrders.map(order => (
                <Card key={order.id}>
                    <CardHeader className="flex flex-row justify-between items-center">
                        <div>
                            <CardTitle className="text-lg">Order #{order.id.slice(0, 8)}</CardTitle>
                            <CardDescription>
                                Placed on {new Date(order.date).toLocaleDateString()}
                            </CardDescription>
                        </div>
                        <div className="text-right">
                           <p className="font-semibold">${order.total.toFixed(2)}</p>
                            <Badge variant={order.status === 'Pending' ? 'secondary' : 'default'} className="mt-1">
                                {order.status}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4 pt-4">
                            <h4 className="font-semibold">Items</h4>
                            {order.items.map(item => (
                                <div key={item.id} className="flex items-center space-x-4">
                                    <Image src={item.imageUrl} alt={item.name} data-ai-hint={item.imageHint} width={64} height={64} className="rounded-md aspect-square object-cover" />
                                    <div>
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="ml-auto font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                        
                        {order.shippingAddress && (
                            <>
                                <Separator className="my-4" />
                                <div>
                                    <h4 className="font-semibold mb-2 flex items-center">
                                        <Truck className="mr-2 h-4 w-4 text-muted-foreground" />
                                        Shipping To
                                    </h4>
                                    <div className="text-sm text-muted-foreground rounded-md border p-4 bg-muted/50">
                                        <p className="font-medium text-foreground">{order.shippingAddress.name}</p>
                                        <p>{order.shippingAddress.address}</p>
                                        <p>{order.shippingAddress.city}, {order.shippingAddress.zip}</p>
                                        {order.shippingAddress.phone && <p className="mt-1">{order.shippingAddress.phone}</p>}
                                    </div>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            ))}
        </CardContent>
    )
}

export default function AccountPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
        <div className="container py-12 max-w-4xl">
            <Skeleton className="h-10 w-48 mb-8" />
            <Card>
                <CardHeader>
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-64" />
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                    <div className="flex items-center space-x-4">
                        <Skeleton className="h-16 w-16 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-4 w-40" />
                        </div>
                    </div>
                     <Skeleton className="h-10 w-32" />
                </CardContent>
            </Card>
        </div>
    );
  }

  return (
    <div className="container py-12 max-w-4xl">
        <h1 className="text-4xl font-headline font-bold mb-8">My Account</h1>
        <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account"><UserIcon className="mr-2 h-4 w-4" />Account Details</TabsTrigger>
                <TabsTrigger value="orders"><Package className="mr-2 h-4 w-4" />Order History</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
                <Card>
                    <CardHeader>
                        <CardTitle>Profile</CardTitle>
                        <CardDescription>View and manage your account details.</CardDescription>
                    </CardHeader>
                    <AccountDetails />
                </Card>
            </TabsContent>
            <TabsContent value="orders">
                <Card>
                    <CardHeader>
                        <CardTitle>My Orders</CardTitle>
                        <CardDescription>Review your past orders.</CardDescription>
                    </CardHeader>
                    <OrderHistory />
                </Card>
            </TabsContent>
        </Tabs>
    </div>
  );
}
