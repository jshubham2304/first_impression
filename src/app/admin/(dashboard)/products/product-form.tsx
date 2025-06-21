'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/lib/types";
import { addProduct, updateProduct } from "@/services/product-service";
import { Loader2, PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const variantSchema = z.object({
  name: z.string().min(1, "Variant name is required"),
  hex: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Must be a valid hex color (e.g., #RRGGBB)"),
});

const formSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  brand: z.string().min(2, "Brand is too short"),
  category: z.enum(['Interior', 'Exterior', 'Texture', 'Wood']),
  price: z.coerce.number().min(0.01, "Price must be positive"),
  description: z.string().min(10, "Description is too short"),
  finish: z.enum(['Matte', 'Satin', 'Semi-Gloss', 'Gloss']),
  colorFamily: z.enum(['Reds', 'Blues', 'Greens', 'Yellows', 'Neutrals', 'Whites']),
  isActive: z.boolean().default(true),
  image: z.any().optional(),
  variants: z.array(variantSchema).min(1, "At least one color variant is required."),
});

type ProductFormProps = {
  product?: Product | null;
  onSuccess: () => void;
};

const productCategories = ['Interior', 'Exterior', 'Texture', 'Wood'] as const;

export function ProductForm({ product, onSuccess }: ProductFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product?.name || '',
      brand: product?.brand || '',
      category: product?.category || 'Interior',
      price: product?.price || 0,
      description: product?.description || '',
      finish: product?.finish || 'Satin',
      colorFamily: product?.colorFamily || 'Neutrals',
      isActive: product?.isActive ?? true,
      image: undefined,
      variants: product?.variants && product.variants.length > 0 ? product.variants : [{ name: 'Default', hex: '#ffffff' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const { image, ...productData } = values;
      const imageFile = image?.[0];

      if (product) {
        await updateProduct(product.id, productData, imageFile);
        toast({ title: 'Success', description: 'Product updated successfully.' });
      } else {
        if (!imageFile) {
            form.setError('image', { type: 'manual', message: 'An image is required for a new product.' });
            setIsSubmitting(false);
            return;
        }
        await addProduct(productData, imageFile);
        toast({ title: 'Success', description: 'Product added successfully.' });
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4 max-h-[80vh] overflow-y-auto pr-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
            <FormField control={form.control} name="brand" render={({ field }) => ( <FormItem><FormLabel>Brand</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
            <FormField control={form.control} name="category" render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger></FormControl>
                  <SelectContent>{productCategories.map(c => (<SelectItem key={c} value={c}>{c}</SelectItem>))}</SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}/>
        </div>
        <FormField control={form.control} name="price" render={({ field }) => ( <FormItem><FormLabel>Price</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem> )}/>
        <FormField control={form.control} name="description" render={({ field }) => ( <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem> )}/>
        <div className="grid grid-cols-2 gap-4">
          <FormField control={form.control} name="finish" render={({ field }) => (
              <FormItem>
                <FormLabel>Finish</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Select a finish" /></SelectTrigger></FormControl>
                  <SelectContent>{['Matte', 'Satin', 'Semi-Gloss', 'Gloss'].map(f => (<SelectItem key={f} value={f}>{f}</SelectItem>))}</SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
          )}/>
          <FormField control={form.control} name="colorFamily" render={({ field }) => (
              <FormItem>
                <FormLabel>Color Family</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Select a color family" /></SelectTrigger></FormControl>
                  <SelectContent>{['Reds', 'Blues', 'Greens', 'Yellows', 'Neutrals', 'Whites'].map(cf => (<SelectItem key={cf} value={cf}>{cf}</SelectItem>))}</SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
          )}/>
        </div>
        
        <FormField control={form.control} name="image" render={({ field }) => ( <FormItem><Label>Product Image</Label><FormControl><Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files)} /></FormControl><FormMessage /></FormItem> )}/>
        
        <Card>
          <CardHeader><CardTitle>Color Variants</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-end gap-2 p-2 border rounded-md">
                <FormField control={form.control} name={`variants.${index}.name`} render={({ field }) => (<FormItem className="flex-grow"><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage/></FormItem>)}/>
                <FormField control={form.control} name={`variants.${index}.hex`} render={({ field }) => (<FormItem><FormLabel>Hex</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage/></FormItem>)}/>
                <div className="w-8 h-10 rounded" style={{ backgroundColor: form.watch(`variants.${index}.hex`) }} />
                <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}><Trash2 className="h-4 w-4"/></Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={() => append({ name: '', hex: '#000000' })}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Variant
            </Button>
             <FormMessage>{form.formState.errors.variants?.message}</FormMessage>
          </CardContent>
        </Card>

        <FormField control={form.control} name="isActive" render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5"><FormLabel>Active</FormLabel><FormDescription>Inactive products will be hidden from the store.</FormDescription></div>
            <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
            </FormItem>
        )}/>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {product ? 'Save Changes' : 'Add Product'}
        </Button>
      </form>
    </Form>
  );
}
