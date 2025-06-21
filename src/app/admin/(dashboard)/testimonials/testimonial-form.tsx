'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import type { Testimonial } from "@/lib/types";
import { addTestimonial, updateTestimonial } from "@/services/testimonial-service";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  author: z.string().min(2, "Author name is too short"),
  comment: z.string().min(10, "Comment is too short"),
  priority: z.coerce.number().int().min(0, "Priority must be a positive number"),
  image: z.any().optional(),
});

type TestimonialFormProps = {
  testimonial?: Testimonial | null;
  onSuccess: () => void;
};

export function TestimonialForm({ testimonial, onSuccess }: TestimonialFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      author: testimonial?.author || '',
      comment: testimonial?.comment || '',
      priority: testimonial?.priority || 0,
      image: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const { image, ...data } = values;
      const imageFile = image?.[0];

      if (testimonial) {
        await updateTestimonial(testimonial.id, data, imageFile);
        toast({ title: 'Success', description: 'Testimonial updated successfully.' });
      } else {
        await addTestimonial(data, imageFile);
        toast({ title: 'Success', description: 'Testimonial added successfully.' });
      }
      onSuccess();
    } catch (error) {
      console.error("Form submission error:", error);
      toast({ title: 'Error', description: 'An error occurred.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author Name</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment</FormLabel>
              <FormControl><Textarea {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Priority</FormLabel>
              <FormControl><Input type="number" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
             <FormItem>
                <Label>Author Image (Optional)</Label>
                <FormControl>
                    <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files)} />
                </FormControl>
                 <FormMessage />
             </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {testimonial ? 'Save Changes' : 'Add Testimonial'}
        </Button>
      </form>
    </Form>
  );
}
