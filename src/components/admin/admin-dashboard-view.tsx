"use client";

import * as React from "react";
import Link from "next/link";
import {
  Package,
  Inbox,
  Image as ImageIcon,
  MessageSquare,
  Plus,
  ArrowRight,
  Phone,
} from "lucide-react";
import { type ProductItem } from "@/types/product";
import { type StoredInquiry, type StoredSettings } from "@/lib/db";
import { type GalleryItem } from "@/types/gallery";
import { AdminTopbar } from "@/components/admin/admin-topbar";

interface AdminDashboardViewProps {
  products: ProductItem[];
  inquiries: StoredInquiry[];
  galleryItems: GalleryItem[];
  settings: StoredSettings;
}

export function AdminDashboardView({
  products,
  inquiries,
  galleryItems,
  settings,
}: AdminDashboardViewProps) {
  const newInquiries = inquiries.filter((inq) => inq.status === "new");
  const recentInquiries = inquiries.slice(0, 5);
  const featuredProducts = products.filter((p) => p.isFeatured);

  return (
    <div>
      <AdminTopbar
        title="Command Dashboard"
        subtitle="Overview of agricultural equipment catalogue, farmer inquiries, and showroom media."
        action={{
          label: "Add Product",
          href: "/admin/products/new",
        }}
      />

      <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* 1. Products */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs relative overflow-hidden group hover:border-amber-500/60 hover:shadow-sm transition-all">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                <Package className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                {featuredProducts.length} Featured
              </span>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-black text-slate-900 font-mono">{products.length}</div>
              <div className="text-xs text-slate-500 font-mono uppercase tracking-wider mt-1">
                Catalogue Implements
              </div>
            </div>
            <Link
              href="/admin/products"
              className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-amber-700 hover:text-amber-800 hover:underline font-mono font-bold"
            >
              <span>Manage Catalogue</span>
              <span>→</span>
            </Link>
          </div>

          {/* 2. Inquiries */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs relative overflow-hidden group hover:border-emerald-500/60 hover:shadow-sm transition-all">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                <Inbox className="w-6 h-6" />
              </div>
              {newInquiries.length > 0 && (
                <span className="text-[11px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800">
                  {newInquiries.length} New Leads
                </span>
              )}
            </div>
            <div className="mt-4">
              <div className="text-3xl font-black text-slate-900 font-mono">{inquiries.length}</div>
              <div className="text-xs text-slate-500 font-mono uppercase tracking-wider mt-1">
                Total Inquiries & Leads
              </div>
            </div>
            <Link
              href="/admin/inquiries"
              className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 hover:text-emerald-800 hover:underline font-mono font-bold"
            >
              <span>Review Leads Pipeline</span>
              <span>→</span>
            </Link>
          </div>

          {/* 3. Gallery Media */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs relative overflow-hidden group hover:border-blue-500/60 hover:shadow-sm transition-all">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
                <ImageIcon className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                Showroom
              </span>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-black text-slate-900 font-mono">{galleryItems.length}</div>
              <div className="text-xs text-slate-500 font-mono uppercase tracking-wider mt-1">
                Showcase Photographs
              </div>
            </div>
            <Link
              href="/admin/gallery"
              className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-700 hover:text-blue-800 hover:underline font-mono font-bold"
            >
              <span>Manage Showroom Media</span>
              <span>→</span>
            </Link>
          </div>

          {/* 4. WhatsApp Direct Lead Channel */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs relative overflow-hidden group hover:border-amber-500/60 hover:shadow-sm transition-all">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                <MessageSquare className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold">
                Active Desk
              </span>
            </div>
            <div className="mt-4">
              <div className="text-sm font-bold text-slate-900 font-mono truncate">
                {settings.company.whatsapp || settings.company.phone}
              </div>
              <div className="text-xs text-slate-500 font-mono uppercase tracking-wider mt-1">
                WhatsApp Lead Routing
              </div>
            </div>
            <Link
              href="/admin/settings"
              className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-amber-700 hover:text-amber-800 hover:underline font-mono font-bold"
            >
              <span>Update Contact Config</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Two-Column Grid: Recent Inquiries & Catalogue Quick List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Recent Leads / Inquiries */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900 uppercase font-mono tracking-wide">
                  Recent Farmer Inquiries
                </h2>
                {newInquiries.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-mono font-bold">
                    {newInquiries.length} UNREAD
                  </span>
                )}
              </div>
              <Link
                href="/admin/inquiries"
                className="text-xs text-amber-700 hover:text-amber-800 hover:underline font-mono font-bold flex items-center gap-1"
              >
                <span>View All Inquiries</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden divide-y divide-slate-100">
              {recentInquiries.length === 0 ? (
                <div className="p-8 text-center text-sm text-slate-500 font-mono">
                  No inquiries received yet. Form submissions from the website will appear here.
                </div>
              ) : (
                recentInquiries.map((inq) => {
                  const cleanPhone = inq.phone.replace(/[^0-9]/g, "");
                  const whatsappMessage = encodeURIComponent(
                    `Namaste ${inq.name}, regarding your inquiry for ${inq.selectedProduct || "agricultural implements"} at Sai Pooja Fabrication:`
                  );
                  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${whatsappMessage}`;

                  return (
                    <div key={inq.id} className="p-5 hover:bg-slate-50/70 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2.5">
                            <span className="font-bold text-slate-900 text-sm">{inq.name}</span>
                            <span
                              className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full font-bold ${
                                inq.status === "new"
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                  : inq.status === "contacted"
                                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                                  : inq.status === "quotation_sent"
                                  ? "bg-purple-50 text-purple-700 border border-purple-200"
                                  : "bg-slate-100 text-slate-700 border border-slate-200"
                              }`}
                            >
                              {inq.status.replace("_", " ")}
                            </span>
                          </div>

                          <div className="text-xs text-slate-500 flex items-center gap-3">
                            <span className="text-amber-700 font-mono font-bold">{inq.phone}</span>
                            {inq.selectedProduct && (
                              <>
                                <span>•</span>
                                <span className="text-slate-700 font-medium truncate max-w-xs">
                                  {inq.selectedProduct}
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>

                          <a
                            href={`tel:${inq.phone}`}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
                            title="Call customer"
                          >
                            <Phone className="w-4 h-4" />
                          </a>
                        </div>
                      </div>

                      <p className="mt-3 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
                        "{inq.requirement}"
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Col: Quick Actions & Top Products */}
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900 uppercase font-mono tracking-wide mb-4">
                Fast Actions
              </h2>

              <div className="space-y-2.5">
                <Link
                  href="/admin/products/new"
                  className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between text-slate-900 hover:border-amber-500/80 hover:bg-amber-50/30 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold shadow-xs">
                      <Plus className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold font-mono">ADD NEW IMPLEMENT</div>
                      <div className="text-xs text-slate-500">Create catalogue entry with specs</div>
                    </div>
                  </div>
                  <span className="text-amber-700 font-mono font-bold group-hover:translate-x-1 transition-transform">→</span>
                </Link>

                <Link
                  href="/admin/gallery"
                  className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between text-slate-900 hover:border-blue-500/80 hover:bg-blue-50/30 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 border border-blue-200 flex items-center justify-center">
                      <ImageIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold font-mono">UPLOAD TO SHOWROOM</div>
                      <div className="text-xs text-slate-500">Add workshop & field photos</div>
                    </div>
                  </div>
                  <span className="text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
                </Link>

                <Link
                  href="/admin/settings"
                  className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between text-slate-900 hover:border-emerald-500/80 hover:bg-emerald-50/30 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center justify-center">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold font-mono">UPDATE WHATSAPP / CONTACT</div>
                      <div className="text-xs text-slate-500">Manage direct phone & FAQs</div>
                    </div>
                  </div>
                  <span className="text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>

            {/* Featured Equipment List */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-slate-900 uppercase font-mono tracking-wide">
                  Spotlight Equipment
                </h2>
                <Link
                  href="/admin/products"
                  className="text-xs text-amber-700 hover:text-amber-800 hover:underline font-mono font-bold"
                >
                  View All
                </Link>
              </div>

              <div className="rounded-2xl bg-white border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
                {products.slice(0, 4).map((prod) => (
                  <div key={prod.id} className="p-3.5 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-slate-900 truncate">{prod.name}</div>
                      <div className="text-xs text-slate-500 font-mono truncate">
                        {prod.suitableForTractorHp || prod.categoryName}
                      </div>
                    </div>

                    <Link
                      href={`/admin/products/${prod.id}/edit`}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-50 hover:text-amber-800 text-slate-700 text-xs font-mono shrink-0 font-medium transition-colors"
                    >
                      Edit
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
