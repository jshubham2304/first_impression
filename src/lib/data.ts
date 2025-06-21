import type { FeaturedPalette } from './types';

// This file used to contain static product data.
// It has been removed and all product data is now managed in Firebase Firestore.
// Please add products via the Admin Panel -> Products -> Add Product.

export const featuredPalettes: FeaturedPalette[] = [
  {
    id: 'fp-1',
    name: 'Coastal Calm',
    colors: [
      { name: 'Sea Salt', hex: '#a7b4a8' },
      { name: 'Light Sky', hex: '#d5e2ea' },
      { name: 'Sandy Tan', hex: '#e3d5c1' },
      { name: 'Deep Ocean', hex: '#4f6d7a' },
    ],
  },
  {
    id: 'fp-2',
    name: 'Urban Jungle',
    colors: [
      { name: 'Terracotta', hex: '#c97b61' },
      { name: 'Olive Green', hex: '#7a8a6b' },
      { name: 'Charcoal Gray', hex: '#5b5b5b' },
      { name: 'Warm Beige', hex: '#d4c7b0' },
    ],
  },
  {
    id: 'fp-3',
    name: 'Modern Minimalist',
    colors: [
      { name: 'Crisp White', hex: '#ffffff' },
      { name: 'Soft Gray', hex: '#d3d3d3' },
      { name: 'Black Accent', hex: '#343434' },
      { name: 'Natural Wood', hex: '#ad9b87' },
    ],
  },
];

export const roomColors = [
    { name: 'Crimson Red', hex: '#990000' },
    { name: 'Midnight Blue', hex: '#003366' },
    { name: 'Forest Green', hex: '#228B22' },
    { name: 'Goldenrod', hex: '#DAA520' },
    { name: 'Cool Gray', hex: '#8C92AC' },
    { name: 'Cloud White', hex: '#F5F5F5' },
    { name: 'Orchid', hex: '#DA70D6' },
    { name: 'Teal', hex: '#008080' },
    { name: 'Coral', hex: '#FF7F50' },
];
