
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Globe } from 'lucide-react';

const BusinessCardPage = () => {
  const business = {
    name: 'First Impression',
    contactPerson: 'Hitesh Badala',
    phone: '8560077888',
    email: 'info@firstimpression.com',
    address: 'Udaipur City, Udaipur - 313001, Rajasthan',
    website: 'https://firstimpression.com',
    logo: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1754548771/apple-touch-icon_mwod6q.png',
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4 font-body">
        <div className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-background shadow-2xl">

            {/* Top section with background image */}
            <div className="relative h-48 w-full">
                <Image
                    src="https://images.unsplash.com/photo-1596205252494-82575a8b3e8a?q=80&w=800&auto=format&fit=crop"
                    alt="Abstract paint texture"
                    data-ai-hint="abstract paint texture"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
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
                     <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 p-2 rounded-lg hover:bg-muted transition-colors">
                        <MapPin className="h-5 w-5 flex-shrink-0 text-primary" />
                        <span className="text-muted-foreground">{business.address}</span>
                    </a>
                </div>

                <div className="flex gap-3 pt-4 border-t">
                    <Button asChild className="flex-1">
                      <a href={`tel:${business.phone}`}><Phone className="mr-2"/> Call</a>
                    </Button>
                    <Button asChild variant="secondary" className="flex-1">
                      <a href={`https://wa.me/${business.phone}`} target="_blank" rel="noopener noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
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
