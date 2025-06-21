import { notFound } from "next/navigation";
import Image from "next/image";
import { products } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShieldCheck, Droplets, PaintRoller } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type ProductDetailPageProps = {
  params: {
    id: string;
  };
};

const ColorSwatch = ({ name, hex, active = false }: { name: string; hex: string; active?: boolean }) => (
  <div className="flex flex-col items-center space-y-2">
    <div
      className={`w-12 h-12 rounded-full cursor-pointer transition-transform duration-200 ${active ? 'ring-2 ring-primary ring-offset-2 scale-110' : 'hover:scale-110'}`}
      style={{ backgroundColor: hex }}
    />
    <span className="text-xs text-muted-foreground">{name}</span>
  </div>
);

const Feature = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string; }) => (
  <div className="flex items-start space-x-3">
    <div className="flex-shrink-0 text-primary">{icon}</div>
    <div>
      <p className="font-semibold">{title}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container py-12 max-w-screen-2xl">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="sticky top-24">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <Image
                src={product.imageUrl}
                alt={product.name}
                data-ai-hint={product.imageHint}
                width={800}
                height={800}
                className="w-full object-cover aspect-square"
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <div>
            <Badge variant="secondary" className="mb-2">{product.brand}</Badge>
            <h1 className="text-4xl font-headline font-bold">{product.name}</h1>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1 text-sm">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{product.popularity}</span>
                <span className="text-muted-foreground">({product.reviews.length} reviews)</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <Badge variant="outline">{product.finish}</Badge>
            </div>
          </div>
          
          <p className="text-muted-foreground text-lg leading-relaxed font-body">
            {product.description}
          </p>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Key Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Feature icon={<ShieldCheck size={20}/>} title="Durable & Washable" description="Stands up to wear and tear, easy to clean."/>
              <Feature icon={<Droplets size={20}/>} title="Low VOC Formula" description="Eco-friendly and low odor for a healthier home."/>
              <Feature icon={<PaintRoller size={20}/>} title="Superior Coverage" description="Rich pigments provide excellent hide in fewer coats."/>
            </CardContent>
          </Card>
          
          <div>
            <h3 className="text-xl font-headline font-semibold mb-4">Select a Color</h3>
            <div className="flex space-x-4">
              {product.variants.map((variant, index) => (
                <ColorSwatch key={variant.hex} name={variant.name} hex={variant.hex} active={index === 0} />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 pt-4 border-t">
            <p className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</p>
            <Button size="lg" className="flex-grow md:flex-grow-0">Add to Cart</Button>
          </div>
        </div>
      </div>
      
      <div className="mt-16">
        <h2 className="text-3xl font-headline font-bold mb-6 text-center">Customer Reviews</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {product.reviews.length > 0 ? (
            product.reviews.map((review) => (
              <Card key={review.id}>
                <CardHeader className="flex flex-row justify-between items-start">
                  <div>
                    <CardTitle className="text-base font-semibold">{review.author}</CardTitle>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground'}`}/>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.date}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground font-body">{review.comment}</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="text-center py-8">
              <CardContent>
                <p className="text-muted-foreground">No reviews yet for this product.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
