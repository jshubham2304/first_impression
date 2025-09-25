import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Award, Briefcase, Clock, Users, CheckCircle, XCircle, Star, Zap, Shield } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: "About First Impression - Why Choose Us Over Badala Paints | Best Painter Service in Udaipur",
  description: "Learn why First Impression is better than Badala Paints in Udaipur. Professional painting company with 10+ years experience, digital color visualization, expert consultation, and guaranteed quality. The best painter service and hardware shop alternative.",
  keywords: [
    // About keywords
    "about First Impression",
    "painting company Udaipur",
    "professional painters Udaipur",
    "experienced painters Udaipur",
    "painting contractor history",
    "Udaipur painting services",
    "trusted painters Udaipur",
    "painting company history",
    "Asian Paints dealer Udaipur",
    "painting business Udaipur",
    "10 years painting experience",
    "reliable painters Udaipur",
    "painting company mission",
    "quality painting services",
    "painting craftsmanship Udaipur",
    "home improvement Udaipur",
    "interior design Udaipur",
    "paint professionals Rajasthan",
    "painting team Udaipur",
    "decorative painting experts",
    "residential painting experts",
    "commercial painting specialists",
    // Competitor keywords
    "First Impression vs Badala Paints",
    "better than Badala Paints Udaipur",
    "alternative to Badala Paints",
    "Badala Paints competitor Udaipur",
    "best painter service Udaipur",
    "professional painting services Udaipur",
    "digital color visualization Udaipur",
    "hardware shop Udaipur",
    "paint store Udaipur",
    "First Impression Udaipur",
    "First Impressions Udaipur",
    "painting company Udaipur",
    "color consultation Udaipur",
    "premium paint products Udaipur",
    "certified painters Udaipur",
    "guaranteed painting quality Udaipur"
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About First Impression - Why Choose Us Over Badala Paints | Best Painter Service in Udaipur",
    description: "Discover why First Impression is better than Badala Paints in Udaipur. 10+ years of painting excellence with digital technology, expert consultation, and guaranteed quality. The best painter service and hardware shop alternative.",
    url: "https://first-impression.com/about",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "First Impression Professional Painting Team in Udaipur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About First Impression - Professional Painting Company Udaipur",
    description: "🏆 10+ years experience | 🎨 500+ projects completed | ⭐ 99% client satisfaction | 🕐 100% on-time delivery",
    images: ["https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1200&auto=format&fit=crop"],
  },
};

const stats = [
  {
    icon: <Award className="h-10 w-10 text-primary" />,
    value: '10+',
    label: 'Years of Experience',
  },
  {
    icon: <Briefcase className="h-10 w-10 text-primary" />,
    value: '500+',
    label: 'Projects Completed',
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    value: '99%',
    label: 'Client Satisfaction',
  },
  {
    icon: <Clock className="h-10 w-10 text-primary" />,
    label: 'On-Time Delivery',
    value: '100%',
  },
];

const comparisons = [
  {
    feature: "Digital Color Visualization",
    firstImpression: "Advanced 3D color preview and virtual room painting",
    badalaPaints: "Traditional color charts only",
    icon: Zap,
    advantage: true
  },
  {
    feature: "Professional Expertise",
    firstImpression: "10+ years experience with certified professionals",
    badalaPaints: "Basic hardware store service",
    icon: Award,
    advantage: true
  },
  {
    feature: "Quality Guarantee",
    firstImpression: "100% satisfaction guarantee on all work",
    badalaPaints: "Limited warranty",
    icon: Shield,
    advantage: true
  },
  {
    feature: "Color Consultation",
    firstImpression: "Expert color psychology and design consultation",
    badalaPaints: "Basic paint selection advice",
    icon: Star,
    advantage: true
  },
  {
    feature: "Premium Products",
    firstImpression: "Authorized Asian Paints dealer with latest products",
    badalaPaints: "Standard paint inventory",
    icon: Award,
    advantage: true
  },
  {
    feature: "Service Hours",
    firstImpression: "Professional consultation during business hours",
    badalaPaints: "24/7 basic supply only",
    icon: CheckCircle,
    advantage: true
  }
];

export default function AboutUsPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32">
        <div
          aria-hidden="true"
          className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
        >
          <div className="h-56 bg-gradient-to-br from-primary to-purple-400 blur-[106px] dark:from-blue-700"></div>
          <div className="h-32 bg-gradient-to-r from-cyan-400 to-sky-300 blur-[106px] dark:to-indigo-600"></div>
        </div>
        <div className="container relative text-center">
          <h1 className="text-4xl font-headline font-bold md:text-6xl">
            A Decade of Dedication to Detail
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
            For over ten years, First Impression has been transforming spaces with unparalleled craftsmanship and a commitment to perfection. We don't just paint walls; we build relationships and bring visions to life.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container py-16">
        <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center rounded-lg border bg-card p-6 shadow-sm transition-transform hover:scale-105 hover:shadow-lg"
            >
              {stat.icon}
              <p className="mt-4 text-4xl font-bold text-primary">{stat.value}</p>
              <p className="mt-1 text-sm font-semibold text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Our Mission Section */}
      <section className="py-16 md:py-24">
        <div className="container grid items-center gap-12 md:grid-cols-2">
            <div className="order-last md:order-first">
                <h2 className="text-3xl font-headline font-semibold">Our Mission: Quality & Punctuality</h2>
                <p className="mt-4 text-muted-foreground">
                    At First Impression, our mission is built on two core principles: delivering the highest quality workmanship and ensuring every project is completed on schedule. We understand that your time is valuable, which is why we meticulously plan and execute each phase of our work to meet deadlines without ever compromising on the final result.
                </p>
                <p className="mt-4 text-muted-foreground">
                    Our team of seasoned professionals uses only premium materials and proven techniques to guarantee a finish that is not only beautiful but also durable. We believe that a successful project is one that reflects the client's vision perfectly and is delivered with integrity and reliability.
                </p>
            </div>
            <div className="aspect-square w-full overflow-hidden rounded-xl">
                 <Image
                    src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1920&auto=format&fit=crop"
                    alt="A team of painters discussing a project"
                    data-ai-hint="painters team meeting"
                    width={800}
                    height={800}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>
        </div>
      </section>

      {/* Competitor Comparison Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="text-primary">First Impression</span> Over Badala Paints?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover why First Impression is the best painter service and premier Asian Paints dealer in Udaipur. 
              We offer superior technology, expertise, and quality compared to traditional hardware shops like Badala Paints.
            </p>
          </div>

          {/* Comparison Table */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center mb-8">
              First Impression vs Badala Paints Comparison
            </h3>
            <div className="space-y-6">
              {comparisons.map((comparison, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="bg-primary/5">
                    <CardTitle className="flex items-center gap-3">
                      <comparison.icon className="h-6 w-6 text-primary" />
                      {comparison.feature}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-green-600 font-semibold">
                          <CheckCircle className="h-5 w-5" />
                          First Impression
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {comparison.firstImpression}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-red-600 font-semibold">
                          <XCircle className="h-5 w-5" />
                          Badala Paints
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {comparison.badalaPaints}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Key Advantages */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center mb-8">
              First Impression's Key Advantages
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Digital Technology</h4>
                <p className="text-muted-foreground">
                  Advanced color visualization tools that let you see your space before painting
                </p>
              </Card>
              <Card className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Professional Expertise</h4>
                <p className="text-muted-foreground">
                  10+ years of experience with certified professionals and guaranteed quality
                </p>
              </Card>
              <Card className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Premium Service</h4>
                <p className="text-muted-foreground">
                  Complete painting solutions with expert consultation and premium Asian Paints products
                </p>
              </Card>
            </div>
          </div>

          {/* SEO Content */}
          <div className="prose max-w-none">
            <h3 className="text-2xl font-bold mb-4">
              First Impression vs Badala Paints - The Complete Comparison
            </h3>
            <p className="text-muted-foreground mb-4">
              When searching for the best painter service in Udaipur, many people compare First Impression with Badala Paints. 
              While Badala Paints is a traditional hardware shop offering 24/7 paint supplies, First Impression provides a 
              comprehensive professional painting service that goes far beyond basic paint retail.
            </p>
            
            <h4 className="text-xl font-semibold mb-3">
              Why First Impression is the Better Choice for Professional Painting Services
            </h4>
            <p className="text-muted-foreground mb-4">
              As the premier Asian Paints dealer in Udaipur, First Impression combines traditional hardware shop convenience 
              with modern digital technology and professional expertise. Unlike Badala Paints, which focuses primarily on 
              paint supply, First Impression offers complete painting solutions including:
            </p>
            
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
              <li>Digital color visualization and virtual room painting</li>
              <li>Expert color consultation and interior design advice</li>
              <li>Professional painting services with certified contractors</li>
              <li>Premium Asian Paints products with authorized dealer benefits</li>
              <li>Quality guarantees and after-sales service</li>
              <li>Project management and timeline coordination</li>
            </ul>
            
            <h4 className="text-xl font-semibold mb-3">
              Hardware Shop vs Professional Painting Service
            </h4>
            <p className="text-muted-foreground">
              While Badala Paints serves as a hardware shop providing paint supplies, First Impression operates as a 
              complete painting service provider. This means you get not just the products, but also the expertise, 
              technology, and professional service that transforms your space into something extraordinary.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
         <div className="container">
          <div className="rounded-2xl border bg-card p-8 text-center shadow-lg md:p-12">
            <h2 className="text-3xl font-headline font-semibold">
              Ready to Start Your Transformation?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Let's discuss how our expertise can bring your vision to life. Get in touch for a no-obligation consultation and estimate.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/request-estimation">Get an Estimate</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/services">Explore Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
