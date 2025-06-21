import { products } from '@/lib/data';
import { ProductsClient } from './client';

export default async function ProductsPage() {
  // In a real app, you would fetch products from an API
  const allProducts = products;

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
