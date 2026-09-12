import { NextResponse } from "next/server";
import { getAllInquiries, createInquiry } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  try {
    const isAuth = await isAuthenticated();
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const inquiries = await getAllInquiries();
    return NextResponse.json({ success: true, inquiries });
  } catch (error) {
    console.error("Failed to fetch inquiries:", error);
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.name || !body.name.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!body.phone || !body.phone.trim()) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }
    if (!body.requirement || !body.requirement.trim()) {
      return NextResponse.json({ error: "Requirement description is required" }, { status: 400 });
    }

    const saved = await createInquiry({
      inquiryType: body.inquiryType || "general",
      selectedProduct: body.selectedProduct || "",
      name: body.name.trim(),
      phone: body.phone.trim(),
      email: body.email ? body.email.trim() : "",
      requirement: body.requirement.trim(),
      additionalDetails: body.additionalDetails ? body.additionalDetails.trim() : "",
    });

    return NextResponse.json({ success: true, inquiry: saved }, { status: 201 });
  } catch (error) {
    console.error("Failed to save inquiry:", error);
    return NextResponse.json({ error: (error as Error).message || "Failed to submit inquiry" }, { status: 500 });
  }
}
