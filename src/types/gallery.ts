export type GalleryCategory =
  | "all"
  | "workshop"
  | "fabrication"
  | "products"
  | "field-trial"
  | "delivery";

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  categoryLabel: string;
  image: string;
  thumbnail?: string;
  description?: string;
  location?: string;
  date?: string;
}
