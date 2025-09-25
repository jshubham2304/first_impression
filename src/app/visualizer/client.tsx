'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type VisualizerColor } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Download, Upload, X, Maximize2, Filter, Thermometer, Palette, Home, RotateCcw, Layers } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { categorizeShades, getPopularShades, getRecommendedShades, getColorOfTheYearShades, type Shade, type ColorCategory } from '@/lib/color-categories';
import { fetchAllColorsForFamily, getApiStatus, recheckApiAvailability, type ShadeFamily } from '@/services/asian-paints-api';
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
                "w-full h-20 sm:h-24 md:h-28 lg:h-32 relative transition-all duration-300",
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
  // Removed tab state - using single unified view
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [apiStatus, setApiStatus] = useState<string>('');
  
  // Color family filtering state (now managed only through filters)
  const [selectedFamily, setSelectedFamily] = useState<ShadeFamily>('all');
  
  // Full-screen overlay state
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [fullscreenColor, setFullscreenColor] = useState(selectedColor);
  
  // Image fullscreen overlay state
  const [showImageFullscreen, setShowImageFullscreen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter state
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    family: 'all' as ShadeFamily,
    colorTemperature: 'all' as 'all' | 'warm' | 'cool',
    tonality: 'all' as 'all' | 'light' | 'medium' | 'dark',
    room: 'all' as 'all' | 'living room' | 'bedroom' | 'kitchen' | 'bathroom' | 'office',
  });

  // State for API data
  const [colorCategories, setColorCategories] = useState<ColorCategory[]>([]);
  const [popularShades, setPopularShades] = useState<Shade[]>([]);
  const [recommendedShades, setRecommendedShades] = useState<Shade[]>([]);
  const [colorOfYearShades, setColorOfYearShades] = useState<Shade[]>([]);

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

  // Filter colors based on active filters
  const filterColors = (colors: Shade[]): Shade[] => {
    // If all filters are set to 'all', return all colors without filtering
    if (activeFilters.family === 'all' &&
        activeFilters.colorTemperature === 'all' && 
        activeFilters.tonality === 'all' && 
        activeFilters.room === 'all') {
      return colors;
    }

    return colors.filter(shade => {
      // Family filter
      if (activeFilters.family !== 'all') {
        const shadeFamily = shade.shadeFamily?.toLowerCase();
        const filterFamily = activeFilters.family.toLowerCase();
        
        // Handle special cases for family matching
        if (filterFamily === 'whites' && (!shadeFamily || (!shadeFamily.includes('white') && !shadeFamily.includes('off white')))) {
          return false;
        } else if (filterFamily === 'reds' && (!shadeFamily || (!shadeFamily.includes('red') && !shadeFamily.includes('orange')))) {
          return false;
        } else if (filterFamily !== 'whites' && filterFamily !== 'reds') {
          if (!shadeFamily || !shadeFamily.includes(filterFamily.replace('-', ' '))) {
            return false;
          }
        }
      }

      // Color temperature filter
      if (activeFilters.colorTemperature !== 'all') {
        const shadeTemp = shade.filterTitle?.['color temperature'];
        if (!shadeTemp || !shadeTemp.includes(activeFilters.colorTemperature)) {
          return false;
        }
      }

      // Tonality filter
      if (activeFilters.tonality !== 'all') {
        const shadeTonality = shade.filterTitle?.tonality;
        if (!shadeTonality || !shadeTonality.includes(activeFilters.tonality)) {
          return false;
        }
      }

      // Room filter
      if (activeFilters.room !== 'all') {
        const shadeRoom = shade.filterTitle?.room;
        if (!shadeRoom || (!shadeRoom.includes(activeFilters.room) && !shadeRoom.includes('all rooms'))) {
          return false;
        }
      }

      return true;
    });
  };

  // Reset filters
  const resetFilters = () => {
    setActiveFilters({
      family: 'all',
      colorTemperature: 'all',
      tonality: 'all',
      room: 'all',
    });
    setSelectedFamily('all');
  };

  // Check if any filters are active
  const hasActiveFilters = activeFilters.family !== 'all' ||
                          activeFilters.colorTemperature !== 'all' || 
                          activeFilters.tonality !== 'all' || 
                          activeFilters.room !== 'all';

  // Load data from API
  useEffect(() => {
    const loadColorData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check API status first
        const status = getApiStatus();
        setApiStatus(status.message);
        console.log('API Status:', status);

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
          
          console.log('Successfully loaded fallback colors after error - Using offline colors. Some features may be limited.');
        } else {
          // Provide more specific error messages if fallback also fails - log only
          if (err instanceof TypeError && err.message.includes('Failed to fetch')) {
            console.error('Network error: Please check your internet connection and try again.');
          } else if (err instanceof TypeError && err.message.includes('NetworkError')) {
            console.error('Connection blocked: The color API may be temporarily unavailable.');
          } else {
            console.error('Failed to load colors. Please refresh the page and try again.');
          }
        }
      } finally {
        setLoading(false);
      }
    };

    loadColorData();
  }, []);



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
        } else if (showFilters) {
          setShowFilters(false);
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      // Cleanup body scroll on unmount
      document.body.style.overflow = 'unset';
    };
  }, [showFullscreen, showImageFullscreen, showFilters]);


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
    <div className="flex flex-col xl:grid xl:grid-cols-2 gap-2 sm:gap-3 sm:gap-4 lg:gap-6 xl:gap-8 min-h-screen bg-gradient-to-br from-gray-50/30 via-white to-blue-50/20 p-2 sm:p-3 lg:p-4 xl:p-6 relative">
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
            {/* Single unified color grid - no tabs */}
            <div className="w-full">
              {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 min-h-[200px]">
                  {[...Array(24)].map((_, i) => (
                    <div key={i} className="border border-gray-200/60 rounded-lg overflow-hidden bg-gradient-to-br from-gray-50/50 to-white shadow-sm animate-pulse">
                        <Skeleton className="w-full h-20 sm:h-24 md:h-28 lg:h-32 bg-gradient-to-r from-gray-200/60 via-gray-100/80 to-gray-200/60" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center p-3 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/10">
                    <p className="text-sm font-semibold text-primary">
                      {filterColors([...popularShades, ...recommendedShades, ...colorOfYearShades]).length} beautiful colors available
                      {hasActiveFilters && (
                        <span className="text-xs text-primary/70 ml-1">
                          (filtered from all collections)
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 min-h-[200px] max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    {filterColors([...popularShades, ...recommendedShades, ...colorOfYearShades]).map((shade) => (
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
              )}
            </div>
            
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

      {/* Floating Filter Panel */}
      <div className="fixed bottom-4 right-4 z-40">
        {/* Filter Toggle Button */}
        <Button
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            "rounded-full w-14 h-14 shadow-lg transition-all duration-300",
            showFilters 
              ? "bg-primary hover:bg-primary/90" 
              : hasActiveFilters 
                ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600" 
                : "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          )}
          size="icon"
        >
          <Filter className="h-6 w-6 text-white" />
          {hasActiveFilters && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full border-2 border-white animate-pulse" />
          )}
        </Button>

        {/* Filter Panel */}
        {showFilters && (
          <div className="absolute bottom-16 right-0 w-80 bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-xl shadow-2xl p-4 animate-in slide-in-from-bottom-2 duration-300">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Color Filters
              </h3>
              {hasActiveFilters && (
                <Button
                  onClick={resetFilters}
                  variant="ghost"
                  size="sm"
                  className="text-xs text-gray-600 hover:text-gray-800"
                >
                  <RotateCcw className="h-3 w-3 mr-1" />
                  Reset
                </Button>
              )}
            </div>

            {/* Color Family Filter */}
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                <Layers className="h-3 w-3" />
                Color Family
              </label>
              <div className="grid grid-cols-2 gap-1 max-h-32 overflow-y-auto">
                {colorFamilyCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveFilters(prev => ({ ...prev, family: category.apiFamily }));
                      setSelectedFamily(category.apiFamily);
                    }}
                    className={cn(
                      "px-2 py-1.5 text-xs rounded-md transition-all duration-200 text-left",
                      activeFilters.family === category.apiFamily
                        ? "bg-primary text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    )}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Temperature Filter */}
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                <Thermometer className="h-3 w-3" />
                Temperature
              </label>
              <div className="grid grid-cols-3 gap-1">
                {['all', 'warm', 'cool'].map((temp) => (
                  <button
                    key={temp}
                    onClick={() => setActiveFilters(prev => ({ ...prev, colorTemperature: temp as any }))}
                    className={cn(
                      "px-2 py-1.5 text-xs rounded-md transition-all duration-200 capitalize",
                      activeFilters.colorTemperature === temp
                        ? "bg-primary text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    )}
                  >
                    {temp}
                  </button>
                ))}
              </div>
            </div>

            {/* Tonality Filter */}
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                <Palette className="h-3 w-3" />
                Tonality
              </label>
              <div className="grid grid-cols-4 gap-1">
                {['all', 'light', 'medium', 'dark'].map((tonality) => (
                  <button
                    key={tonality}
                    onClick={() => setActiveFilters(prev => ({ ...prev, tonality: tonality as any }))}
                    className={cn(
                      "px-2 py-1.5 text-xs rounded-md transition-all duration-200 capitalize",
                      activeFilters.tonality === tonality
                        ? "bg-primary text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    )}
                  >
                    {tonality}
                  </button>
                ))}
              </div>
            </div>

            {/* Room Filter */}
            <div className="mb-2">
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                <Home className="h-3 w-3" />
                Room Type
              </label>
              <div className="grid grid-cols-2 gap-1">
                {['all', 'living room', 'bedroom', 'kitchen', 'bathroom', 'office'].map((room) => (
                  <button
                    key={room}
                    onClick={() => setActiveFilters(prev => ({ ...prev, room: room as any }))}
                    className={cn(
                      "px-2 py-1.5 text-xs rounded-md transition-all duration-200 capitalize",
                      activeFilters.room === room
                        ? "bg-primary text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    )}
                  >
                    {room}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Filters Summary */}
            {hasActiveFilters && (
              <div className="mt-4 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-600 mb-1">Active filters:</p>
                <div className="flex flex-wrap gap-1">
                  {activeFilters.family !== 'all' && (
                    <Badge variant="secondary" className="text-xs">
                      {colorFamilyCategories.find(cat => cat.apiFamily === activeFilters.family)?.name || activeFilters.family}
                    </Badge>
                  )}
                  {activeFilters.colorTemperature !== 'all' && (
                    <Badge variant="secondary" className="text-xs">
                      {activeFilters.colorTemperature}
                    </Badge>
                  )}
                  {activeFilters.tonality !== 'all' && (
                    <Badge variant="secondary" className="text-xs">
                      {activeFilters.tonality}
                    </Badge>
                  )}
                  {activeFilters.room !== 'all' && (
                    <Badge variant="secondary" className="text-xs">
                      {activeFilters.room}
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
