import * as React from "react";
import { getAllProducts, getAllInquiries, getAllGalleryItems, getSiteSettings } from "@/lib/db";
import { AdminDashboardView } from "@/components/admin/admin-dashboard-view";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [products, inquiries, galleryItems, settings] = await Promise.all([
    getAllProducts(),
    getAllInquiries(),
    getAllGalleryItems(),
    getSiteSettings(),
  ]);

  return (
    <AdminDashboardView
      products={products}
      inquiries={inquiries}
      galleryItems={galleryItems}
      settings={settings}
    />
  );
}
