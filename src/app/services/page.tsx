import { serviceCategories, serviceFeatures } from '@/lib/services';
import { ServiceCard } from '@/components/service-card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Award, Clock, Shield, FileText, Sparkles, Phone, ArrowRight, CheckCircle2, Paintbrush } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

const iconMap: Record<string, React.ReactNode> = {
  users: <Users className="h-6 w-6" />,
  award: <Award className="h-6 w-6" />,
  clock: <Clock className="h-6 w-6" />,
  shield: <Shield className="h-6 w-6" />,
  'file-text': <FileText className="h-6 w-6" />,
  sparkles: <Sparkles className="h-6 w-6" />,
};

export const metadata: Metadata = {
  title: "Professional Painting & Design Services in Udaipur - Expert Interior & Exterior Solutions",
  description: "Comprehensive painting and design services in Udaipur, Rajasthan. Expert interior/exterior painting, wall treatments, color consultation, and home renovation with premium Asian Paints products. Free estimates available.",
  keywords: [
    "painting services Udaipur",
    "interior painting Udaipur",
    "exterior painting Udaipur",
    "professional painters Udaipur",
    "paint contractor Udaipur",
    "painting company Udaipur",
    "wall painting Udaipur",
    "house painting Udaipur",
    "home renovation Udaipur",
    "color consultation Udaipur",
    "Asian Paints Udaipur",
    "residential painting Udaipur",
    "commercial painting Udaipur",
    "office painting Udaipur",
    "texture painting Udaipur",
    "decorative painting Udaipur",
    "architectural services Udaipur",
    "interior design Udaipur",
    "wall treatments Udaipur",
    "paint estimation Udaipur",
    "painting cost Udaipur",
    "best painters Udaipur",
    "professional painting services",
    "Rajasthan painting services"
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Professional Painting & Design Services in Udaipur | First Impression",
    description: "Expert interior & exterior painting services in Udaipur with premium Asian Paints products. Free color consultation, professional wall treatments, and exceptional craftsmanship for homes and offices.",
    url: "https://first-impression.com/services",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dfydjfauz/image/upload/v1754548771/apple-touch-icon_mwod6q.png",
        width: 1200,
        height: 630,
        alt: "First Impression Professional Painting Services in Udaipur, Rajasthan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Painting Services in Udaipur | First Impression",
    description: "Expert interior & exterior painting in Udaipur | Free consultation | Premium Asian Paints | Call for free estimate",
    images: ["https://res.cloudinary.com/dfydjfauz/image/upload/v1754548771/apple-touch-icon_mwod6q.png"],
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background py-16 md:py-24 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-400/10 rounded-full blur-3xl" />
        </div>

        <div className="container relative max-w-screen-xl">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1 text-center md:text-left">
              <Badge className="mb-4" variant="secondary">
                <Paintbrush className="h-3 w-3 mr-1" />
                End-to-End Painting Services
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold mb-4">
                Professional{' '}
                <span className="text-primary">Painting</span>{' '}
                Services
              </h1>
              <p className="text-lg text-muted-foreground mb-6 max-w-xl">
                Transform your spaces with our expert painting solutions. From consultation to cleanup,
                we handle everything with skilled craftsmen and premium materials.
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <Button size="lg" asChild>
                  <Link href="/request-estimation" className="flex items-center gap-2">
                    Get Free Estimate <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:+918560077888" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" /> Call Now
                  </a>
                </Button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative w-full md:w-96 h-64 md:h-80 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://res.cloudinary.com/dfydjfauz/image/upload/v1767026474/file1_d8c7wl.jpg"
                alt="Professional painter at work"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white text-sm font-medium">Our Expert Team at Work</p>
              </div>
            </div>
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
