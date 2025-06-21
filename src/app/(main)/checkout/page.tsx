'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { useCart } from "@/context/cart-context";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  address: z.string().min(5, { message: "Please enter a valid address." }),
  city: z.string().min(2, { message: "Please enter a valid city." }),
  zip: z.string().min(5, { message: "Please enter a valid ZIP code." }),
  card: z.string().length(16, { message: "Card number must be 16 digits." }),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Invalid expiry date (MM/YY)." }),
  cvc: z.string().length(3, { message: "CVC must be 3 digits." }),
});

export default function CheckoutPage() {
    const { toast } = useToast();
    const router = useRouter();
    const { cartItems, cartTotal, clearCart } = useCart();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "", email: "", address: "", city: "", zip: "", card: "", expiry: "", cvc: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("Order submitted:", { ...values, items: cartItems, total: cartTotal });
        clearCart();
        toast({
            title: "Order Placed!",
            description: "Thank you for your purchase. A confirmation has been sent to your email.",
        });
        router.push('/');
    }
    
    if (cartItems.length === 0) {
        return (
            <div className="container py-12 text-center">
                <h1 className="text-2xl font-semibold">Your cart is empty.</h1>
                <p className="text-muted-foreground mt-2">Add items to your cart before proceeding to checkout.</p>
                <Button asChild className="mt-4">
                    <Link href="/products">Return to Shopping</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="container py-12 max-w-4xl">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-headline">Checkout</h1>
                <p className="text-muted-foreground mt-2">Complete your order by providing the details below.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-start">
                <div>
                    <h2 className="text-2xl font-headline mb-4">Shipping & Payment</h2>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                             <FormField control={form.control} name="name" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                             <FormField control={form.control} name="email" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl><Input placeholder="you@example.com" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                             <FormField control={form.control} name="address" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl><Input placeholder="123 Paint St" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                            <div className="grid grid-cols-2 gap-4">
                                <FormField control={form.control} name="city" render={({ field }) => (
                                    <FormItem><FormLabel>City</FormLabel><FormControl><Input placeholder="Colorville" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <FormField control={form.control} name="zip" render={({ field }) => (
                                    <FormItem><FormLabel>ZIP Code</FormLabel><FormControl><Input placeholder="12345" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                            </div>
                            <Separator />
                            <h3 className="text-lg font-semibold">Payment Details</h3>
                             <FormField control={form.control} name="card" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Card Number</FormLabel>
                                    <FormControl><Input placeholder="•••• •••• •••• ••••" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                             <div className="grid grid-cols-2 gap-4">
                                <FormField control={form.control} name="expiry" render={({ field }) => (
                                    <FormItem><FormLabel>Expiry (MM/YY)</FormLabel><FormControl><Input placeholder="MM/YY" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <FormField control={form.control} name="cvc" render={({ field }) => (
                                    <FormItem><FormLabel>CVC</FormLabel><FormControl><Input placeholder="123" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                            </div>
                            <Button type="submit" size="lg" className="w-full">Place Order for ${cartTotal.toFixed(2)}</Button>
                        </form>
                    </Form>
                </div>
                <aside className="sticky top-24">
                    <Card>
                        <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex justify-between items-center text-sm">
                                    <p>{item.name} ({item.quantity})</p>
                                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                            <Separator/>
                            <div className="flex justify-between font-bold text-lg">
                                <p>Total</p>
                                <p>${cartTotal.toFixed(2)}</p>
                            </div>
                        </CardContent>
                    </Card>
                </aside>
            </div>
        </div>
    );
}
