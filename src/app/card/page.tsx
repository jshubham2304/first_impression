'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, MapPin, Globe, Brush, Building, Droplets } from 'lucide-react';

const BusinessCardPage = () => {
  const business = {
    name: 'First Impression',
    contactPerson: 'Shubham',
    phone: '+91-0000000000',
    email: 'info@firstimpression.com',
    address: 'Udaipur City, Udaipur - 313001, Rajasthan',
    website: 'https://firstimpression.com', // Placeholder
    logo: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1754548771/apple-touch-icon_mwod6q.png',
    services: [
      { icon: <Brush className="h-5 w-5 text-primary" />, name: 'Painting' },
      { icon: <Building className="h-5 w-5 text-primary" />, name: 'Interior Design' },
      { icon: <Droplets className="h-5 w-5 text-primary" />, name: 'Waterproofing' },
    ],
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4 font-body">
      <Card className="w-full max-w-sm overflow-hidden rounded-2xl shadow-2xl">
        <div className="bg-primary p-6 text-center text-primary-foreground">
            <Image
                src={business.logo}
                alt={`${business.name} Logo`}
                data-ai-hint="logo"
                width={80}
                height={80}
                className="mx-auto mb-3 rounded-full border-4 border-white/50 bg-white"
            />
          <h1 className="font-headline text-3xl font-bold">{business.name}</h1>
          <p className="mt-1 text-lg opacity-90">{business.contactPerson}</p>
        </div>
        <CardContent className="p-6 space-y-5">
          
          <div className="grid grid-cols-2 gap-3">
              <Button asChild variant="outline">
                <a href={`tel:${business.phone}`}><Phone className="mr-2"/> Call Us</a>
              </Button>
              <Button asChild variant="outline">
                <a href={`mailto:${business.email}`}><Mail className="mr-2"/> Email</a>
              </Button>
          </div>
          
           <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 text-sm p-3 rounded-lg hover:bg-muted transition-colors">
              <MapPin className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
              <span className="text-muted-foreground">{business.address}</span>
            </a>

          <div>
             <h3 className="mb-3 text-sm font-semibold uppercase text-muted-foreground tracking-wider">Our Services</h3>
             <div className="flex justify-around">
                {business.services.map(service => (
                    <div key={service.name} className="flex flex-col items-center gap-2">
                        {service.icon}
                        <span className="text-xs font-medium">{service.name}</span>
                    </div>
                ))}
            </div>
          </div>
        
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessCardPage;
