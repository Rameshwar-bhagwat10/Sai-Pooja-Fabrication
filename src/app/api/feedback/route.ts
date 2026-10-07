import { NextResponse } from "next/server";
import { getAllFeedbacks, createFeedback, getFeedbackStats } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";
import { type FeedbackStatus } from "@/types/feedback";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productSlug = searchParams.get("product") || undefined;
    const requestedStatus = (searchParams.get("status") as FeedbackStatus | "all") || undefined;
    const includeStats = searchParams.get("stats") === "true";

    const isAuth = await isAuthenticated();

    // If unauthenticated, only approved reviews can be accessed
    const status: FeedbackStatus | "all" = isAuth ? (requestedStatus || "all") : "approved";

    const feedbacks = await getAllFeedbacks({
      productSlug,
      status,
    });

    let stats = null;
    if (includeStats || productSlug) {
      stats = await getFeedbackStats(productSlug);
    }

    return NextResponse.json({
      success: true,
      feedbacks,
      stats,
      count: feedbacks.length,
    });
  } catch (error) {
    console.error("Failed to fetch feedbacks:", error);
    return NextResponse.json(
      { error: "Failed to fetch feedbacks" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validation
    if (!body.productSlug || !body.productSlug.trim()) {
      return NextResponse.json({ error: "Product selection is required" }, { status: 400 });
    }
    if (!body.productName || !body.productName.trim()) {
      return NextResponse.json({ error: "Product name is required" }, { status: 400 });
    }
    if (!body.customerName || !body.customerName.trim()) {
      return NextResponse.json({ error: "Customer name is required" }, { status: 400 });
    }
    if (!body.customerLocation || !body.customerLocation.trim()) {
      return NextResponse.json({ error: "Village or District location is required" }, { status: 400 });
    }
    if (!body.rating || Number(body.rating) < 1 || Number(body.rating) > 5) {
      return NextResponse.json({ error: "Valid rating (1-5 stars) is required" }, { status: 400 });
    }
    if (!body.headline || !body.headline.trim()) {
      return NextResponse.json({ error: "Feedback headline is required" }, { status: 400 });
    }
    if (!body.comment || !body.comment.trim()) {
      return NextResponse.json({ error: "Detailed feedback / experience comment is required" }, { status: 400 });
    }

    const saved = await createFeedback({
      productSlug: body.productSlug.trim(),
      productName: body.productName.trim(),
      customerName: body.customerName.trim(),
      customerLocation: body.customerLocation.trim(),
      customerPhone: body.customerPhone ? body.customerPhone.trim() : undefined,
      tractorModel: body.tractorModel ? body.tractorModel.trim() : undefined,
      soilType: body.soilType ? body.soilType.trim() : undefined,
      usageDuration: body.usageDuration ? body.usageDuration.trim() : undefined,
      rating: Number(body.rating),
      durabilityRating: body.durabilityRating ? Number(body.durabilityRating) : undefined,
      performanceRating: body.performanceRating ? Number(body.performanceRating) : undefined,
      serviceRating: body.serviceRating ? Number(body.serviceRating) : undefined,
      headline: body.headline.trim(),
      comment: body.comment.trim(),
      tags: Array.isArray(body.tags) ? body.tags : [],
      isVerifiedFarmer: body.isVerifiedFarmer ?? true,
    });

    return NextResponse.json({ success: true, feedback: saved }, { status: 201 });
  } catch (error) {
    console.error("Failed to submit feedback:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Failed to submit feedback" },
      { status: 500 }
    );
  }
}
