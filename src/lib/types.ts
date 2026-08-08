export type ProductCategory = 'Interior' | 'Exterior' | 'Texture' | 'Wood';

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  isActive: boolean;
  finish: string;
  colorFamily: string;
  price: number;
  stock: number;
  popularity: number;
  description: string;
  imageUrl: string;
  imageHint: string;
  imagePath?: string;
  variants: ColorVariant[];
  reviews: Review[];
};

export type ProductAttributes = {
  brands: string[];
  finishes: string[];
  colorFamilies: string[];
  categories: string[];
}

export type SiteSettings = {
  visibleLinks: string[];
};

export type ColorVariant = {
  name: string;
  hex: string;
  stock: number;
};

export type VisualizerColor = {
  id: string;
  name: string;
  hex: string;
}

export type Review = {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
};

export type FeaturedPalette = {
  id: string;
  name:string;
  colors: ColorVariant[];
};

export type Service = {
  title: string;
  description: string;
  image?: string;
  checklist?: string[];
};

export type ServiceCategory = {
  id: string;
  title: string;
  services: Service[];
};

export type CartItem = {
    id: string;
    productId: string;
    name: string;
    price: number;
    quantity: number;
    variant: ColorVariant;
    imageUrl: string;
    imageHint: string;
};

export type ShippingAddress = {
  name: string;
  email: string;
  phone?: string;
  address: string;
  city: string;
  zip: string;
};

export type Order = {
  id: string;
  userEmail: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered';
  shippingAddress: ShippingAddress;
};

export type EstimationRequest = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address: string;
  description: string;
  photoUrl?: string;
  photoPath?: string;
  createdAt: string;
};

export type Testimonial = {
  id: string;
  author: string;
  comment: string;
  priority: number;
  imageUrl?: string;
  imagePath?: string;
};

export const galleryCategories = ['interior', 'exterior', 'texture', 'wood', 'team'] as const;
export type GalleryCategory = typeof galleryCategories[number];

export type GalleryItem = {
  /** Firebase-managed items have an id; bundled legacy items do not. */
  id?: string;
  type: 'image' | 'video';
  src: string;
  storagePath?: string;
  cloudinaryPublicId?: string;
  title: string;
  category: GalleryCategory;
  featured?: boolean;
  location?: string;
  createdAt?: number;
  originalSize?: number;
  compressedSize?: number;
};
