import * as React from "react";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/db";
import { ProductForm } from "@/components/admin/product-form";

export const dynamic = "force-dynamic";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="p-6 sm:p-8">
      <ProductForm initialData={product} isEditMode={true} />
    </div>
  );
}
