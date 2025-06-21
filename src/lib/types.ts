export type ProductCategory = 'Interior' | 'Exterior' | 'Texture' | 'Wood';

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  isActive: boolean;
  finish: 'Matte' | 'Satin' | 'Semi-Gloss' | 'Gloss';
  colorFamily: 'Reds' | 'Blues' | 'Greens' | 'Yellows' | 'Neutrals' | 'Whites';
  price: number;
  popularity: number;
  description: string;
  imageUrl: string;
  imageHint: string;
  imagePath?: string;
  variants: ColorVariant[];
  reviews: Review[];
};

export type ColorVariant = {
  name: string;
  hex: string;
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

export type Order = {
  id: string;
  userEmail: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered';
};

export type Testimonial = {
  id: string;
  author: string;
  comment: string;
  priority: number;
  imageUrl?: string;
  imagePath?: string;
};
