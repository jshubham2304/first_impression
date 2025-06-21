'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Upload, Loader2 } from "lucide-react";
import { addEstimationRequest } from "@/services/estimation-service";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters.", }),
  email: z.string().email({ message: "Please enter a valid email address.", }),
  phone: z.string().optional(),
  address: z.string().min(5, { message: "Please enter a valid address.", }),
  description: z.string().min(20, { message: "Please describe your project in at least 20 characters.", }),
  photos: z.any().optional(),
});

export default function RequestEstimationPage() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { name: "", email: "", phone: "", address: "", description: "", },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        try {
            const { photos, ...estimationData } = values;
            const photoFile = photos?.[0];

            await addEstimationRequest(estimationData, photoFile);
            
            toast({
                title: "Estimate Request Sent!",
                description: "Thank you for your request. We will get back to you within 2 business days.",
            });
            form.reset();
        } catch (error) {
            console.error("Failed to submit estimation request:", error);
            toast({
                title: "Submission Failed",
                description: "There was an error sending your request. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="container py-12 max-w-3xl">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-4xl font-headline">Request an Estimate</CardTitle>
                    <CardDescription className="text-lg">
                        Tell us about your project, and we'll provide a custom quote.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid md:grid-cols-2 gap-6">
                                <FormField control={form.control} name="name" render={({ field }) => ( <FormItem> <FormLabel>Full Name</FormLabel> <FormControl> <Input placeholder="John Doe" {...field} /> </FormControl> <FormMessage /> </FormItem> )}/>
                                <FormField control={form.control} name="email" render={({ field }) => ( <FormItem> <FormLabel>Email Address</FormLabel> <FormControl> <Input placeholder="you@example.com" {...field} /> </FormControl> <FormMessage /> </FormItem> )}/>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <FormField control={form.control} name="phone" render={({ field }) => ( <FormItem> <FormLabel>Phone Number (Optional)</FormLabel> <FormControl> <Input placeholder="(123) 456-7890" {...field} /> </FormControl> <FormMessage /> </FormItem> )}/>
                                <FormField control={form.control} name="address" render={({ field }) => ( <FormItem> <FormLabel>Project Address</FormLabel> <FormControl> <Input placeholder="123 Paint St, Colorville" {...field} /> </FormControl> <FormMessage /> </FormItem> )}/>
                            </div>
                            <FormField control={form.control} name="description" render={({ field }) => ( <FormItem> <FormLabel>Project Description</FormLabel> <FormControl> <Textarea placeholder="e.g., I want to paint my living room (approx. 200 sq ft) and ceiling..." className="min-h-[120px]" {...field} /> </FormControl> <FormMessage /> </FormItem> )}/>
                            <FormField control={form.control} name="photos" render={({ field: { onChange, value, ...rest } }) => (
                                <FormItem>
                                    <FormLabel>Upload Photos</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input type="file" className="h-12 pl-12" accept="image/*" onChange={(e) => onChange(e.target.files)} {...rest} />
                                            <Upload className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"/>
                                        </div>
                                    </FormControl>
                                    <FormDescription>
                                        Attach photos of the area you intend to paint.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {isSubmitting ? 'Submitting...' : 'Submit Request'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
