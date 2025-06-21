import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Star } from "lucide-react";
import { featuredPalettes } from "@/lib/data";
import { getTestimonials } from "@/services/testimonial-service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ColorSwatch = ({ color }: { color: string }) => (
  <div
    className="w-8 h-8 rounded-full border-2 border-white shadow-md"
    style={{ backgroundColor: color }}
  />
);

export default async function HomePage() {
  const testimonials = await getTestimonials();

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center text-center text-white">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Beautifully painted modern house exterior"
          data-ai-hint="house exterior paint"
          fill
          className="object-cover -z-10"
        />
        <div className="absolute inset-0 bg-primary/60 -z-10" />
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 tracking-wider">
              Creating Lasting First Impressions
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto font-body">
              Expert painting and design services that transform your space and leave a mark.
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/services">
                Explore Services <ArrowRight className="ml-2 h-5 w-5" />
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
            <h2 className="text-3xl md:text-4xl font-headline font-semibold">What Our Clients Say</h2>
            <p className="text-muted-foreground mt-2 font-body">
              Real stories from satisfied customers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((testimonial) => (
              <Card key={testimonial.id} className="flex flex-col">
                  <CardContent className="p-6 flex-grow flex flex-col items-center text-center">
                      <Avatar className="w-20 h-20 mb-4 border-4 border-background shadow-md">
                          <AvatarImage src={testimonial.imageUrl} alt={testimonial.author} />
                          <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <p className="text-muted-foreground font-body flex-grow">"{testimonial.comment}"</p>
                      <footer className="mt-4">
                          <p className="font-headline font-semibold">{testimonial.author}</p>
                      </footer>
                  </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <Card className="bg-primary text-primary-foreground border-none">
            <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-12">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <h2 className="text-3xl font-headline font-semibold mb-2">Ready for a Change?</h2>
                <p className="opacity-80 font-body">Get a professional estimate for your project today.</p>
              </div>
              <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                <Link href="/request-estimation">
                  Request an Estimate <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
