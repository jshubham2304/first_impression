import { serviceCategories } from '@/lib/services';
import { ServiceCard } from '@/components/service-card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function ServicesPage() {
  return (
    <div className="container py-12 max-w-screen-lg">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-headline font-bold">Our Services</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Professional solutions for all your painting and design needs.
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
