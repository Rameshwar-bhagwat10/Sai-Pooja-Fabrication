export type GalleryCategory =
  | "all"
  | "equipment"
  | "fabrication"
  | "workshop"
  | "field";

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  categoryLabel: string;
  image: string;
  thumbnail?: string;
  description: string;
  productSlug?: string;
  productName?: string;
  featured?: boolean;
  aspectRatio?: "16/9" | "4/3" | "1/1" | "3/2";
  order: number;
}
