'use client';

import React, { useCallback, useMemo } from 'react';
import Link from 'next/link';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import type { Container, ISourceOptions } from '@tsparticles/engine';
import { loadFull } from 'tsparticles'; 
import { useTheme } from 'next-themes';
import { serviceCategories } from '@/lib/services';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bed, Home, Paintbrush } from 'lucide-react';

const serviceIcons = [
  <Paintbrush key="living-room" className="h-8 w-8" />,
  <Bed key="bed-room" className="h-8 w-8" />,
  <Home key="exterior" className="h-8 w-8" />,
];

const featuredServices = serviceCategories.find(c => c.id === 'painting')?.services.slice(0, 3) || [];

export function InteractiveServices() {
  const [isInitialized, setIsInitialized] = React.useState(false);
  const { theme } = useTheme();

  React.useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setIsInitialized(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    // console.log('Particles container loaded', container);
  };

  const particleOptions = useMemo((): ISourceOptions => {
    const particleColor = theme === 'dark' ? '#FFFFFF' : '#000000';
    return {
        background: {
            color: {
                value: 'transparent',
            },
        },
        fpsLimit: 120,
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: 'repulse',
                },
            },
            modes: {
                repulse: {
                    distance: 100,
                    duration: 0.4,
                },
            },
        },
        particles: {
            color: {
                value: particleColor,
            },
            links: {
                color: particleColor,
                distance: 150,
                enable: true,
                opacity: 0.2,
                width: 1,
            },
            move: {
                direction: 'none',
                enable: true,
                outModes: {
                    default: 'bounce',
                },
                random: false,
                speed: 1,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                },
                value: 80,
            },
            opacity: {
                value: 0.3,
            },
            shape: {
                type: 'circle',
            },
            size: {
                value: { min: 1, max: 3 },
            },
        },
        detectRetina: true,
    };
  }, [theme]);


  if (!isInitialized) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-background relative">
        <div className="absolute inset-0 z-0">
             <Particles
                id="tsparticles-services"
                particlesLoaded={particlesLoaded}
                options={particleOptions}
            />
        </div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-semibold">Our Core Services</h2>
            <p className="text-muted-foreground mt-2 font-body">
              Professional solutions for every surface and space.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <Card key={service.title} className="flex flex-col text-center items-center hover:shadow-lg transition-shadow duration-300 bg-background/80 backdrop-blur-sm">
                <CardContent className="p-6 pt-6 flex flex-col items-center flex-grow">
                    <div className="mb-6 bg-primary/10 text-primary p-4 rounded-full">
                        {serviceIcons[index]}
                    </div>
                    <h3 className="font-headline text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground font-body text-sm mb-6 flex-grow">
                        {service.description.substring(0, 120)}...
                    </p>
                    <Button asChild variant="outline" className="mt-auto">
                        <Link href="/services">
                          Learn More
                        </Link>
                    </Button>
                </CardContent>
              </Card>
            ))}
          </div>
           <div className="text-center mt-12">
              <Button asChild size="lg">
                <Link href="/services">
                  View All Services
                </Link>
              </Button>
            </div>
        </div>
    </section>
  );
}
