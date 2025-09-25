import { Shade } from "@/lib/color-categories";

export interface AsianPaintsApiResponse {
  success: boolean;
  shade: Shade[];
}

const API_BASE_URL =
  "https://www.asianpaints.com/content/ap/en/home/catalogue/colour-catalogue/jcr:content/root/responsivegrid_602603264/shadelisting.shade.json";

// Track API availability to avoid repeated failed requests
let apiAvailable: boolean | null = null;
let lastApiCheck = 0;
const API_CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes

// Check if we're on mobile (basic detection)
const isMobile = () => {
  if (typeof window === "undefined") return false;
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth <= 768
  );
};

// Quick API availability check
const checkApiAvailability = async (): Promise<boolean> => {
  const now = Date.now();

  // Use cached result if recent
  if (apiAvailable !== null && now - lastApiCheck < API_CHECK_INTERVAL) {
    return apiAvailable;
  }

  try {
    // Quick test with minimal params on mobile
    const testUrl = isMobile()
      ? `${API_BASE_URL}?selectedShadeFamily=reds&language=en`
      : `${API_BASE_URL}?selectedShadeFamily=all&language=en`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout

    const response = await fetch(testUrl, {
      method: "HEAD", // Use HEAD to minimize data transfer
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; ColorVisualizer/1.0)",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    apiAvailable = response.ok;
    lastApiCheck = now;

    console.log(
      `Asian Paints API ${apiAvailable ? "available" : "unavailable"} on ${isMobile() ? "mobile" : "desktop"}`
    );

    return apiAvailable;
  } catch (error) {
    console.warn("Asian Paints API check failed:", error instanceof Error ? error.message : "Unknown error");
    apiAvailable = false;
    lastApiCheck = now;
    return false;
  }
};

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
    if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
      console.error("Network connectivity issue - check internet connection");
    } else if (error instanceof TypeError && error.message.includes("NetworkError")) {
      console.error("CORS or network policy error");
    } else if (error instanceof Error) {
      console.error("API Error:", error.message);
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

  // Quick API availability check - especially important for mobile
  const isApiAvailable = await checkApiAvailability();

  if (!isApiAvailable) {
    console.warn(
      `Asian Paints API unavailable (${
        isMobile() ? "mobile" : "desktop"
      }), skipping API call for family: ${selectedShadeFamily}`
    );
    return []; // Return empty array to trigger fallback in client
  }

  try {
    const params = new URLSearchParams({
      selectedShadeFamily,
      language: "en",
      shadeMapper: "false",
    });

    // Add shorter timeout for mobile devices
    const controller = new AbortController();
    const timeoutMs = isMobile() ? 5000 : 10000; // 5s mobile, 10s desktop
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    const response = await fetch(`${API_BASE_URL}?${params}`, {
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; ColorVisualizer/1.0)",
      },
      signal: controller.signal,
      next: { revalidate: 3600 },
    });

    clearTimeout(timeoutId);

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

    // Cache the results only if we got valid data
    if (allColors.length > 0) {
      colorCache.set(selectedShadeFamily, allColors);
      console.log(`Successfully fetched ${allColors.length} colors for family "${selectedShadeFamily}" from API`);
    }

    return allColors;
  } catch (error) {
    console.error(`Error fetching all colors for family "${selectedShadeFamily}":`, error);

    // Mark API as unavailable on specific errors
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        console.error(`API request timeout (${isMobile() ? "mobile" : "desktop"}) for family "${selectedShadeFamily}"`);
        apiAvailable = false;
        lastApiCheck = Date.now();
      } else if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
        console.error(`Network/DNS blocking detected for Asian Paints API on ${isMobile() ? "mobile" : "desktop"}`);
        apiAvailable = false;
        lastApiCheck = Date.now();
      }
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

// Export API availability status
export const getApiStatus = () => ({
  available: apiAvailable,
  lastChecked: lastApiCheck,
  isMobile: isMobile(),
  message:
    apiAvailable === false
      ? `Asian Paints API blocked on ${isMobile() ? "mobile" : "desktop"} - using offline colors`
      : apiAvailable === true
      ? `Asian Paints API available on ${isMobile() ? "mobile" : "desktop"}`
      : "Asian Paints API status unknown",
});

// Force re-check API availability
export const recheckApiAvailability = async (): Promise<boolean> => {
  apiAvailable = null;
  lastApiCheck = 0;
  return await checkApiAvailability();
};
