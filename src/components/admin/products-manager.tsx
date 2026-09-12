"use client";

import * as React from "react";
import Link from "next/link";
import {
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  Star,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { type ProductItem } from "@/types/product";

interface ProductsManagerProps {
  initialProducts: ProductItem[];
}

export function ProductsManager({ initialProducts }: ProductsManagerProps) {
  const [products, setProducts] = React.useState<ProductItem[]>(initialProducts);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [deletingId, setDeletingId] = React.useState<string | null>(null);
  const [notification, setNotification] = React.useState<{ type: "success" | "error"; text: string } | null>(null);

  const showNotification = (type: "success" | "error", text: string) => {
    setNotification({ type, text });
    setTimeout(() => setNotification(null), 3500);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"? This will remove it from the live catalogue.`)) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to delete");
      }

      setProducts((prev) => prev.filter((p) => p.id !== id));
      showNotification("success", `Product "${name}" deleted successfully.`);
    } catch (err: any) {
      console.error("Delete failed:", err);
      showNotification("error", err.message || "Failed to delete product.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleFeatured = async (id: string, current: boolean) => {
    const nextVal = !current;
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured: nextVal }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update featured status");
      }

      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, isFeatured: nextVal } : p))
      );
      showNotification(
        "success",
        nextVal ? "Product marked as Featured." : "Product removed from Featured."
      );
    } catch (err: any) {
      console.error("Featured toggle failed:", err);
      showNotification("error", err.message || "Failed to update featured status.");
    }
  };

  // Filter products based on search and category
  const filteredProducts = products.filter((prod) => {
    const matchesSearch =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (prod.hindiName && prod.hindiName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (prod.suitableForTractorHp && prod.suitableForTractorHp.toLowerCase().includes(searchQuery.toLowerCase())) ||
      prod.categoryName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || prod.categoryGroup === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`p-4 rounded-xl border flex items-center gap-3 text-sm font-mono transition-all ${
            notification.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-rose-50 border-rose-200 text-rose-800"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle className="w-5 h-5 shrink-0 text-emerald-600" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
          )}
          <span>{notification.text}</span>
        </div>
      )}

      {/* Control Bar: Search & Category Filter */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search implements by name, Hindi, HP..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-amber-600 focus:ring-2 focus:ring-amber-500/15 font-mono"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {[
            { id: "all", label: "All" },
            { id: "tillage", label: "Tillage" },
            { id: "land-preparation", label: "Land Prep" },
            { id: "seeding", label: "Seeding" },
            { id: "transport", label: "Transport" },
            { id: "custom", label: "Custom" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-amber-600 text-white font-bold shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-slate-400 font-mono text-sm">No agricultural implements matched your search.</div>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-3 text-xs text-amber-700 hover:underline font-mono font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-mono uppercase text-slate-500 tracking-wider font-semibold">
                  <th className="py-4 px-5">Implement</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4">Tractor HP</th>
                  <th className="py-4 px-4">Specifications</th>
                  <th className="py-4 px-4">Featured</th>
                  <th className="py-4 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((product) => {
                  const isDeleting = deletingId === product.id;

                  return (
                    <tr
                      key={product.id}
                      className="hover:bg-slate-50/70 transition-colors group"
                    >
                      {/* Product Name & Visual */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3.5">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden relative shrink-0 flex items-center justify-center">
                            {product.heroImage ? (
                              <img
                                src={product.heroImage}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-xs text-slate-400 font-mono">IMG</span>
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-slate-900 group-hover:text-amber-700 transition-colors truncate max-w-xs">
                              {product.name}
                            </div>
                            {product.hindiName && (
                              <div className="text-xs text-slate-500 truncate">
                                {product.hindiName}
                              </div>
                            )}
                            <div className="text-[11px] font-mono text-slate-400 truncate">
                              /{product.slug}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-4">
                        <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700 font-mono text-xs font-medium">
                          {product.categoryName || product.category}
                        </span>
                      </td>

                      {/* Tractor HP */}
                      <td className="py-4 px-4 font-mono text-xs text-amber-700 font-bold">
                        {product.suitableForTractorHp || "Standard"}
                      </td>

                      {/* Specs Count */}
                      <td className="py-4 px-4 font-mono text-xs text-slate-500">
                        {product.specifications?.length || 0} specs • {product.features?.length || 0} features
                      </td>

                      {/* Featured */}
                      <td className="py-4 px-4">
                        <button
                          type="button"
                          onClick={() => handleToggleFeatured(product.id, Boolean(product.isFeatured))}
                          title={product.isFeatured ? "Click to remove from featured" : "Click to feature this implement"}
                          className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-lg border transition-all cursor-pointer hover:scale-105"
                        >
                          {product.isFeatured ? (
                            <span className="inline-flex items-center gap-1 text-amber-800 bg-amber-50 font-bold">
                              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                              <span>Featured</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-600">
                              <Star className="w-3.5 h-3.5" />
                              <span>Make Featured</span>
                            </span>
                          )}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-5 text-right">
                        <div className="inline-flex items-center gap-2">
                          <Link
                            href={`/products/${product.slug}`}
                            target="_blank"
                            title="View on live website"
                            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>

                          <Link
                            href={`/admin/products/${product.id}/edit`}
                            title="Edit implement details"
                            className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 font-mono text-xs font-bold flex items-center gap-1.5 transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </Link>

                          <button
                            onClick={() => handleDelete(product.id, product.name)}
                            disabled={isDeleting}
                            title="Delete implement"
                            className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 hover:text-rose-700 transition-colors disabled:opacity-50 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
