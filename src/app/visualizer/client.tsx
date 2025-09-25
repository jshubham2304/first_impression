'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type VisualizerColor } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Download, Upload, X, Maximize2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { categorizeShades, getPopularShades, getRecommendedShades, getColorOfTheYearShades, type Shade, type ColorCategory } from '@/lib/color-categories';
import { fetchAllColorsForFamily, type ShadeFamily } from '@/services/asian-paints-api';
import shadesData from '../../../assets/shades.json';

// Helper function to get fallback colors from assets/shades.json
const getFallbackColors = (): Shade[] => {
  if (!shadesData?.shade) return [];
  
  // Get a mix of popular, recommended, and various color families
  const popularColors = shadesData.shade
    .filter((shade: any) => shade.featureTag === 'Popular' || shade.popularity === '1')
    .slice(0, 8);
  
  const recommendedColors = shadesData.shade
    .filter((shade: any) => shade.featureTag === 'Recommended')
    .slice(0, 6);
  
  const diverseColors = shadesData.shade
    .filter((shade: any, index: number) => index % 500 === 0) // Get every 500th color for diversity
    .slice(0, 4);
  
  // Combine and return up to 24 colors
  const combined = [...popularColors, ...recommendedColors, ...diverseColors];
  return combined.slice(0, 24);
};

// Helper function to get fallback colors by family from assets/shades.json
const getFallbackColorsByFamily = (family: ShadeFamily): Shade[] => {
  if (!shadesData?.shade) return [];
  
  // Map family to the shadeFamily values in the JSON
  const familyMap: Record<ShadeFamily, string[]> = {
    'all': [], // Return diverse colors for 'all'
    'off-whites': ['off whites', 'off-whites', 'off white'],
    'whites': ['whites', 'white'],
    'reds': ['reds', 'red'],
    'pinks': ['pinks', 'pink'],
    'oranges': ['oranges', 'orange'],
    'yellows': ['yellows', 'yellow'],
    'greens': ['greens', 'green'],
    'blues': ['blues', 'blue'],
    'purples': ['purples', 'purple'],
    'violets': ['violets', 'violet'],
    'browns': ['browns', 'brown'],
    'greys': ['greys', 'grey'],
    'blacks': ['blacks', 'black'],
    'beiges': ['beiges', 'beige']
  };
  
  if (family === 'all') {
    // Return a diverse selection for 'all'
    return shadesData.shade
      .filter((shade: any, index: number) => index % 200 === 0) // Every 200th for diversity
      .slice(0, 50);
  }
  
  const familyNames = familyMap[family] || [];
  const familyColors = shadesData.shade
    .filter((shade: any) => 
      familyNames.some(name => 
        shade.shadeFamily?.toLowerCase().includes(name.toLowerCase())
      )
    )
    .slice(0, 50); // Limit to 50 colors per family
  
  return familyColors;
};

const ColorSwatch = ({
  color,
  name,
  code,
  isSelected,
  onSelect,
  onFullscreen,
  featureTag,
}: {
  color: string;
  name: string;
  code?: string;
  isSelected: boolean;
  onSelect: () => void;
  onFullscreen?: () => void;
  featureTag?: string;
}) => (
  <div 
    className={cn(
      "group cursor-pointer relative transition-all duration-300 ease-out transform",
      "border rounded-lg overflow-hidden backdrop-blur-sm",
      "hover:scale-105 hover:-translate-y-1",
      isSelected 
        ? 'border-primary/50 ring-2 ring-primary/20 ring-offset-1 shadow-lg shadow-primary/20 scale-105' 
        : 'border-gray-200/60 hover:border-gray-300/80 shadow-sm hover:shadow-md'
    )}
    onClick={onSelect}
    style={{
      background: isSelected 
        ? 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)'
        : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.95) 100%)'
    }}
  >
    {featureTag && (
      <Badge 
        variant="secondary" 
        className={cn(
          "absolute top-2 right-2 text-xs z-10 px-2 py-1 shadow-sm",
          "bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-0",
          "animate-pulse"
        )}
      >
        {featureTag === 'Recommended' ? '⭐' : featureTag === 'Colour of the year' ? '🏆' : ''}
      </Badge>
    )}
    <div
              className={cn(
                "w-full h-16 sm:h-20 md:h-24 relative transition-all duration-300",
                "before:absolute before:inset-0 before:bg-gradient-to-t before:from-black/5 before:to-transparent",
                "group-hover:before:from-black/10"
              )}
      style={{ 
        backgroundColor: color,
        background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`
      }}
    >
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300",
        "bg-gradient-to-br from-white/30 to-transparent"
      )} />
      
      {/* Fullscreen Button */}
      {onFullscreen && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFullscreen();
          }}
          className={cn(
            "absolute top-2 right-2 p-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white/20",
            "opacity-0 group-hover:opacity-100 transition-all duration-200",
            "hover:bg-white/90 hover:scale-110 shadow-lg z-10"
          )}
          title="View fullscreen"
        >
          <Maximize2 className="h-2.5 w-2.5 text-gray-600" />
        </button>
      )}
      
      {/* Translucent tag overlay */}
      <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center gap-2 z-10">
        {/* Code tag on the left */}
        {code && (
          <span className={cn(
            "text-xs font-mono px-2 py-1 rounded-full backdrop-blur-md border border-white/20 flex-shrink-0",
            "shadow-lg transition-all duration-200",
            isSelected 
              ? 'bg-black/70 text-white shadow-primary/20' 
              : 'bg-black/50 text-white/90 hover:bg-black/60'
          )}>
            {code}
          </span>
        )}
        
        {/* Name tag on the right */}
        <span className={cn(
          "text-xs font-bold px-2 py-1 rounded-full backdrop-blur-md border border-white/20",
          "flex-1 text-right truncate ml-1 shadow-lg transition-all duration-200",
          isSelected 
            ? 'bg-white/80 text-gray-900 shadow-primary/20' 
            : 'bg-white/60 text-gray-800 hover:bg-white/70'
        )}>
          {name}
        </span>
      </div>
    </div>
  </div>
);

type VisualizerClientProps = {
    initialColors: VisualizerColor[];
}

export function VisualizerClient({ initialColors }: VisualizerClientProps) {
  const [selectedColor, setSelectedColor] = useState('#F3EDE8'); // Default to air breeze
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [baseImage, setBaseImage] = useState('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop');
  const [activeTab, setActiveTab] = useState('families');
  
  // Color family filtering state
  const [selectedFamily, setSelectedFamily] = useState<ShadeFamily>('all');
  const [familyColors, setFamilyColors] = useState<Shade[]>([]);
  const [familyLoading, setFamilyLoading] = useState(false);
  
  // Full-screen overlay state
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [fullscreenColor, setFullscreenColor] = useState(selectedColor);
  
  // Image fullscreen overlay state
  const [showImageFullscreen, setShowImageFullscreen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State for API data
  const [colorCategories, setColorCategories] = useState<ColorCategory[]>([]);
  const [popularShades, setPopularShades] = useState<Shade[]>([]);
  const [recommendedShades, setRecommendedShades] = useState<Shade[]>([]);
  const [colorOfYearShades, setColorOfYearShades] = useState<Shade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Color family categories matching Asian Paints structure
  const colorFamilyCategories = [
    { id: 'all', name: 'ALL COLOURS', apiFamily: 'all' as ShadeFamily },
    { id: 'greys', name: 'GREYS', apiFamily: 'greys' as ShadeFamily },
    { id: 'blues', name: 'BLUES', apiFamily: 'blues' as ShadeFamily },
    { id: 'browns', name: 'BROWNS', apiFamily: 'browns' as ShadeFamily },
    { id: 'reds', name: 'REDS & ORANGES', apiFamily: 'reds' as ShadeFamily },
    { id: 'yellows', name: 'YELLOWS', apiFamily: 'yellows' as ShadeFamily },
    { id: 'greens', name: 'GREENS', apiFamily: 'greens' as ShadeFamily },
    { id: 'purples', name: 'PURPLES', apiFamily: 'purples' as ShadeFamily },
    { id: 'pinks', name: 'PINKS', apiFamily: 'pinks' as ShadeFamily },
    { id: 'whites', name: 'WHITES & OFF WHITES', apiFamily: 'whites' as ShadeFamily },
  ];

  // Load data from API
  useEffect(() => {
    const loadColorData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Load all data in parallel for better performance
        const [categories, popular, recommended, colorOfYear] = await Promise.all([
          categorizeShades(),
          getPopularShades(24),
          getRecommendedShades(),
          getColorOfTheYearShades()
        ]);

        // Add logging for debugging mobile issues
        console.log('Loaded data:', {
          categories: categories.length,
          popular: popular.length,
          recommended: recommended.length,
          colorOfYear: colorOfYear.length
        });

        setColorCategories(categories);
        setPopularShades(popular);
        setRecommendedShades(recommended);
        setColorOfYearShades(colorOfYear);

        // If no data was loaded, provide fallback colors from assets/shades.json
        if (popular.length === 0 && recommended.length === 0 && colorOfYear.length === 0) {
          console.warn('No data loaded, using fallback colors from assets/shades.json');
          const fallbackColors = getFallbackColors();
          
          if (fallbackColors.length > 0) {
            // Split fallback colors between different tabs
            const popularFallback = fallbackColors.filter(shade => shade.featureTag === 'Popular' || shade.popularity === '1').slice(0, 12);
            const recommendedFallback = fallbackColors.filter(shade => shade.featureTag === 'Recommended').slice(0, 8);
            const cotyFallback = fallbackColors.filter(shade => shade.featureTag === 'Colour of the year').slice(0, 6);
            
            // If we don't have enough in specific categories, fill with remaining colors
            if (popularFallback.length < 12) {
              const remaining = fallbackColors.filter(shade => !popularFallback.includes(shade)).slice(0, 12 - popularFallback.length);
              popularFallback.push(...remaining);
            }
            
            setPopularShades(popularFallback);
            setRecommendedShades(recommendedFallback.length > 0 ? recommendedFallback : popularFallback.slice(0, 8));
            setColorOfYearShades(cotyFallback.length > 0 ? cotyFallback : popularFallback.slice(0, 6));
            
            console.log('Loaded fallback colors:', {
              popular: popularFallback.length,
              recommended: recommendedFallback.length,
              coty: cotyFallback.length
            });
          } else {
            console.error('No fallback colors available in assets/shades.json');
          }
        }
      } catch (err) {
        console.error('Error loading color data:', err);
        
        // Try to load fallback colors even on error
        console.log('Attempting to load fallback colors due to error...');
        const fallbackColors = getFallbackColors();
        
        if (fallbackColors.length > 0) {
          const popularFallback = fallbackColors.filter(shade => shade.featureTag === 'Popular' || shade.popularity === '1').slice(0, 12);
          const recommendedFallback = fallbackColors.filter(shade => shade.featureTag === 'Recommended').slice(0, 8);
          const cotyFallback = fallbackColors.filter(shade => shade.featureTag === 'Colour of the year').slice(0, 6);
          
          if (popularFallback.length < 12) {
            const remaining = fallbackColors.filter(shade => !popularFallback.includes(shade)).slice(0, 12 - popularFallback.length);
            popularFallback.push(...remaining);
          }
          
          setPopularShades(popularFallback);
          setRecommendedShades(recommendedFallback.length > 0 ? recommendedFallback : popularFallback.slice(0, 8));
          setColorOfYearShades(cotyFallback.length > 0 ? cotyFallback : popularFallback.slice(0, 6));
          
          console.log('Successfully loaded fallback colors after error');
          setError('Using offline colors. Some features may be limited.');
        } else {
          // Provide more specific error messages if fallback also fails
          if (err instanceof TypeError && err.message.includes('Failed to fetch')) {
            setError('Network error: Please check your internet connection and try again.');
          } else if (err instanceof TypeError && err.message.includes('NetworkError')) {
            setError('Connection blocked: The color API may be temporarily unavailable.');
          } else {
            setError('Failed to load colors. Please refresh the page and try again.');
          }
        }
      } finally {
        setLoading(false);
      }
    };

    loadColorData();
  }, []);

  // Load all colors by family
  const loadColorsByFamily = async (family: ShadeFamily) => {
    try {
      setFamilyLoading(true);
      setError(null);
      setFamilyColors([]);
      
      console.log('Loading colors for family:', family);
      // Get all colors for the selected family
      const allColors = await fetchAllColorsForFamily(family);
      console.log('Loaded family colors:', allColors.length);
      
      // Check if we got valid colors
      if (allColors && allColors.length > 0) {
        setFamilyColors(allColors);
      } else {
        // If API returns empty or no colors, try fallback
        console.log('No colors from API, attempting fallback for family:', family);
        const fallbackFamilyColors = getFallbackColorsByFamily(family);
        
        if (fallbackFamilyColors.length > 0) {
          setFamilyColors(fallbackFamilyColors);
          console.log('Loaded fallback family colors:', fallbackFamilyColors.length);
          setError('Using offline colors for this category. Some features may be limited.');
        } else {
          setError('No colors available for this category.');
          setFamilyColors([]);
        }
      }
    } catch (err) {
      console.error('Error loading colors by family:', err);
      
      // Try to load fallback colors for this family
      console.log('Attempting to load fallback colors due to error for family:', family);
      const fallbackFamilyColors = getFallbackColorsByFamily(family);
      
      if (fallbackFamilyColors.length > 0) {
        setFamilyColors(fallbackFamilyColors);
        console.log('Loaded fallback family colors after error:', fallbackFamilyColors.length);
        setError('Using offline colors for this category. Some features may be limited.');
      } else {
        setError('Failed to load colors for this category. Please try again.');
        setFamilyColors([]);
      }
    } finally {
      setFamilyLoading(false);
    }
  };


  // Handle fullscreen color preview
  const openFullscreen = (color: string) => {
    setFullscreenColor(color);
    setSelectedColor(color);
    setShowFullscreen(true);
    // Prevent body scrolling when overlay is open
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreen = () => {
    setShowFullscreen(false);
    // Restore body scrolling
    document.body.style.overflow = 'unset';
  };

  // Handle image fullscreen
  const openImageFullscreen = () => {
    setShowImageFullscreen(true);
    // Prevent body scrolling when overlay is open
    document.body.style.overflow = 'hidden';
  };

  const closeImageFullscreen = () => {
    setShowImageFullscreen(false);
    // Restore body scrolling
    document.body.style.overflow = 'unset';
  };

  // Handle escape key to close overlays
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showFullscreen) {
          closeFullscreen();
        } else if (showImageFullscreen) {
          closeImageFullscreen();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      // Cleanup body scroll on unmount
      document.body.style.overflow = 'unset';
    };
  }, [showFullscreen, showImageFullscreen]);

  // Load initial family colors
  useEffect(() => {
    loadColorsByFamily(selectedFamily);
  }, [selectedFamily]);

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
        setBaseImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <div className="flex flex-col xl:grid xl:grid-cols-2 gap-2 sm:gap-3 sm:gap-4 lg:gap-6 xl:gap-8 min-h-screen bg-gradient-to-br from-gray-50/30 via-white to-blue-50/20 p-2 sm:p-3 lg:p-4 xl:p-6">
      <div className="xl:col-span-1">
        <Card className="shadow-lg sm:shadow-xl border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div 
              className="relative w-full aspect-[4/3] sm:aspect-[3/2] bg-gradient-to-br from-gray-100/50 to-gray-200/30 rounded-lg sm:rounded-xl overflow-hidden shadow-inner cursor-pointer group transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] sm:hover:scale-[1.02]"
              onClick={openImageFullscreen}
              title="Click to view fullscreen"
            >
              <Image
                src={baseImage}
                alt="Living room with sofa and window"
                data-ai-hint="modern living room"
                fill
                className="object-cover z-0"
              />
              <div
                className="absolute inset-0 z-10"
                style={{ mixBlendMode: 'multiply', backgroundColor: selectedColor }}
              />
              
              {/* Fullscreen Indicator */}
              <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                <div className="p-2 sm:p-3 bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-lg">
                  <Maximize2 className="h-3 w-3 sm:h-5 sm:w-5 text-gray-600" />
                </div>
              </div>
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 z-15 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="xl:col-span-1">
        <Card className="shadow-lg sm:shadow-xl border-0 bg-white/90 backdrop-blur-md overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-gray-100/50 p-3 sm:p-4 lg:p-6">
            <CardTitle className="font-headline text-lg sm:text-xl lg:text-2xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Choose a Color
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 lg:p-6">
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-4">
                <p className="text-destructive text-sm">{error}</p>
              </div>
            )}
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 mb-3 sm:mb-4 p-1 bg-gradient-to-r from-gray-100/80 to-gray-50/80 backdrop-blur-sm border border-gray-200/50 shadow-sm gap-0.5 sm:gap-1">
                <TabsTrigger 
                  value="popular" 
                  disabled={loading}
                  className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:border-gray-200/50 transition-all duration-200 text-xs sm:text-sm px-1 py-1.5 sm:px-3 sm:py-2"
                >
                  Popular
                </TabsTrigger>
                <TabsTrigger 
                  value="recommended" 
                  disabled={loading}
                  className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:border-gray-200/50 transition-all duration-200 text-xs sm:text-sm px-1 py-1.5 sm:px-3 sm:py-2"
                >
                  <span className="hidden sm:inline">⭐ Featured</span>
                  <span className="sm:hidden">⭐</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="families" 
                  disabled={loading}
                  className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:border-gray-200/50 transition-all duration-200 text-xs sm:text-sm px-1 py-1.5 sm:px-3 sm:py-2 col-span-2 sm:col-span-1"
                >
                  Families
                </TabsTrigger>
                <TabsTrigger 
                  value="categories" 
                  disabled={loading}
                  className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:border-gray-200/50 transition-all duration-200 text-xs sm:text-sm px-1 py-1.5 sm:px-3 sm:py-2"
                >
                  <span className="hidden sm:inline">Categories</span>
                  <span className="sm:hidden">Cat.</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="coty" 
                  disabled={loading}
                  className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:border-gray-200/50 transition-all duration-200 text-xs sm:text-sm px-1 py-1.5 sm:px-3 sm:py-2"
                >
                  <span className="hidden sm:inline">🏆 COTY</span>
                  <span className="sm:hidden">🏆</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="popular" className="space-y-4">
                {loading ? (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3 min-h-[200px]">
                    {[...Array(24)].map((_, i) => (
                      <div key={i} className="border border-gray-200/60 rounded-lg overflow-hidden bg-gradient-to-br from-gray-50/50 to-white shadow-sm animate-pulse">
                        <Skeleton className="w-full h-16 sm:h-20 md:h-24 bg-gradient-to-r from-gray-200/60 via-gray-100/80 to-gray-200/60" />
                      </div>
                    ))}
                  </div>
                ) : popularShades.length === 0 ? (
                  <div className="text-center p-8">
                    <p className="text-gray-500 mb-4">No colors found</p>
                    <p className="text-sm text-gray-400">
                      There may be a connection issue. Please try refreshing the page.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3 min-h-[200px]">
                    {popularShades.map((shade) => (
                      <ColorSwatch
                        key={shade.entityCode}
                        color={shade.shadeHexCode}
                        name={shade.entityName}
                        code={shade.entityCode}
                        isSelected={selectedColor === shade.shadeHexCode}
                        onSelect={() => setSelectedColor(shade.shadeHexCode)}
                        onFullscreen={() => openFullscreen(shade.shadeHexCode)}
                        featureTag={shade.featureTag}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="recommended" className="space-y-4">
                {loading ? (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3 min-h-[200px]">
                    {[...Array(20)].map((_, i) => (
                      <div key={i} className="border border-gray-200/60 rounded-lg overflow-hidden bg-gradient-to-br from-gray-50/50 to-white shadow-sm animate-pulse">
                        <Skeleton className="w-full h-16 sm:h-20 md:h-24 bg-gradient-to-r from-gray-200/60 via-gray-100/80 to-gray-200/60" />
                      </div>
                    ))}
                  </div>
                ) : recommendedShades.length === 0 ? (
                  <div className="text-center p-8">
                    <p className="text-gray-500 mb-4">No colors found</p>
                    <p className="text-sm text-gray-400">
                      There may be a connection issue. Please try refreshing the page.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3 min-h-[200px]">
                    {recommendedShades.map((shade) => (
                      <ColorSwatch
                        key={shade.entityCode}
                        color={shade.shadeHexCode}
                        name={shade.entityName}
                        code={shade.entityCode}
                        isSelected={selectedColor === shade.shadeHexCode}
                        onSelect={() => setSelectedColor(shade.shadeHexCode)}
                        onFullscreen={() => openFullscreen(shade.shadeHexCode)}
                        featureTag={shade.featureTag}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="families" className="space-y-4">
                {/* Horizontal Category Filter Buttons */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 text-xs">
                    {colorFamilyCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedFamily(category.apiFamily)}
                        className={cn(
                          "px-1.5 py-1.5 sm:px-2 sm:py-2 text-center font-semibold rounded-md sm:rounded-lg transition-all duration-300 ease-out transform",
                          "border backdrop-blur-sm relative overflow-hidden text-xs",
                          "hover:scale-105 hover:-translate-y-0.5",
                          selectedFamily === category.apiFamily
                            ? "bg-gradient-to-r from-primary to-primary/80 text-white border-primary/50 shadow-lg shadow-primary/25 scale-105"
                            : "bg-gradient-to-r from-gray-50/80 to-white/90 hover:from-gray-100/80 hover:to-white text-gray-700 border-gray-200/60 shadow-sm hover:shadow-md"
                        )}
                      >
                        <span className="relative z-10 whitespace-nowrap overflow-hidden text-ellipsis text-xs sm:text-sm">{category.name}</span>
                        {selectedFamily === category.apiFamily && (
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-50" />
                        )}
                      </button>
                    ))}
                  </div>
                  
                  {/* Colors Grid */}
                  {familyLoading ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3 min-h-[200px]">
                      {[...Array(12)].map((_, i) => (
                        <div key={i} className="border border-gray-200/60 rounded-lg overflow-hidden bg-gradient-to-br from-gray-50/50 to-white shadow-sm animate-pulse">
                          <Skeleton className="w-full h-16 sm:h-20 md:h-24 bg-gradient-to-r from-gray-200/60 via-gray-100/80 to-gray-200/60" />
                        </div>
                      ))}
                    </div>
                  ) : familyColors.length > 0 ? (
                    <div className="space-y-4">
                      <div className="text-center p-3 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/10">
                        <p className="text-sm font-semibold text-primary">
                          {familyColors.length} beautiful colors available
                        </p>
                      </div>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3 min-h-[200px] max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        {familyColors.map((shade) => (
                          <ColorSwatch
                            key={shade.entityCode}
                            color={shade.shadeHexCode}
                            name={shade.entityName}
                            code={shade.entityCode}
                            isSelected={selectedColor === shade.shadeHexCode}
                            onSelect={() => setSelectedColor(shade.shadeHexCode)}
                            onFullscreen={() => openFullscreen(shade.shadeHexCode)}
                            featureTag={shade.featureTag}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center text-sm py-4">
                      No colors available for this family
                    </p>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="categories" className="space-y-4">
                {loading ? (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Skeleton className="w-24 h-4" />
                          <Skeleton className="w-8 h-5" />
                        </div>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3 min-h-[200px]">
                          {[...Array(12)].map((_, j) => (
                            <div key={j} className="flex flex-col items-center p-2">
                              <Skeleton className="w-16 h-16 rounded-lg" />
                              <Skeleton className="w-20 h-3 mt-2" />
                              <Skeleton className="w-12 h-4 mt-1" />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {colorCategories.map((category) => (
                      <div key={category.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm flex items-center gap-2">
                            <span>{category.icon}</span>
                            {category.name}
                          </h4>
                          <Badge variant="outline" className="text-xs">
                            {category.shades.length}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3 min-h-[200px]">
                          {category.shades.slice(0, 12).map((shade) => (
                            <ColorSwatch
                              key={shade.entityCode}
                              color={shade.shadeHexCode}
                              name={shade.entityName}
                              code={shade.entityCode}
                              isSelected={selectedColor === shade.shadeHexCode}
                              onSelect={() => setSelectedColor(shade.shadeHexCode)}
                              featureTag={shade.featureTag}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="coty" className="space-y-4">
                {loading ? (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3 min-h-[200px]">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="border border-gray-200/60 rounded-lg overflow-hidden bg-gradient-to-br from-gray-50/50 to-white shadow-sm animate-pulse">
                        <Skeleton className="w-full h-16 sm:h-20 md:h-24 bg-gradient-to-r from-gray-200/60 via-gray-100/80 to-gray-200/60" />
                      </div>
                    ))}
                  </div>
                ) : colorOfYearShades.length > 0 ? (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3 min-h-[200px]">
                    {colorOfYearShades.map((shade) => (
                      <ColorSwatch
                        key={shade.entityCode}
                        color={shade.shadeHexCode}
                        name={shade.entityName}
                        code={shade.entityCode}
                        isSelected={selectedColor === shade.shadeHexCode}
                        onSelect={() => setSelectedColor(shade.shadeHexCode)}
                        onFullscreen={() => openFullscreen(shade.shadeHexCode)}
                        featureTag={shade.featureTag}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center text-sm py-4">
                    No Color of the Year shades available
                  </p>
                )}
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 sm:mt-8 flex flex-col space-y-3 sm:space-y-4 pt-4 sm:pt-6 border-t border-gray-100/80">
                <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base py-2 sm:py-3">
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
                <Button 
                  variant="outline" 
                  onClick={handleUploadClick}
                  className="border-2 border-gray-200/80 hover:border-primary/50 bg-gradient-to-r from-white to-gray-50/50 hover:from-primary/5 hover:to-primary/10 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 text-sm sm:text-base py-2 sm:py-3"
                >
                    <Upload className="mr-2 h-4 w-4"/>
                    Upload Your Own Room
                </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Full-screen Color Preview Overlay */}
      {showFullscreen && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={closeFullscreen}
        >
          <div 
            className="relative w-full max-w-4xl aspect-[4/3] sm:aspect-[3/2] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500 mx-2 sm:mx-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background Image */}
            <Image
              src={baseImage}
              alt="Room visualization"
              fill
              className="object-cover"
            />
            
            {/* Color Overlay */}
            <div
              className="absolute inset-0"
              style={{ 
                mixBlendMode: 'multiply', 
                backgroundColor: fullscreenColor,
                background: `linear-gradient(135deg, ${fullscreenColor}dd 0%, ${fullscreenColor} 60%, ${fullscreenColor}dd 100%)`
              }}
            />

            {/* Controls */}
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex gap-1 sm:gap-2">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl px-2 py-1 sm:px-4 sm:py-2 shadow-lg">
                <p className="text-xs sm:text-sm font-semibold text-gray-800">
                  <span className="hidden sm:inline">Selected Color: </span>{fullscreenColor}
                </p>
              </div>
              <button
                onClick={closeFullscreen}
                className="p-2 sm:p-3 bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-lg hover:bg-white transition-all duration-200 hover:scale-110"
                title="Close fullscreen"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
              </button>
            </div>

            {/* Bottom Info Panel */}
            <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4">
              <div className="bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-4 shadow-lg">
                <div className="flex items-center justify-between flex-col sm:flex-row gap-2 sm:gap-0">
                  <div className="text-center sm:text-left">
                    <h3 className="font-semibold text-sm sm:text-lg text-gray-800">Full Preview</h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      <span className="hidden sm:inline">Click outside to close • Press ESC to exit</span>
                      <span className="sm:hidden">Tap outside to close</span>
                    </p>
                  </div>
                  <Button 
                    onClick={closeFullscreen}
                    className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2"
                    size="sm"
                  >
                    <Download className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4"/>
                    <span className="hidden sm:inline">Download</span>
                    <span className="sm:hidden">Save</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full-screen Image Overlay */}
      {showImageFullscreen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={closeImageFullscreen}
        >
          <div 
            className="relative w-full max-w-6xl aspect-[4/3] sm:aspect-[3/2] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500 mx-2 sm:mx-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background Image */}
            <Image
              src={baseImage}
              alt="Room visualization fullscreen"
              fill
              className="object-cover"
            />
            
            {/* Color Overlay */}
            <div
              className="absolute inset-0"
              style={{ 
                mixBlendMode: 'multiply', 
                backgroundColor: selectedColor,
                background: `linear-gradient(135deg, ${selectedColor}dd 0%, ${selectedColor} 60%, ${selectedColor}dd 100%)`
              }}
            />

            {/* Top Controls */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
                <h3 className="font-semibold text-lg text-gray-800">Room Visualization</h3>
                <p className="text-sm text-gray-600">Current Color: {selectedColor}</p>
              </div>
              <button
                onClick={closeImageFullscreen}
                className="p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:bg-white transition-all duration-200 hover:scale-110"
                title="Close fullscreen"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Full Room Preview</p>
                    <p className="text-xs text-gray-500">Click outside to close • Press ESC to exit</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      onClick={closeImageFullscreen}
                      className="border-2 border-gray-200/80"
                    >
                      Close
                    </Button>
                    <Button 
                      className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                    >
                      <Download className="mr-2 h-4 w-4"/>
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
