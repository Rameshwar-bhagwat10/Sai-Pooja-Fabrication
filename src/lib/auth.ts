import { cookies, headers } from "next/headers";
import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { getPool } from "./db";

export const ADMIN_COOKIE_NAME = "spf_admin_session";
const DEFAULT_PASSWORD = process.env.ADMIN_PASSWORD || "saipooja2026";
const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@saipoojafabrication.com";
const JWT_SECRET = process.env.JWT_SECRET || "sai-pooja-fabrication-super-secret-jwt-key-2026";
const JWT_ISSUER = "sai-pooja-fabrication";
const JWT_EXPIRATION = "7d"; // 7 days

export interface AdminJwtPayload extends JWTPayload {
  sub: string;
  email?: string;
  role: string;
  app_metadata?: {
    role?: string;
    provider?: string;
    [key: string]: any;
  };
  user_metadata?: {
    name?: string;
    role?: string;
    [key: string]: any;
  };
}

export interface AdminUser {
  id: string;
  email: string;
  role: "admin";
}

export interface AdminSessionResult {
  success: boolean;
  token?: string;
  user?: AdminUser;
  error?: string;
}

function getJwtSecretKey(): Uint8Array {
  return new TextEncoder().encode(JWT_SECRET);
}

/**
 * Verify credentials against Supabase auth.users in PostgreSQL
 */
async function verifySupabaseCredentials(
  email: string,
  password: string
): Promise<{ id: string; email: string } | null> {
  const clientPool = getPool();
  if (!clientPool) return null;

  try {
    // 1. Check if user exists and password matches via pgcrypto crypt
    const res = await clientPool.query(
      `SELECT id, email, (encrypted_password = crypt($1, encrypted_password)) AS password_matches
       FROM auth.users
       WHERE LOWER(email) = LOWER($2) LIMIT 1;`,
      [password, email]
    );

    if (res.rows.length > 0 && res.rows[0].password_matches) {
      return { id: res.rows[0].id, email: res.rows[0].email };
    }

    // 2. If user does not exist in auth.users, but password matches DEFAULT_PASSWORD or fallback,
    // auto-provision the admin user into Supabase auth.users so Supabase holds the account!
    if (res.rows.length === 0 && (password === DEFAULT_PASSWORD || password === "admin123")) {
      const insertRes = await clientPool.query(
        `INSERT INTO auth.users (
          instance_id,
          id,
          aud,
          role,
          email,
          encrypted_password,
          email_confirmed_at,
          raw_app_meta_data,
          raw_user_meta_data,
          created_at,
          updated_at
        ) VALUES (
          '00000000-0000-0000-0000-000000000000',
          gen_random_uuid(),
          'authenticated',
          'authenticated',
          $1,
          crypt($2, gen_salt('bf')),
          NOW(),
          '{"provider": "email", "providers": ["email"], "role": "admin"}'::jsonb,
          '{"name": "Administrator", "role": "admin"}'::jsonb,
          NOW(),
          NOW()
        )
        ON CONFLICT (email) DO UPDATE SET
          encrypted_password = crypt($2, gen_salt('bf')),
          updated_at = NOW()
        RETURNING id, email;`,
        [email, password]
      );
      if (insertRes.rows.length > 0) {
        return { id: insertRes.rows[0].id, email: insertRes.rows[0].email };
      }
    }
  } catch (err) {
    console.warn("[Auth] Supabase auth.users check encountered error, using fallback:", (err as Error).message);
  }

  return null;
}

/**
 * Sign a new Supabase-compatible Admin JWT using HS256
 */
export async function signAdminToken(
  payload: { id?: string; email?: string; role?: string } = {}
): Promise<string> {
  const secretKey = getJwtSecretKey();
  const sub = payload.id || "e858d063-5082-4b1d-ac1b-bb4d65762733";
  const email = payload.email || DEFAULT_ADMIN_EMAIL;

  return new SignJWT({
    sub,
    email,
    aud: "authenticated",
    role: "authenticated",
    app_metadata: {
      provider: "email",
      providers: ["email"],
      role: "admin",
    },
    user_metadata: {
      name: "Administrator",
      role: "admin",
    },
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer(JWT_ISSUER)
    .setExpirationTime(JWT_EXPIRATION)
    .sign(secretKey);
}

/**
 * Verify a given JWT token string
 */
export async function verifyAdminToken(
  token: string
): Promise<AdminJwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    return payload as AdminJwtPayload;
  } catch {
    return null;
  }
}

/**
 * Extract token from either Authorization header or HTTP-only cookie
 */
async function getTokenFromContext(): Promise<string | null> {
  try {
    // 1. Check Authorization header (Bearer <token>)
    const headerList = await headers();
    const authHeader = headerList.get("authorization");
    if (authHeader && authHeader.toLowerCase().startsWith("bearer ")) {
      const bearerToken = authHeader.slice(7).trim();
      if (bearerToken) return bearerToken;
    }
  } catch {
    // headers() might not be available in non-request contexts
  }

  try {
    // 2. Fall back to HTTP-only cookie
    const cookieStore = await cookies();
    const cookieToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    if (cookieToken) return cookieToken;
  } catch {
    // cookies() might not be available
  }

  return null;
}

/**
 * Get verified admin session details if authenticated
 */
export async function getAdminSession(): Promise<AdminJwtPayload | null> {
  const token = await getTokenFromContext();
  if (!token) return null;
  return verifyAdminToken(token);
}

/**
 * Check if the current request is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getAdminSession();
  if (!session) return false;
  const isRoleAdmin =
    session.role === "admin" ||
    session.app_metadata?.role === "admin" ||
    session.user_metadata?.role === "admin";
  const isAuthenticatedUser = session.role === "authenticated";
  return isRoleAdmin || isAuthenticatedUser;
}

/**
 * Authenticate credentials with Supabase and create an HTTP-only cookie session with signed JWT
 */
export async function createSession(
  password: string,
  providedEmail?: string
): Promise<AdminSessionResult> {
  const email = (providedEmail && providedEmail.trim()) || DEFAULT_ADMIN_EMAIL;

  // 1. First, attempt Supabase auth verification via PostgreSQL auth.users
  const supabaseUser = await verifySupabaseCredentials(email, password);

  // 2. Fallback to ADMIN_PASSWORD / hardcoded admin pass
  const isPasswordValid =
    supabaseUser !== null ||
    password === DEFAULT_PASSWORD ||
    password === "admin123";

  if (!isPasswordValid) {
    return {
      success: false,
      error: "Invalid administrator credentials",
    };
  }

  const userId = supabaseUser ? supabaseUser.id : "e858d063-5082-4b1d-ac1b-bb4d65762733";
  const userEmail = supabaseUser ? supabaseUser.email : email;

  const token = await signAdminToken({
    id: userId,
    email: userEmail,
    role: "admin",
  });

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  return {
    success: true,
    token,
    user: {
      id: userId,
      email: userEmail,
      role: "admin",
    },
  };
}

/**
 * Clear the admin session cookie
 */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}
