import { getProducts } from '@/services/product-service';
import { ProductsClient } from './client';
import type { Product, ProductAttributes } from '@/lib/types';
import { getProductAttributes } from '@/services/configuration-service';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Premium Asian Paints Products & Colors in Udaipur - Quality Paint Store",
  description: "Discover premium Asian Paints products in Udaipur. High-quality interior/exterior paints, primers, emulsions, and decorative finishes. Wide color range with professional durability and beautiful finishes for homes and offices.",
  keywords: [
    "Asian Paints Udaipur",
    "paint store Udaipur",
    "paint products Udaipur",
    "interior paint Udaipur",
    "exterior paint Udaipur",
    "paint colors Udaipur",
    "premium paint Udaipur",
    "paint shop Udaipur",
    "Asian Paints dealer",
    "paint finishes Udaipur",
    "wall paint Udaipur",
    "emulsion paint",
    "enamel paint",
    "primer Udaipur",
    "paint brands Udaipur",
    "decorative paint",
    "texture paint",
    "ceiling paint",
    "paint quality",
    "professional paint",
    "paint catalog Udaipur",
    "paint collection",
    "color schemes",
    "paint samples",
    "Rajasthan paint store"
  ],
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Premium Asian Paints Products & Colors in Udaipur | First Impression",
    description: "Explore our extensive Asian Paints collection in Udaipur. Premium quality interior/exterior paints, primers, and decorative finishes with thousands of beautiful colors for any project.",
    url: "https://first-impression.com/products",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dfydjfauz/image/upload/v1754548771/apple-touch-icon_mwod6q.png",
        width: 1200,
        height: 630,
        alt: "First Impression Asian Paints Products Collection in Udaipur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Asian Paints Products in Udaipur | First Impression",
    description: "🎨 Explore premium Asian Paints collection | 🌈 Thousands of colors | 🏪 Authorized dealer in Udaipur | 💯 Quality guaranteed",
    images: ["https://res.cloudinary.com/dfydjfauz/image/upload/v1754548771/apple-touch-icon_mwod6q.png"],
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
