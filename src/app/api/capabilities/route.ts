import { NextResponse } from "next/server";
import { getAllCapabilities, saveCapability } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  try {
    const capabilities = await getAllCapabilities();
    return NextResponse.json({ success: true, capabilities });
  } catch (error) {
    console.error("Failed to fetch capabilities:", error);
    return NextResponse.json({ error: "Failed to fetch capabilities" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const isAuth = await isAuthenticated();
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    if (!body.title || !body.title.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const saved = await saveCapability(body);
    return NextResponse.json({ success: true, capability: saved });
  } catch (error) {
    console.error("Failed to save capability:", error);
    return NextResponse.json({ error: "Failed to save capability" }, { status: 500 });
  }
}
