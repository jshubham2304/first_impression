import { serviceCategories } from '@/lib/services';
import { ServiceCard } from '@/components/service-card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { Metadata } from 'next';

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
    description: "🎨 Expert interior & exterior painting in Udaipur | ✨ Free consultation | 🏠 Premium Asian Paints | 📞 Call for free estimate",
    images: ["https://res.cloudinary.com/dfydjfauz/image/upload/v1754548771/apple-touch-icon_mwod6q.png"],
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
