
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Globe, Paintbrush, Palette, Droplet, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const BusinessCardPage = () => {
  const business = {
    name: 'First Impression',
    contactPerson: 'Hitesh Badala',
    phone: '8560077888',
    email: 'info@firstimpression.com',
    address: 'Udaipur City, Udaipur - 313001, Rajasthan',
    addressLink: 'https://maps.app.goo.gl/dPcij76yfpb4J6op8',
    website: 'https://firstimpression.com',
    logo: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1754548771/apple-touch-icon_mwod6q.png',
  };

  const services = [
      { name: 'Painting', icon: <Paintbrush className="h-5 w-5 text-primary" /> },
      { name: 'Interior Design', icon: <Palette className="h-5 w-5 text-primary" /> },
      { name: 'Waterproofing', icon: <Droplet className="h-5 w-5 text-primary" /> },
  ]

  const gallerySamples = [
      { src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1758109963/file00002_fmjajv.jpg', hint: 'exterior wall painting' },
      { src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1758109964/file00004_i9x97j.jpg', hint: 'modern interior design' },
      { src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1758109964/file00007_t5j3to.jpg', hint: 'kitchen cabinet painting' },
  ]

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4 font-body">
        <div className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-background shadow-2xl">

            {/* Top section with background video */}
            <div className="relative h-48 w-full">
                 <video
                  src="https://res.cloudinary.com/dfydjfauz/video/upload/v1758109969/file00001_qfxbkg.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute top-0 left-0 w-full h-full object-cover -z-10"
                >
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-primary/70 mix-blend-multiply" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-primary-foreground">
                    <Image
                        src={business.logo}
                        alt={`${business.name} Logo`}
                        data-ai-hint="logo"
                        width={80}
                        height={80}
                        className="rounded-full border-4 border-white/50 bg-white"
                    />
                    <h1 className="mt-3 font-headline text-4xl font-bold">{business.name}</h1>
                </div>
            </div>

            {/* Bottom section with contact info */}
            <div className="p-6 space-y-6">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold font-headline">{business.contactPerson}</h2>
                    <p className="text-sm text-muted-foreground">Owner</p>
                </div>

                <div className="space-y-4 text-sm">
                    <a href={`tel:${business.phone}`} className="flex items-center space-x-4 p-2 rounded-lg hover:bg-muted transition-colors">
                        <Phone className="h-5 w-5 flex-shrink-0 text-primary" />
                        <span className="text-muted-foreground">{business.phone}</span>
                    </a>
                    <a href={`mailto:${business.email}`} className="flex items-center space-x-4 p-2 rounded-lg hover:bg-muted transition-colors">
                        <Mail className="h-5 w-5 flex-shrink-0 text-primary" />
                        <span className="text-muted-foreground">{business.email}</span>
                    </a>
                     <a href={business.addressLink} target="_blank" rel="noopener noreferrer" className="flex items-start space-x-4 p-2 rounded-lg hover:bg-muted transition-colors">
                        <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
                        <span className="text-muted-foreground">{business.address}</span>
                    </a>
                     <a href={business.website} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 p-2 rounded-lg hover:bg-muted transition-colors">
                        <Globe className="h-5 w-5 flex-shrink-0 text-primary" />
                        <span className="text-muted-foreground">{business.website}</span>
                    </a>
                </div>

                <div className="space-y-3 pt-4 border-t">
                    <h3 className="text-center font-headline text-lg">Our Services</h3>
                    <div className="grid grid-cols-3 gap-2 text-center">
                        {services.map(service => (
                             <Link href="/services" key={service.name}>
                                <div className="flex flex-col items-center p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors h-full">
                                    {service.icon}
                                    <span className="mt-1 text-xs font-semibold">{service.name}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                 <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-center font-headline text-lg">Recent Work</h3>
                    <div className="grid grid-cols-3 gap-2">
                        {gallerySamples.map((sample, index) => (
                             <Link href="/gallery" key={index} className="aspect-square block relative overflow-hidden rounded-lg">
                                <Image
                                    src={sample.src}
                                    alt={`Work sample ${index + 1}`}
                                    data-ai-hint={sample.hint}
                                    fill
                                    className="object-cover transition-transform duration-300 hover:scale-110"
                                />
                            </Link>
                        ))}
                    </div>
                     <Button asChild variant="outline" className="w-full">
                        <Link href="/gallery">View All Work <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                </div>


                <div className="flex gap-3 pt-6 border-t">
                    <Button asChild className="flex-1">
                      <a href={`tel:${business.phone}`}><Phone className="mr-2 h-4 w-4"/> Call</a>
                    </Button>
                    <Button asChild variant="secondary" className="flex-1">
                      <a href={`https://wa.me/${business.phone}`} target="_blank" rel="noopener noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="mr-2 h-4 w-4"><path d="M16.75 13.96c.25.13.41.33.46.58.06.26.02.53-.13.75l-.83 1.25c-.18.27-.45.45-.75.54-.3.08-.62.06-.91-.05-.29-.12-.56-.29-.82-.52-.26-.22-.5-.49-.72-.8-1.12-1.59-2.22-3.21-3.23-4.82-.2-.32-.36-.65-.49-.99-.13-.34-.18-.7-.14-1.06.04-.36.16-.7.37-1.01.21-.31.5-.55.83-.71l1.25-.63c.22-.1.46-.14.7-.1.24.04.47.15.65.31.18.17.32.39.4.63.09.24.1.5.04.75l-1 4.5c-.05.25-.18.47-.36.65-.18.18-.42.3-.68.34-.13.02-.26.02-.39.01-.13-.01-.26-.03-.39-.07-.13-.04-.26-.09-.38-.15-.12-.06-.24-.13-.35-.22-.11-.08-.22-.18-.32-.28-.1-.1-.19-.2-.28-.3-.09-.1-.18-.2-.25-.29-.08-.1-.15-.19-.21-.29-.06-.1-.12-.2-.16-.3-.04-.1-.08-.2-.11-.29-.03-.09-.05-.18-.07-.27-.02-.09-.03-.18-.04-.26s-.02-.17-.02-.25.01-.16.03-.23.04-.15.07-.21.06-.13.1-.18.09-.1.13-.15.1-.09.15-.13.11-.08.17-.11.13-.06.19-.09.13-.05.19-.07.12-.04.19-.06.14-.03.21-.04.14-.02.21-.03.15-.02.22-.02.14,0,.22.01s.15.01.22.02.14.02.21.03.13.02.2.04c.06.01.13.03.19.05.06.02.12.04.18.06.28.1.54.26.77.46.23.21.43.46.59.74l-1.93-8.67-.02.01c-1.35 2.14-2.77 4.2-4.13 6.13-.25.36-.51.72-.76 1.07-.25.35-.5.69-.74 1.02-.49.68-.92 1.39-1.28 2.11-.36.72-.64 1.45-.84 2.19-.2.73-.31 1.47-.34 2.2-.03.73.02 1.46.14 2.18s.32 1.42.59 2.09.62 1.32 1.03 1.93c.42.61.9 1.19 1.45 1.72s1.16.99 1.83 1.38c.67.39 1.39.7 2.15.92.76.22 1.55.35 2.35.39.8.04 1.6-.01 2.38-.15.78-.14 1.55-.38 2.29-.7a11.5 11.5 0 0 0 4.1-3.08c.53-.51.99-1.06 1.39-1.64.4-.58.73-1.2.98-1.84.25-.64.42-1.3.51-1.96.09-.66.1-1.32.03-1.97-.07-.65-.22-1.29-.44-1.91l-.99-1.57Z"></path></svg>
                        WhatsApp
                      </a>
                    </Button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default BusinessCardPage;

    