import * as React from "react";
import { getAllProducts, getAllInquiries, getAllGalleryItems, getSiteSettings } from "@/lib/db";
import { AdminDashboardView } from "@/components/admin/admin-dashboard-view";

export const dynamic = "force-dynamic";

export default function AdminDashboardPage() {
  const products = getAllProducts();
  const inquiries = getAllInquiries();
  const galleryItems = getAllGalleryItems();
  const settings = getSiteSettings();

  return (
    <AdminDashboardView
      products={products}
      inquiries={inquiries}
      galleryItems={galleryItems}
      settings={settings}
    />
  );
}
