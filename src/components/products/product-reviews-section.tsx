"use client";

import * as React from "react";
import Link from "next/link";
import {
  Star,
  CheckCircle2,
  Tractor,
  MapPin,
  MessageSquarePlus,
  ShieldCheck,
  Sparkles,
  Calendar,
  ThumbsUp,
  MessageCircle,
} from "lucide-react";
import { type ProductItem } from "@/types/product";
import { type StoredFeedback, type FeedbackStats } from "@/types/feedback";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductReviewsSectionProps {
  product: ProductItem;
  feedbacks: StoredFeedback[];
  stats: FeedbackStats;
}

export function ProductReviewsSection({
  product,
  feedbacks,
  stats,
}: ProductReviewsSectionProps) {
  const [selectedRatingFilter, setSelectedRatingFilter] = React.useState<number | "all">("all");

  const filteredFeedbacks =
    selectedRatingFilter === "all"
      ? feedbacks
      : feedbacks.filter((f) => f.rating === selectedRatingFilter);

  return (
    <section className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-50 text-amber-900 border border-amber-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              AUTHENTIC FIELD RATINGS
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
              Verified Farmer Reviews & Field Performance
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Read real-world feedback from tractor owners and operators putting the{" "}
              <strong className="text-slate-900">{product.name}</strong> to work in
              tough agricultural soils.
            </p>
          </div>

          <Link href={`/feedback?product=${product.slug}`}>
            <Button
              variant="amber"
              size="lg"
              leftIcon={<MessageSquarePlus className="w-4 h-4" />}
              className="shadow-md"
            >
              Write Review for this Implement
            </Button>
          </Link>
        </div>

        {/* Rating Summary Card & Distribution */}
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Average Rating Block */}
          <div className="lg:col-span-4 text-center lg:text-left space-y-3 lg:border-r lg:border-slate-200 lg:pr-8">
            <div className="flex items-baseline justify-center lg:justify-start gap-2">
              <span className="text-5xl sm:text-6xl font-black text-slate-900 font-display">
                {stats.totalCount > 0 ? stats.averageRating.toFixed(1) : "5.0"}
              </span>
              <span className="text-slate-400 font-mono text-xl font-bold">/ 5.0</span>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    "w-6 h-6",
                    star <= Math.round(stats.averageRating)
                      ? "text-amber-500 fill-amber-500"
                      : "text-slate-300"
                  )}
                />
              ))}
            </div>

            <p className="text-xs font-mono text-slate-600">
              Based on{" "}
              <strong className="text-slate-900 font-bold">
                {stats.totalCount} verified field review
                {stats.totalCount === 1 ? "" : "s"}
              </strong>
            </p>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% Authentic Tractor Owners
            </div>
          </div>

          {/* Distribution Bars */}
          <div className="lg:col-span-8 space-y-2.5">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = stats.ratingDistribution[stars] || 0;
              const percent = stats.totalCount > 0 ? (count / stats.totalCount) * 100 : 0;

              return (
                <button
                  key={stars}
                  onClick={() =>
                    setSelectedRatingFilter((prev) =>
                      prev === stars ? "all" : stars
                    )
                  }
                  className={cn(
                    "w-full flex items-center gap-3 text-xs font-medium py-1 px-2 rounded-lg transition-colors cursor-pointer group",
                    selectedRatingFilter === stars
                      ? "bg-amber-100/70 font-bold"
                      : "hover:bg-slate-100"
                  )}
                >
                  <span className="w-12 text-left font-mono text-slate-700 flex items-center gap-1 shrink-0">
                    {stars} <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 inline" />
                  </span>

                  <div className="flex-1 h-3 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  <span className="w-8 text-right font-mono text-slate-500 shrink-0">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Toolbar */}
        {feedbacks.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500">
                Filter:
              </span>
              <button
                onClick={() => setSelectedRatingFilter("all")}
                className={cn(
                  "px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-colors cursor-pointer",
                  selectedRatingFilter === "all"
                    ? "bg-[#10271D] text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                )}
              >
                All ({feedbacks.length})
              </button>
              {[5, 4, 3].map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedRatingFilter(r)}
                  className={cn(
                    "px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-colors cursor-pointer flex items-center gap-1",
                    selectedRatingFilter === r
                      ? "bg-[#10271D] text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  )}
                >
                  {r} ★ ({feedbacks.filter((f) => f.rating === r).length})
                </button>
              ))}
            </div>

            <span className="text-xs font-mono text-slate-500">
              Showing {filteredFeedbacks.length} review
              {filteredFeedbacks.length === 1 ? "" : "s"}
            </span>
          </div>
        )}

        {/* Reviews List */}
        {filteredFeedbacks.length === 0 ? (
          <div className="text-center py-16 px-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <Star className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              No reviews for this filter yet
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Be the first farmer to share your field experience with this implement!
            </p>
            <Link href={`/feedback?product=${product.slug}`}>
              <Button variant="amber" size="default">
                Submit First Review
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredFeedbacks.map((fb) => (
              <div
                key={fb.id}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-5"
              >
                {/* Review Header: User & Rating */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#10271D] to-[#173B2C] text-amber-400 font-black font-display flex items-center justify-center text-base border border-amber-500/30 shadow-xs shrink-0">
                        {fb.customerName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-slate-900 text-sm leading-tight">
                            {fb.customerName}
                          </h4>
                          {fb.isVerifiedFarmer && (
                            <span
                              title="Verified Farmer / Operator"
                              className="inline-flex items-center text-emerald-600"
                            >
                              <CheckCircle2 className="w-4 h-4 fill-emerald-100" />
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5 font-mono">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{fb.customerLocation}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 shrink-0 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/80">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={cn(
                            "w-3.5 h-3.5",
                            star <= fb.rating
                              ? "text-amber-500 fill-amber-500"
                              : "text-slate-300"
                          )}
                        />
                      ))}
                      <span className="text-xs font-mono font-bold text-amber-900 ml-1">
                        {fb.rating}.0
                      </span>
                    </div>
                  </div>

                  {/* Metadata Chips (Tractor, Soil, Duration) */}
                  <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
                    {fb.tractorModel && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-mono">
                        <Tractor className="w-3 h-3 text-amber-600" />
                        {fb.tractorModel}
                      </span>
                    )}
                    {fb.soilType && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-mono">
                        🌱 {fb.soilType.split("(")[0]}
                      </span>
                    )}
                    {fb.usageDuration && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-mono">
                        ⏱️ {fb.usageDuration.split("(")[0]}
                      </span>
                    )}
                  </div>

                  {/* Headline & Comment */}
                  <div className="space-y-1.5 pt-2">
                    <h5 className="font-bold text-slate-900 text-base leading-snug">
                      &ldquo;{fb.headline}&rdquo;
                    </h5>
                    <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                      {fb.comment}
                    </p>
                  </div>

                  {/* Highlight Tags */}
                  {fb.tags && fb.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {fb.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-50 text-amber-800 border border-amber-200/60 font-semibold"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Official Workshop Reply */}
                  {fb.adminReply && (
                    <div className="mt-4 p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-slate-800 space-y-1">
                      <div className="flex items-center gap-1.5 font-bold font-mono text-amber-900 uppercase tracking-wider text-[10px]">
                        <MessageCircle className="w-3.5 h-3.5 text-amber-700" />
                        Sai Pooja Fabrication — Workshop Response:
                      </div>
                      <p className="italic text-slate-700 leading-relaxed">
                        &ldquo;{fb.adminReply}&rdquo;
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer Date */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>
                    Reviewed on:{" "}
                    {new Date(fb.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span className="text-emerald-700 font-semibold">
                    ✓ Field Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
