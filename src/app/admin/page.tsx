'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAdminAuth } from '@/hooks/use-admin-auth';
import { Loader2, PaintBucket } from 'lucide-react';
import Link from 'next/link';

export default function AdminPinPage() {
    const [pin, setPin] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
    const { checkPin, isAuthenticated, isLoading: isAuthLoading } = useAdminAuth();

    useEffect(() => {
        if (!isAuthLoading && isAuthenticated) {
            router.replace('/admin/dashboard');
        }
    }, [isAuthenticated, isAuthLoading, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const isCorrect = await checkPin(pin);

        if (isCorrect) {
            toast({ title: 'Access Granted' });
            router.push('/admin/dashboard');
        } else {
            toast({
                title: 'Access Denied',
                description: 'The PIN you entered is incorrect.',
                variant: 'destructive',
            });
            setIsSubmitting(false);
            setPin('');
        }
    };
    
    if (isAuthLoading || isAuthenticated) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <Link href="/" className="mb-4 flex items-center justify-center space-x-2">
                        <PaintBucket className="h-7 w-7 text-primary" />
                        <span className="text-2xl font-bold font-headline">First Impression</span>
                    </Link>
                    <CardTitle className="text-2xl font-headline">Admin Access</CardTitle>
                    <CardDescription>Enter the 6-digit PIN to continue.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="pin">Admin PIN</Label>
                            <Input
                                id="pin"
                                type="password"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                maxLength={6}
                                required
                                className="text-center tracking-[1em]"
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={isSubmitting || pin.length !== 6}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Enter
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
