import * as React from "react";
import { getAllGalleryItems } from "@/lib/db";
import { AdminTopbar } from "@/components/admin/admin-topbar";
import { GalleryManager } from "@/components/admin/gallery-manager";

export const dynamic = "force-dynamic";

export default function AdminGalleryPage() {
  const galleryItems = getAllGalleryItems();

  return (
    <div>
      <AdminTopbar
        title="Showroom Gallery & Media"
        subtitle="Manage workshop fabrication photographs, completed implements, and field testing showcases."
      />

      <div className="p-6 sm:p-8 max-w-7xl mx-auto">
        <GalleryManager initialItems={galleryItems} />
      </div>
    </div>
  );
}
