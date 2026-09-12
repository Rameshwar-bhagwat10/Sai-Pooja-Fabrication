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
  Package,
  Phone,
  Mail,
  MapPin,
  Wrench,
  Layers,
  Sparkles,
} from "lucide-react";
import { type StoredSettings } from "@/lib/db";
import { type ContactFaqItem } from "@/types/contact";
import { type FabricationCapability } from "@/data/capabilities";
import { type FabricationProcessStep } from "@/data/fabrication-process";

interface SettingsManagerProps {
  initialSettings: StoredSettings;
  initialCapabilities?: FabricationCapability[];
  initialSteps?: FabricationProcessStep[];
}

export function SettingsManager({
  initialSettings,
  initialCapabilities = [],
  initialSteps = [],
}: SettingsManagerProps) {
  const [activeTab, setActiveTab] = React.useState<"company" | "faqs" | "capabilities">("company");

  // Company State
  const [company, setCompany] = React.useState(initialSettings.company);
  // FAQs State
  const [faqs, setFaqs] = React.useState<ContactFaqItem[]>(initialSettings.faqs);
  // Capabilities State
  const [capabilities, setCapabilities] = React.useState<FabricationCapability[]>(initialCapabilities);
  // Process Steps State
  const [steps, setSteps] = React.useState<FabricationProcessStep[]>(initialSteps);

  const [isSaving, setIsSaving] = React.useState(false);
  const [savingEntityId, setSavingEntityId] = React.useState<string | null>(null);
  const [notification, setNotification] = React.useState<{ type: "success" | "error"; text: string } | null>(null);

  const showNotification = (type: "success" | "error", text: string) => {
    setNotification({ type, text });
    setTimeout(() => setNotification(null), 3500);
  };

  // Company handlers
  const handleCompanyChange = (field: string, val: string) => {
    setCompany((prev: any) => ({ ...prev, [field]: val }));
  };

  const handleAddressChange = (field: string, val: string) => {
    setCompany((prev: any) => ({
      ...prev,
      address: { ...prev.address, [field]: val },
    }));
  };

  // FAQ handlers
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

  // Capability handlers
  const updateCapability = (index: number, field: keyof FabricationCapability, val: any) => {
    const updated = [...capabilities];
    updated[index] = { ...updated[index], [field]: val };
    setCapabilities(updated);
  };

  const addCapabilityHighlight = (capIndex: number) => {
    const updated = [...capabilities];
    const currentHighlights = updated[capIndex].keyHighlights || [];
    updated[capIndex].keyHighlights = [...currentHighlights, ""];
    setCapabilities(updated);
  };

  const updateCapabilityHighlight = (capIndex: number, hlIndex: number, val: string) => {
    const updated = [...capabilities];
    const currentHighlights = [...(updated[capIndex].keyHighlights || [])];
    currentHighlights[hlIndex] = val;
    updated[capIndex].keyHighlights = currentHighlights;
    setCapabilities(updated);
  };

  const removeCapabilityHighlight = (capIndex: number, hlIndex: number) => {
    const updated = [...capabilities];
    const currentHighlights = [...(updated[capIndex].keyHighlights || [])];
    currentHighlights.splice(hlIndex, 1);
    updated[capIndex].keyHighlights = currentHighlights;
    setCapabilities(updated);
  };

  const handleSaveCapability = async (cap: FabricationCapability) => {
    setSavingEntityId(cap.id);
    try {
      const res = await fetch(`/api/capabilities/${cap.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cap),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update capability");
      }
      showNotification("success", `Capability "${cap.title}" updated in database.`);
    } catch (err: any) {
      console.error("Capability update error:", err);
      showNotification("error", err.message || "Failed to update capability.");
    } finally {
      setSavingEntityId(null);
    }
  };

  // Process Step handlers
  const updateStep = (index: number, field: keyof FabricationProcessStep, val: string) => {
    const updated = [...steps];
    updated[index] = { ...updated[index], [field]: val };
    setSteps(updated);
  };

  const handleSaveStep = async (step: FabricationProcessStep) => {
    setSavingEntityId(`step-${step.step}`);
    try {
      const res = await fetch("/api/fabrication-process", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(step),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update process step");
      }
      showNotification("success", `Stage ${step.step} (${step.title}) updated in database.`);
    } catch (err: any) {
      console.error("Step update error:", err);
      showNotification("error", err.message || "Failed to update process step.");
    } finally {
      setSavingEntityId(null);
    }
  };

  // Save Settings & FAQs
  const handleSaveSettings = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
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

      showNotification("success", "Company profile & FAQs saved to Supabase.");
    } catch (err: any) {
      console.error("Settings save error:", err);
      showNotification("error", err.message || "Failed to save settings.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`p-4 rounded-xl border flex items-center gap-3 text-sm font-mono transition-all fixed top-4 right-4 z-50 shadow-xl ${
            notification.type === "success"
              ? "bg-emerald-50 border-emerald-300 text-emerald-800"
              : "bg-rose-50 border-rose-300 text-rose-800"
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

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab("company")}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === "company"
              ? "bg-amber-600 text-white shadow-sm shadow-amber-600/20"
              : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Company & Contact Profile</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("faqs")}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === "faqs"
              ? "bg-amber-600 text-white shadow-sm shadow-amber-600/20"
              : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Customer Helpdesk FAQs</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-700">
            {faqs.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("capabilities")}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === "capabilities"
              ? "bg-amber-600 text-white shadow-sm shadow-amber-600/20"
              : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>Capabilities & Fabrication Process</span>
        </button>
      </div>

      {/* TAB 1: COMPANY PROFILE & CONTACT */}
      {activeTab === "company" && (
        <form onSubmit={handleSaveSettings} className="space-y-8">
          {/* Section 1: Company Profile & Brand Messaging */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-mono uppercase tracking-wide flex items-center gap-2">
                  <Package className="w-4 h-4 text-amber-600" />
                  <span>Company Profile & Brand Identity</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Update company name, tagline, description, and engineering philosophy shown on marketing pages.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold font-mono text-xs uppercase tracking-wider flex items-center gap-2 shadow-xs transition-all disabled:opacity-50 shrink-0 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? "Saving..." : "Save Settings"}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">
                  Brand Display Name *
                </label>
                <input
                  type="text"
                  value={company.name || ""}
                  onChange={(e) => handleCompanyChange("name", e.target.value)}
                  placeholder="Sai Pooja Fabrication"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-bold focus:outline-none focus:bg-white focus:border-amber-600 focus:ring-2 focus:ring-amber-500/15"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">
                  Legal Business Name *
                </label>
                <input
                  type="text"
                  value={company.legalName || ""}
                  onChange={(e) => handleCompanyChange("legalName", e.target.value)}
                  placeholder="Sai Pooja Fabrication Works"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:bg-white focus:border-amber-600 focus:ring-2 focus:ring-amber-500/15"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">
                  Tagline / Brand Slogan
                </label>
                <input
                  type="text"
                  value={company.tagline || ""}
                  onChange={(e) => handleCompanyChange("tagline", e.target.value)}
                  placeholder="Agricultural Implements & Heavy Fabrication Engineering"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:bg-white focus:border-amber-600 focus:ring-2 focus:ring-amber-500/15"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">
                  Short Summary (Used in Meta & Footers)
                </label>
                <textarea
                  rows={2}
                  value={company.shortDescription || ""}
                  onChange={(e) => handleCompanyChange("shortDescription", e.target.value)}
                  placeholder="Specialists in durable agricultural machinery, tractor-mounted implements..."
                  className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:bg-white focus:border-amber-600"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">
                  Detailed Company Overview (About Us Editorial)
                </label>
                <textarea
                  rows={3}
                  value={company.longDescription || ""}
                  onChange={(e) => handleCompanyChange("longDescription", e.target.value)}
                  placeholder="Sai Pooja Fabrication manufactures high-strength agricultural implements..."
                  className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:bg-white focus:border-amber-600"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">
                  Engineering & Manufacturing Philosophy
                </label>
                <textarea
                  rows={3}
                  value={company.philosophy || ""}
                  onChange={(e) => handleCompanyChange("philosophy", e.target.value)}
                  placeholder="We believe agricultural machinery should be built with the structural resilience of industrial equipment..."
                  className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:bg-white focus:border-amber-600"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Direct Channels & WhatsApp Routing */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-base font-bold text-slate-900 font-mono uppercase tracking-wide flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Direct Lead Routing & Communication Channels</span>
              </h3>
              <p className="text-xs text-slate-500">
                Updating the WhatsApp number instantly changes all WhatsApp quote triggers and live chat buttons.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">
                  WhatsApp Business Number * (Digits only, e.g. 919876543210)
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
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">
                  Customer Calling Phone Line *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={company.phone || ""}
                    onChange={(e) => handleCompanyChange("phone", e.target.value)}
                    placeholder="+91 98765 43210"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm font-mono focus:outline-none focus:bg-white focus:border-amber-600 focus:ring-2 focus:ring-amber-500/15"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">
                  Official Contact Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
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
                  Operating Workshop Hours
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

            {/* Address */}
            <div className="pt-2 border-t border-slate-100 space-y-4">
              <label className="block text-xs font-mono font-bold text-slate-700 uppercase">
                Workshop & Plant Location Address
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  type="text"
                  value={company.address?.line1 || ""}
                  onChange={(e) => handleAddressChange("line1", e.target.value)}
                  placeholder="Street / Industrial Area"
                  className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:bg-white focus:border-amber-600"
                />
                <input
                  type="text"
                  value={company.address?.city || ""}
                  onChange={(e) => handleAddressChange("city", e.target.value)}
                  placeholder="City / State"
                  className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:bg-white focus:border-amber-600"
                />
                <input
                  type="text"
                  value={company.address?.country || ""}
                  onChange={(e) => handleAddressChange("country", e.target.value)}
                  placeholder="Country (e.g. India)"
                  className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:bg-white focus:border-amber-600"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="px-8 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold font-mono text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm shadow-amber-600/20 transition-all disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Saving Settings..." : "Save All Company Settings"}</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: CUSTOMER FAQS */}
      {activeTab === "faqs" && (
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-mono uppercase tracking-wide flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-700" />
                <span>Frequently Asked Questions (FAQs)</span>
              </h3>
              <p className="text-xs text-slate-500">
                Questions shown on the public Contact and Helpdesk pages.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={addFaq}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-amber-800 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Question</span>
              </button>
              <button
                type="button"
                onClick={() => handleSaveSettings()}
                disabled={isSaving}
                className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold font-mono text-xs uppercase tracking-wider flex items-center gap-2 shadow-xs transition-all disabled:opacity-50 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? "Saving..." : "Save FAQs"}</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={faq.id || index}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>
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
                    title="Delete question"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={faq.answer}
                  onChange={(e) => updateFaq(index, "answer", e.target.value)}
                  placeholder="Detailed answer for farmers and clients..."
                  className="w-full p-3 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-amber-600 font-sans"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CAPABILITIES & FABRICATION PROCESS */}
      {activeTab === "capabilities" && (
        <div className="space-y-8">
          {/* 1. Core Fabrication Capabilities */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-base font-bold text-slate-900 font-mono uppercase tracking-wide flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-600" />
                <span>Manufacturing & Fabrication Capabilities</span>
              </h3>
              <p className="text-xs text-slate-500">
                Core engineering capabilities shown in the interactive capability matrix on the Fabrication page.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {capabilities.map((cap, capIndex) => (
                <div
                  key={cap.id}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2 py-0.5 rounded bg-amber-500 text-white font-mono text-[10px] font-bold">
                        CAPABILITY {cap.number}
                      </span>
                      <input
                        type="text"
                        value={cap.categoryTag}
                        onChange={(e) =>
                          updateCapability(capIndex, "categoryTag", e.target.value)
                        }
                        placeholder="Tag (e.g. PRIMARY IMPLEMENTS)"
                        className="px-2 py-1 rounded text-[10px] font-mono font-bold bg-white border border-slate-200 text-slate-700"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase font-bold text-slate-500 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={cap.title}
                        onChange={(e) =>
                          updateCapability(capIndex, "title", e.target.value)
                        }
                        className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-600"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase font-bold text-slate-500 mb-1">
                        Short Summary
                      </label>
                      <textarea
                        rows={2}
                        value={cap.shortDescription}
                        onChange={(e) =>
                          updateCapability(capIndex, "shortDescription", e.target.value)
                        }
                        className="w-full p-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-amber-600"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase font-bold text-slate-500 mb-1">
                        Detailed Engineering Description
                      </label>
                      <textarea
                        rows={3}
                        value={cap.detailedDescription}
                        onChange={(e) =>
                          updateCapability(capIndex, "detailedDescription", e.target.value)
                        }
                        className="w-full p-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-amber-600"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase font-bold text-slate-500 mb-1">
                        Image URL
                      </label>
                      <input
                        type="text"
                        value={cap.image}
                        onChange={(e) =>
                          updateCapability(capIndex, "image", e.target.value)
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-mono text-slate-600"
                      />
                    </div>

                    {/* Key Highlights */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-mono uppercase font-bold text-slate-500">
                          Highlights / Bullet Points
                        </label>
                        <button
                          type="button"
                          onClick={() => addCapabilityHighlight(capIndex)}
                          className="text-[10px] text-amber-700 hover:underline font-mono font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add</span>
                        </button>
                      </div>
                      {(cap.keyHighlights || []).map((hl, hlIdx) => (
                        <div key={hlIdx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={hl}
                            onChange={(e) =>
                              updateCapabilityHighlight(capIndex, hlIdx, e.target.value)
                            }
                            placeholder="e.g. High-tensile boron steel wear parts"
                            className="flex-1 px-2.5 py-1 rounded bg-white border border-slate-200 text-[11px] text-slate-800"
                          />
                          <button
                            type="button"
                            onClick={() => removeCapabilityHighlight(capIndex, hlIdx)}
                            className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200/80 flex justify-end">
                    <button
                      type="button"
                      disabled={savingEntityId === cap.id}
                      onClick={() => handleSaveCapability(cap)}
                      className="px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 disabled:opacity-50 cursor-pointer shadow-xs"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{savingEntityId === cap.id ? "Saving..." : "Save Capability"}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. 5-Stage Fabrication Process Timeline */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-base font-bold text-slate-900 font-mono uppercase tracking-wide flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>5-Stage Fabrication Process Timeline</span>
              </h3>
              <p className="text-xs text-slate-500">
                Timeline steps displayed on the Fabrication page showing client workflow from requirement to field delivery.
              </p>
            </div>

            <div className="space-y-4">
              {steps.map((step, stepIndex) => (
                <div
                  key={step.step}
                  className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center">
                        {step.step}
                      </span>
                      <input
                        type="text"
                        value={step.title}
                        onChange={(e) => updateStep(stepIndex, "title", e.target.value)}
                        placeholder="Stage Title"
                        className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-600"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={step.tag}
                        onChange={(e) => updateStep(stepIndex, "tag", e.target.value)}
                        placeholder="Tag (e.g. ANALYSIS)"
                        className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-white border border-slate-200 text-amber-800"
                      />
                      <button
                        type="button"
                        disabled={savingEntityId === `step-${step.step}`}
                        onClick={() => handleSaveStep(step)}
                        className="px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold font-mono text-xs uppercase flex items-center gap-1.5 disabled:opacity-50 cursor-pointer shadow-xs"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>
                          {savingEntityId === `step-${step.step}` ? "Saving..." : "Save Step"}
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-[10px] font-mono uppercase font-bold text-slate-500 mb-1">
                        Short Summary
                      </label>
                      <textarea
                        rows={2}
                        value={step.shortDescription}
                        onChange={(e) =>
                          updateStep(stepIndex, "shortDescription", e.target.value)
                        }
                        className="w-full p-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-amber-600"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase font-bold text-slate-500 mb-1">
                        Detailed Process Description
                      </label>
                      <textarea
                        rows={2}
                        value={step.detailedDescription}
                        onChange={(e) =>
                          updateStep(stepIndex, "detailedDescription", e.target.value)
                        }
                        className="w-full p-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-amber-600"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
