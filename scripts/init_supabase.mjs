import fs from "fs";
import path from "path";
import pg from "pg";
const { Pool } = pg;

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres.ihaxijlnumozvghgvcqf:SaiPoojaFabraications@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres";

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

async function init() {
  console.log("Connecting to Supabase PostgreSQL...");
  const client = await pool.connect();

  try {
    console.log("Ensuring all 7 tables exist in public schema...");

    await client.query(`
      CREATE TABLE IF NOT EXISTS public.products (
        id TEXT PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        hindi_name TEXT,
        category TEXT NOT NULL,
        category_group TEXT NOT NULL,
        category_name TEXT NOT NULL,
        tagline TEXT,
        description TEXT,
        full_description TEXT,
        hero_image TEXT,
        thumbnail TEXT,
        gallery_images JSONB DEFAULT '[]'::jsonb,
        specifications JSONB DEFAULT '[]'::jsonb,
        features JSONB DEFAULT '[]'::jsonb,
        applications JSONB DEFAULT '[]'::jsonb,
        suitable_for_tractor_hp TEXT,
        related_product_slugs JSONB DEFAULT '[]'::jsonb,
        warranty TEXT,
        is_featured BOOLEAN DEFAULT false,
        image_role TEXT DEFAULT 'representative',
        display_order INT DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS public.inquiries (
        id TEXT PRIMARY KEY,
        inquiry_type TEXT NOT NULL,
        selected_product TEXT,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT,
        requirement TEXT NOT NULL,
        additional_details TEXT,
        status TEXT DEFAULT 'new',
        notes TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS public.gallery (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        category_label TEXT NOT NULL,
        image TEXT NOT NULL,
        thumbnail TEXT,
        description TEXT,
        product_slug TEXT,
        product_name TEXT,
        featured BOOLEAN DEFAULT false,
        aspect_ratio TEXT DEFAULT '16/9',
        display_order INT DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS public.settings (
        id TEXT PRIMARY KEY DEFAULT 'general',
        company JSONB NOT NULL,
        faqs JSONB NOT NULL,
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS public.capabilities (
        id TEXT PRIMARY KEY,
        number TEXT NOT NULL,
        title TEXT NOT NULL,
        short_description TEXT NOT NULL,
        detailed_description TEXT NOT NULL,
        key_highlights JSONB DEFAULT '[]'::jsonb,
        image TEXT NOT NULL,
        category_tag TEXT NOT NULL,
        display_order INT DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS public.fabrication_process (
        step TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        short_description TEXT NOT NULL,
        detailed_description TEXT NOT NULL,
        image TEXT NOT NULL,
        tag TEXT NOT NULL,
        display_order INT DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS public.company_approach (
        number TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        tag TEXT NOT NULL,
        display_order INT DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    console.log("All tables checked / created successfully!");

    // 1. Seed products
    const productsRes = await client.query("SELECT COUNT(*) FROM public.products;");
    const productCount = parseInt(productsRes.rows[0].count, 10);
    if (productCount === 0) {
      console.log("Seeding products...");
      const productsData = JSON.parse(
        fs.readFileSync(path.join(process.cwd(), "data", "products.json"), "utf-8")
      );
      for (const p of productsData) {
        await client.query(
          `INSERT INTO public.products (
            id, slug, name, hindi_name, category, category_group, category_name,
            tagline, description, full_description, hero_image, thumbnail,
            gallery_images, specifications, features, applications,
            suitable_for_tractor_hp, related_product_slugs, warranty, is_featured,
            image_role, display_order
          ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22)
          ON CONFLICT (id) DO NOTHING;`,
          [
            p.id,
            p.slug,
            p.name,
            p.hindiName || "",
            p.category,
            p.categoryGroup,
            p.categoryName,
            p.tagline || "",
            p.description || "",
            p.fullDescription || "",
            p.heroImage,
            p.thumbnail,
            JSON.stringify(p.galleryImages || []),
            JSON.stringify(p.specifications || []),
            JSON.stringify(p.features || []),
            JSON.stringify(p.applications || []),
            p.suitableForTractorHp || "",
            JSON.stringify(p.relatedProductSlugs || []),
            p.warranty || "",
            Boolean(p.isFeatured),
            p.imageRole || "representative",
            p.order ?? 0,
          ]
        );
      }
      console.log(`Seeded ${productsData.length} products.`);
    } else {
      console.log(`Products table: ${productCount} records.`);
    }

    // 2. Seed inquiries
    const inquiriesRes = await client.query("SELECT COUNT(*) FROM public.inquiries;");
    const inquiryCount = parseInt(inquiriesRes.rows[0].count, 10);
    if (inquiryCount === 0) {
      console.log("Seeding inquiries...");
      const inquiriesData = JSON.parse(
        fs.readFileSync(path.join(process.cwd(), "data", "inquiries.json"), "utf-8")
      );
      for (const inq of inquiriesData) {
        await client.query(
          `INSERT INTO public.inquiries (
            id, inquiry_type, selected_product, name, phone, email,
            requirement, status, notes, created_at, updated_at
          ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
          ON CONFLICT (id) DO NOTHING;`,
          [
            inq.id,
            inq.inquiryType,
            inq.selectedProduct || "",
            inq.name,
            inq.phone,
            inq.email || "",
            inq.requirement,
            inq.status || "new",
            inq.notes || "",
            inq.createdAt || new Date().toISOString(),
            inq.updatedAt || new Date().toISOString(),
          ]
        );
      }
      console.log(`Seeded ${inquiriesData.length} inquiries.`);
    } else {
      console.log(`Inquiries table: ${inquiryCount} records.`);
    }

    // 3. Seed gallery
    const galleryRes = await client.query("SELECT COUNT(*) FROM public.gallery;");
    const galleryCount = parseInt(galleryRes.rows[0].count, 10);
    if (galleryCount === 0) {
      console.log("Seeding gallery...");
      const galleryData = JSON.parse(
        fs.readFileSync(path.join(process.cwd(), "data", "gallery.json"), "utf-8")
      );
      for (const g of galleryData) {
        await client.query(
          `INSERT INTO public.gallery (
            id, title, category, category_label, image, thumbnail,
            description, product_slug, product_name, featured, aspect_ratio, display_order
          ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
          ON CONFLICT (id) DO NOTHING;`,
          [
            g.id,
            g.title,
            g.category,
            g.categoryLabel,
            g.image,
            g.thumbnail || g.image,
            g.description || "",
            g.productSlug || null,
            g.productName || null,
            Boolean(g.featured),
            g.aspectRatio || "16/9",
            g.order ?? 0,
          ]
        );
      }
      console.log(`Seeded ${galleryData.length} gallery items.`);
    } else {
      console.log(`Gallery table: ${galleryCount} records.`);
    }

    // 4. Seed settings
    const settingsRes = await client.query("SELECT COUNT(*) FROM public.settings;");
    const settingsCount = parseInt(settingsRes.rows[0].count, 10);
    if (settingsCount === 0) {
      console.log("Seeding settings...");
      const settingsData = JSON.parse(
        fs.readFileSync(path.join(process.cwd(), "data", "settings.json"), "utf-8")
      );
      await client.query(
        `INSERT INTO public.settings (id, company, faqs, updated_at)
         VALUES ('general', $1, $2, $3)
         ON CONFLICT (id) DO UPDATE SET company = $1, faqs = $2, updated_at = $3;`,
        [
          JSON.stringify(settingsData.company),
          JSON.stringify(settingsData.faqs),
          settingsData.updatedAt || new Date().toISOString(),
        ]
      );
      console.log("Seeded settings.");
    } else {
      console.log(`Settings table: ${settingsCount} records.`);
    }

    // 5. Seed capabilities
    const capabilitiesRes = await client.query("SELECT COUNT(*) FROM public.capabilities;");
    const capabilityCount = parseInt(capabilitiesRes.rows[0].count, 10);
    if (capabilityCount === 0) {
      console.log("Seeding capabilities from data/capabilities.json...");
      const capabilitiesData = JSON.parse(
        fs.readFileSync(path.join(process.cwd(), "data", "capabilities.json"), "utf-8")
      );
      for (const cap of capabilitiesData) {
        await client.query(
          `INSERT INTO public.capabilities (
            id, number, title, short_description, detailed_description,
            key_highlights, image, category_tag, display_order
          ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
          ON CONFLICT (id) DO UPDATE SET
            number = EXCLUDED.number,
            title = EXCLUDED.title,
            short_description = EXCLUDED.short_description,
            detailed_description = EXCLUDED.detailed_description,
            key_highlights = EXCLUDED.key_highlights,
            image = EXCLUDED.image,
            category_tag = EXCLUDED.category_tag,
            display_order = EXCLUDED.display_order;`,
          [
            cap.id,
            cap.number,
            cap.title,
            cap.shortDescription,
            cap.detailedDescription,
            JSON.stringify(cap.keyHighlights || []),
            cap.image,
            cap.categoryTag,
            cap.order ?? 0,
          ]
        );
      }
      console.log(`Seeded ${capabilitiesData.length} capabilities.`);
    } else {
      console.log(`Capabilities table: ${capabilityCount} records.`);
    }

    // 6. Seed fabrication process
    const processRes = await client.query("SELECT COUNT(*) FROM public.fabrication_process;");
    const processCount = parseInt(processRes.rows[0].count, 10);
    if (processCount === 0) {
      console.log("Seeding fabrication process steps from data/fabrication-process.json...");
      const processData = JSON.parse(
        fs.readFileSync(path.join(process.cwd(), "data", "fabrication-process.json"), "utf-8")
      );
      for (const st of processData) {
        await client.query(
          `INSERT INTO public.fabrication_process (
            step, title, short_description, detailed_description, image, tag, display_order
          ) VALUES ($1,$2,$3,$4,$5,$6,$7)
          ON CONFLICT (step) DO UPDATE SET
            title = EXCLUDED.title,
            short_description = EXCLUDED.short_description,
            detailed_description = EXCLUDED.detailed_description,
            image = EXCLUDED.image,
            tag = EXCLUDED.tag,
            display_order = EXCLUDED.display_order;`,
          [
            st.step,
            st.title,
            st.shortDescription,
            st.detailedDescription,
            st.image,
            st.tag,
            st.order ?? 0,
          ]
        );
      }
      console.log(`Seeded ${processData.length} fabrication process steps.`);
    } else {
      console.log(`Fabrication process table: ${processCount} records.`);
    }

    // 7. Seed company approach pillars
    const approachRes = await client.query("SELECT COUNT(*) FROM public.company_approach;");
    const approachCount = parseInt(approachRes.rows[0].count, 10);
    if (approachCount === 0) {
      console.log("Seeding company approach pillars from data/company-approach.json...");
      const approachData = JSON.parse(
        fs.readFileSync(path.join(process.cwd(), "data", "company-approach.json"), "utf-8")
      );
      for (const ap of approachData) {
        await client.query(
          `INSERT INTO public.company_approach (
            number, title, description, tag, display_order
          ) VALUES ($1,$2,$3,$4,$5)
          ON CONFLICT (number) DO UPDATE SET
            title = EXCLUDED.title,
            description = EXCLUDED.description,
            tag = EXCLUDED.tag,
            display_order = EXCLUDED.display_order;`,
          [
            ap.number,
            ap.title,
            ap.description,
            ap.tag,
            ap.order ?? 0,
          ]
        );
      }
      console.log(`Seeded ${approachData.length} company approach pillars.`);
    } else {
      console.log(`Company approach table: ${approachCount} records.`);
    }

    console.log("\n--- All 7 Supabase tables initialized and verified! ---");
  } finally {
    client.release();
    await pool.end();
  }
}

init().catch((err) => {
  console.error("Migration error:", err);
  process.exit(1);
});
