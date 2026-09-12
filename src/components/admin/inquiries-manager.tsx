"use client";

import * as React from "react";
import {
  Inbox,
  Search,
  MessageSquare,
  Phone,
  CheckCircle,
  AlertCircle,
  Trash2,
  Edit3,
} from "lucide-react";
import { type StoredInquiry, type InquiryStatus } from "@/lib/db";

interface InquiriesManagerProps {
  initialInquiries: StoredInquiry[];
}

const STATUS_CONFIG: Record<
  InquiryStatus,
  { label: string; bg: string; text: string; border: string }
> = {
  new: {
    label: "NEW LEAD",
    bg: "bg-emerald-50",
    text: "text-emerald-800",
    border: "border-emerald-300",
  },
  contacted: {
    label: "CONTACTED",
    bg: "bg-blue-50",
    text: "text-blue-800",
    border: "border-blue-300",
  },
  quotation_sent: {
    label: "QUOTATION SENT",
    bg: "bg-purple-50",
    text: "text-purple-800",
    border: "border-purple-300",
  },
  converted: {
    label: "CONVERTED / ORDERED",
    bg: "bg-amber-50",
    text: "text-amber-800",
    border: "border-amber-300",
  },
  closed: {
    label: "CLOSED",
    bg: "bg-slate-100",
    text: "text-slate-600",
    border: "border-slate-200",
  },
};

export function InquiriesManager({ initialInquiries }: InquiriesManagerProps) {
  const [inquiries, setInquiries] = React.useState<StoredInquiry[]>(initialInquiries);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [editingNotesId, setEditingNotesId] = React.useState<string | null>(null);
  const [notesText, setNotesText] = React.useState("");
  const [updatingId, setUpdatingId] = React.useState<string | null>(null);
  const [notification, setNotification] = React.useState<{ type: "success" | "error"; text: string } | null>(null);

  const showNotification = (type: "success" | "error", text: string) => {
    setNotification({ type, text });
    setTimeout(() => setNotification(null), 3500);
  };

  const handleStatusChange = async (id: string, newStatus: InquiryStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update status");
      }

      setInquiries((prev) =>
        prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
      );
      showNotification("success", `Lead status updated to ${STATUS_CONFIG[newStatus].label}.`);
    } catch (err: any) {
      console.error("Status update error:", err);
      showNotification("error", err.message || "Failed to update status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSaveNotes = async (id: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: notesText }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save notes");
      }

      setInquiries((prev) =>
        prev.map((inq) => (inq.id === id ? { ...inq, notes: notesText } : inq))
      );
      setEditingNotesId(null);
      showNotification("success", "Follow-up remarks saved.");
    } catch (err: any) {
      console.error("Notes save error:", err);
      showNotification("error", err.message || "Failed to save remarks.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string, customerName: string) => {
    if (!confirm(`Delete inquiry from ${customerName}?`)) return;

    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to delete");
      }

      setInquiries((prev) => prev.filter((inq) => inq.id !== id));
      showNotification("success", "Inquiry deleted successfully.");
    } catch (err: any) {
      console.error("Delete error:", err);
      showNotification("error", err.message || "Failed to delete inquiry.");
    }
  };

  // Filter inquiries
  const filtered = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.phone.includes(searchQuery) ||
      (inq.email && inq.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (inq.selectedProduct && inq.selectedProduct.toLowerCase().includes(searchQuery.toLowerCase())) ||
      inq.requirement.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || inq.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const countNew = inquiries.filter((i) => i.status === "new").length;
  const countContacted = inquiries.filter((i) => i.status === "contacted" || i.status === "quotation_sent").length;
  const countConverted = inquiries.filter((i) => i.status === "converted").length;

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

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-2xl font-black text-emerald-700 font-mono">{countNew}</div>
            <div className="text-xs text-slate-500 font-mono uppercase mt-0.5">New Leads (Pending)</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 font-mono font-bold text-xs">
            NEW
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-2xl font-black text-blue-700 font-mono">{countContacted}</div>
            <div className="text-xs text-slate-500 font-mono uppercase mt-0.5">In Progress / Quoted</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 font-mono font-bold text-xs">
            ACTIVE
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-2xl font-black text-amber-700 font-mono">{countConverted}</div>
            <div className="text-xs text-slate-500 font-mono uppercase mt-0.5">Converted Orders</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800 font-mono font-bold text-xs">
            WON
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads by customer, phone, implement..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-amber-600 focus:ring-2 focus:ring-amber-500/15 font-mono"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {[
            { id: "all", label: "All Leads" },
            { id: "new", label: "New" },
            { id: "contacted", label: "Contacted" },
            { id: "quotation_sent", label: "Quotation Sent" },
            { id: "converted", label: "Converted" },
            { id: "closed", label: "Closed" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all shrink-0 cursor-pointer ${
                statusFilter === tab.id
                  ? "bg-amber-600 text-white font-bold shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries Cards List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 shadow-xs">
            <Inbox className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <div className="text-slate-400 font-mono text-sm">No customer inquiries found.</div>
          </div>
        ) : (
          filtered.map((inq) => {
            const cleanPhone = inq.phone.replace(/[^0-9]/g, "");
            const whatsappMessage = encodeURIComponent(
              `Namaste ${inq.name}, Sai Pooja Fabrication received your inquiry for ${
                inq.selectedProduct || "agricultural implements"
              }. We are ready to assist you with specifications and factory pricing:`
            );
            const whatsappUrl = `https://wa.me/${cleanPhone}?text=${whatsappMessage}`;
            const statusStyle = STATUS_CONFIG[inq.status] || STATUS_CONFIG.new;

            return (
              <div
                key={inq.id}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all space-y-4 shadow-xs"
              >
                {/* Header: Customer Info & Status Selector */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-base font-black text-slate-900 font-mono">{inq.name}</span>
                      <span
                        className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}
                      >
                        {statusStyle.label}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 font-mono">
                      <span className="text-amber-700 font-bold">{inq.phone}</span>
                      {inq.email && <span>{inq.email}</span>}
                      <span className="text-slate-400">
                        {new Date(inq.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Right Actions: WhatsApp, Call, Status Dropdown */}
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-xs"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Chat on WhatsApp</span>
                    </a>

                    <a
                      href={`tel:${inq.phone}`}
                      className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-mono text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call</span>
                    </a>

                    <select
                      value={inq.status}
                      onChange={(e) => handleStatusChange(inq.id, e.target.value as InquiryStatus)}
                      disabled={updatingId === inq.id}
                      className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-800 font-mono text-xs focus:outline-none focus:border-amber-600"
                    >
                      <option value="new">Status: New</option>
                      <option value="contacted">Status: Contacted</option>
                      <option value="quotation_sent">Status: Quotation Sent</option>
                      <option value="converted">Status: Converted / Won</option>
                      <option value="closed">Status: Closed</option>
                    </select>

                    <button
                      onClick={() => handleDelete(inq.id, inq.name)}
                      className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 transition-colors cursor-pointer"
                      title="Delete Inquiry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Body: Requirements & Inquired Implement */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="md:col-span-2 space-y-2">
                    <div className="text-[11px] font-mono uppercase text-slate-500 font-bold tracking-wider">
                      Farmer Requirement & Details:
                    </div>
                    <p className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 leading-relaxed font-sans text-sm">
                      "{inq.requirement}"
                    </p>

                    {inq.additionalDetails && (
                      <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-700">
                        <span className="font-mono text-amber-700 text-[11px] font-bold block mb-0.5">Additional Notes:</span>
                        {inq.additionalDetails}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="text-[11px] font-mono uppercase text-slate-500 font-bold tracking-wider">
                      Selected Implement:
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <div className="font-bold text-slate-900 font-mono text-sm">
                        {inq.selectedProduct || "General Fabrication Inquiry"}
                      </div>
                      <div className="text-[11px] font-mono text-amber-800 uppercase font-medium">
                        Type: {inq.inquiryType}
                      </div>
                    </div>

                    {/* Follow-up Notes Section */}
                    <div className="pt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-mono text-slate-500 font-bold uppercase">
                          Internal Follow-up Log:
                        </span>
                        {editingNotesId !== inq.id && (
                          <button
                            onClick={() => {
                              setEditingNotesId(inq.id);
                              setNotesText(inq.notes || "");
                            }}
                            className="text-[11px] text-amber-700 hover:underline font-mono font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>{inq.notes ? "Edit Note" : "+ Add Note"}</span>
                          </button>
                        )}
                      </div>

                      {editingNotesId === inq.id ? (
                        <div className="space-y-2">
                          <textarea
                            rows={2}
                            value={notesText}
                            onChange={(e) => setNotesText(e.target.value)}
                            placeholder="e.g. Quoted ₹1,45,000 ex-works. Farmer visiting workshop Friday..."
                            className="w-full p-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-amber-600"
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setEditingNotesId(null)}
                              className="px-2.5 py-1 rounded bg-slate-100 text-slate-600 text-xs font-mono cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleSaveNotes(inq.id)}
                              className="px-2.5 py-1 rounded bg-amber-600 text-white text-xs font-mono font-bold cursor-pointer"
                            >
                              Save Note
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-[11px] text-slate-600 italic bg-slate-50 p-2 rounded-lg border border-slate-200">
                          {inq.notes ? inq.notes : "No internal notes recorded yet."}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
