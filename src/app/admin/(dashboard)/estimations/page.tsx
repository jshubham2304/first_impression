'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Trash2, FileText, User, Mail, Phone, Home } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getEstimations, deleteEstimationRequest } from '@/services/estimation-service';
import type { EstimationRequest } from '@/lib/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from '@/components/ui/separator';

export default function AdminEstimationsPage() {
    const [estimations, setEstimations] = useState<EstimationRequest[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    const fetchEstimations = async () => {
        setIsLoading(true);
        try {
            const data = await getEstimations();
            setEstimations(data);
        } catch (error) {
            toast({ title: 'Error', description: 'Failed to load estimation requests.', variant: 'destructive' });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEstimations();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await deleteEstimationRequest(id);
            toast({ title: 'Success', description: 'Estimation request deleted.' });
            fetchEstimations(); // Refresh list
        } catch (error) {
            toast({ title: 'Error', description: 'Failed to delete request.', variant: 'destructive' });
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Estimation Requests</h1>
            {estimations.length === 0 ? (
                <Card className="text-center py-16">
                    <CardContent className="flex flex-col items-center gap-4">
                        <FileText className="w-16 h-16 text-muted-foreground" />
                        <h2 className="text-2xl font-semibold">No Estimation Requests</h2>
                        <p className="text-muted-foreground">You have not received any estimation requests yet.</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-6">
                    {estimations.map((req) => (
                        <Card key={req.id}>
                            <CardHeader className="flex flex-row justify-between items-start">
                                <div>
                                    <CardTitle>Request from {req.name}</CardTitle>
                                    <CardDescription>
                                        Received on {new Date(req.createdAt).toLocaleString()}
                                    </CardDescription>
                                </div>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="destructive" size="icon"><Trash2 className="h-4 w-4"/></Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This will permanently delete this estimation request. This action cannot be undone.
                                        </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleDelete(req.id)}>Delete</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </CardHeader>
                            <CardContent className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h4 className="font-semibold text-lg">Contact Information</h4>
                                    <div className="flex items-center gap-3"><User className="h-4 w-4 text-muted-foreground" /><span>{req.name}</span></div>
                                    <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-muted-foreground" /><a href={`mailto:${req.email}`} className="text-primary hover:underline">{req.email}</a></div>
                                    {req.phone && <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-muted-foreground" /><span>{req.phone}</span></div>}
                                    <div className="flex items-center gap-3"><Home className="h-4 w-4 text-muted-foreground" /><span>{req.address}</span></div>
                                    <Separator className="my-4"/>
                                    <h4 className="font-semibold text-lg">Project Description</h4>
                                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{req.description}</p>
                                </div>
                                {req.photoUrl && (
                                    <div>
                                        <h4 className="font-semibold text-lg mb-4">Uploaded Photo</h4>
                                        <Link href={req.photoUrl} target="_blank" rel="noopener noreferrer">
                                            <Image
                                                src={req.photoUrl}
                                                alt="Uploaded project photo"
                                                width={400}
                                                height={300}
                                                className="rounded-lg object-cover w-full aspect-[4/3] border hover:opacity-80 transition-opacity"
                                            />
                                        </Link>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
