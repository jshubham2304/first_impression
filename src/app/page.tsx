import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Quote } from "lucide-react";
import { getTestimonials } from "@/services/testimonial-service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { InteractiveServices } from "@/components/interactive-services";
import Script from "next/script";


export default async function HomePage() {
  const testimonials = await getTestimonials();

  // Generate structured data for reviews
  const reviewsStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://first-impression.com/#organization",
    "name": "First Impression",
    "review": testimonials.slice(0, 3).map((testimonial, index) => ({
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": testimonial.author
      },
      "reviewBody": testimonial.comment,
      "datePublished": new Date().toISOString().split('T')[0]
    })),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150",
      "bestRating": "5"
    }
  };

  // FAQ structured data
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What painting services do you offer in Udaipur?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer comprehensive painting services including interior painting, exterior painting, texture painting, color consultation, and decorative finishes using premium Asian Paints products."
        }
      },
      {
        "@type": "Question", 
        "name": "Do you provide free painting estimates?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we provide free, detailed painting estimates for all projects in Udaipur. Our professional assessment includes transparent pricing and custom quotes based on your specific requirements."
        }
      },
      {
        "@type": "Question",
        "name": "How long does a typical painting project take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Project duration depends on the scope and size. Interior room painting typically takes 2-3 days, while complete home painting can take 1-2 weeks. We guarantee 100% on-time delivery."
        }
      },
      {
        "@type": "Question",
        "name": "What brands of paint do you use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We primarily use premium Asian Paints products, known for their quality, durability, and extensive color range. We also stock other premium paint brands based on project requirements."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer color consultation services?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we provide expert color consultation services with our advanced color visualizer tool. You can upload your room photos or use our sample rooms to see how different colors will look before painting."
        }
      }
    ]
  };

  return (
    <>
      {/* Structured Data for Reviews and FAQ */}
      <Script
        id="reviews-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsStructuredData) }}
      />
      <Script
        id="faq-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      
      <div className="flex flex-col">
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center text-center text-white overflow-hidden">
        <video
          src="https://res.cloudinary.com/dfydjfauz/video/upload/v1758109969/file00001_qfxbkg.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
          data-ai-hint="living room painting video"
        >
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-primary/70 -z-10" />
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

      <InteractiveServices />

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
                              {testimonial.imageUrl && <AvatarImage src={testimonial.imageUrl} alt={testimonial.author} />}
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
    </>
  );
}
