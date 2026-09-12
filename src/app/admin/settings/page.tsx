import * as React from "react";
import { getSiteSettings, getAllCapabilities, getAllFabricationSteps } from "@/lib/db";
import { AdminTopbar } from "@/components/admin/admin-topbar";
import { SettingsManager } from "@/components/admin/settings-manager";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const [settings, capabilities, processSteps] = await Promise.all([
    getSiteSettings(),
    getAllCapabilities(),
    getAllFabricationSteps(),
  ]);

  return (
    <div>
      <AdminTopbar
        title="Settings & Content Management"
        subtitle="Manage brand identity, contact lead routing, customer FAQs, and fabrication engineering specs."
      />

      <div className="p-6 sm:p-8 max-w-7xl mx-auto">
        <SettingsManager
          initialSettings={settings}
          initialCapabilities={capabilities}
          initialSteps={processSteps}
        />
      </div>
    </div>
  );
}
