import * as React from "react";
import { type Metadata } from "next";
import Link from "next/link";
import {
  MessageSquareQuote,
  Star,
  CheckCircle,
  Tractor,
  ShieldCheck,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { getAllProducts, getSiteSettings, getAllFeedbacks } from "@/lib/db";
import { constructMetadata } from "@/lib/metadata";
import { ProductFeedbackForm } from "@/components/feedback/product-feedback-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = constructMetadata({
  title: "Share Product Feedback & Farmer Review | Sai Pooja Fabrication",
  description:
    "Share your verified field experience and review agricultural tractor implements manufactured by Sai Pooja Fabrication.",
  canonical: "/feedback",
});

interface FeedbackPageProps {
  searchParams: Promise<{ product?: string }>;
}

export default async function FeedbackPage({ searchParams }: FeedbackPageProps) {
  const { product: productParam } = await searchParams;
  const [products, settings, recentFeedbacks] = await Promise.all([
    getAllProducts(),
    getSiteSettings(),
    getAllFeedbacks({ status: "approved" }),
  ]);

  const selectedProduct = products.find((p) => p.slug === productParam);

  return (
    <div className="min-h-screen bg-[#FAFAF7] pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-mono text-slate-500">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/products" className="hover:text-slate-900 transition-colors">
            Products
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">Feedback & Reviews</span>
        </nav>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-mono font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            FIELD-TESTED PROOF & OPERATOR VOICES
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-display">
            Share Your Field Experience & Product Feedback
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans">
            Every tractor implement built at{" "}
            <strong className="text-slate-900">Sai Pooja Fabrication</strong> is engineered
            to withstand rugged soil conditions. Tell us how your implement performed
            behind your tractor.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs font-mono text-slate-600">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              100% Genuine Farmer Reviews
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              Direct Review Visibility
            </span>
            <span className="flex items-center gap-1.5">
              <Tractor className="w-4 h-4 text-amber-700" />
              Engineering Insights
            </span>
          </div>
        </div>

        {/* Interactive Feedback Form */}
        <ProductFeedbackForm
          products={products}
          initialProductSlug={selectedProduct?.slug || products[0]?.slug}
          whatsappNumber={settings.company.whatsapp}
        />

        {/* Recent Farmer Highlights Grid */}
        {recentFeedbacks.length > 0 && (
          <div className="pt-12 border-t border-slate-200/80 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                  Recent Verified Farmer Testimonials
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Hear directly from tractor owners operating in Maharashtra.
                </p>
              </div>

              <Link
                href="/products"
                className="text-xs font-mono font-bold text-amber-800 hover:text-amber-900 inline-flex items-center gap-1"
              >
                Explore Implements Catalog →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentFeedbacks.slice(0, 3).map((fb) => (
                <div
                  key={fb.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-4 h-4 ${
                              s <= fb.rating
                                ? "text-amber-500 fill-amber-500"
                                : "text-slate-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                        VERIFIED
                      </span>
                    </div>

                    <div className="text-xs font-mono font-bold text-amber-900 uppercase">
                      {fb.productName}
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm leading-snug">
                      &ldquo;{fb.headline}&rdquo;
                    </h4>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {fb.comment}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <div>
                      <span className="font-bold text-slate-900 block">
                        {fb.customerName}
                      </span>
                      <span className="text-[10px]">{fb.customerLocation}</span>
                    </div>
                    {fb.tractorModel && (
                      <span className="font-mono text-[10px] text-slate-600 bg-slate-100 px-2 py-1 rounded">
                        {fb.tractorModel.split("(")[0]}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
