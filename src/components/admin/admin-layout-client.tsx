"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminSidebar } from "./admin-sidebar";

interface AdminLayoutClientProps {
  children: React.ReactNode;
}

export function AdminLayoutClient({ children }: AdminLayoutClientProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";

  const [isLoadingAuth, setIsLoadingAuth] = React.useState(!isLoginPage);
  const [unreadCount, setUnreadCount] = React.useState(0);

  // Check authentication if not on login page
  React.useEffect(() => {
    if (isLoginPage) return;

    let isMounted = true;
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (!data.authenticated) {
          router.push("/admin/login");
        } else {
          if (isMounted) setIsLoadingAuth(false);
          // Fetch unread inquiries
          fetchInquiriesCount();
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        router.push("/admin/login");
      }
    }

    async function fetchInquiriesCount() {
      try {
        const res = await fetch("/api/inquiries");
        const data = await res.json();
        if (data.success && Array.isArray(data.inquiries)) {
          const unread = data.inquiries.filter((inq: any) => inq.status === "new").length;
          if (isMounted) setUnreadCount(unread);
        }
      } catch (err) {
        // Silently ignore
      }
    }

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [pathname, isLoginPage, router]);

  // If on login page, render children directly without admin shell
  if (isLoginPage) {
    return <div className="min-h-screen bg-slate-50 text-slate-900">{children}</div>;
  }

  // Loading spinner while checking session
  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-700 flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 rounded-xl border-2 border-amber-600 border-t-transparent animate-spin" />
        <p className="text-xs font-mono tracking-widest text-slate-500 uppercase">
          Verifying Admin Credentials...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      {/* Sidebar navigation */}
      <AdminSidebar unreadCount={unreadCount} />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0 pt-14 lg:pt-0">
        <main className="flex-1 pb-16">{children}</main>
      </div>
    </div>
  );
}
