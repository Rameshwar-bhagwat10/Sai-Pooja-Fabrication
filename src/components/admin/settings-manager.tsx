"use client";

import * as React from "react";
import {
  Save,
  MessageSquare,
  Clock,
  HelpCircle,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { type StoredSettings } from "@/lib/db";
import { type ContactFaqItem } from "@/types/contact";

interface SettingsManagerProps {
  initialSettings: StoredSettings;
}

export function SettingsManager({ initialSettings }: SettingsManagerProps) {
  const [company, setCompany] = React.useState(initialSettings.company);
  const [faqs, setFaqs] = React.useState<ContactFaqItem[]>(initialSettings.faqs);
  const [isSaving, setIsSaving] = React.useState(false);
  const [notification, setNotification] = React.useState<{ type: "success" | "error"; text: string } | null>(null);

  const showNotification = (type: "success" | "error", text: string) => {
    setNotification({ type, text });
    setTimeout(() => setNotification(null), 3500);
  };

  const handleCompanyChange = (field: string, val: string) => {
    setCompany((prev: any) => ({ ...prev, [field]: val }));
  };

  const handleAddressChange = (field: string, val: string) => {
    setCompany((prev: any) => ({
      ...prev,
      address: { ...prev.address, [field]: val },
    }));
  };

  const addFaq = () => {
    setFaqs([
      ...faqs,
      {
        id: `faq-${Date.now()}`,
        question: "",
        answer: "",
      },
    ]);
  };

  const updateFaq = (index: number, field: "question" | "answer", val: string) => {
    const updated = [...faqs];
    updated[index][field] = val;
    setFaqs(updated);
  };

  const removeFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company,
          faqs: faqs.filter((f) => f.question.trim() && f.answer.trim()),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save settings");
      }

      showNotification("success", "Company information & FAQs saved successfully.");
    } catch (err: any) {
      console.error("Settings save error:", err);
      showNotification("error", err.message || "Failed to save settings.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto pb-16">
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

      {/* Header with Save Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 font-mono uppercase">
            Site Settings & Contact Desk
          </h2>
          <p className="text-xs text-slate-500 font-mono">
            Manage official WhatsApp dispatch number, phone lines, workshop address, and customer FAQs.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold font-mono text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm shadow-amber-600/20 transition-all disabled:opacity-50 shrink-0 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? "Saving..." : "Save All Settings"}</span>
        </button>
      </div>

      {/* Section 1: Direct Communication Channels */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-base font-bold text-slate-900 font-mono uppercase tracking-wide flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <span>Direct Channels & WhatsApp Dispatch</span>
          </h3>
          <p className="text-xs text-slate-500">
            Updating the WhatsApp number instantly changes all inquiry buttons and floating WhatsApp chat on the live site.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">
              WhatsApp Business Number * (Digits only, including 91)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-700 font-mono text-xs font-bold">
                WA
              </span>
              <input
                type="text"
                value={company.whatsapp || ""}
                onChange={(e) => handleCompanyChange("whatsapp", e.target.value)}
                placeholder="919876543210"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm font-mono focus:outline-none focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/15"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1 font-mono">
              Format: <code className="text-emerald-700 font-bold">919876543210</code> (no + or spaces for WhatsApp web API compatibility)
            </p>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">
              Customer Calling Phone Number *
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-700 font-mono text-xs font-bold">
                TEL
              </span>
              <input
                type="text"
                value={company.phone || ""}
                onChange={(e) => handleCompanyChange("phone", e.target.value)}
                placeholder="+91 98765 43210"
                required
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm font-mono focus:outline-none focus:bg-white focus:border-amber-600 focus:ring-2 focus:ring-amber-500/15"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">
              Contact Email
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-xs">
                @
              </span>
              <input
                type="email"
                value={company.email || ""}
                onChange={(e) => handleCompanyChange("email", e.target.value)}
                placeholder="contact@saipoojafabrication.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm font-mono focus:outline-none focus:bg-white focus:border-amber-600 focus:ring-2 focus:ring-amber-500/15"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">
              Operating Hours
            </label>
            <div className="relative">
              <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={company.operatingHours || ""}
                onChange={(e) => handleCompanyChange("operatingHours", e.target.value)}
                placeholder="Monday - Saturday: 9:00 AM - 7:00 PM"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-amber-600 focus:ring-2 focus:ring-amber-500/15"
              />
            </div>
          </div>
        </div>

        {/* Address Fields */}
        <div className="pt-2 border-t border-slate-100 space-y-4">
          <label className="block text-xs font-mono font-bold text-slate-700 uppercase">
            Workshop & Fabrication Plant Address
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              value={company.address?.line1 || ""}
              onChange={(e) => handleAddressChange("line1", e.target.value)}
              placeholder="Street / Industrial Area"
              className="sm:col-span-2 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:bg-white focus:border-amber-600"
            />
            <input
              type="text"
              value={company.address?.city || ""}
              onChange={(e) => handleAddressChange("city", e.target.value)}
              placeholder="City / State"
              className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:bg-white focus:border-amber-600"
            />
          </div>
        </div>
      </div>

      {/* Section 2: FAQ Management */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-mono uppercase tracking-wide flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-700" />
              <span>Frequently Asked Questions (FAQs)</span>
            </h3>
            <p className="text-xs text-slate-500">Questions displayed on the contact and customer help desk.</p>
          </div>
          <button
            type="button"
            onClick={addFaq}
            className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-amber-800 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add FAQ</span>
          </button>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={faq.id || index} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) => updateFaq(index, "question", e.target.value)}
                  placeholder="Question (e.g. Can you fabricate custom toolbars for sugarcane?)"
                  className="flex-1 px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs font-bold focus:outline-none focus:border-amber-600"
                />
                <button
                  type="button"
                  onClick={() => removeFaq(index)}
                  className="p-2 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <textarea
                rows={2}
                value={faq.answer}
                onChange={(e) => updateFaq(index, "answer", e.target.value)}
                placeholder="Detailed answer for farmers and clients..."
                className="w-full p-3 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-amber-600"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Save Action */}
      <div className="flex justify-end pt-4 border-t border-slate-200">
        <button
          type="submit"
          disabled={isSaving}
          className="px-8 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold font-mono text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm shadow-amber-600/20 transition-all disabled:opacity-50 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? "Saving Settings..." : "Save All Changes"}</span>
        </button>
      </div>
    </form>
  );
}
