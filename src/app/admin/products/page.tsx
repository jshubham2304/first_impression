'use client';
import { useState } from 'react';
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
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { products as initialProducts } from '@/lib/data';
import type { Product } from '@/lib/types';
import { PlusCircle, MoreHorizontal, FilePenLine, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { v4 as uuidv4 } from 'uuid';

export default function AdminProductsPage() {
    const [allProducts, setAllProducts] = useState<Product[]>(initialProducts);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
    // State for new product form
    const [newProductName, setNewProductName] = useState('');
    const [newProductBrand, setNewProductBrand] = useState('');
    const [newProductPrice, setNewProductPrice] = useState('');

    const handleAddProduct = () => {
        const newProduct: Product = {
            id: uuidv4(),
            name: newProductName,
            brand: newProductBrand,
            price: parseFloat(newProductPrice) || 0,
            imageUrl: 'https://placehold.co/600x600.png',
            imageHint: 'new product',
            description: 'A newly added product.',
            finish: 'Satin',
            colorFamily: 'Neutrals',
            popularity: 0,
            reviews: [],
            variants: [{ name: 'Default', hex: '#FFFFFF' }],
        };

        setAllProducts(prev => [...prev, newProduct]);
        
        // Reset form and close dialog
        setNewProductName('');
        setNewProductBrand('');
        setNewProductPrice('');
        setIsDialogOpen(false);
    };
    
    const handleDeleteProduct = (productId: string) => {
        setAllProducts(prev => prev.filter(p => p.id !== productId));
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Products</h1>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button><PlusCircle className="mr-2 h-4 w-4"/>Add Product</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                        <DialogTitle>Add New Product</DialogTitle>
                        <DialogDescription>
                            Fill in the details for the new product. Click save when you're done.
                        </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">Name</Label>
                                <Input id="name" value={newProductName} onChange={(e) => setNewProductName(e.target.value)} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="brand" className="text-right">Brand</Label>
                                <Input id="brand" value={newProductBrand} onChange={(e) => setNewProductBrand(e.target.value)} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="price" className="text-right">Price</Label>
                                <Input id="price" type="number" value={newProductPrice} onChange={(e) => setNewProductPrice(e.target.value)} className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleAddProduct}>Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Product List</CardTitle>
                    <CardDescription>A list of all available products in your store.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="hidden w-[100px] sm:table-cell">Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Brand</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {allProducts.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="hidden sm:table-cell">
                                        <Image
                                            alt={product.name}
                                            className="aspect-square rounded-md object-cover"
                                            height="64"
                                            src={product.imageUrl}
                                            data-ai-hint={product.imageHint}
                                            width="64"
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">{product.name}</TableCell>
                                    <TableCell>{product.brand}</TableCell>
                                    <TableCell>${product.price.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                            <Button aria-haspopup="true" size="icon" variant="ghost">
                                                <MoreHorizontal className="h-4 w-4" />
                                                <span className="sr-only">Toggle menu</span>
                                            </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem><FilePenLine className="mr-2 h-4 w-4"/>Edit</DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteProduct(product.id)}>
                                                <Trash2 className="mr-2 h-4 w-4"/>Delete
                                            </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
