import * as React from "react";
import { getAllProducts } from "@/lib/db";
import { AdminTopbar } from "@/components/admin/admin-topbar";
import { ProductsManager } from "@/components/admin/products-manager";

export const dynamic = "force-dynamic";

export default function AdminProductsPage() {
  const products = getAllProducts();

  return (
    <div>
      <AdminTopbar
        title="Products & Machinery Catalogue"
        subtitle="Manage tractor-mounted implements, reversible ploughs, cultivators, and heavy metal attachments."
        action={{
          label: "Add New Product",
          href: "/admin/products/new",
        }}
      />

      <div className="p-6 sm:p-8 max-w-7xl mx-auto">
        <ProductsManager initialProducts={products} />
      </div>
    </div>
  );
}
