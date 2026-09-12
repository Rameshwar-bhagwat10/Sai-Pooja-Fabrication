import { NextResponse } from "next/server";
import { getAllGalleryItems, saveGalleryItem } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  try {
    const items = await getAllGalleryItems();
    return NextResponse.json({ success: true, items });
  } catch (error) {
    console.error("Failed to fetch gallery:", error);
    return NextResponse.json({ error: "Failed to fetch gallery items" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const isAuth = await isAuthenticated();
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    if (!body.title || !body.image) {
      return NextResponse.json({ error: "Title and Image URL are required" }, { status: 400 });
    }

    const saved = await saveGalleryItem(body);
    return NextResponse.json({ success: true, item: saved });
  } catch (error) {
    console.error("Failed to create gallery item:", error);
    return NextResponse.json({ error: "Failed to create gallery item" }, { status: 500 });
  }
}
