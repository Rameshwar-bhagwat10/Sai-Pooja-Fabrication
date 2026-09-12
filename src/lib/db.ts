import fs from "fs";
import path from "path";
import pg from "pg";
import { type ProductItem, type ProductCategory, type ProductCategoryGroup } from "@/types/product";
import { type GalleryItem, type GalleryCategory } from "@/types/gallery";
import { type InquiryFormData } from "@/types/contact";
import { type FabricationCapability, FABRICATION_CAPABILITIES } from "@/data/capabilities";
import { type FabricationProcessStep, FABRICATION_PROCESS } from "@/data/fabrication-process";
import { type CompanyApproachPillar, COMPANY_APPROACH } from "@/data/company";
import { ALL_PRODUCTS } from "@/data/products";
import { GALLERY_ITEMS } from "@/data/gallery";
import { COMPANY_INFO } from "@/data/company";
import { CONTACT_FAQS } from "@/data/contact";

const { Pool } = pg;

// Data directory path for local JSON fallback / cache
const DATA_DIR = path.join(process.cwd(), "data");
const PRODUCTS_FILE = path.join(DATA_DIR, "products.json");
const INQUIRIES_FILE = path.join(DATA_DIR, "inquiries.json");
const GALLERY_FILE = path.join(DATA_DIR, "gallery.json");
const SETTINGS_FILE = path.join(DATA_DIR, "settings.json");
const CAPABILITIES_FILE = path.join(DATA_DIR, "capabilities.json");
const PROCESS_FILE = path.join(DATA_DIR, "fabrication-process.json");
const APPROACH_FILE = path.join(DATA_DIR, "company-approach.json");

export type InquiryStatus =
  | "new"
  | "contacted"
  | "quotation_sent"
  | "converted"
  | "closed";

export interface StoredInquiry extends InquiryFormData {
  id: string;
  status: InquiryStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StoredSettings {
  company: typeof COMPANY_INFO;
  faqs: typeof CONTACT_FAQS;
  updatedAt: string;
}

// ---------------- DATABASE POOL & HELPERS ----------------

let pool: pg.Pool | null = null;

function getPool(): pg.Pool | null {
  if (typeof window !== "undefined") return null;
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) return null;

  if (!pool) {
    pool = new Pool({
      connectionString: dbUrl,
      ssl: { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    });

    pool.on("error", (err) => {
      console.error("[PostgreSQL Pool Error]:", err.message);
    });
  }
  return pool;
}

// Ensure local data directory exists for fallback/cache
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readJsonFile<T>(filePath: string, fallback: T): T {
  try {
    ensureDataDir();
    if (!fs.existsSync(filePath)) {
      writeJsonFile(filePath, fallback);
      return fallback;
    }
    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content) as T;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return fallback;
  }
}

function writeJsonFile<T>(filePath: string, data: T): void {
  try {
    ensureDataDir();
    const tempFile = `${filePath}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), "utf-8");
    fs.renameSync(tempFile, filePath);
  } catch (error) {
    console.error(`Error writing to ${filePath}:`, error);
  }
}

// ---------------- ROW CONVERTERS ----------------

function rowToProduct(row: any): ProductItem {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    hindiName: row.hindi_name || undefined,
    category: row.category as ProductCategory,
    categoryGroup: row.category_group as ProductCategoryGroup,
    categoryName: row.category_name,
    tagline: row.tagline || "",
    description: row.description || "",
    fullDescription: row.full_description || "",
    heroImage: row.hero_image,
    thumbnail: row.thumbnail || row.hero_image,
    galleryImages: typeof row.gallery_images === "string" ? JSON.parse(row.gallery_images) : (row.gallery_images || []),
    specifications: typeof row.specifications === "string" ? JSON.parse(row.specifications) : (row.specifications || []),
    features: typeof row.features === "string" ? JSON.parse(row.features) : (row.features || []),
    applications: typeof row.applications === "string" ? JSON.parse(row.applications) : (row.applications || []),
    suitableForTractorHp: row.suitable_for_tractor_hp || undefined,
    relatedProductSlugs: typeof row.related_product_slugs === "string" ? JSON.parse(row.related_product_slugs) : (row.related_product_slugs || []),
    warranty: row.warranty || undefined,
    isFeatured: Boolean(row.is_featured),
    imageRole: row.image_role || "representative",
    order: row.display_order ?? 0,
  };
}

function rowToInquiry(row: any): StoredInquiry {
  return {
    id: row.id,
    inquiryType: row.inquiry_type,
    selectedProduct: row.selected_product || "",
    name: row.name,
    phone: row.phone,
    email: row.email || "",
    requirement: row.requirement,
    additionalDetails: row.additional_details || "",
    status: row.status as InquiryStatus,
    notes: row.notes || "",
    createdAt: row.created_at ? new Date(row.created_at).toISOString() : new Date().toISOString(),
    updatedAt: row.updated_at ? new Date(row.updated_at).toISOString() : new Date().toISOString(),
  };
}

function rowToGallery(row: any): GalleryItem {
  return {
    id: row.id,
    title: row.title,
    category: row.category as GalleryCategory,
    categoryLabel: row.category_label,
    image: row.image,
    thumbnail: row.thumbnail || row.image,
    description: row.description || "",
    productSlug: row.product_slug || undefined,
    productName: row.product_name || undefined,
    featured: Boolean(row.featured),
    aspectRatio: row.aspect_ratio || "16/9",
    order: row.display_order ?? 0,
  };
}

function rowToSettings(row: any): StoredSettings {
  return {
    company: typeof row.company === "string" ? JSON.parse(row.company) : row.company,
    faqs: typeof row.faqs === "string" ? JSON.parse(row.faqs) : row.faqs,
    updatedAt: row.updated_at ? new Date(row.updated_at).toISOString() : new Date().toISOString(),
  };
}

function rowToCapability(row: any): FabricationCapability {
  return {
    id: row.id,
    number: row.number,
    title: row.title,
    shortDescription: row.short_description,
    detailedDescription: row.detailed_description,
    keyHighlights: typeof row.key_highlights === "string" ? JSON.parse(row.key_highlights) : (row.key_highlights || []),
    image: row.image,
    categoryTag: row.category_tag,
  };
}

function rowToProcessStep(row: any): FabricationProcessStep {
  return {
    step: row.step,
    title: row.title,
    shortDescription: row.short_description,
    detailedDescription: row.detailed_description,
    image: row.image,
    tag: row.tag,
  };
}

function rowToApproachPillar(row: any): CompanyApproachPillar {
  return {
    number: row.number,
    title: row.title,
    description: row.description,
    tag: row.tag,
  };
}

// ---------------- PRODUCTS ----------------

export async function getAllProducts(): Promise<ProductItem[]> {
  const clientPool = getPool();
  if (clientPool) {
    try {
      const res = await clientPool.query("SELECT * FROM public.products ORDER BY display_order ASC;");
      if (res.rows && res.rows.length > 0) {
        const products = res.rows.map(rowToProduct);
        writeJsonFile(PRODUCTS_FILE, products);
        return products;
      }
    } catch (err) {
      console.warn("[DB] Supabase query failed, using local file cache:", (err as Error).message);
    }
  }

  const products = readJsonFile<ProductItem[]>(PRODUCTS_FILE, ALL_PRODUCTS);
  return products.sort((a, b) => (a.order || 0) - (b.order || 0));
}

export async function getProductById(id: string): Promise<ProductItem | null> {
  const clientPool = getPool();
  if (clientPool) {
    try {
      const res = await clientPool.query("SELECT * FROM public.products WHERE id = $1 LIMIT 1;", [id]);
      if (res.rows && res.rows.length > 0) {
        return rowToProduct(res.rows[0]);
      }
    } catch (err) {
      console.warn("[DB] Supabase query failed, searching local products:", (err as Error).message);
    }
  }

  const products = await getAllProducts();
  return products.find((p) => p.id === id) || null;
}

export async function getProductBySlug(slug: string): Promise<ProductItem | null> {
  const clientPool = getPool();
  if (clientPool) {
    try {
      const res = await clientPool.query("SELECT * FROM public.products WHERE slug = $1 LIMIT 1;", [slug]);
      if (res.rows && res.rows.length > 0) {
        return rowToProduct(res.rows[0]);
      }
    } catch (err) {
      console.warn("[DB] Supabase query failed, searching local products:", (err as Error).message);
    }
  }

  const products = await getAllProducts();
  return products.find((p) => p.slug === slug) || null;
}

export async function saveProduct(productData: Partial<ProductItem> & { name: string }): Promise<ProductItem> {
  const clientPool = getPool();
  const slug =
    productData.slug ||
    productData.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const id = productData.id || `prod-${Date.now()}`;

  if (clientPool) {
    try {
      const existing = await clientPool.query("SELECT id FROM public.products WHERE id = $1 LIMIT 1;", [id]);
      let savedRow;

      if (existing.rowCount && existing.rowCount > 0) {
        const res = await clientPool.query(
          `UPDATE public.products SET
            slug = COALESCE($1, slug),
            name = COALESCE($2, name),
            hindi_name = COALESCE($3, hindi_name),
            category = COALESCE($4, category),
            category_group = COALESCE($5, category_group),
            category_name = COALESCE($6, category_name),
            tagline = COALESCE($7, tagline),
            description = COALESCE($8, description),
            full_description = COALESCE($9, full_description),
            hero_image = COALESCE($10, hero_image),
            thumbnail = COALESCE($11, thumbnail),
            gallery_images = COALESCE($12, gallery_images),
            specifications = COALESCE($13, specifications),
            features = COALESCE($14, features),
            applications = COALESCE($15, applications),
            suitable_for_tractor_hp = COALESCE($16, suitable_for_tractor_hp),
            related_product_slugs = COALESCE($17, related_product_slugs),
            warranty = COALESCE($18, warranty),
            is_featured = COALESCE($19, is_featured),
            image_role = COALESCE($20, image_role),
            display_order = COALESCE($21, display_order),
            updated_at = NOW()
          WHERE id = $22
          RETURNING *;`,
          [
            productData.slug || slug,
            productData.name,
            productData.hindiName || "",
            productData.category,
            productData.categoryGroup,
            productData.categoryName,
            productData.tagline,
            productData.description,
            productData.fullDescription,
            productData.heroImage,
            productData.thumbnail,
            productData.galleryImages ? JSON.stringify(productData.galleryImages) : null,
            productData.specifications ? JSON.stringify(productData.specifications) : null,
            productData.features ? JSON.stringify(productData.features) : null,
            productData.applications ? JSON.stringify(productData.applications) : null,
            productData.suitableForTractorHp,
            productData.relatedProductSlugs ? JSON.stringify(productData.relatedProductSlugs) : null,
            productData.warranty,
            productData.isFeatured !== undefined ? Boolean(productData.isFeatured) : null,
            productData.imageRole,
            productData.order,
            id,
          ]
        );
        savedRow = res.rows[0];
      } else {
        const res = await clientPool.query(
          `INSERT INTO public.products (
            id, slug, name, hindi_name, category, category_group, category_name,
            tagline, description, full_description, hero_image, thumbnail,
            gallery_images, specifications, features, applications,
            suitable_for_tractor_hp, related_product_slugs, warranty, is_featured,
            image_role, display_order, created_at, updated_at
          ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,NOW(),NOW())
          RETURNING *;`,
          [
            id,
            slug,
            productData.name,
            productData.hindiName || "",
            productData.category || "custom-implements",
            productData.categoryGroup || "custom",
            productData.categoryName || "Custom Fabrication",
            productData.tagline || "",
            productData.description || "",
            productData.fullDescription || "",
            productData.heroImage || "/images/products/custom-implements/custom-implements-main.svg",
            productData.thumbnail || productData.heroImage || "/images/products/custom-implements/custom-implements-main.svg",
            JSON.stringify(productData.galleryImages || []),
            JSON.stringify(productData.specifications || []),
            JSON.stringify(productData.features || []),
            JSON.stringify(productData.applications || []),
            productData.suitableForTractorHp || "",
            JSON.stringify(productData.relatedProductSlugs || []),
            productData.warranty || "1 Year Structural Warranty",
            Boolean(productData.isFeatured),
            productData.imageRole || "representative",
            productData.order ?? 0,
          ]
        );
        savedRow = res.rows[0];
      }

      const product = rowToProduct(savedRow);
      const localProducts = readJsonFile<ProductItem[]>(PRODUCTS_FILE, ALL_PRODUCTS);
      const idx = localProducts.findIndex((p) => p.id === product.id);
      if (idx !== -1) {
        localProducts[idx] = product;
      } else {
        localProducts.push(product);
      }
      writeJsonFile(PRODUCTS_FILE, localProducts);
      return product;
    } catch (err) {
      console.warn("[DB] Supabase product save failed, saving locally:", (err as Error).message);
    }
  }

  // Local fallback
  const localProducts = readJsonFile<ProductItem[]>(PRODUCTS_FILE, ALL_PRODUCTS);
  if (productData.id) {
    const index = localProducts.findIndex((p) => p.id === productData.id);
    if (index !== -1) {
      const updated: ProductItem = {
        ...localProducts[index],
        ...productData,
      } as ProductItem;
      localProducts[index] = updated;
      writeJsonFile(PRODUCTS_FILE, localProducts);
      return updated;
    }
  }

  const newProduct: ProductItem = {
    id,
    slug,
    name: productData.name,
    hindiName: productData.hindiName || "",
    category: productData.category || "custom-implements",
    categoryGroup: productData.categoryGroup || "custom",
    categoryName: productData.categoryName || "Custom Fabrication",
    tagline: productData.tagline || "",
    description: productData.description || "",
    fullDescription: productData.fullDescription || "",
    heroImage: productData.heroImage || "/images/products/custom-implements/custom-implements-main.svg",
    thumbnail: productData.thumbnail || productData.heroImage || "/images/products/custom-implements/custom-implements-main.svg",
    galleryImages: productData.galleryImages || [],
    specifications: productData.specifications || [],
    features: productData.features || [],
    applications: productData.applications || [],
    suitableForTractorHp: productData.suitableForTractorHp || "",
    relatedProductSlugs: productData.relatedProductSlugs || [],
    warranty: productData.warranty || "1 Year Structural Warranty",
    isFeatured: Boolean(productData.isFeatured),
    imageRole: productData.imageRole || "representative",
    order: productData.order ?? localProducts.length + 1,
  };

  localProducts.push(newProduct);
  writeJsonFile(PRODUCTS_FILE, localProducts);
  return newProduct;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const clientPool = getPool();
  let deletedFromDb = false;

  if (clientPool) {
    try {
      const res = await clientPool.query("DELETE FROM public.products WHERE id = $1 OR slug = $1 RETURNING id;", [id]);
      deletedFromDb = (res.rowCount ?? 0) > 0;
    } catch (err) {
      console.warn("[DB] Supabase product delete failed, deleting locally:", (err as Error).message);
    }
  }

  const localProducts = readJsonFile<ProductItem[]>(PRODUCTS_FILE, ALL_PRODUCTS);
  const filtered = localProducts.filter((p) => p.id !== id && p.slug !== id);
  if (filtered.length !== localProducts.length || deletedFromDb) {
    writeJsonFile(PRODUCTS_FILE, filtered);
    return true;
  }
  return false;
}

// ---------------- INQUIRIES ----------------

export async function getAllInquiries(): Promise<StoredInquiry[]> {
  const clientPool = getPool();
  if (clientPool) {
    try {
      const res = await clientPool.query("SELECT * FROM public.inquiries ORDER BY created_at DESC;");
      if (res.rows) {
        const inquiries = res.rows.map(rowToInquiry);
        writeJsonFile(INQUIRIES_FILE, inquiries);
        return inquiries;
      }
    } catch (err) {
      console.warn("[DB] Supabase inquiries query failed, reading local:", (err as Error).message);
    }
  }

  const inquiries = readJsonFile<StoredInquiry[]>(INQUIRIES_FILE, []);
  return inquiries.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function createInquiry(data: InquiryFormData): Promise<StoredInquiry> {
  const id = `inq-${Date.now()}`;
  const now = new Date().toISOString();
  const clientPool = getPool();

  if (clientPool) {
    try {
      const res = await clientPool.query(
        `INSERT INTO public.inquiries (
          id, inquiry_type, selected_product, name, phone, email,
          requirement, additional_details, status, notes, created_at, updated_at
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
        RETURNING *;`,
        [
          id,
          data.inquiryType,
          data.selectedProduct || "",
          data.name,
          data.phone,
          data.email || "",
          data.requirement,
          data.additionalDetails || "",
          "new",
          "",
          now,
          now,
        ]
      );

      const saved = rowToInquiry(res.rows[0]);
      const localInquiries = readJsonFile<StoredInquiry[]>(INQUIRIES_FILE, []);
      localInquiries.unshift(saved);
      writeJsonFile(INQUIRIES_FILE, localInquiries);
      return saved;
    } catch (err) {
      console.warn("[DB] Supabase inquiry insert failed, saving locally:", (err as Error).message);
    }
  }

  const localInquiries = readJsonFile<StoredInquiry[]>(INQUIRIES_FILE, []);
  const newInquiry: StoredInquiry = {
    ...data,
    id,
    status: "new",
    createdAt: now,
    updatedAt: now,
  };

  localInquiries.unshift(newInquiry);
  writeJsonFile(INQUIRIES_FILE, localInquiries);
  return newInquiry;
}

export async function updateInquiry(
  id: string,
  updates: Partial<Pick<StoredInquiry, "status" | "notes">>
): Promise<StoredInquiry | null> {
  const clientPool = getPool();

  if (clientPool) {
    try {
      const res = await clientPool.query(
        `UPDATE public.inquiries SET
          status = COALESCE($1, status),
          notes = COALESCE($2, notes),
          updated_at = NOW()
        WHERE id = $3
        RETURNING *;`,
        [updates.status || null, updates.notes || null, id]
      );

      if (res.rows && res.rows.length > 0) {
        const updated = rowToInquiry(res.rows[0]);
        const localInquiries = readJsonFile<StoredInquiry[]>(INQUIRIES_FILE, []);
        const idx = localInquiries.findIndex((inq) => inq.id === id);
        if (idx !== -1) {
          localInquiries[idx] = updated;
          writeJsonFile(INQUIRIES_FILE, localInquiries);
        }
        return updated;
      }
    } catch (err) {
      console.warn("[DB] Supabase inquiry update failed, updating locally:", (err as Error).message);
    }
  }

  const localInquiries = readJsonFile<StoredInquiry[]>(INQUIRIES_FILE, []);
  const index = localInquiries.findIndex((inq) => inq.id === id);
  if (index === -1) return null;

  localInquiries[index] = {
    ...localInquiries[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  writeJsonFile(INQUIRIES_FILE, localInquiries);
  return localInquiries[index];
}

export async function deleteInquiry(id: string): Promise<boolean> {
  const clientPool = getPool();
  let deletedFromDb = false;

  if (clientPool) {
    try {
      const res = await clientPool.query("DELETE FROM public.inquiries WHERE id = $1 RETURNING id;", [id]);
      deletedFromDb = (res.rowCount ?? 0) > 0;
    } catch (err) {
      console.warn("[DB] Supabase inquiry delete failed, deleting locally:", (err as Error).message);
    }
  }

  const localInquiries = readJsonFile<StoredInquiry[]>(INQUIRIES_FILE, []);
  const filtered = localInquiries.filter((inq) => inq.id !== id);
  if (filtered.length !== localInquiries.length || deletedFromDb) {
    writeJsonFile(INQUIRIES_FILE, filtered);
    return true;
  }
  return false;
}

// ---------------- GALLERY ----------------

export async function getAllGalleryItems(): Promise<GalleryItem[]> {
  const clientPool = getPool();
  if (clientPool) {
    try {
      const res = await clientPool.query("SELECT * FROM public.gallery ORDER BY display_order ASC;");
      if (res.rows && res.rows.length > 0) {
        const items = res.rows.map(rowToGallery);
        writeJsonFile(GALLERY_FILE, items);
        return items;
      }
    } catch (err) {
      console.warn("[DB] Supabase gallery query failed, reading local:", (err as Error).message);
    }
  }

  const items = readJsonFile<GalleryItem[]>(GALLERY_FILE, GALLERY_ITEMS);
  return items.sort((a, b) => (a.order || 0) - (b.order || 0));
}

export async function saveGalleryItem(data: Partial<GalleryItem> & { title: string; image: string }): Promise<GalleryItem> {
  const clientPool = getPool();
  const id = data.id || `gal-${Date.now()}`;

  if (clientPool) {
    try {
      const existing = await clientPool.query("SELECT id FROM public.gallery WHERE id = $1 LIMIT 1;", [id]);
      let savedRow;

      if (existing.rowCount && existing.rowCount > 0) {
        const res = await clientPool.query(
          `UPDATE public.gallery SET
            title = COALESCE($1, title),
            category = COALESCE($2, category),
            category_label = COALESCE($3, category_label),
            image = COALESCE($4, image),
            thumbnail = COALESCE($5, thumbnail),
            description = COALESCE($6, description),
            product_slug = COALESCE($7, product_slug),
            product_name = COALESCE($8, product_name),
            featured = COALESCE($9, featured),
            aspect_ratio = COALESCE($10, aspect_ratio),
            display_order = COALESCE($11, display_order),
            updated_at = NOW()
          WHERE id = $12
          RETURNING *;`,
          [
            data.title,
            data.category,
            data.categoryLabel,
            data.image,
            data.thumbnail,
            data.description,
            data.productSlug || null,
            data.productName || null,
            data.featured !== undefined ? Boolean(data.featured) : null,
            data.aspectRatio,
            data.order,
            id,
          ]
        );
        savedRow = res.rows[0];
      } else {
        const res = await clientPool.query(
          `INSERT INTO public.gallery (
            id, title, category, category_label, image, thumbnail,
            description, product_slug, product_name, featured, aspect_ratio, display_order, created_at, updated_at
          ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,NOW(),NOW())
          RETURNING *;`,
          [
            id,
            data.title,
            data.category || "equipment",
            data.categoryLabel || "EQUIPMENT",
            data.image,
            data.thumbnail || data.image,
            data.description || "",
            data.productSlug || null,
            data.productName || null,
            Boolean(data.featured),
            data.aspectRatio || "16/9",
            data.order ?? 0,
          ]
        );
        savedRow = res.rows[0];
      }

      const item = rowToGallery(savedRow);
      const localItems = readJsonFile<GalleryItem[]>(GALLERY_FILE, GALLERY_ITEMS);
      const idx = localItems.findIndex((i) => i.id === item.id);
      if (idx !== -1) {
        localItems[idx] = item;
      } else {
        localItems.push(item);
      }
      writeJsonFile(GALLERY_FILE, localItems);
      return item;
    } catch (err) {
      console.warn("[DB] Supabase gallery save failed, saving locally:", (err as Error).message);
    }
  }

  const localItems = readJsonFile<GalleryItem[]>(GALLERY_FILE, GALLERY_ITEMS);
  if (data.id) {
    const index = localItems.findIndex((i) => i.id === data.id);
    if (index !== -1) {
      localItems[index] = {
        ...localItems[index],
        ...data,
      } as GalleryItem;
      writeJsonFile(GALLERY_FILE, localItems);
      return localItems[index];
    }
  }

  const newItem: GalleryItem = {
    id,
    title: data.title,
    category: data.category || "equipment",
    categoryLabel: data.categoryLabel || "EQUIPMENT",
    image: data.image,
    thumbnail: data.thumbnail || data.image,
    description: data.description || "",
    productSlug: data.productSlug,
    productName: data.productName,
    featured: Boolean(data.featured),
    aspectRatio: data.aspectRatio || "16/9",
    order: data.order ?? localItems.length + 1,
  };

  localItems.push(newItem);
  writeJsonFile(GALLERY_FILE, localItems);
  return newItem;
}

export async function deleteGalleryItem(id: string): Promise<boolean> {
  const clientPool = getPool();
  let deletedFromDb = false;

  if (clientPool) {
    try {
      const res = await clientPool.query("DELETE FROM public.gallery WHERE id = $1 RETURNING id;", [id]);
      deletedFromDb = (res.rowCount ?? 0) > 0;
    } catch (err) {
      console.warn("[DB] Supabase gallery delete failed, deleting locally:", (err as Error).message);
    }
  }

  const localItems = readJsonFile<GalleryItem[]>(GALLERY_FILE, GALLERY_ITEMS);
  const filtered = localItems.filter((i) => i.id !== id);
  if (filtered.length !== localItems.length || deletedFromDb) {
    writeJsonFile(GALLERY_FILE, filtered);
    return true;
  }
  return false;
}

// ---------------- SETTINGS ----------------

export async function getSiteSettings(): Promise<StoredSettings> {
  const clientPool = getPool();
  if (clientPool) {
    try {
      const res = await clientPool.query("SELECT * FROM public.settings WHERE id = 'general' LIMIT 1;");
      if (res.rows && res.rows.length > 0) {
        const settings = rowToSettings(res.rows[0]);
        writeJsonFile(SETTINGS_FILE, settings);
        return settings;
      }
    } catch (err) {
      console.warn("[DB] Supabase settings query failed, reading local:", (err as Error).message);
    }
  }

  return readJsonFile<StoredSettings>(SETTINGS_FILE, {
    company: COMPANY_INFO,
    faqs: CONTACT_FAQS,
    updatedAt: new Date().toISOString(),
  });
}

export async function updateSiteSettings(updates: Partial<StoredSettings>): Promise<StoredSettings> {
  const clientPool = getPool();
  const current = await getSiteSettings();
  const updated: StoredSettings = {
    company: {
      ...current.company,
      ...(updates.company || {}),
    },
    faqs: updates.faqs || current.faqs,
    updatedAt: new Date().toISOString(),
  };

  if (clientPool) {
    try {
      await clientPool.query(
        `INSERT INTO public.settings (id, company, faqs, updated_at)
         VALUES ('general', $1, $2, $3)
         ON CONFLICT (id) DO UPDATE SET company = $1, faqs = $2, updated_at = $3;`,
        [JSON.stringify(updated.company), JSON.stringify(updated.faqs), updated.updatedAt]
      );
      writeJsonFile(SETTINGS_FILE, updated);
      return updated;
    } catch (err) {
      console.warn("[DB] Supabase settings update failed, saving locally:", (err as Error).message);
    }
  }

  writeJsonFile(SETTINGS_FILE, updated);
  return updated;
}

// ---------------- FABRICATION CAPABILITIES ----------------

export async function getAllCapabilities(): Promise<FabricationCapability[]> {
  const clientPool = getPool();
  if (clientPool) {
    try {
      const res = await clientPool.query("SELECT * FROM public.capabilities ORDER BY display_order ASC;");
      if (res.rows && res.rows.length > 0) {
        const capabilities = res.rows.map(rowToCapability);
        writeJsonFile(CAPABILITIES_FILE, capabilities);
        return capabilities;
      }
    } catch (err) {
      console.warn("[DB] Supabase capabilities query failed, reading local:", (err as Error).message);
    }
  }

  return readJsonFile<FabricationCapability[]>(CAPABILITIES_FILE, FABRICATION_CAPABILITIES);
}

// ---------------- FABRICATION PROCESS ----------------

export async function getAllFabricationSteps(): Promise<FabricationProcessStep[]> {
  const clientPool = getPool();
  if (clientPool) {
    try {
      const res = await clientPool.query("SELECT * FROM public.fabrication_process ORDER BY display_order ASC;");
      if (res.rows && res.rows.length > 0) {
        const steps = res.rows.map(rowToProcessStep);
        writeJsonFile(PROCESS_FILE, steps);
        return steps;
      }
    } catch (err) {
      console.warn("[DB] Supabase process query failed, reading local:", (err as Error).message);
    }
  }

  return readJsonFile<FabricationProcessStep[]>(PROCESS_FILE, FABRICATION_PROCESS);
}

// ---------------- COMPANY APPROACH PILLARS ----------------

export async function getAllCompanyApproachPillars(): Promise<CompanyApproachPillar[]> {
  const clientPool = getPool();
  if (clientPool) {
    try {
      const res = await clientPool.query("SELECT * FROM public.company_approach ORDER BY display_order ASC;");
      if (res.rows && res.rows.length > 0) {
        const pillars = res.rows.map(rowToApproachPillar);
        writeJsonFile(APPROACH_FILE, pillars);
        return pillars;
      }
    } catch (err) {
      console.warn("[DB] Supabase approach query failed, reading local:", (err as Error).message);
    }
  }

  return readJsonFile<CompanyApproachPillar[]>(APPROACH_FILE, COMPANY_APPROACH);
}

export async function saveCapability(data: Partial<FabricationCapability> & { title: string }): Promise<FabricationCapability> {
  const clientPool = getPool();
  const id = data.id || data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const localCaps = readJsonFile<FabricationCapability[]>(CAPABILITIES_FILE, FABRICATION_CAPABILITIES);
  const number = data.number || String(localCaps.length + 1).padStart(2, "0");

  const capability: FabricationCapability = {
    id,
    number,
    title: data.title,
    shortDescription: data.shortDescription || "",
    detailedDescription: data.detailedDescription || "",
    keyHighlights: data.keyHighlights || [],
    image: data.image || "/images/workshop/steel-fabrication.svg",
    categoryTag: data.categoryTag || "FABRICATION",
  };

  if (clientPool) {
    try {
      await clientPool.query(
        `INSERT INTO public.capabilities (
          id, number, title, short_description, detailed_description,
          key_highlights, image, category_tag, display_order, updated_at
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,NOW())
        ON CONFLICT (id) DO UPDATE SET
          number = COALESCE($2, public.capabilities.number),
          title = $3,
          short_description = $4,
          detailed_description = $5,
          key_highlights = $6,
          image = $7,
          category_tag = $8,
          updated_at = NOW();`,
        [
          capability.id,
          capability.number,
          capability.title,
          capability.shortDescription,
          capability.detailedDescription,
          JSON.stringify(capability.keyHighlights),
          capability.image,
          capability.categoryTag,
          Number(data.number) || 1,
        ]
      );
    } catch (err) {
      console.warn("[DB] Supabase capability save failed:", (err as Error).message);
    }
  }

  const idx = localCaps.findIndex((c) => c.id === capability.id);
  if (idx !== -1) {
    localCaps[idx] = capability;
  } else {
    localCaps.push(capability);
  }
  writeJsonFile(CAPABILITIES_FILE, localCaps);
  return capability;
}

export async function deleteCapability(id: string): Promise<boolean> {
  const clientPool = getPool();
  let deletedFromDb = false;

  if (clientPool) {
    try {
      const res = await clientPool.query("DELETE FROM public.capabilities WHERE id = $1 RETURNING id;", [id]);
      deletedFromDb = (res.rowCount ?? 0) > 0;
    } catch (err) {
      console.warn("[DB] Supabase capability delete failed:", (err as Error).message);
    }
  }

  const localCaps = readJsonFile<FabricationCapability[]>(CAPABILITIES_FILE, FABRICATION_CAPABILITIES);
  const filtered = localCaps.filter((c) => c.id !== id);
  if (filtered.length !== localCaps.length || deletedFromDb) {
    writeJsonFile(CAPABILITIES_FILE, filtered);
    return true;
  }
  return false;
}

export async function saveFabricationStep(data: FabricationProcessStep): Promise<FabricationProcessStep> {
  const clientPool = getPool();

  if (clientPool) {
    try {
      await clientPool.query(
        `INSERT INTO public.fabrication_process (
          step, title, short_description, detailed_description, image, tag, updated_at
        ) VALUES ($1,$2,$3,$4,$5,$6,NOW())
        ON CONFLICT (step) DO UPDATE SET
          title = $2,
          short_description = $3,
          detailed_description = $4,
          image = $5,
          tag = $6,
          updated_at = NOW();`,
        [
          data.step,
          data.title,
          data.shortDescription,
          data.detailedDescription,
          data.image,
          data.tag,
        ]
      );
    } catch (err) {
      console.warn("[DB] Supabase step save failed:", (err as Error).message);
    }
  }

  const steps = readJsonFile<FabricationProcessStep[]>(PROCESS_FILE, FABRICATION_PROCESS);
  const idx = steps.findIndex((s) => s.step === data.step);
  if (idx !== -1) {
    steps[idx] = data;
  } else {
    steps.push(data);
  }
  writeJsonFile(PROCESS_FILE, steps);
  return data;
}
