import { Shade } from "@/lib/color-categories";

export interface AsianPaintsApiResponse {
  success: boolean;
  shade: Shade[];
}

const API_BASE_URL =
  "https://www.asianpaints.com/content/ap/en/home/catalogue/colour-catalogue/jcr:content/root/responsivegrid_602603264/shadelisting.shade.json";

// Available shade families from Asian Paints
export const SHADE_FAMILIES = [
  "all",
  "off-whites",
  "whites",
  "reds",
  "pinks",
  "oranges",
  "yellows",
  "greens",
  "blues",
  "purples",
  "violets",
  "browns",
  "greys",
  "blacks",
  "beiges",
] as const;

export type ShadeFamily = (typeof SHADE_FAMILIES)[number];

// Fetch colors by shade family with pagination support (uses cached data)
export async function fetchColorsByFamily(
  selectedShadeFamily: ShadeFamily = "all",
  language: string = "en",
  offset: number = 0,
  limit: number = 24
): Promise<Shade[]> {
  try {
    // Get all colors for the family (this will use cache if available)
    const allColors = await fetchAllColorsForFamily(selectedShadeFamily);
    
    // Apply pagination on the cached data
    return allColors.slice(offset, offset + limit);
  } catch (error) {
    console.error(`Error fetching colors for family "${selectedShadeFamily}":`, error);
    return [];
  }
}

// Fetch all colors (equivalent to selectedShadeFamily=all)
export async function fetchAllColors(): Promise<Shade[]> {
  return fetchColorsByFamily("all");
}

// Fetch colors for specific families in parallel
export async function fetchMultipleFamilies(families: ShadeFamily[]): Promise<Record<ShadeFamily, Shade[]>> {
  const results = await Promise.allSettled(
    families.map(async (family) => ({
      family,
      shades: await fetchColorsByFamily(family),
    }))
  );

  const data: Record<ShadeFamily, Shade[]> = {} as Record<ShadeFamily, Shade[]>;

  results.forEach((result, index) => {
    const family = families[index];
    if (result.status === "fulfilled") {
      data[family] = result.value.shades;
    } else {
      console.error(`Failed to fetch colors for family "${family}":`, result.reason);
      data[family] = [];
    }
  });

  return data;
}

// Get popular colors (first 50 from all colors)
export async function fetchPopularColors(limit: number = 24): Promise<Shade[]> {
  const allColors = await fetchAllColors();
  return allColors.sort((a, b) => parseInt(a.popularity) - parseInt(b.popularity)).slice(0, limit);
}

// Get recommended colors
export async function fetchRecommendedColors(): Promise<Shade[]> {
  const allColors = await fetchAllColors();
  return allColors
    .filter((shade) => shade.featureTag === "Recommended")
    .sort((a, b) => parseInt(a.popularity) - parseInt(b.popularity))
    .slice(0, 20);
}

// Get Color of the Year shades
export async function fetchColorOfTheYearShades(): Promise<Shade[]> {
  const allColors = await fetchAllColors();
  return allColors
    .filter((shade) => shade.featureTag === "Colour of the year")
    .sort((a, b) => parseInt(a.popularity) - parseInt(b.popularity));
}

// Load more colors using the personalization API
export async function loadMoreColors(
  previousShadeSKUs: string[] = [],
  swatchesOnLoad: number = 12,
  language: string = "en"
): Promise<Shade[]> {
  try {
    const params = new URLSearchParams({
      previousShadeSKUs: JSON.stringify(previousShadeSKUs),
      swatchesOnLoad: swatchesOnLoad.toString(),
      language,
    });

    const response = await fetch(
      `https://www.asianpaints.com/apcolourcatalogue/personalization/previousShades.json?${params}`,
      {
        headers: {
          Accept: "application/json",
          "User-Agent": "Mozilla/5.0 (compatible; ColorVisualizer/1.0)",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(`Load more API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Handle response format
    if (data.shade && Array.isArray(data.shade)) {
      return data.shade;
    } else if (Array.isArray(data)) {
      return data;
    } else {
      console.warn("Unexpected load more API response format:", data);
      return [];
    }
  } catch (error) {
    console.error("Error loading more colors:", error);
    
    // Provide more specific error information
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      console.error('Network connectivity issue - check internet connection');
    } else if (error instanceof TypeError && error.message.includes('NetworkError')) {
      console.error('CORS or network policy error');
    } else if (error instanceof Error) {
      console.error('API Error:', error.message);
    }
    
    return [];
  }
}

// Cache for storing full color datasets by family
const colorCache = new Map<ShadeFamily, Shade[]>();

// Fetch all colors for a family (used for caching and pagination)
export async function fetchAllColorsForFamily(selectedShadeFamily: ShadeFamily = "all"): Promise<Shade[]> {
  // Check cache first
  if (colorCache.has(selectedShadeFamily)) {
    return colorCache.get(selectedShadeFamily)!;
  }

  try {
    const params = new URLSearchParams({
      selectedShadeFamily,
      language: "en",
      shadeMapper: "false",
    });

    const response = await fetch(`${API_BASE_URL}?${params}`, {
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; ColorVisualizer/1.0)",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    let allColors: Shade[] = [];
    if (data.shade && Array.isArray(data.shade)) {
      allColors = data.shade;
    } else if (Array.isArray(data)) {
      allColors = data;
    }

    // Cache the results
    colorCache.set(selectedShadeFamily, allColors);
    return allColors;
  } catch (error) {
    console.error(`Error fetching all colors for family "${selectedShadeFamily}":`, error);
    
    // Check if it's a network error
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      console.error('Network error - check internet connection and CORS settings');
    }
    
    // Check if it's a CORS error
    if (error instanceof TypeError && error.message.includes('NetworkError')) {
      console.error('CORS error - API may be blocking cross-origin requests');
    }
    
    return [];
  }
}

// Get total count of colors for a family (using cached data)
export async function getTotalColorsCount(selectedShadeFamily: ShadeFamily = "all"): Promise<number> {
  try {
    const allColors = await fetchAllColorsForFamily(selectedShadeFamily);
    return allColors.length;
  } catch (error) {
    console.error("Error getting total colors count:", error);
    return 0;
  }
}
