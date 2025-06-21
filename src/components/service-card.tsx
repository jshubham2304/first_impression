'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Service } from "@/lib/types";

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
)

export function ServiceCard({ service }: { service: Service }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const descriptionSnippet = service.description.split(' ').slice(0, 30).join(' ') + '...';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-headline">{service.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground font-body text-sm leading-relaxed">
          {isExpanded || service.description.length < 200 ? service.description : descriptionSnippet}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-4">
        {service.description.length < 200 ? <div/> :
            <Button variant="link" className="p-0 h-auto text-primary" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? 'View Less' : 'View More'}
            </Button>
        }
        <div className="flex items-center gap-2">
            <Button asChild>
                <a href="/request-estimation">Enquire Now</a>
            </Button>
            <Button variant="outline" asChild>
                <a href="https://wa.me/910000000000" target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon className="mr-2 h-4 w-4"/>
                    WhatsApp
                </a>
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
