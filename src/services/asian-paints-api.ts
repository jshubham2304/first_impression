import { Shade } from "@/lib/color-categories";

export interface AsianPaintsApiResponse {
  success: boolean;
  shade: Shade[];
}

// Use our own API proxy to avoid CORS issues
const API_BASE_URL = "/api/shades";

// Track API availability to avoid repeated failed requests
let apiAvailable: boolean | null = null;
let lastApiCheck = 0;
const API_CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes

// Check if we're on mobile (enhanced detection)
const isMobile = () => {
  if (typeof window === "undefined") return false;

  // Check for mobile user agents
  const mobileUserAgents = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Tablet/i;
  const isMobileUA = mobileUserAgents.test(navigator.userAgent);

  // Check for touch capability
  const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  // Check screen size
  const isSmallScreen = window.innerWidth <= 768 || window.outerWidth <= 768;

  // Return true if any mobile indicator is present
  return isMobileUA || (isTouchDevice && isSmallScreen);
};

// Quick API availability check - now using our proxy, so it should always work
const checkApiAvailability = async (): Promise<boolean> => {
  const now = Date.now();

  // Use cached result if recent
  if (apiAvailable !== null && now - lastApiCheck < API_CHECK_INTERVAL) {
    return apiAvailable;
  }

  try {
    // Use minimal request for availability check via our proxy
    const testUrl = `${API_BASE_URL}?selectedShadeFamily=greys&language=en&limit=1`;

    const controller = new AbortController();
    const timeoutMs = 10000; // 10 second timeout
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    const response = await fetch(testUrl, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    apiAvailable = response.ok;
    lastApiCheck = now;

    console.log(`Asian Paints API proxy ${apiAvailable ? "available" : "unavailable"} (${response.status})`);

    return apiAvailable;
  } catch (error) {
    console.warn("Asian Paints API proxy check failed:", error instanceof Error ? error.message : "Unknown error");
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

// Load more colors using the personalization API with mobile optimization
export async function loadMoreColors(
  previousShadeSKUs: string[] = [],
  swatchesOnLoad: number = 12,
  language: string = "en"
): Promise<Shade[]> {
  const mobile = isMobile();

  try {
    const params = new URLSearchParams({
      previousShadeSKUs: JSON.stringify(previousShadeSKUs),
      swatchesOnLoad: swatchesOnLoad.toString(),
      language,
    });

    // Simple headers - browsers ignore custom User-Agent
    const headers: Record<string, string> = {
      Accept: "application/json",
    };

    // Add timeout for mobile
    const controller = new AbortController();
    const timeoutMs = mobile ? 5000 : 10000;
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    const response = await fetch(
      `https://www.asianpaints.com/apcolourcatalogue/personalization/previousShades.json?${params}`,
      {
        headers,
        signal: controller.signal,
        mode: "cors",
        credentials: "omit",
      }
    );

    clearTimeout(timeoutId);

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
    console.error(`Error loading more colors on ${mobile ? "mobile" : "desktop"}:`, error);

    // Provide more specific error information for mobile
    if (mobile && error instanceof Error) {
      if (error.message.includes("Failed to fetch")) {
        console.error("Mobile network connectivity issue - API may be blocked");
      } else if (error.name === "AbortError") {
        console.error("Mobile timeout - slow network or API blocking");
      } else if (error.message.includes("NetworkError")) {
        console.error("Mobile CORS or DNS blocking detected");
      }
    } else if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
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

  // Quick API availability check
  const isApiAvailable = await checkApiAvailability();

  if (!isApiAvailable) {
    console.warn(`Asian Paints API proxy unavailable, skipping API call for family: ${selectedShadeFamily}`);
    return []; // Return empty array to trigger fallback in client
  }

  try {
    const params = new URLSearchParams({
      selectedShadeFamily,
      language: "en",
      shadeMapper: "false",
    });

    const controller = new AbortController();
    const timeoutMs = 15000; // 15 second timeout for full fetch
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    const response = await fetch(`${API_BASE_URL}?${params}`, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
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

    // Mark API as unavailable on timeout/network errors
    if (error instanceof Error && (error.name === "AbortError" || error.message.includes("Failed to fetch"))) {
      apiAvailable = false;
      lastApiCheck = Date.now();
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
      ? "Asian Paints API proxy unavailable - using offline colors"
      : apiAvailable === true
      ? "Asian Paints API proxy available"
      : "Asian Paints API status unknown",
});

// Force re-check API availability
export const recheckApiAvailability = async (): Promise<boolean> => {
  apiAvailable = null;
  lastApiCheck = 0;
  return await checkApiAvailability();
};
