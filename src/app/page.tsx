import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Bed, Home, Paintbrush, Quote } from "lucide-react";
import { serviceCategories } from "@/lib/services";
import { getTestimonials } from "@/services/testimonial-service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const serviceIcons = [
  <Paintbrush key="living-room" className="h-8 w-8" />,
  <Bed key="bed-room" className="h-8 w-8" />,
  <Home key="exterior" className="h-8 w-8" />,
];


export default async function HomePage() {
  const testimonials = await getTestimonials();
  const featuredServices = serviceCategories.find(c => c.id === 'painting')?.services.slice(0, 3) || [];

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
            <h2 className="text-3xl md:text-4xl font-headline font-semibold">Our Core Services</h2>
            <p className="text-muted-foreground mt-2 font-body">
              Professional solutions for every surface and space.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <Card key={service.title} className="flex flex-col text-center items-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 pt-6 flex flex-col items-center flex-grow">
                    <div className="mb-6 bg-primary/10 text-primary p-4 rounded-full">
                        {serviceIcons[index]}
                    </div>
                    <h3 className="font-headline text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground font-body text-sm mb-6 flex-grow">
                        {service.description.substring(0, 120)}...
                    </p>
                    <Button asChild variant="outline" className="mt-auto">
                        <Link href="/services">
                          Learn More
                        </Link>
                    </Button>
                </CardContent>
              </Card>
            ))}
          </div>
           <div className="text-center mt-12">
              <Button asChild size="lg">
                <Link href="/services">
                  View All Services
                </Link>
              </Button>
            </div>
        </div>
      </section>

       <section className="py-16 md:py-24 bg-card">
        <div className="container px-4 md:px-6">
           <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-semibold">What Our Clients Say</h2>
            <p className="text-muted-foreground mt-2 font-body">
              Real stories from satisfied customers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((testimonial) => (
              <Card key={testimonial.id} className="bg-background flex flex-col transform transition-shadow duration-300 hover:shadow-2xl">
                  <CardContent className="p-8 flex-grow flex flex-col items-center text-center">
                      <Quote className="w-10 h-10 text-primary/30 mb-4" />
                      <p className="text-muted-foreground font-body flex-grow italic mb-6">"{testimonial.comment}"</p>
                      <footer className="mt-auto">
                          <Avatar className="w-16 h-16 mb-2 mx-auto border-4 border-card shadow-lg">
                              <AvatarImage src={testimonial.imageUrl} alt={testimonial.author} />
                              <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <p className="font-headline font-semibold text-primary">{testimonial.author}</p>
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
