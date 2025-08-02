import type { FeaturedPalette } from './types';

// This file used to contain static data.
// It has been removed and all dynamic data is now managed in Firebase Firestore.
// Please add/edit content via the Admin Panel.

export const featuredPalettes: FeaturedPalette[] = [
  {
    id: 'fp-1',
    name: 'Coastal Calm',
    colors: [
      { name: 'Sea Salt', hex: '#a7b4a8', stock: 0 },
      { name: 'Light Sky', hex: '#d5e2ea', stock: 0 },
      { name: 'Sandy Tan', hex: '#e3d5c1', stock: 0 },
      { name: 'Deep Ocean', hex: '#4f6d7a', stock: 0 },
    ],
  },
  {
    id: 'fp-2',
    name: 'Urban Jungle',
    colors: [
      { name: 'Terracotta', hex: '#c97b61', stock: 0 },
      { name: 'Olive Green', hex: '#7a8a6b', stock: 0 },
      { name: 'Charcoal Gray', hex: '#5b5b5b', stock: 0 },
      { name: 'Warm Beige', hex: '#d4c7b0', stock: 0 },
    ],
  },
  {
    id: 'fp-3',
    name: 'Modern Minimalist',
    colors: [
      { name: 'Crisp White', hex: '#ffffff', stock: 0 },
      { name: 'Soft Gray', hex: '#d3d3d3', stock: 0 },
      { name: 'Black Accent', hex: '#343434', stock: 0 },
      { name: 'Natural Wood', hex: '#ad9b87', stock: 0 },
    ],
  },
];
