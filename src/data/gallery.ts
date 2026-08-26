import { type GalleryItem } from "@/types/gallery";

export const SAMPLE_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Precision Hydraulic Cylinder Assembly",
    category: "fabrication",
    categoryLabel: "Fabrication",
    image: "/images/workshop/steel-fabrication.svg",
    description: "Heavy-duty MIG welded hydraulic ram mounting for reversible plough frame.",
  },
  {
    id: "gal-2",
    title: "Heavy Tine Channel Framework Welding",
    category: "workshop",
    categoryLabel: "Workshop",
    image: "/images/products/cultivator/cultivator-main.svg",
    description: "High-tensile structural welding of cultivator frame.",
  },
  {
    id: "gal-3",
    title: "High-Performance Seed Drill Calibration",
    category: "products",
    categoryLabel: "Products",
    image: "/images/products/seed-drill/seed-drill-main.svg",
    description: "Tractor hitch alignment and metering mechanism test.",
  },
  {
    id: "gal-4",
    title: "Trailer Chassis Stress Testing & Finishing",
    category: "workshop",
    categoryLabel: "Workshop",
    image: "/images/products/farm-trailer/farm-trailer-main.svg",
    description: "Anti-corrosion primer application on ISMB structural steel channel.",
  },
];
