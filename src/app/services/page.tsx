'use client';

import { serviceCategories, serviceFeatures } from '@/lib/services';
import { ServiceCard } from '@/components/service-card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Award, Clock, Shield, FileText, Sparkles, Phone, ArrowRight, CheckCircle2, Paintbrush, Check } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ReactNode> = {
  users: <Users className="h-6 w-6" />,
  award: <Award className="h-6 w-6" />,
  clock: <Clock className="h-6 w-6" />,
  shield: <Shield className="h-6 w-6" />,
  'file-text': <FileText className="h-6 w-6" />,
  sparkles: <Sparkles className="h-6 w-6" />,
};

// Carousel images showcasing our work
const carouselImages = [
  'https://res.cloudinary.com/dfydjfauz/image/upload/v1767026474/file1_d8c7wl.jpg',
  'https://res.cloudinary.com/dfydjfauz/image/upload/v1767026474/file3_eiznvw.jpg',
  'https://res.cloudinary.com/dfydjfauz/image/upload/v1758109963/file00002_fmjajv.jpg',
  'https://res.cloudinary.com/dfydjfauz/image/upload/v1758109964/file00004_i9x97j.jpg',
  'https://res.cloudinary.com/dfydjfauz/image/upload/v1758109964/file00007_t5j3to.jpg',
  'https://res.cloudinary.com/dfydjfauz/image/upload/v1758115129/file_002_c3rs35.jpg',
];

// What we ensure - basic checklist for all services
const serviceGuarantees = [
  'Free Site Visit & Assessment',
  'Transparent Pricing - No Hidden Costs',
  'Premium Asian Paints Products Only',
  'Skilled & Trained Workforce',
  'On-Time Project Completion',
  'Complete Site Cleanup After Work',
  'Quality Inspection Before Handover',
  'Post-Service Support & Warranty',
];

export default function ServicesPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="min-h-screen">
      {/* Hero Section with Auto-Carousel */}
      <section className="relative overflow-hidden">
        {/* Auto-Carousel Background */}
        <div className="relative h-[400px] md:h-[500px] w-full">
          {carouselImages.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt={`Our painting work ${index + 1}`}
              fill
              className={cn(
                "object-cover transition-all duration-1000 ease-in-out",
                index === currentImageIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
              )}
              priority={index === 0}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />

          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm">
              <Paintbrush className="h-3 w-3 mr-1" />
              End-to-End Painting Services
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold mb-4 text-center">
              Professional{' '}
              <span className="text-primary">Painting</span>{' '}
              Services
            </h1>
            <p className="text-lg text-white/80 mb-6 max-w-2xl text-center">
              Transform your spaces with our expert painting solutions. From consultation to cleanup,
              we handle everything with skilled craftsmen and premium materials.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button size="lg" asChild>
                <Link href="/request-estimation" className="flex items-center gap-2">
                  Get Free Estimate <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20" asChild>
                <a href="tel:+918560077888" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" /> Call Now
                </a>
              </Button>
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentImageIndex
                    ? "bg-white w-6"
                    : "bg-white/50 hover:bg-white/70"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Service Guarantees Checklist */}
      <section className="py-8 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-y border-primary/20">
        <div className="container max-w-screen-xl">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-headline font-semibold text-center">What We Ensure With Every Service</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {serviceGuarantees.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-sm bg-background/80 backdrop-blur-sm p-3 rounded-lg border border-primary/10">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-muted/30">
        <div className="container max-w-screen-xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {serviceFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-4 rounded-xl bg-background border border-border/50 hover:border-primary/30 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
                  {iconMap[feature.icon]}
                </div>
                <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12">
        <div className="container max-w-screen-xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-headline font-bold mb-3">Why Choose First Impression?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We deliver complete end-to-end painting solutions with expert craftsmen,
              premium materials, and a commitment to quality that&apos;s unmatched in Udaipur.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20">
              <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">50+ Skilled Painters</h3>
              <p className="text-muted-foreground text-sm">
                Our trained workforce ensures every project is completed with precision and care.
                Each painter has years of experience in residential and commercial painting.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/20">
              <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Asian Paints Partner</h3>
              <p className="text-muted-foreground text-sm">
                As an authorized Asian Paints dealer, we use only genuine premium products.
                This ensures lasting colors, superior coverage, and beautiful finishes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20">
              <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center mb-4">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Complete Solution</h3>
              <p className="text-muted-foreground text-sm">
                From free site visit to final cleanup, we handle everything.
                No need to coordinate with multiple vendors - we manage it all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 bg-muted/20">
        <div className="container max-w-screen-xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-headline font-bold mb-3">Our Services</h2>
            <p className="text-muted-foreground">
              Comprehensive painting and interior solutions for every need
            </p>
          </div>

          <Accordion type="multiple" defaultValue={[serviceCategories[0].id]} className="w-full space-y-4">
            {serviceCategories.map((category) => (
              <AccordionItem key={category.id} value={category.id} className="border rounded-xl overflow-hidden bg-background">
                <AccordionTrigger className="text-xl md:text-2xl font-headline font-semibold px-6 py-4 hover:no-underline hover:bg-muted/50 data-[state=open]:bg-primary/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Paintbrush className="h-5 w-5 text-primary" />
                    </div>
                    <span>{category.title}</span>
                    <Badge variant="secondary" className="ml-2">
                      {category.services.length} services
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-6 bg-muted/20">
                  <div className="space-y-6">
                    {category.services.map((service) => (
                      <ServiceCard key={service.title} service={service} />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container max-w-screen-xl text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Get a free consultation and estimate for your painting project.
            Our experts will visit your site and provide a detailed quote - absolutely free!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/request-estimation" className="flex items-center gap-2">
                Get Free Estimate <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10" asChild>
              <a href="tel:+918560077888" className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> +91 8560077888
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
