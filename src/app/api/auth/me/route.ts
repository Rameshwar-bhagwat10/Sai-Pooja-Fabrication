import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json(
      { authenticated: false },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  }

  return NextResponse.json(
    {
      authenticated: true,
      user: {
        id: session.sub,
        email: session.email,
        role: session.app_metadata?.role || session.role,
        exp: session.exp,
      },
    },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    }
  );
}
