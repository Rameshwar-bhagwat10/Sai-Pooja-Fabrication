"use client";

import * as React from "react";
import Link from "next/link";
import { Plus, ExternalLink } from "lucide-react";

interface AdminTopbarProps {
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    href: string;
    icon?: React.ComponentType<{ className?: string }>;
  };
}

export function AdminTopbar({ title, subtitle, action }: AdminTopbarProps) {
  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 px-6 sm:px-8 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-20 shadow-xs">
      <div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-4 bg-amber-500 rounded-full inline-block" />
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-mono uppercase">
            {title}
          </h1>
        </div>
        {subtitle && (
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 pl-3.5">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {action ? (
          <Link href={action.href}>
            <button className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-[0.98] text-white font-bold text-xs uppercase tracking-wider font-mono flex items-center gap-2 shadow-sm shadow-amber-600/20 transition-all cursor-pointer">
              {action.icon ? <action.icon className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              <span>{action.label}</span>
            </button>
          </Link>
        ) : null}

        <Link
          href="/"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs font-mono text-slate-700 transition-colors"
        >
          <span>Live Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-amber-600" />
        </Link>
      </div>
    </header>
  );
}
