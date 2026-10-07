"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  CheckCircle2,
  Tractor,
  MapPin,
  Phone,
  User,
  ShieldCheck,
  Send,
  Sparkles,
  ArrowRight,
  MessageSquare,
  Wrench,
  Gauge,
  Share2,
} from "lucide-react";
import { type ProductItem } from "@/types/product";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductFeedbackFormProps {
  products: ProductItem[];
  initialProductSlug?: string;
  whatsappNumber?: string;
}

const COMMON_TAGS = [
  "Heavy Tensile Steel",
  "Zero Frame Bending",
  "Smooth Tractor Pull",
  "Clean Soil Cutting",
  "Durable Boron Shovels",
  "Low Diesel Consumption",
  "Smooth Hydraulic Turn",
  "Precision Bearing Spools",
  "Long Wear Life",
  "Prompt Factory Delivery",
];

const SOIL_TYPES = [
  "Heavy Black Cotton Soil (काळी माती)",
  "Medium Black Loam",
  "Red Soil / तांबडी माती",
  "Sandy Loam / वाळू मिश्रित",
  "Hardpan / Stony Soil (खडक/मुरुम)",
  "Wet Paddy / चिखल",
];

const USAGE_PERIODS = [
  "Under 3 Months (New Purchase)",
  "3 to 6 Months",
  "6 to 12 Months (1 Full Season)",
  "1 to 2 Years",
  "3+ Years (Long Term Proven)",
];

const TRACTOR_SUGGESTIONS = [
  "Mahindra 575 DI (45 HP)",
  "Mahindra Arjun Novo 605 (60 HP)",
  "Swaraj 855 FE (52 HP)",
  "Swaraj 744 FE (48 HP)",
  "John Deere 5310 (55 HP)",
  "John Deere 5050 D (50 HP)",
  "Massey Ferguson 241 DI (42 HP)",
  "Massey Ferguson 9500 (58 HP)",
  "New Holland 3630 (55 HP)",
  "Kubota MU5502 (55 HP)",
  "Sonalika DI 745 (50 HP)",
  "Powertrac Euro 50 (50 HP)",
];

export function ProductFeedbackForm({
  products,
  initialProductSlug,
  whatsappNumber = "919423784260",
}: ProductFeedbackFormProps) {
  // Selected product
  const defaultProduct =
    products.find((p) => p.slug === initialProductSlug) || products[0];
  const [selectedSlug, setSelectedSlug] = React.useState<string>(
    defaultProduct?.slug || ""
  );

  const currentProduct =
    products.find((p) => p.slug === selectedSlug) || defaultProduct;

  // Form states
  const [rating, setRating] = React.useState<number>(5);
  const [hoverRating, setHoverRating] = React.useState<number | null>(null);
  const [durabilityRating, setDurabilityRating] = React.useState<number>(5);
  const [performanceRating, setPerformanceRating] = React.useState<number>(5);
  const [serviceRating, setServiceRating] = React.useState<number>(5);

  const [customerName, setCustomerName] = React.useState("");
  const [customerLocation, setCustomerLocation] = React.useState("");
  const [customerPhone, setCustomerPhone] = React.useState("");
  const [tractorModel, setTractorModel] = React.useState("");
  const [soilType, setSoilType] = React.useState(SOIL_TYPES[0]);
  const [usageDuration, setUsageDuration] = React.useState(USAGE_PERIODS[2]);

  const [headline, setHeadline] = React.useState("");
  const [comment, setComment] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState<string[]>([
    "Heavy Tensile Steel",
    "Zero Frame Bending",
  ]);
  const [isVerifiedFarmer, setIsVerifiedFarmer] = React.useState(true);

  // Submission state
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submittedData, setSubmittedData] = React.useState<any | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const getRatingLabel = (val: number) => {
    switch (val) {
      case 1:
        return "1.0 • Poor / Needs Improvement";
      case 2:
        return "2.0 • Below Expectations";
      case 3:
        return "3.0 • Satisfactory / Standard";
      case 4:
        return "4.0 • Very Good Field Quality";
      case 5:
        return "5.0 • Exceptional Heavy-Duty Excellence! ★★★★★";
      default:
        return "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!customerName.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!customerLocation.trim()) {
      setErrorMessage("Please enter your village, taluka, or district.");
      return;
    }
    if (!headline.trim()) {
      setErrorMessage("Please enter a short headline for your review.");
      return;
    }
    if (!comment.trim()) {
      setErrorMessage("Please provide your field experience comment.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        productSlug: currentProduct.slug,
        productName: currentProduct.name,
        customerName: customerName.trim(),
        customerLocation: customerLocation.trim(),
        customerPhone: customerPhone.trim() || undefined,
        tractorModel: tractorModel.trim() || undefined,
        soilType: soilType || undefined,
        usageDuration: usageDuration || undefined,
        rating,
        durabilityRating,
        performanceRating,
        serviceRating,
        headline: headline.trim(),
        comment: comment.trim(),
        tags: selectedTags,
        isVerifiedFarmer,
      };

      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Submission failed. Please try again.");
      }

      setSubmittedData(data.feedback);
    } catch (err: any) {
      console.error("Feedback submit error:", err);
      setErrorMessage(err.message || "Failed to submit feedback.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // If submitted successfully, show confirmation screen
  if (submittedData) {
    const waText = encodeURIComponent(
      `*New Product Review on Sai Pooja Fabrication Website*\n\n` +
        `*Implement:* ${submittedData.productName}\n` +
        `*Farmer:* ${submittedData.customerName} (${submittedData.customerLocation})\n` +
        `*Rating:* ${submittedData.rating} / 5 Stars\n` +
        `*Tractor:* ${submittedData.tractorModel || "N/A"}\n` +
        `*Headline:* "${submittedData.headline}"\n\n` +
        `*Review:* ${submittedData.comment}`
    );
    const waUrl = `https://wa.me/${whatsappNumber}?text=${waText}`;

    return (
      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            REVIEW PUBLISHED
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-display">
            Thank You, {submittedData.customerName}!
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base leading-relaxed">
            Your field review for the{" "}
            <strong className="text-slate-900">{submittedData.productName}</strong>{" "}
            has been recorded. Your feedback helps farmers across Maharashtra make
            informed equipment decisions.
          </p>
        </div>

        {/* Preview of submitted review */}
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-left space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    "w-5 h-5",
                    star <= submittedData.rating
                      ? "text-amber-500 fill-amber-500"
                      : "text-slate-300"
                  )}
                />
              ))}
            </div>
            <span className="text-xs font-mono text-slate-500">
              {submittedData.customerLocation}
            </span>
          </div>

          <h4 className="font-bold text-slate-900 text-base">
            &ldquo;{submittedData.headline}&rdquo;
          </h4>
          <p className="text-sm text-slate-700 leading-relaxed italic">
            &ldquo;{submittedData.comment}&rdquo;
          </p>

          {submittedData.tractorModel && (
            <div className="flex items-center gap-2 pt-2 text-xs text-slate-600 font-mono">
              <Tractor className="w-4 h-4 text-amber-600" />
              <span>Tested on: {submittedData.tractorModel}</span>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm shadow-md transition-all active:scale-[0.98]"
          >
            <Share2 className="w-4 h-4" />
            Share with Workshop Owner on WhatsApp
          </a>

          <Link
            href={`/products/${currentProduct.slug}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#10271D] hover:bg-[#173B2C] text-white font-bold text-sm shadow-md transition-all active:scale-[0.98]"
          >
            Back to Implement Details
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8"
    >
      {/* 1. Product Context Banner & Switcher */}
      <div className="p-5 rounded-2xl bg-[#10271D] text-[#F4F1E8] flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-inner">
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white/10 shrink-0 border border-white/20">
            <Image
              src={currentProduct.heroImage}
              alt={currentProduct.name}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
          <div>
            <div className="text-[11px] font-mono text-[#C8913D] uppercase tracking-wider font-bold">
              Reviewing Implement
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-display leading-tight text-white">
              {currentProduct.name}
            </h3>
            {currentProduct.hindiName && (
              <p className="text-xs text-[#F4F1E8]/70 mt-0.5">
                {currentProduct.hindiName}
              </p>
            )}
            {currentProduct.suitableForTractorHp && (
              <div className="inline-flex items-center gap-1.5 mt-1.5 px-2.5 py-0.5 rounded-md bg-white/10 text-[11px] font-mono text-[#F4F1E8]/90">
                <Tractor className="w-3.5 h-3.5 text-[#C8913D]" />
                {currentProduct.suitableForTractorHp}
              </div>
            )}
          </div>
        </div>

        {/* Change product select dropdown */}
        <div className="w-full md:w-auto shrink-0">
          <label
            htmlFor="product-select"
            className="block text-[10px] font-mono text-[#F4F1E8]/70 uppercase tracking-widest mb-1.5"
          >
            Switch Implement
          </label>
          <select
            id="product-select"
            value={selectedSlug}
            onChange={(e) => setSelectedSlug(e.target.value)}
            className="w-full md:w-64 px-3.5 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#C8913D] transition-colors cursor-pointer"
          >
            {products.map((p) => (
              <option key={p.slug} value={p.slug} className="text-slate-900 bg-white">
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Error alert if any */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm font-medium flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 2. Interactive Overall Star Rating */}
      <div className="space-y-3 bg-amber-50/60 rounded-2xl p-6 border border-amber-200/80 text-center">
        <label className="block text-xs font-mono uppercase tracking-widest text-amber-900 font-bold">
          Overall Field Rating / एकूण गुणवत्ता रेटिंग *
        </label>

        <div className="flex items-center justify-center gap-2 sm:gap-3 py-2">
          {[1, 2, 3, 4, 5].map((star) => {
            const isHovered = hoverRating !== null && star <= hoverRating;
            const isSelected = hoverRating === null && star <= rating;
            const active = isHovered || isSelected;

            return (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(null)}
                className="p-1 sm:p-2 transition-transform duration-150 hover:scale-125 focus:outline-none cursor-pointer group"
                aria-label={`Rate ${star} star`}
              >
                <Star
                  className={cn(
                    "w-8 h-8 sm:w-10 sm:h-10 transition-colors drop-shadow-xs",
                    active
                      ? "text-amber-500 fill-amber-500"
                      : "text-slate-300 fill-slate-100"
                  )}
                />
              </button>
            );
          })}
        </div>

        <div className="text-sm font-bold font-mono text-amber-900 min-h-[24px]">
          {getRatingLabel(hoverRating || rating)}
        </div>
      </div>

      {/* 3. Sub-category Industrial Metric Ratings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Metric 1: Steel Durability */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Steel & Weld Durability
            </span>
            <span className="text-xs font-mono font-bold text-slate-900">
              {durabilityRating}/5
            </span>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setDurabilityRating(val)}
                className={cn(
                  "flex-1 h-2 rounded-full transition-all cursor-pointer",
                  val <= durabilityRating ? "bg-amber-500" : "bg-slate-200"
                )}
                title={`Rate durability ${val}/5`}
              />
            ))}
          </div>
          <span className="text-[11px] text-slate-500 block">
            Frame strength & wear life
          </span>
        </div>

        {/* Metric 2: Field Pull & Load */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <Gauge className="w-4 h-4 text-blue-600" />
              Tractor Pull & Efficiency
            </span>
            <span className="text-xs font-mono font-bold text-slate-900">
              {performanceRating}/5
            </span>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setPerformanceRating(val)}
                className={cn(
                  "flex-1 h-2 rounded-full transition-all cursor-pointer",
                  val <= performanceRating ? "bg-amber-500" : "bg-slate-200"
                )}
                title={`Rate performance ${val}/5`}
              />
            ))}
          </div>
          <span className="text-[11px] text-slate-500 block">
            Fuel economy & tractor load
          </span>
        </div>

        {/* Metric 3: Factory Service & Finish */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <Wrench className="w-4 h-4 text-purple-600" />
              Factory Finish & Service
            </span>
            <span className="text-xs font-mono font-bold text-slate-900">
              {serviceRating}/5
            </span>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setServiceRating(val)}
                className={cn(
                  "flex-1 h-2 rounded-full transition-all cursor-pointer",
                  val <= serviceRating ? "bg-amber-500" : "bg-slate-200"
                )}
                title={`Rate service ${val}/5`}
              />
            ))}
          </div>
          <span className="text-[11px] text-slate-500 block">
            Paint finish, assembly & delivery
          </span>
        </div>
      </div>

      {/* 4. Farmer & Farm Location Details */}
      <div className="space-y-4">
        <h4 className="text-sm font-bold font-mono text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <User className="w-4 h-4 text-amber-600" />
          Farmer & Operator Details
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Your Full Name / आपले पूर्ण नाव *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Rameshwar Bhagwat"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Village / Taluka & District / गाव व जिल्हा *
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                placeholder="e.g. Niphad, Nashik, Maharashtra"
                value={customerLocation}
                onChange={(e) => setCustomerLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Mobile / WhatsApp (Optional)
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="tel"
                placeholder="+91 98221 00000"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Tractor Model / ट्रॅक्टर मॉडेल
            </label>
            <div className="relative">
              <Tractor className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                list="tractor-list"
                placeholder="e.g. Swaraj 855 FE"
                value={tractorModel}
                onChange={(e) => setTractorModel(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
              <datalist id="tractor-list">
                {TRACTOR_SUGGESTIONS.map((t) => (
                  <option key={t} value={t} />
                ))}
              </datalist>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Soil Type / जमिनीचा प्रकार
            </label>
            <select
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
            >
              {SOIL_TYPES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Usage Duration with this Implement
          </label>
          <div className="flex flex-wrap gap-2">
            {USAGE_PERIODS.map((period) => (
              <button
                key={period}
                type="button"
                onClick={() => setUsageDuration(period)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer",
                  usageDuration === period
                    ? "bg-[#10271D] text-white border-[#10271D]"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                )}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Highlight Tags Selector */}
      <div className="space-y-2">
        <label className="block text-xs font-medium text-slate-700">
          What did you like the most? (Click to select tags)
        </label>
        <div className="flex flex-wrap gap-2">
          {COMMON_TAGS.map((tag) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5",
                  isSelected
                    ? "bg-amber-500 text-white shadow-xs font-bold"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                )}
              >
                <span>{tag}</span>
                {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. Review Headline & Detailed Comments */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Review Title / Headline *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Outstanding deep furrow performance with zero tractor strain"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-medium text-slate-700">
              Detailed Field Experience & Review *
            </label>
            <span className="text-[11px] font-mono text-slate-400">
              {comment.length} characters
            </span>
          </div>
          <textarea
            required
            rows={4}
            placeholder="Share how this implement performed in your field, soil penetration, fuel consumption, weld quality, and tractor stability..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 leading-relaxed"
          />
        </div>

        <div className="flex items-center gap-3 pt-1">
          <input
            type="checkbox"
            id="verified-checkbox"
            checked={isVerifiedFarmer}
            onChange={(e) => setIsVerifiedFarmer(e.target.checked)}
            className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-slate-300 cursor-pointer"
          />
          <label
            htmlFor="verified-checkbox"
            className="text-xs text-slate-700 cursor-pointer select-none"
          >
            I confirm I am an authentic farmer / tractor operator who has worked with
            this implement.
          </label>
        </div>
      </div>

      {/* 7. Submit Button */}
      <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-slate-500 font-mono">
          ✓ Review will appear immediately on the product page and workshop portal.
        </p>

        <Button
          type="submit"
          variant="amber"
          size="lg"
          isLoading={isSubmitting}
          leftIcon={<Send className="w-4 h-4" />}
          className="w-full sm:w-auto px-8"
        >
          Submit Field Feedback
        </Button>
      </div>
    </form>
  );
}
