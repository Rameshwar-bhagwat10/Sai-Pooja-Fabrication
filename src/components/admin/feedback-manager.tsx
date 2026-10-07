"use client";

import * as React from "react";
import Link from "next/link";
import {
  Star,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Clock,
  Trash2,
  MessageSquareQuote,
  Tractor,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  MessageCircle,
  ThumbsUp,
  XCircle,
  Eye,
  CornerDownRight,
  Send,
} from "lucide-react";
import { type StoredFeedback, type FeedbackStatus } from "@/types/feedback";
import { type ProductItem } from "@/types/product";
import { cn } from "@/lib/utils";

interface FeedbackManagerProps {
  initialFeedbacks: StoredFeedback[];
  products: ProductItem[];
}

export function FeedbackManager({
  initialFeedbacks,
  products,
}: FeedbackManagerProps) {
  const [feedbacks, setFeedbacks] = React.useState<StoredFeedback[]>(initialFeedbacks);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [productFilter, setProductFilter] = React.useState("all");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [ratingFilter, setRatingFilter] = React.useState<string>("all");

  const [updatingId, setUpdatingId] = React.useState<string | null>(null);
  const [replyingId, setReplyingId] = React.useState<string | null>(null);
  const [replyText, setReplyText] = React.useState("");

  const [notification, setNotification] = React.useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const showNotification = (type: "success" | "error", text: string) => {
    setNotification({ type, text });
    setTimeout(() => setNotification(null), 3500);
  };

  // Stats calculations
  const totalCount = feedbacks.length;
  const approvedCount = feedbacks.filter((f) => f.status === "approved").length;
  const pendingCount = feedbacks.filter((f) => f.status === "pending").length;
  const featuredCount = feedbacks.filter((f) => f.isFeatured).length;
  const averageRating =
    totalCount > 0
      ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / totalCount).toFixed(1)
      : "5.0";

  // Filtered feedbacks
  const filteredFeedbacks = feedbacks.filter((fb) => {
    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        fb.customerName.toLowerCase().includes(q) ||
        fb.customerLocation.toLowerCase().includes(q) ||
        fb.productName.toLowerCase().includes(q) ||
        fb.headline.toLowerCase().includes(q) ||
        fb.comment.toLowerCase().includes(q) ||
        (fb.tractorModel && fb.tractorModel.toLowerCase().includes(q));

      if (!matchesSearch) return false;
    }

    // Product filter
    if (productFilter !== "all" && fb.productSlug !== productFilter) {
      return false;
    }

    // Status filter
    if (statusFilter !== "all" && fb.status !== statusFilter) {
      return false;
    }

    // Rating filter
    if (ratingFilter !== "all" && fb.rating !== Number(ratingFilter)) {
      return false;
    }

    return true;
  });

  // Action: Status update (approve / reject / pending)
  const handleStatusChange = async (id: string, newStatus: FeedbackStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/feedback/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update review status");
      }

      setFeedbacks((prev) =>
        prev.map((fb) => (fb.id === id ? { ...fb, status: newStatus } : fb))
      );
      showNotification("success", `Review status changed to ${newStatus.toUpperCase()}`);
    } catch (err: any) {
      showNotification("error", err.message || "Failed to update review status.");
    } finally {
      setUpdatingId(null);
    }
  };

  // Action: Toggle Featured
  const handleToggleFeatured = async (id: string, currentFeatured: boolean) => {
    setUpdatingId(id);
    const newFeatured = !currentFeatured;
    try {
      const res = await fetch(`/api/feedback/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured: newFeatured }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update featured flag");
      }

      setFeedbacks((prev) =>
        prev.map((fb) => (fb.id === id ? { ...fb, isFeatured: newFeatured } : fb))
      );
      showNotification(
        "success",
        newFeatured
          ? "Pinned as Featured Review on Product Page"
          : "Removed from Featured Reviews"
      );
    } catch (err: any) {
      showNotification("error", err.message || "Failed to update review.");
    } finally {
      setUpdatingId(null);
    }
  };

  // Action: Save Admin Reply
  const handleSaveReply = async (id: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/feedback/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminReply: replyText.trim() }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save workshop reply");
      }

      setFeedbacks((prev) =>
        prev.map((fb) =>
          fb.id === id ? { ...fb, adminReply: replyText.trim() } : fb
        )
      );
      setReplyingId(null);
      setReplyText("");
      showNotification("success", "Workshop owner response saved!");
    } catch (err: any) {
      showNotification("error", err.message || "Failed to save reply.");
    } finally {
      setUpdatingId(null);
    }
  };

  // Action: Delete feedback
  const handleDeleteFeedback = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this customer review?")) {
      return;
    }

    setUpdatingId(id);
    try {
      const res = await fetch(`/api/feedback/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to delete review");
      }

      setFeedbacks((prev) => prev.filter((fb) => fb.id !== id));
      showNotification("success", "Review deleted successfully.");
    } catch (err: any) {
      showNotification("error", err.message || "Failed to delete review.");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Top Banner / Notification */}
      {notification && (
        <div
          className={cn(
            "fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-lg border text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-3",
            notification.type === "success"
              ? "bg-emerald-50 border-emerald-300 text-emerald-800"
              : "bg-rose-50 border-rose-300 text-rose-800"
          )}
        >
          {notification.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600" />
          )}
          <span>{notification.text}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-50 text-amber-900 border border-amber-200 mb-2">
            <MessageSquareQuote className="w-3.5 h-3.5 text-amber-700" />
            FIELD REPUTATION & REVIEWS
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-display tracking-tight">
            Farmer & Operator Feedback
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Manage authentic field reviews, approve submissions, and write workshop
            replies.
          </p>
        </div>

        <Link
          href="/feedback"
          target="_blank"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#10271D] hover:bg-[#173B2C] text-white text-xs font-mono font-bold transition-all shadow-sm"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Open Public Feedback Form ↗
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">
            Total Reviews
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
            {totalCount}
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            Directly from field farmers
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">
            Average Score
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-display text-amber-600 flex items-center gap-1.5">
            {averageRating}
            <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            Across all implements
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">
            Pending Moderation
          </div>
          <div
            className={cn(
              "text-2xl sm:text-3xl font-bold font-display",
              pendingCount > 0 ? "text-amber-600" : "text-emerald-600"
            )}
          >
            {pendingCount}
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            {pendingCount > 0 ? "Awaiting review" : "All reviews processed"}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">
            Featured on Website
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-display text-slate-900 flex items-center gap-1.5">
            {featuredCount}
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            Pinned to product pages
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by farmer name, village, tractor model, or comment text..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Product Filter */}
        <div className="w-full md:w-56 shrink-0">
          <select
            value={productFilter}
            onChange={(e) => setProductFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium bg-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="all">All Implements ({products.length})</option>
            {products.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Rating Filter */}
        <div className="w-full md:w-36 shrink-0">
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium bg-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars ★★★★★</option>
            <option value="4">4 Stars ★★★★</option>
            <option value="3">3 Stars ★★★</option>
            <option value="2">2 Stars ★★</option>
            <option value="1">1 Star ★</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="w-full md:w-36 shrink-0">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium bg-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="all">All Statuses</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Review Cards Grid */}
      {filteredFeedbacks.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            No feedback found matching the filters
          </h3>
          <p className="text-xs text-slate-500">
            Try adjusting your search query, implement filter, or status filter.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-xs font-mono text-slate-500 px-1">
            Showing {filteredFeedbacks.length} of {totalCount} reviews
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredFeedbacks.map((fb) => {
              const isUpdating = updatingId === fb.id;
              const isReplying = replyingId === fb.id;

              return (
                <div
                  key={fb.id}
                  className={cn(
                    "bg-white rounded-2xl p-6 border transition-all shadow-xs space-y-5",
                    fb.status === "pending"
                      ? "border-amber-300 bg-amber-50/20"
                      : fb.status === "rejected"
                      ? "border-rose-200 opacity-60"
                      : "border-slate-200 hover:border-slate-300"
                  )}
                >
                  {/* Top Row: Farmer Profile, Product Tag, Status Badge */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 text-slate-800 font-bold font-display flex items-center justify-center text-sm shrink-0">
                        {fb.customerName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-slate-900 text-sm">
                            {fb.customerName}
                          </h3>
                          {fb.isVerifiedFarmer && (
                            <span className="inline-flex items-center gap-0.5 text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-bold">
                              <ShieldCheck className="w-3 h-3 text-emerald-600" />
                              VERIFIED FARMER
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-mono mt-0.5">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {fb.customerLocation}
                          </span>
                          {fb.customerPhone && (
                            <span className="flex items-center gap-1 text-slate-600">
                              <Phone className="w-3 h-3 text-slate-400" />
                              {fb.customerPhone}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {/* Product Link Badge */}
                      <Link
                        href={`/products/${fb.productSlug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-[11px] font-mono font-bold bg-[#10271D] text-white px-2.5 py-1 rounded-lg hover:bg-[#173B2C] transition-colors"
                      >
                        {fb.productName}
                        <ExternalLink className="w-3 h-3" />
                      </Link>

                      {/* Status Badge */}
                      <span
                        className={cn(
                          "px-2.5 py-1 rounded-lg text-xs font-mono font-bold border",
                          fb.status === "approved"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : fb.status === "pending"
                            ? "bg-amber-50 text-amber-800 border-amber-300 animate-pulse"
                            : "bg-rose-50 text-rose-800 border-rose-200"
                        )}
                      >
                        {fb.status.toUpperCase()}
                      </span>

                      {/* Featured Badge */}
                      {fb.isFeatured && (
                        <span className="px-2 py-1 rounded-lg text-xs font-mono font-bold bg-amber-500 text-white flex items-center gap-1 shadow-2xs">
                          <Sparkles className="w-3 h-3" />
                          FEATURED
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Middle Row: Ratings and Feedback Content */}
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-1 bg-amber-50/80 px-3 py-1 rounded-lg border border-amber-200">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={cn(
                              "w-4 h-4",
                              star <= fb.rating
                                ? "text-amber-500 fill-amber-500"
                                : "text-slate-300"
                            )}
                          />
                        ))}
                        <span className="text-xs font-mono font-bold text-amber-900 ml-1">
                          {fb.rating}.0 / 5.0
                        </span>
                      </div>

                      {/* Tractor & Field Specs */}
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-600">
                        {fb.tractorModel && (
                          <span className="bg-slate-100 px-2.5 py-1 rounded-md flex items-center gap-1">
                            <Tractor className="w-3.5 h-3.5 text-amber-600" />
                            {fb.tractorModel}
                          </span>
                        )}
                        {fb.soilType && (
                          <span className="bg-slate-100 px-2.5 py-1 rounded-md">
                            🌱 {fb.soilType.split("(")[0]}
                          </span>
                        )}
                        {fb.usageDuration && (
                          <span className="bg-slate-100 px-2.5 py-1 rounded-md">
                            ⏱️ {fb.usageDuration.split("(")[0]}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-900 text-base">
                        &ldquo;{fb.headline}&rdquo;
                      </h4>
                      <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line bg-slate-50/60 p-4 rounded-xl border border-slate-100">
                        {fb.comment}
                      </p>
                    </div>

                    {/* Tags */}
                    {fb.tags && fb.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {fb.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-100 text-slate-700 border border-slate-200"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Official Workshop Reply if existing */}
                    {fb.adminReply && !isReplying && (
                      <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-slate-800 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-amber-900 uppercase text-[10px] flex items-center gap-1">
                            <MessageCircle className="w-3.5 h-3.5 text-amber-700" />
                            Workshop Response Published:
                          </span>
                          <button
                            onClick={() => {
                              setReplyingId(fb.id);
                              setReplyText(fb.adminReply || "");
                            }}
                            className="text-[11px] font-mono text-amber-800 hover:underline cursor-pointer"
                          >
                            Edit Reply
                          </button>
                        </div>
                        <p className="italic text-slate-700">&ldquo;{fb.adminReply}&rdquo;</p>
                      </div>
                    )}

                    {/* Replying input box */}
                    {isReplying && (
                      <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-300 space-y-2">
                        <div className="text-xs font-mono font-bold text-amber-900 flex items-center gap-1">
                          <CornerDownRight className="w-3.5 h-3.5" />
                          Write Response from Sai Pooja Fabrication:
                        </div>
                        <textarea
                          rows={2}
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Thank the farmer or provide technical clarity..."
                          className="w-full p-2.5 rounded-lg border border-amber-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setReplyingId(null);
                              setReplyText("");
                            }}
                            className="px-3 py-1.5 rounded-lg text-xs font-mono text-slate-600 hover:bg-slate-200 cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSaveReply(fb.id)}
                            disabled={isUpdating}
                            className="px-4 py-1.5 rounded-lg text-xs font-mono font-bold bg-[#10271D] text-white hover:bg-[#173B2C] cursor-pointer flex items-center gap-1"
                          >
                            <Send className="w-3 h-3" />
                            Save Response
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Row: Moderation Toolbar */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="text-[11px] font-mono text-slate-400">
                      ID: {fb.id} • Submitted:{" "}
                      {new Date(fb.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {/* Reply Button */}
                      {!fb.adminReply && !isReplying && (
                        <button
                          onClick={() => {
                            setReplyingId(fb.id);
                            setReplyText("");
                          }}
                          className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium border border-slate-200 hover:bg-slate-50 text-slate-700 flex items-center gap-1 cursor-pointer"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-slate-500" />
                          Reply
                        </button>
                      )}

                      {/* Feature Toggle */}
                      <button
                        onClick={() => handleToggleFeatured(fb.id, fb.isFeatured)}
                        disabled={isUpdating}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-xs font-mono font-medium border flex items-center gap-1 cursor-pointer transition-colors",
                          fb.isFeatured
                            ? "bg-amber-50 text-amber-800 border-amber-300 font-bold"
                            : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                        )}
                      >
                        <Sparkles
                          className={cn(
                            "w-3.5 h-3.5",
                            fb.isFeatured ? "text-amber-600" : "text-slate-400"
                          )}
                        />
                        {fb.isFeatured ? "Featured" : "Feature"}
                      </button>

                      {/* Status Buttons */}
                      {fb.status !== "approved" && (
                        <button
                          onClick={() => handleStatusChange(fb.id, "approved")}
                          disabled={isUpdating}
                          className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1 shadow-2xs cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Approve
                        </button>
                      )}

                      {fb.status !== "rejected" && (
                        <button
                          onClick={() => handleStatusChange(fb.id, "rejected")}
                          disabled={isUpdating}
                          className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium border border-rose-200 text-rose-700 hover:bg-rose-50 flex items-center gap-1 cursor-pointer"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          Reject
                        </button>
                      )}

                      {/* Delete */}
                      <button
                        onClick={() => handleDeleteFeedback(fb.id)}
                        disabled={isUpdating}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete Review"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
