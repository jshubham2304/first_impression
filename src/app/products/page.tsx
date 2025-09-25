import { getProducts } from '@/services/product-service';
import { ProductsClient } from './client';
import type { Product, ProductAttributes } from '@/lib/types';
import { getProductAttributes } from '@/services/configuration-service';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Premium Paint Products & Colors",
  description: "Explore our extensive collection of premium paint products. High-quality interior and exterior paints, primers, and finishes with professional-grade durability and beautiful color options.",
  keywords: [
    "paint products",
    "interior paint",
    "exterior paint",
    "paint colors",
    "premium paint",
    "paint store",
    "paint brands",
    "Asian Paints",
    "paint finishes",
    "wall paint",
    "ceiling paint",
    "primer",
    "paint quality",
    "professional paint",
    "paint catalog"
  ],
  openGraph: {
    title: "Premium Paint Products & Colors | First Impression",
    description: "Explore our extensive collection of premium paint products with professional-grade quality and beautiful color options for any project.",
    images: [
      {
        url: "https://res.cloudinary.com/dfydjfauz/image/upload/v1754548771/apple-touch-icon_mwod6q.png",
        width: 1200,
        height: 630,
        alt: "First Impression Paint Products Collection",
      },
    ],
  },
  twitter: {
    title: "Premium Paint Products & Colors",
    description: "Explore our extensive collection of premium paint products with professional-grade quality.",
  },
};

export default async function ProductsPage() {
  const allProducts: Product[] = await getProducts();
  const attributes: ProductAttributes = await getProductAttributes();
  const activeProducts = allProducts.filter(p => p.isActive);

  return (
    <div className="container py-8 max-w-screen-2xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-headline font-bold">Our Paint Collection</h1>
        <p className="text-muted-foreground mt-2 text-lg">Find the perfect color and finish for your project.</p>
      </div>
      <ProductsClient products={activeProducts} attributes={attributes} />
    </div>
  );
}
