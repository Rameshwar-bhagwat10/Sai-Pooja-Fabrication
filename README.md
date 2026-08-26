# Sai Pooja Fabrication

A modern, high-performance agricultural implements and heavy-duty fabrication web platform built with Next.js (App Router), TypeScript, and Tailwind CSS.

## 🚀 Features

- **Next.js 16 App Router** with modern nested layouts and route groups `(marketing)`
- **Interactive Product Catalog** featuring agricultural implements (Plough, Cultivator, Rotavator, Tiller, Disc Harrow, Seed Drill, Farm Trailers, etc.)
- **Fabrication & Workshop Showcase** detailing manufacturing capabilities, precision machinery, and quality engineering
- **Rich Gallery & Media Viewer** with interactive lightboxes and responsive grids
- **Customizable UI Component Architecture** following modern design system standards
- **SEO & Performance Optimized** with dynamic metadata and sitemap generator

## 📁 Project Structure

```
sai-pooja-fabrication/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── public/
│   ├── images/
│   │   ├── hero/
│   │   ├── products/
│   │   │   ├── plough/
│   │   │   ├── cultivator/
│   │   │   ├── rotavator/
│   │   │   ├── tiller/
│   │   │   ├── disc-harrow/
│   │   │   ├── ridger/
│   │   │   ├── seed-drill/
│   │   │   ├── farm-trailer/
│   │   │   ├── land-leveler/
│   │   │   └── custom-implements/
│   │   ├── gallery/
│   │   ├── workshop/
│   │   └── branding/
│   │
│   ├── videos/
│   │   ├── hero/
│   │   └── fabrication/
│   │
│   ├── icons/
│   └── fonts/
│
├── src/
│   │
│   ├── app/
│   │   ├── (marketing)/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── products/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── fabrication/
│   │   │   │   └── page.tsx
│   │   │   ├── gallery/
│   │   │   │   └── page.tsx
│   │   │   └── contact/
│   │   │       └── page.tsx
│   │   │
│   │   ├── not-found.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── sitemap.ts
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── hero/
│   │   ├── products/
│   │   ├── sections/
│   │   ├── gallery/
│   │   ├── fabrication/
│   │   └── animations/
│   │
│   ├── data/
│   ├── hooks/
│   ├── lib/
│   ├── config/
│   └── types/
```

## 🛠️ Getting Started

First, install dependencies:

```bash
npm install
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
