'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from "@/hooks/use-toast";
import type { VisualizerColor } from "@/lib/types";
import { addVisualizerColor, updateVisualizerColor } from "@/services/visualizer-colors-service";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, "Color name is too short"),
  hex: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Must be a valid hex color (e.g., #RRGGBB)"),
});

type ColorFormProps = {
  color?: VisualizerColor | null;
  onSuccess: () => void;
};

export function ColorForm({ color, onSuccess }: ColorFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: color?.name || '',
      hex: color?.hex || '#ffffff',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      if (color) {
        await updateVisualizerColor(color.id, values);
        toast({ title: 'Success', description: 'Color updated successfully.' });
      } else {
        await addVisualizerColor(values);
        toast({ title: 'Success', description: 'Color added successfully.' });
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color Name</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hex"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hex Code</FormLabel>
               <div className="flex items-center gap-2">
                    <FormControl><Input {...field} /></FormControl>
                    <div className="w-10 h-10 rounded border" style={{ backgroundColor: field.value }}/>
               </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {color ? 'Save Changes' : 'Add Color'}
        </Button>
      </form>
    </Form>
  );
}
