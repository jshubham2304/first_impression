import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Award, Briefcase, Clock, Users } from 'lucide-react';
import Link from 'next/link';

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
                    src="https://images.unsplash.com/photo-1556742059-4f74465a4143?q=80&w=1200&auto=format&fit=crop"
                    alt="A team of painters discussing a project"
                    data-ai-hint="painters team meeting"
                    width={800}
                    height={800}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
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
