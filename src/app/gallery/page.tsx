'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Play, Expand, Heart, Share2, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { GalleryItem } from '@/lib/types';
import { getGalleryItems } from '@/services/gallery-service';

const defaultGalleryItems: GalleryItem[] = [
  // New uploads - Team at work
  {
    type: 'image',
    src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1767026474/file1_d8c7wl.jpg',
    title: 'Expert Painter at Work',
    category: 'team',
    featured: true,
    location: 'Udaipur',
  },
  {
    type: 'image',
    src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1767026474/file5_iymto5.jpg',
    title: 'Professional Wall Finishing',
    category: 'team',
    location: 'On Site',
  },
  {
    type: 'image',
    src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1767026474/file3_eiznvw.jpg',
    title: 'Skilled Craftsman',
    category: 'team',
    featured: true,
    location: 'Udaipur',
  },
  {
    type: 'image',
    src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1767026474/file6_wvlyc9.jpg',
    title: 'Precision Painting',
    category: 'team',
    location: 'On Site',
  },
  {
    type: 'video',
    src: 'https://res.cloudinary.com/dfydjfauz/video/upload/v1767026476/file7_r2hl2h.mp4',
    title: 'Live Painting Process',
    category: 'team',
    featured: true,
    location: 'Udaipur',
  },
  // Existing items
  {
    type: 'video',
    src: 'https://res.cloudinary.com/dfydjfauz/video/upload/v1758109969/file00001_qfxbkg.mp4',
    title: 'Living Room Transformation',
    category: 'interior',
    featured: true,
    location: 'Udaipur',
  },
  {
    type: 'image',
    src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1758109963/file00002_fmjajv.jpg',
    title: 'Exterior Wall Painting',
    category: 'exterior',
    location: 'Fateh Sagar',
  },
  {
    type: 'image',
    src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1758109963/file00003_eq81kf.jpg',
    title: 'Bedroom Wall Design',
    category: 'interior',
    location: 'Udaipur',
  },
  {
    type: 'image',
    src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1758109964/file00004_i9x97j.jpg',
    title: 'Modern Interior Design',
    category: 'interior',
    featured: true,
    location: 'Hiran Magri',
  },
  {
    type: 'image',
    src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1758109964/file00006_bqfqkq.jpg',
    title: 'Commercial Space',
    category: 'interior',
    location: 'Udaipur',
  },
  {
    type: 'image',
    src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1758109964/file00007_t5j3to.jpg',
    title: 'Kitchen Cabinet Finishing',
    category: 'wood',
    featured: true,
    location: 'Pratap Nagar',
  },
  {
    type: 'image',
    src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1758109965/file00009_extpor.jpg',
    title: 'Detailed Wood Finishing',
    category: 'wood',
    location: 'Udaipur',
  },
  {
    type: 'video',
    src: 'https://res.cloudinary.com/dfydjfauz/video/upload/v1758115133/file_001_qnvj9g.mp4',
    title: 'Exterior House Painting',
    category: 'exterior',
    location: 'Goverdhan Vilas',
  },
  {
    type: 'image',
    src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1758109962/file00011_ytuhuv.jpg',
    title: 'Textured Wall Finish',
    category: 'texture',
    featured: true,
    location: 'Udaipur',
  },
  {
    type: 'image',
    src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1758109963/file00012_bdlg1f.jpg',
    title: 'Living Room Accent Wall',
    category: 'interior',
    location: 'Sector 14',
  },
  {
    type: 'image',
    src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1758109966/file00013_gcnyfw.jpg',
    title: 'Exterior House Painting',
    category: 'exterior',
    location: 'Udaipur',
  },
  {
    type: 'image',
    src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1758115129/file_002_c3rs35.jpg',
    title: 'Villa Exterior',
    category: 'exterior',
    featured: true,
    location: 'Lake Pichola',
  },
  {
    type: 'video',
    src: 'https://res.cloudinary.com/dfydjfauz/video/upload/v1786210817/file_0014_mcv7uf.mp4',
    title: 'Wall Texture Design',
    category: 'texture',
    featured: true,
    location: 'Udaipur',
  },
  {
    type: 'image',
    src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1786210814/file_009_ebpxom.jpg',
    title: 'Interior Wall Design',
    category: 'interior',
    location: 'Udaipur',
  },
  {
    type: 'image',
    src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1786210813/file_008_rcn2eb.jpg',
    title: 'Interior Texture Finish',
    category: 'texture',
    location: 'Udaipur',
  },
  {
    type: 'image',
    src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1786210813/file_0013_gxovxj.jpg',
    title: 'Modern Interior Wall',
    category: 'interior',
    location: 'Udaipur',
  },
  {
    type: 'image',
    src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1786210813/file_005_ty6gmb.jpg',
    title: 'Textured Wall Finish',
    category: 'texture',
    location: 'Udaipur',
  },
  {
    type: 'image',
    src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1786210813/file_007_nmr8nd.jpg',
    title: 'Exterior Wall Finish',
    category: 'exterior',
    location: 'Udaipur',
  },
  {
    type: 'image',
    src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1786210813/file_006_d9ye20.jpg',
    title: 'Exterior House Design',
    category: 'exterior',
    location: 'Udaipur',
  },
  {
    type: 'image',
    src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1786210812/file_0012_jhsnd5.jpg',
    title: 'Interior Accent Wall',
    category: 'interior',
    location: 'Udaipur',
  },
  {
    type: 'image',
    src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1786210812/file_004_z8jxpp.jpg',
    title: 'Decorative Wall Texture',
    category: 'texture',
    location: 'Udaipur',
  },
  {
    type: 'image',
    src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1786210812/file_0011_fu41wk.jpg',
    title: 'Living Room Interior',
    category: 'interior',
    location: 'Udaipur',
  },
  {
    type: 'image',
    src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1786210812/file_0010_n98ser.jpg',
    title: 'Modern Wall Finish',
    category: 'texture',
    location: 'Udaipur',
  },
  {
    type: 'image',
    src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1786210812/file_002_dgcdum.jpg',
    title: 'House Exterior Finish',
    category: 'exterior',
    location: 'Udaipur',
  },
  {
    type: 'image',
    src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1786210812/file_001_x4uwfi.jpg',
    title: 'Interior Wall Finish',
    category: 'interior',
    location: 'Udaipur',
  },
  {
    type: 'image',
    src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1786181175/gallery/WhatsApp_Image_2026-08-04_at_13.05.14_cv06nb.jpg',
    title: 'Wall Texture Work',
    category: 'texture',
    location: 'Udaipur',
  },
  {
    type: 'video',
    src: 'https://res.cloudinary.com/dfydjfauz/video/upload/v1767026476/file7_r2hl2h.mp4',
    title: 'Exterior Painting Work',
    category: 'exterior',
    location: 'Udaipur',
  },
  {
    type: 'image',
    src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1767026475/file4_goqjyp.jpg',
    title: 'Exterior House Painting',
    category: 'exterior',
    location: 'Udaipur',
  },

];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(defaultGalleryItems);

  useEffect(() => {
    setIsLoaded(true);
    getGalleryItems().then(items => {
      if (items.length) setGalleryItems([...items, ...defaultGalleryItems]);
    }).catch(error => console.error('Failed to load Firebase gallery items.', error));
  }, []);

  const categories = [
    { id: 'all', label: 'All Projects', icon: Camera, count: galleryItems.length },
    { id: 'interior', label: 'Interior', count: galleryItems.filter(i => i.category === 'interior').length },
    { id: 'exterior', label: 'Exterior', count: galleryItems.filter(i => i.category === 'exterior').length },
    { id: 'texture', label: 'Texture', count: galleryItems.filter(i => i.category === 'texture').length },
    { id: 'wood', label: 'Wood & Metal', count: galleryItems.filter(i => i.category === 'wood').length },
    { id: 'team', label: 'Our Team', count: galleryItems.filter(i => i.category === 'team').length },
  ];

  const filteredItems = selectedCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  const featuredItems = filteredItems.filter(item => item.featured);
  const regularItems = filteredItems.filter(item => !item.featured);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = 'unset';
  };

  const goToPrevious = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === 0 ? filteredItems.length - 1 : lightboxIndex - 1);
    }
  };

  const goToNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === filteredItems.length - 1 ? 0 : lightboxIndex + 1);
    }
  };

  const toggleLike = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
  };

  const getCategoryLabel = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat?.label || category;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <div className="container py-8 md:py-12 max-w-screen-2xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Camera className="h-4 w-4" />
            Portfolio
          </div>
          <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4">
            <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
              Our Work
            </span>{' '}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Gallery
            </span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Explore our portfolio of stunning transformations across Udaipur and Rajasthan.
            Each project reflects our dedication to excellence.
          </p>
        </div>

        {/* Category Filter - Modern Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-10 px-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                'group relative px-4 md:px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300',
                'border hover:border-primary/50',
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25'
                  : 'bg-card/50 text-muted-foreground border-border hover:text-foreground hover:bg-card'
              )}
            >
              <span className="flex items-center gap-2">
                {category.label}
                <span className={cn(
                  'text-xs px-1.5 py-0.5 rounded-full transition-colors',
                  selectedCategory === category.id
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                )}>
                  {category.count}
                </span>
              </span>
            </button>
          ))}
        </div>

        {/* Featured Section */}
        {featuredItems.length > 0 && selectedCategory === 'all' && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4 px-1">
              <div className="h-1 w-8 bg-primary rounded-full" />
              <h2 className="text-lg font-semibold text-foreground">Featured Projects</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {featuredItems.slice(0, 3).map((item, index) => {
                const actualIndex = galleryItems.indexOf(item);
                return (
                  <div
                    key={`featured-${index}`}
                    className={cn(
                      'group relative overflow-hidden rounded-2xl cursor-pointer',
                      'transform transition-all duration-500',
                      isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
                      index === 0 ? 'md:col-span-2 md:row-span-2 aspect-[16/10] md:aspect-[16/9]' : 'aspect-[4/3]'
                    )}
                    style={{ transitionDelay: `${index * 100}ms` }}
                    onClick={() => openLightbox(filteredItems.indexOf(item))}
                  >
                    {item.type === 'image' ? (
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes={index === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                      />
                    ) : (
                      <video
                        src={item.src}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-primary/90 text-primary-foreground border-0">
                        Featured
                      </Badge>
                      {item.type === 'video' && (
                        <Badge variant="secondary" className="bg-black/50 text-white border-0">
                          <Play className="h-3 w-3 mr-1 fill-white" /> Video
                        </Badge>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => toggleLike(actualIndex, e)}
                        className={cn(
                          "p-2 rounded-full transition-all",
                          likedItems.has(actualIndex)
                            ? "bg-red-500 text-white"
                            : "bg-white/20 text-white hover:bg-white/30"
                        )}
                      >
                        <Heart className={cn("h-4 w-4", likedItems.has(actualIndex) && "fill-current")} />
                      </button>
                      <button className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all">
                        <Expand className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                      <div className="transform transition-transform duration-300 group-hover:translate-y-0 translate-y-2">
                        <p className="text-white/70 text-xs md:text-sm mb-1">{item.location}</p>
                        <h3 className="text-white font-semibold text-lg md:text-xl mb-2">{item.title}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-white/10 text-white border-white/20 text-xs">
                            {getCategoryLabel(item.category)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Main Gallery Grid */}
        <div className="mb-8">
          {selectedCategory === 'all' && featuredItems.length > 0 && (
            <div className="flex items-center gap-2 mb-6 px-1">
              <div className="h-1 w-8 bg-muted-foreground/30 rounded-full" />
              <h2 className="text-lg font-semibold text-foreground">All Projects</h2>
              <span className="text-muted-foreground text-sm">({regularItems.length} items)</span>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-5">
            {(selectedCategory === 'all' ? regularItems : filteredItems).map((item, index) => {
              const actualIndex = filteredItems.indexOf(item);
              const globalIndex = galleryItems.indexOf(item);
              // Create varied heights for masonry effect
              const isLarge = index % 7 === 0;
              const isMedium = index % 5 === 2;

              return (
                <div
                  key={`item-${index}`}
                  className={cn(
                    'group relative overflow-hidden rounded-2xl cursor-pointer',
                    'transform transition-all duration-500 hover:z-10',
                    'shadow-md hover:shadow-2xl',
                    'border border-border/30 hover:border-primary/30',
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
                    isLarge ? 'aspect-[3/4] sm:row-span-2' : isMedium ? 'aspect-[4/5]' : 'aspect-square'
                  )}
                  style={{ transitionDelay: `${(index % 10) * 50}ms` }}
                  onClick={() => openLightbox(actualIndex)}
                >
                  {item.type === 'image' ? (
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    />
                  ) : (
                    <>
                      <video
                        src={item.src}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-3 right-3 bg-black/70 text-white p-2 rounded-full backdrop-blur-sm">
                        <Play className="h-3.5 w-3.5 fill-white" />
                      </div>
                    </>
                  )}

                  {/* Always visible gradient at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {/* Quick Actions */}
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                      <button
                        onClick={(e) => toggleLike(globalIndex, e)}
                        className={cn(
                          "p-2 rounded-full transition-all backdrop-blur-sm",
                          likedItems.has(globalIndex)
                            ? "bg-red-500 text-white scale-110"
                            : "bg-white/20 text-white hover:bg-white/40"
                        )}
                      >
                        <Heart className={cn("h-4 w-4", likedItems.has(globalIndex) && "fill-current")} />
                      </button>
                      <button className="p-2 rounded-full bg-white/20 text-white hover:bg-white/40 transition-all backdrop-blur-sm">
                        <Expand className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Content - Always visible */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                    <h3 className="text-white font-semibold text-sm md:text-base leading-tight mb-1 line-clamp-2 drop-shadow-lg">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-xs font-medium capitalize bg-white/10 px-2 py-0.5 rounded-full backdrop-blur-sm">
                        {getCategoryLabel(item.category)}
                      </span>
                      {item.location && (
                        <span className="text-white/70 text-xs">
                          {item.location}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Subtle border on hover */}
                  <div className="absolute inset-0 rounded-2xl ring-2 ring-primary/0 group-hover:ring-primary/60 transition-all duration-300" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20 px-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No projects found</h3>
            <p className="text-muted-foreground">No items found in this category yet.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setSelectedCategory('all')}
            >
              View All Projects
            </Button>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-3xl" />
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 p-6 md:p-10">
            {[
              { number: '500+', label: 'Projects Completed', suffix: '' },
              { number: '10+', label: 'Years Experience', suffix: '' },
              { number: '100', label: 'Customer Satisfaction', suffix: '%' },
              { number: '50+', label: 'Expert Painters', suffix: '' },
            ].map((stat, index) => (
              <div
                key={index}
                className={cn(
                  "text-center p-4 md:p-6 rounded-2xl bg-card/80 backdrop-blur-sm",
                  "border border-border/50 hover:border-primary/30 transition-colors",
                  "transform hover:-translate-y-1 transition-transform duration-300"
                )}
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-1">
                  {stat.number}
                </div>
                <div className="text-muted-foreground text-xs md:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center justify-center p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <div className="text-left">
              <h3 className="text-xl md:text-2xl font-semibold mb-2">Ready to Transform Your Space?</h3>
              <p className="text-muted-foreground">Get a free consultation and estimate today.</p>
            </div>
            <Button size="lg" className="shrink-0" asChild>
              <a href="/request-estimation">Get Free Estimate</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 text-white/80 hover:text-white p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Navigation - Previous */}
          <button
            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
            className="absolute left-4 z-50 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          {/* Navigation - Next */}
          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-4 z-50 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          {/* Content */}
          <div
            className="relative max-w-6xl max-h-[90vh] w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {filteredItems[lightboxIndex].type === 'image' ? (
              <div className="relative w-full h-[75vh]">
                <Image
                  src={filteredItems[lightboxIndex].src}
                  alt={filteredItems[lightboxIndex].title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
            ) : (
              <video
                src={filteredItems[lightboxIndex].src}
                autoPlay
                loop
                controls
                className="w-full max-h-[75vh] object-contain"
              >
                Your browser does not support the video tag.
              </video>
            )}

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <div className="max-w-2xl mx-auto text-center">
                <h3 className="text-white text-xl md:text-2xl font-semibold mb-2">
                  {filteredItems[lightboxIndex].title}
                </h3>
                <div className="flex items-center justify-center gap-3 text-white/60 text-sm">
                  <span className="capitalize">{getCategoryLabel(filteredItems[lightboxIndex].category)}</span>
                  {filteredItems[lightboxIndex].location && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-white/40" />
                      <span>{filteredItems[lightboxIndex].location}</span>
                    </>
                  )}
                  <span className="w-1 h-1 rounded-full bg-white/40" />
                  <span>{lightboxIndex + 1} of {filteredItems.length}</span>
                </div>
              </div>
            </div>

            {/* Actions in lightbox */}
            <div className="absolute top-4 right-16 flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const globalIndex = galleryItems.indexOf(filteredItems[lightboxIndex]);
                  toggleLike(globalIndex, e);
                }}
                className={cn(
                  "p-2.5 rounded-full transition-all",
                  likedItems.has(galleryItems.indexOf(filteredItems[lightboxIndex]))
                    ? "bg-red-500 text-white"
                    : "bg-white/10 text-white hover:bg-white/20"
                )}
              >
                <Heart className={cn(
                  "h-5 w-5",
                  likedItems.has(galleryItems.indexOf(filteredItems[lightboxIndex])) && "fill-current"
                )} />
              </button>
              <button className="p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
