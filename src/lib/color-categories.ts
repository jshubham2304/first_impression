import { fetchColorsByFamily, fetchAllColors, type ShadeFamily, SHADE_FAMILIES } from "@/services/asian-paints-api";

export interface Shade {
  featureTag: string;
  entityCode: string;
  pageNumber: string;
  filterTitle: {
    "color temperature": string[];
    tonality: string[];
    room: string[];
  };
  entityName: string;
  popularity: string;
  shadeFamily: string;
  pageUrl: string;
  shadeHexCode: string;
  positionNumber: string;
  latest: string;
}

export interface ColorCategory {
  id: string;
  name: string;
  icon: string;
  shades: Shade[];
  count: number;
}

// Map API shade families to display categories
const API_FAMILY_MAPPING: Record<string, string> = {
  "off whites": "off-whites",
  whites: "whites",
  reds: "reds",
  pinks: "pinks",
  oranges: "oranges",
  yellows: "yellows",
  greens: "greens",
  blues: "blues",
  purples: "purples",
  violets: "violets",
  browns: "browns",
  greys: "greys",
  blacks: "blacks",
  beiges: "beiges",
};

export const COLOR_CATEGORIES = [
  {
    id: "off-whites",
    name: "Off Whites",
    icon: "🤍",
    apiFamily: "off-whites" as ShadeFamily,
  },
  {
    id: "whites",
    name: "Whites",
    icon: "⚪",
    apiFamily: "whites" as ShadeFamily,
  },
  {
    id: "reds",
    name: "Reds",
    icon: "❤️",
    apiFamily: "reds" as ShadeFamily,
  },
  {
    id: "pinks",
    name: "Pinks",
    icon: "🩷",
    apiFamily: "pinks" as ShadeFamily,
  },
  {
    id: "oranges",
    name: "Oranges",
    icon: "🧡",
    apiFamily: "oranges" as ShadeFamily,
  },
  {
    id: "yellows",
    name: "Yellows",
    icon: "💛",
    apiFamily: "yellows" as ShadeFamily,
  },
  {
    id: "greens",
    name: "Greens",
    icon: "💚",
    apiFamily: "greens" as ShadeFamily,
  },
  {
    id: "blues",
    name: "Blues",
    icon: "💙",
    apiFamily: "blues" as ShadeFamily,
  },
  {
    id: "purples",
    name: "Purples",
    icon: "💜",
    apiFamily: "purples" as ShadeFamily,
  },
  {
    id: "violets",
    name: "Violets",
    icon: "🟣",
    apiFamily: "violets" as ShadeFamily,
  },
  {
    id: "browns",
    name: "Browns",
    icon: "🤎",
    apiFamily: "browns" as ShadeFamily,
  },
  {
    id: "greys",
    name: "Greys",
    icon: "🩶",
    apiFamily: "greys" as ShadeFamily,
  },
  {
    id: "blacks",
    name: "Blacks",
    icon: "🖤",
    apiFamily: "blacks" as ShadeFamily,
  },
  {
    id: "beiges",
    name: "Beiges",
    icon: "🤎",
    apiFamily: "beiges" as ShadeFamily,
  },
] as const;

// Fetch categorized shades from API
export async function fetchCategorizedShades(): Promise<ColorCategory[]> {
  const categoryPromises = COLOR_CATEGORIES.map(async (category) => {
    const shades = await fetchColorsByFamily(category.apiFamily);
    return {
      id: category.id,
      name: category.name,
      icon: category.icon,
      shades: shades.sort((a, b) => parseInt(a.popularity) - parseInt(b.popularity)).slice(0, 50), // Limit to top 50 per category for performance
      count: shades.length,
    };
  });

  const categories = await Promise.all(categoryPromises);

  // Filter out empty categories and sort by count
  return categories.filter((category) => category.shades.length > 0).sort((a, b) => b.count - a.count);
}

// Legacy function for backward compatibility (now async)
export async function categorizeShades(): Promise<ColorCategory[]> {
  return fetchCategorizedShades();
}

// Use API functions instead of static data
export async function getPopularShades(limit: number = 24): Promise<Shade[]> {
  const allColors = await fetchAllColors();
  return allColors.sort((a, b) => parseInt(a.popularity) - parseInt(b.popularity)).slice(0, limit);
}

export async function getRecommendedShades(): Promise<Shade[]> {
  const allColors = await fetchAllColors();
  return allColors
    .filter((shade) => shade.featureTag === "Recommended")
    .sort((a, b) => parseInt(a.popularity) - parseInt(b.popularity))
    .slice(0, 20);
}

export async function getColorOfTheYearShades(): Promise<Shade[]> {
  const allColors = await fetchAllColors();
  return allColors
    .filter((shade) => shade.featureTag === "Colour of the year")
    .sort((a, b) => parseInt(a.popularity) - parseInt(b.popularity));
}
