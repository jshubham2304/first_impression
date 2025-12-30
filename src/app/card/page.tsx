'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Phone, Mail, MapPin, Globe, Droplet,
  ArrowRight, Star, Clock, Award, Users,
  Building2, Share2, Download, MessageCircle, ExternalLink,
  Sparkles, Shield, Home, Hammer, CheckCircle, Brush, Check, Instagram
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const allWorkImages = [
  'https://res.cloudinary.com/dfydjfauz/image/upload/v1767026474/file1_d8c7wl.jpg',
  'https://res.cloudinary.com/dfydjfauz/image/upload/v1767026474/file3_eiznvw.jpg',
  'https://res.cloudinary.com/dfydjfauz/image/upload/v1758109963/file00002_fmjajv.jpg',
  'https://res.cloudinary.com/dfydjfauz/image/upload/v1758109964/file00004_i9x97j.jpg',
  'https://res.cloudinary.com/dfydjfauz/image/upload/v1758109964/file00007_t5j3to.jpg',
  'https://res.cloudinary.com/dfydjfauz/image/upload/v1758115129/file_002_c3rs35.jpg',
];

const BusinessCardPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % allWorkImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const business = {
    name: 'First Impression',
    tagline: 'End-to-End Painting Contractor Services',
    contactPerson: 'Hitesh Badala',
    designation: 'Painting Contractor',
    phone: '8560077888',
    email: 'info@firstimpression.com',
    address: 'Udaipur City, Udaipur - 313001, Rajasthan',
    addressLink: 'https://maps.app.goo.gl/dPcij76yfpb4J6op8',
    website: 'https://firstimpression.com',
    logo: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1754548771/apple-touch-icon_mwod6q.png',
    googleBusinessUrl: 'https://www.google.com/search?sca_esv=2e3a0442facbf014&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E9MxlKNpWAwqeUC5Q--FH3LGMJqjIMl-aCDjj07mR1ELdX257qIcv7mQLieZkWDwkQWfGy0lUlU1VjclOz09mhjTnKrYjcboOh2TyKhibJk3ShbPbQ%3D%3D&q=Badala+Paints+And+Hardware+Reviews',
    googleShareUrl: 'https://share.google/TGhVGIQXnSx6A53Wt',
    instagramUrl: 'https://www.instagram.com/hitu1682',
    googleBusinessName: 'Badala Paints And Hardware',
    googleRating: 4.8,
    googleReviewCount: 127,
    established: '2014',
    yearsExperience: '10+',
    projectsCompleted: '500+',
    teamSize: '50+',
    serviceAreas: ['Udaipur', 'Rajsamand', 'Chittorgarh', 'Bhilwara', 'Dungarpur'],
    workingHours: 'Mon-Sat: 9AM - 7PM',
  };

  const services = [
    { name: 'Interior Painting', icon: Home, color: 'bg-blue-500' },
    { name: 'Exterior Painting', icon: Hammer, color: 'bg-orange-500' },
    { name: 'Texture & Design', icon: Brush, color: 'bg-purple-500' },
    { name: 'Waterproofing', icon: Droplet, color: 'bg-cyan-500' },
  ];

  const highlights = [
    { icon: Award, text: 'Asian Paints Dealer', color: 'text-orange-500' },
    { icon: CheckCircle, text: 'End-to-End Service', color: 'text-green-500' },
    { icon: Users, text: '50+ Skilled Painters', color: 'text-blue-500' },
    { icon: Shield, text: 'Quality Guarantee', color: 'text-purple-500' },
  ];

  // Painting service images - workers at work
  const gallerySamples = [
    'https://res.cloudinary.com/dfydjfauz/image/upload/v1767026474/file1_d8c7wl.jpg',
    'https://res.cloudinary.com/dfydjfauz/image/upload/v1767026474/file3_eiznvw.jpg',
    'https://res.cloudinary.com/dfydjfauz/image/upload/v1767026474/file5_iymto5.jpg',
    'https://res.cloudinary.com/dfydjfauz/image/upload/v1767026474/file6_wvlyc9.jpg',
  ];

  // What we offer - end to end services
  const endToEndServices = [
    'Free Site Visit & Consultation',
    'Color Consultation & Selection',
    'Surface Preparation & Putty',
    'Premium Paint Application',
    'Texture & Design Work',
    'Final Inspection & Cleanup',
  ];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: business.name,
          text: `${business.tagline} - Contact: ${business.phone}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    }
  };

  const saveContact = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${business.contactPerson}
ORG:${business.name}
TITLE:${business.designation}
TEL:+91${business.phone}
EMAIL:${business.email}
ADR:;;${business.address}
URL:${business.website}
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${business.contactPerson.replace(' ', '_')}.vcf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4 md:p-8 font-body relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Paint splash effects */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-primary/20 to-orange-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-80 h-80 bg-gradient-to-br from-blue-400/15 to-purple-400/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 left-1/4 w-72 h-72 bg-gradient-to-br from-yellow-400/20 to-amber-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-green-400/10 to-teal-400/10 rounded-full blur-3xl" />

        {/* Subtle paint brush strokes pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath d='M20 10 Q30 30 50 25 T80 40' stroke='%23000' stroke-width='3' fill='none' stroke-linecap='round'/%3E%3Cpath d='M10 60 Q40 50 60 70 T90 65' stroke='%23000' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }} />
      </div>

      <div className="relative max-w-lg mx-auto">
        {/* Main Card */}
        <Card className={cn(
          "overflow-hidden border-0 shadow-2xl bg-background/95 backdrop-blur-xl",
          "transform transition-all duration-700",
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>

          {/* Hero Section with Slideshow */}
          <div className="relative h-56 md:h-64 w-full overflow-hidden">
            {allWorkImages.map((src, index) => (
              <Image
                key={src}
                src={src}
                alt="Work sample"
                fill
                className={cn(
                  "object-cover transition-all duration-1000 ease-in-out",
                  index === currentImageIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
                )}
                priority={index === 0}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />

            {/* Logo & Brand */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-full scale-150" />
                <Image
                  src={business.logo}
                  alt={`${business.name} Logo`}
                  width={90}
                  height={90}
                  className="relative rounded-full border-4 border-white/30 bg-white shadow-2xl"
                />
              </div>
              <h1 className="mt-4 font-headline text-3xl md:text-4xl font-bold tracking-tight">
                {business.name}
              </h1>
              <p className="text-white/80 text-sm mt-1 flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5" />
                {business.tagline}
              </p>
            </div>

            {/* Action Buttons - Top Right */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={handleShare}
                className="p-2.5 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all"
              >
                <Share2 className="h-4 w-4" />
              </button>
              <button
                onClick={saveContact}
                className="p-2.5 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all"
              >
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-5 md:p-6 space-y-6">

            {/* Contact Person */}
            <div className="text-center -mt-2">
              <h2 className="text-xl md:text-2xl font-semibold font-headline">{business.contactPerson}</h2>
              <p className="text-sm text-muted-foreground">{business.designation}</p>
            </div>

            {/* Quick Contact Buttons */}
            <div className="grid grid-cols-4 gap-2">
              <a
                href={`tel:${business.phone}`}
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-green-500/10 hover:bg-green-500/20 transition-all group"
              >
                <div className="p-2 rounded-full bg-green-500 text-white group-hover:scale-110 transition-transform">
                  <Phone className="h-4 w-4" />
                </div>
                <span className="text-xs font-medium">Call</span>
              </a>
              <a
                href={`https://wa.me/91${business.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 transition-all group"
              >
                <div className="p-2 rounded-full bg-emerald-500 text-white group-hover:scale-110 transition-transform">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <span className="text-xs font-medium">WhatsApp</span>
              </a>
              <a
                href={`mailto:${business.email}`}
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 transition-all group"
              >
                <div className="p-2 rounded-full bg-blue-500 text-white group-hover:scale-110 transition-transform">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="text-xs font-medium">Email</span>
              </a>
              <a
                href={business.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 transition-all group"
              >
                <div className="p-2 rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 text-white group-hover:scale-110 transition-transform">
                  <Instagram className="h-4 w-4" />
                </div>
                <span className="text-xs font-medium">Instagram</span>
              </a>
            </div>

            {/* Contact Details */}
            <div className="space-y-2">
              <a
                href={business.addressLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-all group"
              >
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm">{business.address}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    Open in Maps <ExternalLink className="h-3 w-3" />
                  </p>
                </div>
              </a>

              <div className="flex gap-2">
                <div className="flex-1 flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                  <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-sm">{business.workingHours}</span>
                </div>
                <Link
                  href="/"
                  className="flex items-center gap-2 p-3 rounded-xl bg-primary/10 hover:bg-primary/20 transition-all"
                >
                  <Globe className="h-5 w-5 text-primary" />
                </Link>
              </div>
            </div>

            {/* Google Reviews Card */}
            <a
              href={business.googleBusinessUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 hover:border-amber-500/40 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-5 w-5",
                          i < Math.floor(business.googleRating)
                            ? 'text-amber-500 fill-amber-500'
                            : 'text-gray-300'
                        )}
                      />
                    ))}
                  </div>
                  <div>
                    <span className="font-bold text-lg">{business.googleRating}</span>
                    <span className="text-muted-foreground text-sm ml-1">({business.googleReviewCount})</span>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-white/50">
                  Google Reviews
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Tap to read reviews or write one</p>
            </a>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: business.yearsExperience, label: 'Years Exp.' },
                { value: business.projectsCompleted, label: 'Projects' },
                { value: business.teamSize, label: 'Team Size' },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-3 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/10"
                >
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-2">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/30"
                >
                  <item.icon className={cn("h-4 w-4", item.color)} />
                  <span className="text-xs font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Services */}
            <div className="space-y-3">
              <h3 className="font-headline font-semibold text-center">Our Services</h3>
              <div className="grid grid-cols-4 gap-2">
                {services.map((service) => (
                  <Link href="/services" key={service.name}>
                    <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-all group">
                      <div className={cn("p-2.5 rounded-full text-white group-hover:scale-110 transition-transform", service.color)}>
                        <service.icon className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-medium text-center leading-tight">{service.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* End-to-End Service Process */}
            <div className="space-y-3 p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
              <h3 className="font-headline font-semibold text-center flex items-center justify-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Complete End-to-End Service
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {endToEndServices.map((service, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs">
                    <Check className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
                    <span className="text-muted-foreground">{service}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-center text-muted-foreground mt-2 italic">
                From consultation to final cleanup - we handle everything!
              </p>
            </div>

            {/* Service Areas */}
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-sm">
                <Building2 className="h-4 w-4 text-primary" />
                <span className="font-medium">We Serve</span>
              </div>
              <div className="flex flex-wrap justify-center gap-1.5">
                {business.serviceAreas.map((area, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    {area}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Gallery Preview */}
            <div className="space-y-3">
              <h3 className="font-headline font-semibold text-center">Recent Work</h3>
              <div className="grid grid-cols-4 gap-2">
                {gallerySamples.map((src, index) => (
                  <Link
                    href="/gallery"
                    key={index}
                    className="aspect-square relative overflow-hidden rounded-lg group"
                  >
                    <Image
                      src={src}
                      alt={`Work sample ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  </Link>
                ))}
              </div>
              <Button asChild variant="outline" className="w-full" size="sm">
                <Link href="/gallery" className="flex items-center justify-center gap-2">
                  View All Projects <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* CTA Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button asChild size="lg" className="w-full shadow-lg shadow-primary/25">
                <a href={`tel:${business.phone}`} className="flex items-center justify-center gap-2">
                  <Phone className="h-4 w-4" /> Call Now
                </a>
              </Button>
              <Button asChild size="lg" variant="secondary" className="w-full">
                <Link href="/request-estimation" className="flex items-center justify-center gap-2">
                  Get Quote <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Footer */}
            <div className="text-center pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                Trusted by 500+ happy customers in Udaipur
              </p>
              <div className="flex items-center justify-center gap-4 mt-3">
                <a
                  href={business.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                >
                  <Instagram className="h-3 w-3" /> Instagram
                </a>
                <span className="text-muted-foreground">|</span>
                <a
                  href={business.googleShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                >
                  <Star className="h-3 w-3" /> Write a Review
                </a>
                <span className="text-muted-foreground">|</span>
                <button
                  onClick={handleShare}
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                >
                  <Share2 className="h-3 w-3" /> Share Card
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Floating Contact Bar - Mobile Only */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white/95 to-transparent dark:from-slate-900 dark:via-slate-900/95 dark:to-transparent md:hidden z-50">
          <div className="flex gap-2 max-w-lg mx-auto">
            <Button asChild className="flex-1 shadow-lg shadow-primary/30" size="lg">
              <a href={`tel:${business.phone}`} className="flex items-center justify-center gap-2">
                <Phone className="h-5 w-5" /> Call
              </a>
            </Button>
            <Button asChild variant="secondary" className="flex-1 shadow-lg" size="lg">
              <a
                href={`https://wa.me/91${business.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <MessageCircle className="h-5 w-5" /> WhatsApp
              </a>
            </Button>
          </div>
        </div>

        {/* Bottom Padding for Fixed Bar */}
        <div className="h-20 md:hidden" />
      </div>
    </div>
  );
};

export default BusinessCardPage;
