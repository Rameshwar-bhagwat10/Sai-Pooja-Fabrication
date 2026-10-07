import pg from "pg";
const { Pool } = pg;

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres.ihaxijlnumozvghgvcqf:saipoojafabricati9ns@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres";

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

const initialFeedbacks = [
  {
    id: "fb-1712000001",
    product_slug: "hydraulic-reversible-mb-plough",
    product_name: "Hydraulic Reversible M.B. Plough",
    customer_name: "Balasaheb Patil",
    customer_location: "Niphad, Nashik, Maharashtra",
    customer_phone: "+91 98221 44512",
    tractor_model: "Mahindra Arjun Novo 605 DI (60 HP)",
    soil_type: "Heavy Black Cotton Soil",
    usage_duration: "1-2 Years",
    rating: 5,
    durability_rating: 5,
    performance_rating: 5,
    service_rating: 5,
    headline: "Unmatched deep ploughing with zero hydraulic leakage in black soil",
    comment: "We have been running this reversible plough for two kharif seasons. In our heavy black cotton soil near Nashik, previous ploughs would bend the shank. The boron steel points and heavy-duty box frame of Sai Pooja have zero deflection, and reversible turnover is smooth as butter.",
    tags: ["Heavy Duty Steel", "Zero Bending", "Clean Furrows", "Genuine Sai Pooja Quality"],
    is_verified_farmer: true,
    status: "approved",
    is_featured: true,
    admin_reply: "Thank you Balasaheb ji! Our reversible plough frame is engineered specifically for tough Deccan black cotton soil. Happy farming!",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
  },
  {
    id: "fb-1712000002",
    product_slug: "heavy-duty-rigid-cultivator",
    product_name: "9 Tyne Heavy-Duty Rigid Cultivator",
    customer_name: "Kishor Deshmukh",
    customer_location: "Yeola, Nashik, Maharashtra",
    customer_phone: "+91 94220 88123",
    tractor_model: "Swaraj 855 FE (52 HP)",
    soil_type: "Medium Black Soil",
    usage_duration: "6-12 Months",
    rating: 5,
    durability_rating: 5,
    performance_rating: 4,
    service_rating: 5,
    headline: "Solid channel frame with perfect tine spacing",
    comment: "Tractor pull is very light despite 9 tynes working at deep depth. The weld joints and reversible shovels are of top-tier industrial grade. Sai Pooja workshop delivered it right on schedule before monsoon pre-sowing.",
    tags: ["Light Tractor Pull", "Durable Shovels", "Strong Welds"],
    is_verified_farmer: true,
    status: "approved",
    is_featured: true,
    admin_reply: "Thank you Deshmukh ji. The forged steel shovels ensure longest wear life even in stony patches.",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
  {
    id: "fb-1712000003",
    product_slug: "multi-speed-rotavator",
    product_name: "Heavy-Duty Multi-Speed Rotavator",
    customer_name: "Sanjay Shinde",
    customer_location: "Dindori, Nashik, Maharashtra",
    customer_phone: "+91 97654 32109",
    tractor_model: "John Deere 5310 (55 HP)",
    soil_type: "Red Clay & Loam",
    usage_duration: "3+ Years",
    rating: 5,
    durability_rating: 5,
    performance_rating: 5,
    service_rating: 4,
    headline: "Super fine soil pulverization for sugarcane and grape orchards",
    comment: "We cultivate grapes and sugarcane in Dindori. Single pass gives seedbed-ready pulverization with zero residue clogging. Gearbox oil stays cool even after 8 continuous hours of field work.",
    tags: ["Fine Soil Clod Crushing", "Heavy Gearbox", "Fuel Efficient"],
    is_verified_farmer: true,
    status: "approved",
    is_featured: true,
    admin_reply: "",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    id: "fb-1712000004",
    product_slug: "hydraulic-tipping-farm-trailer",
    product_name: "Heavy-Duty Hydraulic Tipping Farm Trailer",
    customer_name: "Ganesh Gaikwad",
    customer_location: "Kopargaon, Ahmednagar, Maharashtra",
    customer_phone: "+91 91580 77654",
    tractor_model: "Massey Ferguson 241 DI (42 HP)",
    soil_type: "All Terrain / Road Haulage",
    usage_duration: "6 Months",
    rating: 4,
    durability_rating: 5,
    performance_rating: 4,
    service_rating: 5,
    headline: "Heavy channel chassis carries 8 tonnes sugarcane with absolute stability",
    comment: "The hydraulic jack lifting angle is steep enough to dump damp sugarcane bagasse and harvested cane in seconds. High-tensile axle and leaf spring suspension give great balance on rough farm roads.",
    tags: ["Heavy Channel Chassis", "High Angle Tipping", "Heavy-Duty Axle"],
    is_verified_farmer: true,
    status: "approved",
    is_featured: false,
    admin_reply: "Thank you Ganesh ji! We reinforce the subframe with high-strength structural channels for sugarcane haulage.",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
  },
  {
    id: "fb-1712000005",
    product_slug: "mounted-disc-harrow",
    product_name: "Mounted Heavy-Duty Disc Harrow",
    customer_name: "Anil Wagh",
    customer_location: "Sinnar, Nashik, Maharashtra",
    customer_phone: "+91 99700 11223",
    tractor_model: "Kubota MU5502 (55 HP)",
    soil_type: "Hardpan / Stony Soil",
    usage_duration: "< 6 Months",
    rating: 5,
    durability_rating: 5,
    performance_rating: 5,
    service_rating: 5,
    headline: "Boron steel disc blades cut stubble effortlessly",
    comment: "Just purchased last month. Excellent bearing spool protection against soil intrusion. Gang angle adjustment is very quick and effortless.",
    tags: ["Boron Steel Discs", "Heavy Gang Spool", "Deep Penetration"],
    is_verified_farmer: true,
    status: "pending",
    is_featured: false,
    admin_reply: "",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  }
];

async function setup() {
  console.log("Connecting to Supabase PostgreSQL database...");
  const client = await pool.connect();

  try {
    console.log("Creating public.feedbacks table if not exists...");
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.feedbacks (
        id TEXT PRIMARY KEY,
        product_slug TEXT NOT NULL,
        product_name TEXT NOT NULL,
        customer_name TEXT NOT NULL,
        customer_location TEXT NOT NULL,
        customer_phone TEXT,
        tractor_model TEXT,
        soil_type TEXT,
        usage_duration TEXT,
        rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
        durability_rating INT DEFAULT 5,
        performance_rating INT DEFAULT 5,
        service_rating INT DEFAULT 5,
        headline TEXT NOT NULL,
        comment TEXT NOT NULL,
        tags JSONB DEFAULT '[]'::jsonb,
        is_verified_farmer BOOLEAN DEFAULT true,
        status TEXT DEFAULT 'approved',
        is_featured BOOLEAN DEFAULT false,
        admin_reply TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    console.log("✓ public.feedbacks table is ready.");

    const countRes = await client.query("SELECT COUNT(*) FROM public.feedbacks;");
    const count = parseInt(countRes.rows[0].count, 10);
    console.log(`Current record count: ${count}`);

    if (count === 0) {
      console.log("Seeding initial feedback records...");
      for (const fb of initialFeedbacks) {
        await client.query(`
          INSERT INTO public.feedbacks (
            id, product_slug, product_name, customer_name, customer_location,
            customer_phone, tractor_model, soil_type, usage_duration,
            rating, durability_rating, performance_rating, service_rating,
            headline, comment, tags, is_verified_farmer, status, is_featured,
            admin_reply, created_at, updated_at
          ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22)
          ON CONFLICT (id) DO NOTHING;
        `, [
          fb.id, fb.product_slug, fb.product_name, fb.customer_name, fb.customer_location,
          fb.customer_phone, fb.tractor_model, fb.soil_type, fb.usage_duration,
          fb.rating, fb.durability_rating, fb.performance_rating, fb.service_rating,
          fb.headline, fb.comment, JSON.stringify(fb.tags), fb.is_verified_farmer, fb.status, fb.is_featured,
          fb.admin_reply, fb.created_at, fb.updated_at
        ]);
      }
      console.log(`✓ Seeded ${initialFeedbacks.length} initial farmer reviews!`);
    }

    client.release();
    await pool.end();
  } catch (err) {
    console.error("Setup error:", err);
    client.release();
    await pool.end();
    process.exit(1);
  }
}

setup();
