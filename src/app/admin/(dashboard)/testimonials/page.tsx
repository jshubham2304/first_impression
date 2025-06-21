'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import type { Testimonial } from '@/lib/types';
import { PlusCircle, MoreHorizontal, FilePenLine, Trash2, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { deleteTestimonial, getTestimonials } from '@/services/testimonial-service';
import { TestimonialForm } from './testimonial-form';
import { useToast } from '@/hooks/use-toast';
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
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function AdminTestimonialsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
    const { toast } = useToast();

    const fetchTestimonials = async () => {
        setIsLoading(true);
        try {
            const data = await getTestimonials();
            setTestimonials(data);
        } catch (error) {
            console.error("Failed to fetch testimonials:", error);
            toast({ title: 'Error', description: 'Failed to load testimonials.', variant: 'destructive' });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);
    
    const handleAddClick = () => {
        setEditingTestimonial(null);
        setIsDialogOpen(true);
    };

    const handleEditClick = (testimonial: Testimonial) => {
        setEditingTestimonial(testimonial);
        setIsDialogOpen(true);
    };

    const handleDelete = async (testimonialId: string) => {
        try {
            await deleteTestimonial(testimonialId);
            toast({ title: 'Success', description: 'Testimonial deleted successfully.' });
            fetchTestimonials();
        } catch (error) {
             toast({ title: 'Error', description: 'Failed to delete testimonial.', variant: 'destructive' });
        }
    };

    const onFormSuccess = () => {
        setIsDialogOpen(false);
        fetchTestimonials();
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Testimonials</h1>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={handleAddClick}><PlusCircle className="mr-2 h-4 w-4"/>Add Testimonial</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>{editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}</DialogTitle>
                        </DialogHeader>
                        <TestimonialForm testimonial={editingTestimonial} onSuccess={onFormSuccess} />
                    </DialogContent>
                </Dialog>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Manage Testimonials</CardTitle>
                    <CardDescription>A list of all customer testimonials for the homepage.</CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                        </div>
                    ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Author</TableHead>
                                <TableHead>Comment</TableHead>
                                <TableHead>Priority</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {testimonials.map((testimonial) => (
                                <TableRow key={testimonial.id}>
                                    <TableCell className="font-medium flex items-center gap-3">
                                        <Avatar>
                                            {testimonial.imageUrl && <AvatarImage src={testimonial.imageUrl} alt={testimonial.author} />}
                                            <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        {testimonial.author}
                                    </TableCell>
                                    <TableCell className="max-w-[400px] truncate">{testimonial.comment}</TableCell>
                                    <TableCell>{testimonial.priority}</TableCell>
                                    <TableCell>
                                         <AlertDialog>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Toggle menu</span>
                                                </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem onSelect={() => handleEditClick(testimonial)}>
                                                        <FilePenLine className="mr-2 h-4 w-4"/>Edit
                                                    </DropdownMenuItem>
                                                     <AlertDialogTrigger asChild>
                                                        <DropdownMenuItem className="text-destructive" onSelect={(e) => e.preventDefault()}>
                                                            <Trash2 className="mr-2 h-4 w-4"/>Delete
                                                        </DropdownMenuItem>
                                                    </AlertDialogTrigger>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete this testimonial.
                                                </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDelete(testimonial.id)}>Continue</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
