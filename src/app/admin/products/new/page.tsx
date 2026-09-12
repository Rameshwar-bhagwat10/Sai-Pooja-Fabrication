import * as React from "react";
import { ProductForm } from "@/components/admin/product-form";

export const dynamic = "force-dynamic";

export default function NewProductPage() {
  return (
    <div className="p-6 sm:p-8">
      <ProductForm isEditMode={false} />
    </div>
  );
}
