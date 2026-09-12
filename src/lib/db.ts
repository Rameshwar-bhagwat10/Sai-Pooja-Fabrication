import fs from "fs";
import path from "path";
import { type ProductItem } from "@/types/product";
import { type GalleryItem } from "@/types/gallery";
import { type InquiryFormData } from "@/types/contact";
import { ALL_PRODUCTS } from "@/data/products";
import { GALLERY_ITEMS } from "@/data/gallery";
import { COMPANY_INFO } from "@/data/company";
import { CONTACT_FAQS } from "@/data/contact";

// Data directory path
const DATA_DIR = path.join(process.cwd(), "data");

const PRODUCTS_FILE = path.join(DATA_DIR, "products.json");
const INQUIRIES_FILE = path.join(DATA_DIR, "inquiries.json");
const GALLERY_FILE = path.join(DATA_DIR, "gallery.json");
const SETTINGS_FILE = path.join(DATA_DIR, "settings.json");

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

// Ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Helper to safely read JSON with fallback
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

// Helper to safely write JSON atomically
function writeJsonFile<T>(filePath: string, data: T): void {
  try {
    ensureDataDir();
    const tempFile = `${filePath}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), "utf-8");
    fs.renameSync(tempFile, filePath);
  } catch (error) {
    console.error(`Error writing to ${filePath}:`, error);
    throw error;
  }
}

// ---------------- PRODUCTS ----------------

export function getAllProducts(): ProductItem[] {
  const products = readJsonFile<ProductItem[]>(PRODUCTS_FILE, ALL_PRODUCTS);
  return products.sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function getProductById(id: string): ProductItem | null {
  const products = getAllProducts();
  return products.find((p) => p.id === id) || null;
}

export function getProductBySlug(slug: string): ProductItem | null {
  const products = getAllProducts();
  return products.find((p) => p.slug === slug) || null;
}

export function saveProduct(productData: Partial<ProductItem> & { name: string }): ProductItem {
  const products = getAllProducts();
  
  if (productData.id) {
    // Update existing
    const index = products.findIndex((p) => p.id === productData.id);
    if (index !== -1) {
      const updated: ProductItem = {
        ...products[index],
        ...productData,
      } as ProductItem;
      products[index] = updated;
      writeJsonFile(PRODUCTS_FILE, products);
      return updated;
    }
  }

  // Create new
  const slug =
    productData.slug ||
    productData.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const newProduct: ProductItem = {
    id: productData.id || `prod-${Date.now()}`,
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
    order: productData.order ?? products.length + 1,
  };

  products.push(newProduct);
  writeJsonFile(PRODUCTS_FILE, products);
  return newProduct;
}

export function deleteProduct(id: string): boolean {
  const products = getAllProducts();
  const filtered = products.filter((p) => p.id !== id && p.slug !== id);
  if (filtered.length !== products.length) {
    writeJsonFile(PRODUCTS_FILE, filtered);
    return true;
  }
  return false;
}

// ---------------- INQUIRIES ----------------

export function getAllInquiries(): StoredInquiry[] {
  const inquiries = readJsonFile<StoredInquiry[]>(INQUIRIES_FILE, [
    {
      id: "inq-demo-1",
      inquiryType: "product",
      selectedProduct: "Hydraulic Reversible Plough",
      name: "Ramesh Patil",
      phone: "+91 98220 12345",
      email: "ramesh.patil@example.com",
      requirement: "Need 2-bottom reversible plough for 55 HP Mahindra tractor. Quote required for delivery to Nashik.",
      status: "new",
      notes: "Farmer contacted through website, prefers WhatsApp call.",
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    },
    {
      id: "inq-demo-2",
      inquiryType: "custom-fabrication",
      selectedProduct: "",
      name: "Vikram Deshmukh",
      phone: "+91 94231 67890",
      email: "deshmukh.farms@example.com",
      requirement: "Custom sugarcane furrower with adjustable 4-ft and 5-ft row spacing for 75 HP tractor.",
      status: "contacted",
      notes: "Discussed toolbar dimensions over call. Sending CAD sketch.",
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    },
    {
      id: "inq-demo-3",
      inquiryType: "product",
      selectedProduct: "Heavy Duty Rigid Cultivator",
      name: "Sunil Shinde",
      phone: "+91 99750 54321",
      email: "",
      requirement: "9-tine rigid cultivator with heavy spring frame. Looking to purchase within 2 weeks.",
      status: "quotation_sent",
      notes: "Sent factory ex-works price quote via WhatsApp.",
      createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    },
  ]);
  return inquiries.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function createInquiry(data: InquiryFormData): StoredInquiry {
  const inquiries = getAllInquiries();
  const newInquiry: StoredInquiry = {
    ...data,
    id: `inq-${Date.now()}`,
    status: "new",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  inquiries.unshift(newInquiry);
  writeJsonFile(INQUIRIES_FILE, inquiries);
  return newInquiry;
}

export function updateInquiry(
  id: string,
  updates: Partial<Pick<StoredInquiry, "status" | "notes">>
): StoredInquiry | null {
  const inquiries = getAllInquiries();
  const index = inquiries.findIndex((inq) => inq.id === id);
  if (index === -1) return null;

  inquiries[index] = {
    ...inquiries[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  writeJsonFile(INQUIRIES_FILE, inquiries);
  return inquiries[index];
}

export function deleteInquiry(id: string): boolean {
  const inquiries = getAllInquiries();
  const filtered = inquiries.filter((inq) => inq.id !== id);
  if (filtered.length !== inquiries.length) {
    writeJsonFile(INQUIRIES_FILE, filtered);
    return true;
  }
  return false;
}

// ---------------- GALLERY ----------------

export function getAllGalleryItems(): GalleryItem[] {
  const items = readJsonFile<GalleryItem[]>(GALLERY_FILE, GALLERY_ITEMS);
  return items.sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function saveGalleryItem(data: Partial<GalleryItem> & { title: string; image: string }): GalleryItem {
  const items = getAllGalleryItems();

  if (data.id) {
    const index = items.findIndex((i) => i.id === data.id);
    if (index !== -1) {
      items[index] = {
        ...items[index],
        ...data,
      } as GalleryItem;
      writeJsonFile(GALLERY_FILE, items);
      return items[index];
    }
  }

  const newItem: GalleryItem = {
    id: data.id || `gal-${Date.now()}`,
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
    order: data.order ?? items.length + 1,
  };

  items.push(newItem);
  writeJsonFile(GALLERY_FILE, items);
  return newItem;
}

export function deleteGalleryItem(id: string): boolean {
  const items = getAllGalleryItems();
  const filtered = items.filter((i) => i.id !== id);
  if (filtered.length !== items.length) {
    writeJsonFile(GALLERY_FILE, filtered);
    return true;
  }
  return false;
}

// ---------------- SETTINGS ----------------

export function getSiteSettings(): StoredSettings {
  return readJsonFile<StoredSettings>(SETTINGS_FILE, {
    company: COMPANY_INFO,
    faqs: CONTACT_FAQS,
    updatedAt: new Date().toISOString(),
  });
}

export function updateSiteSettings(updates: Partial<StoredSettings>): StoredSettings {
  const current = getSiteSettings();
  const updated: StoredSettings = {
    company: {
      ...current.company,
      ...(updates.company || {}),
    },
    faqs: updates.faqs || current.faqs,
    updatedAt: new Date().toISOString(),
  };

  writeJsonFile(SETTINGS_FILE, updated);
  return updated;
}
