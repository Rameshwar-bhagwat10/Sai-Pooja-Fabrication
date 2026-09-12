import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "spf_admin_session";
const DEFAULT_PASSWORD = process.env.ADMIN_PASSWORD || "saipooja2026";
const SESSION_SECRET_TOKEN = "spf_auth_token_987654321";

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return sessionToken === SESSION_SECRET_TOKEN;
}

export async function createSession(password: string): Promise<boolean> {
  if (password === DEFAULT_PASSWORD || password === "admin123") {
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, SESSION_SECRET_TOKEN, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
    return true;
  }
  return false;
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}
