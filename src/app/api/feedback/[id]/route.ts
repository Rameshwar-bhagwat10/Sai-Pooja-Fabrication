import { NextResponse } from "next/server";
import { updateFeedback, deleteFeedback } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

interface RouteProps {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: RouteProps) {
  try {
    const isAuth = await isAuthenticated();
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const updated = await updateFeedback(id, {
      status: body.status,
      isFeatured: body.isFeatured,
      adminReply: body.adminReply,
    });

    if (!updated) {
      return NextResponse.json({ error: "Feedback record not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, feedback: updated });
  } catch (error) {
    console.error("Failed to update feedback:", error);
    return NextResponse.json(
      { error: "Failed to update feedback" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: RouteProps) {
  try {
    const isAuth = await isAuthenticated();
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const deleted = await deleteFeedback(id);

    if (!deleted) {
      return NextResponse.json({ error: "Feedback record not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Feedback deleted successfully" });
  } catch (error) {
    console.error("Failed to delete feedback:", error);
    return NextResponse.json(
      { error: "Failed to delete feedback" },
      { status: 500 }
    );
  }
}
