import { NextResponse } from "next/server";
import { saveCapability, deleteCapability } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

interface RouteProps {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: RouteProps) {
  try {
    const isAuth = await isAuthenticated();
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const saved = await saveCapability({ ...body, id });
    return NextResponse.json({ success: true, capability: saved });
  } catch (error) {
    console.error("Failed to update capability:", error);
    return NextResponse.json({ error: "Failed to update capability" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteProps) {
  try {
    const isAuth = await isAuthenticated();
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const deleted = await deleteCapability(id);
    if (!deleted) {
      return NextResponse.json({ error: "Capability not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Capability deleted" });
  } catch (error) {
    console.error("Failed to delete capability:", error);
    return NextResponse.json({ error: "Failed to delete capability" }, { status: 500 });
  }
}
