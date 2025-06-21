'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type VisualizerColor } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Download, Upload, Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

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

type VisualizerClientProps = {
    initialColors: VisualizerColor[];
}

export function VisualizerClient({ initialColors }: VisualizerClientProps) {
  const [selectedColor, setSelectedColor] = useState(initialColors?.[0]?.hex || '#ffffff');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
      if (initialColors && initialColors.length > 0 && !selectedColor) {
          setSelectedColor(initialColors[0].hex)
      }
  }, [initialColors, selectedColor])

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <div className="grid lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2">
        <Card>
          <CardContent className="p-4">
            <div className="relative w-full aspect-[4/3] bg-muted-foreground/10 rounded-lg overflow-hidden">
              <Image
                src={uploadedImage || "https://placehold.co/1200x900.png"}
                alt="Living room with sofa and window"
                data-ai-hint="modern living room"
                fill
                className="object-cover z-0"
              />
              <div
                className="absolute inset-0 z-10"
                style={{ mixBlendMode: 'multiply', backgroundColor: selectedColor }}
              />
              {!uploadedImage && (
                <Image
                  src="https://placehold.co/1200x900/e2e8f0/e2e8f0.png"
                  alt="Living room highlights"
                  data-ai-hint="room lighting"
                  fill
                  className="object-cover z-20"
                  style={{ mixBlendMode: 'screen' }}
                />
              )}
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
            {initialColors.length === 0 ? (
                <div className="grid grid-cols-4 gap-4">
                    {[...Array(8)].map((_, i) => <Skeleton key={i} className="w-12 h-12 rounded-full" />)}
                </div>
            ) : (
                <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-4 gap-4">
                {initialColors.map((color) => (
                    <ColorSwatch
                    key={color.hex}
                    color={color.hex}
                    name={color.name}
                    isSelected={selectedColor === color.hex}
                    onSelect={() => setSelectedColor(color.hex)}
                    />
                ))}
                </div>
            )}
            <div className="mt-8 flex flex-col space-y-3">
                <Button>
                    <Download className="mr-2 h-4 w-4"/>
                    Download Visualization
                </Button>
                 <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <Button variant="outline" onClick={handleUploadClick}>
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
