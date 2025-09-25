import { serviceCategories } from '@/lib/services';
import { ServiceCard } from '@/components/service-card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Professional Painting & Design Services in Udaipur",
  description: "Complete interior and architectural services in Udaipur. Professional painting, wall treatments, design consultation, color matching, and home renovation services with expert craftsmanship.",
  keywords: [
    "painting services Udaipur",
    "interior painting Udaipur",
    "exterior painting Udaipur",
    "architectural services Udaipur",
    "home renovation Udaipur",
    "color consultation Udaipur",
    "professional painters Udaipur",
    "wall painting Udaipur",
    "interior design Udaipur",
    "paint contractor Udaipur",
    "residential painting",
    "commercial painting",
    "wall treatments",
    "paint estimation",
    "design services"
  ],
  openGraph: {
    title: "Professional Painting & Design Services in Udaipur | First Impression",
    description: "Complete interior and architectural services in Udaipur with expert craftsmanship and professional quality.",
    images: [
      {
        url: "https://res.cloudinary.com/dfydjfauz/image/upload/v1754548771/apple-touch-icon_mwod6q.png",
        width: 1200,
        height: 630,
        alt: "First Impression Professional Services in Udaipur",
      },
    ],
  },
  twitter: {
    title: "Professional Painting & Design Services in Udaipur",
    description: "Complete interior and architectural services with expert craftsmanship.",
  },
};

export default function ServicesPage() {
  return (
    <div className="container py-12 max-w-screen-lg">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-headline font-bold">Our Services</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Interior & Architectural Services in Udaipur
        </p>
      </div>

      <Accordion type="multiple" defaultValue={[serviceCategories[0].id]} className="w-full space-y-4">
        {serviceCategories.map((category) => (
            <AccordionItem key={category.id} value={category.id} className="border-b-0">
              <AccordionTrigger className="text-2xl font-headline font-semibold bg-secondary/80 px-6 rounded-md hover:no-underline hover:bg-secondary">
                {category.title} ({category.services.length})
              </AccordionTrigger>
              <AccordionContent className="pt-6">
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
  );
}
