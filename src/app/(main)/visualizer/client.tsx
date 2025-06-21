'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { roomColors } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Download, Upload } from 'lucide-react';

const ColorSwatch = ({
  color,
  name,
  isSelected,
  onSelect,
}: {
  color: string;
  name: string;
  isSelected: boolean;
  onSelect: () => void;
}) => (
  <div className="flex flex-col items-center group cursor-pointer" onClick={onSelect}>
    <div
      className={cn(
        'w-12 h-12 rounded-full border-2 transition-all duration-200 ease-in-out',
        isSelected ? 'border-primary ring-2 ring-primary ring-offset-2 scale-110' : 'border-transparent group-hover:scale-110'
      )}
      style={{ backgroundColor: color }}
    />
    <p className={cn(
      "mt-2 text-xs text-center transition-colors",
      isSelected ? 'text-primary font-semibold' : 'text-muted-foreground'
    )}>{name}</p>
  </div>
);

export function VisualizerClient() {
  const [selectedColor, setSelectedColor] = useState(roomColors[0].hex);

  return (
    <div className="grid lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2">
        <Card>
          <CardContent className="p-4">
            <div className="relative w-full aspect-[4/3] bg-muted-foreground/10 rounded-lg overflow-hidden">
              <Image
                src="https://placehold.co/1200x900.png"
                alt="Living room with sofa and window"
                data-ai-hint="modern living room"
                fill
                className="object-cover z-0"
              />
              <div
                className="absolute inset-0 z-10"
                style={{ mixBlendMode: 'multiply', backgroundColor: selectedColor }}
              />
               <Image
                src="https://placehold.co/1200x900/e2e8f0/e2e8f0.png"
                alt="Living room highlights"
                data-ai-hint="room lighting"
                fill
                className="object-cover z-20"
                style={{ mixBlendMode: 'screen' }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1 sticky top-24">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Choose a Color</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-4 gap-4">
              {roomColors.map((color) => (
                <ColorSwatch
                  key={color.hex}
                  color={color.hex}
                  name={color.name}
                  isSelected={selectedColor === color.hex}
                  onSelect={() => setSelectedColor(color.hex)}
                />
              ))}
            </div>
            <div className="mt-8 flex flex-col space-y-3">
                <Button>
                    <Download className="mr-2 h-4 w-4"/>
                    Download Visualization
                </Button>
                <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4"/>
                    Upload Your Own Room
                </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
