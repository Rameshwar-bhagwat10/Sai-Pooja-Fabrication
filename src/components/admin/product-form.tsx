"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Save,
  ArrowLeft,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Image as ImageIcon,
} from "lucide-react";
import {
  type ProductItem,
  type ProductCategory,
  type ProductCategoryGroup,
  type ProductSpecification,
  type ProductFeature,
  type ProductApplication,
} from "@/types/product";

interface ProductFormProps {
  initialData?: ProductItem;
  isEditMode?: boolean;
}

const CATEGORY_OPTIONS: { value: ProductCategory; label: string; group: ProductCategoryGroup }[] = [
  { value: "plough", label: "Hydraulic Reversible Plough", group: "tillage" },
  { value: "cultivator", label: "Rigid / Spring Cultivator", group: "tillage" },
  { value: "rotavator", label: "Rotary Tiller / Rotavator", group: "tillage" },
  { value: "tiller", label: "Power Tiller / Weeder", group: "tillage" },
  { value: "disc-harrow", label: "Heavy Disc Harrow", group: "land-preparation" },
  { value: "ridger", label: "Furrow Ridger / Bed Shaper", group: "land-preparation" },
  { value: "land-leveler", label: "Laser / Tractor Land Leveler", group: "land-preparation" },
  { value: "seed-drill", label: "Seed Cum Fertilizer Drill", group: "seeding" },
  { value: "farm-trailer", label: "Hydraulic Tipping Trailer", group: "transport" },
  { value: "custom-implements", label: "Custom Agricultural Implements", group: "custom" },
];

export function ProductForm({ initialData, isEditMode = false }: ProductFormProps) {
  const router = useRouter();

  const [name, setName] = React.useState(initialData?.name || "");
  const [hindiName, setHindiName] = React.useState(initialData?.hindiName || "");
  const [slug, setSlug] = React.useState(initialData?.slug || "");
  const [category, setCategory] = React.useState<ProductCategory>(
    initialData?.category || "plough"
  );
  const [categoryGroup, setCategoryGroup] = React.useState<ProductCategoryGroup>(
    initialData?.categoryGroup || "tillage"
  );
  const [tagline, setTagline] = React.useState(initialData?.tagline || "");
  const [description, setDescription] = React.useState(initialData?.description || "");
  const [fullDescription, setFullDescription] = React.useState(
    initialData?.fullDescription || ""
  );
  const [suitableForTractorHp, setSuitableForTractorHp] = React.useState(
    initialData?.suitableForTractorHp || "45-75 HP"
  );
  const [warranty, setWarranty] = React.useState(
    initialData?.warranty || "1 Year Structural Warranty"
  );
  const [heroImage, setHeroImage] = React.useState(
    initialData?.heroImage || "/images/products/custom-implements/custom-implements-main.svg"
  );
  const [isFeatured, setIsFeatured] = React.useState(Boolean(initialData?.isFeatured));
  const [order, setOrder] = React.useState(initialData?.order || 1);

  // Dynamic lists
  const [specifications, setSpecifications] = React.useState<ProductSpecification[]>(
    initialData?.specifications || [
      { label: "Main Frame", value: "Heavy Seamless Box Section (100x100x8 mm)" },
      { label: "Linkage Standard", value: "CAT-II Three-Point Linkage" },
    ]
  );

  const [features, setFeatures] = React.useState<ProductFeature[]>(
    initialData?.features || [
      {
        number: "01",
        title: "HIGH-TENSILE BORON STEEL POINTS",
        description: "Hardened wear points with abrasion resistance for extended service life.",
      },
    ]
  );

  const [applications, setApplications] = React.useState<ProductApplication[]>(
    initialData?.applications || [
      {
        title: "Primary Deep Tillage",
        description: "Breaking up hardpan layers and virgin soil to maximize root aeration.",
      },
    ]
  );

  const [isSaving, setIsSaving] = React.useState(false);
  const [error, setError] = React.useState("");

  // Update category group when category changes
  const handleCategoryChange = (catVal: ProductCategory) => {
    setCategory(catVal);
    const found = CATEGORY_OPTIONS.find((c) => c.value === catVal);
    if (found) {
      setCategoryGroup(found.group);
    }
  };

  // Auto-fill slug from name if empty
  const handleNameBlur = () => {
    if (!slug && name) {
      const generated = name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setSlug(generated);
    }
  };

  // Specification helpers
  const addSpecification = () => {
    setSpecifications([...specifications, { label: "", value: "" }]);
  };
  const updateSpecification = (index: number, field: "label" | "value", val: string) => {
    const updated = [...specifications];
    updated[index][field] = val;
    setSpecifications(updated);
  };
  const removeSpecification = (index: number) => {
    setSpecifications(specifications.filter((_, i) => i !== index));
  };

  // Feature helpers
  const addFeature = () => {
    const nextNum = (features.length + 1).toString().padStart(2, "0");
    setFeatures([...features, { number: nextNum, title: "", description: "" }]);
  };
  const updateFeature = (index: number, field: keyof ProductFeature, val: string) => {
    const updated = [...features];
    updated[index] = { ...updated[index], [field]: val };
    setFeatures(updated);
  };
  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  // Application helpers
  const addApplication = () => {
    setApplications([...applications, { title: "", description: "" }]);
  };
  const updateApplication = (index: number, field: keyof ProductApplication, val: string) => {
    const updated = [...applications];
    updated[index] = { ...updated[index], [field]: val };
    setApplications(updated);
  };
  const removeApplication = (index: number) => {
    setApplications(applications.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Implement Name is required.");
      return;
    }

    setIsSaving(true);
    setError("");

    const payload: Partial<ProductItem> = {
      id: initialData?.id,
      name: name.trim(),
      hindiName: hindiName.trim(),
      slug: slug.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      category,
      categoryGroup,
      categoryName: CATEGORY_OPTIONS.find((c) => c.value === category)?.label || "Implement",
      tagline: tagline.trim(),
      description: description.trim(),
      fullDescription: fullDescription.trim(),
      suitableForTractorHp: suitableForTractorHp.trim(),
      warranty: warranty.trim(),
      heroImage: heroImage.trim(),
      thumbnail: heroImage.trim(),
      galleryImages: initialData?.galleryImages || [heroImage.trim()],
      specifications: specifications.filter((s) => s.label.trim() && s.value.trim()),
      features: features.filter((f) => f.title.trim()),
      applications: applications.filter((a) => a.title.trim()),
      isFeatured,
      order: Number(order) || 1,
    };

    try {
      const url = isEditMode ? `/api/products/${initialData?.id}` : "/api/products";
      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save product");
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      console.error("Save failed:", err);
      setError(err.message || "Failed to save product.");
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Header with Back Button & Submit */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-14 lg:top-0 z-30 bg-slate-50/95 backdrop-blur-md py-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors shadow-xs"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-black text-slate-900 font-mono uppercase">
              {isEditMode ? `Edit Implement: ${initialData?.name}` : "Create New Implement"}
            </h1>
            <p className="text-xs text-slate-500 font-mono">
              Fill details to update the live public catalogue and product specifications.
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-[0.98] text-white font-bold font-mono text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm shadow-amber-600/20 transition-all disabled:opacity-50 cursor-pointer"
        >
          {isSaving ? (
            <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>{isEditMode ? "Update Implement" : "Publish to Catalogue"}</span>
        </button>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-3 text-rose-800 text-sm font-mono">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Section 1: Basic Information */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-base font-bold text-slate-900 font-mono uppercase tracking-wide">
            1. Core Implement Details
          </h2>
          <p className="text-xs text-slate-500">Primary identification and category mapping.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">
              Implement Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={handleNameBlur}
              placeholder="e.g. Hydraulic Reversible Plough"
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-amber-600 focus:ring-2 focus:ring-amber-500/15"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">
              Hindi Name (Optional)
            </label>
            <input
              type="text"
              value={hindiName}
              onChange={(e) => setHindiName(e.target.value)}
              placeholder="e.g. हाइड्रोलिक रिवर्सिबल प्लाउ"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-amber-600 focus:ring-2 focus:ring-amber-500/15"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">
              URL Slug *
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. hydraulic-reversible-plough"
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm font-mono focus:outline-none focus:bg-white focus:border-amber-600 focus:ring-2 focus:ring-amber-500/15"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">
              Category *
            </label>
            <select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value as ProductCategory)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:bg-white focus:border-amber-600 focus:ring-2 focus:ring-amber-500/15"
            >
              {CATEGORY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label} ({opt.group.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">
              Suitable Tractor Horsepower
            </label>
            <input
              type="text"
              value={suitableForTractorHp}
              onChange={(e) => setSuitableForTractorHp(e.target.value)}
              placeholder="e.g. 45-75 HP or 35-50 HP"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm font-mono focus:outline-none focus:bg-white focus:border-amber-600 focus:ring-2 focus:ring-amber-500/15"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">
              Structural Warranty
            </label>
            <input
              type="text"
              value={warranty}
              onChange={(e) => setWarranty(e.target.value)}
              placeholder="e.g. 1 Year Structural Warranty"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-amber-600 focus:ring-2 focus:ring-amber-500/15"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">
            Implement Tagline
          </label>
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="e.g. Precision engineered hydraulic soil inversion plough with wear-resistant boron steel points."
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-amber-600 focus:ring-2 focus:ring-amber-500/15"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <input
              id="is-featured"
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="w-5 h-5 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
            />
            <label htmlFor="is-featured" className="text-sm text-slate-800 font-medium cursor-pointer">
              Spotlight on Homepage & Featured Listings
            </label>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">
              Display Sequence Order
            </label>
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-mono focus:outline-none focus:bg-white focus:border-amber-600"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Technical Overview & Full Description */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-base font-bold text-slate-900 font-mono uppercase tracking-wide">
            2. Detailed Descriptions
          </h2>
          <p className="text-xs text-slate-500">Short summary for cards and in-depth engineering writeup.</p>
        </div>

        <div>
          <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">
            Overview Summary (Used on catalogue cards)
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief overview of the implement, operating soil types, and frame durability..."
            className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-amber-600 focus:ring-2 focus:ring-amber-500/15"
          />
        </div>

        <div>
          <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">
            Full Engineering Description (Used on implement detail page)
          </label>
          <textarea
            rows={5}
            value={fullDescription}
            onChange={(e) => setFullDescription(e.target.value)}
            placeholder="Comprehensive description of steel grades, turnover mechanisms, under-frame clearances, and welding specifications..."
            className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-amber-600 focus:ring-2 focus:ring-amber-500/15"
          />
        </div>
      </div>

      {/* Section 3: Visuals & Photos */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-base font-bold text-slate-900 font-mono uppercase tracking-wide">
            3. Implement Media & Imagery
          </h2>
          <p className="text-xs text-slate-500">High-resolution showcase photograph.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-2">
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">
              Hero Image Path or URL
            </label>
            <input
              type="text"
              value={heroImage}
              onChange={(e) => setHeroImage(e.target.value)}
              placeholder="/images/products/... or https://..."
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm font-mono focus:outline-none focus:bg-white focus:border-amber-600 focus:ring-2 focus:ring-amber-500/15"
            />
            <p className="text-[11px] text-slate-500 mt-1.5 font-mono">
              Provide path to SVG/PNG in public folder, e.g. <code className="text-amber-700 font-bold">/images/products/plough/plough-main.svg</code>
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center text-center aspect-video sm:aspect-square overflow-hidden">
            {heroImage ? (
              <img
                src={heroImage}
                alt="Preview"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/images/products/custom-implements/custom-implements-main.svg";
                }}
              />
            ) : (
              <div className="text-slate-400 text-xs font-mono flex flex-col items-center gap-1">
                <ImageIcon className="w-8 h-8 opacity-40" />
                <span>Image Preview</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Section 4: Dynamic Specifications Matrix */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 font-mono uppercase tracking-wide">
              4. Engineering Specifications Matrix
            </h2>
            <p className="text-xs text-slate-500">Technical dimensions, steel grades, and hitch standards.</p>
          </div>
          <button
            type="button"
            onClick={addSpecification}
            className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-amber-800 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Row</span>
          </button>
        </div>

        <div className="space-y-3">
          {specifications.map((spec, index) => (
            <div key={index} className="flex items-center gap-3">
              <input
                type="text"
                value={spec.label}
                onChange={(e) => updateSpecification(index, "label", e.target.value)}
                placeholder="Spec Label (e.g. Frame Section)"
                className="w-1/3 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono focus:outline-none focus:bg-white focus:border-amber-600"
              />
              <input
                type="text"
                value={spec.value}
                onChange={(e) => updateSpecification(index, "value", e.target.value)}
                placeholder="Spec Value (e.g. 100x100x8 mm Box Section)"
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono focus:outline-none focus:bg-white focus:border-amber-600"
              />
              <button
                type="button"
                onClick={() => removeSpecification(index)}
                className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 hover:text-rose-700 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Section 5: Key Features (Numbered Cards) */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 font-mono uppercase tracking-wide">
              5. Highlighted Engineering Features
            </h2>
            <p className="text-xs text-slate-500">Numbered highlight cards displayed on the product page.</p>
          </div>
          <button
            type="button"
            onClick={addFeature}
            className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-amber-800 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Feature</span>
          </button>
        </div>

        <div className="space-y-4">
          {features.map((feat, index) => (
            <div key={index} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <input
                  type="text"
                  value={feat.number}
                  onChange={(e) => updateFeature(index, "number", e.target.value)}
                  placeholder="01"
                  className="w-16 px-3 py-2 rounded-lg bg-white border border-slate-300 text-amber-700 text-xs font-mono font-bold focus:outline-none focus:border-amber-600"
                />
                <input
                  type="text"
                  value={feat.title}
                  onChange={(e) => updateFeature(index, "title", e.target.value)}
                  placeholder="Feature Title (e.g. DUAL-ACTING HYDRAULIC TURNOVER)"
                  className="flex-1 px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs font-mono font-bold uppercase focus:outline-none focus:border-amber-600"
                />
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="p-2 rounded-lg text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <textarea
                rows={2}
                value={feat.description}
                onChange={(e) => updateFeature(index, "description", e.target.value)}
                placeholder="Explain the functional advantage for the farmer..."
                className="w-full p-3 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-amber-600"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Section 6: Practical Field Applications */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 font-mono uppercase tracking-wide">
              6. Practical Field Applications
            </h2>
            <p className="text-xs text-slate-500">Primary use-cases in soil cultivation and seedbed preparation.</p>
          </div>
          <button
            type="button"
            onClick={addApplication}
            className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-amber-800 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Application</span>
          </button>
        </div>

        <div className="space-y-4">
          {applications.map((app, index) => (
            <div key={index} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <input
                  type="text"
                  value={app.title}
                  onChange={(e) => updateApplication(index, "title", e.target.value)}
                  placeholder="Application Title (e.g. Primary Deep Tillage)"
                  className="flex-1 px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs font-bold focus:outline-none focus:border-amber-600"
                />
                <button
                  type="button"
                  onClick={() => removeApplication(index)}
                  className="p-2 rounded-lg text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <textarea
                rows={2}
                value={app.description}
                onChange={(e) => updateApplication(index, "description", e.target.value)}
                placeholder="Describe how the implement performs in this field application..."
                className="w-full p-3 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-amber-600"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
        <Link
          href="/admin/products"
          className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-mono text-xs font-medium transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isSaving}
          className="px-8 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold font-mono text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm shadow-amber-600/20 transition-all disabled:opacity-50 cursor-pointer"
        >
          {isSaving ? (
            <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>{isEditMode ? "Save Changes" : "Create Implement"}</span>
        </button>
      </div>
    </form>
  );
}
