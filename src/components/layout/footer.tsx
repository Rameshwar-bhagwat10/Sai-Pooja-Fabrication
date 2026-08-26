import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Phone, Mail, MapPin, MessageSquare } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "./logo";
import { PRODUCT_CATEGORIES } from "@/data/navigation";
import { COMPANY_INFO } from "@/data/company";

export function Footer() {
  return (
    <footer className="w-full bg-[#10271D] text-[#F4F1E8] border-t border-white/10 pt-20 pb-12">
      <Container size="default">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          {/* Col 1: Brand Info (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Logo variant="light" size="lg" />
            <p className="text-small text-[#D8D9D3] leading-relaxed max-w-sm">
              Specialists in heavy-duty agricultural equipment, tractor-mounted implements,
              and precision industrial fabrication engineering built for demanding field work.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-[#C8913D] uppercase tracking-wider">
                BORON STEEL WEAR PARTS
              </span>
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-[#D8D9D3] uppercase tracking-wider">
                CAT-II 3-POINT LINKAGE
              </span>
            </div>
          </div>

          {/* Col 2: Agricultural Implements (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#C8913D] font-bold">
              AGRICULTURAL IMPLEMENTS
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-small text-[#D8D9D3]">
              {PRODUCT_CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/products`}
                    className="hover:text-white transition-colors duration-200 inline-flex items-center gap-1 group py-1"
                  >
                    <span>{cat.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#C8913D]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#C8913D] font-bold">
              COMPANY
            </h4>
            <ul className="flex flex-col gap-2.5 text-small text-[#D8D9D3]">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  Equipment Catalog
                </Link>
              </li>
              <li>
                <Link href="/fabrication" className="hover:text-white transition-colors">
                  Workshop Capabilities
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">
                  Machinery Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Location
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Inquiries (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#C8913D] font-bold">
              DIRECT INQUIRIES
            </h4>
            <div className="flex flex-col gap-3 text-small text-[#D8D9D3]">
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="hover:text-white transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#C8913D] shrink-0" />
                <span>{COMPANY_INFO.phone}</span>
              </a>

              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="hover:text-white transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-[#C8913D] shrink-0" />
                <span className="truncate">{COMPANY_INFO.email}</span>
              </a>

              <div className="flex items-start gap-2 pt-1 text-xs text-[#D8D9D3]/80">
                <MapPin className="w-4 h-4 text-[#C8913D] shrink-0 mt-0.5" />
                <span>
                  {COMPANY_INFO.address.line1}, {COMPANY_INFO.address.city}, {COMPANY_INFO.address.country}
                </span>
              </div>

              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 px-3.5 py-2 rounded-[8px] bg-[#2F6B45] text-white text-xs font-semibold hover:bg-[#3D8B5A] transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Inquiry</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#D8D9D3]/60">
          <p>© {new Date().getFullYear()} Sai Pooja Fabrication. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>PRECISION AGRICULTURAL FABRICATION</span>
            <span className="text-[#C8913D]">MADE IN INDIA</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
