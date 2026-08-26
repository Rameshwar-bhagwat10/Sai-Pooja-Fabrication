export type ProductCategoryGroup =
  | "all"
  | "tillage"
  | "land-preparation"
  | "seeding"
  | "transport"
  | "custom";

export type ProductCategory =
  | "plough"
  | "cultivator"
  | "rotavator"
  | "tiller"
  | "disc-harrow"
  | "ridger"
  | "seed-drill"
  | "farm-trailer"
  | "land-leveler"
  | "custom-implements";

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface ProductFeature {
  number: string;
  title: string;
  description: string;
}

export interface ProductApplication {
  title: string;
  description: string;
  iconName?: string;
}

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  hindiName?: string;
  category: ProductCategory;
  categoryGroup: ProductCategoryGroup;
  categoryName: string;
  tagline: string;
  description: string;
  fullDescription: string;
  heroImage: string;
  thumbnail: string;
  galleryImages: string[];
  specifications: ProductSpecification[];
  features: ProductFeature[];
  applications: ProductApplication[];
  suitableForTractorHp?: string;
  relatedProductSlugs: string[];
  warranty?: string;
  isFeatured?: boolean;
  imageRole?: "client-owned" | "representative";
  order: number;
}
