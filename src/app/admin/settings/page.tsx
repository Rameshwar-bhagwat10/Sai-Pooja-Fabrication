import * as React from "react";
import { getSiteSettings } from "@/lib/db";
import { AdminTopbar } from "@/components/admin/admin-topbar";
import { SettingsManager } from "@/components/admin/settings-manager";

export const dynamic = "force-dynamic";

export default function AdminSettingsPage() {
  const settings = getSiteSettings();

  return (
    <div>
      <AdminTopbar
        title="Settings & Business Communication"
        subtitle="Manage official WhatsApp lead routing, workshop calling lines, physical plant address, and FAQs."
      />

      <div className="p-6 sm:p-8 max-w-7xl mx-auto">
        <SettingsManager initialSettings={settings} />
      </div>
    </div>
  );
}
