"use client";

import * as React from "react";
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Star,
  X,
} from "lucide-react";
import { type GalleryItem, type GalleryCategory } from "@/types/gallery";

interface GalleryManagerProps {
  initialItems: GalleryItem[];
}

export function GalleryManager({ initialItems }: GalleryManagerProps) {
  const [items, setItems] = React.useState<GalleryItem[]>(initialItems);
  const [categoryFilter, setCategoryFilter] = React.useState<string>("all");
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Form State
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState<GalleryCategory>("equipment");
  const [image, setImage] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [featured, setFeatured] = React.useState(false);
  const [aspectRatio, setAspectRatio] = React.useState<"16/9" | "4/3" | "1/1" | "3/2">("16/9");

  const [isSaving, setIsSaving] = React.useState(false);
  const [notification, setNotification] = React.useState<{ type: "success" | "error"; text: string } | null>(null);

  const showNotification = (type: "success" | "error", text: string) => {
    setNotification({ type, text });
    setTimeout(() => setNotification(null), 3500);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !image.trim()) {
      showNotification("error", "Title and Image URL are required.");
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          category,
          categoryLabel: category.toUpperCase(),
          image: image.trim(),
          description: description.trim(),
          featured,
          aspectRatio,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to add photo");
      }

      setItems([data.item, ...items]);
      setIsModalOpen(false);
      setTitle("");
      setImage("");
      setDescription("");
      setFeatured(false);
      showNotification("success", "Photograph added to showroom gallery.");
    } catch (err: any) {
      console.error("Gallery create error:", err);
      showNotification("error", err.message || "Failed to add photograph.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, itemTitle: string) => {
    if (!confirm(`Remove "${itemTitle}" from gallery?`)) return;

    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to delete");
      }

      setItems((prev) => prev.filter((i) => i.id !== id));
      showNotification("success", "Photograph removed.");
    } catch (err: any) {
      console.error("Gallery delete error:", err);
      showNotification("error", err.message || "Failed to delete item.");
    }
  };

  const filteredItems = items.filter(
    (item) => categoryFilter === "all" || item.category === categoryFilter
  );

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

      {/* Control Bar: Category Filter & Add Button */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {[
            { id: "all", label: "All Photos" },
            { id: "equipment", label: "Equipment" },
            { id: "fabrication", label: "Fabrication" },
            { id: "workshop", label: "Workshop" },
            { id: "field", label: "Field Tests" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all shrink-0 cursor-pointer ${
                categoryFilter === cat.id
                  ? "bg-amber-600 text-white font-bold shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm shadow-amber-600/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Photograph</span>
        </button>
      </div>

      {/* Grid of Photos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden group hover:border-amber-400 hover:shadow-sm transition-all flex flex-col"
          >
            {/* Image Preview Container */}
            <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden flex items-center justify-center">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/images/workshop/steel-fabrication.svg";
                }}
              />

              {item.featured && (
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-mono font-bold flex items-center gap-1 shadow-sm">
                  <Star className="w-3 h-3 fill-current" />
                  <span>Featured</span>
                </span>
              )}

              <button
                onClick={() => handleDelete(item.id, item.title)}
                title="Remove photo"
                className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-white/80 hover:bg-rose-600 hover:text-white text-slate-700 transition-colors shadow-xs cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200/80 font-bold">
                    {item.categoryLabel || item.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{item.aspectRatio}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm truncate">{item.title}</h3>
                {item.description && (
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1 font-sans">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload / Add Photograph Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-bold text-slate-900 font-mono uppercase">
                  Add Showroom Photograph
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-700 uppercase mb-1.5 font-bold">Photo Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Hydraulic Reversible Plough Turnover Assembly"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:bg-white focus:border-amber-600 focus:ring-2 focus:ring-amber-500/15"
                />
              </div>

              <div>
                <label className="block text-slate-700 uppercase mb-1.5 font-bold">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as GalleryCategory)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:bg-white focus:border-amber-600"
                >
                  <option value="equipment">Finished Agricultural Equipment</option>
                  <option value="fabrication">Steel Fabrication & Welding</option>
                  <option value="workshop">Workshop Infrastructure & Tooling</option>
                  <option value="field">Field Operations & Farmer Testing</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 uppercase mb-1.5 font-bold">Image Path or URL *</label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="e.g. /images/workshop/steel-fabrication.svg"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:bg-white focus:border-amber-600 focus:ring-2 focus:ring-amber-500/15"
                />
              </div>

              <div>
                <label className="block text-slate-700 uppercase mb-1.5 font-bold">Description (Optional)</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short note about the machinery, weld specs, or field test location..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:bg-white focus:border-amber-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-slate-700 uppercase mb-1.5 font-bold">Aspect Ratio</label>
                  <select
                    value={aspectRatio}
                    onChange={(e) => setAspectRatio(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:bg-white focus:border-amber-600"
                  >
                    <option value="16/9">16 : 9 (Widescreen)</option>
                    <option value="4/3">4 : 3 (Standard)</option>
                    <option value="1/1">1 : 1 (Square)</option>
                    <option value="3/2">3 : 2 (Photo)</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    id="featured-checkbox"
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                  />
                  <label htmlFor="featured-checkbox" className="text-slate-800 text-xs cursor-pointer font-bold">
                    Featured in Showroom
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs cursor-pointer font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider disabled:opacity-50 cursor-pointer shadow-xs"
                >
                  {isSaving ? "Saving..." : "Add Photograph"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
