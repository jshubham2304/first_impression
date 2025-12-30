'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Service } from "@/lib/types";
import { Check, ChevronDown, ChevronUp, Phone, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ServiceCard({ service }: { service: Service }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        {service.image && (
          <div className="relative w-full md:w-72 h-48 md:h-auto flex-shrink-0">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 288px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:bg-gradient-to-r" />
          </div>
        )}

        {/* Content Section */}
        <div className="flex-1 flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-4">
              <CardTitle className="text-xl font-headline">{service.title}</CardTitle>
              <Badge variant="secondary" className="bg-primary/10 text-primary shrink-0">
                End-to-End
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="flex-1 pb-4">
            <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">
              {service.description}
            </p>

            {/* Checklist Section */}
            {service.checklist && service.checklist.length > 0 && (
              <div className="space-y-3">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  {isExpanded ? 'Hide' : 'View'} What&apos;s Included ({service.checklist.length} items)
                </button>

                <div className={cn(
                  "grid gap-2 overflow-hidden transition-all duration-300",
                  isExpanded ? "grid-cols-1 sm:grid-cols-2 max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                )}>
                  {service.checklist.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm"
                    >
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="pt-0 pb-4 flex flex-wrap gap-2">
            <Button asChild size="sm">
              <a href="/request-estimation" className="flex items-center gap-2">
                Get Free Quote
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="tel:+918560077888" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Call Now
              </a>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <a href="https://wa.me/918560077888" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
