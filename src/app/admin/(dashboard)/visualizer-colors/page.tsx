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
import type { VisualizerColor } from '@/lib/types';
import { PlusCircle, MoreHorizontal, FilePenLine, Trash2, Loader2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { deleteVisualizerColor, getVisualizerColors } from '@/services/visualizer-colors-service';
import { ColorForm } from './color-form';
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
} from "@/components/ui/alert-dialog";

export default function AdminVisualizerColorsPage() {
    const [colors, setColors] = useState<VisualizerColor[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingColor, setEditingColor] = useState<VisualizerColor | null>(null);
    const { toast } = useToast();

    const fetchColors = async () => {
        setIsLoading(true);
        try {
            const data = await getVisualizerColors();
            setColors(data);
        } catch (error) {
            console.error("Failed to fetch colors:", error);
            toast({ title: 'Error', description: 'Failed to load colors.', variant: 'destructive' });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchColors();
    }, []);
    
    const handleAddClick = () => {
        setEditingColor(null);
        setIsDialogOpen(true);
    };

    const handleEditClick = (color: VisualizerColor) => {
        setEditingColor(color);
        setIsDialogOpen(true);
    };

    const handleDelete = async (colorId: string) => {
        try {
            await deleteVisualizerColor(colorId);
            toast({ title: 'Success', description: 'Color deleted successfully.' });
            fetchColors();
        } catch (error) {
             toast({ title: 'Error', description: 'Failed to delete color.', variant: 'destructive' });
        }
    };

    const onFormSuccess = () => {
        setIsDialogOpen(false);
        fetchColors();
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Visualizer Colors</h1>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={handleAddClick}><PlusCircle className="mr-2 h-4 w-4"/>Add Color</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>{editingColor ? 'Edit Color' : 'Add New Color'}</DialogTitle>
                        </DialogHeader>
                        <ColorForm color={editingColor} onSuccess={onFormSuccess} />
                    </DialogContent>
                </Dialog>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Manage Visualizer Colors</CardTitle>
                    <CardDescription>A list of all colors available in the Color Visualizer tool.</CardDescription>
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
                                <TableHead className="w-[100px]">Preview</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Hex Code</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {colors.map((color) => (
                                <TableRow key={color.id}>
                                     <TableCell>
                                        <div className="w-8 h-8 rounded-full border" style={{backgroundColor: color.hex}}/>
                                    </TableCell>
                                    <TableCell className="font-medium">{color.name}</TableCell>
                                    <TableCell>{color.hex}</TableCell>
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
                                                    <DropdownMenuItem onSelect={() => handleEditClick(color)}>
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
                                                    This action cannot be undone. This will permanently delete this color.
                                                </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDelete(color.id)}>Continue</AlertDialogAction>
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
