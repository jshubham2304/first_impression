import { createHash } from "crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { publicId, resourceType } = (await request.json()) as {
      publicId?: string;
      resourceType?: "image" | "video";
    };
    if (!publicId) return NextResponse.json({ error: "Missing Cloudinary public ID." }, { status: 400 });
    const cloudName = "dfydjfauz";
    const apiKey = "235683314954335";
    const apiSecret = "lVzB7xGfQgRCJD_hnIHplPQpa3M";
    if (!cloudName || !apiKey || !apiSecret) throw new Error("Cloudinary is not configured on the server.");
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const signature = createHash("sha1")
      .update(`public_id=${publicId}&timestamp=${timestamp}${apiSecret}`)
      .digest("hex");
    const body = new URLSearchParams(publicId);
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType === "video" ? "video" : "image"}/destroy`,
      { method: "POST", body },
    );
    if (!response.ok) return NextResponse.json({ error: "Cloudinary deletion failed." }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Cloudinary deletion failed." },
      { status: 500 },
    );
  }
}
