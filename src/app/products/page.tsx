import { getProducts } from '@/services/product-service';
import { ProductsClient } from './client';
import type { Product, ProductAttributes } from '@/lib/types';
import { getProductAttributes } from '@/services/configuration-service';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Best Asian Paints Dealer Udaipur - Premium Paint Store & Products",
  description: "Best Asian Paints dealer in Udaipur offering premium paint products. Authorized retailer with high-quality interior/exterior paints, primers, emulsions, and decorative finishes. Wide color range with professional durability for homes and offices.",
  keywords: [
    // Best dealer keywords
    "best Asian Paints dealer Udaipur",
    "authorized Asian Paints dealer Udaipur",
    "official Asian Paints dealer Udaipur",
    "trusted Asian Paints dealer Udaipur",
    "certified Asian Paints dealer Udaipur",
    "top Asian Paints dealer Udaipur",
    "Asian Paints authorized retailer Udaipur",
    "Asian Paints showroom Udaipur",
    "Asian Paints gallery Udaipur",
    "Asian Paints dealer near me",
    
    // Best shop keywords
    "best paint shop Udaipur",
    "best paint store Udaipur",
    "top paint shop Udaipur",
    "premium paint shop Udaipur",
    "leading paint store Udaipur",
    "best paint dealer Udaipur",
    "top paint dealer Udaipur",
    "paint dealer near me",
    "best paint shop near me",
    
    // Product categories
    "Asian Paints Udaipur",
    "paint store Udaipur",
    "paint products Udaipur",
    "interior paint Udaipur",
    "exterior paint Udaipur",
    "paint colors Udaipur",
    "premium paint Udaipur",
    "paint shop Udaipur",
    "paint finishes Udaipur",
    "wall paint Udaipur",
    "emulsion paint",
    "enamel paint",
    "primer Udaipur",
    "decorative paint",
    "texture paint",
    "ceiling paint",
    "weather shield paints",
    "apex paints",
    "royale paints",
    "tractor emulsion",
    "ace exterior",
    "apcolite premium",
    
    // Quality keywords
    "genuine Asian Paints",
    "original paint products",
    "authentic paint dealer",
    "quality paint products",
    "best quality paints",
    "premium paint brands",
    "trusted paint shop",
    "reliable paint dealer",
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
    url: "https://firstimpresssion.netlify.app/products",
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
