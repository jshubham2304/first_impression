import { createHash } from "crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const incoming = await request.formData();
    const file = incoming.get("file");
    if (!(file instanceof File) || (!file.type.startsWith("image/") && !file.type.startsWith("video/")))
      return NextResponse.json({ error: "Please provide an image or video file." }, { status: 400 });
    const cloudName = "dfydjfauz";
    const apiKey = "235683314954335";
    const apiSecret = "lVzB7xGfQgRCJD_hnIHplPQpa3M";
    if (!cloudName || !apiKey || !apiSecret) throw new Error("Cloudinary is not configured on the server.");
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const folder = "gallery";
    const transformation = "q_auto:low";
    const signature = createHash("sha1")
      .update(`folder=${folder}&timestamp=${timestamp}&transformation=${transformation}${apiSecret}`)
      .digest("hex");
    const body = new FormData();
    body.append("file", file);
    body.append("api_key", apiKey);
    body.append("timestamp", timestamp);
    body.append("folder", folder);
    body.append("transformation", transformation);
    body.append("signature", signature);
    const resourceType = file.type.startsWith("video/") ? "video" : "image";
    const upload = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`, {
      method: "POST",
      body,
    });
    const result = (await upload.json()) as { secure_url?: string; public_id?: string; error?: { message?: string } };
    if (!upload.ok || !result.secure_url || !result.public_id)
      return NextResponse.json({ error: result.error?.message || "Cloudinary upload failed." }, { status: 502 });
    return NextResponse.json({ src: result.secure_url, publicId: result.public_id });
  } catch (error) {
    console.error("Cloudinary gallery upload failed.", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Cloudinary upload failed." },
      { status: 500 },
    );
  }
}
