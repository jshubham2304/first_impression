import { NextRequest, NextResponse } from "next/server";

const ASIAN_PAINTS_API_BASE =
  "https://www.asianpaints.com/content/ap/en/home/catalogue/colour-catalogue/jcr:content/root/responsivegrid_602603264/shadelisting.shade.json";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const selectedShadeFamily = searchParams.get("selectedShadeFamily") || "all";
  const language = searchParams.get("language") || "en";
  const limit = searchParams.get("limit");
  const shadeMapper = searchParams.get("shadeMapper") || "false";

  try {
    const params = new URLSearchParams({
      selectedShadeFamily,
      language,
      shadeMapper,
    });

    if (limit) {
      params.set("limit", limit);
    }

    const response = await fetch(`${ASIAN_PAINTS_API_BASE}?${params}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Asian Paints API returned ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error proxying Asian Paints API:", error);
    return NextResponse.json(
      { error: "Failed to fetch shades from Asian Paints" },
      { status: 500 }
    );
  }
}
