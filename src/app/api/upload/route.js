import { NextResponse } from "next/server";
import AuthUser from "@/middleware/AuthUser";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const isAuthUser = await AuthUser(req);

    if (!isAuthUser || isAuthUser.role !== "admin") {
      return NextResponse.json({
        success: false,
        message: "You are not authorized",
      });
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({
        success: false,
        message: "No file provided",
      });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const dataUri = `data:${file.type};base64,${base64}`;

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const timestamp = Math.round(new Date().getTime() / 1000);

    // Generate signature
    const { createHash } = await import("crypto");
    const signatureString = `folder=ecommerce&timestamp=${timestamp}${apiSecret}`;
    const signature = createHash("sha1").update(signatureString).digest("hex");

    // Upload to Cloudinary
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append("file", dataUri);
    cloudinaryFormData.append("api_key", apiKey);
    cloudinaryFormData.append("timestamp", timestamp.toString());
    cloudinaryFormData.append("signature", signature);
    cloudinaryFormData.append("folder", "ecommerce");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: cloudinaryFormData,
      }
    );

    const data = await response.json();

    if (data.secure_url) {
      return NextResponse.json({
        success: true,
        url: data.secure_url,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to upload image",
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
}
