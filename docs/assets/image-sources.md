# Asset Tracking & Image Sources Documentation

This document records the visual assets, usage status, licensing classification, and representative roles for **Sai Pooja Fabrication**.

---

## 1. Brand Identity Assets

| Asset | Path | Format | Role | Description |
|---|---|---|---|---|
| **Primary Logo** | `/brand/logo.svg` | Vector SVG | Client Identity | Universal brand lockup with geometric blade mark & wordmark |
| **Light Logo** | `/brand/logo-light.svg` | Vector SVG | Client Identity | High-contrast Warm White & Forge Amber mark for dark backgrounds |
| **Dark Logo** | `/brand/logo-dark.svg` | Vector SVG | Client Identity | Forest 900 mark for light surfaces |
| **Symbol Mark** | `/brand/logo-mark.svg` | Vector SVG | Client Identity | Standalone geometric brand mark |
| **App Favicon** | `/icon.svg`, `/favicon.svg` | Vector SVG | Client Identity | Browser tab icon derived from brand symbol |
| **Open Graph Card** | `/images/og/og-image.svg` | Vector SVG (1200×630) | Client Identity | Social preview card for WhatsApp, Twitter, LinkedIn |

---

## 2. Product Equipment Imagery

All product assets represent agricultural implement categories and are marked with `imageRole: "representative"` until physical workshop studio photography is supplied by the client.

| Product | Slug | Primary Asset | Role | Classification |
|---|---|---|---|---|
| **Hydraulic Reversible Plough** | `heavy-duty-hydraulic-reversible-plough` | `/images/products/plough/plough-main.svg` | Representative | Primary Tillage Implement |
| **Rigid Tine Cultivator** | `rigid-tine-cultivator` | `/images/products/cultivator/cultivator-main.svg` | Representative | Secondary Tillage Implement |
| **Heavy-Duty Rotavator** | `heavy-duty-rotavator` | `/images/products/rotavator/rotavator-main.svg` | Representative | Rotary Tillage Implement |
| **Automatic Tractor Tiller** | `automatic-tractor-tiller` | `/images/products/tiller/tiller-main.svg` | Representative | Heavy Tiller Implement |
| **Mounted Disc Harrow** | `heavy-duty-disc-harrow` | `/images/products/disc-harrow/disc-harrow-main.svg` | Representative | Secondary Tillage & Stubble |
| **3-Row Furrow Ridger** | `adjustable-three-row-ridger` | `/images/products/ridger/ridger-main.svg` | Representative | Land Preparation & Furrows |
| **Seed Cum Fertilizer Drill** | `seed-cum-fertilizer-drill` | `/images/products/seed-drill/seed-drill-main.svg` | Representative | Sowing & Metering |
| **Tipping Farm Trailer** | `hydraulic-tipping-farm-trailer` | `/images/products/farm-trailer/farm-trailer-main.svg` | Representative | Transport & Bulk Haulage |
| **Tractor Land Leveler** | `heavy-duty-tractor-land-leveler` | `/images/products/land-leveler/land-leveler-main.svg` | Representative | Land Grading & Tilth |
| **Custom Implements** | `custom-fabricated-agricultural-implements` | `/images/products/custom-implements/custom-implements-main.svg` | Representative | Custom Fabricated Toolbars |

---

## 3. Workshop & Field Operations Imagery

| Category | Path | Role | Description |
|---|---|---|---|
| **Hero Machinery** | `/images/hero/hero-machinery.jpg` | Client Provided / Representative | Heavy tractor pulling tillage implement in agricultural field at golden sunset |
| **Structural Steel Fabrication** | `/images/workshop/steel-fabrication.svg` | Representative | In-house multi-pass MIG welding & heavy channel assembly |
| **Field Inversion & Tilth** | `/images/workshop/field-operations.svg` | Representative | Active tractor fieldwork and soil tilth trial |

---

## 4. Client Photo Integration Guide

When the client supplies real workshop and implement photos:
1. Save high-resolution photos in `public/images/products/<product-slug>/hero.webp` and `thumbnail.webp`.
2. In `src/data/products.ts`, update `heroImage` and `thumbnail` paths and change `imageRole` from `"representative"` to `"client-owned"`.
3. Re-run `next build` to update all static pages.
