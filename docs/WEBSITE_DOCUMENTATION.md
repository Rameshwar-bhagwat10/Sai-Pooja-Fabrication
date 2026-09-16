# Comprehensive Website Technical & System Documentation
## **Sai Pooja Fabrication — Industrial Agricultural Machinery & Fabrication Platform**

---

## 1. Executive Summary & Business Context

**Sai Pooja Fabrication** is a modern, high-performance web platform engineered for an agricultural machinery manufacturing and heavy steel fabrication enterprise.

### Core Objectives:
1. **Public Showcase & Digital Showroom**: Educate farmers, tractor owners, and agricultural dealers on high-tensile tractor implements (Ploughs, Cultivators, Rotavators, Tillers, Disc Harrows, Seed Drills, Trailers, Land Levelers, Custom Implements).
2. **Lead Generation & Direct Handoff Engine**: Capture high-intent buyer inquiries via query-aware interactive forms with single-click handoff to WhatsApp, Email, and Phone.
3. **Administrative Management Portal (`/admin`)**: A password-protected dashboard allowing the business owner to manage incoming customer inquiries, update product specifications, add workshop gallery assets, and modify global business information.

---

## 2. Complete Technology Stack & Architecture

| Layer | Technology | Version / Specifics | Description & Purpose |
|---|---|---|---|
| **Framework** | **Next.js (App Router & Turbopack)** | `16.3.3` | Modern React framework with hybrid SSG, SSR, and dynamic API Route Handlers. |
| **Language** | **TypeScript** | `^5.0.0` (Strict Mode) | Full type safety across UI props, database models, API payloads, and metadata. |
| **Frontend Library** | **React** | `19.2.8` | Latest React engine with Server Components, Client boundaries, and Suspense. |
| **Styling & Tokens** | **Tailwind CSS + PostCSS** | `v4` | Bespoke industrial color palette (Forest Green `#10271D`, Forge Amber `#C8913D`, Warm White `#F4F1E8`). |
| **Component Primitives** | **shadcn/ui + CVA** | `class-variance-authority` | Composable, accessible UI components with custom variants and states. |
| **Animation Engine** | **Framer Motion** | `^13.1.1` | Hardware-accelerated scroll transforms, stagger reveals, and accessible reduced-motion support. |
| **Iconography** | **Lucide React** | `^1.34.0` | High-efficiency SVG icons for agricultural machinery, technical specs, and UI navigation. |
| **Typography** | **next/font/google** | `Space Grotesk` & `Inter` | Zero-layout-shift font optimization. Display headers in *Space Grotesk*, body text in *Inter*. |
| **Database & ORM** | **Supabase & PostgreSQL** | `@supabase/supabase-js`, `pg` | Relational PostgreSQL database with connection pooling and Supabase client SDK. |
| **Authentication** | **HTTP-Only Cookie Session** | Custom `src/lib/auth.ts` | Secure administrative authentication via encrypted session tokens. |
| **Image Optimization** | **Next.js Image** | `next/image` | Automatic AVIF/WebP conversion, responsive `sizes`, blur placeholders, and LCP priority loading. |

---

## 3. System Architecture & 3-Tier Hybrid Data Layer

The platform uses a resilient **3-Tier Hybrid Data Architecture** that guarantees zero downtime, instant build speeds, and optional database synchronization:

```mermaid
graph TD
    Client[Web Browser / Mobile Visitor] -->|HTTP / React 19| AppRouter[Next.js App Router]
    
    subgraph Frontend [Public & Admin Interface]
        AppRouter --> PublicPages[Public Marketing Pages - SSG/SSR]
        AppRouter --> AdminPages[Admin Dashboard - Protected SSR]
        AppRouter --> ApiRoutes[Next.js API Route Handlers]
    end
    
    subgraph DataTier [3-Tier Hybrid Persistence Layer]
        ApiRoutes --> Tier1[Tier 1: Supabase / PostgreSQL Database]
        ApiRoutes --> Tier2[Tier 2: Local JSON Filesystem Storage]
        ApiRoutes --> Tier3[Tier 3: In-Memory Static TypeScript Data]
    end
    
    subgraph Conversion [Lead Transmission Channels]
        Client -->|Instant Handoff| WhatsApp[WhatsApp Business API]
        Client -->|Direct Email| Mailto[Encrypted Mailto Protocol]
        Client -->|Instant Dial| Tel[Direct Telecom Protocol]
        ApiRoutes -->|Lead Persistence| LeadCRM[Admin Inquiries CRM Table]
    end
```

### The 3 Data Tiers:
1. **Tier 1 — Supabase / PostgreSQL (Production Primary)**:
   - When `DATABASE_URL` or `NEXT_PUBLIC_SUPABASE_URL` is configured, all dynamic operations (lead creation, product edits, gallery uploads, settings changes) execute directly against PostgreSQL tables.
2. **Tier 2 — Local JSON Filesystem (Self-Healing Fallback)**:
   - If database environment variables are omitted or in offline/local development, the system seamlessly reads and writes to `data/*.json` (`products.json`, `inquiries.json`, `gallery.json`, `settings.json`), ensuring 100% functionality without any setup.
3. **Tier 3 — Static TypeScript Datasets (Build Baseline)**:
   - Pre-compiled datasets in `src/data/*.ts` guarantee that build-time Static Site Generation (SSG) compiles in seconds with zero network latency.

---

## 4. Frontend Working & Page-by-Page Functionalities

### 1. Cinematic Homepage (`/`)
* **Dynamic Hero Section**: Full-bleed background photograph of a heavy-duty tractor and cultivator at golden sunset, responsive mobile positioning (`object-[90%_center]`), split text reveal (`ENGINEERED FOR THE FIELD`), technical badges, and dual conversion CTAs.
* **Company Intro**: Brand heritage, raw steel channel standards (ISMB channels, high-carbon Boron steel), and workshop credentials.
* **Featured Equipment Matrix**: Interactive grid highlighting primary tillage implements with HP requirements and direct links.
* **Featured Product Spotlight**: Deep dive into the Hydraulic Reversible Plough with breakdown of the 180° dual-acting cylinder.
* **Why Choose Us**: 4 industrial pillars (Structural Strength, Field Tested, Precision Geometry, Lifetime Support).
* **Fabrication Capabilities Preview**: Workshop highlights (CNC profile cutting, multi-pass MIG welding).
* **Field Visual Showcase**: High-impact agricultural landscape imagery with parallax scroll effects.
* **Visual Gallery Strip**: Curated editorial preview of workshop fabrication and field operations.
* **Conversion CTA Banner**: Direct inquiry trigger linking to `/contact`.

### 2. Products Catalogue (`/products`)
* **Category Filter Bar**: Dynamic filtering across 5 core implement families:
  * `All Implements`
  * `Tillage Equipment` (Plough, Cultivator, Rotavator, Tiller, Disc Harrow)
  * `Land Preparation` (Ridger, Land Leveler)
  * `Sowing Machinery` (Seed Cum Fertilizer Drill)
  * `Farm Transport` (Hydraulic Tipping Trailer)
  * `Custom Fabrication` (Heavy Toolbars, Custom Rippers)
* **Product Card System**: High-resolution photography, Hindi name transliteration, power compatibility tag (e.g. `45-75 HP`), tagline, key specification summary, and `EXPLORE IMPLEMENT →` link.

### 3. Product Detail Ecosystem (`/products/[slug]`)
* Pre-rendered statically at build time using `generateStaticParams` for all 10 products:
  1. `heavy-duty-hydraulic-reversible-plough`
  2. `rigid-tine-cultivator`
  3. `heavy-duty-rotavator`
  4. `automatic-tractor-tiller`
  5. `heavy-duty-disc-harrow`
  6. `adjustable-three-row-ridger`
  7. `seed-cum-fertilizer-drill`
  8. `hydraulic-tipping-farm-trailer`
  9. `heavy-duty-tractor-land-leveler`
  10. `custom-fabricated-agricultural-implements`
* **Features Included**:
  * Engineering overview & soil dynamics explanation
  * 4 core structural feature cards with numbered badges
  * Practical field application breakdown
  * Industrial specification matrix table (Box sections, pin diameters, clearances)
  * Interactive image gallery with full-screen Lightbox
  * Related equipment carousel
  * Previous / Next implement navigation
  * Pre-populated inquiry CTA (`/contact?product=[slug]`)

### 4. Company Story & Heritage (`/about`)
* 9 modular sections detailing the origin story, fabrication heritage, engineering approach, material selection, and quality control standards.

### 5. Fabrication Capabilities & Plant Tooling (`/fabrication`)
* **Capability Index**: Interactive tabbed view showcasing CNC profiling, MIG welding, hydraulic testing, and surface coating.
* **5-Stage Process Timeline**:
  1. *Material Ingestion & Channel Inspection*
  2. *CNC Profile Cutting & Chamfering*
  3. *Precision Fixture Clamping & Multi-Pass MIG Welding*
  4. *Hydraulic Pressure Testing & Alignment Check*
  5. *Epoxy Primer & High-Gloss Enamel Finish*
* **Custom Fabrication Portal**: Form trigger for non-standard equipment, unique tractor HP ratings, or specialized row spacing.

### 6. Visual Proof Gallery (`/gallery`)
* Dynamic category filtering (`All`, `Equipment`, `Fabrication`, `Workshop`, `Field Trials`).
* Asymmetric 3-column masonry grid.
* Full-screen modal Lightbox supporting keyboard navigation (`Esc` to close, `ArrowLeft`/`ArrowRight` for navigation, focus trapping).

### 7. Interactive Contact & Lead Conversion (`/contact`)
* **Multi-Channel Contact Bar**: Direct access to Phone, WhatsApp, Email, and Factory Location.
* **Query-Aware Inquiry System**: Automatically extracts `?product=...` or `?type=...` from the URL and pre-fills the form.
* **Client-Side Form Validation**: Real-time validation for Name, Phone (at least 8 digits), Email, Product Selection, and Requirement description.
* **Simulated Loading State**: Button transitions from `PREPARE ENQUIRY` $\rightarrow$ `PREPARING...` $\rightarrow$ `ENQUIRY READY`.
* **Instant Multi-Channel Transmission**: Presents the user with direct single-click actions to transmit their structured inquiry via **WhatsApp**, **Email Client**, or **Direct Call**.
* **Interactive FAQ Accordion**: Common questions on pricing, delivery, custom fabrication, and warranty with accessible ARIA tags.

---

## 5. End-to-End User Journey & Order / Lead Flow

```mermaid
sequenceDiagram
    autonumber
    actor Farmer as Farmer / Buyer
    participant Web as Next.js Website
    participant API as /api/inquiries
    participant DB as Supabase / Postgres / JSON
    actor Owner as Business Owner (WhatsApp / Admin)

    Farmer->>Web: Browses /products or /products/[slug]
    Farmer->>Web: Clicks "REQUEST FACTORY QUOTE"
    Web->>Web: Navigates to /contact?product=hydraulic-reversible-plough
    Web->>Farmer: Pre-populates Product Name & Category
    Farmer->>Web: Enters Name, Phone, Tractor HP, and Requirement
    Farmer->>Web: Clicks "PREPARE ENQUIRY"
    
    par Async Lead Storage
        Web->>API: POST /api/inquiries (JSON Payload)
        API->>DB: Stores inquiry with status: "new"
        API-->>Web: Returns { success: true, inquiryId: "inq_..." }
    and Direct User Handoff
        Web->>Farmer: Displays formatted WhatsApp / Email options
        Farmer->>Owner: Clicks "SEND VIA WHATSAPP" (opens WhatsApp with pre-filled message)
    end
    
    Owner->>Owner: Receives formatted WhatsApp message on phone
    Owner->>Web: Logs in to /admin/login
    Owner->>DB: Updates status to "quotation_sent" or "converted"
```

### Formatted Lead Payload Generated:
```text
*NEW EQUIPMENT INQUIRY — SAI POOJA FABRICATION*
----------------------------------------
*Inquiry Type:* Product Enquiry
*Equipment:* Hydraulic Reversible Plough
*Name:* Ramesh Patil
*Phone:* +91 98765 43210
*Email:* ramesh@example.com
*Requirement:* Need 2-bottom reversible plough for 55 HP John Deere tractor in black cotton soil.
----------------------------------------
Sent via Sai Pooja Fabrication Official Website
```

---

## 6. Admin Dashboard & Owner Workflow (`/admin`)

### 1. Authentication & Security (`/admin/login`)
* Protected by HTTP-Only session cookies (`spf_admin_session`).
* Password verified against the `ADMIN_PASSWORD` environment variable.

### 2. Management Modules
* **Dashboard Overview (`/admin`)**: Metric cards for Total Products, Active Inquiries, Gallery Assets, and System Connection Status.
* **Lead CRM (`/admin/inquiries`)**:
  * View all customer submissions.
  * Filter by status (`new`, `contacted`, `quotation_sent`, `converted`, `closed`).
  * Attach internal notes to inquiries.
  * Direct action links to call or WhatsApp the lead.
* **Product Catalog Manager (`/admin/products`)**:
  * Add new implements (`/admin/products/new`).
  * Edit specifications, tractor HP ratings, features, and images (`/admin/products/[id]/edit`).
  * Reorder or delete products.
* **Gallery Asset Manager (`/admin/gallery`)**:
  * Add new workshop photos, tag by category (`Workshop`, `Field`, `Fabrication`, `Equipment`), and link to specific product slugs.
* **Global Settings Editor (`/admin/settings`)**:
  * Update phone numbers, WhatsApp lines, factory location, operating hours, and FAQ accordions.

---

## 7. Backend Working & API Route Reference

The backend operates entirely on **Next.js Route Handlers** (`src/app/api/`):

| Endpoint | Methods | Description | Protection |
|---|---|---|---|
| `/api/auth/login` | `POST` | Authenticates admin password & sets session cookie. | Public |
| `/api/auth/logout` | `POST` | Clears administrative session cookie. | Public |
| `/api/auth/me` | `GET` | Checks if current session is authenticated. | Public |
| `/api/products` | `GET`, `POST` | Returns product catalog; creates a new product. | POST requires Admin |
| `/api/products/[id]` | `GET`, `PUT`, `DELETE` | Retrieves, updates, or deletes a specific implement. | PUT/DELETE require Admin |
| `/api/inquiries` | `GET`, `POST` | Submits a public lead; lists all leads for admin. | GET requires Admin |
| `/api/inquiries/[id]` | `GET`, `PUT`, `DELETE` | Updates lead status (`new` $\rightarrow$ `converted`) and notes. | Requires Admin |
| `/api/gallery` | `GET`, `POST` | Lists gallery items; adds new workshop photo. | POST requires Admin |
| `/api/gallery/[id]` | `DELETE` | Removes a gallery photo. | Requires Admin |
| `/api/capabilities` | `GET`, `POST` | Manages fabrication capabilities data. | POST requires Admin |
| `/api/capabilities/[id]` | `PUT`, `DELETE` | Updates or deletes fabrication capabilities. | Requires Admin |
| `/api/settings` | `GET`, `PUT` | Reads or updates global business info and FAQs. | PUT requires Admin |

---

## 8. Database Architecture & Schema (Supabase / Postgres)

```sql
-- 1. Products Table
CREATE TABLE IF NOT EXISTS products (
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
    gallery_images JSONB DEFAULT '[]',
    specifications JSONB DEFAULT '[]',
    features JSONB DEFAULT '[]',
    applications JSONB DEFAULT '[]',
    suitable_for_tractor_hp TEXT,
    related_product_slugs JSONB DEFAULT '[]',
    warranty TEXT,
    image_role TEXT DEFAULT 'representative',
    is_featured BOOLEAN DEFAULT false,
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Inquiries Table (Lead CRM)
CREATE TABLE IF NOT EXISTS inquiries (
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
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Gallery Table
CREATE TABLE IF NOT EXISTS gallery (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT NOT NULL,
    description TEXT,
    product_slug TEXT,
    is_featured BOOLEAN DEFAULT false,
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Settings Table
CREATE TABLE IF NOT EXISTS settings (
    id TEXT PRIMARY KEY DEFAULT 'global',
    company JSONB NOT NULL,
    faqs JSONB DEFAULT '[]',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 9. Comprehensive File & Folder Directory Map

```
d:/projects/sai-pooja-fabrication/
├── docs/
│   ├── assets/
│   │   └── image-sources.md          # Asset licensing, sourcing & role documentation
│   └── WEBSITE_DOCUMENTATION.md      # This comprehensive system documentation
├── public/
│   ├── brand/
│   │   ├── logo.svg                  # Primary universal vector logo
│   │   ├── logo-dark.svg             # Dark logo for light surfaces
│   │   ├── logo-light.svg            # Light logo for dark Forest backgrounds
│   │   ├── logo-mark.svg             # Standalone geometric blade & furrow symbol
│   │   ├── logo-mark-light.svg       # Standalone light symbol
│   │   └── favicon.svg               # Browser favicon
│   └── images/
│       ├── hero/
│       │   └── hero-machinery.jpg    # High-resolution sunset tractor hero photo
│       ├── og/
│       │   └── og-image.svg          # 1200x630 Open Graph card for social sharing
│       ├── products/                 # Product category photo folders
│       └── workshop/                 # Fabrication & welding photos
├── src/
│   ├── app/
│   │   ├── (marketing)/              # Public route group with shared shell
│   │   │   ├── layout.tsx            # Navbar + Footer layout wrapper
│   │   │   ├── page.tsx              # Homepage
│   │   │   ├── about/page.tsx        # Company Heritage & Story
│   │   │   ├── products/page.tsx     # Products Catalogue
│   │   │   ├── products/[slug]/      # Dynamic SSG Product Detail pages
│   │   │   ├── fabrication/page.tsx  # Fabrication Capabilities
│   │   │   ├── gallery/page.tsx      # Visual Proof Gallery
│   │   │   └── contact/page.tsx      # Lead Inquiry & Contact
│   │   ├── admin/                    # Protected Admin Portal
│   │   │   ├── login/page.tsx        # Administrative Login
│   │   │   ├── page.tsx              # Admin Dashboard Overview
│   │   │   ├── products/             # Product Management Pages
│   │   │   ├── inquiries/page.tsx    # Lead CRM & Status Manager
│   │   │   ├── gallery/page.tsx      # Gallery Manager
│   │   │   └── settings/page.tsx     # Global Settings Editor
│   │   ├── api/                      # Next.js Route Handlers (Backend APIs)
│   │   │   ├── auth/                 # Login / Logout / Session check
│   │   │   ├── products/             # Product CRUD endpoints
│   │   │   ├── inquiries/            # Lead submission & status endpoints
│   │   │   ├── gallery/              # Gallery CRUD endpoints
│   │   │   ├── capabilities/         # Capability CRUD endpoints
│   │   │   └── settings/             # Business settings endpoints
│   │   ├── error.tsx                 # Global Client Error Boundary
│   │   ├── loading.tsx               # Global Branded Skeleton Loader
│   │   ├── not-found.tsx             # Custom Branded 404 Page
│   │   ├── icon.svg                  # Next.js App Router Root Favicon
│   │   ├── manifest.ts               # Web App Manifest generator
│   │   ├── robots.ts                 # Dynamic robots.txt generator
│   │   ├── sitemap.ts                # Dynamic sitemap.xml generator (24 routes)
│   │   └── layout.tsx                # Root HTML layout with Google Fonts
│   ├── components/
│   │   ├── brand/                    # Brand Logo components
│   │   ├── layout/                   # Navbar, Footer, MobileMenu
│   │   ├── hero/                     # Hero section with parallax & responsive framing
│   │   ├── products/                 # Catalogue grid, filter bar, spec tables
│   │   ├── fabrication/              # Capability index, 5-stage timeline
│   │   ├── gallery/                  # Filterable grid, modal lightbox
│   │   ├── contact/                  # Inquiry selector, form, success feedback, FAQs
│   │   ├── seo/                      # JSON-LD Structured Data components
│   │   └── ui/                       # shadcn/ui primitives (Button, Badge, Container, Section)
│   ├── config/
│   │   └── seo.ts                    # Centralized SEO metadata, keywords & search intents
│   ├── data/
│   │   ├── products.ts               # Complete specifications for 10 implements
│   │   ├── company.ts                # Company profile & 4 pillars
│   │   ├── capabilities.ts           # 4 core fabrication capabilities
│   │   ├── fabrication-process.ts    # 5-stage fabrication process
│   │   ├── gallery.ts                # 12 verified gallery items
│   │   └── contact.ts                # Inquiry types & FAQ data
│   ├── lib/
│   │   ├── auth.ts                   # Cookie session authentication helpers
│   │   ├── db.ts                     # 3-tier database abstraction (Postgres / Supabase / JSON)
│   │   ├── metadata.ts               # Next.js Metadata construction helper
│   │   ├── supabase.ts               # Supabase Client & Admin initialization
│   │   └── utils.ts                  # Tailwind clsx/twMerge helper
│   └── types/                        # TypeScript interface definitions
├── package.json                      # Project dependencies & scripts
├── tailwind.config.ts                # Tailwind CSS v4 design token configuration
└── tsconfig.json                     # Strict TypeScript compiler options
```

---

## 10. SEO, Performance & Security Implementation

### 1. Search Engine Optimization (SEO)
* **Schema.org JSON-LD Structured Data**:
  * `Organization` & `LocalBusiness` on the Homepage.
  * `Product` schema with physical engineering attributes on all 10 product pages.
  * `BreadcrumbList` schema on all deep routes.
  * `CollectionPage` schema on the products catalogue.
* **Canonical URL Directives**: Every page specifies its exact canonical URL to eliminate duplicate content indexing (e.g. `/contact?product=rotavator` canonicalizes to `/contact`).
* **Dynamic Sitemap & Robots**: Fully crawled via `/sitemap.xml` and governed by `/robots.txt`.

### 2. Core Web Vitals & Performance
* **Largest Contentful Paint (LCP)**: Hero image loads with `priority` and preloading.
* **Cumulative Layout Shift (CLS)**: Every image container specifies fixed aspect ratios (`aspect-[4/3]`, `aspect-[16/9]`, or `fill`).
* **Client Component Minimization**: Pages remain pure React Server Components by default; `"use client"` is isolated strictly to interactive leaves (mobile drawer, filter bars, inquiry form, modal lightbox).

### 3. Security
* **Zero Secret Leakage**: API keys and database connection strings exist only on the server.
* **Protected Administrative Endpoints**: All write operations (`POST`, `PUT`, `DELETE`) on `/api/*` verify session tokens before executing.
* **Sanitized Query Handling**: Safe evaluation of query parameters to prevent injection or invalid state rendering.

---

## 11. Environment Variables Configuration Guide (`.env.local`)

```env
# 1. Base URL for Canonical SEO & Open Graph
NEXT_PUBLIC_SITE_URL=https://saipoojafabrication.com

# 2. Administrative Dashboard Password
ADMIN_PASSWORD=your_secure_password_here

# 3. Supabase / PostgreSQL Configuration (Optional - falls back to local JSON if omitted)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
DATABASE_URL=postgresql://postgres:password@db.your-project.supabase.co:5432/postgres
```
