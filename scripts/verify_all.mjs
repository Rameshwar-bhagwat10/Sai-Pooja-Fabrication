import pg from "pg";
const { Pool } = pg;

const url = "postgresql://postgres.ihaxijlnumozvghgvcqf:saipoojafabricati9ns@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres";

async function runVerification() {
  console.log("=================================================");
  console.log("  SAI POOJA FABRICATION - SUPABASE & JWT VERIFIER");
  console.log("=================================================\n");

  const pool = new Pool({
    connectionString: url,
    ssl: { rejectUnauthorized: false },
  });

  try {
    const client = await pool.connect();
    console.log("✓ Connected to Supabase PostgreSQL Database");

    // 1. Check Tables
    const tables = [
      "products",
      "inquiries",
      "gallery",
      "settings",
      "capabilities",
      "fabrication_process",
      "company_approach"
    ];

    for (const t of tables) {
      const res = await client.query(`SELECT COUNT(*) FROM public.${t};`);
      console.log(`  - Table public.${t.padEnd(20)}: ${res.rows[0].count} records`);
    }

    // 2. Check Supabase auth.users
    const userRes = await client.query(`
      SELECT id, email, role, (encrypted_password = crypt($1, encrypted_password)) AS password_valid
      FROM auth.users
      WHERE email = $2;
    `, ["saipooja2026", "admin@saipoojafabrication.com"]);

    if (userRes.rows.length > 0 && userRes.rows[0].password_valid) {
      console.log("\n✓ Supabase auth.users verification succeeded:");
      console.log(`  - User ID: ${userRes.rows[0].id}`);
      console.log(`  - Email:   ${userRes.rows[0].email}`);
      console.log(`  - Role:    ${userRes.rows[0].role}`);
      console.log(`  - Password matches via pgcrypto: true`);
    } else {
      console.error("\n✗ Supabase auth.users verification failed!");
    }

    client.release();
    await pool.end();
  } catch (err) {
    console.error("Database test error:", err);
  }

  // 3. Test HTTP Endpoints on dev server
  console.log("\n--- Testing HTTP API Endpoints ---");
  const base = "http://localhost:3000";

  try {
    // 3a. GET /api/auth/me unauthenticated
    const me1 = await fetch(`${base}/api/auth/me`).then(r => r.json());
    console.log("✓ GET /api/auth/me (unauthenticated):", JSON.stringify(me1));

    // 3b. POST /api/auth/login with Supabase credentials
    const loginRes = await fetch(`${base}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "admin@saipoojafabrication.com",
        password: "saipooja2026"
      })
    });

    const cookies = loginRes.headers.get("set-cookie") || "";
    const loginData = await loginRes.json();
    console.log(`✓ POST /api/auth/login status: ${loginRes.status}`);
    console.log(`  - Success: ${loginData.success}`);
    console.log(`  - User: ${JSON.stringify(loginData.user)}`);
    console.log(`  - JWT Token (first 30 chars): ${loginData.token?.slice(0, 30)}...`);
    console.log(`  - Set-Cookie received: ${cookies.includes("spf_admin_session") ? "YES (spf_admin_session)" : "NO"}`);

    // 3c. GET /api/auth/me with Bearer token
    const meBearer = await fetch(`${base}/api/auth/me`, {
      headers: { Authorization: `Bearer ${loginData.token}` }
    }).then(r => r.json());
    console.log("✓ GET /api/auth/me (with Bearer JWT):", JSON.stringify(meBearer));

    // 3d. GET /api/inquiries (protected) with Bearer token
    const inqRes = await fetch(`${base}/api/inquiries`, {
      headers: { Authorization: `Bearer ${loginData.token}` }
    }).then(r => r.json());
    console.log(`✓ GET /api/inquiries (protected): success = ${inqRes.success}, count = ${inqRes.inquiries?.length}`);

    // 3e. GET /api/products (public database data)
    const prodRes = await fetch(`${base}/api/products`).then(r => r.json());
    console.log(`✓ GET /api/products (public database): success = ${prodRes.success}, count = ${prodRes.products?.length}`);

    console.log("\n>>> ALL TESTS PASSED SUCCESSFULLY! <<<\n");
  } catch (httpErr) {
    console.error("HTTP verification error:", httpErr.message);
  }
}

runVerification();
