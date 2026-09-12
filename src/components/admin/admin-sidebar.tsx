"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Inbox,
  Image as ImageIcon,
  Settings,
  ExternalLink,
  LogOut,
  ShieldCheck,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  unreadCount?: number;
}

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products / Implements", href: "/admin/products", icon: Package },
  { label: "Inquiries & Leads", href: "/admin/inquiries", icon: Inbox, hasBadge: true },
  { label: "Gallery Showcase", href: "/admin/gallery", icon: ImageIcon },
  { label: "Company & FAQs", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar({ unreadCount = 0 }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  // Close sidebar on navigation on mobile
  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white font-bold text-sm font-mono shadow-sm">
            SP
          </div>
          <div>
            <div className="text-slate-900 font-bold text-sm leading-tight">SAI POOJA</div>
            <div className="text-amber-700 text-[10px] font-mono tracking-wider font-semibold">ADMIN PORTAL</div>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-slate-700 hover:text-slate-900 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 shadow-sm",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-200 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white font-black text-lg font-mono shadow-md shadow-amber-500/20">
              SP
            </div>
            <div>
              <div className="text-slate-900 font-bold text-base tracking-wide flex items-center gap-1.5">
                SAI POOJA
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="text-amber-700 text-xs font-mono tracking-widest font-semibold uppercase">
                ADMIN CONSOLE
              </div>
            </div>
          </div>

          <div className="mt-4 px-3 py-2 rounded-lg bg-white border border-slate-200 flex items-center gap-2 text-xs text-slate-600 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="truncate font-medium">Fabrication CMS • Light Edition</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold">
            Management
          </div>

          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                  isActive
                    ? "bg-amber-50 text-amber-900 font-bold border border-amber-200/80 shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={cn(
                      "w-4.5 h-4.5 transition-transform duration-200 group-hover:scale-110",
                      isActive ? "text-amber-600" : "text-slate-400 group-hover:text-amber-600"
                    )}
                  />
                  <span>{item.label}</span>
                </div>

                {item.hasBadge && unreadCount > 0 && (
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded-full text-xs font-mono font-bold",
                      isActive
                        ? "bg-amber-600 text-white"
                        : "bg-emerald-600 text-white"
                    )}
                  >
                    {unreadCount}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-6 px-3 pb-2 text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold">
            Shortcuts
          </div>

          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-amber-600" />
              <span>Live Website</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">↗</span>
          </Link>
        </nav>

        {/* Footer / User Profile & Logout */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/70">
          <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800 font-bold text-xs font-mono">
                A
              </div>
              <div className="min-w-0">
                <div className="text-slate-900 text-xs font-semibold truncate">Workshop Admin</div>
                <div className="text-slate-500 text-[10px] font-mono truncate">Authenticated</div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              title="Sign Out"
              className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
