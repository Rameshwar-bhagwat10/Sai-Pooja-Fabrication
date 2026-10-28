import { NextResponse } from "next/server";
import { createSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password, email } = body || {};
    if (!password) {
      return NextResponse.json({ error: "Password is required" }, { status: 400 });
    }

    const result = await createSession(password, email);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Invalid administrator credentials" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Logged in successfully",
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
