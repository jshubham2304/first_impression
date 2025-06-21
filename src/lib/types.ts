export type Product = {
  id: string;
  name: string;
  brand: string;
  finish: 'Matte' | 'Satin' | 'Semi-Gloss' | 'Gloss';
  colorFamily: 'Reds' | 'Blues' | 'Greens' | 'Yellows' | 'Neutrals' | 'Whites';
  price: number;
  popularity: number;
  description: string;
  imageUrl: string;
  imageHint: string;
  variants: ColorVariant[];
  reviews: Review[];
};

export type ColorVariant = {
  hex: string;
  name: string;
};

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
