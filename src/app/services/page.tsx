'use client';

import { serviceCategories, serviceFeatures } from '@/lib/services';
import { ServiceCard } from '@/components/service-card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Users, Award, Clock, Shield, FileText, Sparkles, Phone, ArrowRight,
  CheckCircle2, Paintbrush, Check, Star, Home, Droplet, Palette,
  ChevronLeft, ChevronRight, Play, MessageCircle
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ReactNode> = {
  users: <Users className="h-6 w-6" />,
  award: <Award className="h-6 w-6" />,
  clock: <Clock className="h-6 w-6" />,
  shield: <Shield className="h-6 w-6" />,
  'file-text': <FileText className="h-6 w-6" />,
  sparkles: <Sparkles className="h-6 w-6" />,
};

// Category icons mapping
const categoryIcons: Record<string, React.ReactNode> = {
  'painting': <Paintbrush className="h-5 w-5 text-primary" />,
  'texture': <Palette className="h-5 w-5 text-purple-500" />,
  'interior-designers': <Home className="h-5 w-5 text-blue-500" />,
  'waterproofing': <Droplet className="h-5 w-5 text-cyan-500" />,
};

// Carousel images showcasing our work
const carouselImages = [
  {
    src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1767026474/file1_d8c7wl.jpg',
    title: 'Expert Interior Painting',
    subtitle: 'Transforming living spaces with precision',
  },
  {
    src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1767026474/file3_eiznvw.jpg',
    title: 'Professional Team at Work',
    subtitle: '50+ skilled painters at your service',
  },
  {
    src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1758109963/file00002_fmjajv.jpg',
    title: 'Quality Finishing',
    subtitle: 'Premium Asian Paints products only',
  },
  {
    src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1758109964/file00004_i9x97j.jpg',
    title: 'Residential Projects',
    subtitle: 'Making homes beautiful since 2014',
  },
  {
    src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1758109964/file00007_t5j3to.jpg',
    title: 'Commercial Spaces',
    subtitle: 'Office & commercial painting experts',
  },
  {
    src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1758115129/file_002_c3rs35.jpg',
    title: 'Attention to Detail',
    subtitle: 'Every corner matters to us',
  },
];

// What we ensure - basic checklist for all services
const serviceGuarantees = [
  { text: 'Free Site Visit & Assessment', icon: Home },
  { text: 'Transparent Pricing - No Hidden Costs', icon: FileText },
  { text: 'Premium Asian Paints Products Only', icon: Award },
  { text: 'Skilled & Trained Workforce', icon: Users },
  { text: 'On-Time Project Completion', icon: Clock },
  { text: 'Complete Site Cleanup After Work', icon: Sparkles },
  { text: 'Quality Inspection Before Handover', icon: CheckCircle2 },
  { text: 'Post-Service Support & Warranty', icon: Shield },
];

// Stats for animated counters
const stats = [
  { value: 500, suffix: '+', label: 'Projects Completed' },
  { value: 10, suffix: '+', label: 'Years Experience' },
  { value: 50, suffix: '+', label: 'Expert Painters' },
  { value: 4.8, suffix: '', label: 'Google Rating', isDecimal: true },
];

// Animated counter hook
function useCounter(end: number, duration: number = 2000, isDecimal: boolean = false) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(isDecimal ? parseFloat((easeOut * end).toFixed(1)) : Math.floor(easeOut * end));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [hasStarted, end, duration, isDecimal]);

  return { count, ref };
}

export default function ServicesPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section with Auto-Carousel */}
      <section className="relative overflow-hidden">
        {/* Auto-Carousel Background */}
        <div
          className="relative h-[500px] md:h-[600px] w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {carouselImages.map((image, index) => (
            <div key={image.src} className="absolute inset-0">
              <Image
                src={image.src}
                alt={image.title}
                fill
                className={cn(
                  "object-cover transition-all duration-1000 ease-in-out",
                  index === currentImageIndex ? "opacity-100 scale-100" : "opacity-0 scale-110"
                )}
                priority={index === 0}
              />
            </div>
          ))}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/80" />

          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          {/* Hero Content */}
          <div className={cn(
            "absolute inset-0 flex flex-col items-center justify-center text-white px-4 transition-all duration-700",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm hover:bg-white/30 transition-colors">
              <Paintbrush className="h-3 w-3 mr-1" />
              End-to-End Painting Services
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-headline font-bold mb-4 text-center leading-tight">
              Professional{' '}
              <span className="text-primary relative">
                Painting
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 10C50 2 150 2 198 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary/50" />
                </svg>
              </span>{' '}
              <br className="hidden md:block" />
              Services
            </h1>

            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl text-center">
              Transform your spaces with our expert painting solutions. From consultation to cleanup,
              we handle everything with skilled craftsmen and premium materials.
            </p>

            {/* Image Caption */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center">
              <p className={cn(
                "text-white font-medium text-lg transition-all duration-500",
                "animate-fade-in"
              )}>
                {carouselImages[currentImageIndex].title}
              </p>
              <p className="text-white/60 text-sm">
                {carouselImages[currentImageIndex].subtitle}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              <Button size="lg" className="shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow" asChild>
                <Link href="/request-estimation" className="flex items-center gap-2">
                  Get Free Estimate <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20 backdrop-blur-sm" asChild>
                <a href="tel:+919653790999" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" /> Call Now
                </a>
              </Button>
              <Button size="lg" variant="outline" className="bg-green-500/20 border-green-400 text-white hover:bg-green-500/30 backdrop-blur-sm" asChild>
                <a href="https://wa.me/919653790999" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              </Button>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Carousel Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all"
              aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
            >
              <Play className={cn("h-3 w-3", isPaused ? "" : "opacity-50")} />
            </button>
            <div className="flex gap-2">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    index === currentImageIndex
                      ? "bg-white w-8"
                      : "bg-white/40 w-2 hover:bg-white/60"
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-gradient-to-r from-primary via-primary to-orange-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        <div className="container max-w-screen-xl relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const { count, ref } = useCounter(stat.value, 2000, stat.isDecimal);
              return (
                <div
                  key={index}
                  ref={ref}
                  className="text-center group"
                >
                  <div className="text-4xl md:text-5xl font-bold mb-1 group-hover:scale-110 transition-transform">
                    {stat.isDecimal ? count.toFixed(1) : count}{stat.suffix}
                    {stat.label === 'Google Rating' && <Star className="inline h-6 w-6 ml-1 text-yellow-300 fill-yellow-300" />}
                  </div>
                  <div className="text-white/80 text-sm md:text-base">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Guarantees Checklist */}
      <section className="py-12 bg-gradient-to-b from-background to-muted/30">
        <div className="container max-w-screen-xl">
          <div className="flex flex-col items-center justify-center gap-2 mb-8">
            <Badge variant="outline" className="mb-2">
              <Shield className="h-3 w-3 mr-1" />
              Our Promise
            </Badge>
            <h2 className="text-2xl md:text-3xl font-headline font-bold text-center">What We Ensure With Every Service</h2>
            <p className="text-muted-foreground text-center max-w-xl">
              Every project comes with our commitment to quality and customer satisfaction
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {serviceGuarantees.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-xl bg-background border border-border/50",
                  "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1",
                  "transition-all duration-300 group cursor-default"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <item.icon className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-muted/30">
        <div className="container max-w-screen-xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-headline font-bold mb-2">Why We Stand Out</h2>
            <p className="text-muted-foreground">Our key differentiators that make us the preferred choice</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {serviceFeatures.map((feature, index) => (
              <div
                key={index}
                className={cn(
                  "flex flex-col items-center text-center p-5 rounded-2xl bg-background border border-border/50",
                  "hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2",
                  "transition-all duration-300 group"
                )}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all">
                  {iconMap[feature.icon]}
                </div>
                <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-orange-500/5" />
        <div className="container max-w-screen-xl relative">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <Award className="h-3 w-3 mr-1" />
              Why Choose Us
            </Badge>
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-3">Why Choose First Impression?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We deliver complete end-to-end painting solutions with expert craftsmen,
              premium materials, and a commitment to quality that&apos;s unmatched in Udaipur.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent border border-blue-500/20 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg shadow-blue-500/30">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3">50+ Skilled Painters</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our trained workforce ensures every project is completed with precision and care.
                Each painter has years of experience in residential and commercial painting.
              </p>
              <div className="mt-4 flex items-center gap-2 text-blue-500">
                <Check className="h-4 w-4" />
                <span className="text-sm font-medium">Verified & Background Checked</span>
              </div>
            </div>

            <div className="group p-8 rounded-3xl bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-transparent border border-orange-500/20 hover:border-orange-500/40 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg shadow-orange-500/30">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Asian Paints Partner</h3>
              <p className="text-muted-foreground leading-relaxed">
                As an authorized Asian Paints dealer, we use only genuine premium products.
                This ensures lasting colors, superior coverage, and beautiful finishes.
              </p>
              <div className="mt-4 flex items-center gap-2 text-orange-500">
                <Check className="h-4 w-4" />
                <span className="text-sm font-medium">100% Genuine Products</span>
              </div>
            </div>

            <div className="group p-8 rounded-3xl bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent border border-green-500/20 hover:border-green-500/40 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 text-white flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg shadow-green-500/30">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Complete Solution</h3>
              <p className="text-muted-foreground leading-relaxed">
                From free site visit to final cleanup, we handle everything.
                No need to coordinate with multiple vendors - we manage it all.
              </p>
              <div className="mt-4 flex items-center gap-2 text-green-500">
                <Check className="h-4 w-4" />
                <span className="text-sm font-medium">End-to-End Service</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-muted/20">
        <div className="container max-w-screen-xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <Paintbrush className="h-3 w-3 mr-1" />
              Our Services
            </Badge>
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-3">Explore Our Services</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Comprehensive painting and interior solutions for every need - residential, commercial, and industrial
            </p>
          </div>

          <Accordion type="multiple" defaultValue={[serviceCategories[0].id]} className="w-full space-y-4">
            {serviceCategories.map((category, catIndex) => (
              <AccordionItem
                key={category.id}
                value={category.id}
                className="border rounded-2xl overflow-hidden bg-background shadow-sm hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-xl md:text-2xl font-headline font-semibold px-6 py-5 hover:no-underline hover:bg-muted/50 data-[state=open]:bg-primary/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center transition-all",
                      catIndex === 0 ? "bg-primary/10" :
                      catIndex === 1 ? "bg-purple-500/10" :
                      catIndex === 2 ? "bg-blue-500/10" : "bg-cyan-500/10"
                    )}>
                      {categoryIcons[category.id] || <Paintbrush className="h-5 w-5 text-primary" />}
                    </div>
                    <div className="text-left">
                      <span className="block">{category.title}</span>
                      <span className="text-sm text-muted-foreground font-normal">
                        {category.services.length} professional services
                      </span>
                    </div>
                    <Badge variant="secondary" className="ml-auto mr-4 hidden sm:flex">
                      {category.services.length} services
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-6 bg-muted/10">
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
      <section className="py-20 bg-gradient-to-br from-primary via-primary to-orange-500 text-primary-foreground relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="container max-w-screen-xl text-center relative">
          <Badge className="mb-6 bg-white/20 text-white border-white/30">
            <Sparkles className="h-3 w-3 mr-1" />
            Get Started Today
          </Badge>
          <h2 className="text-3xl md:text-5xl font-headline font-bold mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-primary-foreground/80 mb-10 max-w-2xl mx-auto text-lg">
            Get a free consultation and estimate for your painting project.
            Our experts will visit your site and provide a detailed quote - absolutely free!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" className="shadow-xl hover:shadow-2xl hover:scale-105 transition-all" asChild>
              <Link href="/request-estimation" className="flex items-center gap-2">
                Get Free Estimate <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10" asChild>
              <a href="tel:+919653790999" className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> +91 9653790999
              </a>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10" asChild>
              <a href="https://wa.me/919653790999" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" /> WhatsApp Us
              </a>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-white/70">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span className="text-sm">Quality Guaranteed</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span className="text-sm">On-Time Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-current" />
              <span className="text-sm">4.8 Google Rating</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
