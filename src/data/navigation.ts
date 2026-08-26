export interface CategoryFilterItem {
  id: string;
  label: string;
  count?: number;
}

export const CATEGORY_GROUPS: CategoryFilterItem[] = [
  { id: "all", label: "ALL EQUIPMENT" },
  { id: "tillage", label: "TILLAGE" },
  { id: "land-preparation", label: "LAND PREPARATION" },
  { id: "seeding", label: "SEEDING" },
  { id: "transport", label: "TRANSPORT" },
  { id: "custom", label: "CUSTOM" },
];

export const PRODUCT_CATEGORIES = [
  { slug: "plough", label: "Plough", group: "tillage" },
  { slug: "cultivator", label: "Cultivator", group: "tillage" },
  { slug: "rotavator", label: "Rotavator", group: "tillage" },
  { slug: "tiller", label: "Tiller", group: "tillage" },
  { slug: "disc-harrow", label: "Disc Harrow", group: "tillage" },
  { slug: "ridger", label: "Ridger", group: "land-preparation" },
  { slug: "land-leveler", label: "Land Leveler", group: "land-preparation" },
  { slug: "seed-drill", label: "Seed Drill", group: "seeding" },
  { slug: "farm-trailer", label: "Farm Trailer", group: "transport" },
  { slug: "custom-implements", label: "Custom Implements", group: "custom" },
];
