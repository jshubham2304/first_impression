import { getProducts } from '@/services/product-service';
import { ProductsClient } from './client';
import type { Product } from '@/lib/types';

export default async function ProductsPage() {
  const allProducts: Product[] = await getProducts();

  return (
    <div className="container py-8 max-w-screen-2xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-headline font-bold">Our Paint Collection</h1>
        <p className="text-muted-foreground mt-2 text-lg">Find the perfect color and finish for your project.</p>
      </div>
      <ProductsClient products={allProducts} />
    </div>
  );
}
