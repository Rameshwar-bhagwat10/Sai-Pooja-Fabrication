import * as React from "react";
import { getAllInquiries } from "@/lib/db";
import { AdminTopbar } from "@/components/admin/admin-topbar";
import { InquiriesManager } from "@/components/admin/inquiries-manager";

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
  const inquiries = await getAllInquiries();

  return (
    <div>
      <AdminTopbar
        title="Customer Inquiries & Leads"
        subtitle="Manage inbound tractor implement quotes, custom fabrication requests, and WhatsApp follow-ups."
      />

      <div className="p-6 sm:p-8 max-w-7xl mx-auto">
        <InquiriesManager initialInquiries={inquiries} />
      </div>
    </div>
  );
}
