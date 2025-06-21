import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Eye, ShieldCheck, ArrowRight } from "lucide-react";
import { featuredPalettes } from "@/lib/data";

const ColorSwatch = ({ color }: { color: string }) => (
  <div
    className="w-8 h-8 rounded-full border-2 border-white shadow-md"
    style={{ backgroundColor: color }}
  />
);

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center text-center text-white">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Colorful abstract paint background"
          data-ai-hint="colorful abstract paint"
          fill
          className="object-cover -z-10"
        />
        <div className="absolute inset-0 bg-primary/60 -z-10" />
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 tracking-wider">
              Your Vision, Our Colors
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto font-body">
              Discover a world of color with our premium paints. Perfect for any project, big or small.
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
              <Link href="/products">
                Explore Paints <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-semibold">Featured Palettes</h2>
            <p className="text-muted-foreground mt-2 font-body">
              Hand-picked collections to inspire your next project.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPalettes.map((palette) => (
              <Card key={palette.id} className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="flex h-32">
                    {palette.colors.slice(0, 4).map((color, index) => (
                       <div key={index} style={{ backgroundColor: color.hex }} className="flex-1" />
                    ))}
                  </div>
                  <div className="p-6">
                    <h3 className="font-headline text-xl font-semibold mb-2">{palette.name}</h3>
                    <div className="flex -space-x-2">
                      {palette.colors.map((color, index) => (
                        <ColorSwatch key={index} color={color.hex} />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container px-4 md:px-6">
           <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-semibold">Why Choose Color Palette Pro?</h2>
            <p className="text-muted-foreground mt-2 font-body">
              The professional's choice for quality, variety, and support.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <Palette className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-headline font-semibold mb-2">Infinite Variety</h3>
              <p className="text-muted-foreground font-body">
                Thousands of colors and finishes to match your unique style.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-headline font-semibold mb-2">Premium Quality</h3>
              <p className="text-muted-foreground font-body">
                Durable, long-lasting paints with excellent coverage and a flawless finish.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <Eye className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-headline font-semibold mb-2">Expert Visualization</h3>
              <p className="text-muted-foreground font-body">
                Use our state-of-the-art tools to see your vision come to life before you paint.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <Card className="bg-primary text-primary-foreground border-none">
            <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-12">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <h2 className="text-3xl font-headline font-semibold mb-2">Visualize Your Space</h2>
                <p className="opacity-80 font-body">Try colors in your own room with our visualizer tool.</p>
              </div>
              <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                <Link href="/visualizer">
                  Start Visualizing <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
