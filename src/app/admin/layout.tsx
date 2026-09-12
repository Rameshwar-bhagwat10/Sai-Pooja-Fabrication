import * as React from "react";
import { type Metadata } from "next";
import { AdminLayoutClient } from "@/components/admin/admin-layout-client";

export const metadata: Metadata = {
  title: "Admin Portal | Sai Pooja Fabrication",
  description: "Manage agricultural implements, inquiries, gallery media, and workshop settings.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
