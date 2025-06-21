'use client';

import React, { useState, useMemo } from 'react';
import { ProductCard } from '@/components/product-card';
import type { Product, ProductAttributes } from '@/lib/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

type ProductsClientProps = {
  products: Product[];
  attributes: ProductAttributes;
};

export function ProductsClient({ products, attributes }: ProductsClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedFinishes, setSelectedFinishes] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState('popularity-desc');

  const handleCheckboxChange = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    list: string[],
    item: string
  ) => {
    setter(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesColor = selectedColors.length === 0 || selectedColors.includes(product.colorFamily);
      const matchesFinish = selectedFinishes.length === 0 || selectedFinishes.includes(product.finish);
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      return matchesSearch && matchesColor && matchesFinish && matchesBrand;
    });

    return filtered.sort((a, b) => {
      const [key, order] = sortOrder.split('-');
      const valA = a[key as keyof Product];
      const valB = b[key as keyof Product];

      if (typeof valA === 'number' && typeof valB === 'number') {
        return order === 'asc' ? valA - valB : valB - valA;
      }
      return 0;
    });
  }, [products, searchTerm, selectedColors, selectedFinishes, selectedBrands, sortOrder]);

  return (
    <div className="grid md:grid-cols-[280px_1fr] gap-8 items-start">
      <aside className="p-4 rounded-lg bg-card border">
        <h3 className="font-headline text-xl font-semibold mb-4">Filters</h3>
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search paints..." 
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <FilterGroup title="Color Family">
          {attributes.colorFamilies.map((color) => (
            <CheckboxItem key={color} id={color} label={color} checked={selectedColors.includes(color)} onCheckedChange={() => handleCheckboxChange(setSelectedColors, selectedColors, color)} />
          ))}
        </FilterGroup>

        <Separator className="my-4" />

        <FilterGroup title="Finish">
          {attributes.finishes.map((finish) => (
            <CheckboxItem key={finish} id={finish} label={finish} checked={selectedFinishes.includes(finish)} onCheckedChange={() => handleCheckboxChange(setSelectedFinishes, selectedFinishes, finish)} />
          ))}
        </FilterGroup>

        <Separator className="my-4" />

        <FilterGroup title="Brand">
          {attributes.brands.map((brand) => (
            <CheckboxItem key={brand} id={brand} label={brand} checked={selectedBrands.includes(brand)} onCheckedChange={() => handleCheckboxChange(setSelectedBrands, selectedBrands, brand)} />
          ))}
        </FilterGroup>
      </aside>

      <main>
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground text-sm">{filteredAndSortedProducts.length} products found</p>
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity-desc">Popularity: High to Low</SelectItem>
              <SelectItem value="popularity-asc">Popularity: Low to High</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="font-headline text-2xl">No Products Found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your filters.</p>
          </div>
        )}
      </main>
    </div>
  );
}

const FilterGroup = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <h4 className="font-semibold mb-2">{title}</h4>
    <div className="space-y-2">{children}</div>
  </div>
);

const CheckboxItem = ({ id, label, checked, onCheckedChange }: { id: string; label: string; checked: boolean; onCheckedChange: () => void; }) => (
  <div className="flex items-center space-x-2">
    <Checkbox id={id.toLowerCase()} checked={checked} onCheckedChange={onCheckedChange} />
    <Label htmlFor={id.toLowerCase()} className="font-normal text-sm">{label}</Label>
  </div>
);
