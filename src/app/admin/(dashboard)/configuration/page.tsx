'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2, PlusCircle, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getProductAttributes, updateProductAttributes, getSiteSettings, updateSiteSettings } from '@/services/configuration-service';
import type { ProductAttributes } from '@/lib/types';
import { Checkbox } from '@/components/ui/checkbox';
import { useSiteSettings } from '@/context/settings-context';
import { Skeleton } from '@/components/ui/skeleton';

function AttributeManager({ title, items, onSave }: { title: string; items: string[]; onSave: (newItems: string[]) => Promise<void> }) {
    const [currentItems, setCurrentItems] = useState(items);
    const [newItem, setNewItem] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setCurrentItems(items);
    }, [items]);

    const handleAddItem = () => {
        const trimmedNewItem = newItem.trim();
        if (trimmedNewItem && !currentItems.some(item => item.toLowerCase() === trimmedNewItem.toLowerCase())) {
            const updatedItems = [...currentItems, trimmedNewItem];
            setCurrentItems(updatedItems);
            setNewItem('');
        }
    };

    const handleRemoveItem = (itemToRemove: string) => {
        setCurrentItems(currentItems.filter(item => item !== itemToRemove));
    };
    
    const handleSave = async () => {
        setIsSaving(true);
        try {
            await onSave(currentItems);
        } catch (error) {
             console.error(`Failed to save ${title}`, error);
        } finally {
            setIsSaving(false);
        }
    };
    
    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddItem();
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>Add or remove items from the list. Click "Save Changes" to apply.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {currentItems.map((item, index) => (
                        <div key={`${item}-${index}`} className="flex items-center justify-between p-2 rounded-md border">
                            <span>{item}</span>
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleRemoveItem(item)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>
                    ))}
                </div>
                <div className="flex gap-2 mt-4">
                    <Input 
                        value={newItem} 
                        onChange={e => setNewItem(e.target.value)} 
                        onKeyDown={handleInputKeyDown}
                        placeholder={`New ${title.slice(0, -1)}...`} 
                    />
                    <Button onClick={handleAddItem}><PlusCircle className="mr-2 h-4 w-4"/> Add</Button>
                </div>
                 <Button onClick={handleSave} className="mt-4" disabled={isSaving}>
                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                    Save Changes
                </Button>
            </CardContent>
        </Card>
    );
}

function NavigationSettings() {
    const { settings, setSettings, isLoading, allPossibleLinks } = useSiteSettings();
    const [isSaving, setIsSaving] = useState(false);
    const [localVisibleLinks, setLocalVisibleLinks] = useState<string[]>([]);
    const { toast } = useToast();

    useEffect(() => {
        if (settings) {
            setLocalVisibleLinks(settings.visibleLinks);
        }
    }, [settings]);

    const handleCheckedChange = (label: string, checked: boolean | 'indeterminate') => {
        setLocalVisibleLinks(prev => 
            checked ? [...prev, label] : prev.filter(l => l !== label)
        );
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const newSettings = { visibleLinks: localVisibleLinks };
            await updateSiteSettings(newSettings);
            if (setSettings) {
              setSettings(newSettings);
            }
            toast({ title: 'Success', description: 'Navigation links updated.' });
        } catch (error) {
            toast({ title: 'Error', description: 'Failed to save settings.', variant: 'destructive' });
        } finally {
            setIsSaving(false);
        }
    };
    
    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Navigation Menu Links</CardTitle>
                     <CardDescription>Select which links to show in the main site header.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-32" />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Navigation Menu Links</CardTitle>
                <CardDescription>Select which links to show in the main site header.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {allPossibleLinks.map(link => (
                        <div key={link.href} className="flex items-center space-x-3">
                            <Checkbox 
                                id={`link-${link.label}`}
                                checked={localVisibleLinks.includes(link.label)}
                                onCheckedChange={(checked) => handleCheckedChange(link.label, !!checked)}
                            />
                            <label htmlFor={`link-${link.label}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                {link.label}
                            </label>
                        </div>
                    ))}
                </div>
                 <Button onClick={handleSave} className="mt-6" disabled={isSaving}>
                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                    Save Nav Links
                </Button>
            </CardContent>
        </Card>
    );
}

export default function ConfigurationPage() {
    const [attributes, setAttributes] = useState<ProductAttributes | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    const fetchAttributes = async () => {
        setIsLoading(true);
        try {
            const data = await getProductAttributes();
            setAttributes(data);
        } catch (error) {
            toast({ title: 'Error', description: 'Failed to load configuration.', variant: 'destructive' });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAttributes();
    }, []);

    const handleSave = async (key: keyof ProductAttributes, newItems: string[]) => {
        if (!attributes) return;
        try {
            await updateProductAttributes({ [key]: newItems });
            toast({ title: 'Success', description: `${key.charAt(0).toUpperCase() + key.slice(1)} updated.` });
            setAttributes(prev => prev ? { ...prev, [key]: newItems } : null);
        } catch (error) {
            toast({ title: 'Error', description: 'Failed to save configuration.', variant: 'destructive' });
            await fetchAttributes();
        }
    };
    
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }
    
    if (!attributes) {
        return <p>Could not load configuration.</p>
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Store Configuration</h1>
            <div className="space-y-8">
                <NavigationSettings />
                <AttributeManager title="Brands" items={attributes.brands} onSave={(items) => handleSave('brands', items)} />
                <AttributeManager title="Finishes" items={attributes.finishes} onSave={(items) => handleSave('finishes', items)} />
                <AttributeManager title="Color Families" items={attributes.colorFamilies} onSave={(items) => handleSave('colorFamilies', items)} />
                <AttributeManager title="Categories" items={attributes.categories} onSave={(items) => handleSave('categories', items)} />
            </div>
        </div>
    );
}
