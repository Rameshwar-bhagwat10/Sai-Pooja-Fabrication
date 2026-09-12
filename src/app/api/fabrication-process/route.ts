import { NextResponse } from "next/server";
import { getAllFabricationSteps, saveFabricationStep } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  try {
    const steps = await getAllFabricationSteps();
    return NextResponse.json({ success: true, steps });
  } catch (error) {
    console.error("Failed to fetch process steps:", error);
    return NextResponse.json({ error: "Failed to fetch process steps" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const isAuth = await isAuthenticated();
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    if (!body.step || !body.title) {
      return NextResponse.json({ error: "Step and title are required" }, { status: 400 });
    }

    const saved = await saveFabricationStep(body);
    return NextResponse.json({ success: true, step: saved });
  } catch (error) {
    console.error("Failed to save process step:", error);
    return NextResponse.json({ error: "Failed to save process step" }, { status: 500 });
  }
}
