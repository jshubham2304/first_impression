import Link from "next/link";
import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/types";

type ProductCardProps = {
  product: Product;
};

const ColorVariantCircle = ({ color }: { color: string }) => (
  <div
    className="w-5 h-5 rounded-full border-2 border-white"
    style={{ backgroundColor: color }}
  />
);

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="w-full overflow-hidden group transition-all duration-300 hover:shadow-xl">
      <Link href={`/products/${product.id}`} className="block">
        <CardContent className="p-0">
          <div className="relative">
            <Image
              src={product.imageUrl}
              alt={product.name}
              data-ai-hint={product.imageHint}
              width={400}
              height={400}
              className="object-cover w-full aspect-square transition-transform duration-300 group-hover:scale-105"
            />
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
            >
              <Heart className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">{product.brand}</p>
                <h3 className="font-headline text-lg font-semibold truncate">
                  {product.name}
                </h3>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{product.popularity}</span>
              </div>
            </div>
            <div className="mt-2 flex justify-between items-center">
              <p className="text-lg font-semibold text-primary">
                ${product.price.toFixed(2)}
              </p>
              <div className="flex -space-x-1.5">
                {product.variants.slice(0, 3).map((variant) => (
                  <ColorVariantCircle key={variant.hex} color={variant.hex} />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
